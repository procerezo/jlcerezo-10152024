<script setup lang="ts">
import { ref, defineEmits } from 'vue'
const emit = defineEmits(['task-created'])
const taskName = ref('')
const taskDescription = ref('')
const taskStatus = ref<'TO DO' | 'IN PROGRESS' | 'DONE'>('TO DO')
const tasks = ref<Array<{ id: number; name: string; description: string; status: 'TO DO' | 'IN PROGRESS' | 'DONE' }>>([])
const createTask = () => {
  const newTask = {
    id: Date.now(),
    name: taskName.value,
    description: taskDescription.value,
    status: taskStatus.value
  }
  try {
    if (!newTask.name) {
      throw new Error('Invalid task name')
    }
    if (newTask.name.length < 3) {
      throw new Error('Task name is too short')
    }
    tasks.value.push(newTask)
    emit('task-created', newTask)
    taskName.value = ''
    taskDescription.value = ''
    taskStatus.value = 'TO DO'
  } catch (error) {
    console.error('Error creating task:', error)
  }
}
</script>
<template>
  <div class="task-form">
    <input v-model="taskName" placeholder="Task Name" />
    <input v-model="taskDescription" placeholder="Task Description" />
    <select v-model="taskStatus">
      <option value="TO DO">TO DO</option>
      <option value="IN PROGRESS">IN PROGRESS</option>
      <option value="DONE">DONE</option>
    </select>
    <button @click="createTask">Create Task</button>
  </div>
</template>
<style scoped>
.task-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}
.task-form label {
  font-weight: bold;
  color: #007bff;
}
.task-form input, .task-form textarea, .task-form select {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.task-form button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}
.task-form button:hover {
  background-color: #0056b3;
}
</style>