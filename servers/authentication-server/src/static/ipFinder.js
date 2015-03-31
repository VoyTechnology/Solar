// Found this code somewhere online used for obtaining the outward facing
// ip of the machine.

function ipFinder() {

    require('http').request({
        hostname: 'fugal.net',
        path: '/ip.cgi',
        agent: false
        }, function(res) {
        if(res.statusCode != 200) {
            throw new Error('non-OK status: ' + res.statusCode);
        }
        res.setEncoding('utf-8');
        var ipAddress = "";
        res.on('data', function(chunk) { ipAddress += chunk; });
        res.on('end', function() {
            global.myIP = ipAddress;
            if(!isNaN(myIP[myIP.length-1])) {
                myIP = myIP.slice(0, myIP.length-1);
            }
        });
        }).on('error', function(err) {
        throw err;
    }).end();

}

module.exports = ipFinder;
