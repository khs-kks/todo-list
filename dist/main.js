/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UI)
/* harmony export */ });
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ "./src/project.js");
/* harmony import */ var _projects_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects-list */ "./src/projects-list.js");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./task */ "./src/task.js");




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

    for (let i = 1; i < _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectsCount(); i++) {
      const btn = document.createElement("button");
      btn.classList.add("projects");
      btn.innerHTML = `<img src='./images/format-list-checks.png' alt='Image of checklist'>${_projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectAtIndex(
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
      _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectByName(event.target.innerText).getTasksCount() ===
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
      spanNumberOfTasks.textContent = `(${_projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectByName(
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
        _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectByName(event.target.innerText).getTasksCount();
        i++
      ) {
  
        const regularTask = document.createElement("div");
        regularTask.classList.add("regular-task");
        regularTask.classList.add(
          _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectByName(event.target.innerText).getTaskByIndex(i)
            .priority
        );
        const toDoNameWrapper = document.createElement("div");
        toDoNameWrapper.classList.add("todo-name-wrapper");
        const toDo = document.createElement("div");
        const spanTaskName = document.createElement("span");

        spanTaskName.textContent = _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectByName(
          event.target.innerText
        ).getTaskByIndex(i).title;
        spanTaskName.classList.add("task-name");
        toDo.classList.add("todo");

        if (
          _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectByName(event.target.innerText).getTaskByIndex(i)
            .isCompleted
        ) {
          toDo.classList.add("completed");
          spanTaskName.classList.add("completed");
        }

        toDo.addEventListener("click", () => {
          toDo.classList.toggle("completed");
          spanTaskName.classList.toggle("completed");
          let isTaskCompleted = _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectByName(
            event.target.innerText
          ).getTaskByIndex(i).isCompleted;
          if (isTaskCompleted) {
            _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectByName(event.target.innerText).getTaskByIndex(
              i
            ).isCompleted = false;
          } else {
            _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectByName(event.target.innerText).getTaskByIndex(
              i
            ).isCompleted = true;
          }
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

          taskDetailsInfo.textContent = _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectByName(
            event.target.innerText
          ).getTaskByIndex(i).title;

          taskDetailsDescription.textContent = _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectByName(
            event.target.innerText
          ).getTaskByIndex(i).description;

          taskDetailsDueDate.textContent = _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectByName(
            event.target.innerText
          ).getTaskByIndex(i).duedate;

          taskDetailsPriority.textContent = _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectByName(
            event.target.innerText
          ).getTaskByIndex(i).priority;

          if (
            _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectByName(event.target.innerText).getTaskByIndex(
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
        spanDueDate.textContent = _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectByName(
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

        imgDelete.addEventListener("click", () => {
          _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectByName(
            event.target.innerText
          ).deleteTaskAtIndex(i);

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

  static openTodayTasks() {
    
    if (typeof _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getEveryTodayTaskFromEveryProject() === "undefined") {
      Alert._alert("ENJOY! NO TASKS FOR TODAY!");
    } else {
      console.log("OPALA");
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
class UI {
  static init() {
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
    _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].appendNewProject(new _project__WEBPACK_IMPORTED_MODULE_0__["default"]("Default Container"));
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
    todayTasksButton.addEventListener("click", DynamicElements.openTodayTasks);
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

    let taskExists = _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectByName(taskAssignToProject.value).taskAlreadyExists(taskTitle.value);

    if (taskDueDate.value && taskTitle.value && !taskExists) {
      //   console.log(taskPriority.value);
        // console.log(taskAssignToProject.value);
      //   console.log(taskDescription.value);

      const newTask = new _task__WEBPACK_IMPORTED_MODULE_2__["default"](
        taskTitle.value,
        taskPriority.value,
        taskDescription.value,
        taskDueDate.value,
        taskAssignToProject.value
      );
      _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectByName(taskAssignToProject.value).addNewTask(
        newTask
      );
      UI.closeTaskModal();
      //   console.log(taskAssignToProject.value);
      //     console.table(
      //       AllProjects.getProjectByName(taskAssignToProject.value).getTasks()
      //     );
    } else {
      Alert._alert("Title and Due Date are mandatory, and only one unique task's names");
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
      _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].appendNewProject(new _project__WEBPACK_IMPORTED_MODULE_0__["default"](projectTitle.value));
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
    if (
      deleteProjectButton.getAttribute("data-project") !== "Default Container"
    ) {
      _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].deleteProject(
        deleteProjectButton.getAttribute("data-project")
      );
      DynamicElements.updateLeftNav();
      DynamicElements.deleteProjectFromTaskModal();
      UI.closeEmptyProjectModal();
    }
  }

  static openDefaultContainer(event) {
    DynamicElements.populateProjectDetails(event);
  }
}


/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Project)
/* harmony export */ });
class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  // get name() {
  //   return this._name;
  // }

  // set name(value) {
  //   if (value.length < 1) {
  //     alert("Project's name cannot be empty.");
  //     return;
  //   }
  //   this._name = value;
  // }
  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getTaskByIndex(index) {
    return this.tasks[index];
  }

  deleteTaskAtIndex(index) {
    this.tasks.splice(index, 1);
  }

  getTasks() {
    return this.tasks;
  }

  getTasksCount() {
    return this.tasks.length;
  }

  addNewTask(task) {
    this.tasks.push(task);
  }

  taskAlreadyExists(taskName) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].title === taskName) {
        return true;
      }
    }
    return false;
  }

  getTodayTasks() {
    const today = new Date();
    const todayString = today.toISOString().slice(0, 10);

    const allTodayTasks = this.tasks.filter(
      (task) => task.duedate === todayString
    );

    if (allTodayTasks.length > 0) {
      return allTodayTasks;
    }
  }
}


/***/ }),

/***/ "./src/projects-list.js":
/*!******************************!*\
  !*** ./src/projects-list.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AllProjects)
/* harmony export */ });
class AllProjects {
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


/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Task)
/* harmony export */ });
class Task {
  constructor(name, prio, desc, duedate, projectName) {
    this.title = name;
    this.priority = prio;
    this.description = desc;
    this.duedate = duedate;
    this.isCompleted = false;
    this.belongsToProject = projectName;
  }

