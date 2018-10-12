import { yaddaCore } from 'ya-done';
import steps from './steps';

yaddaCore(steps, {
    useBrowser: true,
    useParallel: true,
    capabilities: {
        browserName: 'chrome',
        args
    }
});

const args = [
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-client-side-phishing-detection',
    '--disable-default-apps',
    '--disable-hang-monitor',
    '--disable-popup-blocking',
    '--disable-prompt-on-repost',
    '--disable-sync',
    '--metrics-recording-only',
    '--no-first-run',
    '--safebrowsing-disable-auto-update',
    '--enable-automation',
    '--password-store=basic',
    '--use-mock-keychain',
    '--hide-scrollbars',
    '--mute-audio',
    '--disable-setuid-sandbox',
    "--disable-dev-shm-usage",
    "--disable-gpu",
    "--no-default-browser-check",
    "--disable-extensions",
    "--disable-translate",
    "--disable-logging",
    "--headless",
    "--no-sandbox",
    "--remote-debugging-port=0",
    "--window-size=1440,900",
    "--disable-web-security",
    "--disable-renderer-backgrounding",
    "--disable-background-timer-throttling"
];
