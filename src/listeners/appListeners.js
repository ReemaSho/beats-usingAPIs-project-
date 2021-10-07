'use strict';
import {backToHomePage, stopAudioFromPlaying}  from '../handlers/handleHomePage.js';
export const loadMainPage=() => {
    backToHomePage()
}
export const eventOnAudioElement=()=>{
    stopAudioFromPlaying()
}