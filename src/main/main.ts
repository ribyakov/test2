import { app, BrowserWindow, ipcMain, session } from "electron";
import { join } from "path";
import "reflect-metadata";
import { AppDataSource } from "./typeorm.config";
import IpcMain = Electron.IpcMain;
import { VoyageController } from "./controllers/VoyageController";
import { TimeJournalController } from "./controllers/TimeJournalController";
import {
  CargoOperationJournal,
  ConditionJournal,
  ConditionJournalGeo,
  TimeJournal,
  TimeJournalEntry,
} from "./entities";
import { MasterdataController } from "./controllers/MasterdataController";
import { ConditionJournalController } from "./controllers/ConditionJournalController";
import { CargoOperationJournalController } from "./controllers/CargoOperationJournalController";

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (process.env.NODE_ENV === "development") {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
  } else {
    mainWindow.loadFile(join(app.getAppPath(), "renderer", "index.html"));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(async () => {
  createWindow();
  await AppDataSource.initialize();

  connectApi(ipcMain);

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": ["script-src 'self'"],
      },
    });
  });

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

const connectApi = (ipcMain: IpcMain) => {
  ipcMain.handle("voyage/get-segments", async (_, id: number) => {
    const controller = new VoyageController();
    return controller.segments(id);
  });

  ipcMain.handle(
    "time-journal/get-by-segment-id",
    async (_, segmentId: number) => {
      const controller = new TimeJournalController();
      return controller.getBySegmentId(segmentId);
    },
  );

  ipcMain.handle("time-journal/save", async (_, journal: TimeJournal) => {
    const controller = new TimeJournalController();
    return controller.save(journal);
  });

  ipcMain.handle(
    "time-journal/delete-item",
    async (_, entry: TimeJournalEntry) => {
      const controller = new TimeJournalController();
      console.log("entry", entry);
      return controller.deleteEntry(entry);
    },
  );

  ipcMain.handle(
    "condition-journal/get-by-segment-id",
    async (_, segmentId: number) => {
      const controller = new ConditionJournalController();
      return controller.getBySegmentId(segmentId);
    },
  );

  ipcMain.handle(
    "condition-journal/save",
    async (_, journal: ConditionJournal) => {
      const controller = new ConditionJournalController();
      return controller.save(journal);
    },
  );

  ipcMain.handle(
    "condition-journal/delete-item",
    async (_, entry: ConditionJournalGeo) => {
      const controller = new ConditionJournalController();
      return controller.deleteEntry(entry);
    },
  );

  ipcMain.handle(
    "condition-operation-journal/get-by-segment-id",
    async (_, segmentId: number) => {
      const controller = new CargoOperationJournalController();
      return controller.getBySegmentId(segmentId);
    },
  );

  ipcMain.handle(
    "condition-operation-journal/save",
    async (_, journal: CargoOperationJournal) => {
      const controller = new CargoOperationJournalController();
      return controller.save(journal);
    },
  );

  ipcMain.handle("masterdata/get", async () => {
    const controller = new MasterdataController();
    return controller.get();
  });
};
