import { MomentInput, Moment } from "moment/moment";
import { TranslateResult } from "vue-i18n";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $moment: (date: MomentInput) => Moment;
    $t(key: string): TranslateResult;
  }
}
