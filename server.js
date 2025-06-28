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

  await page.setUserAgent(laptops.userAgent);
  await page.setViewport(laptops.viewport);
  await page.setViewport({ width: 392, height: 735});
  
  const device = laptops[Math.floor(Math.random() * laptops.length)];

  
  await page.evaluateOnNewDocument((device) => {
    Object.defineProperty(navigator, 'platform', {
      value: device.os.includes('Win') ? 'Win32' : 
             device.os.includes('Mac') ? 'MacIntel' : 
             device.os.includes('iOS') ? 'iPhone' : 'Linux armv8l',
      writable: false
    });
    
    Object.defineProperty(navigator, 'hardwareConcurrency', {
      value: device.isMobile ? 8 : Math.floor(Math.random() * 4) + 4,
      writable: false
    });
    
    Object.defineProperty(navigator, 'deviceMemory', {
      value: device.isMobile ? 4 : 8,
      writable: false
    });
    
    const originalPlugins = Array.from(navigator.plugins);
    Object.defineProperty(navigator, 'plugins', {
      get: () => device.isMobile ? [] : originalPlugins,
      configurable: true
    });
    
    const getParameter = WebGLRenderingContext.prototype.getParameter;
    WebGLRenderingContext.prototype.getParameter = function(parameter) {
      if (parameter === 37445) { // UNMASKED_VENDOR_WEBGL
        return 'Google Inc. (NVIDIA)';
      }
      if (parameter === 37446) { // UNMASKED_RENDERER_WEBGL
        return device.isMobile ? 
          'Apple A15 GPU' : 
          'ANGLE (NVIDIA, NVIDIA GeForce RTX 3080 Direct3D11 vs_5_0 ps_5_0, D3D11)';
      }
      return getParameter.apply(this, arguments);
    };
    
    const getTimezoneOffset = Date.prototype.getTimezoneOffset;
    Date.prototype.getTimezoneOffset = function() {
      return device.os.includes('Win') ? 240 : // EST
             device.os.includes('Mac') ? 480 : // PST
             -60; // Europe/London
    };
    
    Object.defineProperty(navigator, 'language', {
      value: 'en-US',
      writable: false
    });
    
    Object.defineProperty(navigator, 'languages', {
      value: ['en-US', 'en'],
      writable: false
    });
    
    Object.defineProperty(screen, 'width', {
      value: device.viewport.width,
      writable: false
    });
    
    Object.defineProperty(screen, 'height', {
      value: device.viewport.height,
      writable: false
    });
    
    
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false,
    });
    
    if ('getBattery' in navigator) {
      navigator.getBattery = () => {
      const onBattery = Math.random() < 0.3;
    
      return Promise.resolve({
        level: onBattery ? (Math.random() * 0.5 + 0.3).toFixed(2) : 1, // 30-80% если на батарее, 100% если от сети
        charging: !onBattery,
        chargingTime: onBattery ? 0 : (Math.floor(Math.random() * 180) + 60) * 60, // 1-4 часа до полной зарядки
        dischargingTime: onBattery ? Math.floor(Math.random() * 5 + 1) * 3600 : Infinity, // 1-6 часов работы
        onchargingchange: null,
        onchargingtimechange: null,
        ondischargingtimechange: null,
        onlevelchange: null
      });
    }
    }
  });
  
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
     //const wclick = myDevice.width-(326+Math.ceil(Math.random()*125))
     //const hclick = myDevice.height-(445+Math.ceil(Math.random()*33));
     //console.log(hclick, wclick)
     await page.mouse.click(236, 589);
  }, 100)
  
  console.log(myDevice);
  console.log('FINISH')
}





app.get('/start', async (req, res) => {
  start();
  res.send({ type: true });
});

  
app.listen('3000', err => { err ? err : console.log('STARTD SERVER') });

