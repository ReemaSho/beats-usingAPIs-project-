'use strict';
import { createDOMElement } from '../utils/DOMUtils.js';

export const createTrackContainer = (trackCoverImage) => {
  const trackContainer = createDOMElement('div');
  trackContainer.setAttribute('class', 'track-container');
  const trackImage = createDOMElement('img');
  trackImage.classList.add('track-image');
  trackImage.src = `http://direct.rhapsody.com/imageserver/v2/albums/${trackCoverImage}/images/300x300.jpg`;
  trackContainer.appendChild(trackImage);
  return trackContainer;
};

export const createAudioElement = (audioSrc) => {
  const audioEle = new Audio(audioSrc);
  audioEle.setAttribute('controls', '');
  audioEle.setAttribute('type', 'audio/mpeg');
  return audioEle;
};

export const createTrackHeaders = (tag, headerTxt, extraInfo) => {
  const artistNameEle = createDOMElement(tag);
  if (!extraInfo) {
    artistNameEle.textContent = headerTxt;
  } else {
    artistNameEle.textContent = `${headerTxt} ${extraInfo}`;
  }
  return artistNameEle;
};
