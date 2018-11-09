import {Actor} from "/js/actor.js";
import {Logger} from "/js/logger.js";
import {social} from "./social.js";
import {multi} from "./multiinherit.js";
import {EventEmitter} from "./events.js";


class Movie extends multi.inherit(EventEmitter, social)
{
    constructor(title, year, duration) {
        super();
        this.title = title;
        this.year = year;
        this.duration = duration;
        this.cast = [];
    }

    addCast(actors)
    {
        if(actors.length > 1)
        {
            for(var i = 0; i<actors.length; i++)
            {
                this.cast.push(actors[i]);
            }
        }
        else
        {
            this.cast.push(actors);
        }
    }

    play()
    {
        this.emit("play");
    }

    pause()
    {
        this.emit("pause");
    }

    resume()
    {
        this.emit("resume");
    }
}
