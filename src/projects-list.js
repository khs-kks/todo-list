export default class AllProjects {
  static projects = [];

  static getProjects() {
    return this.projects;
  }

  static getProjectsCount() {
    return this.projects.length;
  }

  static getProjectAtIndex(index) {
    if (index < this.projects.length) {
      return this.projects[index];
    }
  }

  static getProjectByName(projectName) {
    for (let i = 0; i < this.projects.length; i++) {
      if (this.projects[i].name === projectName) {
        return this.projects[i];
      }
    }
  }

  static appendNewProject(Project) {
    if (Project.name) {
      this.projects.push(Project);
    }
  }

  static deleteProject(projectName) {
    for (let i = 0; i < this.getProjectsCount(); i++) {
      if (this.projects[i].name === projectName) {
        this.projects.splice(i, 1);
      }
    }
  }

  static getEveryTodayTaskFromEveryProject() {
    let combinedTodayTasks = [];

    for (let i = 0; i < this.projects.length; i++) {
      console.log(typeof this.projects[i].getTodayTasks())
      if (typeof this.projects[i].getTodayTasks() !== "undefined") {
        combinedTodayTasks = combinedTodayTasks.concat(
          this.projects[i].getTodayTasks()
        );
      }
    }
    if (combinedTodayTasks.length > 0) {
      return combinedTodayTasks;
    }

    return undefined;
  }
}
