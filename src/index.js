import Project from "./class-project";
import AllProjects from "./class-projects-holder";
import Task from "./class-task";
import addProject from "./DOM-add-project";

addProject(AllProjects);
const footer = document.querySelector(".footer");

footer.addEventListener("click", () => {
    const someTask = new Task("Proba", "low", "Some stupid shit", "30.11.2022");
    const proj = new Project("Ludnichka");
    proj.addNewTask(someTask);
    console.log(proj.getTasks());
})





