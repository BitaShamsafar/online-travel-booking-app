import type {Source} from "../types/types.ts";

const getApi = (source : Source) => {
    let api: string
    switch (source){
        case 'hotels':
            api = '/api/hotels' ;
            break;
        case 'topHotels':
            api = '/api/topHotels' ;
            break;
        case 'hotel':
            api = '/api/hotel/';
            break;
        case 'topTours':
            api = '/api/tour/topTours' ;
            break;
        case 'tours':
            api = '/api/tour/all'
            break;
        case 'hotelSearch':
            api = '/api/hotels/search';
            break;
        default:
            api = 'api/favorites'

    }
    return api
}
export default getApi