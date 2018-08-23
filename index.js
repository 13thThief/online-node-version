'use strict';

let ora = require('ora');
let spinner = ora('Fetching version...');

spinner.start();

let cheerio = require('cheerio');
let request = require('request');

const NODE_URL = 'https://nodejs.org/en/';
const URL = require('url').parse(NODE_URL);

function fire(url) {
  request(URL, function (err, res, html) {
    spinner.stop();
      if (err) {
        console.log(`${ URL.hostname } is unreachable OR No Internet connection`);
      }
      else if (res.statusCode === 200) {
        let $ = cheerio.load(html);
        const latest = $('.home-downloadblock').eq(1).children('a').attr('data-version');
        if(process.version === latest){
          console.log('No change');
        } else {
          console.log('Need to update to: ', latest);
        }
      }
  });
}

fire(NODE_URL)
