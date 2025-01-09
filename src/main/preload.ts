import { contextBridge, ipcRenderer } from "electron";
import { CargoOperationJournal, TimeJournal } from "./entities";
import { AllMasterdata } from "./entities/masterdata";

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
  conditionJournal: {
    getBySegmentId: (segmentId: number) =>
      ipcRenderer.invoke("conditionJournal/getBySegmentId", segmentId),
    save: async (journal: TimeJournal) => {
      await ipcRenderer.invoke("conditionJournal/save", journal);
    },
  },
  cargoOperationJournal: {
    getBySegmentId: (segmentId: number) =>
      ipcRenderer.invoke("cargoOperationJournal/getBySegmentId", segmentId),
    save: async (journal: CargoOperationJournal) => {
      await ipcRenderer.invoke("cargoOperationJournal/save", journal);
    },
  },
  masterdata: {
    get: async (): Promise<AllMasterdata> =>
      ipcRenderer.invoke("masterdata/get"),
  },
});
