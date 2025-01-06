import { VoyageTaskSegment } from "../../main/entities";

export default interface ElectronApi {
  voyage: {
    segments: (id: number) => Promise<VoyageTaskSegment[]>;
  };
}

declare global {
  interface Window {
    api: ElectronApi;
  }
}
