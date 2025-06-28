const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

// Полная маскировка браузера
async function createStealthPage(browser) {
  const page = await browser.newPage();
  
  // Случайный выбор устройства
  const devices = [
    {
      name: 'Windows Desktop',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 1,
      isMobile: false,
      os: 'Windows'
    },
    {
      name: 'Mac Desktop',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15',
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
      isMobile: false,
      os: 'MacOS'
    },
    {
      name: 'iPhone 13',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 3,
      isMobile: true,
      os: 'iOS'
    },
    {
      name: 'Samsung Galaxy',
      userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
      viewport: { width: 412, height: 915 },
      deviceScaleFactor: 2.625,
      isMobile: true,
      os: 'Android'
    }
  ];
  
  const device = devices[Math.floor(Math.random() * devices.length)];
  
  // Установка основных параметров
  await page.setUserAgent(device.userAgent);
  await page.setViewport(device.viewport);
  
  // Инжекция в DOM перед загрузкой страницы
  await page.evaluateOnNewDocument((device) => {
    // Маскировка платформы
    Object.defineProperty(navigator, 'platform', {
      value: device.os.includes('Win') ? 'Win32' : 
             device.os.includes('Mac') ? 'MacIntel' : 
             device.os.includes('iOS') ? 'iPhone' : 'Linux armv8l',
      writable: false
    });
    
    // Маскировка аппаратных характеристик
    Object.defineProperty(navigator, 'hardwareConcurrency', {
      value: device.isMobile ? 8 : Math.floor(Math.random() * 4) + 4,
      writable: false
    });
    
    Object.defineProperty(navigator, 'deviceMemory', {
      value: device.isMobile ? 4 : 8,
      writable: false
    });
    
    // Маскировка плагинов
    const originalPlugins = Array.from(navigator.plugins);
    Object.defineProperty(navigator, 'plugins', {
      get: () => device.isMobile ? [] : originalPlugins,
      configurable: true
    });
    
    // Маскировка WebGL
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
    
    // Маскировка часового пояса
    const getTimezoneOffset = Date.prototype.getTimezoneOffset;
    Date.prototype.getTimezoneOffset = function() {
      return device.os.includes('Win') ? 240 : // EST
             device.os.includes('Mac') ? 480 : // PST
             -60; // Europe/London
    };
    
    // Маскировка языка
    Object.defineProperty(navigator, 'language', {
      value: 'en-US',
      writable: false
    });
    
    Object.defineProperty(navigator, 'languages', {
      value: ['en-US', 'en'],
      writable: false
    });
    
    // Маскировка разрешения экрана
    Object.defineProperty(screen, 'width', {
      value: device.viewport.width,
      writable: false
    });
    
    Object.defineProperty(screen, 'height', {
      value: device.viewport.height,
      writable: false
    });
    
    // Маскировка сенсорного экрана
    Object.defineProperty(navigator, 'maxTouchPoints', {
      value: device.isMobile ? 5 : 0,
      writable: false
    });
    
    // Маскировка WebDriver
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false,
    });
    
    if ('getBattery' in navigator) {
      navigator.getBattery = () => Promise.resolve({
        level: device.isMobile ? 0.78 : 1,
        charging: device.isMobile ? false : true,
        chargingTime: device.isMobile ? Infinity : 0,
        dischargingTime: device.isMobile ? 7200 : Infinity
      });
    }
    
    
    
    
    
    // Маскировка разрешений
    const originalQuery = navigator.permissions.query;
    navigator.permissions.query = (parameters) => (
      parameters.name === 'notifications' ? 
        Promise.resolve({ state: 'denied' }) : 
        originalQuery(parameters)
    );
    
    // Маскировка Canvas
    HTMLCanvasElement.prototype.getContext = new Proxy(HTMLCanvasElement.prototype.getContext, {
      apply: (target, thisArg, args) => {
        const context = target.apply(thisArg, args);
        if (args[0] === '2d') {
          const originalFillText = context.fillText;
          context.fillText = function(...args) {
            args[3] = args[3] + Math.random() * 0.01; // Добавляем шум
            return originalFillText.apply(this, args);
          };
        }
        return context;
      }
    });
    
    // Маскировка аудио
    const originalGetChannelData = AudioBuffer.prototype.getChannelData;
    AudioBuffer.prototype.getChannelData = function() {
      const data = originalGetChannelData.apply(this, arguments);
      for (let i = 0; i < data.length; i += 100) {
        data[i] += Math.random() * 0.0001 - 0.00005; // Микро-шум
      }
      return data;
    };
    
    // Маскировка батареи
    
    // Маскировка геолокации
    navigator.geolocation.getCurrentPosition = (success, error, options) => {
      success({
        coords: {
          latitude: device.os.includes('Win') ? 40.7128 : // NY
                   device.os.includes('Mac') ? 37.7749 : // SF
                   51.5074, // London
          longitude: device.os.includes('Win') ? -74.0060 : 
                     device.os.includes('Mac') ? -122.4194 : 
                     -0.1278,
          accuracy: 50 + Math.random() * 100
        },
        timestamp: Date.now()
      });
    };
  }, device);

  // Дополнительные HTTP-заголовки
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9',
    'Sec-CH-UA': device.userAgent.includes('Chrome') ? 
      '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"' :
      '"Not?A_Brand";v="8", "Chromium";v="120", "Microsoft Edge";v="120"',
    'Sec-CH-UA-Mobile': device.isMobile ? '?1' : '?0',
    'Sec-CH-UA-Platform': `"${device.os}"`,
    'Upgrade-Insecure-Requests': '1'
  });

  // Отключение WebRTC
  await page._client.send('Network.enable');
  await page._client.send('Network.setWebRTCIPHandlingPolicy', {
    policy: 'disable_non_proxied_udp'
  });

  return page;
}

// Использование
(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
      '--enable-features=NetworkService',
      '--blink-settings=imagesEnabled=true',
      `--window-size=${Math.floor(Math.random() * 200) + 1200},${Math.floor(Math.random() * 200) + 800}`
    ]
  });

  const page = await createStealthPage(browser);
  
  await page.goto('https://bot.sannysoft.com/', {
    waitUntil: 'networkidle2',
    timeout: 60000
  });
  
  // Сохраняем скриншот для проверки
  await page.screenshot({ path: 'stealth-test.png' });
  
  await browser.close();
})();