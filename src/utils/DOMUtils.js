'use strict';

/**
 * This function removes all the html inside the given element
 */
export const clearDOMElement = (DOMElement) => {
  DOMElement.innerHTML = '';
};

//create DOM element with ID
export const createDOMElement = (tag, options) => {
  const { id } = options || {};
  const element = document.createElement(tag);

  if (id != null) {
    element.id = id;
  }

  return element;
};

/**
 * Find and return a DOM element by its id
 */
export const getDOMElement = (id) => {
  return document.getElementById(id);
};
