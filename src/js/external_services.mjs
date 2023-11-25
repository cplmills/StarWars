import { translateCategory } from "./categories.mjs";
import { proper } from "./utils.mjs";

export function getURL(type){
    if (type === "data" ) {
        return import.meta.env.VITE_SWAPI_SERVER_URL;
    } else if (type === "image") {
        return import.meta.env.VITE_DATABANK_SERVER_URL
    }
}

export async function getAssetsFromExternal(asset, dataOrImage ) {
    let baseURL = getURL(dataOrImage) + asset;
    
    try {
        const response = await fetch(baseURL);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function getAssetFromExternal(asset, assetCategory, dataOrImage ) {
    let baseURL = getURL(dataOrImage) + assetCategory;
    if ( dataOrImage === "data" ) {
        baseURL +=     "/?search=" + asset;
    } else {
        baseURL += "/name/" + asset;
    }
    
    try {
        const response = await fetch(baseURL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function getAttribute(schema, entry) {
    return Object.entries(schema)[entry];
}

export function getAttributes(category) {
    if (category === "planets") {
        return ["name", "climate","diameter","gravity","orbital_period","population","rotation_period","surface_water","terrain"];
    } else if (category === "people") {
        return ["name", "gender", "hair_color", "height", "mass", "skin_color"];
    } else if (category === "films") {
        return ["director","episode_id","opening_crawl","producer","release_date","title"];
    } else if (category === "starships") {
        return ["name","model","MGLT","cargo_capacity","consumables","cost_in_credits","crew","hyperdrive_rating","length","manufacturer","max_atmosphering_speed","passengers","starship_class"];
    } else if (category === "vehicles") {
        return ["name","model","cargo_capacity","consumables","cost_in_credits","crew","length","manufacturer","max_atmosphering_speed","passengers"];
    } else if (category === "species") {
        return ["name","average_height","average_lifespan","classification","designation","eye_colors","hair_colors","language","skin_colors"];
    }
}

export async function getCombinedJSON(name, category) {
    // Get data from SWAPI for supplied name and category
    let data = getURL("data") + category + "/?search=" + name;
    let result = await fetch(data);
    result = await result.json();

    // Get Image from Databank for supplied name and category
    let image = getURL("image") + translateCategory(category) + "/name/" + proper(name);
    let imgResult = await fetch(image);
    imgResult = await imgResult.json();

    // If image is found, add to result, else add a placeholder image
    if (imgResult.length === 1 ) {
        result.results[0].image = imgResult[0].image;    
    } else {
        result.results[0].image = "../images/censored.png";
    }

    return result.results[0];
}

export async function getPageCount(data) {

}