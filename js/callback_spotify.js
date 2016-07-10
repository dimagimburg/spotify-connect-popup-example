$(document).ready(function () {

    var accepted_origin = "http://localhost:3001/";

    var hash = {};

    window.location.hash.replace(/^#\/?/, '').split('&').forEach(function(kv) {
        var spl = kv.indexOf('=');
        if (spl != -1) {
            hash[kv.substring(0, spl)] = decodeURIComponent(kv.substring(spl+1));
        }
    });

    if (hash.access_token) {
        window.opener.postMessage(JSON.stringify({
            type:'access_token_spotify',
            access_token: hash.access_token,
            expires_in: hash.expires_in || 0
        }), accepted_origin);
        window.close();
    }

});