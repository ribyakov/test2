import { VirtualColumn } from "typeorm";

export interface Lockable {
  uuid: string;

  locked: boolean;
}
// export abstract class Lockable {
//   @VirtualColumn({
//     query: (alias) => "SELECT 10",
//   })
//   locked: boolean;
// }
