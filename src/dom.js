import { retrieveLocalStorage, updateLocalStorage } from "./localStorage";
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
const taskDetailsModal = document.querySelector(".task-details-modal");
const taskDetailsCloseButton = document.querySelector(".close-task-details");
const taskDetailsInfo = document.querySelector(".task-details-info");
const taskDetailsDescription = document.querySelector(
  ".task-details-description"
);
const taskDetailsDueDate = document.querySelector(".task-details-duedate");
const taskDetailsPriority = document.querySelector(".task-details-priority");
const taskDetailsCompleted = document.querySelector(".task-details-project");

//left nav bar static buttons

const addTaskButton = document.querySelector(".add-task");
const addProjectButton = document.querySelector(".add-project");
const defaultContainerButton = document.querySelector(".default-project");

//empty project modal
const okButton = document.querySelector(".ok");
const deleteProjectButton = document.querySelector("button.delete-project");
const emptyProjectModal = document.querySelector(".empty-project-modal");

//year in footer
const footerYear = document.querySelector(".footer span");

//today and this week buttons
const todayTasksButton = document.querySelector(".today");
const thisWeekTasksButton = document.querySelector(".this-week");

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
    console.log(AllProjects.getProjectByName(event.target.innerText));
    if (
      AllProjects.getProjectByName(event.target.innerText).getTasksCount() ===
        0 &&
      event.target.innerText !== "Default Container"
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
      const imgRefresh = document.createElement("img");

      header1.classList.add("project-title");
      header1.textContent = event.target.innerText;

      tasksContainer.classList.add("tasks-container");
      tasksHeader.classList.add("tasks-header");
      tasksHeaderWrapper.classList.add("tasks-header-wrapper");
      spanNumberOfTasks.classList.add("number-of-tasks");
      spanNumberOfTasks.textContent = `(${AllProjects.getProjectByName(
        event.target.innerText
      ).getTasksCount()})`;

      imgRefresh.setAttribute("src", "./images/refresh-circle.svg");
      imgRefresh.setAttribute("alt", "Image of refresh button");
      imgRefresh.setAttribute("height", "25px");
      imgRefresh.addEventListener("click", () => {
        DynamicElements.populateProjectDetails(event);
      });

      div.appendChild(spanNumberOfTasks);
      tasksHeaderWrapper.appendChild(div);
      tasksHeaderWrapper.appendChild(imgRefresh);
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
          spanTaskName.classList.add("completed");
        }

        toDo.addEventListener("click", () => {
          toDo.classList.toggle("completed");
          spanTaskName.classList.toggle("completed");
          let isTaskCompleted = AllProjects.getProjectByName(
            event.target.innerText
          ).getTaskByIndex(i).isCompleted;
          if (isTaskCompleted) {
            AllProjects.getProjectByName(event.target.innerText).getTaskByIndex(
              i
            ).isCompleted = false;
          } else {
            AllProjects.getProjectByName(event.target.innerText).getTaskByIndex(
              i
            ).isCompleted = true;
          }
          updateLocalStorage();
        });

        toDoNameWrapper.appendChild(toDo);
        toDoNameWrapper.appendChild(spanTaskName);
        regularTask.appendChild(toDoNameWrapper);
        tasksContainer.append(regularTask);

        const todoOptionsWrapper = document.createElement("div");
        todoOptionsWrapper.classList.add("todo-options-wrapper");
        const todoDetails = document.createElement("button");
        todoDetails.classList.add("todo-details");
        todoDetails.textContent = "DETAILS";

        todoDetails.addEventListener("click", () => {
          taskDetailsModal.classList.add("task-details-modal-visible");
          taskDetailsCloseButton.addEventListener("click", () => {
            taskDetailsModal.classList.remove("task-details-modal-visible");
          });

          taskDetailsInfo.textContent = AllProjects.getProjectByName(
            event.target.innerText
          ).getTaskByIndex(i).title;

          taskDetailsDescription.textContent = AllProjects.getProjectByName(
            event.target.innerText
          ).getTaskByIndex(i).description;

          taskDetailsDueDate.textContent = AllProjects.getProjectByName(
            event.target.innerText
          ).getTaskByIndex(i).duedate;

          taskDetailsPriority.textContent = AllProjects.getProjectByName(
            event.target.innerText
          ).getTaskByIndex(i).priority;

          if (
            AllProjects.getProjectByName(event.target.innerText).getTaskByIndex(
              i
            ).isCompleted
          ) {
            taskDetailsCompleted.textContent = "Completed";
          } else {
            taskDetailsCompleted.textContent = "NOT Completed";
          }
        });

        todoOptionsWrapper.appendChild(todoDetails);
        const spanDueDate = document.createElement("span");
        spanDueDate.classList.add("due-date");
        spanDueDate.textContent = AllProjects.getProjectByName(
          event.target.innerText
        ).getTaskByIndex(i).duedate;
        todoOptionsWrapper.appendChild(spanDueDate);
        // const imgEdit = document.createElement("img");
        // imgEdit.setAttribute("src", "./images/pencil-box-outline.svg");
        // imgEdit.setAttribute("alt", "Button to edit the task");
        // imgEdit.setAttribute("height", "25px");
        // todoOptionsWrapper.appendChild(imgEdit);
        const imgDelete = document.createElement("img");
        imgDelete.setAttribute("src", "./images/trash-can-outline.svg");
        imgDelete.setAttribute("alt", "Button to delete the task");
        imgDelete.setAttribute("height", "25px");

        imgDelete.addEventListener("click", () => {
          AllProjects.getProjectByName(
            event.target.innerText
          ).deleteTaskAtIndex(i);

          updateLocalStorage();

          while (mainRight.lastChild) {
            mainRight.removeChild(mainRight.lastChild);
          }

          DynamicElements.populateProjectDetails(event);
        });
        todoOptionsWrapper.appendChild(imgDelete);
        regularTask.appendChild(todoOptionsWrapper);

        //TO FINISH add event listeners for each task's buttons
      }
    }
  }

  static openTodayThisWeekTasks(event) {
    // console.log(event.target.innerText)
    if (event.currentTarget.innerText.includes("Today")) {
      DynamicElements.populateTodayOrThisWeekMainRight(
        AllProjects.getEveryTodayTaskFromEveryProject(),
        "Today"
      );
    } else if (event.currentTarget.innerText.includes("This week")) {
      // DynamicElements.populateTodayOrThisWeekMainRight(); with every tasks within the current week
      DynamicElements.populateTodayOrThisWeekMainRight(
        AllProjects.getEveryThisWeekTaskFromEveryProject(),
        "This week"
      );
    }
  }

  static populateTodayOrThisWeekMainRight(allTasks, dayString) {
    if (typeof allTasks === "undefined") {
      Alert._alert("ENJOY! NO TASKS IN THE NEAR FUTURE!");
    } else {
      //Start building the page on Main-Right with today's tasks
      //REMEMBER
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
      const imgRefresh = document.createElement("img");

      header1.classList.add("project-title");
      header1.textContent = dayString;

      tasksContainer.classList.add("tasks-container");
      tasksHeader.classList.add("tasks-header");
      tasksHeaderWrapper.classList.add("tasks-header-wrapper");
      spanNumberOfTasks.classList.add("number-of-tasks");
      spanNumberOfTasks.textContent = `(${allTasks.length})`;

      imgRefresh.setAttribute("src", "./images/refresh-circle.svg");
      imgRefresh.setAttribute("alt", "Image of refresh button");
      imgRefresh.setAttribute("height", "25px");
      imgRefresh.addEventListener("click", () => {
        DynamicElements.populateTodayOrThisWeekMainRight(allTasks, dayString);
      });

      div.appendChild(spanNumberOfTasks);
      tasksHeaderWrapper.appendChild(div);
      tasksHeaderWrapper.appendChild(imgRefresh);
      tasksHeader.appendChild(tasksHeaderWrapper);
      tasksContainer.appendChild(tasksHeader);

      mainRight.appendChild(header1);
      mainRight.appendChild(tasksContainer);

      for (let i = 0; i < allTasks.length; i++) {
        const regularTask = document.createElement("div");
        regularTask.classList.add("regular-task");
        regularTask.classList.add(allTasks[i].priority);
        const toDoNameWrapper = document.createElement("div");
        toDoNameWrapper.classList.add("todo-name-wrapper");
        const toDo = document.createElement("div");
        const spanTaskName = document.createElement("span");

        spanTaskName.textContent = allTasks[i].title;
        spanTaskName.classList.add("task-name");
        toDo.classList.add("todo");

        if (allTasks[i].isCompleted) {
          toDo.classList.add("completed");
          spanTaskName.classList.add("completed");
        }

        toDo.addEventListener("click", () => {
          toDo.classList.toggle("completed");
          spanTaskName.classList.toggle("completed");
          let isTaskCompleted = allTasks[i].isCompleted;
          if (isTaskCompleted) {
            AllProjects.getProjectByName(
              allTasks[i].belongsToProject
            ).getTaskByName(allTasks[i].title).isCompleted = false;
          } else {
            AllProjects.getProjectByName(
              allTasks[i].belongsToProject
            ).getTaskByName(allTasks[i].title).isCompleted = true;
          }
          updateLocalStorage();
        });

        toDoNameWrapper.appendChild(toDo);
        toDoNameWrapper.appendChild(spanTaskName);
        regularTask.appendChild(toDoNameWrapper);
        tasksContainer.append(regularTask);

        const todoOptionsWrapper = document.createElement("div");
        todoOptionsWrapper.classList.add("todo-options-wrapper");
        const todoDetails = document.createElement("button");
        todoDetails.classList.add("todo-details");
        todoDetails.textContent = "DETAILS";

        todoDetails.addEventListener("click", () => {
          taskDetailsModal.classList.add("task-details-modal-visible");
          taskDetailsCloseButton.addEventListener("click", () => {
            taskDetailsModal.classList.remove("task-details-modal-visible");
          });

          taskDetailsInfo.textContent = allTasks[i].title;

          taskDetailsDescription.textContent = allTasks[i].description;

          taskDetailsDueDate.textContent = allTasks[i].duedate;

          taskDetailsPriority.textContent = allTasks[i].priority;

          if (
            AllProjects.getProjectByName(
              allTasks[i].belongsToProject
            ).getTaskByName(allTasks[i].title).isCompleted
          ) {
            taskDetailsCompleted.textContent = "Completed";
          } else {
            taskDetailsCompleted.textContent = "NOT Completed";
          }
        });

        todoOptionsWrapper.appendChild(todoDetails);
        const spanDueDate = document.createElement("span");
        spanDueDate.classList.add("due-date");
        spanDueDate.textContent = AllProjects.getProjectByName(
          allTasks[i].belongsToProject
        ).getTaskByName(allTasks[i].title).duedate;
        todoOptionsWrapper.appendChild(spanDueDate);
        // const imgEdit = document.createElement("img");
        // imgEdit.setAttribute("src", "./images/pencil-box-outline.svg");
        // imgEdit.setAttribute("alt", "Button to edit the task");
        // imgEdit.setAttribute("height", "25px");
        // todoOptionsWrapper.appendChild(imgEdit);
        const imgDelete = document.createElement("img");
        imgDelete.setAttribute("src", "./images/trash-can-outline.svg");
        imgDelete.setAttribute("alt", "Button to delete the task");
        imgDelete.setAttribute("height", "25px");

        imgDelete.addEventListener("click", () => {
          AllProjects.getProjectByName(
            allTasks[i].belongsToProject
          ).deleteTaskByName(allTasks[i].title);

          allTasks.splice(i, 1);
          updateLocalStorage();

          while (mainRight.lastChild) {
            mainRight.removeChild(mainRight.lastChild);
          }

          DynamicElements.populateTodayOrThisWeekMainRight(
            AllProjects.getEveryTodayTaskFromEveryProject(),
            dayString
          );
        });
        todoOptionsWrapper.appendChild(imgDelete);
        regularTask.appendChild(todoOptionsWrapper);
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
    //check if local storage is available on the user's PC
    if (this.storageAvailable("localStorage")) {
      // check if localStorage has anything saved
      if (localStorage.length > 0) {
        retrieveLocalStorage();
      }
    }
    //set the min date to be TODAY
    this.setMinDate();
    this.updateYearInFooter();
    this.initDefaultContainer();
    this.addListeners();
    // this.addTask();
  }

  static setMinDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const minDate = year + "-" + month + "-" + day;
    taskDueDate.min = minDate;
  }

  static updateYearInFooter() {
    footerYear.textContent = new Date().getFullYear();
  }

  static toggleBlur() {
    content.classList.toggle("blur-content");
  }

  static initDefaultContainer() {
    //create an empty Project and append it to the ProjectsList
    console.table(AllProjects.getProjects());
    if (AllProjects.getProjectsCount() === 0) {
      AllProjects.appendNewProject(new Project("Default Container"));
      updateLocalStorage();
    } else {
      for (let i = 1; i < AllProjects.getProjectsCount(); i++) {
        DynamicElements.newProjectAdded(
          AllProjects.getProjectAtIndex(i).getName()
        );
      }
    }
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

    //Default Container button
    defaultContainerButton.addEventListener("click", this.openDefaultContainer);

    //Today and This Week buttons
    todayTasksButton.addEventListener(
      "click",
      DynamicElements.openTodayThisWeekTasks
    );

    thisWeekTasksButton.addEventListener(
      "click",
      DynamicElements.openTodayThisWeekTasks
    );
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
    let taskExists = AllProjects.getProjectByName(
      taskAssignToProject.value
    ).taskAlreadyExists(taskTitle.value);

    if (taskDueDate.value && taskTitle.value && !taskExists) {
      //   console.log(taskPriority.value);
      // console.log(taskAssignToProject.value);
      //   console.log(taskDescription.value);

      const newTask = new Task(
        taskTitle.value,
        taskPriority.value,
        taskDescription.value,
        taskDueDate.value,
        taskAssignToProject.value
      );
      AllProjects.getProjectByName(taskAssignToProject.value).addNewTask(
        newTask
      );
      updateLocalStorage();
      UI.closeTaskModal();
      //   console.log(taskAssignToProject.value);
      //     console.table(
      //       AllProjects.getProjectByName(taskAssignToProject.value).getTasks()
      //     );
    } else {
      Alert._alert(
        "Title and Due Date are mandatory, and only one unique task's names"
      );
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
    let pTitle = "";
    if (projectTitle.value) {
      pTitle = projectTitle.value.trimStart();
    }
    if (pTitle) {
      if (!AllProjects.isProjectAlreadyAdded(pTitle)) {
        AllProjects.appendNewProject(new Project(pTitle));
        updateLocalStorage();
        UI.closeProjectModal();
        DynamicElements.newProjectAdded(pTitle);
      } else {
        Alert._alert("Project already exists!!!");
      }
    } else {
      Alert._alert("Title cannot be empty");
    }
  }

  static closeEmptyProjectModal() {
    emptyProjectModal.classList.toggle("empty-project-modal-visible");
    UI.toggleBlur();
  }

  static deleteEmptyProject() {
    if (
      deleteProjectButton.getAttribute("data-project") !== "Default Container"
    ) {
      AllProjects.deleteProject(
        deleteProjectButton.getAttribute("data-project")
      );
      updateLocalStorage();
      DynamicElements.updateLeftNav();
      DynamicElements.deleteProjectFromTaskModal();
      UI.closeEmptyProjectModal();
    }
  }

  static openDefaultContainer(event) {
    DynamicElements.populateProjectDetails(event);
  }

  static storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === "QuotaExceededError" ||
          // Firefox
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }
}
