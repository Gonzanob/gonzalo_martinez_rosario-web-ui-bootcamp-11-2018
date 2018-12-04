import fs = require('fs');
import yargs = require('yargs');
import settings from './config.json';

interface Prototype {
    file: string;
    version: string;
}

const config: Prototype = settings;
const file: string = config["file"];
const version: string = config["version"];

var command: yargs.Arguments = yargs.argv
if(command.v) {
    console.log("Logger v"+version);
}
else
{
    if(command.msg) {
        var date: Date = new Date();
        var date_1: string = date.toLocaleDateString();

        var toWrite: string = date_1.substr(3,2) + "/" +
        date_1.substr(0,2) + "/" + date_1.substr(6,4) +
        " - " + date.toTimeString().substr(0,8) + " | " + command.msg + "\n";

        fs.appendFile(file, toWrite, 'utf8', (err) => {
            if (err) throw err;
            console.log("Command Appended");
        });
    }
    else { console.log("Invalid Command");}
}