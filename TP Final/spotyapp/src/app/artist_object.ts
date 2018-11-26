import { external_url_object } from './external_url_object';
import { followers_object } from './followers_object';
import { image_object } from './image_object';

export class artist_object {
    "external_urls": external_url_object;
    "followers": followers_object;
    "genres": string[];
    "id": string;
    "images": image_object[];
    "name": string;
    "popularity": number;
    "type": string = "artist";
    "uri": string;
} 
 
