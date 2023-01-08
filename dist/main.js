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
    if (taskDueDate.value && taskTitle.value) {
      //   console.log(taskPriority.value);
      //   console.log(taskAssignToProject.value);
      //   console.log(taskDescription.value);

      const newTask = new _task__WEBPACK_IMPORTED_MODULE_2__["default"](
        taskTitle.value,
        taskPriority.value,
        taskDescription.value,
        taskDueDate.value
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
  constructor(name, prio, desc, duedate) {
    this.title = name;
    this.priority = prio;
    this.description = desc;
    this.duedate = duedate;
    this.isCompleted = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDekRlO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLDBCQUEwQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsNkJBQTZCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxvQkFBb0IsMEJBQTBCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDeERlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNwQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05nQztBQUNVO0FBQ2hCO0FBQ0g7O0FBRXZCLGlEQUFPOztBQUVQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0cy1saXN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0XCI7XG5pbXBvcnQgQWxsUHJvamVjdHMgZnJvbSBcIi4vcHJvamVjdHMtbGlzdFwiO1xuaW1wb3J0IFRhc2sgZnJvbSBcIi4vdGFza1wiO1xuXG4vL3F1ZXJ5IGFsbCB0aGUgbW9kYWwgZWxlbWVudHNcbmNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRlbnRcIik7XG5jb25zdCBsb3dlckJ1dHRvbnNNYWluTGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG93ZXItYnV0dG9uc1wiKTtcbmNvbnN0IG1haW5SaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1yaWdodFwiKTtcblxuLy9uZXcgcHJvamVjdCBtb2RhbFxuY29uc3QgcHJvamVjdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtcHJvamVjdC1tb2RhbFwiKTtcbmNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC10aXRsZS1mb3JtXCIpO1xuY29uc3QgcHJvamVjdE1vZGFsQ2FuY2VsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgXCIuY2FuY2VsLXByb2plY3QtY3JlYXRpb25cIlxuKTtcbmNvbnN0IHByb2plY3RNb2RhbFByb2NlZWRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICBcIi5wcm9jZWVkLXByb2plY3QtY3JlYXRpb25cIlxuKTtcblxuLy90YXNrIGNyZWF0aW9uIG1vZGFsXG5jb25zdCB0YXNrTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrLW1vZGFsXCIpO1xuY29uc3QgdGFza1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLXRpdGxlLWZvcm1cIik7XG5jb25zdCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stZGVzY3JpcHRpb25cIik7XG5jb25zdCB0YXNrRHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kdWUtZGF0ZVwiKTtcbmNvbnN0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjUHJpb3JpdHlcIik7XG5jb25zdCB0YXNrQXNzaWduVG9Qcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LXRvLWFkZC10b1wiKTtcbmNvbnN0IHRhc2tNb2RhbENhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gIFwiLmFkZC10YXNrLW1vZGFsLWJ1dHRvbnMtY2FuY2VsXCJcbik7XG5jb25zdCB0YXNrTW9kYWxTdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICBcIi5hZGQtdGFzay1tb2RhbC1idXR0b25zLWFkZFwiXG4pO1xuXG4vL3Rhc2sgZGV0YWlscyBtb2RhbFxuY29uc3QgdGFza0RldGFpbHNNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1kZXRhaWxzLW1vZGFsXCIpO1xuY29uc3QgdGFza0RldGFpbHNDbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2xvc2UtdGFzay1kZXRhaWxzXCIpO1xuY29uc3QgdGFza0RldGFpbHNJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWRldGFpbHMtaW5mb1wiKTtcbmNvbnN0IHRhc2tEZXRhaWxzRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICBcIi50YXNrLWRldGFpbHMtZGVzY3JpcHRpb25cIlxuKTtcbmNvbnN0IHRhc2tEZXRhaWxzRHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1kZXRhaWxzLWR1ZWRhdGVcIik7XG5jb25zdCB0YXNrRGV0YWlsc1ByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWRldGFpbHMtcHJpb3JpdHlcIik7XG5jb25zdCB0YXNrRGV0YWlsc0NvbXBsZXRlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1kZXRhaWxzLXByb2plY3RcIik7XG5cbi8vbGVmdCBuYXYgYmFyIHN0YXRpYyBidXR0b25zXG5cbmNvbnN0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrXCIpO1xuY29uc3QgYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXByb2plY3RcIik7XG5jb25zdCBkZWZhdWx0Q29udGFpbmVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZWZhdWx0LXByb2plY3RcIik7XG5cbi8vZW1wdHkgcHJvamVjdCBtb2RhbFxuY29uc3Qgb2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm9rXCIpO1xuY29uc3QgZGVsZXRlUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b24uZGVsZXRlLXByb2plY3RcIik7XG5jb25zdCBlbXB0eVByb2plY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZW1wdHktcHJvamVjdC1tb2RhbFwiKTtcblxuLy95ZWFyIGluIGZvb3RlclxuY29uc3QgZm9vdGVyWWVhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9vdGVyIHNwYW5cIik7XG5cbi8vdG9kYXkgYW5kIHRoaXMgd2VlayBidXR0b25zXG5jb25zdCB0b2RheVRhc2tzQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RheVwiKTtcbmNvbnN0IHRoaXNXZWVrVGFza3NCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRoaXMtd2Vla1wiKTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuY2xhc3MgRHluYW1pY0VsZW1lbnRzIHtcbiAgc3RhdGljIG5ld1Byb2plY3RBZGRlZChwcm9qZWN0VGl0bGUpIHtcbiAgICB0aGlzLnVwZGF0ZVRhc2tNb2RhbChwcm9qZWN0VGl0bGUpO1xuICAgIHRoaXMudXBkYXRlTGVmdE5hdigpO1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZVRhc2tNb2RhbChwcm9qZWN0VGl0bGUpIHtcbiAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3RUaXRsZTtcbiAgICBvcHRpb24uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgcHJvamVjdFRpdGxlLnRvTG93ZXJDYXNlKCkpO1xuICAgIHRhc2tBc3NpZ25Ub1Byb2plY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVMZWZ0TmF2KCkge1xuICAgIHRoaXMuZGVsZXRlQ2hpbGRyZW4obG93ZXJCdXR0b25zTWFpbkxlZnQpO1xuXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0c0NvdW50KCk7IGkrKykge1xuICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwicHJvamVjdHNcIik7XG4gICAgICBidG4uaW5uZXJIVE1MID0gYDxpbWcgc3JjPScuL2ltYWdlcy9mb3JtYXQtbGlzdC1jaGVja3MucG5nJyBhbHQ9J0ltYWdlIG9mIGNoZWNrbGlzdCc+JHtBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QXRJbmRleChcbiAgICAgICAgaVxuICAgICAgKS5nZXROYW1lKCl9YDtcbiAgICAgIGxvd2VyQnV0dG9uc01haW5MZWZ0LmFwcGVuZENoaWxkKGJ0bik7XG4gICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMucG9wdWxhdGVQcm9qZWN0RGV0YWlscyk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGRlbGV0ZUNoaWxkcmVuKHBhcmVudCkge1xuICAgIHdoaWxlIChwYXJlbnQubGFzdENoaWxkICE9PSBhZGRQcm9qZWN0QnV0dG9uKSB7XG4gICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQocGFyZW50Lmxhc3RDaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHBvcHVsYXRlUHJvamVjdERldGFpbHMoZXZlbnQpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhldmVudC50YXJnZXQuaW5uZXJUZXh0KTtcbiAgICAvL0NoZWNrIHRvIHNlZSBpZiBwcm9qZWN0IGNsaWNrZWQgaXMgZW1wdHkgYW5kIGlmIGl0IGlzIGJyaW5nIHVwIHRoZSBtb2RhbCxcbiAgICAvLyBpZiBpdCBpc24ndCBwb3B1bGF0ZSBtYWluIHJpZ2h0IHdpdGggdGhlIHByb2plY3QncyB0YXNrc1xuICAgIGlmIChcbiAgICAgIEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoZXZlbnQudGFyZ2V0LmlubmVyVGV4dCkuZ2V0VGFza3NDb3VudCgpID09PVxuICAgICAgICAwICYmXG4gICAgICBldmVudC50YXJnZXQuaW5uZXJUZXh0ICE9PSBcIkRlZmF1bHQgQ29udGFpbmVyXCJcbiAgICApIHtcbiAgICAgIGVtcHR5UHJvamVjdE1vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJlbXB0eS1wcm9qZWN0LW1vZGFsLXZpc2libGVcIik7XG4gICAgICBVSS50b2dnbGVCbHVyKCk7XG4gICAgICBkZWxldGVQcm9qZWN0QnV0dG9uLnNldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiLCBldmVudC50YXJnZXQuaW5uZXJUZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy9jbGVhciBtYWluLXJpZ2h0IGRpc3BsYXkgYmVmb3JlIHJlbmRlcmluZyB0aGUgdGFza3NcblxuICAgICAgd2hpbGUgKG1haW5SaWdodC5sYXN0Q2hpbGQpIHtcbiAgICAgICAgbWFpblJpZ2h0LnJlbW92ZUNoaWxkKG1haW5SaWdodC5sYXN0Q2hpbGQpO1xuICAgICAgfVxuXG4gICAgICAvL2dlbmVyYXRlIHRoZSBoZWFkZXIgYW5kIHN1bW1hcnkgd2l0aCBudW1iZXIgb2YgdGFza3NcbiAgICAgIGNvbnN0IGhlYWRlcjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgICBjb25zdCB0YXNrc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBjb25zdCB0YXNrc0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBjb25zdCB0YXNrc0hlYWRlcldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGRpdi50ZXh0Q29udGVudCA9IFwiVGFza3MgXCI7XG4gICAgICBjb25zdCBzcGFuTnVtYmVyT2ZUYXNrcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgY29uc3QgaW1nUmVmcmVzaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG5cbiAgICAgIGhlYWRlcjEuY2xhc3NMaXN0LmFkZChcInByb2plY3QtdGl0bGVcIik7XG4gICAgICBoZWFkZXIxLnRleHRDb250ZW50ID0gZXZlbnQudGFyZ2V0LmlubmVyVGV4dDtcblxuICAgICAgdGFza3NDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInRhc2tzLWNvbnRhaW5lclwiKTtcbiAgICAgIHRhc2tzSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrcy1oZWFkZXJcIik7XG4gICAgICB0YXNrc0hlYWRlcldyYXBwZXIuY2xhc3NMaXN0LmFkZChcInRhc2tzLWhlYWRlci13cmFwcGVyXCIpO1xuICAgICAgc3Bhbk51bWJlck9mVGFza3MuY2xhc3NMaXN0LmFkZChcIm51bWJlci1vZi10YXNrc1wiKTtcbiAgICAgIHNwYW5OdW1iZXJPZlRhc2tzLnRleHRDb250ZW50ID0gYCgke0FsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoXG4gICAgICAgIGV2ZW50LnRhcmdldC5pbm5lclRleHRcbiAgICAgICkuZ2V0VGFza3NDb3VudCgpfSlgO1xuXG4gICAgICBpbWdSZWZyZXNoLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcIi4vaW1hZ2VzL3JlZnJlc2gtY2lyY2xlLnN2Z1wiKTtcbiAgICAgIGltZ1JlZnJlc2guc2V0QXR0cmlidXRlKFwiYWx0XCIsIFwiSW1hZ2Ugb2YgcmVmcmVzaCBidXR0b25cIik7XG4gICAgICBpbWdSZWZyZXNoLnNldEF0dHJpYnV0ZShcImhlaWdodFwiLCBcIjI1cHhcIik7XG4gICAgICBpbWdSZWZyZXNoLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIER5bmFtaWNFbGVtZW50cy5wb3B1bGF0ZVByb2plY3REZXRhaWxzKGV2ZW50KTtcbiAgICAgIH0pO1xuXG4gICAgICBkaXYuYXBwZW5kQ2hpbGQoc3Bhbk51bWJlck9mVGFza3MpO1xuICAgICAgdGFza3NIZWFkZXJXcmFwcGVyLmFwcGVuZENoaWxkKGRpdik7XG4gICAgICB0YXNrc0hlYWRlcldyYXBwZXIuYXBwZW5kQ2hpbGQoaW1nUmVmcmVzaCk7XG4gICAgICB0YXNrc0hlYWRlci5hcHBlbmRDaGlsZCh0YXNrc0hlYWRlcldyYXBwZXIpO1xuICAgICAgdGFza3NDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza3NIZWFkZXIpO1xuXG4gICAgICBtYWluUmlnaHQuYXBwZW5kQ2hpbGQoaGVhZGVyMSk7XG4gICAgICBtYWluUmlnaHQuYXBwZW5kQ2hpbGQodGFza3NDb250YWluZXIpO1xuXG4gICAgICBmb3IgKFxuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGkgPFxuICAgICAgICBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKGV2ZW50LnRhcmdldC5pbm5lclRleHQpLmdldFRhc2tzQ291bnQoKTtcbiAgICAgICAgaSsrXG4gICAgICApIHtcbiAgXG4gICAgICAgIGNvbnN0IHJlZ3VsYXJUYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcmVndWxhclRhc2suY2xhc3NMaXN0LmFkZChcInJlZ3VsYXItdGFza1wiKTtcbiAgICAgICAgcmVndWxhclRhc2suY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKGV2ZW50LnRhcmdldC5pbm5lclRleHQpLmdldFRhc2tCeUluZGV4KGkpXG4gICAgICAgICAgICAucHJpb3JpdHlcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgdG9Eb05hbWVXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdG9Eb05hbWVXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLW5hbWUtd3JhcHBlclwiKTtcbiAgICAgICAgY29uc3QgdG9EbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNvbnN0IHNwYW5UYXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXG4gICAgICAgIHNwYW5UYXNrTmFtZS50ZXh0Q29udGVudCA9IEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoXG4gICAgICAgICAgZXZlbnQudGFyZ2V0LmlubmVyVGV4dFxuICAgICAgICApLmdldFRhc2tCeUluZGV4KGkpLnRpdGxlO1xuICAgICAgICBzcGFuVGFza05hbWUuY2xhc3NMaXN0LmFkZChcInRhc2stbmFtZVwiKTtcbiAgICAgICAgdG9Eby5jbGFzc0xpc3QuYWRkKFwidG9kb1wiKTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShldmVudC50YXJnZXQuaW5uZXJUZXh0KS5nZXRUYXNrQnlJbmRleChpKVxuICAgICAgICAgICAgLmlzQ29tcGxldGVkXG4gICAgICAgICkge1xuICAgICAgICAgIHRvRG8uY2xhc3NMaXN0LmFkZChcImNvbXBsZXRlZFwiKTtcbiAgICAgICAgICBzcGFuVGFza05hbWUuY2xhc3NMaXN0LmFkZChcImNvbXBsZXRlZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRvRG8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICB0b0RvLmNsYXNzTGlzdC50b2dnbGUoXCJjb21wbGV0ZWRcIik7XG4gICAgICAgICAgc3BhblRhc2tOYW1lLmNsYXNzTGlzdC50b2dnbGUoXCJjb21wbGV0ZWRcIik7XG4gICAgICAgICAgbGV0IGlzVGFza0NvbXBsZXRlZCA9IEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoXG4gICAgICAgICAgICBldmVudC50YXJnZXQuaW5uZXJUZXh0XG4gICAgICAgICAgKS5nZXRUYXNrQnlJbmRleChpKS5pc0NvbXBsZXRlZDtcbiAgICAgICAgICBpZiAoaXNUYXNrQ29tcGxldGVkKSB7XG4gICAgICAgICAgICBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKGV2ZW50LnRhcmdldC5pbm5lclRleHQpLmdldFRhc2tCeUluZGV4KFxuICAgICAgICAgICAgICBpXG4gICAgICAgICAgICApLmlzQ29tcGxldGVkID0gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoZXZlbnQudGFyZ2V0LmlubmVyVGV4dCkuZ2V0VGFza0J5SW5kZXgoXG4gICAgICAgICAgICAgIGlcbiAgICAgICAgICAgICkuaXNDb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdG9Eb05hbWVXcmFwcGVyLmFwcGVuZENoaWxkKHRvRG8pO1xuICAgICAgICB0b0RvTmFtZVdyYXBwZXIuYXBwZW5kQ2hpbGQoc3BhblRhc2tOYW1lKTtcbiAgICAgICAgcmVndWxhclRhc2suYXBwZW5kQ2hpbGQodG9Eb05hbWVXcmFwcGVyKTtcbiAgICAgICAgdGFza3NDb250YWluZXIuYXBwZW5kKHJlZ3VsYXJUYXNrKTtcblxuICAgICAgICBjb25zdCB0b2RvT3B0aW9uc1dyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0b2RvT3B0aW9uc1dyYXBwZXIuY2xhc3NMaXN0LmFkZChcInRvZG8tb3B0aW9ucy13cmFwcGVyXCIpO1xuICAgICAgICBjb25zdCB0b2RvRGV0YWlscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIHRvZG9EZXRhaWxzLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWRldGFpbHNcIik7XG4gICAgICAgIHRvZG9EZXRhaWxzLnRleHRDb250ZW50ID0gXCJERVRBSUxTXCI7XG5cbiAgICAgICAgdG9kb0RldGFpbHMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICB0YXNrRGV0YWlsc01vZGFsLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWRldGFpbHMtbW9kYWwtdmlzaWJsZVwiKTtcbiAgICAgICAgICB0YXNrRGV0YWlsc0Nsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICB0YXNrRGV0YWlsc01vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJ0YXNrLWRldGFpbHMtbW9kYWwtdmlzaWJsZVwiKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRhc2tEZXRhaWxzSW5mby50ZXh0Q29udGVudCA9IEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoXG4gICAgICAgICAgICBldmVudC50YXJnZXQuaW5uZXJUZXh0XG4gICAgICAgICAgKS5nZXRUYXNrQnlJbmRleChpKS50aXRsZTtcblxuICAgICAgICAgIHRhc2tEZXRhaWxzRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKFxuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmlubmVyVGV4dFxuICAgICAgICAgICkuZ2V0VGFza0J5SW5kZXgoaSkuZGVzY3JpcHRpb247XG5cbiAgICAgICAgICB0YXNrRGV0YWlsc0R1ZURhdGUudGV4dENvbnRlbnQgPSBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKFxuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmlubmVyVGV4dFxuICAgICAgICAgICkuZ2V0VGFza0J5SW5kZXgoaSkuZHVlZGF0ZTtcblxuICAgICAgICAgIHRhc2tEZXRhaWxzUHJpb3JpdHkudGV4dENvbnRlbnQgPSBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKFxuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmlubmVyVGV4dFxuICAgICAgICAgICkuZ2V0VGFza0J5SW5kZXgoaSkucHJpb3JpdHk7XG5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKGV2ZW50LnRhcmdldC5pbm5lclRleHQpLmdldFRhc2tCeUluZGV4KFxuICAgICAgICAgICAgICBpXG4gICAgICAgICAgICApLmlzQ29tcGxldGVkXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0YXNrRGV0YWlsc0NvbXBsZXRlZC50ZXh0Q29udGVudCA9IFwiQ29tcGxldGVkXCI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhc2tEZXRhaWxzQ29tcGxldGVkLnRleHRDb250ZW50ID0gXCJOT1QgQ29tcGxldGVkXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0b2RvT3B0aW9uc1dyYXBwZXIuYXBwZW5kQ2hpbGQodG9kb0RldGFpbHMpO1xuICAgICAgICBjb25zdCBzcGFuRHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBzcGFuRHVlRGF0ZS5jbGFzc0xpc3QuYWRkKFwiZHVlLWRhdGVcIik7XG4gICAgICAgIHNwYW5EdWVEYXRlLnRleHRDb250ZW50ID0gQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShcbiAgICAgICAgICBldmVudC50YXJnZXQuaW5uZXJUZXh0XG4gICAgICAgICkuZ2V0VGFza0J5SW5kZXgoaSkuZHVlZGF0ZTtcbiAgICAgICAgdG9kb09wdGlvbnNXcmFwcGVyLmFwcGVuZENoaWxkKHNwYW5EdWVEYXRlKTtcbiAgICAgICAgY29uc3QgaW1nRWRpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgIGltZ0VkaXQuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiLi9pbWFnZXMvcGVuY2lsLWJveC1vdXRsaW5lLnN2Z1wiKTtcbiAgICAgICAgaW1nRWRpdC5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgXCJCdXR0b24gdG8gZWRpdCB0aGUgdGFza1wiKTtcbiAgICAgICAgaW1nRWRpdC5zZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiwgXCIyNXB4XCIpO1xuICAgICAgICB0b2RvT3B0aW9uc1dyYXBwZXIuYXBwZW5kQ2hpbGQoaW1nRWRpdCk7XG4gICAgICAgIGNvbnN0IGltZ0RlbGV0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgIGltZ0RlbGV0ZS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCIuL2ltYWdlcy90cmFzaC1jYW4tb3V0bGluZS5zdmdcIik7XG4gICAgICAgIGltZ0RlbGV0ZS5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgXCJCdXR0b24gdG8gZGVsZXRlIHRoZSB0YXNrXCIpO1xuICAgICAgICBpbWdEZWxldGUuc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIFwiMjVweFwiKTtcblxuICAgICAgICBpbWdEZWxldGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKFxuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmlubmVyVGV4dFxuICAgICAgICAgICkuZGVsZXRlVGFza0F0SW5kZXgoaSk7XG5cbiAgICAgICAgICB3aGlsZSAobWFpblJpZ2h0Lmxhc3RDaGlsZCkge1xuICAgICAgICAgICAgbWFpblJpZ2h0LnJlbW92ZUNoaWxkKG1haW5SaWdodC5sYXN0Q2hpbGQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIER5bmFtaWNFbGVtZW50cy5wb3B1bGF0ZVByb2plY3REZXRhaWxzKGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRvZG9PcHRpb25zV3JhcHBlci5hcHBlbmRDaGlsZChpbWdEZWxldGUpO1xuICAgICAgICByZWd1bGFyVGFzay5hcHBlbmRDaGlsZCh0b2RvT3B0aW9uc1dyYXBwZXIpO1xuXG4gICAgICAgIC8vVE8gRklOSVNIIGFkZCBldmVudCBsaXN0ZW5lcnMgZm9yIGVhY2ggdGFzaydzIGJ1dHRvbnNcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgb3BlblRvZGF5VGFza3MoKSB7XG4gICAgXG4gICAgaWYgKHR5cGVvZiBBbGxQcm9qZWN0cy5nZXRFdmVyeVRvZGF5VGFza0Zyb21FdmVyeVByb2plY3QoKSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgQWxlcnQuX2FsZXJ0KFwiRU5KT1khIE5PIFRBU0tTIEZPUiBUT0RBWSFcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiT1BBTEFcIik7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGRlbGV0ZVByb2plY3RGcm9tVGFza01vZGFsKCkge1xuICAgIC8vcXVlcnJ5IGFsbCB0aGUgb3B0aW9uLnZhbHVlcyBhbmQgY2hlY2sgdG8gc2VlIGlmIHRoZXkgZXhpc3QgaW4gQWxsUHJvamVjdHMgb3IgdGhlIHZhbHVlIGlzIGVxdWFsIHRvIGRlbGV0ZVByb2plY3RCdXR0b24uZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpLCBpZiB0aGUgb3B0aW9uIGlzbnQgdGhlcmUsIGRlbGV0ZSBpdFxuICAgIC8vIGRlbGV0ZVByb2plY3RCdXR0b24uZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpO1xuICAgIC8vIGNvbnNvbGUubG9nKGRlbGV0ZVByb2plY3RCdXR0b24uZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpKTtcbiAgICBsZXQgdmFsdWUgPSBkZWxldGVQcm9qZWN0QnV0dG9uLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKTtcbiAgICBjb25zdCB0b1JlbW92ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYHNlbGVjdCA+IFt2YWx1ZT1cIiR7dmFsdWV9XCJdYCk7XG4gICAgLy8gY29uc29sZS5sb2codG9SZW1vdmUpO1xuICAgIHRvUmVtb3ZlLnJlbW92ZSgpO1xuICAgIC8vIC5yZW1vdmUoKTtcbiAgfVxufVxuXG5jbGFzcyBBbGVydCB7XG4gIHN0YXRpYyBfYWxlcnQobXNnKSB7XG4gICAgYWxlcnQobXNnKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUkge1xuICBzdGF0aWMgaW5pdCgpIHtcbiAgICAvL3NldCB0aGUgbWluIGRhdGUgdG8gYmUgVE9EQVlcbiAgICB0aGlzLnNldE1pbkRhdGUoKTtcbiAgICB0aGlzLnVwZGF0ZVllYXJJbkZvb3RlcigpO1xuICAgIHRoaXMuaW5pdERlZmF1bHRDb250YWluZXIoKTtcbiAgICB0aGlzLmFkZExpc3RlbmVycygpO1xuICAgIC8vIHRoaXMuYWRkVGFzaygpO1xuICB9XG5cbiAgc3RhdGljIHNldE1pbkRhdGUoKSB7XG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IHllYXIgPSB0b2RheS5nZXRGdWxsWWVhcigpO1xuICAgIGNvbnN0IG1vbnRoID0gU3RyaW5nKHRvZGF5LmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gICAgY29uc3QgZGF5ID0gU3RyaW5nKHRvZGF5LmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICAgIGNvbnN0IG1pbkRhdGUgPSB5ZWFyICsgXCItXCIgKyBtb250aCArIFwiLVwiICsgZGF5O1xuICAgIHRhc2tEdWVEYXRlLm1pbiA9IG1pbkRhdGU7XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlWWVhckluRm9vdGVyKCkge1xuICAgIGZvb3RlclllYXIudGV4dENvbnRlbnQgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG4gIH1cblxuICBzdGF0aWMgdG9nZ2xlQmx1cigpIHtcbiAgICBjb250ZW50LmNsYXNzTGlzdC50b2dnbGUoXCJibHVyLWNvbnRlbnRcIik7XG4gIH1cblxuICBzdGF0aWMgaW5pdERlZmF1bHRDb250YWluZXIoKSB7XG4gICAgLy9jcmVhdGUgYW4gZW1wdHkgUHJvamVjdCBhbmQgYXBwZW5kIGl0IHRvIHRoZSBQcm9qZWN0c0xpc3RcbiAgICBBbGxQcm9qZWN0cy5hcHBlbmROZXdQcm9qZWN0KG5ldyBQcm9qZWN0KFwiRGVmYXVsdCBDb250YWluZXJcIikpO1xuICB9XG5cbiAgLy90b2RvIGdhdGhlciBhbGwgc3RhdGljIGxpc3RlbmVycyBpbiBvbmUgZnVuY3Rpb25cbiAgc3RhdGljIGFkZExpc3RlbmVycygpIHtcbiAgICAvLysgQWRkIFRhc2sgYnV0dG9uXG4gICAgYWRkVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vcGVuVGFza01vZGFsKTtcbiAgICB0YXNrTW9kYWxDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuY2xvc2VUYXNrTW9kYWwpO1xuICAgIHRhc2tNb2RhbFN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5zdWJtaXRUYXNrKTtcblxuICAgIC8vKyBBZGQgUHJvamVjdCBidXR0b25cbiAgICBhZGRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9wZW5Qcm9qZWN0TW9kYWwpO1xuICAgIHByb2plY3RNb2RhbENhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbG9zZVByb2plY3RNb2RhbCk7XG4gICAgcHJvamVjdE1vZGFsUHJvY2VlZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5zdWJtaXRQcm9qZWN0KTtcblxuICAgIC8vRW1wdHkgUHJvamVjdCBtb2RhbCBidXR0b25zXG4gICAgb2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuY2xvc2VFbXB0eVByb2plY3RNb2RhbCk7XG4gICAgZGVsZXRlUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5kZWxldGVFbXB0eVByb2plY3QpO1xuXG4gICAgLy9EZWZhdWx0IENvbnRhaW5lciBidXR0b25cbiAgICBkZWZhdWx0Q29udGFpbmVyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9wZW5EZWZhdWx0Q29udGFpbmVyKTtcblxuICAgIC8vVG9kYXkgYW5kIFRoaXMgV2VlayBidXR0b25zXG4gICAgdG9kYXlUYXNrc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgRHluYW1pY0VsZW1lbnRzLm9wZW5Ub2RheVRhc2tzKTtcbiAgfVxuICAvL0V2ZW50IGxpc3RlbmVycyBmb3IgdGhlIGhvbWVwYWdlIGFuZCBhbGwgb2YgdGhlIG1vZGFsc1xuXG4gIHN0YXRpYyBjbG9zZVRhc2tNb2RhbCgpIHtcbiAgICB0YXNrTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImFkZC10YXNrLW1vZGFsLXZpc2libGVcIik7XG4gICAgVUkudG9nZ2xlQmx1cigpO1xuICB9XG5cbiAgc3RhdGljIG9wZW5UYXNrTW9kYWwoKSB7XG4gICAgdGFza01vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJhZGQtdGFzay1tb2RhbC12aXNpYmxlXCIpO1xuICAgIC8vY2xlYXIgZmlyc3QgdHdvIGZpZWxkcyBmcm9tIHByZXZpb3VzbHkgYWRkZWQgdGFza1xuICAgIHRhc2tUaXRsZS52YWx1ZSA9IFwiXCI7XG4gICAgdGFza0Rlc2NyaXB0aW9uLnZhbHVlID0gXCJcIjtcbiAgICBVSS50b2dnbGVCbHVyKCk7XG4gICAgLy8gY29uc29sZS50YWJsZShBbGxQcm9qZWN0cy5nZXRQcm9qZWN0cygpKTtcbiAgfVxuXG4gIHN0YXRpYyBzdWJtaXRUYXNrKCkge1xuICAgIGlmICh0YXNrRHVlRGF0ZS52YWx1ZSAmJiB0YXNrVGl0bGUudmFsdWUpIHtcbiAgICAgIC8vICAgY29uc29sZS5sb2codGFza1ByaW9yaXR5LnZhbHVlKTtcbiAgICAgIC8vICAgY29uc29sZS5sb2codGFza0Fzc2lnblRvUHJvamVjdC52YWx1ZSk7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKHRhc2tEZXNjcmlwdGlvbi52YWx1ZSk7XG5cbiAgICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayhcbiAgICAgICAgdGFza1RpdGxlLnZhbHVlLFxuICAgICAgICB0YXNrUHJpb3JpdHkudmFsdWUsXG4gICAgICAgIHRhc2tEZXNjcmlwdGlvbi52YWx1ZSxcbiAgICAgICAgdGFza0R1ZURhdGUudmFsdWVcbiAgICAgICk7XG4gICAgICBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKHRhc2tBc3NpZ25Ub1Byb2plY3QudmFsdWUpLmFkZE5ld1Rhc2soXG4gICAgICAgIG5ld1Rhc2tcbiAgICAgICk7XG4gICAgICBVSS5jbG9zZVRhc2tNb2RhbCgpO1xuICAgICAgLy8gICBjb25zb2xlLmxvZyh0YXNrQXNzaWduVG9Qcm9qZWN0LnZhbHVlKTtcbiAgICAgIC8vICAgICBjb25zb2xlLnRhYmxlKFxuICAgICAgLy8gICAgICAgQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZSh0YXNrQXNzaWduVG9Qcm9qZWN0LnZhbHVlKS5nZXRUYXNrcygpXG4gICAgICAvLyAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgQWxlcnQuX2FsZXJ0KFwiVGl0bGUgYW5kIER1ZSBEYXRlIGFyZSBtYW5kYXRvcnlcIik7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG9wZW5Qcm9qZWN0TW9kYWwoKSB7XG4gICAgcHJvamVjdFRpdGxlLnZhbHVlID0gXCJcIjtcbiAgICBwcm9qZWN0TW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImFkZC1wcm9qZWN0LW1vZGFsLXZpc2libGVcIik7XG4gICAgVUkudG9nZ2xlQmx1cigpO1xuICB9XG5cbiAgc3RhdGljIGNsb3NlUHJvamVjdE1vZGFsKCkge1xuICAgIHByb2plY3RNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiYWRkLXByb2plY3QtbW9kYWwtdmlzaWJsZVwiKTtcbiAgICBVSS50b2dnbGVCbHVyKCk7XG4gIH1cblxuICBzdGF0aWMgc3VibWl0UHJvamVjdCgpIHtcbiAgICBpZiAocHJvamVjdFRpdGxlLnZhbHVlKSB7XG4gICAgICBBbGxQcm9qZWN0cy5hcHBlbmROZXdQcm9qZWN0KG5ldyBQcm9qZWN0KHByb2plY3RUaXRsZS52YWx1ZSkpO1xuICAgICAgVUkuY2xvc2VQcm9qZWN0TW9kYWwoKTtcbiAgICAgIER5bmFtaWNFbGVtZW50cy5uZXdQcm9qZWN0QWRkZWQocHJvamVjdFRpdGxlLnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgQWxlcnQuX2FsZXJ0KFwiVGl0bGUgY2Fubm90IGJlIGVtcHR5XCIpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBjbG9zZUVtcHR5UHJvamVjdE1vZGFsKCkge1xuICAgIGVtcHR5UHJvamVjdE1vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJlbXB0eS1wcm9qZWN0LW1vZGFsLXZpc2libGVcIik7XG4gICAgVUkudG9nZ2xlQmx1cigpO1xuICB9XG5cbiAgc3RhdGljIGRlbGV0ZUVtcHR5UHJvamVjdCgpIHtcbiAgICBpZiAoXG4gICAgICBkZWxldGVQcm9qZWN0QnV0dG9uLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSAhPT0gXCJEZWZhdWx0IENvbnRhaW5lclwiXG4gICAgKSB7XG4gICAgICBBbGxQcm9qZWN0cy5kZWxldGVQcm9qZWN0KFxuICAgICAgICBkZWxldGVQcm9qZWN0QnV0dG9uLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKVxuICAgICAgKTtcbiAgICAgIER5bmFtaWNFbGVtZW50cy51cGRhdGVMZWZ0TmF2KCk7XG4gICAgICBEeW5hbWljRWxlbWVudHMuZGVsZXRlUHJvamVjdEZyb21UYXNrTW9kYWwoKTtcbiAgICAgIFVJLmNsb3NlRW1wdHlQcm9qZWN0TW9kYWwoKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgb3BlbkRlZmF1bHRDb250YWluZXIoZXZlbnQpIHtcbiAgICBEeW5hbWljRWxlbWVudHMucG9wdWxhdGVQcm9qZWN0RGV0YWlscyhldmVudCk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3Qge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnRhc2tzID0gW107XG4gIH1cblxuICAvLyBnZXQgbmFtZSgpIHtcbiAgLy8gICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgLy8gfVxuXG4gIC8vIHNldCBuYW1lKHZhbHVlKSB7XG4gIC8vICAgaWYgKHZhbHVlLmxlbmd0aCA8IDEpIHtcbiAgLy8gICAgIGFsZXJ0KFwiUHJvamVjdCdzIG5hbWUgY2Fubm90IGJlIGVtcHR5LlwiKTtcbiAgLy8gICAgIHJldHVybjtcbiAgLy8gICB9XG4gIC8vICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xuICAvLyB9XG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIHNldE5hbWUobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gIH1cblxuICBnZXRUYXNrQnlJbmRleChpbmRleCkge1xuICAgIHJldHVybiB0aGlzLnRhc2tzW2luZGV4XTtcbiAgfVxuXG4gIGRlbGV0ZVRhc2tBdEluZGV4KGluZGV4KSB7XG4gICAgdGhpcy50YXNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgZ2V0VGFza3MoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFza3M7XG4gIH1cblxuICBnZXRUYXNrc0NvdW50KCkge1xuICAgIHJldHVybiB0aGlzLnRhc2tzLmxlbmd0aDtcbiAgfVxuXG4gIGFkZE5ld1Rhc2sodGFzaykge1xuICAgIHRoaXMudGFza3MucHVzaCh0YXNrKTtcbiAgfVxuXG4gIGdldFRvZGF5VGFza3MoKSB7XG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IHRvZGF5U3RyaW5nID0gdG9kYXkudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMCk7XG5cbiAgICBjb25zdCBhbGxUb2RheVRhc2tzID0gdGhpcy50YXNrcy5maWx0ZXIoXG4gICAgICAodGFzaykgPT4gdGFzay5kdWVkYXRlID09PSB0b2RheVN0cmluZ1xuICAgICk7XG5cbiAgICBpZiAoYWxsVG9kYXlUYXNrcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gYWxsVG9kYXlUYXNrcztcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFsbFByb2plY3RzIHtcbiAgc3RhdGljIHByb2plY3RzID0gW107XG5cbiAgc3RhdGljIGdldFByb2plY3RzKCkge1xuICAgIHJldHVybiB0aGlzLnByb2plY3RzO1xuICB9XG5cbiAgc3RhdGljIGdldFByb2plY3RzQ291bnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdHMubGVuZ3RoO1xuICB9XG5cbiAgc3RhdGljIGdldFByb2plY3RBdEluZGV4KGluZGV4KSB7XG4gICAgaWYgKGluZGV4IDwgdGhpcy5wcm9qZWN0cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb2plY3RzW2luZGV4XTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0UHJvamVjdEJ5TmFtZShwcm9qZWN0TmFtZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMucHJvamVjdHNbaV0ubmFtZSA9PT0gcHJvamVjdE5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvamVjdHNbaV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGFwcGVuZE5ld1Byb2plY3QoUHJvamVjdCkge1xuICAgIGlmIChQcm9qZWN0Lm5hbWUpIHtcbiAgICAgIHRoaXMucHJvamVjdHMucHVzaChQcm9qZWN0KTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlUHJvamVjdChwcm9qZWN0TmFtZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5nZXRQcm9qZWN0c0NvdW50KCk7IGkrKykge1xuICAgICAgaWYgKHRoaXMucHJvamVjdHNbaV0ubmFtZSA9PT0gcHJvamVjdE5hbWUpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldEV2ZXJ5VG9kYXlUYXNrRnJvbUV2ZXJ5UHJvamVjdCgpIHtcbiAgICBsZXQgY29tYmluZWRUb2RheVRhc2tzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnNvbGUubG9nKHR5cGVvZiB0aGlzLnByb2plY3RzW2ldLmdldFRvZGF5VGFza3MoKSlcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9qZWN0c1tpXS5nZXRUb2RheVRhc2tzKCkgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgY29tYmluZWRUb2RheVRhc2tzID0gY29tYmluZWRUb2RheVRhc2tzLmNvbmNhdChcbiAgICAgICAgICB0aGlzLnByb2plY3RzW2ldLmdldFRvZGF5VGFza3MoKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY29tYmluZWRUb2RheVRhc2tzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBjb21iaW5lZFRvZGF5VGFza3M7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIHByaW8sIGRlc2MsIGR1ZWRhdGUpIHtcbiAgICB0aGlzLnRpdGxlID0gbmFtZTtcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpbztcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzYztcbiAgICB0aGlzLmR1ZWRhdGUgPSBkdWVkYXRlO1xuICAgIHRoaXMuaXNDb21wbGV0ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIGdldCBuYW1lKCkge1xuICAvLyAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAvLyB9XG5cbiAgLy8gc2V0IG5hbWUodmFsdWUpIHtcbiAgLy8gICBpZiAodmFsdWUubGVuZ3RoIDwgMSkge1xuICAvLyAgICAgYWxlcnQoXCJUYXNrJ3MgbmFtZSBjYW5ub3QgYmUgZW1wdHkuXCIpO1xuICAvLyAgICAgcmV0dXJuO1xuICAvLyAgIH1cbiAgLy8gICB0aGlzLl9uYW1lID0gdmFsdWU7XG4gIC8vIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdFwiO1xuaW1wb3J0IEFsbFByb2plY3RzIGZyb20gXCIuL3Byb2plY3RzLWxpc3RcIjtcbmltcG9ydCBUYXNrIGZyb20gXCIuL3Rhc2tcIjtcbmltcG9ydCBVSSBmcm9tIFwiLi9kb21cIjtcblxuVUkuaW5pdCgpO1xuXG4vLyBhZGRQcm9qZWN0KEFsbFByb2plY3RzKTtcbi8vIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9vdGVyXCIpO1xuXG4vLyBmb290ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbi8vICAgICBjb25zdCBzb21lVGFzayA9IG5ldyBUYXNrKFwiUHJvYmFcIiwgXCJsb3dcIiwgXCJTb21lIHN0dXBpZCBzaGl0XCIsIFwiMzAuMTEuMjAyMlwiKTtcbi8vICAgICBjb25zdCBwcm9qID0gbmV3IFByb2plY3QoXCJMdWRuaWNoa2FcIik7XG4vLyAgICAgcHJvai5hZGROZXdUYXNrKHNvbWVUYXNrKTtcbi8vICAgICBjb25zb2xlLmxvZyhwcm9qLmdldFRhc2tzKCkpO1xuLy8gfSlcblxuXG5cblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=