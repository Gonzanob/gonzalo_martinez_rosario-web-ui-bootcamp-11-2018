import { album_simplified_object } from "./album_simplified_object";
import { artist_simplified_object } from "./artist_object_simplified";
import { external_url_object } from "./external_url_object";

export class track_object {
    "album": album_simplified_object;
    "artists": artist_simplified_object;
    "available_markets": string[];
    "disc_number": number;
    "duration_ms": number;
    "explicit": boolean;
    "external_ids": {
        "{key}": string;
        "{value}": string;
    };
    "external_urls": external_url_object;
    "href": string;
    "id": string;
    "is_playable": boolean;
    "linked_from": any;
    "restrictions": {
        "reason" : "market"
    };
    "name": string;
    "popularity": number;
    "preview_url": string;
    "track_number": number;
    "type": "track"
    "uri": string;
    "is_local": boolean;
}
