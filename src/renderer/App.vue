<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
//import { Student } from '../main/entities/student.entity';

const students = ref<any[]>([]);
const name = ref("");

async function onStudentAddClick() {
  await window.electronAPI.StudentRepository.upsert({
    student: {
      fio: name.value,
    },
  });
  await fetchStudents();
}

async function fetchStudents() {
  students.value = await window.electronAPI.StudentRepository.list();
}

async function onSaveClick() {
  let r = await window.electronAPI.StudentRepository.saveToFile();
  alert(JSON.stringify(r));
}

onBeforeMount(async () => {
  await fetchStudents();
});
</script>

<template>
  <el-input v-model="name"></el-input>
  <el-input v-model="name"></el-input>
  <input type="text" v-model="name" />
  <button @click="onStudentAddClick">Добавить</button>
  <button @click="onSaveClick">Открыть файл</button>

  <div v-for="s in students">
    {{ s }}
  </div>
</template>

<style scoped></style>
