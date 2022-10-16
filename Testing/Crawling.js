import * as React from 'react-native';


async function loadGraphicCards(page = 1) {
  const searchUrl = `https://www.amazon.de/s/?page=${page}&keywords=graphic+card`;
  const response = await fetch(searchUrl);   // fetch page

  const htmlString = await response.text();  // get response text
}