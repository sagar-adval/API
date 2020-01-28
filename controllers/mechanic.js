const User = require('../models/user')
const CircularJSON = require('circular-json')
function fetchNearestMechanics(req, res) {
    const lat = req.body.latitude
    const long = req.body.longitude
    let user = User.find({
        location: {
            $near: {
                $geometry: {
                    type: "point",
                    coordinates: [lat, long]
                },
                $maxDistance: 2000
            }
        }
    })
    if(user){
        let mechanic = CircularJSON.stringify(user)
        JSON.parse(mechanic)
        res.send(mechanic.name)
    }else {
        res.send('Error')
    }
}


function fetchMechanicDetails(req, res) {
    let user = User.findById({
        _id:req.params._id
    })
    if (user){
        res.send(user.name, user.location)
    }else {
        res.sendStatus(500).send('Error')
    }

}

exports.fetchNearestMechanics = fetchNearestMechanics;
exports.fetchMechanicDetails = fetchMechanicDetails;
