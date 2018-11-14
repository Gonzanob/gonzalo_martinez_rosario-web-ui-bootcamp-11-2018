import fs = require('fs');
import express = require('express');
import settings from './config.json';
import uuid = require('uuid/v1');

interface Prototype {
    file: string;
    version: string;
}

interface Logfile {
    sessionId: string;
    msg: string;
}

const json: Prototype = settings;
const file: string = json["file"];
const version: string = json["version"];

var app = express();
app.get("/msg=:msg", function(req, res) {
    var promise: Promise<string> = new Promise((resolve, reject) =>
    {
        var message: string = req.params.msg;
        if(!message) { reject("Invalid messsage"); }
        
        const _uuid: string = uuid();

        var toWrite: Logfile = { sessionId: _uuid, msg: message };

        fs.appendFile(file, JSON.stringify(toWrite, null, ' ') +",\n", 'utf8', (err) => {
            if (err) { reject("Failed to write to file"); }
            resolve("Success");
        });
    });
    promise.then(function(code: string): void {
        res.send(code);
    }, function(code: string): void{
        res.send(code);
    });
});
app.get("/v", function(req, res) {
    var promise: Promise<string> = new Promise((resolve, reject) =>
    {
        if(!version) { reject("Error getting version")}
        else {
            resolve(version);
        }
    })
    promise.then((code) => {
        res.send("Version: " + code);
    },(code) => {
        res.send(code);
    });
});

app.listen(3000);