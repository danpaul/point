/*******************************************************************************

                    SETUP/DATA

*******************************************************************************/

var async = require('async')

var Point = require('../index')

var point = new Point({ mongoUrl: 'mongodb://localhost/test_point_db' })

var testPointData = {
        title: 'some title',
        // message: 'some message',
        user: 12233,
        location: [2.17403, 41.40338] // longitude, latitude
    }


/*******************************************************************************

                    TEST

*******************************************************************************/

async.waterfall([

    point.holyGoodGodDontCallThis,

    function(callback){

        point.add(testPointData, callback)
    },

    point.findAll,

    function(records, callback){
        // console.log(records)
        callback()
    },

    function(callback){

        // point.findNear(2.17, 41.40, 100, function(err, points){
        point.findNear(40.0, 41.40, 1, function(err, points){
            if( err ){ callback(err) }
            else{
console.log('asdf')
console.log(points)
            }
        })
    }


], function(err){
    if( err ){ console.log(err) }
    else{
        console.log('success')
    }
})