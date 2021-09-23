'use strict';
import {
  clearDOMElement,
  createDOMElement,
  getDOMElement,
} from '../utils/DOMUtils.js';
import { MAIN_CONTAINER } from '../constants.js';
const createTrackContainer = (track) => {
  const trackContainer = createDOMElement('div');
  trackContainer.setAttribute('class', 'track-container');
  trackContainer.appendChild(track);
  MAIN_CONTAINER.appendChild(trackContainer);
};
export const createAudioElement = (audioSrc) => {
  const audioEle = createDOMElement('audio', { id: 'audioElement' });
  audioEle.setAttribute('controls', '');
  audioEle.src = audioSrc;
  createTrackContainer(audioEle);
};
