import { contextBridge, ipcRenderer } from "electron";
import { TimeJournal } from "./entities";

contextBridge.exposeInMainWorld("api", {
  voyage: {
    segments: (id: number) => ipcRenderer.invoke("voyage/segments", id),
  },
  timeJournal: {
    getBySegmentId: (segmentId: number) =>
      ipcRenderer.invoke("timeJournal/getBySegmentId", segmentId),
    save: async (journal: TimeJournal) => {
      await ipcRenderer.invoke("timeJournal/save", journal);
    },
  },
});
