'use strict';

const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

let apiQuotes = [];

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

/* -------------------------------------------------------------------------- */
/*                                 Show Quote                                 */
/* -------------------------------------------------------------------------- */

const newQuote = () => {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  authorText.textContent = quote.author ? quote.author : 'Unknown';
  if (quote.text.length > 100) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  quoteText.textContent = quote.text;
  complete();
};

/* -------------------------------------------------------------------------- */
/*                             Get Quotes from API                            */
/* -------------------------------------------------------------------------- */
async function getQuotes() {
  loading();
  const apiurl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiurl);
    apiQuotes = await response.json();
    newQuote();
  } catch (err) {
    // Error will be handles here
  }
}

/* -------------------------------------------------------------------------- */
/*                                 Tweet Quote                                */
/* -------------------------------------------------------------------------- */
const tweetQuote = () => {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterURL, '_blank');
};

twitterBtn.addEventListener('click', tweetQuote);

/* -------------------------------------------------------------------------- */
/*                                  NewQuote                                  */
/* -------------------------------------------------------------------------- */

newQuoteBtn.addEventListener('click', newQuote);

/* -------------------------------------------------------------------------- */
/*                                   On Load                                  */
/* -------------------------------------------------------------------------- */
getQuotes();
