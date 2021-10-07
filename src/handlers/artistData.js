import { APIKEY } from '../constants.js';
import { createArtistPageHeader } from '../views/artistPageView.js';
import { displayTracks } from './handleTracks.js';
import { fetchData } from './mainFetchDataFun.js';

export const getArtistData = async (artistHref) => {
  const imageUrl = `${artistHref}/images?apikey=${APIKEY}`;
  const artistTopTracks = `${artistHref}/tracks/top?apikey=${APIKEY}&limit=40`;
  const artistUrl = `${artistHref}?apikey=${APIKEY}`;
  try {
    const artistInfo = await Promise.all([
      fetchData(imageUrl),
      fetchData(artistUrl),
      fetchData(artistTopTracks),
    ]);
    if (artistInfo) {
      let artistImage = '../../public/images/default.JPG';
      if (artistInfo[0].images.length >= 4) {
        artistImage = artistInfo[0].images[3].url;
      }

      const artistDetails = artistInfo[1].artists[0];
      const topTracks = artistInfo[2];
      displayTracks(topTracks, true);
      const { bios, blurbs, name } = artistDetails;
      if (blurbs.length > 0) {
        const artistBlurbs = blurbs.join(' ');
        createArtistPageHeader(artistImage, name, artistBlurbs);
      } else if (bios) {
        const artistBio = bios[0].bio;
        createArtistPageHeader(artistImage, name, artistBio);
      } else {
        createArtistPageHeader(artistImage, name);
      }

      const artistTopTracksEle =
        document.querySelectorAll('.artist-top-tracks');
      artistTopTracksEle.forEach((header) =>
        header.classList.add('display-none')
      );
    } else {
      throw new Error('Request Failed!');
    }
  } catch (error) {
    console.log(error.message);
  }
};
