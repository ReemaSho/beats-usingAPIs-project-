'use strict';

import { APIKEY, NAPSTER_API, MAIN_CONTAINER } from '../constants.js';
import { clearDOMElement, getDOMElement } from '../utils/DOMUtils.js';
import { displayTracks } from './handleTracks.js';
import { fetchData } from './mainFetchDataFun.js';
import { createTheMainHead } from '../views/navbarView.js';
export const getTopTracks = async () => {
  const url = `${NAPSTER_API}/v2.2/tracks/top?apikey=${APIKEY}&range=week&limit=40`;
  try {
    const data = await fetchData(url);
    if (data) {
      clearDOMElement(MAIN_CONTAINER);
      displayTracks(data, true);
    } else {
      throw new Error('Request Failed!');
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const backToHomePage = () => {
  const homeElements = document.querySelectorAll('.home');
  const clearInputField = getDOMElement('searchField');

  homeElements.forEach((item) => {
    item.addEventListener('click', async () => {
      try {
        const artistInfo = getDOMElement('artist-Info');
        if (artistInfo) {
          artistInfo.remove();
        }
        const displayHead = getDOMElement('head-section');
        if (!displayHead) {
          const mainImage = createTheMainHead();
          MAIN_CONTAINER.parentNode.insertBefore(mainImage, MAIN_CONTAINER);
        }

        clearInputField.value = '';
        await getTopTracks();
      } catch (error) {
        console.log(error);
      }
    });
  });
};

export const stopAudioFromPlaying = () => {
  document.addEventListener(
    'play',
    (e) => {
      const audioElements = document.querySelectorAll('audio');
      audioElements.forEach((audio) => {
        if (audio != e.target) {
          audio.pause();
        }
      });
    },
    true
  );
};
