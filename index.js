/*******************************************************************************

                    SETUP/DATA

*******************************************************************************/

var EARTH_CIRCUMFERENCE_IN_KILOMETERS = 6371
var MAX_POINTS_TO_RETURN = 100

var _ = require('underscore')
var mongoose = require('mongoose')

var Schema = mongoose.Schema

var PointSchema = new Schema({
    title: String,
    message: String,
    user: {type: Number, index: true},
    location: {
        type: [Number], // [<longitude>, <latitude>]
        index: '2d' // create the geospatial index
    }
});

var Point = mongoose.model('point', PointSchema)

/*******************************************************************************

                    FUNCTIONS

*******************************************************************************/

module.exports = function(options){

    var self = this

    self.init = function(){
        mongoose.connect(options.mongoUrl, function(err) {  
            if( err ){ throw(err) }
        });
    }


    /**
        locationData should look like this
        {
            title: 'some title',
            message: 'some message',
            user: 12233,
            location: [2.17403, 41.40338] // longitude, latitude
        }
    */
    self.add = function(locationData, callbackIn){
        var point = new Point(locationData)
        point.save(function(err){
            if( err ){ callbackIn(err) }
            else { callbackIn() }
        })
    }

    self.delete = function(id){

    }

    self.findAll = function(callbackIn){
        Point.find({}, function(err, docs){
            if(err){ console.log(err) }
            else{ callbackIn(null, docs) }
        })
    }

    self.findNear = function(longitude, latitude, kilometers, callbackIn){

        var distance = kilometers / EARTH_CIRCUMFERENCE_IN_KILOMETERS

        // get coordinates [ <longitude> , <latitude> ]
        var coordinates = [longitude, latitude];

        // find a location
        Point.find({ location: {
                $near: coordinates,
                $maxDistance: kilometers } })
            .limit(MAX_POINTS_TO_RETURN)
            .exec(callbackIn)
    }

    self.findUsers = function(userId, callbackIn){

    }

    self.holyGoodGodDontCallThis = function(callbackIn){
        Point.remove({}, function(err){ callbackIn() })
    }

    self.init()
}