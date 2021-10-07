
import { APIKEY } from '../constants.js';
import {createArtistPageHeader} from '../views/appViews.js';
import {
  getDOMElement,
} from '../utils/DOMUtils.js';

import {fetchData ,displayTracks }from './mainHandlersFuns.js';



export const getArtistData =async (artistHref )=>{
    const  imageUrl = `${artistHref}/images?apikey=${APIKEY}`
     const artistTopTracks = `${artistHref}/tracks/top?apikey=${APIKEY}&limit=40`
    const artistUrl= `${artistHref}?apikey=${APIKEY}` ;
    try{
     const artistInfo = await Promise.all([fetchData( imageUrl),fetchData(artistUrl),fetchData(artistTopTracks)]);
     if(artistInfo){
       const artistImage = artistInfo[0].images[3].url;
       const artistDetails = artistInfo[1].artists[0];
       const artistTopTracks = artistInfo[2];
       displayTracks(artistTopTracks,true );
   const {bios,blurbs,name} = artistDetails;
     if(blurbs.length > 0){
       const artistBlurbs = blurbs.join(' ')
       createArtistPageHeader(artistImage,name ,artistBlurbs)
      } else if(bios){
          const artistBio = bios[0].bio;
          createArtistPageHeader( artistImage,name ,artistBio)
      } else {
       createArtistPageHeader( artistImage,name)
      }
       const artistName = getDOMElement('artist-Name');
       if(artistName){
           artistName.addEventListener('click', ()=>{
               displayTracks(artistTopTracks,true);
              })
           }
       }else{
         throw new Error('Request Failed!')
       }
    }catch(error){
     console.log(error.message);
    }
   }