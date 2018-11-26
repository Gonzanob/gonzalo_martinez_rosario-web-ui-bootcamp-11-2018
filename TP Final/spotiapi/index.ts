import { Paging_Object } from "./interfaces/paging_object";
import { error_object } from "./interfaces/error_object";
import { search_interface } from "./interfaces/search_interface";
import { search_spotify_interface } from "./interfaces/search_spotify_interface";
import { config } from "./interfaces/config_interface";
import settings from "./config/config.json";
import { user_object } from "./interfaces/user_object";

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var fs = require('fs');

var client_id: string = 'b9438797e601424f85457935bb36fa7c'; // Your client id
var client_secret: string = '036d5440f8a54af5b9464e6acf7a7704'; // Your secret
var redirect_uri: string = 'http://localhost:8888/callback'; // Your redirect uri
const main_url: string = 'http://localhost:4200/';

const conf: config = settings;
const file_to_write: string = conf.log_dir;

var stateKey: string = 'spotify_auth_state';
var server = express();

var access_token: string = '';
var refresh_token: string = '';

var logged_user: user_object | null = null;

class LogFile extends search_interface {
    "date": string;
}

function allowCrossDomain(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if ('OPTIONS' === req.method) {
      res.send(200);
    } else {
      next();
    }
  };

server.use(express.static(__dirname + '/public'));
server.use(cors());
server.use(cookieParser());
server.use(allowCrossDomain);



var generateRandomString = function(length: number) {
    var text: string = '';
    var possible: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i: number = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

function do_we_have_token(): boolean {
    if(access_token !== '') {
        console.log("Token: ok")
        return true;
    }
    else {
        console.log("Token: missing")
        return false;
    }
    
}

function logfile_to_search_interface(to_convert: LogFile[]): search_interface[] {
    var result: search_interface[] = [];
    to_convert.forEach( (element) => {
        result.push({
            "text": element.text,
            "album": element.album,
            "artist": element.artist,
            "track": element.track,
            "playlist": element.playlist
        })
    });
    return result;
}

server.post("/userdata", function(req: any, res: any, body: any) {
    if(logged_user === null) {
        res.send({"error": {
            "status": 401,
            "message": "You are not logged in"
        }});
    }
    res.send(logged_user);

});

server.post("/last_searched", function( req: any, res: any, body: any) {
    if(logged_user) {
        var where_to_write = file_to_write + '-' + logged_user.id + '.json';
        console.log("/last_searched: Requested logfile");
        var history: LogFile[] = [];
        fs.readFile(where_to_write, 'utf8', (err: any, data: string) => {
            if(err) {
                console.log("/last_searched: Logfile doesn't exist");
            }
            else {
                console.log("/last_searched: Successfully loaded logfile");
                history = JSON.parse(data);
            }
            var to_return: search_interface[] = logfile_to_search_interface(history);
            if(to_return.length > 5) {                
                res.send(to_return.slice(to_return.length - 5));
            }
            else {
                res.send(to_return);
            }
        });
        
    }
    else { 
        return {
            "error": {
                "status": 401,
                "message": "You are not logged in"
            }
        }
    }
    
});

server.get("/amiloggedin", function(req: any, res: any){
    if(logged_user !== null)
        res.send(true);
    else
        res.send(false);
});

function logout(): void{
    logged_user = null;
    access_token = '';
    refresh_token = '';
}

server.get("/logout", function(req: any, res:any){
    logout();
    res.redirect(main_url);
});


server.get("/login", function( req: any, res: any) {
    console.log("/login: trying to login");
    var state: string = generateRandomString(16);
    res.cookie(stateKey, state);
    
    var scope: string = 'user-read-private user-read-email playlist-read-private';
    res.redirect('https://accounts.spotify.com/authorize?' + 
    querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
    }));
});

