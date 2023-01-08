export default class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  // get name() {
  //   return this._name;
  // }

  // set name(value) {
  //   if (value.length < 1) {
  //     alert("Project's name cannot be empty.");
  //     return;
  //   }
  //   this._name = value;
  // }
  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getTaskByIndex(index) {
    return this.tasks[index];
  }

  deleteTaskAtIndex(index) {
    this.tasks.splice(index, 1);
  }

  getTasks() {
    return this.tasks;
  }

  getTasksCount() {
    return this.tasks.length;
  }

  addNewTask(task) {
    this.tasks.push(task);
  }

  getTodayTasks() {
    const today = new Date();
    const todayString = today.toISOString().slice(0, 10);

    const allTodayTasks = this.tasks.filter(
      (task) => task.duedate === todayString
    );

    return allTodayTasks;
  }
}
