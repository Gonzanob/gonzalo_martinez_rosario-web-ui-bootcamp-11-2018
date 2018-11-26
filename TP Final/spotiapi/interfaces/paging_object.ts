import { artist_object } from "./artist_object";
import { album_simplified_object } from "./album_simplified_object";
import { track_object } from "./track_object";

export class Paging_Object {
    "href": string;
    "items": artist_object[] | album_simplified_object[] | track_object[];
    "limit": number;
    "next": string | null;
    "offset": number;
    "previous": string | null;
    "total": number;
}