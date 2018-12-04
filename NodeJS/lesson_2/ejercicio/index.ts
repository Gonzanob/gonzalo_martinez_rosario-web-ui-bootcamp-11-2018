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
app.get("/msg=*", function(req, res) {
    var promise: Promise<string> = new Promise((resolve, reject) =>
    {
        var messages: string[] = req.baseUrl.split("/");
        var url: string[] = req.originalUrl.split("/").slice(1);
        const _uuid: string = uuid();
        var toWrite: Logfile[] = [];
        var invalid: boolean = false;
        
        url.forEach((command: string) => {
            if(command) {
                if(command.startsWith("msg=")) {
                    toWrite.push( {sessionId : _uuid, msg: command.slice(4)});
                }
                else { invalid = true; }
            }
        })
        if(invalid) { reject("Invalid Command"); }
        else {
            fs.appendFile(file, JSON.stringify(toWrite, null, ' ') +",\n", 'utf8', (err) => {
                if (err) { reject("Failed to write to file"); }
                resolve("Success");
            });
        }
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