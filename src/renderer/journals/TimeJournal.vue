<template>
  <el-table @row-click="rowClick" stripe :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="startTime" label="start" width="180" />
    <el-table-column prop="endTime" label="end" width="180" />
    <el-table-column prop="operation" label="operation" />
    <el-table-column prop="comment" label="comment" />
  </el-table>
  <el-time-picker
    v-model="value2"
    is-range
    arrow-control
    range-separator="по"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";

const value2 = ref<[Date, Date]>([
  new Date(2016, 9, 10, 8, 40),
  new Date(2016, 9, 10, 9, 40),
]);

const rowClick = (row: any, column: any, event: Event) => {
  console.log(row, column, event);
  row.name = "test";
};
const tableData = [
  {
    id: 1,
    date: "2016-05-03",
    startTime: "10:20:00",
    endTime: "10:30:00",
    operation: 1,
    comment: "Tom",
  },
  {
    id: 2,
    date: "2016-05-04",
    startTime: "11:20:00",
    endTime: "12:30:00",
    operation: 1,
    comment: "Tom2",
  },
];
</script>
