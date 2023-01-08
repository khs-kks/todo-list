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

  static openTodayThisWeekTasks(event) {
    // console.log(event.target.innerText)
    if (event.currentTarget.innerText.includes("Today")) {
      DynamicElements.populateTodayMainRight();
    } else if (event.currentTarget.innerText.includes("This week")) {
      DynamicElements.populateThisWeekMainRight();
    }
  }

  static populateTodayMainRight() {
    if (
      typeof _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getEveryTodayTaskFromEveryProject() === "undefined"
    ) {
      Alert._alert("ENJOY! NO TASKS FOR TODAY!");
    } else {
      //Start building the page on Main-Right with today's tasks
    }
  }

  static populateThisWeekMainRight() {}

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
    todayTasksButton.addEventListener("click", DynamicElements.openTodayThisWeekTasks);
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
    let taskExists = _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectByName(
      taskAssignToProject.value
    ).taskAlreadyExists(taskTitle.value);

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
      // console.log(typeof this.projects[i].getTodayTasks())
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNVO0FBQ2hCO0FBQ0g7O0FBRXZCLGlEQUFPOztBQUVQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0cy1saXN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0XCI7XG5pbXBvcnQgQWxsUHJvamVjdHMgZnJvbSBcIi4vcHJvamVjdHMtbGlzdFwiO1xuaW1wb3J0IFRhc2sgZnJvbSBcIi4vdGFza1wiO1xuXG4vL3F1ZXJ5IGFsbCB0aGUgbW9kYWwgZWxlbWVudHNcbmNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRlbnRcIik7XG5jb25zdCBsb3dlckJ1dHRvbnNNYWluTGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG93ZXItYnV0dG9uc1wiKTtcbmNvbnN0IG1haW5SaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1yaWdodFwiKTtcblxuLy9uZXcgcHJvamVjdCBtb2RhbFxuY29uc3QgcHJvamVjdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtcHJvamVjdC1tb2RhbFwiKTtcbmNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC10aXRsZS1mb3JtXCIpO1xuY29uc3QgcHJvamVjdE1vZGFsQ2FuY2VsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgXCIuY2FuY2VsLXByb2plY3QtY3JlYXRpb25cIlxuKTtcbmNvbnN0IHByb2plY3RNb2RhbFByb2NlZWRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICBcIi5wcm9jZWVkLXByb2plY3QtY3JlYXRpb25cIlxuKTtcblxuLy90YXNrIGNyZWF0aW9uIG1vZGFsXG5jb25zdCB0YXNrTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrLW1vZGFsXCIpO1xuY29uc3QgdGFza1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLXRpdGxlLWZvcm1cIik7XG5jb25zdCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stZGVzY3JpcHRpb25cIik7XG5jb25zdCB0YXNrRHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kdWUtZGF0ZVwiKTtcbmNvbnN0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjUHJpb3JpdHlcIik7XG5jb25zdCB0YXNrQXNzaWduVG9Qcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LXRvLWFkZC10b1wiKTtcbmNvbnN0IHRhc2tNb2RhbENhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gIFwiLmFkZC10YXNrLW1vZGFsLWJ1dHRvbnMtY2FuY2VsXCJcbik7XG5jb25zdCB0YXNrTW9kYWxTdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICBcIi5hZGQtdGFzay1tb2RhbC1idXR0b25zLWFkZFwiXG4pO1xuXG4vL3Rhc2sgZGV0YWlscyBtb2RhbFxuY29uc3QgdGFza0RldGFpbHNNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1kZXRhaWxzLW1vZGFsXCIpO1xuY29uc3QgdGFza0RldGFpbHNDbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2xvc2UtdGFzay1kZXRhaWxzXCIpO1xuY29uc3QgdGFza0RldGFpbHNJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWRldGFpbHMtaW5mb1wiKTtcbmNvbnN0IHRhc2tEZXRhaWxzRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICBcIi50YXNrLWRldGFpbHMtZGVzY3JpcHRpb25cIlxuKTtcbmNvbnN0IHRhc2tEZXRhaWxzRHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1kZXRhaWxzLWR1ZWRhdGVcIik7XG5jb25zdCB0YXNrRGV0YWlsc1ByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWRldGFpbHMtcHJpb3JpdHlcIik7XG5jb25zdCB0YXNrRGV0YWlsc0NvbXBsZXRlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1kZXRhaWxzLXByb2plY3RcIik7XG5cbi8vbGVmdCBuYXYgYmFyIHN0YXRpYyBidXR0b25zXG5cbmNvbnN0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrXCIpO1xuY29uc3QgYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXByb2plY3RcIik7XG5jb25zdCBkZWZhdWx0Q29udGFpbmVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZWZhdWx0LXByb2plY3RcIik7XG5cbi8vZW1wdHkgcHJvamVjdCBtb2RhbFxuY29uc3Qgb2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm9rXCIpO1xuY29uc3QgZGVsZXRlUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b24uZGVsZXRlLXByb2plY3RcIik7XG5jb25zdCBlbXB0eVByb2plY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZW1wdHktcHJvamVjdC1tb2RhbFwiKTtcblxuLy95ZWFyIGluIGZvb3RlclxuY29uc3QgZm9vdGVyWWVhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9vdGVyIHNwYW5cIik7XG5cbi8vdG9kYXkgYW5kIHRoaXMgd2VlayBidXR0b25zXG5jb25zdCB0b2RheVRhc2tzQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RheVwiKTtcbmNvbnN0IHRoaXNXZWVrVGFza3NCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRoaXMtd2Vla1wiKTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuY2xhc3MgRHluYW1pY0VsZW1lbnRzIHtcbiAgc3RhdGljIG5ld1Byb2plY3RBZGRlZChwcm9qZWN0VGl0bGUpIHtcbiAgICB0aGlzLnVwZGF0ZVRhc2tNb2RhbChwcm9qZWN0VGl0bGUpO1xuICAgIHRoaXMudXBkYXRlTGVmdE5hdigpO1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZVRhc2tNb2RhbChwcm9qZWN0VGl0bGUpIHtcbiAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3RUaXRsZTtcbiAgICBvcHRpb24uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgcHJvamVjdFRpdGxlLnRvTG93ZXJDYXNlKCkpO1xuICAgIHRhc2tBc3NpZ25Ub1Byb2plY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVMZWZ0TmF2KCkge1xuICAgIHRoaXMuZGVsZXRlQ2hpbGRyZW4obG93ZXJCdXR0b25zTWFpbkxlZnQpO1xuXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0c0NvdW50KCk7IGkrKykge1xuICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwicHJvamVjdHNcIik7XG4gICAgICBidG4uaW5uZXJIVE1MID0gYDxpbWcgc3JjPScuL2ltYWdlcy9mb3JtYXQtbGlzdC1jaGVja3MucG5nJyBhbHQ9J0ltYWdlIG9mIGNoZWNrbGlzdCc+JHtBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QXRJbmRleChcbiAgICAgICAgaVxuICAgICAgKS5nZXROYW1lKCl9YDtcbiAgICAgIGxvd2VyQnV0dG9uc01haW5MZWZ0LmFwcGVuZENoaWxkKGJ0bik7XG4gICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMucG9wdWxhdGVQcm9qZWN0RGV0YWlscyk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGRlbGV0ZUNoaWxkcmVuKHBhcmVudCkge1xuICAgIHdoaWxlIChwYXJlbnQubGFzdENoaWxkICE9PSBhZGRQcm9qZWN0QnV0dG9uKSB7XG4gICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQocGFyZW50Lmxhc3RDaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHBvcHVsYXRlUHJvamVjdERldGFpbHMoZXZlbnQpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhldmVudC50YXJnZXQuaW5uZXJUZXh0KTtcbiAgICAvL0NoZWNrIHRvIHNlZSBpZiBwcm9qZWN0IGNsaWNrZWQgaXMgZW1wdHkgYW5kIGlmIGl0IGlzIGJyaW5nIHVwIHRoZSBtb2RhbCxcbiAgICAvLyBpZiBpdCBpc24ndCBwb3B1bGF0ZSBtYWluIHJpZ2h0IHdpdGggdGhlIHByb2plY3QncyB0YXNrc1xuICAgIGlmIChcbiAgICAgIEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoZXZlbnQudGFyZ2V0LmlubmVyVGV4dCkuZ2V0VGFza3NDb3VudCgpID09PVxuICAgICAgICAwICYmXG4gICAgICBldmVudC50YXJnZXQuaW5uZXJUZXh0ICE9PSBcIkRlZmF1bHQgQ29udGFpbmVyXCJcbiAgICApIHtcbiAgICAgIGVtcHR5UHJvamVjdE1vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJlbXB0eS1wcm9qZWN0LW1vZGFsLXZpc2libGVcIik7XG4gICAgICBVSS50b2dnbGVCbHVyKCk7XG4gICAgICBkZWxldGVQcm9qZWN0QnV0dG9uLnNldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiLCBldmVudC50YXJnZXQuaW5uZXJUZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy9jbGVhciBtYWluLXJpZ2h0IGRpc3BsYXkgYmVmb3JlIHJlbmRlcmluZyB0aGUgdGFza3NcblxuICAgICAgd2hpbGUgKG1haW5SaWdodC5sYXN0Q2hpbGQpIHtcbiAgICAgICAgbWFpblJpZ2h0LnJlbW92ZUNoaWxkKG1haW5SaWdodC5sYXN0Q2hpbGQpO1xuICAgICAgfVxuXG4gICAgICAvL2dlbmVyYXRlIHRoZSBoZWFkZXIgYW5kIHN1bW1hcnkgd2l0aCBudW1iZXIgb2YgdGFza3NcbiAgICAgIGNvbnN0IGhlYWRlcjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgICBjb25zdCB0YXNrc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBjb25zdCB0YXNrc0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBjb25zdCB0YXNrc0hlYWRlcldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGRpdi50ZXh0Q29udGVudCA9IFwiVGFza3MgXCI7XG4gICAgICBjb25zdCBzcGFuTnVtYmVyT2ZUYXNrcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgY29uc3QgaW1nUmVmcmVzaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG5cbiAgICAgIGhlYWRlcjEuY2xhc3NMaXN0LmFkZChcInByb2plY3QtdGl0bGVcIik7XG4gICAgICBoZWFkZXIxLnRleHRDb250ZW50ID0gZXZlbnQudGFyZ2V0LmlubmVyVGV4dDtcblxuICAgICAgdGFza3NDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInRhc2tzLWNvbnRhaW5lclwiKTtcbiAgICAgIHRhc2tzSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrcy1oZWFkZXJcIik7XG4gICAgICB0YXNrc0hlYWRlcldyYXBwZXIuY2xhc3NMaXN0LmFkZChcInRhc2tzLWhlYWRlci13cmFwcGVyXCIpO1xuICAgICAgc3Bhbk51bWJlck9mVGFza3MuY2xhc3NMaXN0LmFkZChcIm51bWJlci1vZi10YXNrc1wiKTtcbiAgICAgIHNwYW5OdW1iZXJPZlRhc2tzLnRleHRDb250ZW50ID0gYCgke0FsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoXG4gICAgICAgIGV2ZW50LnRhcmdldC5pbm5lclRleHRcbiAgICAgICkuZ2V0VGFza3NDb3VudCgpfSlgO1xuXG4gICAgICBpbWdSZWZyZXNoLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcIi4vaW1hZ2VzL3JlZnJlc2gtY2lyY2xlLnN2Z1wiKTtcbiAgICAgIGltZ1JlZnJlc2guc2V0QXR0cmlidXRlKFwiYWx0XCIsIFwiSW1hZ2Ugb2YgcmVmcmVzaCBidXR0b25cIik7XG4gICAgICBpbWdSZWZyZXNoLnNldEF0dHJpYnV0ZShcImhlaWdodFwiLCBcIjI1cHhcIik7XG4gICAgICBpbWdSZWZyZXNoLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIER5bmFtaWNFbGVtZW50cy5wb3B1bGF0ZVByb2plY3REZXRhaWxzKGV2ZW50KTtcbiAgICAgIH0pO1xuXG4gICAgICBkaXYuYXBwZW5kQ2hpbGQoc3Bhbk51bWJlck9mVGFza3MpO1xuICAgICAgdGFza3NIZWFkZXJXcmFwcGVyLmFwcGVuZENoaWxkKGRpdik7XG4gICAgICB0YXNrc0hlYWRlcldyYXBwZXIuYXBwZW5kQ2hpbGQoaW1nUmVmcmVzaCk7XG4gICAgICB0YXNrc0hlYWRlci5hcHBlbmRDaGlsZCh0YXNrc0hlYWRlcldyYXBwZXIpO1xuICAgICAgdGFza3NDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza3NIZWFkZXIpO1xuXG4gICAgICBtYWluUmlnaHQuYXBwZW5kQ2hpbGQoaGVhZGVyMSk7XG4gICAgICBtYWluUmlnaHQuYXBwZW5kQ2hpbGQodGFza3NDb250YWluZXIpO1xuXG4gICAgICBmb3IgKFxuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGkgPFxuICAgICAgICBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKGV2ZW50LnRhcmdldC5pbm5lclRleHQpLmdldFRhc2tzQ291bnQoKTtcbiAgICAgICAgaSsrXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgcmVndWxhclRhc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICByZWd1bGFyVGFzay5jbGFzc0xpc3QuYWRkKFwicmVndWxhci10YXNrXCIpO1xuICAgICAgICByZWd1bGFyVGFzay5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgIEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoZXZlbnQudGFyZ2V0LmlubmVyVGV4dCkuZ2V0VGFza0J5SW5kZXgoaSlcbiAgICAgICAgICAgIC5wcmlvcml0eVxuICAgICAgICApO1xuICAgICAgICBjb25zdCB0b0RvTmFtZVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0b0RvTmFtZVdyYXBwZXIuY2xhc3NMaXN0LmFkZChcInRvZG8tbmFtZS13cmFwcGVyXCIpO1xuICAgICAgICBjb25zdCB0b0RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgY29uc3Qgc3BhblRhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG5cbiAgICAgICAgc3BhblRhc2tOYW1lLnRleHRDb250ZW50ID0gQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShcbiAgICAgICAgICBldmVudC50YXJnZXQuaW5uZXJUZXh0XG4gICAgICAgICkuZ2V0VGFza0J5SW5kZXgoaSkudGl0bGU7XG4gICAgICAgIHNwYW5UYXNrTmFtZS5jbGFzc0xpc3QuYWRkKFwidGFzay1uYW1lXCIpO1xuICAgICAgICB0b0RvLmNsYXNzTGlzdC5hZGQoXCJ0b2RvXCIpO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKGV2ZW50LnRhcmdldC5pbm5lclRleHQpLmdldFRhc2tCeUluZGV4KGkpXG4gICAgICAgICAgICAuaXNDb21wbGV0ZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgdG9Eby5jbGFzc0xpc3QuYWRkKFwiY29tcGxldGVkXCIpO1xuICAgICAgICAgIHNwYW5UYXNrTmFtZS5jbGFzc0xpc3QuYWRkKFwiY29tcGxldGVkXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9Eby5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgIHRvRG8uY2xhc3NMaXN0LnRvZ2dsZShcImNvbXBsZXRlZFwiKTtcbiAgICAgICAgICBzcGFuVGFza05hbWUuY2xhc3NMaXN0LnRvZ2dsZShcImNvbXBsZXRlZFwiKTtcbiAgICAgICAgICBsZXQgaXNUYXNrQ29tcGxldGVkID0gQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5pbm5lclRleHRcbiAgICAgICAgICApLmdldFRhc2tCeUluZGV4KGkpLmlzQ29tcGxldGVkO1xuICAgICAgICAgIGlmIChpc1Rhc2tDb21wbGV0ZWQpIHtcbiAgICAgICAgICAgIEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoZXZlbnQudGFyZ2V0LmlubmVyVGV4dCkuZ2V0VGFza0J5SW5kZXgoXG4gICAgICAgICAgICAgIGlcbiAgICAgICAgICAgICkuaXNDb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShldmVudC50YXJnZXQuaW5uZXJUZXh0KS5nZXRUYXNrQnlJbmRleChcbiAgICAgICAgICAgICAgaVxuICAgICAgICAgICAgKS5pc0NvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0b0RvTmFtZVdyYXBwZXIuYXBwZW5kQ2hpbGQodG9Ebyk7XG4gICAgICAgIHRvRG9OYW1lV3JhcHBlci5hcHBlbmRDaGlsZChzcGFuVGFza05hbWUpO1xuICAgICAgICByZWd1bGFyVGFzay5hcHBlbmRDaGlsZCh0b0RvTmFtZVdyYXBwZXIpO1xuICAgICAgICB0YXNrc0NvbnRhaW5lci5hcHBlbmQocmVndWxhclRhc2spO1xuXG4gICAgICAgIGNvbnN0IHRvZG9PcHRpb25zV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRvZG9PcHRpb25zV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwidG9kby1vcHRpb25zLXdyYXBwZXJcIik7XG4gICAgICAgIGNvbnN0IHRvZG9EZXRhaWxzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgdG9kb0RldGFpbHMuY2xhc3NMaXN0LmFkZChcInRvZG8tZGV0YWlsc1wiKTtcbiAgICAgICAgdG9kb0RldGFpbHMudGV4dENvbnRlbnQgPSBcIkRFVEFJTFNcIjtcblxuICAgICAgICB0b2RvRGV0YWlscy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgIHRhc2tEZXRhaWxzTW9kYWwuY2xhc3NMaXN0LmFkZChcInRhc2stZGV0YWlscy1tb2RhbC12aXNpYmxlXCIpO1xuICAgICAgICAgIHRhc2tEZXRhaWxzQ2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIHRhc2tEZXRhaWxzTW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcInRhc2stZGV0YWlscy1tb2RhbC12aXNpYmxlXCIpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGFza0RldGFpbHNJbmZvLnRleHRDb250ZW50ID0gQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5pbm5lclRleHRcbiAgICAgICAgICApLmdldFRhc2tCeUluZGV4KGkpLnRpdGxlO1xuXG4gICAgICAgICAgdGFza0RldGFpbHNEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoXG4gICAgICAgICAgICBldmVudC50YXJnZXQuaW5uZXJUZXh0XG4gICAgICAgICAgKS5nZXRUYXNrQnlJbmRleChpKS5kZXNjcmlwdGlvbjtcblxuICAgICAgICAgIHRhc2tEZXRhaWxzRHVlRGF0ZS50ZXh0Q29udGVudCA9IEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoXG4gICAgICAgICAgICBldmVudC50YXJnZXQuaW5uZXJUZXh0XG4gICAgICAgICAgKS5nZXRUYXNrQnlJbmRleChpKS5kdWVkYXRlO1xuXG4gICAgICAgICAgdGFza0RldGFpbHNQcmlvcml0eS50ZXh0Q29udGVudCA9IEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoXG4gICAgICAgICAgICBldmVudC50YXJnZXQuaW5uZXJUZXh0XG4gICAgICAgICAgKS5nZXRUYXNrQnlJbmRleChpKS5wcmlvcml0eTtcblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoZXZlbnQudGFyZ2V0LmlubmVyVGV4dCkuZ2V0VGFza0J5SW5kZXgoXG4gICAgICAgICAgICAgIGlcbiAgICAgICAgICAgICkuaXNDb21wbGV0ZWRcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRhc2tEZXRhaWxzQ29tcGxldGVkLnRleHRDb250ZW50ID0gXCJDb21wbGV0ZWRcIjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFza0RldGFpbHNDb21wbGV0ZWQudGV4dENvbnRlbnQgPSBcIk5PVCBDb21wbGV0ZWRcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRvZG9PcHRpb25zV3JhcHBlci5hcHBlbmRDaGlsZCh0b2RvRGV0YWlscyk7XG4gICAgICAgIGNvbnN0IHNwYW5EdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIHNwYW5EdWVEYXRlLmNsYXNzTGlzdC5hZGQoXCJkdWUtZGF0ZVwiKTtcbiAgICAgICAgc3BhbkR1ZURhdGUudGV4dENvbnRlbnQgPSBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKFxuICAgICAgICAgIGV2ZW50LnRhcmdldC5pbm5lclRleHRcbiAgICAgICAgKS5nZXRUYXNrQnlJbmRleChpKS5kdWVkYXRlO1xuICAgICAgICB0b2RvT3B0aW9uc1dyYXBwZXIuYXBwZW5kQ2hpbGQoc3BhbkR1ZURhdGUpO1xuICAgICAgICBjb25zdCBpbWdFZGl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgaW1nRWRpdC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCIuL2ltYWdlcy9wZW5jaWwtYm94LW91dGxpbmUuc3ZnXCIpO1xuICAgICAgICBpbWdFZGl0LnNldEF0dHJpYnV0ZShcImFsdFwiLCBcIkJ1dHRvbiB0byBlZGl0IHRoZSB0YXNrXCIpO1xuICAgICAgICBpbWdFZGl0LnNldEF0dHJpYnV0ZShcImhlaWdodFwiLCBcIjI1cHhcIik7XG4gICAgICAgIHRvZG9PcHRpb25zV3JhcHBlci5hcHBlbmRDaGlsZChpbWdFZGl0KTtcbiAgICAgICAgY29uc3QgaW1nRGVsZXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgaW1nRGVsZXRlLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcIi4vaW1hZ2VzL3RyYXNoLWNhbi1vdXRsaW5lLnN2Z1wiKTtcbiAgICAgICAgaW1nRGVsZXRlLnNldEF0dHJpYnV0ZShcImFsdFwiLCBcIkJ1dHRvbiB0byBkZWxldGUgdGhlIHRhc2tcIik7XG4gICAgICAgIGltZ0RlbGV0ZS5zZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiwgXCIyNXB4XCIpO1xuXG4gICAgICAgIGltZ0RlbGV0ZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgIEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoXG4gICAgICAgICAgICBldmVudC50YXJnZXQuaW5uZXJUZXh0XG4gICAgICAgICAgKS5kZWxldGVUYXNrQXRJbmRleChpKTtcblxuICAgICAgICAgIHdoaWxlIChtYWluUmlnaHQubGFzdENoaWxkKSB7XG4gICAgICAgICAgICBtYWluUmlnaHQucmVtb3ZlQ2hpbGQobWFpblJpZ2h0Lmxhc3RDaGlsZCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgRHluYW1pY0VsZW1lbnRzLnBvcHVsYXRlUHJvamVjdERldGFpbHMoZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgdG9kb09wdGlvbnNXcmFwcGVyLmFwcGVuZENoaWxkKGltZ0RlbGV0ZSk7XG4gICAgICAgIHJlZ3VsYXJUYXNrLmFwcGVuZENoaWxkKHRvZG9PcHRpb25zV3JhcHBlcik7XG5cbiAgICAgICAgLy9UTyBGSU5JU0ggYWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgZWFjaCB0YXNrJ3MgYnV0dG9uc1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBvcGVuVG9kYXlUaGlzV2Vla1Rhc2tzKGV2ZW50KSB7XG4gICAgLy8gY29uc29sZS5sb2coZXZlbnQudGFyZ2V0LmlubmVyVGV4dClcbiAgICBpZiAoZXZlbnQuY3VycmVudFRhcmdldC5pbm5lclRleHQuaW5jbHVkZXMoXCJUb2RheVwiKSkge1xuICAgICAgRHluYW1pY0VsZW1lbnRzLnBvcHVsYXRlVG9kYXlNYWluUmlnaHQoKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmN1cnJlbnRUYXJnZXQuaW5uZXJUZXh0LmluY2x1ZGVzKFwiVGhpcyB3ZWVrXCIpKSB7XG4gICAgICBEeW5hbWljRWxlbWVudHMucG9wdWxhdGVUaGlzV2Vla01haW5SaWdodCgpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBwb3B1bGF0ZVRvZGF5TWFpblJpZ2h0KCkge1xuICAgIGlmIChcbiAgICAgIHR5cGVvZiBBbGxQcm9qZWN0cy5nZXRFdmVyeVRvZGF5VGFza0Zyb21FdmVyeVByb2plY3QoKSA9PT0gXCJ1bmRlZmluZWRcIlxuICAgICkge1xuICAgICAgQWxlcnQuX2FsZXJ0KFwiRU5KT1khIE5PIFRBU0tTIEZPUiBUT0RBWSFcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vU3RhcnQgYnVpbGRpbmcgdGhlIHBhZ2Ugb24gTWFpbi1SaWdodCB3aXRoIHRvZGF5J3MgdGFza3NcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgcG9wdWxhdGVUaGlzV2Vla01haW5SaWdodCgpIHt9XG5cbiAgc3RhdGljIGRlbGV0ZVByb2plY3RGcm9tVGFza01vZGFsKCkge1xuICAgIC8vcXVlcnJ5IGFsbCB0aGUgb3B0aW9uLnZhbHVlcyBhbmQgY2hlY2sgdG8gc2VlIGlmIHRoZXkgZXhpc3QgaW4gQWxsUHJvamVjdHMgb3IgdGhlIHZhbHVlIGlzIGVxdWFsIHRvIGRlbGV0ZVByb2plY3RCdXR0b24uZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpLCBpZiB0aGUgb3B0aW9uIGlzbnQgdGhlcmUsIGRlbGV0ZSBpdFxuICAgIC8vIGRlbGV0ZVByb2plY3RCdXR0b24uZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpO1xuICAgIC8vIGNvbnNvbGUubG9nKGRlbGV0ZVByb2plY3RCdXR0b24uZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpKTtcbiAgICBsZXQgdmFsdWUgPSBkZWxldGVQcm9qZWN0QnV0dG9uLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKTtcbiAgICBjb25zdCB0b1JlbW92ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYHNlbGVjdCA+IFt2YWx1ZT1cIiR7dmFsdWV9XCJdYCk7XG4gICAgLy8gY29uc29sZS5sb2codG9SZW1vdmUpO1xuICAgIHRvUmVtb3ZlLnJlbW92ZSgpO1xuICAgIC8vIC5yZW1vdmUoKTtcbiAgfVxufVxuXG5jbGFzcyBBbGVydCB7XG4gIHN0YXRpYyBfYWxlcnQobXNnKSB7XG4gICAgYWxlcnQobXNnKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUkge1xuICBzdGF0aWMgaW5pdCgpIHtcbiAgICAvL3NldCB0aGUgbWluIGRhdGUgdG8gYmUgVE9EQVlcbiAgICB0aGlzLnNldE1pbkRhdGUoKTtcbiAgICB0aGlzLnVwZGF0ZVllYXJJbkZvb3RlcigpO1xuICAgIHRoaXMuaW5pdERlZmF1bHRDb250YWluZXIoKTtcbiAgICB0aGlzLmFkZExpc3RlbmVycygpO1xuICAgIC8vIHRoaXMuYWRkVGFzaygpO1xuICB9XG5cbiAgc3RhdGljIHNldE1pbkRhdGUoKSB7XG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IHllYXIgPSB0b2RheS5nZXRGdWxsWWVhcigpO1xuICAgIGNvbnN0IG1vbnRoID0gU3RyaW5nKHRvZGF5LmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gICAgY29uc3QgZGF5ID0gU3RyaW5nKHRvZGF5LmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICAgIGNvbnN0IG1pbkRhdGUgPSB5ZWFyICsgXCItXCIgKyBtb250aCArIFwiLVwiICsgZGF5O1xuICAgIHRhc2tEdWVEYXRlLm1pbiA9IG1pbkRhdGU7XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlWWVhckluRm9vdGVyKCkge1xuICAgIGZvb3RlclllYXIudGV4dENvbnRlbnQgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG4gIH1cblxuICBzdGF0aWMgdG9nZ2xlQmx1cigpIHtcbiAgICBjb250ZW50LmNsYXNzTGlzdC50b2dnbGUoXCJibHVyLWNvbnRlbnRcIik7XG4gIH1cblxuICBzdGF0aWMgaW5pdERlZmF1bHRDb250YWluZXIoKSB7XG4gICAgLy9jcmVhdGUgYW4gZW1wdHkgUHJvamVjdCBhbmQgYXBwZW5kIGl0IHRvIHRoZSBQcm9qZWN0c0xpc3RcbiAgICBBbGxQcm9qZWN0cy5hcHBlbmROZXdQcm9qZWN0KG5ldyBQcm9qZWN0KFwiRGVmYXVsdCBDb250YWluZXJcIikpO1xuICB9XG5cbiAgLy90b2RvIGdhdGhlciBhbGwgc3RhdGljIGxpc3RlbmVycyBpbiBvbmUgZnVuY3Rpb25cbiAgc3RhdGljIGFkZExpc3RlbmVycygpIHtcbiAgICAvLysgQWRkIFRhc2sgYnV0dG9uXG4gICAgYWRkVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vcGVuVGFza01vZGFsKTtcbiAgICB0YXNrTW9kYWxDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuY2xvc2VUYXNrTW9kYWwpO1xuICAgIHRhc2tNb2RhbFN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5zdWJtaXRUYXNrKTtcblxuICAgIC8vKyBBZGQgUHJvamVjdCBidXR0b25cbiAgICBhZGRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9wZW5Qcm9qZWN0TW9kYWwpO1xuICAgIHByb2plY3RNb2RhbENhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbG9zZVByb2plY3RNb2RhbCk7XG4gICAgcHJvamVjdE1vZGFsUHJvY2VlZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5zdWJtaXRQcm9qZWN0KTtcblxuICAgIC8vRW1wdHkgUHJvamVjdCBtb2RhbCBidXR0b25zXG4gICAgb2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuY2xvc2VFbXB0eVByb2plY3RNb2RhbCk7XG4gICAgZGVsZXRlUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5kZWxldGVFbXB0eVByb2plY3QpO1xuXG4gICAgLy9EZWZhdWx0IENvbnRhaW5lciBidXR0b25cbiAgICBkZWZhdWx0Q29udGFpbmVyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9wZW5EZWZhdWx0Q29udGFpbmVyKTtcblxuICAgIC8vVG9kYXkgYW5kIFRoaXMgV2VlayBidXR0b25zXG4gICAgdG9kYXlUYXNrc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgRHluYW1pY0VsZW1lbnRzLm9wZW5Ub2RheVRoaXNXZWVrVGFza3MpO1xuICB9XG4gIC8vRXZlbnQgbGlzdGVuZXJzIGZvciB0aGUgaG9tZXBhZ2UgYW5kIGFsbCBvZiB0aGUgbW9kYWxzXG5cbiAgc3RhdGljIGNsb3NlVGFza01vZGFsKCkge1xuICAgIHRhc2tNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiYWRkLXRhc2stbW9kYWwtdmlzaWJsZVwiKTtcbiAgICBVSS50b2dnbGVCbHVyKCk7XG4gIH1cblxuICBzdGF0aWMgb3BlblRhc2tNb2RhbCgpIHtcbiAgICB0YXNrTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImFkZC10YXNrLW1vZGFsLXZpc2libGVcIik7XG4gICAgLy9jbGVhciBmaXJzdCB0d28gZmllbGRzIGZyb20gcHJldmlvdXNseSBhZGRlZCB0YXNrXG4gICAgdGFza1RpdGxlLnZhbHVlID0gXCJcIjtcbiAgICB0YXNrRGVzY3JpcHRpb24udmFsdWUgPSBcIlwiO1xuICAgIFVJLnRvZ2dsZUJsdXIoKTtcbiAgICAvLyBjb25zb2xlLnRhYmxlKEFsbFByb2plY3RzLmdldFByb2plY3RzKCkpO1xuICB9XG5cbiAgc3RhdGljIHN1Ym1pdFRhc2soKSB7XG4gICAgbGV0IHRhc2tFeGlzdHMgPSBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKFxuICAgICAgdGFza0Fzc2lnblRvUHJvamVjdC52YWx1ZVxuICAgICkudGFza0FscmVhZHlFeGlzdHModGFza1RpdGxlLnZhbHVlKTtcblxuICAgIGlmICh0YXNrRHVlRGF0ZS52YWx1ZSAmJiB0YXNrVGl0bGUudmFsdWUgJiYgIXRhc2tFeGlzdHMpIHtcbiAgICAgIC8vICAgY29uc29sZS5sb2codGFza1ByaW9yaXR5LnZhbHVlKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRhc2tBc3NpZ25Ub1Byb2plY3QudmFsdWUpO1xuICAgICAgLy8gICBjb25zb2xlLmxvZyh0YXNrRGVzY3JpcHRpb24udmFsdWUpO1xuXG4gICAgICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2soXG4gICAgICAgIHRhc2tUaXRsZS52YWx1ZSxcbiAgICAgICAgdGFza1ByaW9yaXR5LnZhbHVlLFxuICAgICAgICB0YXNrRGVzY3JpcHRpb24udmFsdWUsXG4gICAgICAgIHRhc2tEdWVEYXRlLnZhbHVlLFxuICAgICAgICB0YXNrQXNzaWduVG9Qcm9qZWN0LnZhbHVlXG4gICAgICApO1xuICAgICAgQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZSh0YXNrQXNzaWduVG9Qcm9qZWN0LnZhbHVlKS5hZGROZXdUYXNrKFxuICAgICAgICBuZXdUYXNrXG4gICAgICApO1xuICAgICAgVUkuY2xvc2VUYXNrTW9kYWwoKTtcbiAgICAgIC8vICAgY29uc29sZS5sb2codGFza0Fzc2lnblRvUHJvamVjdC52YWx1ZSk7XG4gICAgICAvLyAgICAgY29uc29sZS50YWJsZShcbiAgICAgIC8vICAgICAgIEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUodGFza0Fzc2lnblRvUHJvamVjdC52YWx1ZSkuZ2V0VGFza3MoKVxuICAgICAgLy8gICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIEFsZXJ0Ll9hbGVydChcbiAgICAgICAgXCJUaXRsZSBhbmQgRHVlIERhdGUgYXJlIG1hbmRhdG9yeSwgYW5kIG9ubHkgb25lIHVuaXF1ZSB0YXNrJ3MgbmFtZXNcIlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgb3BlblByb2plY3RNb2RhbCgpIHtcbiAgICBwcm9qZWN0VGl0bGUudmFsdWUgPSBcIlwiO1xuICAgIHByb2plY3RNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiYWRkLXByb2plY3QtbW9kYWwtdmlzaWJsZVwiKTtcbiAgICBVSS50b2dnbGVCbHVyKCk7XG4gIH1cblxuICBzdGF0aWMgY2xvc2VQcm9qZWN0TW9kYWwoKSB7XG4gICAgcHJvamVjdE1vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJhZGQtcHJvamVjdC1tb2RhbC12aXNpYmxlXCIpO1xuICAgIFVJLnRvZ2dsZUJsdXIoKTtcbiAgfVxuXG4gIHN0YXRpYyBzdWJtaXRQcm9qZWN0KCkge1xuICAgIGlmIChwcm9qZWN0VGl0bGUudmFsdWUpIHtcbiAgICAgIEFsbFByb2plY3RzLmFwcGVuZE5ld1Byb2plY3QobmV3IFByb2plY3QocHJvamVjdFRpdGxlLnZhbHVlKSk7XG4gICAgICBVSS5jbG9zZVByb2plY3RNb2RhbCgpO1xuICAgICAgRHluYW1pY0VsZW1lbnRzLm5ld1Byb2plY3RBZGRlZChwcm9qZWN0VGl0bGUudmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBBbGVydC5fYWxlcnQoXCJUaXRsZSBjYW5ub3QgYmUgZW1wdHlcIik7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGNsb3NlRW1wdHlQcm9qZWN0TW9kYWwoKSB7XG4gICAgZW1wdHlQcm9qZWN0TW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImVtcHR5LXByb2plY3QtbW9kYWwtdmlzaWJsZVwiKTtcbiAgICBVSS50b2dnbGVCbHVyKCk7XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlRW1wdHlQcm9qZWN0KCkge1xuICAgIGlmIChcbiAgICAgIGRlbGV0ZVByb2plY3RCdXR0b24uZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpICE9PSBcIkRlZmF1bHQgQ29udGFpbmVyXCJcbiAgICApIHtcbiAgICAgIEFsbFByb2plY3RzLmRlbGV0ZVByb2plY3QoXG4gICAgICAgIGRlbGV0ZVByb2plY3RCdXR0b24uZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpXG4gICAgICApO1xuICAgICAgRHluYW1pY0VsZW1lbnRzLnVwZGF0ZUxlZnROYXYoKTtcbiAgICAgIER5bmFtaWNFbGVtZW50cy5kZWxldGVQcm9qZWN0RnJvbVRhc2tNb2RhbCgpO1xuICAgICAgVUkuY2xvc2VFbXB0eVByb2plY3RNb2RhbCgpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBvcGVuRGVmYXVsdENvbnRhaW5lcihldmVudCkge1xuICAgIER5bmFtaWNFbGVtZW50cy5wb3B1bGF0ZVByb2plY3REZXRhaWxzKGV2ZW50KTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMudGFza3MgPSBbXTtcbiAgfVxuXG4gIC8vIGdldCBuYW1lKCkge1xuICAvLyAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAvLyB9XG5cbiAgLy8gc2V0IG5hbWUodmFsdWUpIHtcbiAgLy8gICBpZiAodmFsdWUubGVuZ3RoIDwgMSkge1xuICAvLyAgICAgYWxlcnQoXCJQcm9qZWN0J3MgbmFtZSBjYW5ub3QgYmUgZW1wdHkuXCIpO1xuICAvLyAgICAgcmV0dXJuO1xuICAvLyAgIH1cbiAgLy8gICB0aGlzLl9uYW1lID0gdmFsdWU7XG4gIC8vIH1cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgc2V0TmFtZShuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfVxuXG4gIGdldFRhc2tCeUluZGV4KGluZGV4KSB7XG4gICAgcmV0dXJuIHRoaXMudGFza3NbaW5kZXhdO1xuICB9XG5cbiAgZGVsZXRlVGFza0F0SW5kZXgoaW5kZXgpIHtcbiAgICB0aGlzLnRhc2tzLnNwbGljZShpbmRleCwgMSk7XG4gIH1cblxuICBnZXRUYXNrcygpIHtcbiAgICByZXR1cm4gdGhpcy50YXNrcztcbiAgfVxuXG4gIGdldFRhc2tzQ291bnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFza3MubGVuZ3RoO1xuICB9XG5cbiAgYWRkTmV3VGFzayh0YXNrKSB7XG4gICAgdGhpcy50YXNrcy5wdXNoKHRhc2spO1xuICB9XG5cbiAgdGFza0FscmVhZHlFeGlzdHModGFza05hbWUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudGFza3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLnRhc2tzW2ldLnRpdGxlID09PSB0YXNrTmFtZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0VG9kYXlUYXNrcygpIHtcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgdG9kYXlTdHJpbmcgPSB0b2RheS50b0lTT1N0cmluZygpLnNsaWNlKDAsIDEwKTtcblxuICAgIGNvbnN0IGFsbFRvZGF5VGFza3MgPSB0aGlzLnRhc2tzLmZpbHRlcihcbiAgICAgICh0YXNrKSA9PiB0YXNrLmR1ZWRhdGUgPT09IHRvZGF5U3RyaW5nXG4gICAgKTtcblxuICAgIGlmIChhbGxUb2RheVRhc2tzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBhbGxUb2RheVRhc2tzO1xuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWxsUHJvamVjdHMge1xuICBzdGF0aWMgcHJvamVjdHMgPSBbXTtcblxuICBzdGF0aWMgZ2V0UHJvamVjdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdHM7XG4gIH1cblxuICBzdGF0aWMgZ2V0UHJvamVjdHNDb3VudCgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5sZW5ndGg7XG4gIH1cblxuICBzdGF0aWMgZ2V0UHJvamVjdEF0SW5kZXgoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPCB0aGlzLnByb2plY3RzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvamVjdHNbaW5kZXhdO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRQcm9qZWN0QnlOYW1lKHByb2plY3ROYW1lKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5wcm9qZWN0c1tpXS5uYW1lID09PSBwcm9qZWN0TmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0c1tpXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYXBwZW5kTmV3UHJvamVjdChQcm9qZWN0KSB7XG4gICAgaWYgKFByb2plY3QubmFtZSkge1xuICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKFByb2plY3QpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVQcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmdldFByb2plY3RzQ291bnQoKTsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5wcm9qZWN0c1tpXS5uYW1lID09PSBwcm9qZWN0TmFtZSkge1xuICAgICAgICB0aGlzLnByb2plY3RzLnNwbGljZShpLCAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0RXZlcnlUb2RheVRhc2tGcm9tRXZlcnlQcm9qZWN0KCkge1xuICAgIGxldCBjb21iaW5lZFRvZGF5VGFza3MgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gY29uc29sZS5sb2codHlwZW9mIHRoaXMucHJvamVjdHNbaV0uZ2V0VG9kYXlUYXNrcygpKVxuICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb2plY3RzW2ldLmdldFRvZGF5VGFza3MoKSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBjb21iaW5lZFRvZGF5VGFza3MgPSBjb21iaW5lZFRvZGF5VGFza3MuY29uY2F0KFxuICAgICAgICAgIHRoaXMucHJvamVjdHNbaV0uZ2V0VG9kYXlUYXNrcygpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjb21iaW5lZFRvZGF5VGFza3MubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIGNvbWJpbmVkVG9kYXlUYXNrcztcbiAgICB9XG5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIHtcbiAgY29uc3RydWN0b3IobmFtZSwgcHJpbywgZGVzYywgZHVlZGF0ZSwgcHJvamVjdE5hbWUpIHtcbiAgICB0aGlzLnRpdGxlID0gbmFtZTtcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpbztcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzYztcbiAgICB0aGlzLmR1ZWRhdGUgPSBkdWVkYXRlO1xuICAgIHRoaXMuaXNDb21wbGV0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmJlbG9uZ3NUb1Byb2plY3QgPSBwcm9qZWN0TmFtZTtcbiAgfVxuXG4gIC8vIGdldCBuYW1lKCkge1xuICAvLyAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAvLyB9XG5cbiAgLy8gc2V0IG5hbWUodmFsdWUpIHtcbiAgLy8gICBpZiAodmFsdWUubGVuZ3RoIDwgMSkge1xuICAvLyAgICAgYWxlcnQoXCJUYXNrJ3MgbmFtZSBjYW5ub3QgYmUgZW1wdHkuXCIpO1xuICAvLyAgICAgcmV0dXJuO1xuICAvLyAgIH1cbiAgLy8gICB0aGlzLl9uYW1lID0gdmFsdWU7XG4gIC8vIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdFwiO1xuaW1wb3J0IEFsbFByb2plY3RzIGZyb20gXCIuL3Byb2plY3RzLWxpc3RcIjtcbmltcG9ydCBUYXNrIGZyb20gXCIuL3Rhc2tcIjtcbmltcG9ydCBVSSBmcm9tIFwiLi9kb21cIjtcblxuVUkuaW5pdCgpO1xuXG4vLyBhZGRQcm9qZWN0KEFsbFByb2plY3RzKTtcbi8vIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9vdGVyXCIpO1xuXG4vLyBmb290ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbi8vICAgICBjb25zdCBzb21lVGFzayA9IG5ldyBUYXNrKFwiUHJvYmFcIiwgXCJsb3dcIiwgXCJTb21lIHN0dXBpZCBzaGl0XCIsIFwiMzAuMTEuMjAyMlwiKTtcbi8vICAgICBjb25zdCBwcm9qID0gbmV3IFByb2plY3QoXCJMdWRuaWNoa2FcIik7XG4vLyAgICAgcHJvai5hZGROZXdUYXNrKHNvbWVUYXNrKTtcbi8vICAgICBjb25zb2xlLmxvZyhwcm9qLmdldFRhc2tzKCkpO1xuLy8gfSlcblxuXG5cblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=