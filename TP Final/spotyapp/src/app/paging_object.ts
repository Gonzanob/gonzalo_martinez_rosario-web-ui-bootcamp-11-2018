import { artist_simplified_object } from "./artist_object_simplified";
import { album_simplified_object } from "./album_simplified_object";
import { track_object } from "./track_object";
import { playlist_simple } from "./playlist_simple";

export class Paging_Object {
    "href": string;
    "items": artist_simplified_object[] | album_simplified_object[] | track_object[] | playlist_simple[];
    "limit": number;
    "next": string | null;
    "offset": number;
    "previous": string | null;
    "total": number;
}