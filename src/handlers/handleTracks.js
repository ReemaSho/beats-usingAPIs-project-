import { MAIN_CONTAINER  } from '../constants.js';
import {  createAudioElement ,createTrackContainer, createTrackHeaders} from '../views/tracksViews.js';
import {
  clearDOMElement,
} from '../utils/DOMUtils.js';
import {getArtistData}from "./artistData.js"
import {getFullAlbumTracks}from "./fullAlbums.js"



  export const displayTracks = (data,boolean)=>{
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