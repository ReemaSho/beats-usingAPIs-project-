 'use strict';
 import {
  createDOMElement,
   getDOMElement,
} from '../utils/DOMUtils.js';
import { MAIN_CONTAINER} from '../constants.js';


export const createArtistPageHeader= (coverImgUrl, artistNameTxt,artistBioTxt)=>{
  const headerSection = getDOMElement('head-section');
  headerSection.classList.add('display-none');
  const header = getDOMElement('artist-Info');
  if(!header){
 const headerContainer = createDOMElement('div', {id : 'artist-Info'});
    const coverImage = createDOMElement('img', {id : 'artist-Img'});
    const artistName = createDOMElement('h2', {id : 'artist-Name'});
   coverImage.src = coverImgUrl;
    artistName.textContent= artistNameTxt;
    headerContainer.append( coverImage,artistName);
    if(artistBioTxt){
      const artistBio = createDOMElement('p', {id : 'artist-Bio'});
      artistBio.textContent= artistBioTxt;
      headerContainer.appendChild(artistBio );
    }
   MAIN_CONTAINER.parentNode.insertBefore(headerContainer,MAIN_CONTAINER)

  } 
}
