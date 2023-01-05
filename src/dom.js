import Project from "./project";
import AllProjects from "./projects-list";
import Task from "./task";

//query all the modal elements
const content = document.querySelector("#content");
const lowerButtonsMainLeft = document.querySelector(".lower-buttons");
const mainRight = document.querySelector(".main-right");

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

//empty project modal
const okButton = document.querySelector(".ok");
const deleteProjectButton = document.querySelector("button.delete-project");
const emptyProjectModal = document.querySelector(".empty-project-modal");

////////////////////////////
class DynamicElements {
  static newProjectAdded(projectTitle) {
    this.updateTaskModal(projectTitle);
    this.updateLeftNav();
  }

  static updateTaskModal(projectTitle) {
    const option = document.createElement("option");
    option.textContent = projectTitle;
    option.setAttribute("value", projectTitle.toLowerCase());
    taskAssignToProject.appendChild(option);
  }

  static updateLeftNav() {
    this.deleteChildren(lowerButtonsMainLeft);

    for (let i = 1; i < AllProjects.getProjectsCount(); i++) {
      const btn = document.createElement("button");
      btn.classList.add("projects");
      btn.innerHTML = `<img src='./images/format-list-checks.png' alt='Image of checklist'>${AllProjects.getProjectAtIndex(
        i
      ).getName()}`;
      lowerButtonsMainLeft.appendChild(btn);
      btn.addEventListener("click", this.populateProjectDetails);
    }
  }

  static deleteChildren(parent) {
    while (parent.lastChild !== addProjectButton) {
      parent.removeChild(parent.lastChild);
    }
  }

  static populateProjectDetails(event) {
    // console.log(event.target.innerText);
    //Check to see if project clicked is empty and if it is bring up the modal,
    // if it isn't populate main right with the project's tasks
    if (
      AllProjects.getProjectByName(event.target.innerText).getTasksCount() === 0
    ) {
      emptyProjectModal.classList.toggle("empty-project-modal-visible");
      UI.toggleBlur();
      deleteProjectButton.setAttribute("data-project", event.target.innerText);
    } else {
      //clear main-right display before rendering the tasks

      while (mainRight.lastChild) {
        mainRight.removeChild(mainRight.lastChild);
      }

      //generate the header and summary with number of tasks
      const header1 = document.createElement("h1");
      const tasksContainer = document.createElement("div");
      const tasksHeader = document.createElement("div");
      const tasksHeaderWrapper = document.createElement("div");
      const div = document.createElement("div");
      div.textContent = "Tasks ";
      const spanNumberOfTasks = document.createElement("span");

      header1.classList.add("project-title");
      header1.textContent = event.target.innerText;

      tasksContainer.classList.add("tasks-container");
      tasksHeader.classList.add("tasks-header");
      tasksHeaderWrapper.classList.add("tasks-header-wrapper");
      spanNumberOfTasks.classList.add("number-of-tasks");
      spanNumberOfTasks.textContent = `(${AllProjects.getProjectByName(
        event.target.innerText
      ).getTasksCount()})`;

      div.appendChild(spanNumberOfTasks);
      tasksHeaderWrapper.appendChild(div);
      tasksHeader.appendChild(tasksHeaderWrapper);
      tasksContainer.appendChild(tasksHeader);

      mainRight.appendChild(header1);
      mainRight.appendChild(tasksContainer);

      for (
        let i = 0;
        i <
        AllProjects.getProjectByName(event.target.innerText).getTasksCount();
        i++
      ) {
        console.table(
          AllProjects.getProjectByName(event.target.innerText).getTaskByIndex(i)
        );
        const regularTask = document.createElement("div");
        regularTask.classList.add("regular-task");
        regularTask.classList.add(
          AllProjects.getProjectByName(event.target.innerText).getTaskByIndex(i)
            .priority
        );
        const toDoNameWrapper = document.createElement("div");
        toDoNameWrapper.classList.add("todo-name-wrapper");
        const toDo = document.createElement("div");
        const spanTaskName = document.createElement("span");

        spanTaskName.textContent = AllProjects.getProjectByName(
          event.target.innerText
        ).getTaskByIndex(i).title;
        spanTaskName.classList.add("task-name");
        toDo.classList.add("todo");

        if (
          AllProjects.getProjectByName(event.target.innerText).getTaskByIndex(i)
            .isCompleted
        ) {
          toDo.classList.add("completed");
        }

        toDoNameWrapper.appendChild(toDo);
        toDoNameWrapper.appendChild(spanTaskName);
        regularTask.appendChild(toDoNameWrapper);
        tasksContainer.append(regularTask);

        const todoOptionsWrapper = document.createElement("div");
        todoOptionsWrapper.classList.add("todo-options-wrapper");
        const todoDetails = document.createElement("button");
        todoDetails.classList.add("todo-details");
        todoDetails.textContent = "DETAILS";
        todoOptionsWrapper.appendChild(todoDetails);
        const spanDueDate = document.createElement("span");
        spanDueDate.classList.add("due-date");
        spanDueDate.textContent = AllProjects.getProjectByName(
          event.target.innerText
        ).getTaskByIndex(i).duedate;
        todoOptionsWrapper.appendChild(spanDueDate);
        const imgEdit = document.createElement("img");
        imgEdit.setAttribute("src", "./images/pencil-box-outline.svg");
        imgEdit.setAttribute("alt", "Button to edit the task");
        imgEdit.setAttribute("height", "25px");
        todoOptionsWrapper.appendChild(imgEdit);
        const imgDelete = document.createElement("img");
        imgDelete.setAttribute("src", "./images/trash-can-outline.svg");
        imgDelete.setAttribute("alt", "Button to delete the task");
        imgDelete.setAttribute("height", "25px");
        todoOptionsWrapper.appendChild(imgDelete);
        regularTask.appendChild(todoOptionsWrapper);

        //TO FINISH add event listeners for each task's buttons
      }
    }
  }

