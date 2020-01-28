const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');
const jwt = require('../services/jwt');


function saveUser(req, res) {
    const params = req.body;
    const user = new User();
    if (params.name && params.email && params.password && params.role && params.location) {
        user.name = params.name;
        user.email = params.email;
        user.role = params.role;
        user.location = params.location;

        user.image = null;
        User.find({$or: [
                {email: user.email}
            ]}).then((users) => {
             {
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    if (err)
                        return res.status(500).send({message: "Saving user error."});
                    user.password = hash;
                });
                user.save((err, userStored) => {
                    if (err)
                        return res.status(500).send({message: "Saving user error."});
                    if (userStored) {
                        return res.status(200).send({user: userStored});
                    } else {
                        return res.status(404).send({message: "User Not Found."});
                    }
                });
            }
        });
    } else {
        return res.status(200).send({message: 'Invalid Data.'});
    }
}

function loginUser(req, res) {
    const params = req.body;
    const email = params.email;
    const password = params.password;
    User.findOne({email: email}, (err, user) => {
        if (err)
            return res.status(500).send({message: "Login error."});
        if (user) {
            bcrypt.compare(password, user.password, (err, check) => {
                if (check) {
                    if (params.gettoken) {
                        return res.status(200).send({
                            token: jwt.createtoken(user)
                        });
                    } else {
                        user.password = undefined;
                        return res.status(200).send({user});
                    }
                } else {
                    return res.status(500).send({message: "Wrong email or password."});
                }
            });
        } else {
            return res.status(500).send({message: "Wrong email or password."});
        }
    });
}



function updateUser(req, res) {
    const userId = req.params.id;
    const update = req.body;
    if (userId !== req.user.sub) {
        return res.status(500).send({message: "You do not have permissions to modify the user."});
    }

    User.find({$or: [
            {email: update.email.toLowerCase()},
            {nick: update.nick.toLowerCase()}
        ]}).then((err, users) => {
        var user_is_set = false;
        users.forEach((users) => {
            if (users._id != userId)
                user_isset = true;
        });
        if (user_is_set)
            return res.status(400).send({message: "The email and/or the nick already exists..."});

        User.findByIdAndUpdate(userId, update, {new : true}, (err, userUpdated) => {
            if (!userUpdated)
                return res.status(404).send({message: "User Not Found."});
            if (err)
                return res.status(500).send({message: "Request Error."});

            return res.status(200).send({user: userUpdated});
        });
    });
}


module.exports = {
    saveUser,
    loginUser,
    updateUser
};
