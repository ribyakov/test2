import { TimeJournal, VoyageSegment } from "../../main/entities";
import { AllMasterdata } from "../../main/entities/masterdata";

export default interface ElectronApi {
  voyage: {
    segments: (id: number) => Promise<VoyageSegment[]>;
  };
  timeJournal: {
    getBySegmentId: (segmentId: number) => Promise<TimeJournal | null>;
    save: (journal: TimeJournal) => Promise<void>;
  };
  masterdata: {
    get: () => Promise<AllMasterdata>;
  };
}

declare global {
  interface Window {
    api: ElectronApi;
  }
}
