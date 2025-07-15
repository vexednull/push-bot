const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const express = require('express');
const cors = require('cors');
const app = express();


puppeteer.use(StealthPlugin());
app.use(cors({methods:['GET','POST']}));
app.use(express.json());    
app.use(express.static('public'));  

const laptops = [
  {
    name: 'Dell XPS 15 (2023)',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1200 },
    deviceScaleFactor: 1.25,
    isMobile: false,
    os: 'Windows',
    cpuCores: 12,
    memory: 32
  },
  {
    name: 'MacBook Pro 16" M2 Max',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Safari/605.1.15',
    viewport: { width: 1728, height: 1117 },
    deviceScaleFactor: 2,
    isMobile: false,
    os: 'MacOS',
    cpuCores: 12,
    memory: 32
  },
  {
    name: 'Lenovo ThinkPad X1 Carbon Gen 10',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1.5,
    isMobile: false,
    os: 'Windows',
    cpuCores: 8,
    memory: 16
  },
  {
    name: 'HP Spectre x360 14',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1280 },
    deviceScaleFactor: 1.5,
    isMobile: false,
    os: 'Windows',
    cpuCores: 10,
    memory: 16
  },
  {
    name: 'ASUS ROG Zephyrus G14',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    viewport: { width: 2560, height: 1440 },
    deviceScaleFactor: 1.25,
    isMobile: false,
    os: 'Windows',
    cpuCores: 8,
    memory: 32
  },
  {
    name: 'Microsoft Surface Laptop 5',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 2256, height: 1504 },
    deviceScaleFactor: 1.5,
    isMobile: false,
    os: 'Windows',
    cpuCores: 10,
    memory: 16
  },
  {
    name: 'Acer Swift 3',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    isMobile: false,
    os: 'Windows',
    cpuCores: 4,
    memory: 8
  },
  {
    name: 'Razer Blade 15',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    viewport: { width: 2560, height: 1440 },
    deviceScaleFactor: 1.25,
    isMobile: false,
    os: 'Windows',
    cpuCores: 14,
    memory: 32
  },
  {
    name: 'LG Gram 17',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 2560, height: 1600 },
    deviceScaleFactor: 1.25,
    isMobile: false,
    os: 'Windows',
    cpuCores: 12,
    memory: 16
  },
  {
    name: 'MSI Creator Z16',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    viewport: { width: 2560, height: 1600 },
    deviceScaleFactor: 1.5,
    isMobile: false,
    os: 'Windows',
    cpuCores: 14,
    memory: 32
  },
  {
    name: 'MacBook Air M2',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Safari/605.1.15',
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    isMobile: false,
    os: 'MacOS',
    cpuCores: 8,
    memory: 16
  },
  {
    name: 'Lenovo Yoga 9i',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 3840, height: 2400 },
    deviceScaleFactor: 2,
    isMobile: false,
    os: 'Windows',
    cpuCores: 12,
    memory: 16
  },
  {
    name: 'Samsung Galaxy Book3 Pro',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    viewport: { width: 2880, height: 1800 },
    deviceScaleFactor: 1.75,
    isMobile: false,
    os: 'Windows',
    cpuCores: 12,
    memory: 16
  },
  {
    name: 'Framework Laptop 13',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 2256, height: 1504 },
    deviceScaleFactor: 1.5,
    isMobile: false,
    os: 'Windows',
    cpuCores: 8,
    memory: 16
  },
  {
    name: 'HP Envy 16',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    viewport: { width: 2560, height: 1600 },
    deviceScaleFactor: 1.25,
    isMobile: false,
    os: 'Windows',
    cpuCores: 14,
    memory: 32
  },
  {
    name: 'Dell Alienware x14',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1.25,
    isMobile: false,
    os: 'Windows',
    cpuCores: 14,
    memory: 32
  },
  {
    name: 'MacBook Pro 14" M3 Pro',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Safari/605.1.15',
    viewport: { width: 1512, height: 982 },
    deviceScaleFactor: 2,
    isMobile: false,
    os: 'MacOS',
    cpuCores: 12,
    memory: 36
  },
  {
    name: 'ASUS ZenBook 14X',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 2880, height: 1800 },
    deviceScaleFactor: 1.75,
    isMobile: false,
    os: 'Windows',
    cpuCores: 10,
    memory: 16
  },
  {
    name: 'Microsoft Surface Laptop Studio',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    viewport: { width: 2400, height: 1600 },
    deviceScaleFactor: 1.5,
    isMobile: false,
    os: 'Windows',
    cpuCores: 8,
    memory: 32
  },
  {
    name: 'Lenovo Legion Slim 7',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    viewport: { width: 2560, height: 1600 },
    deviceScaleFactor: 1.25,
    isMobile: false,
    os: 'Windows',
    cpuCores: 8,
    memory: 16
  }
];

const delay = ms => new Promise(r => setTimeout(r,ms*1000));


async function start(){
  console.log('STARTED BOT');
  const device = laptops[Math.floor(Math.random() * laptops.length)];

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
    '--lang=en-US,en;q=0.9',
    '--window-size=1366,768'
  ] });
  const page = await browser.newPage();

  await page.setUserAgent(device.userAgent);
  await page.setViewport(device.viewport);
  await page.setViewport({ width: 1206, height: 600});



  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
    'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36');
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9'
  });

  // Подменяем WebGL fingerprint (GPU)
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'platform', {
      get: () => 'Win32',
    });

    const getParameter = WebGLRenderingContext.prototype.getParameter;
    WebGLRenderingContext.prototype.getParameter = function (parameter) {
      if (parameter === 37445) return 'Intel Inc.';
      if (parameter === 37446) return 'Intel Iris OpenGL Engine';
      return getParameter.call(this, parameter);
    };
  });

  // Устанавливаем поддельную геолокацию — Нью-Йорк, США
  await page.emulateTimezone('America/New_York');
  await page.setGeolocation({ latitude: 40.7128, longitude: -74.0060, accuracy: 100 });
  await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' });

  await page.evaluateOnNewDocument(() => {
    // Поддержка геолокации
    navigator.geolocation.getCurrentPosition = (cb) => {
      setTimeout(() => {
        cb({
          coords: {
            latitude: 40.7128,
            longitude: -74.0060,
            accuracy: 100,
          },
        });
      }, 1000);
    };
  });

  await page.goto('https://amiunique.org/fingerprint');
  
  setInterval(async () => {
     //const wclick = myDevice.width-(326+Math.ceil(Math.random()*125))
     //const hclick = myDevice.height-(445+Math.ceil(Math.random()*33));
     //console.log(hclick, wclick)
     //await page.mouse.click(236, 589);
  }, 100)
  
  await delay(15000);
  await page.screenshot({ path: 'public/img.png' })


  console.log(device);
  console.log('FINISH')
}



app.get('/start', async (req, res) => {
  start();
  res.send({ type: true });
});


app.listen('3000', err => { err ? err : console.log('STARTD SERVER') });

