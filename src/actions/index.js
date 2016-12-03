import axios from 'axios';
const ROOT_URL ="https://www.pokeradar.io/api/v1/submissions?";
//"https://www.pokeradar.io/api/v1/submissions?minLatitude=25.050360555529643&maxLatitude=25.0579805152913&minLongitude=121.53322935104369&maxLongitude=121.55524492263794&pokemonId=10";

export const FETCH_POCKMON_SELECTED = 'FETCH_POCKMON_SELECTED';
export const FETCH_POCKMON_LIST = 'FETCH_POCKMON_LIST';
export const FETCH_MAP_INFO = 'FETCH_MAP_INFO';
export const FETCH_POKEMON_INFO = 'FETCH_POKEMON_INFO';

export function fetchSelectPockmon(pokemonId){

    return {
        type: FETCH_POCKMON_SELECTED,
        payload: pokemonId
    };
    
}

export function fetchPockmonList(pockmon, mapInfo){

    let url;
    if(mapInfo.info){
        if(mapInfo.info.init=="0"){
        let info =mapInfo.info
        //https://www.pokeradar.io/api/v1/submissions?latitude=20&longitude=124&zoomLevel=5&pokemonId=142
         //url = `${ROOT_URL}minLatitude=24.79109818120709&maxLatitude=24.79931854882014&minLongitude=120.98644495010376&maxLongitude=121.0063362121582&pokemonId=${pockmon.pokemonId}`;
         url = `${ROOT_URL}latitude=${info.center.lat}&longitude=${info.center.lng}&zoomLevel=${info.zoom}&pokemonId=${pockmon.pokemonId}`;
        }else if(mapInfo.info.init=="1"){
            let info =mapInfo.info
            url = `${ROOT_URL}minLatitude=${info.rangePostion.minLatitude}&maxLatitude=${info.rangePostion.maxLatitude}&minLongitude=${info.rangePostion.minLongitude}&maxLongitude=${info.rangePostion.maxLongitude}&pokemonId=${pockmon.pokemonId}`;
        }
    } 
    else{
        return {type: ''};
    }
    console.log("API_URL=",url);
    const requset = axios.get(url);

  //  console.log('action requset:',requset);

    return {
        type: FETCH_POCKMON_LIST,
        payload: requset
    };
    
}

export function fetchMapInfo(info){
//console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",info.center);
    return {
        type: FETCH_MAP_INFO,
        payload: info
    };
    
}

export function fetchPokemonInfo(data){
  
    return {
        type: FETCH_POKEMON_INFO,
        payload: data
    };
    
}