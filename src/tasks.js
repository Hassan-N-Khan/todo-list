class createTask {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
  getTitle() {
    return this.title;
  }
  setTitle(title) {
    this.title = title;
  }
  getDescription() {
    return this.description;
  }
  setDescription(description) {
    this.description = description;
  }
  getDueDate() {
    return this.dueDate;
  }
  setDueDate(dueDate) {
    this.dueDate = dueDate;
  }
  getPriority() {
    return this.priority;
  }
  setPriority(priority) {
    this.priority = priority;
  }
  toString() {
    return `Task: ${this.title}, Description: ${this.description}, Due Date: ${this.dueDate}, Priority: ${this.priority}`;
  }
}

export default createTask;