import { defineStore } from "pinia";
import { ref } from "vue";
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

  const getOperationTypeById = (id: number): OperationType => {
    const t = operationTypes.value.find((v) => v.id === id)!;
    console.log(t, id);
    return t;
  };

  /**
   * Update (fetch) the organization list.
   */
  const get = async () => {
    const result = await window.api.masterdata.get();
    operations.value = result.operations;
    operationTypes.value = result.operationTypes;
  };

  return {
    operations,
    getOperationTypeById,
    get,
  };
});