  static deleteProjectFromTaskModal() {
    //querry all the option.values and check to see if they exist in AllProjects or the value is equal to deleteProjectButton.getAttribute("data-project"), if the option isnt there, delete it
    // deleteProjectButton.getAttribute("data-project");
    // console.log(deleteProjectButton.getAttribute("data-project"));
    let value = deleteProjectButton.getAttribute("data-project");
    const toRemove = document.querySelector(`select > [value="${value}"]`);
    // console.log(toRemove);
    toRemove.remove();
    // .remove();
  }
}

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

  static toggleBlur() {
    content.classList.toggle("blur-content");
  }

  static initDefaultContainer() {
    //create an empty Project and append it to the ProjectsList
    AllProjects.appendNewProject(new Project("default"));
  }

  //todo gather all static listeners in one function
  static addListeners() {
    //+ Add Task button
    addTaskButton.addEventListener("click", this.openTaskModal);
    taskModalCancelBtn.addEventListener("click", this.closeTaskModal);
    taskModalSubmitBtn.addEventListener("click", this.submitTask);

    //+ Add Project button
    addProjectButton.addEventListener("click", this.openProjectModal);
    projectModalCancelBtn.addEventListener("click", this.closeProjectModal);
    projectModalProceedBtn.addEventListener("click", this.submitProject);

    //Empty Project modal buttons
    okButton.addEventListener("click", this.closeEmptyProjectModal);
    deleteProjectButton.addEventListener("click", this.deleteEmptyProject);
  }
  //Event listeners for the homepage and all of the modals

  static closeTaskModal() {
    taskModal.classList.toggle("add-task-modal-visible");
    UI.toggleBlur();
  }

  static openTaskModal() {
    taskModal.classList.toggle("add-task-modal-visible");
    //clear first two fields from previously added task
    taskTitle.value = "";
    taskDescription.value = "";
    UI.toggleBlur();
    // console.table(AllProjects.getProjects());
  }

  static submitTask() {
    if (taskDueDate.value && taskTitle.value) {
      //   console.log(taskPriority.value);
      //   console.log(taskAssignToProject.value);
      //   console.log(taskDescription.value);

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
      //   console.log(taskAssignToProject.value);
      //     console.table(
      //       AllProjects.getProjectByName(taskAssignToProject.value).getTasks()
      //     );
    } else {
      Alert._alert("Title and Due Date are mandatory");
    }
  }

  static openProjectModal() {
    projectTitle.value = "";
    projectModal.classList.toggle("add-project-modal-visible");
    UI.toggleBlur();
  }

  static closeProjectModal() {
    projectModal.classList.toggle("add-project-modal-visible");
    UI.toggleBlur();
  }

  static submitProject() {
    if (projectTitle.value) {
      AllProjects.appendNewProject(new Project(projectTitle.value));
      UI.closeProjectModal();
      DynamicElements.newProjectAdded(projectTitle.value);
    } else {
      Alert._alert("Title cannot be empty");
    }
  }

  static closeEmptyProjectModal() {
    emptyProjectModal.classList.toggle("empty-project-modal-visible");
    UI.toggleBlur();
  }

  static deleteEmptyProject() {
    AllProjects.deleteProject(deleteProjectButton.getAttribute("data-project"));
    DynamicElements.updateLeftNav();
    DynamicElements.deleteProjectFromTaskModal();
    UI.closeEmptyProjectModal();
  }
}
