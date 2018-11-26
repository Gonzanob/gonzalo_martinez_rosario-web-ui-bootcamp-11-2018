import { image_object } from './image_object';
import { artist_simplified_object } from './artist_object_simplified';
import { external_url_object } from './external_url_object';

export class album_simplified_object {
    "album_group"?: string
    "album_type": string;
    "artists": artist_simplified_object;
    "available_markets": string[];
    "external_urls": external_url_object;
    "href": string;
    "id": string;
    "images": image_object[];
    "name": string;
    "release_date": string;
    "release_date_precision": string;
    "restrictions": {"reason": "market" };
    "type": string;
    "uri": string;
}