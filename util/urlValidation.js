const URL = require('url');
const dns = require('dns');

exports.checkUrl = function(url, callback) {
  
  //if protocol (http:// or https://) is not in the url, add it
  var regex = /^(http[s]?:\/\/){1}/
  var result = regex.test(url);
  if (result === false)
    url = 'http://' + url;

  //remove www. to make all the urls the same format before saving
  url = url.replace(/www./gi, '');

  //parse url to get the hostname
  var p = URL.parse(url, true);
  
  //check if the url points to a valid site
  dns.lookup(p.hostname, function (err, addresses, family) {
  if (err)
    return callback(err, false);
  else
    return callback(err, true, url);
  });

}