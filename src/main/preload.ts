import { contextBridge, ipcRenderer } from "electron";
import {
  CargoOperationJournal,
  ConditionJournal,
  ConditionJournalGeo,
  TimeJournal,
  TimeJournalEntry,
} from "./entities";
import { AllMasterdata } from "./entities/masterdata";

const API = {
  voyage: {
    segments: (id: number) => ipcRenderer.invoke("voyage/get-segments", id),
  },
  timeJournal: {
    getBySegmentId: (segmentId: number): Promise<TimeJournal | undefined> =>
      ipcRenderer.invoke("time-journal/get-by-segment-id", segmentId),
    save: async (journal: TimeJournal) => {
      await ipcRenderer.invoke("time-journal/save", journal);
    },
    deleteEntry: async (entry: TimeJournalEntry) => {
      await ipcRenderer.invoke("time-journal/delete-item", entry);
    },
  },
  conditionJournal: {
    getBySegmentId: (
      segmentId: number,
    ): Promise<ConditionJournal | undefined> =>
      ipcRenderer.invoke("condition-journal/get-by-segment-id", segmentId),
    save: async (journal: ConditionJournal) => {
      await ipcRenderer.invoke("condition-journal/save", journal);
    },
    deleteEntry: async (entry: ConditionJournalGeo) => {
      await ipcRenderer.invoke("condition-journal/delete-item", entry);
    },
  },
  cargoOperationJournal: {
    getBySegmentId: (
      segmentId: number,
    ): Promise<CargoOperationJournal | undefined> =>
      ipcRenderer.invoke(
        "condition-operation-journal/get-by-segment-id",
        segmentId,
      ),
    save: async (journal: CargoOperationJournal) => {
      await ipcRenderer.invoke("condition-operation-journal/save", journal);
    },
  },
  masterdata: {
    get: async (): Promise<AllMasterdata> =>
      ipcRenderer.invoke("masterdata/get"),
  },
};

export type API = typeof API;

contextBridge.exposeInMainWorld("api", API);
