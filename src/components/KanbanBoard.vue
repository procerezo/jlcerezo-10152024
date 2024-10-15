<script setup lang="ts">
import { ref, onMounted } from 'vue'
import KanbanColumn from './KanbanColumn.vue'
import TaskForm from './TaskForm.vue'
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
const columns = ref<Column[]>([
  { name: 'TO DO', tasks: [] },
  { name: 'IN PROGRESS', tasks: [] },
  { name: 'DONE', tasks: [] }
])
let nextTaskId = 1;
const addTask = (newTask: Task) => {
  newTask.id = nextTaskId++;
  const column = columns.value.find(col => col.name === newTask.status)
  if (column) {
    column.tasks.push(newTask)
  }
};
const updateTaskStatus = (updatedTask: Task) => {
  columns.value.forEach(column => {
    column.tasks = column.tasks.filter(task => task.id !== updatedTask.id)
  })
  addTask(updatedTask)
};
const updateTask = async (updatedTask: Task) => {
  try {
    const taskExists = columns.value.some(column => column.tasks.some(task => task.id === updatedTask.id))
    if (!taskExists) {
      throw new TaskNotFoundError()
    }
    const column = columns.value.find(col => col.tasks.some(task => task.id === updatedTask.id));
    if (column) {
      const taskIndex = column.tasks.findIndex(task => task.id === updatedTask.id);
      column.tasks[taskIndex] = updatedTask;
    }
    updateTaskStatus(updatedTask)
  } catch (error) {
    if (error instanceof TaskNotFoundError) {
      console.error('Error: Task not found')
    } else {
      console.error('Error updating task:', error)
      throw new TaskUpdateError()
    }
  }
}
onMounted(() => {
  addTask({ id: 1, name: 'Task 1', status: 'TO DO' });
  addTask({ id: 2, name: 'Task 2', status: 'IN PROGRESS' });
  addTask({ id: 3, name: 'Task 3', status: 'DONE' });
});
</script>
<template>
  <div class="board">
    <header class="header">
      <h1>Kanban Board</h1>
    </header>
    <div class="form-container">
      <TaskForm @task-created="addTask" />
    </div>
    <div class="columns">
      <KanbanColumn
        v-for="column in columns"
        :key="column.name"
        :column="column"
        @update-task="updateTask"
      />
    </div>
    <footer class="footer">
      <p>&copy; CEREZO - Kanban</p>
    </footer>
  </div>
</template>
<style scoped>
.board {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #f4f4f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.header {
  text-align: center;
  background-color: #007bff;
  color: white;
  padding: 10px;
  border-radius: 8px 8px 0 0;
}
.form-container {
  display: flex;
  justify-content: center;
}
.columns {
  display: flex;
  gap: 10px;
}
.footer {
  text-align: center;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border-radius: 0 0 8px 8px;
}
</style>