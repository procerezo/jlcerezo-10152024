export class CustomError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class TaskNotFoundError extends CustomError {
  constructor() {
    super("Task not found");
  }
}

export class InvalidTaskNameError extends CustomError {
  constructor() {
    super("Invalid task name");
  }
}

export class TaskNameTooShortError extends CustomError {
  constructor() {
    super("Task name is too short");
  }
}

export class TaskCreationError extends CustomError {
  constructor() {
    super("Error creating task");
  }
}

export class TaskUpdateError extends CustomError {
  constructor() {
    super("Error updating task");
  }
}