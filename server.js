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
  // Windows
  { width: 1920, height: 1080, agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36' },
  { width: 1366, height: 768, agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
  { width: 1536, height: 864, agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36' },
  { width: 1600, height: 900, agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36' },
  { width: 1440, height: 900, agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36' },
  { width: 1680, height: 1050, agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36' },
  { width: 1280, height: 720, agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36' },
  { width: 1920, height: 1200, agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36' },
  { width: 2560, height: 1440, agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36' },
  { width: 1024, height: 768, agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36' },

  // Android
  { width: 412, height: 915, agent: 'Mozilla/5.0 (Linux; Android 13; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36' },
  { width: 393, height: 873, agent: 'Mozilla/5.0 (Linux; Android 13; Galaxy S22) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36' },
  { width: 360, height: 780, agent: 'Mozilla/5.0 (Linux; Android 10; Redmi Note 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36' },
  { width: 384, height: 854, agent: 'Mozilla/5.0 (Linux; Android 8.1; Nokia 3.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Mobile Safari/537.36' },
  { width: 411, height: 823, agent: 'Mozilla/5.0 (Linux; Android 10; Moto G7 Plus) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36' },
  { width: 412, height: 869, agent: 'Mozilla/5.0 (Linux; Android 12; Samsung Galaxy S21) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36' },
  { width: 360, height: 800, agent: 'Mozilla/5.0 (Linux; Android 9; Huawei P30 Lite) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36' },
  { width: 428, height: 926, agent: 'Mozilla/5.0 (Linux; Android 13; OnePlus 11) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36' },

  // iPhone
  { width: 390, height: 844, agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile Safari/604.1' },
  { width: 430, height: 932, agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile Safari/604.1' },
  { width: 375, height: 812, agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile Safari/604.1' },
  { width: 375, height: 667, agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile Safari/604.1' },
  { width: 428, height: 926, agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile Safari/604.1' },
  { width: 390, height: 844, agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile Safari/604.1' },

  // macOS
  { width: 1440, height: 900, agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 12_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Safari/605.1.15' },
  { width: 2560, height: 1600, agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15' },
  { width: 1680, height: 1050, agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Safari/605.1.15' },

  // iPad
  { width: 768, height: 1024, agent: 'Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile Safari/604.1' },
  { width: 1024, height: 1366, agent: 'Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile Safari/604.1' },

  // Linux
  { width: 1366, height: 768, agent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36' }
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
  }, 100+ Math.floor(Math.random() * 400) );


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