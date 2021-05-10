const puppeteer = require('puppeteer');

const CRX_PATH = 'C:\\Users\\QuickboostTest\\Downloads\\aaamjmkbfkkmglpibjlcbmbilljdhhli';
const Dev_CRX_PATH = 'C:\\Users\\QuickboostTest\\Downloads\\WA-TP-v0.25-Testbuild-004\\chrome';
const ext_example ="C:\\Users\\QuickboostTest\\Downloads\\chrome-extensions-samples-main\\chrome-extensions-samples-main\\examples\\hello-world";
const ext_ex1 ="C:\\Users\\QuickboostTest\\Desktop\\puppeteer_examples\\Extension_Example";


puppeteer.launch({
  headless: false, // extensions only supported in full chrome.
  args: [
    `--disable-extensions-except=${CRX_PATH}`,
    `--load-extensions=${CRX_PATH}`,
  ]
  }).then(async browser => {
  const page = await browser.newPage();
  
  
  const targets = await browser.targets();
  const backgroundPageTarget = targets.find(
    (target) => target.type() === 'background_page'
  );
  const backgroundPage = await backgroundPageTarget.page();

  //activate request Interception

  await backgroundPage.setRequestInterception(true);
  backgroundPage.on('request', interceptedRequest => {
      
    console.log(interceptedRequest.url());
    interceptedRequest.continue();
        })

  await page.goto('file:///C:/Users/QuickboostTest/Desktop/puppeteer_examples/webPage.html');
  // await Promise.all([
  //   page.goto('file:///C:/Users/QuickboostTest/Desktop/puppeteer_examples/webPage.html'),
  //   page.waitForNavigation( { waitUntil: 'networkidle2'}),
  //   // page.textContent
  // ]);
  
  // console.log(page)

  // await browser.close();
});