  // get name() {
  //   return this._name;
  // }

  // set name(value) {
  //   if (value.length < 1) {
  //     alert("Task's name cannot be empty.");
  //     return;
  //   }
  //   this._name = value;
  // }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ "./src/project.js");
/* harmony import */ var _projects_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects-list */ "./src/projects-list.js");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./task */ "./src/task.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom */ "./src/dom.js");





_dom__WEBPACK_IMPORTED_MODULE_3__["default"].init();

// addProject(AllProjects);
// const footer = document.querySelector(".footer");

// footer.addEventListener("click", () => {
//     const someTask = new Task("Proba", "low", "Some stupid shit", "30.11.2022");
//     const proj = new Project("Ludnichka");
//     proj.addNewTask(someTask);
//     console.log(proj.getTasks());
// })






})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdHMtbGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdFwiO1xuaW1wb3J0IEFsbFByb2plY3RzIGZyb20gXCIuL3Byb2plY3RzLWxpc3RcIjtcbmltcG9ydCBUYXNrIGZyb20gXCIuL3Rhc2tcIjtcblxuLy9xdWVyeSBhbGwgdGhlIG1vZGFsIGVsZW1lbnRzXG5jb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250ZW50XCIpO1xuY29uc3QgbG93ZXJCdXR0b25zTWFpbkxlZnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvd2VyLWJ1dHRvbnNcIik7XG5jb25zdCBtYWluUmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tcmlnaHRcIik7XG5cbi8vbmV3IHByb2plY3QgbW9kYWxcbmNvbnN0IHByb2plY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXByb2plY3QtbW9kYWxcIik7XG5jb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3QtdGl0bGUtZm9ybVwiKTtcbmNvbnN0IHByb2plY3RNb2RhbENhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gIFwiLmNhbmNlbC1wcm9qZWN0LWNyZWF0aW9uXCJcbik7XG5jb25zdCBwcm9qZWN0TW9kYWxQcm9jZWVkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgXCIucHJvY2VlZC1wcm9qZWN0LWNyZWF0aW9uXCJcbik7XG5cbi8vdGFzayBjcmVhdGlvbiBtb2RhbFxuY29uc3QgdGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay1tb2RhbFwiKTtcbmNvbnN0IHRhc2tUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay10aXRsZS1mb3JtXCIpO1xuY29uc3QgdGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWRlc2NyaXB0aW9uXCIpO1xuY29uc3QgdGFza0R1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stZHVlLWRhdGVcIik7XG5jb25zdCB0YXNrUHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI1ByaW9yaXR5XCIpO1xuY29uc3QgdGFza0Fzc2lnblRvUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC10by1hZGQtdG9cIik7XG5jb25zdCB0YXNrTW9kYWxDYW5jZWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICBcIi5hZGQtdGFzay1tb2RhbC1idXR0b25zLWNhbmNlbFwiXG4pO1xuY29uc3QgdGFza01vZGFsU3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgXCIuYWRkLXRhc2stbW9kYWwtYnV0dG9ucy1hZGRcIlxuKTtcblxuLy90YXNrIGRldGFpbHMgbW9kYWxcbmNvbnN0IHRhc2tEZXRhaWxzTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGV0YWlscy1tb2RhbFwiKTtcbmNvbnN0IHRhc2tEZXRhaWxzQ2xvc2VCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNsb3NlLXRhc2stZGV0YWlsc1wiKTtcbmNvbnN0IHRhc2tEZXRhaWxzSW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1kZXRhaWxzLWluZm9cIik7XG5jb25zdCB0YXNrRGV0YWlsc0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgXCIudGFzay1kZXRhaWxzLWRlc2NyaXB0aW9uXCJcbik7XG5jb25zdCB0YXNrRGV0YWlsc0R1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGV0YWlscy1kdWVkYXRlXCIpO1xuY29uc3QgdGFza0RldGFpbHNQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1kZXRhaWxzLXByaW9yaXR5XCIpO1xuY29uc3QgdGFza0RldGFpbHNDb21wbGV0ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGV0YWlscy1wcm9qZWN0XCIpO1xuXG4vL2xlZnQgbmF2IGJhciBzdGF0aWMgYnV0dG9uc1xuXG5jb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFza1wiKTtcbmNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0XCIpO1xuY29uc3QgZGVmYXVsdENvbnRhaW5lckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGVmYXVsdC1wcm9qZWN0XCIpO1xuXG4vL2VtcHR5IHByb2plY3QgbW9kYWxcbmNvbnN0IG9rQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5va1wiKTtcbmNvbnN0IGRlbGV0ZVByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uLmRlbGV0ZS1wcm9qZWN0XCIpO1xuY29uc3QgZW1wdHlQcm9qZWN0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVtcHR5LXByb2plY3QtbW9kYWxcIik7XG5cbi8veWVhciBpbiBmb290ZXJcbmNvbnN0IGZvb3RlclllYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvb3RlciBzcGFuXCIpO1xuXG4vL3RvZGF5IGFuZCB0aGlzIHdlZWsgYnV0dG9uc1xuY29uc3QgdG9kYXlUYXNrc0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kYXlcIik7XG5jb25zdCB0aGlzV2Vla1Rhc2tzQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50aGlzLXdlZWtcIik7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmNsYXNzIER5bmFtaWNFbGVtZW50cyB7XG4gIHN0YXRpYyBuZXdQcm9qZWN0QWRkZWQocHJvamVjdFRpdGxlKSB7XG4gICAgdGhpcy51cGRhdGVUYXNrTW9kYWwocHJvamVjdFRpdGxlKTtcbiAgICB0aGlzLnVwZGF0ZUxlZnROYXYoKTtcbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVUYXNrTW9kYWwocHJvamVjdFRpdGxlKSB7XG4gICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICBvcHRpb24udGV4dENvbnRlbnQgPSBwcm9qZWN0VGl0bGU7XG4gICAgb3B0aW9uLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIHByb2plY3RUaXRsZS50b0xvd2VyQ2FzZSgpKTtcbiAgICB0YXNrQXNzaWduVG9Qcm9qZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlTGVmdE5hdigpIHtcbiAgICB0aGlzLmRlbGV0ZUNoaWxkcmVuKGxvd2VyQnV0dG9uc01haW5MZWZ0KTtcblxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgQWxsUHJvamVjdHMuZ2V0UHJvamVjdHNDb3VudCgpOyBpKyspIHtcbiAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBidG4uY2xhc3NMaXN0LmFkZChcInByb2plY3RzXCIpO1xuICAgICAgYnRuLmlubmVySFRNTCA9IGA8aW1nIHNyYz0nLi9pbWFnZXMvZm9ybWF0LWxpc3QtY2hlY2tzLnBuZycgYWx0PSdJbWFnZSBvZiBjaGVja2xpc3QnPiR7QWxsUHJvamVjdHMuZ2V0UHJvamVjdEF0SW5kZXgoXG4gICAgICAgIGlcbiAgICAgICkuZ2V0TmFtZSgpfWA7XG4gICAgICBsb3dlckJ1dHRvbnNNYWluTGVmdC5hcHBlbmRDaGlsZChidG4pO1xuICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnBvcHVsYXRlUHJvamVjdERldGFpbHMpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVDaGlsZHJlbihwYXJlbnQpIHtcbiAgICB3aGlsZSAocGFyZW50Lmxhc3RDaGlsZCAhPT0gYWRkUHJvamVjdEJ1dHRvbikge1xuICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKHBhcmVudC5sYXN0Q2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBwb3B1bGF0ZVByb2plY3REZXRhaWxzKGV2ZW50KSB7XG4gICAgLy8gY29uc29sZS5sb2coZXZlbnQudGFyZ2V0LmlubmVyVGV4dCk7XG4gICAgLy9DaGVjayB0byBzZWUgaWYgcHJvamVjdCBjbGlja2VkIGlzIGVtcHR5IGFuZCBpZiBpdCBpcyBicmluZyB1cCB0aGUgbW9kYWwsXG4gICAgLy8gaWYgaXQgaXNuJ3QgcG9wdWxhdGUgbWFpbiByaWdodCB3aXRoIHRoZSBwcm9qZWN0J3MgdGFza3NcbiAgICBpZiAoXG4gICAgICBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKGV2ZW50LnRhcmdldC5pbm5lclRleHQpLmdldFRhc2tzQ291bnQoKSA9PT1cbiAgICAgICAgMCAmJlxuICAgICAgZXZlbnQudGFyZ2V0LmlubmVyVGV4dCAhPT0gXCJEZWZhdWx0IENvbnRhaW5lclwiXG4gICAgKSB7XG4gICAgICBlbXB0eVByb2plY3RNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiZW1wdHktcHJvamVjdC1tb2RhbC12aXNpYmxlXCIpO1xuICAgICAgVUkudG9nZ2xlQmx1cigpO1xuICAgICAgZGVsZXRlUHJvamVjdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIiwgZXZlbnQudGFyZ2V0LmlubmVyVGV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vY2xlYXIgbWFpbi1yaWdodCBkaXNwbGF5IGJlZm9yZSByZW5kZXJpbmcgdGhlIHRhc2tzXG5cbiAgICAgIHdoaWxlIChtYWluUmlnaHQubGFzdENoaWxkKSB7XG4gICAgICAgIG1haW5SaWdodC5yZW1vdmVDaGlsZChtYWluUmlnaHQubGFzdENoaWxkKTtcbiAgICAgIH1cblxuICAgICAgLy9nZW5lcmF0ZSB0aGUgaGVhZGVyIGFuZCBzdW1tYXJ5IHdpdGggbnVtYmVyIG9mIHRhc2tzXG4gICAgICBjb25zdCBoZWFkZXIxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgY29uc3QgdGFza3NDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY29uc3QgdGFza3NIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY29uc3QgdGFza3NIZWFkZXJXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBkaXYudGV4dENvbnRlbnQgPSBcIlRhc2tzIFwiO1xuICAgICAgY29uc3Qgc3Bhbk51bWJlck9mVGFza3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgIGNvbnN0IGltZ1JlZnJlc2ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuXG4gICAgICBoZWFkZXIxLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LXRpdGxlXCIpO1xuICAgICAgaGVhZGVyMS50ZXh0Q29udGVudCA9IGV2ZW50LnRhcmdldC5pbm5lclRleHQ7XG5cbiAgICAgIHRhc2tzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrcy1jb250YWluZXJcIik7XG4gICAgICB0YXNrc0hlYWRlci5jbGFzc0xpc3QuYWRkKFwidGFza3MtaGVhZGVyXCIpO1xuICAgICAgdGFza3NIZWFkZXJXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrcy1oZWFkZXItd3JhcHBlclwiKTtcbiAgICAgIHNwYW5OdW1iZXJPZlRhc2tzLmNsYXNzTGlzdC5hZGQoXCJudW1iZXItb2YtdGFza3NcIik7XG4gICAgICBzcGFuTnVtYmVyT2ZUYXNrcy50ZXh0Q29udGVudCA9IGAoJHtBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKFxuICAgICAgICBldmVudC50YXJnZXQuaW5uZXJUZXh0XG4gICAgICApLmdldFRhc2tzQ291bnQoKX0pYDtcblxuICAgICAgaW1nUmVmcmVzaC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCIuL2ltYWdlcy9yZWZyZXNoLWNpcmNsZS5zdmdcIik7XG4gICAgICBpbWdSZWZyZXNoLnNldEF0dHJpYnV0ZShcImFsdFwiLCBcIkltYWdlIG9mIHJlZnJlc2ggYnV0dG9uXCIpO1xuICAgICAgaW1nUmVmcmVzaC5zZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiwgXCIyNXB4XCIpO1xuICAgICAgaW1nUmVmcmVzaC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBEeW5hbWljRWxlbWVudHMucG9wdWxhdGVQcm9qZWN0RGV0YWlscyhldmVudCk7XG4gICAgICB9KTtcblxuICAgICAgZGl2LmFwcGVuZENoaWxkKHNwYW5OdW1iZXJPZlRhc2tzKTtcbiAgICAgIHRhc2tzSGVhZGVyV3JhcHBlci5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgdGFza3NIZWFkZXJXcmFwcGVyLmFwcGVuZENoaWxkKGltZ1JlZnJlc2gpO1xuICAgICAgdGFza3NIZWFkZXIuYXBwZW5kQ2hpbGQodGFza3NIZWFkZXJXcmFwcGVyKTtcbiAgICAgIHRhc2tzQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tzSGVhZGVyKTtcblxuICAgICAgbWFpblJpZ2h0LmFwcGVuZENoaWxkKGhlYWRlcjEpO1xuICAgICAgbWFpblJpZ2h0LmFwcGVuZENoaWxkKHRhc2tzQ29udGFpbmVyKTtcblxuICAgICAgZm9yIChcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBpIDxcbiAgICAgICAgQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShldmVudC50YXJnZXQuaW5uZXJUZXh0KS5nZXRUYXNrc0NvdW50KCk7XG4gICAgICAgIGkrK1xuICAgICAgKSB7XG4gIFxuICAgICAgICBjb25zdCByZWd1bGFyVGFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHJlZ3VsYXJUYXNrLmNsYXNzTGlzdC5hZGQoXCJyZWd1bGFyLXRhc2tcIik7XG4gICAgICAgIHJlZ3VsYXJUYXNrLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShldmVudC50YXJnZXQuaW5uZXJUZXh0KS5nZXRUYXNrQnlJbmRleChpKVxuICAgICAgICAgICAgLnByaW9yaXR5XG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHRvRG9OYW1lV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRvRG9OYW1lV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwidG9kby1uYW1lLXdyYXBwZXJcIik7XG4gICAgICAgIGNvbnN0IHRvRG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjb25zdCBzcGFuVGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblxuICAgICAgICBzcGFuVGFza05hbWUudGV4dENvbnRlbnQgPSBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKFxuICAgICAgICAgIGV2ZW50LnRhcmdldC5pbm5lclRleHRcbiAgICAgICAgKS5nZXRUYXNrQnlJbmRleChpKS50aXRsZTtcbiAgICAgICAgc3BhblRhc2tOYW1lLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLW5hbWVcIik7XG4gICAgICAgIHRvRG8uY2xhc3NMaXN0LmFkZChcInRvZG9cIik7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoZXZlbnQudGFyZ2V0LmlubmVyVGV4dCkuZ2V0VGFza0J5SW5kZXgoaSlcbiAgICAgICAgICAgIC5pc0NvbXBsZXRlZFxuICAgICAgICApIHtcbiAgICAgICAgICB0b0RvLmNsYXNzTGlzdC5hZGQoXCJjb21wbGV0ZWRcIik7XG4gICAgICAgICAgc3BhblRhc2tOYW1lLmNsYXNzTGlzdC5hZGQoXCJjb21wbGV0ZWRcIik7XG4gICAgICAgIH1cblxuICAgICAgICB0b0RvLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgdG9Eby5jbGFzc0xpc3QudG9nZ2xlKFwiY29tcGxldGVkXCIpO1xuICAgICAgICAgIHNwYW5UYXNrTmFtZS5jbGFzc0xpc3QudG9nZ2xlKFwiY29tcGxldGVkXCIpO1xuICAgICAgICAgIGxldCBpc1Rhc2tDb21wbGV0ZWQgPSBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKFxuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmlubmVyVGV4dFxuICAgICAgICAgICkuZ2V0VGFza0J5SW5kZXgoaSkuaXNDb21wbGV0ZWQ7XG4gICAgICAgICAgaWYgKGlzVGFza0NvbXBsZXRlZCkge1xuICAgICAgICAgICAgQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShldmVudC50YXJnZXQuaW5uZXJUZXh0KS5nZXRUYXNrQnlJbmRleChcbiAgICAgICAgICAgICAgaVxuICAgICAgICAgICAgKS5pc0NvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKGV2ZW50LnRhcmdldC5pbm5lclRleHQpLmdldFRhc2tCeUluZGV4KFxuICAgICAgICAgICAgICBpXG4gICAgICAgICAgICApLmlzQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRvRG9OYW1lV3JhcHBlci5hcHBlbmRDaGlsZCh0b0RvKTtcbiAgICAgICAgdG9Eb05hbWVXcmFwcGVyLmFwcGVuZENoaWxkKHNwYW5UYXNrTmFtZSk7XG4gICAgICAgIHJlZ3VsYXJUYXNrLmFwcGVuZENoaWxkKHRvRG9OYW1lV3JhcHBlcik7XG4gICAgICAgIHRhc2tzQ29udGFpbmVyLmFwcGVuZChyZWd1bGFyVGFzayk7XG5cbiAgICAgICAgY29uc3QgdG9kb09wdGlvbnNXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdG9kb09wdGlvbnNXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLW9wdGlvbnMtd3JhcHBlclwiKTtcbiAgICAgICAgY29uc3QgdG9kb0RldGFpbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICB0b2RvRGV0YWlscy5jbGFzc0xpc3QuYWRkKFwidG9kby1kZXRhaWxzXCIpO1xuICAgICAgICB0b2RvRGV0YWlscy50ZXh0Q29udGVudCA9IFwiREVUQUlMU1wiO1xuXG4gICAgICAgIHRvZG9EZXRhaWxzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgdGFza0RldGFpbHNNb2RhbC5jbGFzc0xpc3QuYWRkKFwidGFzay1kZXRhaWxzLW1vZGFsLXZpc2libGVcIik7XG4gICAgICAgICAgdGFza0RldGFpbHNDbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdGFza0RldGFpbHNNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwidGFzay1kZXRhaWxzLW1vZGFsLXZpc2libGVcIik7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0YXNrRGV0YWlsc0luZm8udGV4dENvbnRlbnQgPSBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKFxuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmlubmVyVGV4dFxuICAgICAgICAgICkuZ2V0VGFza0J5SW5kZXgoaSkudGl0bGU7XG5cbiAgICAgICAgICB0YXNrRGV0YWlsc0Rlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5pbm5lclRleHRcbiAgICAgICAgICApLmdldFRhc2tCeUluZGV4KGkpLmRlc2NyaXB0aW9uO1xuXG4gICAgICAgICAgdGFza0RldGFpbHNEdWVEYXRlLnRleHRDb250ZW50ID0gQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5pbm5lclRleHRcbiAgICAgICAgICApLmdldFRhc2tCeUluZGV4KGkpLmR1ZWRhdGU7XG5cbiAgICAgICAgICB0YXNrRGV0YWlsc1ByaW9yaXR5LnRleHRDb250ZW50ID0gQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5pbm5lclRleHRcbiAgICAgICAgICApLmdldFRhc2tCeUluZGV4KGkpLnByaW9yaXR5O1xuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShldmVudC50YXJnZXQuaW5uZXJUZXh0KS5nZXRUYXNrQnlJbmRleChcbiAgICAgICAgICAgICAgaVxuICAgICAgICAgICAgKS5pc0NvbXBsZXRlZFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGFza0RldGFpbHNDb21wbGV0ZWQudGV4dENvbnRlbnQgPSBcIkNvbXBsZXRlZFwiO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0YXNrRGV0YWlsc0NvbXBsZXRlZC50ZXh0Q29udGVudCA9IFwiTk9UIENvbXBsZXRlZFwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdG9kb09wdGlvbnNXcmFwcGVyLmFwcGVuZENoaWxkKHRvZG9EZXRhaWxzKTtcbiAgICAgICAgY29uc3Qgc3BhbkR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgc3BhbkR1ZURhdGUuY2xhc3NMaXN0LmFkZChcImR1ZS1kYXRlXCIpO1xuICAgICAgICBzcGFuRHVlRGF0ZS50ZXh0Q29udGVudCA9IEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoXG4gICAgICAgICAgZXZlbnQudGFyZ2V0LmlubmVyVGV4dFxuICAgICAgICApLmdldFRhc2tCeUluZGV4KGkpLmR1ZWRhdGU7XG4gICAgICAgIHRvZG9PcHRpb25zV3JhcHBlci5hcHBlbmRDaGlsZChzcGFuRHVlRGF0ZSk7XG4gICAgICAgIGNvbnN0IGltZ0VkaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICBpbWdFZGl0LnNldEF0dHJpYnV0ZShcInNyY1wiLCBcIi4vaW1hZ2VzL3BlbmNpbC1ib3gtb3V0bGluZS5zdmdcIik7XG4gICAgICAgIGltZ0VkaXQuc2V0QXR0cmlidXRlKFwiYWx0XCIsIFwiQnV0dG9uIHRvIGVkaXQgdGhlIHRhc2tcIik7XG4gICAgICAgIGltZ0VkaXQuc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIFwiMjVweFwiKTtcbiAgICAgICAgdG9kb09wdGlvbnNXcmFwcGVyLmFwcGVuZENoaWxkKGltZ0VkaXQpO1xuICAgICAgICBjb25zdCBpbWdEZWxldGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICBpbWdEZWxldGUuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiLi9pbWFnZXMvdHJhc2gtY2FuLW91dGxpbmUuc3ZnXCIpO1xuICAgICAgICBpbWdEZWxldGUuc2V0QXR0cmlidXRlKFwiYWx0XCIsIFwiQnV0dG9uIHRvIGRlbGV0ZSB0aGUgdGFza1wiKTtcbiAgICAgICAgaW1nRGVsZXRlLnNldEF0dHJpYnV0ZShcImhlaWdodFwiLCBcIjI1cHhcIik7XG5cbiAgICAgICAgaW1nRGVsZXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5pbm5lclRleHRcbiAgICAgICAgICApLmRlbGV0ZVRhc2tBdEluZGV4KGkpO1xuXG4gICAgICAgICAgd2hpbGUgKG1haW5SaWdodC5sYXN0Q2hpbGQpIHtcbiAgICAgICAgICAgIG1haW5SaWdodC5yZW1vdmVDaGlsZChtYWluUmlnaHQubGFzdENoaWxkKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBEeW5hbWljRWxlbWVudHMucG9wdWxhdGVQcm9qZWN0RGV0YWlscyhldmVudCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0b2RvT3B0aW9uc1dyYXBwZXIuYXBwZW5kQ2hpbGQoaW1nRGVsZXRlKTtcbiAgICAgICAgcmVndWxhclRhc2suYXBwZW5kQ2hpbGQodG9kb09wdGlvbnNXcmFwcGVyKTtcblxuICAgICAgICAvL1RPIEZJTklTSCBhZGQgZXZlbnQgbGlzdGVuZXJzIGZvciBlYWNoIHRhc2sncyBidXR0b25zXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG9wZW5Ub2RheVRhc2tzKCkge1xuICAgIFxuICAgIGlmICh0eXBlb2YgQWxsUHJvamVjdHMuZ2V0RXZlcnlUb2RheVRhc2tGcm9tRXZlcnlQcm9qZWN0KCkgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIEFsZXJ0Ll9hbGVydChcIkVOSk9ZISBOTyBUQVNLUyBGT1IgVE9EQVkhXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcIk9QQUxBXCIpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVQcm9qZWN0RnJvbVRhc2tNb2RhbCgpIHtcbiAgICAvL3F1ZXJyeSBhbGwgdGhlIG9wdGlvbi52YWx1ZXMgYW5kIGNoZWNrIHRvIHNlZSBpZiB0aGV5IGV4aXN0IGluIEFsbFByb2plY3RzIG9yIHRoZSB2YWx1ZSBpcyBlcXVhbCB0byBkZWxldGVQcm9qZWN0QnV0dG9uLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSwgaWYgdGhlIG9wdGlvbiBpc250IHRoZXJlLCBkZWxldGUgaXRcbiAgICAvLyBkZWxldGVQcm9qZWN0QnV0dG9uLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKTtcbiAgICAvLyBjb25zb2xlLmxvZyhkZWxldGVQcm9qZWN0QnV0dG9uLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSk7XG4gICAgbGV0IHZhbHVlID0gZGVsZXRlUHJvamVjdEJ1dHRvbi5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIik7XG4gICAgY29uc3QgdG9SZW1vdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBzZWxlY3QgPiBbdmFsdWU9XCIke3ZhbHVlfVwiXWApO1xuICAgIC8vIGNvbnNvbGUubG9nKHRvUmVtb3ZlKTtcbiAgICB0b1JlbW92ZS5yZW1vdmUoKTtcbiAgICAvLyAucmVtb3ZlKCk7XG4gIH1cbn1cblxuY2xhc3MgQWxlcnQge1xuICBzdGF0aWMgX2FsZXJ0KG1zZykge1xuICAgIGFsZXJ0KG1zZyk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJIHtcbiAgc3RhdGljIGluaXQoKSB7XG4gICAgLy9zZXQgdGhlIG1pbiBkYXRlIHRvIGJlIFRPREFZXG4gICAgdGhpcy5zZXRNaW5EYXRlKCk7XG4gICAgdGhpcy51cGRhdGVZZWFySW5Gb290ZXIoKTtcbiAgICB0aGlzLmluaXREZWZhdWx0Q29udGFpbmVyKCk7XG4gICAgdGhpcy5hZGRMaXN0ZW5lcnMoKTtcbiAgICAvLyB0aGlzLmFkZFRhc2soKTtcbiAgfVxuXG4gIHN0YXRpYyBzZXRNaW5EYXRlKCkge1xuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCB5ZWFyID0gdG9kYXkuZ2V0RnVsbFllYXIoKTtcbiAgICBjb25zdCBtb250aCA9IFN0cmluZyh0b2RheS5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICAgIGNvbnN0IGRheSA9IFN0cmluZyh0b2RheS5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgICBjb25zdCBtaW5EYXRlID0geWVhciArIFwiLVwiICsgbW9udGggKyBcIi1cIiArIGRheTtcbiAgICB0YXNrRHVlRGF0ZS5taW4gPSBtaW5EYXRlO1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZVllYXJJbkZvb3RlcigpIHtcbiAgICBmb290ZXJZZWFyLnRleHRDb250ZW50ID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuICB9XG5cbiAgc3RhdGljIHRvZ2dsZUJsdXIoKSB7XG4gICAgY29udGVudC5jbGFzc0xpc3QudG9nZ2xlKFwiYmx1ci1jb250ZW50XCIpO1xuICB9XG5cbiAgc3RhdGljIGluaXREZWZhdWx0Q29udGFpbmVyKCkge1xuICAgIC8vY3JlYXRlIGFuIGVtcHR5IFByb2plY3QgYW5kIGFwcGVuZCBpdCB0byB0aGUgUHJvamVjdHNMaXN0XG4gICAgQWxsUHJvamVjdHMuYXBwZW5kTmV3UHJvamVjdChuZXcgUHJvamVjdChcIkRlZmF1bHQgQ29udGFpbmVyXCIpKTtcbiAgfVxuXG4gIC8vdG9kbyBnYXRoZXIgYWxsIHN0YXRpYyBsaXN0ZW5lcnMgaW4gb25lIGZ1bmN0aW9uXG4gIHN0YXRpYyBhZGRMaXN0ZW5lcnMoKSB7XG4gICAgLy8rIEFkZCBUYXNrIGJ1dHRvblxuICAgIGFkZFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub3BlblRhc2tNb2RhbCk7XG4gICAgdGFza01vZGFsQ2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNsb3NlVGFza01vZGFsKTtcbiAgICB0YXNrTW9kYWxTdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuc3VibWl0VGFzayk7XG5cbiAgICAvLysgQWRkIFByb2plY3QgYnV0dG9uXG4gICAgYWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vcGVuUHJvamVjdE1vZGFsKTtcbiAgICBwcm9qZWN0TW9kYWxDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuY2xvc2VQcm9qZWN0TW9kYWwpO1xuICAgIHByb2plY3RNb2RhbFByb2NlZWRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuc3VibWl0UHJvamVjdCk7XG5cbiAgICAvL0VtcHR5IFByb2plY3QgbW9kYWwgYnV0dG9uc1xuICAgIG9rQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNsb3NlRW1wdHlQcm9qZWN0TW9kYWwpO1xuICAgIGRlbGV0ZVByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuZGVsZXRlRW1wdHlQcm9qZWN0KTtcblxuICAgIC8vRGVmYXVsdCBDb250YWluZXIgYnV0dG9uXG4gICAgZGVmYXVsdENvbnRhaW5lckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vcGVuRGVmYXVsdENvbnRhaW5lcik7XG5cbiAgICAvL1RvZGF5IGFuZCBUaGlzIFdlZWsgYnV0dG9uc1xuICAgIHRvZGF5VGFza3NCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIER5bmFtaWNFbGVtZW50cy5vcGVuVG9kYXlUYXNrcyk7XG4gIH1cbiAgLy9FdmVudCBsaXN0ZW5lcnMgZm9yIHRoZSBob21lcGFnZSBhbmQgYWxsIG9mIHRoZSBtb2RhbHNcblxuICBzdGF0aWMgY2xvc2VUYXNrTW9kYWwoKSB7XG4gICAgdGFza01vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJhZGQtdGFzay1tb2RhbC12aXNpYmxlXCIpO1xuICAgIFVJLnRvZ2dsZUJsdXIoKTtcbiAgfVxuXG4gIHN0YXRpYyBvcGVuVGFza01vZGFsKCkge1xuICAgIHRhc2tNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiYWRkLXRhc2stbW9kYWwtdmlzaWJsZVwiKTtcbiAgICAvL2NsZWFyIGZpcnN0IHR3byBmaWVsZHMgZnJvbSBwcmV2aW91c2x5IGFkZGVkIHRhc2tcbiAgICB0YXNrVGl0bGUudmFsdWUgPSBcIlwiO1xuICAgIHRhc2tEZXNjcmlwdGlvbi52YWx1ZSA9IFwiXCI7XG4gICAgVUkudG9nZ2xlQmx1cigpO1xuICAgIC8vIGNvbnNvbGUudGFibGUoQWxsUHJvamVjdHMuZ2V0UHJvamVjdHMoKSk7XG4gIH1cblxuICBzdGF0aWMgc3VibWl0VGFzaygpIHtcblxuICAgIGxldCB0YXNrRXhpc3RzID0gQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZSh0YXNrQXNzaWduVG9Qcm9qZWN0LnZhbHVlKS50YXNrQWxyZWFkeUV4aXN0cyh0YXNrVGl0bGUudmFsdWUpO1xuXG4gICAgaWYgKHRhc2tEdWVEYXRlLnZhbHVlICYmIHRhc2tUaXRsZS52YWx1ZSAmJiAhdGFza0V4aXN0cykge1xuICAgICAgLy8gICBjb25zb2xlLmxvZyh0YXNrUHJpb3JpdHkudmFsdWUpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0YXNrQXNzaWduVG9Qcm9qZWN0LnZhbHVlKTtcbiAgICAgIC8vICAgY29uc29sZS5sb2codGFza0Rlc2NyaXB0aW9uLnZhbHVlKTtcblxuICAgICAgY29uc3QgbmV3VGFzayA9IG5ldyBUYXNrKFxuICAgICAgICB0YXNrVGl0bGUudmFsdWUsXG4gICAgICAgIHRhc2tQcmlvcml0eS52YWx1ZSxcbiAgICAgICAgdGFza0Rlc2NyaXB0aW9uLnZhbHVlLFxuICAgICAgICB0YXNrRHVlRGF0ZS52YWx1ZSxcbiAgICAgICAgdGFza0Fzc2lnblRvUHJvamVjdC52YWx1ZVxuICAgICAgKTtcbiAgICAgIEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUodGFza0Fzc2lnblRvUHJvamVjdC52YWx1ZSkuYWRkTmV3VGFzayhcbiAgICAgICAgbmV3VGFza1xuICAgICAgKTtcbiAgICAgIFVJLmNsb3NlVGFza01vZGFsKCk7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKHRhc2tBc3NpZ25Ub1Byb2plY3QudmFsdWUpO1xuICAgICAgLy8gICAgIGNvbnNvbGUudGFibGUoXG4gICAgICAvLyAgICAgICBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKHRhc2tBc3NpZ25Ub1Byb2plY3QudmFsdWUpLmdldFRhc2tzKClcbiAgICAgIC8vICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBBbGVydC5fYWxlcnQoXCJUaXRsZSBhbmQgRHVlIERhdGUgYXJlIG1hbmRhdG9yeSwgYW5kIG9ubHkgb25lIHVuaXF1ZSB0YXNrJ3MgbmFtZXNcIik7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG9wZW5Qcm9qZWN0TW9kYWwoKSB7XG4gICAgcHJvamVjdFRpdGxlLnZhbHVlID0gXCJcIjtcbiAgICBwcm9qZWN0TW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImFkZC1wcm9qZWN0LW1vZGFsLXZpc2libGVcIik7XG4gICAgVUkudG9nZ2xlQmx1cigpO1xuICB9XG5cbiAgc3RhdGljIGNsb3NlUHJvamVjdE1vZGFsKCkge1xuICAgIHByb2plY3RNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiYWRkLXByb2plY3QtbW9kYWwtdmlzaWJsZVwiKTtcbiAgICBVSS50b2dnbGVCbHVyKCk7XG4gIH1cblxuICBzdGF0aWMgc3VibWl0UHJvamVjdCgpIHtcbiAgICBpZiAocHJvamVjdFRpdGxlLnZhbHVlKSB7XG4gICAgICBBbGxQcm9qZWN0cy5hcHBlbmROZXdQcm9qZWN0KG5ldyBQcm9qZWN0KHByb2plY3RUaXRsZS52YWx1ZSkpO1xuICAgICAgVUkuY2xvc2VQcm9qZWN0TW9kYWwoKTtcbiAgICAgIER5bmFtaWNFbGVtZW50cy5uZXdQcm9qZWN0QWRkZWQocHJvamVjdFRpdGxlLnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgQWxlcnQuX2FsZXJ0KFwiVGl0bGUgY2Fubm90IGJlIGVtcHR5XCIpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBjbG9zZUVtcHR5UHJvamVjdE1vZGFsKCkge1xuICAgIGVtcHR5UHJvamVjdE1vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJlbXB0eS1wcm9qZWN0LW1vZGFsLXZpc2libGVcIik7XG4gICAgVUkudG9nZ2xlQmx1cigpO1xuICB9XG5cbiAgc3RhdGljIGRlbGV0ZUVtcHR5UHJvamVjdCgpIHtcbiAgICBpZiAoXG4gICAgICBkZWxldGVQcm9qZWN0QnV0dG9uLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSAhPT0gXCJEZWZhdWx0IENvbnRhaW5lclwiXG4gICAgKSB7XG4gICAgICBBbGxQcm9qZWN0cy5kZWxldGVQcm9qZWN0KFxuICAgICAgICBkZWxldGVQcm9qZWN0QnV0dG9uLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKVxuICAgICAgKTtcbiAgICAgIER5bmFtaWNFbGVtZW50cy51cGRhdGVMZWZ0TmF2KCk7XG4gICAgICBEeW5hbWljRWxlbWVudHMuZGVsZXRlUHJvamVjdEZyb21UYXNrTW9kYWwoKTtcbiAgICAgIFVJLmNsb3NlRW1wdHlQcm9qZWN0TW9kYWwoKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgb3BlbkRlZmF1bHRDb250YWluZXIoZXZlbnQpIHtcbiAgICBEeW5hbWljRWxlbWVudHMucG9wdWxhdGVQcm9qZWN0RGV0YWlscyhldmVudCk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3Qge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnRhc2tzID0gW107XG4gIH1cblxuICAvLyBnZXQgbmFtZSgpIHtcbiAgLy8gICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgLy8gfVxuXG4gIC8vIHNldCBuYW1lKHZhbHVlKSB7XG4gIC8vICAgaWYgKHZhbHVlLmxlbmd0aCA8IDEpIHtcbiAgLy8gICAgIGFsZXJ0KFwiUHJvamVjdCdzIG5hbWUgY2Fubm90IGJlIGVtcHR5LlwiKTtcbiAgLy8gICAgIHJldHVybjtcbiAgLy8gICB9XG4gIC8vICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xuICAvLyB9XG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIHNldE5hbWUobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gIH1cblxuICBnZXRUYXNrQnlJbmRleChpbmRleCkge1xuICAgIHJldHVybiB0aGlzLnRhc2tzW2luZGV4XTtcbiAgfVxuXG4gIGRlbGV0ZVRhc2tBdEluZGV4KGluZGV4KSB7XG4gICAgdGhpcy50YXNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgZ2V0VGFza3MoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFza3M7XG4gIH1cblxuICBnZXRUYXNrc0NvdW50KCkge1xuICAgIHJldHVybiB0aGlzLnRhc2tzLmxlbmd0aDtcbiAgfVxuXG4gIGFkZE5ld1Rhc2sodGFzaykge1xuICAgIHRoaXMudGFza3MucHVzaCh0YXNrKTtcbiAgfVxuXG4gIHRhc2tBbHJlYWR5RXhpc3RzKHRhc2tOYW1lKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRhc2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy50YXNrc1tpXS50aXRsZSA9PT0gdGFza05hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldFRvZGF5VGFza3MoKSB7XG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IHRvZGF5U3RyaW5nID0gdG9kYXkudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMCk7XG5cbiAgICBjb25zdCBhbGxUb2RheVRhc2tzID0gdGhpcy50YXNrcy5maWx0ZXIoXG4gICAgICAodGFzaykgPT4gdGFzay5kdWVkYXRlID09PSB0b2RheVN0cmluZ1xuICAgICk7XG5cbiAgICBpZiAoYWxsVG9kYXlUYXNrcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gYWxsVG9kYXlUYXNrcztcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFsbFByb2plY3RzIHtcbiAgc3RhdGljIHByb2plY3RzID0gW107XG5cbiAgc3RhdGljIGdldFByb2plY3RzKCkge1xuICAgIHJldHVybiB0aGlzLnByb2plY3RzO1xuICB9XG5cbiAgc3RhdGljIGdldFByb2plY3RzQ291bnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdHMubGVuZ3RoO1xuICB9XG5cbiAgc3RhdGljIGdldFByb2plY3RBdEluZGV4KGluZGV4KSB7XG4gICAgaWYgKGluZGV4IDwgdGhpcy5wcm9qZWN0cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb2plY3RzW2luZGV4XTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0UHJvamVjdEJ5TmFtZShwcm9qZWN0TmFtZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMucHJvamVjdHNbaV0ubmFtZSA9PT0gcHJvamVjdE5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvamVjdHNbaV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGFwcGVuZE5ld1Byb2plY3QoUHJvamVjdCkge1xuICAgIGlmIChQcm9qZWN0Lm5hbWUpIHtcbiAgICAgIHRoaXMucHJvamVjdHMucHVzaChQcm9qZWN0KTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlUHJvamVjdChwcm9qZWN0TmFtZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5nZXRQcm9qZWN0c0NvdW50KCk7IGkrKykge1xuICAgICAgaWYgKHRoaXMucHJvamVjdHNbaV0ubmFtZSA9PT0gcHJvamVjdE5hbWUpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldEV2ZXJ5VG9kYXlUYXNrRnJvbUV2ZXJ5UHJvamVjdCgpIHtcbiAgICBsZXQgY29tYmluZWRUb2RheVRhc2tzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnNvbGUubG9nKHR5cGVvZiB0aGlzLnByb2plY3RzW2ldLmdldFRvZGF5VGFza3MoKSlcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9qZWN0c1tpXS5nZXRUb2RheVRhc2tzKCkgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgY29tYmluZWRUb2RheVRhc2tzID0gY29tYmluZWRUb2RheVRhc2tzLmNvbmNhdChcbiAgICAgICAgICB0aGlzLnByb2plY3RzW2ldLmdldFRvZGF5VGFza3MoKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY29tYmluZWRUb2RheVRhc2tzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBjb21iaW5lZFRvZGF5VGFza3M7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIHByaW8sIGRlc2MsIGR1ZWRhdGUsIHByb2plY3ROYW1lKSB7XG4gICAgdGhpcy50aXRsZSA9IG5hbWU7XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW87XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2M7XG4gICAgdGhpcy5kdWVkYXRlID0gZHVlZGF0ZTtcbiAgICB0aGlzLmlzQ29tcGxldGVkID0gZmFsc2U7XG4gICAgdGhpcy5iZWxvbmdzVG9Qcm9qZWN0ID0gcHJvamVjdE5hbWU7XG4gIH1cblxuICAvLyBnZXQgbmFtZSgpIHtcbiAgLy8gICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgLy8gfVxuXG4gIC8vIHNldCBuYW1lKHZhbHVlKSB7XG4gIC8vICAgaWYgKHZhbHVlLmxlbmd0aCA8IDEpIHtcbiAgLy8gICAgIGFsZXJ0KFwiVGFzaydzIG5hbWUgY2Fubm90IGJlIGVtcHR5LlwiKTtcbiAgLy8gICAgIHJldHVybjtcbiAgLy8gICB9XG4gIC8vICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xuICAvLyB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBQcm9qZWN0IGZyb20gXCIuL3Byb2plY3RcIjtcbmltcG9ydCBBbGxQcm9qZWN0cyBmcm9tIFwiLi9wcm9qZWN0cy1saXN0XCI7XG5pbXBvcnQgVGFzayBmcm9tIFwiLi90YXNrXCI7XG5pbXBvcnQgVUkgZnJvbSBcIi4vZG9tXCI7XG5cblVJLmluaXQoKTtcblxuLy8gYWRkUHJvamVjdChBbGxQcm9qZWN0cyk7XG4vLyBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvb3RlclwiKTtcblxuLy8gZm9vdGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4vLyAgICAgY29uc3Qgc29tZVRhc2sgPSBuZXcgVGFzayhcIlByb2JhXCIsIFwibG93XCIsIFwiU29tZSBzdHVwaWQgc2hpdFwiLCBcIjMwLjExLjIwMjJcIik7XG4vLyAgICAgY29uc3QgcHJvaiA9IG5ldyBQcm9qZWN0KFwiTHVkbmljaGthXCIpO1xuLy8gICAgIHByb2ouYWRkTmV3VGFzayhzb21lVGFzayk7XG4vLyAgICAgY29uc29sZS5sb2cocHJvai5nZXRUYXNrcygpKTtcbi8vIH0pXG5cblxuXG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9