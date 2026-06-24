# Safe AO3 Browser — 最小 Electron 原型

这个仓库包含一个最小可运行的 Electron 工程，启动后会打开 AO3（https://archiveofourown.org）并尝试将 Chromium 的 DNS-over-HTTPS 指向指定端点。

运行
1. npm install
2. npm start

说明
- 默认主页已设置为 https://archiveofourown.org。
- 程序尝试使用 Chromium 命令行开关启用 DoH，并把 DoH 端点设置为:
  https://v7e373e11t.cloudflare-gateway.com/dns-query
- DoH 是否真正生效取决于你使用的 Electron 版本（内置的 Chromium 是否支持这些开关）。

验证 DoH 是否生效
- 在应用中打开 https://1.1.1.1/help （Cloudflare 的诊断页）查看是否显示使用 Cloudflare DNS。
- 或使用抓包工具（如 Wireshark）观察是否有对 DoH 端点的 HTTPS 请求。

已知限制与建议
- 如果 Chromium 命令行开关不生效，建议：
  - 在系统层面或路由器上启用 DoH，或
  - 在本机运行 cloudflared 作为本地 DoH 代理，然后配置系统/应用走该代理。

如需我把项目扩展为在启动时自动管理本地 DoH 代理、或加入广告拦截/扩展支持，可以继续告诉我需求。
