
var util = require('util');

module.exports = ['iKFniGFsFWJgOzEpLquLpTg4', function(args){
    var now = new Date(),
        then = new Date('02/12/2016 20:00'),
        diff = (then - now) / 1000;

    var daym = diff % 86400,
        days = (diff - daym) / 86400,
        hourm = daym % 3600,
        hours = (daym - hourm) / 3600,
        minm = hourm % 60,
        mins = (hourm - minm) / 60,
        secs = Math.round(minm);

    return util.format(
        '%d days, %d hours, %d minutes and %d seconds to go!',
        days, hours, mins, secs);
}];