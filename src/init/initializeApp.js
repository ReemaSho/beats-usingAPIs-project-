'use strict';
import { getTopTracks } from '../data.js';

const initializeHomePage = () => {
  getTopTracks();
};

window.addEventListener('load', initializeHomePage);
