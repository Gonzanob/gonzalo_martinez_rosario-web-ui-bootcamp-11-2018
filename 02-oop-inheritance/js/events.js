export class EventEmitter
{
    constructor() {
        this.events = {};
    }

    on(eventName, callback)
    {
        if( !this.events[eventName] )
        {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }
    emit(eventName)
    {
        const event = this.events[eventName];
        if(event)
        {
            for( var i = 0; i<event.length; i++) 
                {
                    event[i](eventName);
                }
        }
    }
    off(eventName, callback)
    {
        const event = this.events[eventName];
        if(event)
        {
            for( var i = 0; i<event.length; i++) 
                {
                    if(event[i] == callback)
                    {
                        event.splice(i, 1);
                    }
                }
        }
    }
}