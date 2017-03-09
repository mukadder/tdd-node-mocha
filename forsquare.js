/**
 * Created by mukadder on 3/8/17.You give it an IP address and it returns JSON object with country, region, city attributes, as well as latitute/longitude coordinates. In our scenario with Foursquare API latitude and longitude coordinates is all you actually need to list trending venues near that location.


 */
var geoip = require('geoip-lite');

var ip = '207.97.227.239';
var geo = geoip.lookup(ip);

console.log(geo);