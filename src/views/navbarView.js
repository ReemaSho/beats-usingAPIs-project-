'use strict';
import { createDOMElement } from '../utils/DOMUtils.js';
import { MAIN_CONTAINER } from '../constants.js';
export const createTheMainHead = () => {
  const headSection = createDOMElement('div', { id: 'head-section' });
  const header = createDOMElement('h1', { id: 'header' });
  const header1 = createDOMElement('h1', { id: 'beats' });

  header.innerHTML = '<span>BEATS</span> Sing The Melody Of your Soul';
  headSection.append(header1, header);
  return headSection;
};
export const createNavBar = () => {
  const navbar = createDOMElement('nav');
  navbar.classList.add('navbar');
  const logoContainer = createDOMElement('div');
  logoContainer.classList.add('container');
  const link = createDOMElement('a');
  Object.assign(link, {
    className: 'navbar-brand home',
    href: '#',
    textContent: 'BEATS',
  });
  const logo = createDOMElement('img');
  Object.assign(logo, {
    className: 'd-inline-block align-text-top',
    src: './public/images/logo2.png',
    width: '30',
    height: '24',
    aria_label: 'Search',
  });
  const formEle = createDOMElement('form');
  formEle.classList.add('d-flex');
  const homePageEle = createDOMElement('div');
  homePageEle.classList.add('home');
  homePageEle.textContent = 'Home';
  const aboutEle = createDOMElement('div', { id: 'about' });
  aboutEle.innerHTML = "<a href= '#footer' > About</a>";
  const inputField = createDOMElement('input');
  Object.assign(inputField, {
    id: 'searchField',
    className: 'orm-control me-2',
    type: 'search',
    placeholder: 'Search',
    aria_label: 'Search',
  });
  const mainImage = createTheMainHead();
  link.prepend(logo);
  formEle.append(homePageEle, aboutEle, inputField);
  logoContainer.append(link, formEle);

  navbar.append(logoContainer, mainImage);

  MAIN_CONTAINER.parentNode.insertBefore(navbar, MAIN_CONTAINER);
};
