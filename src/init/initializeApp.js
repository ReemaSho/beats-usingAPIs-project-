'use strict';
import {loadMainPage,eventOnAudioElement} from '../listeners/appListeners.js';
import { getTopTracks } from '../handlers/handleHomePage.js';
import{ getTheInputValue }from '../handlers/searchHandlers.js';
import { createFooter } from '../views/footerViews.js';
import { createNavBar} from '../views/navbarView.js';
const initializeHomePage = async() => {

  try{
    createNavBar();
   await getTopTracks();
     getTheInputValue();
    loadMainPage();
   eventOnAudioElement();
     createFooter();
  }catch (error){
    console.log(error)
  }



  
 
};

window.addEventListener('load', initializeHomePage);
