import { external_url_object } from "./external_url_object";
import { followers_object } from "./followers_object";
import { image_object } from "./image_object";

export class user_object {
    "birthdate": string;
    "country": string;
    "display_name": string;
    "email": string;
    "external_urls": external_url_object;
    "followers": followers_object;
    "href": string;
    "id": string;
    "images": image_object[];
    "product": string;
    "type": "user"
    "uri": string;
}