server.get("/callback", function (req: any, res: any) {
    var code: string = req.query.code || null;
    var state: string = req.query.state || null;
    var storedState: string = req.cookies ? req.cookies[stateKey] : null;

    if(state === null || state !== storedState) {
        res.redirect('/#' +
        querystring.stringify({
            error: 'state_mismatch'
        }));
    }
    else {
        res.clearCookie(stateKey);
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, function(error: any, response: any, body: any) {
            if(!error && response.statusCode === 200) {

                access_token = body.access_token;
                refresh_token = body.refresh_token;
                console.log("/login: succesfully loged in");

                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + access_token
                    },
                    json: true
                };

                var user_info: Promise<user_object> = new Promise((resolve, reject) => {
                    request.get(options, function(error: error_object, response: any, body: user_object) {
                        if(response.statusCode !== 200 || error) {
                            console.log("/login: " + error);
                            if(response.statusCode === 401) {
                                logout();
                            }
                            reject(error);
                        }
                        else {
                            resolve(body);
                        }
                    });
                });

                user_info.then( (x: user_object) => {
                    logged_user = x;
                })

                res.redirect(main_url);
            }
        })
    }
});

function bool_to_typestring( to_convert: search_interface): string {
    var string: string = ''
    string += (to_convert.artist? "artist,": '') + (to_convert.album? "album,": '') + (to_convert.track? "track,": '') + (to_convert.playlist? "playlist,": '');
    string = string.substring(0, string.length-1);
    return string;
}

server.get("/search/:request", function(req: any, res: any) {

    if(!do_we_have_token()) {res.send({"error": {
        "status": 401,
        "message": "You are not logged in"
    }})}

    var options = {
        url: 'https://api.spotify.com/v1/search?',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
        json: true
    };

    const received: search_interface = JSON.parse(req.params.request);
    var to_search: search_spotify_interface;
    var log: LogFile;

    to_search = {
        q: received.text,
        type: bool_to_typestring(received),
        limit: 5
    };

    options.url += querystring.stringify( to_search );


    var search_promise: Promise<Paging_Object[] | error_object> = new Promise((resolve, reject) => {
        request.get(options, function(error: error_object, response: any, body: Paging_Object[]) {
            if(response.statusCode !== 200 || error) {
                console.log("/search: " + error);
                if(response.statusCode === 401) {
                    logout();
                }
                reject(error);
            }
            else {
                console.log("/search: succesfully searched");
                resolve(body);
            }
        });
    });

    search_promise.then((x: Paging_Object[] | error_object) => {
        if(logged_user)
        {
            var where_to_write = file_to_write + '-' + logged_user.id + '.json';
            var date = new Date();
            log = {
            "date": date.toDateString(),
            "album": received.album,
            "track": received.track,
            "artist": received.artist,
            "playlist": received.playlist,
            "text": received.text
            }
            var history: LogFile[] = [];
            
            fs.readFile(where_to_write, 'utf8', (err: any, data: string) => {
                if(err) {
                    console.log("/search: Logfile doesn't exist");
                }
                else { 
                    history = JSON.parse(data);
                }
                history.push(log);
                fs.writeFile(where_to_write, JSON.stringify(history, null, ' '), 'utf8', (err: any) => {
                    if(err) {console.log("/search: Failed to write to logfile");}
                    else { console.log("/search: Succesfully wrote to logfile");}
                });
            });
        }
        res.send(x);
    }, 
    ( x: error_object) => {
        res.send(x);
    });
});

server.get("/playlist", function( req: any, res: any, body: any) {
    
    if(!do_we_have_token()) {res.send({})}

    var options = {
        url: 'https://api.spotify.com/v1/me/playlists',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
        json: true

    }
    var playlist: Promise<JSON> = new Promise((resolve, reject) => {
        request.get(options, function(error: any, response: any, body: any) {
            if(response.statusCode !== 200 || error) {
                console.log("/playlist: " + error);
                reject(error);
            }
            else {
                console.log("/playlist: Succesfully retrieved playlists");
                resolve(body["items"]);
            }
        });
    });
    
    playlist.then((x:JSON) => {
        res.send(x);
    });
});

console.log('Listening on 8888');
server.listen(8888);