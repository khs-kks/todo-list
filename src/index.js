import Project from "./project";
import AllProjects from "./projects-list";
import Task from "./task";
import initDom from "./redundant";

initDom();

// addProject(AllProjects);
const footer = document.querySelector(".footer");

footer.addEventListener("click", () => {
    const someTask = new Task("Proba", "low", "Some stupid shit", "30.11.2022");
    const proj = new Project("Ludnichka");
    proj.addNewTask(someTask);
    console.log(proj.getTasks());
})





