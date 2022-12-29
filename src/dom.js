import Project from "./project";
import AllProjects from "./projects-list";
import Task from "./task";

//query all the modal elements

//new project modal
const projectModal = document.querySelector(".add-project-modal");
const projectTitle = document.querySelector("#project-title-form");
const projectModalCancelBtn = document.querySelector(
  ".cancel-project-creation"
);
const projectModalProceedBtn = document.querySelector(
  ".proceed-project-creation"
);

//task creation modal
const taskModal = document.querySelector(".add-task-modal");
const taskTitle = document.querySelector("#task-title-form");
const taskDescription = document.querySelector("#task-description");
const taskDueDate = document.querySelector("#task-due-date");
const taskPriority = document.querySelector("#Priority");
const taskAssignToProject = document.querySelector("#project-to-add-to");
const taskModalCancelBtn = document.querySelector(
  ".add-task-modal-buttons-cancel"
);
const taskModalSubmitBtn = document.querySelector(
  ".add-task-modal-buttons-add"
);

//task details modal
const taskDetailsInfo = document.querySelector(".task-details-info");
const taskDetailsDescription = document.querySelector(
  ".task-details-description"
);
const taskDetailsDueDate = document.querySelector(".task-details-duedate");
const taskDetailsPriority = document.querySelector(".task-details-priority");
const taskDetailsProject = document.querySelector(".task-details-project");

//left nav bar static buttons

const addTaskButton = document.querySelector(".add-task");
const addProjectButton = document.querySelector(".add-project");
const defaultContainerButton = document.querySelector(".default-project");

////////////////////////////
class Alert {
  static _alert(msg) {
    alert(msg);
  }
}
export default class UI {
  static init() {
    this.initDefaultContainer();
    this.addListeners();
    // this.addTask();
  }

  static initDefaultContainer() {
    //create an empty Project and append it to the ProjectsList
    AllProjects.appendNewProject(new Project("default"));
  }

  //todo gather all static listeners in one function
  static addListeners() {
    addTaskButton.addEventListener("click", this.openTaskModal);
    taskModalCancelBtn.addEventListener("click", this.closeTaskModal);
    taskModalSubmitBtn.addEventListener("click", this.submitTask);
  }
  //Event listeners for the homepage and all of the modals

  static closeTaskModal() {
    taskModal.classList.toggle("add-task-modal-visible");
  }

  static openTaskModal() {
    taskModal.classList.toggle("add-task-modal-visible");
    //clear first two fields from previously added task
    taskTitle.value = "";
    taskDescription.value = "";
  }

  static submitTask() {
    if (taskDueDate.value && taskTitle.value) {
      console.log(taskPriority.value);
      console.log(taskAssignToProject.value);
      console.log(taskDescription.value);

      const newTask = new Task(
        taskTitle.value,
        taskPriority.value,
        taskDescription.value,
        taskDueDate.value
      );
      AllProjects.getProjectByName(taskAssignToProject.value).addNewTask(
        newTask
      );
      UI.closeTaskModal();
    //   console.table(
    //     AllProjects.getProjectByName(taskAssignToProject.value).getTasks()
    //   );
    } else {
      Alert._alert("Title and Due Date are mandatory");
    }
  }
}
