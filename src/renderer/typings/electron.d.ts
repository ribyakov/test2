import { TimeJournal, VoyageSegment } from "../../main/entities";
import { AllMasterdata } from "../../main/entities/masterdata";
import { ConditionJournal } from "../../main/entities";

export default interface ElectronApi {
  voyage: {
    segments: (id: number) => Promise<VoyageSegment[]>;
  };
  timeJournal: {
    getBySegmentId: (segmentId: number) => Promise<TimeJournal | undefined>;
    save: (journal: TimeJournal) => Promise<void>;
  };
  conditionJournal: {
    getBySegmentId: (
      segmentId: number,
    ) => Promise<ConditionJournal | undefined>;
    save: (journal: ConditionJournal) => Promise<void>;
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
