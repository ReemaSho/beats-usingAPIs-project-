
import { APIKEY, MAIN_CONTAINER  } from '../constants.js';

import {
  clearDOMElement,
} from '../utils/DOMUtils.js';

import {fetchData ,displayTracks }from './mainHandlersFuns.js';


export const getFullAlbumTracks = async (albumHref )=>{
    const  url= `${albumHref}/tracks?apikey=${APIKEY}`;
    try{
     const artistInfo = await fetchData(url);
     if(artistInfo){
      clearDOMElement( MAIN_CONTAINER )
       displayTracks(artistInfo,false);
     }else{
       throw new Error('Request Failed!')
     }
    }catch(error){
     console.log(error.message);
    }
   }