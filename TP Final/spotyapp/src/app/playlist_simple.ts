import { external_url_object } from './external_url_object';
import { image_object } from './image_object';

export class playlist_simple {
    collaborative: boolean;
    external_urls: external_url_object;
    href: string;
    id: string;
    images: image_object[];
    name: string;
    owner: any;
    public: boolean | null;
    snapshot_id: string;
    tracks: any;
    type: string;
    uri: string;
}