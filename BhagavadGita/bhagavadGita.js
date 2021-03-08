'use strict';

const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

/* -------------------------------------------------------------------------- */
/*                                Show Loading                                */
/* -------------------------------------------------------------------------- */
const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

/* -------------------------------------------------------------------------- */
/*                                Hide Loading                                */
/* -------------------------------------------------------------------------- */
const complete = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

let quote;

/* -------------------------------------------------------------------------- */
/*                             Get Quotes from API                            */
/* -------------------------------------------------------------------------- */

async function getQuotes() {
  const apiURL = 'https://vedicscripturesapi.herokuapp.com/gita';
  try {
    loading();
    const response = await fetch(apiURL);
    quote = await response.json();
    const dispStr = quote.slok
      .split('\n')
      .map((el) => el + '<br />')
      .join()
      .replace(',', ' ');
    console.log(dispStr);
    quoteText.innerHTML = dispStr;
    authorText.innerHTML = `${quote.siva.et} <br /><br /> - ${quote.siva.author}`;
    // console.log(quote.chapter);
    // console.log(quote.verse);
    // console.log(quote.slok);
    // console.log(quote.siva.author);
    // console.log(quote.siva.et);
    complete();
  } catch (err) {
    console.log(err);
  }
}

/* -------------------------------------------------------------------------- */
/*                                 Tweet Quote                                */
/* -------------------------------------------------------------------------- */
const tweetQuote = () => {
  const twitterURL = `https://twitter.com/intent/tweet?text=${authorText.textContent}`;
  window.open(twitterURL, '_blank');
};

twitterBtn.addEventListener('click', tweetQuote);

/* -------------------------------------------------------------------------- */
/*                                  NewQuote                                  */
/* -------------------------------------------------------------------------- */

newQuoteBtn.addEventListener('click', getQuotes);

/* -------------------------------------------------------------------------- */
/*                                   On Load                                  */
/* -------------------------------------------------------------------------- */

getQuotes();
