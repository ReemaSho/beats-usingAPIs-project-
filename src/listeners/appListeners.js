'use strict';
import {backToHomePage, stopAudioFromPlaying}  from '../handlers/appHandlers.js';
export const loadMainPage=() => {
    backToHomePage()
}
export const eventOnAudioElement=()=>{
    stopAudioFromPlaying()
}