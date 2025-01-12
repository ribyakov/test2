import { contextBridge, ipcRenderer } from "electron";
import {
  CargoOperationJournal,
  CargoOperationJournalRecord,
  ConditionJournal,
  ConditionJournalGeoRecord,
  TimeJournal,
  TimeJournalRecord,
  Voyage,
  VoyageSegment,
} from "./entities";
import { AllMasterdata } from "./entities/masterdata";

const API = {
  voyage: {
    segments: (id: number): Promise<VoyageSegment[]> =>
      ipcRenderer.invoke("voyage/get-segments", id),
    getAll: (): Promise<Voyage[]> => ipcRenderer.invoke("voyage/get-all"),
  },
  timeJournal: {
    getBySegmentId: (segmentId: number): Promise<TimeJournal | undefined> =>
      ipcRenderer.invoke("time-journal/get-by-segment-id", segmentId),
    save: async (journal: TimeJournal) => {
      await ipcRenderer.invoke("time-journal/save", journal);
    },
    deleteEntry: async (entry: TimeJournalRecord) => {
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
    deleteEntry: async (entry: ConditionJournalGeoRecord) => {
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
    deleteEntry: async (journal: CargoOperationJournalRecord) => {
      await ipcRenderer.invoke(
        "condition-operation-journal/delete-item",
        journal,
      );
    },
  },
  masterdata: {
    get: async (): Promise<AllMasterdata> =>
      ipcRenderer.invoke("masterdata/get"),
  },
};

export type API = typeof API;

contextBridge.exposeInMainWorld("api", API);
