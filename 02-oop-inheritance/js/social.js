export class social
{
    constructor(){}

    likes(actor)
    {
        console.log(actor.name + " likes " + this.title);
    }

    share(actor)
    {
        console.log(actor.name + " shared " + this.title);
    }
} 
