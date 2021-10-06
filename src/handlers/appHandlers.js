'use strict';

import { APIKEY, NAPSTER_API, MAIN_CONTAINER  } from '../constants.js';
import {  createAudioElement ,createTrackContainer, createTrackHeaders,createArtistPageHeader} from '../views/appViews.js';
import {
  clearDOMElement,
  getDOMElement,
} from '../utils/DOMUtils.js';


const fetchData = async (urlToFetch) => {
  try {
    const request = await fetch(urlToFetch);
if (request.ok) {
      const jsonResponse = await request.json();
      return jsonResponse;
    }
    throw new Error(request.status);
  } catch (error) {
    console.log(error.message);
  }
};

const displayTracks = (data,boolean)=>{
clearDOMElement( MAIN_CONTAINER);
  const {tracks } = data;
  tracks.forEach((track) => {
      const { albumId , albumName, artistName,links,name,previewURL} =  track;
      const {albums,artists} = links;
      const container = createTrackContainer(albumId)
      const audioEle =  createAudioElement(previewURL);
      const  artistNameEle =  createTrackHeaders("h3",artistName,'- Top Tracks');
      artistNameEle.addEventListener('click',()=>{
         getArtistData(artists.href)
      } );
      const songName = createTrackHeaders("h4",name);
    
      if(boolean){
        const albumNameEle = createTrackHeaders("h3",albumName, '- Full Album');
        albumNameEle.addEventListener('click', ()=>{
          getArtistData(artists.href);
          getFullAlbumTracks(albums.href);
        });
        container.append(audioEle ,songName,artistNameEle, albumNameEle);
      }else{
        container.append(audioEle ,artistNameEle, songName); 
      }
      MAIN_CONTAINER.appendChild( container);
    });
}


export const getTopTracks = async () => {
  const url = `${NAPSTER_API}/v2.2/tracks/top?apikey=${APIKEY}&range=week&limit=40`;
  try {
    const data = await fetchData(url);
   if(data){
    clearDOMElement( MAIN_CONTAINER);
    displayTracks(data,true)
  }else{
    throw new Error('Request Failed!')}
  } catch (error) {
    console.log(error.message);
  }
};

const getArtistData =async (artistHref )=>{
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


const getFullAlbumTracks = async (albumHref )=>{
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

 const fetchSearchData = async (query)=>{
   const url = `${NAPSTER_API}/v2.2/search/verbose?query=${query}&apikey=${APIKEY}&limit=20`;
   try{
   const searchRequest= await fetchData(url);
   if(searchRequest){
     const artistInfo = getDOMElement('artist-Info');
     const headEle = getDOMElement('head-section');
     if(artistInfo ){
       clearDOMElement(artistInfo);
     }else if (headEle ){
      headEle.classList.add('display-none')
     }
    clearDOMElement( MAIN_CONTAINER);
    displayTracks(searchRequest.search.data, true)
     }else throw new Error('Request Failed!')

   }catch(error){
     console.log(error)
   }
}

let  timeoutValue = 0 ;
export const getTheInputValue = ()=>{
const inputElement = document.getElementById('searchField');
inputElement.value = "",
inputElement.onkeyup = ()=>{
  if(inputElement.value.trim().length===0){
    return;
  }


   clearTimeout(timeoutValue);
   timeoutValue = setTimeout(async()=>{
     try{
      const data = await fetchSearchData(inputElement.value);

      if(data){
        return data
      }else{
        throw new Error('Request Failed!')
      }

     }catch (error){
       console.log(error)
     }
     

    },1000)  
 }
}
export const backToHomePage =()=>{
  const homeElements = document.querySelectorAll(".home");
  const clearInputField = getDOMElement("searchField");
  const displayHead = getDOMElement('head-section');
  homeElements.forEach(item => {item.addEventListener('click',async ()=>{
    try{
      const artistInfo = getDOMElement('artist-Info');
      if(artistInfo){
        artistInfo.classList.add('display-none');
      }
      displayHead.classList.remove('display-none'); 
      clearInputField.value = '';
      const loadHomePage = await  getTopTracks ();
          if(loadHomePage){
            return loadHomePage
          }else{
            throw new Error('Request Failed!')
          }

    }catch(error){
      console.log(error)
    }
   
  });
})
}

export const stopAudioFromPlaying = ()=>{
  document.addEventListener('play', (e)=>{
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio=>{
      if(audio!= e.target){
        audio.pause();
      }
    })
  
    },true)
}

