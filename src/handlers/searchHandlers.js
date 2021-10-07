import { APIKEY, NAPSTER_API, MAIN_CONTAINER } from '../constants.js';
import { clearDOMElement, getDOMElement } from '../utils/DOMUtils.js';

import { displayTracks } from './handleTracks.js';
import { fetchData } from './mainFetchDataFun.js';

const fetchSearchData = async (query) => {
  const url = `${NAPSTER_API}/v2.2/search/verbose?query=${query}&apikey=${APIKEY}&limit=20`;
  try {
    const searchRequest = await fetchData(url);
    if (searchRequest) {
      clearDOMElement(MAIN_CONTAINER);
      displayTracks(searchRequest.search.data, true);
    } else throw new Error('Request Failed!');
  } catch (error) {
    console.log(error);
  }
};

let timeoutValue = 0;
export const getTheInputValue = () => {
  const inputElement = getDOMElement('searchField');
  inputElement.value = '';

  inputElement.onkeyup = () => {
    if (inputElement.value.trim().length === 0) {
      return;
    }

    clearTimeout(timeoutValue);
    timeoutValue = setTimeout(() => {
      const artistInfo = getDOMElement('artist-Info');
      const headEle = getDOMElement('head-section');
      if (artistInfo) {
        artistInfo.remove();
      } else if (headEle) {
        headEle.remove();
      } else {
      }
      fetchSearchData(inputElement.value);
    }, 250);
  };
};
