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

  getTaskByName(name) {
    for (let i = 0; i < this.getTasksCount(); i++) {
      if (this.tasks[i].title === name) {
        return this.tasks[i];
      }
    }
  }

  deleteTaskByName(name) {
    for (let i = 0; i < this.getTasksCount(); i++) {
      if (this.tasks[i].title === name) {
        this.tasks.splice(i, 1);
      }
    }
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

  taskAlreadyExists(taskName) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].title === taskName) {
        return true;
      }
    }
    return false;
  }

  getTodayTasks() {
    const today = new Date();
    const todayString = today.toISOString().slice(0, 10);

    const allTodayTasks = this.tasks.filter(
      (task) => task.duedate === todayString
    );

    if (allTodayTasks.length > 0) {
      return allTodayTasks;
    }
  }

  getThisWeekTasks() {
    const today = new Date();
    const todayString = today.toISOString().slice(0, 10);
    let today_date = new Date(todayString);

    const allThisWeekTasks = this.tasks.filter((task) => {
      const taskDate = new Date(task.duedate);

      function getWeek(date) {
        const target = new Date(date.valueOf());
        const dayNr = (date.getDay() + 6) % 7;

        target.setDate(target.getDate() - dayNr + 3);

        const firstThursday = target.valueOf();
        target.setMonth(0, 1);
        if (target.getDay() != 4) {
          target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
        }

        return 1 + Math.ceil((firstThursday - target) / 604800000);
      }

      const week1 = getWeek(today_date);
      const week2 = getWeek(taskDate);

      return week1 === week2;
    });

    if (allThisWeekTasks.length > 0) {
      return allThisWeekTasks;
    }
  }

  toJSON() {
    return {
      name: this.name,
      tasks: this.tasks,
    };
  }
}
