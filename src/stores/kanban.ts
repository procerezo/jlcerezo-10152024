import { defineStore } from 'pinia';
interface Task {
  name: string;
  description?: string;
  status: 'TO DO' | 'IN PROGRESS' | 'DONE';
  columnIndex: number;
  taskIndex: number;
}
interface Column {
  title: string;
  tasks: Task[];
}
export const useKanbanStore = defineStore('kanban', {
  state: () => ({
    columns: [
      {
        title: 'TO DO',
        tasks: [] as Task[],
      },
      {
        title: 'IN PROGRESS',
        tasks: [] as Task[],
      },
      {
        title: 'DONE',
        tasks: [] as Task[],
      },
    ] as Column[],
  }),
  actions: {
    addTask(task: Task) {
      this.columns[0].tasks.push(task);
    },
    updateTask(task: Task) {
      this.columns[task.columnIndex].tasks[task.taskIndex] = task;
    },
    deleteTask(columnIndex: number, taskIndex: number) {
      this.columns[columnIndex].tasks.splice(taskIndex, 1);
    },
    moveTask(
      sourceColumnIndex: number,
      sourceTaskIndex: number,
      targetColumnIndex: number
    ) {
      const task = this.columns[sourceColumnIndex].tasks.splice(
        sourceTaskIndex,
        1
      )[0];
      task.columnIndex = targetColumnIndex;
      task.taskIndex = this.columns[targetColumnIndex].tasks.length;
      this.columns[targetColumnIndex].tasks.push(task);
    },
  },
});