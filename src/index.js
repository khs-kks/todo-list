import Project from "./class-project";
import AllProjects from "./class-projects-holder";
import addProject from "./DOM-add-project";

const testProject = new Project("Kriskata se uchi");
const projectsList = new AllProjects();
const test2 = new Project("Proba");

projectsList.appendNewProject(test2);
projectsList.appendNewProject(testProject);
console.log(projectsList.getProjects());

console.log("After filtering: ")

projectsList.deleteProject(test2.name);
console.log(projectsList.getProjects());

projectsList.deleteProject("proba1");
console.log(projectsList.getProjects());

addProject(projectsList);




