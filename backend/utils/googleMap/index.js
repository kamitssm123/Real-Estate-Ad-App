import {Client} from "@googlemaps/google-maps-services-js";

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const getNearbyPlaces = async (location) => {
    const client = new Client({});
    const response = await client.placesNearby({
        params: {
            location: location,
            radius: 1000,
            type: ['school', 'hospital'],
            key: API_KEY
        },
        timeout: 1000, // milliseconds
    });
    const places = response.data.results.map(place => ({
        name: place.name,
        address: place.vicinity,
        rating: place.rating,
        types: place.types,
    }));
    console.log(places);
}


export default getNearbyPlaces;
