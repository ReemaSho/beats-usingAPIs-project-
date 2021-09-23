'use strict';
import { APIKEY, NAPSTER_API } from './constants.js';
import { createAudioElement } from './views/appViews.js';

const fetchData = async (urlToFetch) => {
  try {
    const request = await fetch(urlToFetch);

    if (request.ok) {
      const jsonResponse = await request.json();
      return jsonResponse;
    }
    throw new Error(request.status);
  } catch (error) {
    console.log(error.message);
  }
};

export const getTopTracks = async () => {
  const url = `${NAPSTER_API}/v2.2/tracks/top?apikey=${APIKEY}`;
  try {
    const data = await fetchData(url);

    const { id, artistId, artistName, albumName, tracks } = data;
    console.log(tracks);
    console.log(id);
    tracks.forEach((track) => {
      const trackAudio = track.previewURL;

      createAudioElement(trackAudio);
    });
  } catch (error) {
    console.log(error.message);
  }
};
