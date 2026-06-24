const { app, BrowserWindow } = require('electron');
const path = require('path');

// 可配置 DoH 端点（你提供的）
const DOH_URL = 'https://v7e373e11t.cloudflare-gateway.com/dns-query';

// 尝试通过 Chromium 命令行开关启用 DoH（是否生效取决于 Electron/Chromium 版本）
app.commandLine.appendSwitch('enable-features', 'DnsOverHttps');
app.commandLine.appendSwitch('dns-over-https-templates', DOH_URL);
app.commandLine.appendSwitch('dns-over-https-mode', 'secure');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  // 默认主页：AO3
  win.loadURL('https://archiveofourown.org');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
