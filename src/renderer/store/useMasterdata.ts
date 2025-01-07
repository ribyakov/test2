import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";
import {
  Fuel,
  FuelType,
  Oil,
  OilType,
  Operation,
  OperationType,
} from "../../main/entities";

export const useMasterdata = defineStore("MasterData", () => {
  const operations = ref<Operation[]>([]);
  const operationTypes = ref<OperationType[]>([]);

  const fuels = ref<Fuel[]>([]);
  const fuelTypes = ref<FuelType[]>([]);

  const oils = ref<Oil[]>([]);
  const oilTypes = ref<OilType[]>([]);

  /**
   * Update (fetch) the organization list.
   */
  // const get = async () => (organizations.value = await getAll());

  return {
    operations,
  };
});
