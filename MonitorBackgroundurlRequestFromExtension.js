const puppeteer = require('puppeteer');

const CRX_PATH = 'C:\\Users\\QuickboostTest\\Downloads\\aaamjmkbfkkmglpibjlcbmbilljdhhli';
const ext_test = 'C:\\Users\\QuickboostTest\\Downloads\\aaeailmangokcagoofekkfanhffgddgi'
const Dev_CRX_PATH = 'C:\\Users\\QuickboostTest\\Downloads\\WA-TP-v0.25-Testbuild-004\\chrome';
const ext_example ="C:\\Users\\QuickboostTest\\Downloads\\chrome-extensions-samples-main\\chrome-extensions-samples-main\\examples\\hello-world";
const ext_ex1 ="C:\\Users\\QuickboostTest\\Desktop\\puppeteer_examples\\Extension_Example";
const dynamic_anal_ext = "C:\\Users\\QuickboostTest\\Documents\\RajareddyV\\DynamicAnalysisWork\\DynamicAnalysis";


puppeteer.launch({
  headless: false, 
  args: [
    `--disable-extensions-except=${ext_test},${Dev_CRX_PATH}`,
    `--load-extensions=${ext_test},${Dev_CRX_PATH}`,
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

  // await page.goto('file:///C:/Users/QuickboostTest/Desktop/puppeteer_examples/webPage.html',{timeout: 40000});

  await page.setViewport({ width: 1366, height: 768});
  await page.goto('http://127.0.0.1:8000/', { waitUntil: 'networkidle2'}); // wait until page load
  await page.goto('http://127.0.0.1:8000/accounts/login/', { waitUntil: 'networkidle2'});
  await page.type('#id_login', 'admin');
  await page.type('#id_password','admin');
  await page.click('body > main > div > section > div > div > form > button', { waitUntil: 'networkidle2' });
  await page.waitForTimeout(1800)
  await page.goto('http://127.0.0.1:8000/product/shirt/', { waitUntil: 'networkidle2' });
  await page.waitForTimeout(1000)
  await page.click('body > main > div > div:nth-child(1) > div:nth-child(2) > div > a.btn.btn-primary.btn-md.my-0.p.waves-effect.waves-light', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000)
  await page.goto('http://127.0.0.1:8000/order-summary/', { waitUntil: 'domcontentloaded' });
  await page.click('body > main > div > div > table > tbody > tr:nth-child(3) > td > a.btn.btn-warning.float-right.ml-2.waves-effect.waves-light', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(50)
  await page.type('#shipping_address','No 22 8th Floor Brigade metropolis');
  await page.type('#shipping_address2','Tower D');
  await page.type('#id_shipping_country','india');
  await page.type('#shipping_zip','560040');
  
  await page.type('#billing_address','No 22 8th Floor Brigade metropolis');
  await page.type('#billing_address2','Tower D');
  await page.type('#id_billing_country','india');
  await page.type('#billing_zip','560040');

  //await page.click('body > main > div > div > div.col-md-8.mb-4 > div > form > div:nth-child(4) > label');
  //await page.click('body > main > div > div > div.col-md-8.mb-4 > div > form > div:nth-child(8) > label');
  await page.click('body > main > div > div > div.col-md-8.mb-4 > div > form > div.d-block.my-3 > div:nth-child(1) > label');
  //await page.waitForTimeout(100)
  await page.type('#aadhar_id','554623238976');
  // get the selector input type=file (for upload file)
  await page.waitForSelector('input[type=file]');
  await page.waitForTimeout(1000);

  // get the ElementHandle of the selector above
  const inputUploadHandle = await page.$('input[type=file]');
  let fileToUpload = 'test_to_upload.jpg';

  // Sets the value of the file input to fileToUpload
  inputUploadHandle.uploadFile(fileToUpload);

  // doing click on button to trigger upload file
  //await page.waitForSelector('body > main > div > div > div.col-md-8.mb-4 > div > form > div:nth-child(15) > button');
  await page.click('body > main > div > div > div.col-md-8.mb-4 > div > form > div:nth-child(15) > button',{ waitUntil: 'networkidle2'});
  

  // wait for selector that contains the uploaded file URL
  //await page.waitForSelector('#upload-link');
  await page.waitForTimeout(2000);

  

  // await page.click('body > main > div > div > div.col-md-8.mb-4 > div > form > button', { waitUntil: 'networkidle2'});
 
});