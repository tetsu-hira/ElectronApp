import { app, BrowserWindow, session } from "electron";
import * as path from "path";
import * as url from "url";
import { searchDevtools } from "electron-search-devtools";

import electronReload from "electron-reload";

const isDev = process.env.NODE_ENV === "development";

// macとwinでElectron実行のPATHが違う
const execPath =
  process.platform === "win32"
    ? "../node_modules/electron/dist/electron.exe"
    : "../node_modules/.bin/electron";

if (isDev) {
  electronReload(__dirname, {
    electron: path.resolve(__dirname, execPath),
    forceHardReset: true,
    hardResetMethod: "exit",
  });
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isDev) {
    // 開発モードの場合はデベロッパーツールを開く
    win.webContents.openDevTools({ mode: "detach" });
  }

  // レンダラープロセスをロード
  win.loadFile("dist/index.html");

  const appURL = app.isPackaged
    ? url.format({
        pathname: path.join(__dirname, "../index.html"),
        protocol: "file:",
        slashes: true,
      })
    : "http://localhost:3000";

  win.loadURL(appURL);

  if (!app.isPackaged) {
    win.webContents.openDevTools();
  }
};

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(async () => {
  if (isDev) {
    // 開発モードの場合はReact Devtoolsをロード
    const devtools = await searchDevtools("REACT");
    if (devtools) {
      await session.defaultSession.loadExtension(devtools, {
        allowFileAccess: true,
      });
    }
  }

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
