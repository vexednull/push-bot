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
  {
    height: 800,
    width: 1280,
    agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  },
  {
    height: 900,
    width: 1440,
    agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  },
  {
    height: 1080,
    width: 1920,
    agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0'
  },
  {
    height: 720,
    width: 1280,
    agent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  },
  {
    height: 1600,
    width: 2560,
    agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15'
  },
  // Мобильные устройства
  {
    height: 844,
    width: 390,
    agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
  },
  {
    height: 926,
    width: 428,
    agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1'
  },
  {
    height: 1366,
    width: 1024,
    agent: 'Mozilla/5.0 (iPad; CPU OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
  },
  {
    height: 1180,
    width: 820,
    agent: 'Mozilla/5.0 (iPad; CPU OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1'
  },
  {
    height: 1480,
    width: 720,
    agent: 'Mozilla/5.0 (Linux; Android 13; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
  },
  {
    height: 1600,
    width: 720,
    agent: 'Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
  },
  {
    height: 2400,
    width: 1080,
    agent: 'Mozilla/5.0 (Linux; Android 13; SM-G998B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
  },
  {
    height: 1080,
    width: 412,
    agent: 'Mozilla/5.0 (Linux; Android 13; Pixel 6a) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
  },
  {
    height: 1080,
    width: 393,
    agent: 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
  },
  {
    height: 1284,
    width: 2778,
    agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1'
  },
  {
    height: 1170,
    width: 2532,
    agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
  },
  {
    height: 1344,
    width: 896,
    agent: 'Mozilla/5.0 (iPad; CPU OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1'
  },
  {
    height: 1620,
    width: 1080,
    agent: 'Mozilla/5.0 (Linux; Android 13; SM-T870) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  },
  {
    height: 2560,
    width: 1440,
    agent: 'Mozilla/5.0 (Linux; Android 13; SM-G986B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
  },
  {
    height: 3040,
    width: 1440,
    agent: 'Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
  }
];


const delay = ms => new Promise(r => setTimeout(r,ms*1000));


async function start(){
  const myDevice = gadgets[Math.floor(Math.random()*gadgets.length)];
  const browser = await puppeteer.launch({ headless: true,  args: [
    '--enable-notifications',
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage', 
    '--disable-accelerated-2d-canvas',
    '--no-first-run',
    '--no-zygote',
    '--single-process', 
    '--disable-gpu'
  ] });
  const page = await browser.newPage();

  await page.setUserAgent(myDevice.agent);
  await page.setViewport({ width: myDevice.width, height: myDevice.height});
  await page.setViewport({ width: 392, height: 735});
  
  await page.evaluateOnNewDocument(() => {
    Object.defineProperties(navigator, {
      webdriver: { get: () => false },
      plugins: { get: () => [1, 2, 3] },
      mimeTypes: { get: () => ({ 'application/pdf': 'PDF Viewer' }) }
    });
  });

  await page.goto('https://best-earn.vercel.app/');
  delay(6);
  setInterval(async () => {
     const wclick = myDevice.width-(326+Math.ceil(Math.random()*125))
     const hclick = myDevice.height-(445+Math.ceil(Math.random()*33));
     console.log(hclick, wclick)
     await page.mouse.click(236, 589);
  }, 100)
  setInterval(async () => {
     await page.screenshot({
    path: 'public/img.png'
  });
  }, 1000)
 
  console.log(myDevice);
  console.log('SCREENSHOT')

  await delay(350);
  await browser.close();
}





app.get('/start', async (req, res) => {
  start();
  res.send({ type: true });
});

  
app.listen('3000', err => { err ? err : console.log('STARTD SERVER') });

