$(document).ready(function () {

    var spotify_token = localStorage.getItem('spotify_token');

    if(localStorage.getItem('spotify_token')){
        setSpotifyDetails(spotify_token);
    }

    $('.spotify-login-button').click(function(){
        handleSpotifyConnect();
    });

    $('.spotify-logout-button').click(function(){
        localStorage.removeItem('spotify_token');
        $('.spotify-login-form').removeClass('hidden');
        $('.spotify-details').addClass('hidden').children()[0].remove();
    });

    function handleSpotifyConnect(){
        var SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize',
            SPOTIFY_CLIENT_ID = 'YOUR_CLIENT_ID',
            SPOTIFY_REDIRECT_URL = 'http://localhost:3001/callback_spotify.html',
            SPOTIFY_RESPONSE_TYPE = 'token';

        var authURL =
            SPOTIFY_AUTH_URL + "?client_id=" +
            SPOTIFY_CLIENT_ID + "&redirect_uri=" +
            encodeURIComponent(SPOTIFY_REDIRECT_URL) + "" +
            "&response_type=" + SPOTIFY_RESPONSE_TYPE;

        var width = 450,
            height = 730,
            left = (screen.width / 2) - (width / 2),
            top = (screen.height / 2) - (height / 2);

        var w = window.open(
            authURL,
            'Spotify',
            'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
        );

        window.addEventListener("message", function(event) {
            var hash = JSON.parse(event.data);
            if (hash.type == 'access_token_spotify') {
                callback(hash.access_token);
            }
        }, false);

        var callback = function(token){
            localStorage.setItem('spotify_token',token);
            setSpotifyDetails(token);
        };
    }

    function setSpotifyDetails(token){
        $.ajax({
            url: 'https://api.spotify.com/v1/me',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function(response){
                var username = response.id;
                $('.spotify-login-form').addClass('hidden');
                $('.spotify-details').prepend('<div>Hello <b>' + username + '</b>, you are now logged in with spotify, you can fetch any data you need for your awsome app!</div>').removeClass('hidden');
            },
            error: function(){
                // handle error
            }
        });
    }
});