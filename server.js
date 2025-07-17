const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const express = require('express');
const cors = require('cors');
const app = express();


puppeteer.use(StealthPlugin());
app.use(cors({methods:['GET','POST']}));
app.use(express.json());    
app.use(express.static('public'));  


const gadgets = [
  // --- Windows (15) ---
  { width: 1920, height: 1080, agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36' },
  { width: 1366, height: 768, agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0' },
  { width: 1600, height: 900, agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36' },
  { width: 1440, height: 900, agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36' },
  { width: 1536, height: 864, agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0' },
  { width: 1280, height: 720, agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36' },
  { width: 1680, height: 1050, agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36' },
  { width: 1360, height: 768, agent: 'Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36' },
  { width: 2560, height: 1440, agent: 'Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/125.0.0.0 Safari/537.36' },
  { width: 1280, height: 800, agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0' },
  { width: 1920, height: 1200, agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36' },
  { width: 1024, height: 768, agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0.0.0 Safari/537.36' },
  { width: 1600, height: 1024, agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126.0.0.0 Safari/537.36' },
  { width: 1920, height: 1080, agent: 'Mozilla/5.0 (Windows NT 11.0; Win64; x64) Edge/124.0.0.0 Safari/537.36' },
  { width: 2560, height: 1600, agent: 'Mozilla/5.0 (Windows NT 11.0; Win64; x64) Chrome/127.0.0.0 Safari/537.36' },

  // --- Android (12) ---
  { width: 412, height: 915, agent: 'Mozilla/5.0 (Linux; Android 13; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36' },
  { width: 360, height: 800, agent: 'Mozilla/5.0 (Linux; Android 12; SM-A125F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36' },
  { width: 360, height: 780, agent: 'Mozilla/5.0 (Linux; Android 11; Redmi Note 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Mobile Safari/537.36' },
  { width: 393, height: 873, agent: 'Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36' },
  { width: 384, height: 854, agent: 'Mozilla/5.0 (Linux; Android 10; moto e7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36' },
  { width: 360, height: 760, agent: 'Mozilla/5.0 (Linux; Android 13; Galaxy A52) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36' },
  { width: 412, height: 869, agent: 'Mozilla/5.0 (Linux; Android 12; Pixel 7a) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36' },
  { width: 385, height: 854, agent: 'Mozilla/5.0 (Linux; Android 12; Xiaomi 12) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36' },
  { width: 390, height: 844, agent: 'Mozilla/5.0 (Linux; Android 13; Galaxy S21) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36' },
  { width: 360, height: 740, agent: 'Mozilla/5.0 (Linux; Android 11; Nokia 5.3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36' },
  { width: 393, height: 851, agent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36' },
  { width: 412, height: 892, agent: 'Mozilla/5.0 (Linux; Android 14; Galaxy S24) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36' },

  // --- iPhone (10) ---
  { width: 390, height: 844, agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile Safari/604.1' },
  { width: 428, height: 926, agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.2 Mobile Safari/604.1' },
  { width: 375, height: 812, agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.7 Mobile Safari/604.1' },
  { width: 414, height: 896, agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.8 Mobile Safari/604.1' },
  { width: 375, height: 667, agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.6 Mobile Safari/604.1' },
  { width: 390, height: 844, agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile Safari/604.1' },
  { width: 428, height: 926, agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile Safari/604.1' },
  { width: 375, height: 812, agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.5 Mobile Safari/604.1' },
  { width: 390, height: 844, agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile Safari/604.1' },
  { width: 414, height: 736, agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.3 Mobile Safari/604.1' },

  // --- macOS (6) ---
  { width: 1440, height: 900, agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15' },
  { width: 2560, height: 1600, agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15' },
  { width: 1680, height: 1050, agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 12_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Safari/605.1.15' },
  { width: 1440, height: 900, agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15' },
  { width: 1920, height: 1200, agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Safari/605.1.15' },
  { width: 2304, height: 1440, agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 12_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.3 Safari/605.1.15' },

  // --- iPadOS (4) ---
  { width: 810, height: 1080, agent: 'Mozilla/5.0 (iPad; CPU OS 16_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Mobile Safari/604.1' },
  { width: 834, height: 1112, agent: 'Mozilla/5.0 (iPad; CPU OS 15_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Mobile Safari/604.1' },
  { width: 834, height: 1194, agent: 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile Safari/604.1' },
  { width: 768, height: 1024, agent: 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile Safari/604.1' }
];



const delay = ms => new Promise(r => setTimeout(r,ms*1000));


async function start(){
  console.log('STARTED BOT');
  const device = gadgets[Math.floor(Math.random()*gadgets.length)];
  console.log(device);
  const browser = await puppeteer.launch({ headless: true,  args: [
    '--enable-notifications',
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage', 
    '--disable-accelerated-2d-canvas',
    '--no-first-run',
    '--no-zygote',
    '--single-process', 
    '--disable-gpu',
    '--disable-blink-features=AutomationControlled',
    '--disable-infobars'
  ] });
  const page = await browser.newPage();

  browser.on('targetcreated', async (target) => {
    if (target.type() === 'page') {
      const newPage = await target.page();
      await page.setUserAgent(device.agent);
      await newPage.setUserAgent(device.agent);
      await newPage.setViewport({ width: device.width, height: device.height });
      await page.setViewport({ width: device.width, height: device.height, deviceScaleFactor: 1 });
      console.log('New page opened, user-agent set.');
    }
  });

  await page.setUserAgent(device.agent);
  await page.setViewport({ width: device.width, height: device.height, deviceScaleFactor: 1 });
  
  await page.evaluateOnNewDocument(() => {
    // navigator.webdriver
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false,
    });

    // window.chrome
    window.chrome = {
      runtime: {},
      // добавь другие свойства если нужно
    };

    // navigator.permissions
    const originalQuery = window.navigator.permissions.query;
    window.navigator.permissions.query = (parameters) =>
      parameters.name === 'notifications'
        ? Promise.resolve({ state: Notification.permission })
        : originalQuery(parameters);

    // navigator.languages
    Object.defineProperty(navigator, 'languages', {
      get: () => ['en-US', 'en'],
    });

    // navigator.plugins
    const fakePlugins = [
      {
        name: 'Chrome PDF Plugin',
        filename: 'internal-pdf-viewer',
        description: 'Portable Document Format',
      },
      {
        name: 'Chrome PDF Viewer',
        filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai',
        description: '',
      },
      {
        name: 'Native Client',
        filename: 'internal-nacl-plugin',
        description: '',
      },
      {
        name: 'Widevine Content Decryption Module',
        filename: 'widevinecdmadapter.dll',
        description: 'Widevine CDM for DRM',
      },
    ];
    const fakePluginArray = fakePlugins.map(p => {
      return Object.setPrototypeOf(p, Plugin.prototype);
    });
    Object.setPrototypeOf(fakePluginArray, PluginArray.prototype);
    Object.defineProperty(navigator, 'plugins', {
      get: () => fakePluginArray,
    });

    // navigator.mimeTypes
    const fakeMimeTypes = [
      {
        type: 'application/pdf',
        description: '',
        suffixes: 'pdf',
        enabledPlugin: fakePlugins[0],
      }
    ];
    Object.setPrototypeOf(fakeMimeTypes, MimeTypeArray.prototype);
    Object.defineProperty(navigator, 'mimeTypes', {
      get: () => fakeMimeTypes,
    });

    // canvas spoof
    const getFakeCanvas = () => 'data:image/png;base64,fakeimgstring';
    const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
    HTMLCanvasElement.prototype.toDataURL = function () {
      return getFakeCanvas();
    };

    // WebGL vendor/renderer
    const getParameter = WebGLRenderingContext.prototype.getParameter;
    WebGLRenderingContext.prototype.getParameter = function (parameter) {
      if (parameter === 37445) return 'Intel Inc.';
      if (parameter === 37446) return 'Intel Iris OpenGL Engine';
      return getParameter.call(this, parameter);
    };

    // AudioContext fingerprint
    const copy = AudioBuffer.prototype.getChannelData;
    AudioBuffer.prototype.getChannelData = function () {
      const results = copy.apply(this, arguments);
      for (let i = 0; i < results.length; i += 100) {
        results[i] = results[i] + Math.random() * 0.0000001;
      }
      return results;
    };

    // удаление window.cdc_*
    for (let key in window) {
      if (key.match(/^\$?cdc_/) || key === '__webdriver_evaluate') {
        delete window[key];
      }
    }

    // eval защита
    const originalEval = window.eval;
    window.eval = function () {
      if (arguments[0].toString().includes('webdriver')) {
        return null;
      }
      return originalEval(...arguments);
    };

    // Function защита
    const originalFunction = Function.prototype.toString;
    Function.prototype.toString = function () {
      if (this.toString().includes('[native code]')) {
        return 'function () { [native code] }';
      }
      return originalFunction.apply(this, arguments);
    };
  });

  await page.goto('https://best-earn.vercel.app/');
  await delay(2);
  await page.mouse.wheel({ deltaY: 2500 });
  await delay(2);
  
  setInterval(async () => {
    const cords = { x: device.width - 302 + (Math.floor(Math.random() * 128)), y: device.height - 89 + (Math.floor(Math.random() * 36)) }
    await page.mouse.click(cords.x, cords.y);
    await page.mouse.wheel({ deltaY: -(Math.floor(Math.random() * 3000)) });
  }, 50+ Math.floor(Math.random() * 100) );


  setInterval(async () => {
      await page.mouse.click( Math.ceil(Math.random()*device.width), Math.ceil(Math.random()*device.height));
      //await page.screenshot({ path: "public/img.png" })
  }, 3425 + Math.floor(Math.random() * 3000));

  setInterval(async () => {
    await page.mouse.wheel({ deltaY: (Math.floor(Math.random() * 3000)) });
  }, 15324 + Math.floor(Math.random() * 3000));
 
  
  console.log('FINISH')
}




app.get('/start', async (req, res) => {
  start();
  res.send({ type: true });
});

  
app.listen('3000', err => { err ? err : console.log('STARTD SERVER') });