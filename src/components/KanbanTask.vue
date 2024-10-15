<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

interface Task {
  id: number
  name: string
  description?: string
  status: 'TO DO' | 'IN PROGRESS' | 'DONE'
}

const props = defineProps<{ task: Task }>()
const emit = defineEmits(['update-task'])

const isEditing = ref(false)
const taskName = ref(props.task.name)
const taskDescription = ref(props.task.description)

const moveToInProgress = () => {
  emit('update-task', { ...props.task, status: 'IN PROGRESS' })
}

const moveToDone = () => {
  emit('update-task', { ...props.task, status: 'DONE' })
}

const moveToToDo = () => {
  emit('update-task', { ...props.task, status: 'TO DO' })
}

const updateTask = () => {
  emit('update-task', { ...props.task, name: taskName.value, description: taskDescription.value })
  isEditing.value = false
}
</script>

<template>
  <div class="task">
    <div v-if="isEditing">
      <input v-model="taskName" placeholder="Task Name" />
      <input v-model="taskDescription" placeholder="Task Description" />
      <button @click="updateTask">Save</button>
      <button @click="isEditing = false">Cancel</button>
    </div>
    <div v-else>
      <h3>{{ task.name }}</h3>
      <p>{{ task.description }}</p>
      <div class="buttons">
        <button v-if="task.status !== 'TO DO'" @click="moveToToDo">Move to TO DO</button>
        <button v-if="task.status !== 'IN PROGRESS'" @click="moveToInProgress">Move to IN PROGRESS</button>
        <button v-if="task.status !== 'DONE'" @click="moveToDone">Move to DONE</button>
        <button @click="isEditing = true">Update</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: transform 0.2s;
}
.task:hover {
  transform: scale(1.02);
}
.task h3 {
  margin: 0;
  color: #007bff;
}
.task p {
  margin: 5px 0 0;
  color: #555;
}
.buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
.buttons button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.buttons button:hover {
  background-color: #0056b3;
  color: white;
}
</style>