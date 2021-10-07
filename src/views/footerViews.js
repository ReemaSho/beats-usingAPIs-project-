'use strict';
import { createDOMElement } from '../utils/DOMUtils.js';

export const createFooter = () => {
  const footerContainer = createDOMElement('footer', { id: 'footer' });
  const footerHead = createDOMElement('h2');
  footerHead.textContent = 'BEATS';
  const paragraph = createDOMElement('p');
  paragraph.innerHTML = 'POWERED BY REEMA ALSHOHOF&copy2021';
  footerContainer.append(footerHead, paragraph);
  const scriptTag = document.getElementsByTagName('script');
  scriptTag[0].parentNode.insertBefore(footerContainer, scriptTag[0]);
};
