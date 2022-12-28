import Project from "./class-project";
import AllProjects from "./class-projects-holder";
import addProject from "./DOM-add-project";

const testProject = new Project("Kriskata se uchi");
const test2 = new Project("Proba");

AllProjects.appendNewProject(test2);
AllProjects.appendNewProject(testProject);
console.log(AllProjects.getProjects());

console.log("After filtering: ")

AllProjects.deleteProject(test2.name);
console.log(AllProjects.getProjects());

AllProjects.deleteProject("proba1");
console.log(AllProjects.getProjects());

addProject(AllProjects);




