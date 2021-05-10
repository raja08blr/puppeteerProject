const puppeteer = require('puppeteer');


puppeteer.launch({
  headless: false, 

  }).then(async browser => {
  const page = await browser.newPage();

  await page.setRequestInterception(true);
  page.on('request', interceptedRequest => {
      
      console.log(interceptedRequest.url());
      interceptedRequest.continue();
    
  });
  
  await page.goto('file:///C:/Users/QuickboostTest/Desktop/puppeteer_examples/webpageWithGet.html',  {timeout: 40000});

});