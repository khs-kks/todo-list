export default class AllProjects {
  constructor() {
    this.projects = [];
  }

  getProjects() {
    return this.projects;
  }

  getProjectsCount() {
    return this.projects.length;
  }

  appendNewProject(Project) {
    if (Project.name) {
      this.projects.push(Project);
    }
  }

  deleteProject(projectName) {
    this.projects = this.projects.filter(function (obj, index, arr) {
      return obj.name !== projectName;
    });
  }
}
