/**
 * Created by mukadder on 3/8/17.
 */
// Module dependencies
var request = require('request');
var xml2js = require('xml2js');

// xml2js parser instance
var parser = new xml2js.Parser();

// GET request to EVE Online API
var characterName = 'Nova Kierra';
var url = 'https://api.eveonline.com/eve/CharacterID.xml.aspx?names=' + characterName;
request.get(url, function(error, request, body) {
    // Parse XML data from body
    parser.parseString(body, function(err, parsedXml) {
        try {
            var characterId = parsedXml.eveapi.result[0].rowset[0].row[0].$.characterID;
            console.log(characterId);
        } catch(e) {
            console.log('Character not found');
        }
    });
});