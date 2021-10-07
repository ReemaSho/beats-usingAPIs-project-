'use strict';
import {loadMainPage,eventOnAudioElement} from '../listeners/appListeners.js';
// import { getTopTracks , getTheInputValue} from '../handlers/appHandlers.js';
import { getTopTracks } from '../handlers/handleHomePage.js';
import{ getTheInputValue }from '../handlers/searchHandlers.js';
import { createNavBar, createFooter } from '../views/appViews.js';

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
