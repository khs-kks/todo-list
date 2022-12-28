export default class AllProjects {
  static projects = [];

  static getProjects() {
    return this.projects;
  }

  static getProjectsCount() {
    return this.projects.length;
  }

  static getProjectAtIndex(index) {
    if (index < this.getProjectsCount()) {
      return this.projects[index];
    }
  }

  static getProjectByName(projectName) {
    for(let i = 0; i < this.getProjectsCount(); i+=1) {
        if (this.getProjects()[i].name === projectName) {
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
    this.projects = this.projects.filter(function (obj, index, arr) {
      return obj.name !== projectName;
    });
  }

  //   constructor() {
  //     this.projects = [];
  //   }

  //   getProjects() {
  //     return this.projects;
  //   }

  //   getProjectsCount() {
  //     return this.projects.length;
  //   }

  //   getProjectAtIndex(index) {
  //     if (index < this.getProjectsCount()) {
  //       return this.projects[index];
  //     }
  //   }
  //   appendNewProject(Project) {
  //     if (Project.name) {
  //       this.projects.push(Project);
  //     }
  //   }

  //   deleteProject(projectName) {
  //     this.projects = this.projects.filter(function (obj, index, arr) {
  //       return obj.name !== projectName;
  //     });
  //   }
}
