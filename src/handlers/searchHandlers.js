
import { APIKEY, NAPSTER_API, MAIN_CONTAINER  } from '../constants.js';
import {
  clearDOMElement,
  getDOMElement,
} from '../utils/DOMUtils.js';

import {displayTracks }from './handleTracks.js';
import{fetchData } from './mainFetchDataFun.js';
 
 
 const fetchSearchData = async (query)=>{
    const url = `${NAPSTER_API}/v2.2/search/verbose?query=${query}&apikey=${APIKEY}&limit=20`;
    try{
    const searchRequest= await fetchData(url);
    if(searchRequest){
      const artistInfo = getDOMElement('artist-Info');
      const headEle = getDOMElement('head-section');
      if(headEle ){
        headEle.classList.add('display-none')
        clearDOMElement( MAIN_CONTAINER);
        displayTracks(searchRequest.search.data, true)
      }else if (artistInfo){
    clearDOMElement(artistInfo)
    clearDOMElement( MAIN_CONTAINER);
    displayTracks(searchRequest.search.data, true)
    }else{
      clearDOMElement( MAIN_CONTAINER);
      displayTracks(searchRequest.search.data, true)
    }
  }else throw new Error('Request Failed!')
 
    }catch(error){
      console.log(error)
    }
 }
 
 let  timeoutValue = 0 ;
 export const getTheInputValue = ()=>{
 const inputElement = getDOMElement('searchField');
 inputElement.value = "";
 
 inputElement.onkeyup = ()=>{
   if(inputElement.value.trim().length===0){
     return;
   }
    clearTimeout(timeoutValue);
    timeoutValue =setTimeout(async ()=>{
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
     },500)  
  }
 }

