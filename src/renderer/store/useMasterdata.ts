import { defineStore } from "pinia";
import { ref } from "vue";
import {
  CargoType,
  Fuel,
  FuelType,
  Oil,
  OilType,
  Operation,
  OperationType,
  ShipConditionIndicator,
  Unit,
} from "../../main/entities";

export const useMasterdata = defineStore("MasterData", () => {
  const operations = ref<Operation[]>([]);
  const operationTypes = ref<OperationType[]>([]);

  const units = ref<Unit[]>([]);

  const shipConditionIndicators = ref<ShipConditionIndicator[]>([]);

  const cargoTypes = ref<CargoType[]>([]);

  const fuels = ref<Fuel[]>([]);
  const fuelTypes = ref<FuelType[]>([]);

  const oils = ref<Oil[]>([]);
  const oilTypes = ref<OilType[]>([]);

  const getOperationTypeById = (id: number): OperationType => {
    return operationTypes.value.find((v) => v.id === id)!;
  };

  /**
   * Update (fetch) the master data.
   */
  const get = async () => {
    const result = await window.api.masterdata.get();
    operations.value = result.operations;
    operationTypes.value = result.operationTypes;
    units.value = result.units;
    shipConditionIndicators.value = result.shipConditionIndicators;
    cargoTypes.value = result.cargoTypes;

    console.log("masterdata", result);
  };

  return {
    operations,
    cargoTypes,
    getOperationTypeById,
    shipConditionIndicators,
    get,
  };
});
