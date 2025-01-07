import { MomentInput, Moment } from "moment/moment";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $moment: (date: MomentInput) => Moment;
  }
}
