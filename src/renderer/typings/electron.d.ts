import { TimeJournal, VoyageTaskSegment } from "../../main/entities";

export default interface ElectronApi {
  voyage: {
    segments: (id: number) => Promise<VoyageTaskSegment[]>;
  };
  timeJournal: {
    getBySegmentId: (segmentId: number) => Promise<TimeJournal | null>;
    save: (journal: TimeJournal) => Promise<void>;
  };
}

declare global {
  interface Window {
    api: ElectronApi;
  }
}
