'use strict';
import {
  createDOMElement,
  getDOMElement,
} from '../utils/DOMUtils.js';
import { MAIN_CONTAINER} from '../constants.js';
export const createTrackContainer = ( trackCoverImage) => {
  const trackContainer = createDOMElement('div');
  trackContainer.setAttribute('class', 'track-container');
  const trackImage = createDOMElement('img')
  trackImage.classList.add('track-image')
  trackImage.src = `http://direct.rhapsody.com/imageserver/v2/albums/${trackCoverImage}/images/300x300.jpg`;
  trackContainer.appendChild(trackImage)
  return  trackContainer;
};

export const createAudioElement = (audioSrc) => {
  const audioEle = new Audio(audioSrc)
  audioEle.setAttribute('controls', '');
  audioEle.setAttribute('type', 'audio/mpeg')
 return  audioEle;
};

export const createTrackHeaders =  (tag,headerTxt ,extraInfo )=>{
  const artistNameEle = createDOMElement(tag);
  if(!extraInfo ){
    artistNameEle.textContent = headerTxt ;
  }else{
    artistNameEle.textContent = `${headerTxt} ${extraInfo}` ;
  }
   return artistNameEle;
}

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
   MAIN_CONTAINER.parentNode.insertBefore(headerContainer,  MAIN_CONTAINER)

  } 
}

export const createNavBar = ()=>{
  const navbar = createDOMElement('nav');
  navbar.classList.add('navbar');
  const logoContainer = createDOMElement('div');
  logoContainer.classList.add('container');
const link = createDOMElement('a');
  Object.assign(link,{ className :'navbar-brand home',href : "#",textContent: "BEATS"})
const logo = createDOMElement('img');
 Object.assign(logo,{ className :'d-inline-block align-text-top',src:"./public/images/logo2.png",width:"30", height:"24", aria_label:"Search"});
const formEle = createDOMElement('form');
formEle.classList.add('d-flex')
const homePageEle = createDOMElement('div')
homePageEle.classList.add("home")
homePageEle.textContent = "Home";
const aboutEle = createDOMElement('div', {id : "about"})
aboutEle.textContent = "About";
const inputField = createDOMElement('input');
Object.assign(inputField,{id :"searchField",className :'orm-control me-2',type:"search", placeholder:"Search", aria_label:"Search"})
const headSection = createDOMElement("div", {id:"head-section"})
const header = createDOMElement("h1", {id:"header"});
const header1 = createDOMElement("h1", {id:"beats"});

header.innerHTML = '<span>BEATS</span> Sing The Melody Of your Soul'

link.prepend(logo);
formEle.append( homePageEle,aboutEle ,inputField)
logoContainer.append(link,formEle)
headSection.append(header1, header);
navbar.append(logoContainer,headSection );


MAIN_CONTAINER.parentNode.insertBefore(navbar,  MAIN_CONTAINER)

}
export const createFooter =()=>{
  const footerContainer = createDOMElement('footer',{id : 'footer'});
  const footerHead = createDOMElement('h2')
  footerHead.textContent= 'BEATS'
  const paragraph = createDOMElement('p');
  paragraph.innerHTML = "POWERED BY REEMA ALSHOHOF&copy2021";
  footerContainer.append(footerHead,paragraph)
  const scriptTag = document.getElementsByTagName('script');
  scriptTag[0].parentNode.insertBefore(footerContainer, scriptTag[0])
}