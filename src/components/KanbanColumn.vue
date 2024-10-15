<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import KanbanTask from './KanbanTask.vue'
import { TaskNotFoundError, TaskUpdateError } from '@/utils/CustomError'

interface Task {
  id: number
  name: string
  description?: string
  status: 'TO DO' | 'IN PROGRESS' | 'DONE'
}

interface Column {
  name: 'TO DO' | 'IN PROGRESS' | 'DONE'
  tasks: Task[]
}

const props = defineProps<{ column: Column }>()
const emit = defineEmits(['update-task'])

const handleUpdateTask = (updatedTask: Task) => {
  try {
    const taskIndex = props.column.tasks.findIndex(task => task.id === updatedTask.id)
    if (taskIndex === -1) {
      throw new TaskNotFoundError()
    }
    emit('update-task', updatedTask)
  } catch (error) {
    if (error instanceof TaskNotFoundError) {
      console.error('Error: Task not found')
    } else {
      console.error('Error updating task:', error)
      throw new TaskUpdateError()
    }
  }
}
</script>

<template>
  <div class="column">
    <h2>{{ column.name }}</h2>
    <div class="tasks">
      <KanbanTask
        v-for="task in column.tasks"
        :key="task.id"
        :task="task"
        @update-task="handleUpdateTask"
      />
    </div>
  </div>
</template>

<style scoped>
.column {
  flex: 1;
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.column h2 {
  text-align: center;
  color: #007bff;
}
.tasks {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>