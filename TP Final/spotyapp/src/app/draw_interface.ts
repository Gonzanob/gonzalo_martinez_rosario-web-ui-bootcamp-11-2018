import { image_object } from "./image_object";
import { external_url_object } from "./external_url_object";

export class draw_interface {
    "name": string;
    "images": image_object[];
    "external_urls" : external_url_object;
}
