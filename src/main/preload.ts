import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  voyage: {
    segments: (id: number) => ipcRenderer.invoke("voyage/segments", id),
  },
  timeJournal: {
    getBySegmentId: (segmentId: number) =>
      ipcRenderer.invoke("timeJournal/getBySegmentId", segmentId),
  },
});
