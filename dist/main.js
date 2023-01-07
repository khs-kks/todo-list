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
      _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectByName(event.target.innerText).getTasksCount() === 0
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
        console.table(
          _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectByName(event.target.innerText).getTaskByIndex(i)
        );
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
    this.initDefaultContainer();
    this.addListeners();
    // this.addTask();
  }

  static toggleBlur() {
    content.classList.toggle("blur-content");
  }

  static initDefaultContainer() {
    //create an empty Project and append it to the ProjectsList
    _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].appendNewProject(new _project__WEBPACK_IMPORTED_MODULE_0__["default"]("default"));
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
    _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].deleteProject(deleteProjectButton.getAttribute("data-project"));
    DynamicElements.updateLeftNav();
    DynamicElements.deleteProjectFromTaskModal();
    UI.closeEmptyProjectModal();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7Ozs7Ozs7Ozs7Ozs7OztBQ3RDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDcEJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOZ0M7QUFDVTtBQUNoQjtBQUNIOztBQUV2QixpREFBTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdHMtbGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdFwiO1xuaW1wb3J0IEFsbFByb2plY3RzIGZyb20gXCIuL3Byb2plY3RzLWxpc3RcIjtcbmltcG9ydCBUYXNrIGZyb20gXCIuL3Rhc2tcIjtcblxuLy9xdWVyeSBhbGwgdGhlIG1vZGFsIGVsZW1lbnRzXG5jb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250ZW50XCIpO1xuY29uc3QgbG93ZXJCdXR0b25zTWFpbkxlZnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvd2VyLWJ1dHRvbnNcIik7XG5jb25zdCBtYWluUmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tcmlnaHRcIik7XG5cbi8vbmV3IHByb2plY3QgbW9kYWxcbmNvbnN0IHByb2plY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXByb2plY3QtbW9kYWxcIik7XG5jb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3QtdGl0bGUtZm9ybVwiKTtcbmNvbnN0IHByb2plY3RNb2RhbENhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gIFwiLmNhbmNlbC1wcm9qZWN0LWNyZWF0aW9uXCJcbik7XG5jb25zdCBwcm9qZWN0TW9kYWxQcm9jZWVkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgXCIucHJvY2VlZC1wcm9qZWN0LWNyZWF0aW9uXCJcbik7XG5cbi8vdGFzayBjcmVhdGlvbiBtb2RhbFxuY29uc3QgdGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay1tb2RhbFwiKTtcbmNvbnN0IHRhc2tUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay10aXRsZS1mb3JtXCIpO1xuY29uc3QgdGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWRlc2NyaXB0aW9uXCIpO1xuY29uc3QgdGFza0R1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stZHVlLWRhdGVcIik7XG5jb25zdCB0YXNrUHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI1ByaW9yaXR5XCIpO1xuY29uc3QgdGFza0Fzc2lnblRvUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC10by1hZGQtdG9cIik7XG5jb25zdCB0YXNrTW9kYWxDYW5jZWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICBcIi5hZGQtdGFzay1tb2RhbC1idXR0b25zLWNhbmNlbFwiXG4pO1xuY29uc3QgdGFza01vZGFsU3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgXCIuYWRkLXRhc2stbW9kYWwtYnV0dG9ucy1hZGRcIlxuKTtcblxuLy90YXNrIGRldGFpbHMgbW9kYWxcbmNvbnN0IHRhc2tEZXRhaWxzTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGV0YWlscy1tb2RhbFwiKTtcbmNvbnN0IHRhc2tEZXRhaWxzQ2xvc2VCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNsb3NlLXRhc2stZGV0YWlsc1wiKTtcbmNvbnN0IHRhc2tEZXRhaWxzSW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1kZXRhaWxzLWluZm9cIik7XG5jb25zdCB0YXNrRGV0YWlsc0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgXCIudGFzay1kZXRhaWxzLWRlc2NyaXB0aW9uXCJcbik7XG5jb25zdCB0YXNrRGV0YWlsc0R1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGV0YWlscy1kdWVkYXRlXCIpO1xuY29uc3QgdGFza0RldGFpbHNQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1kZXRhaWxzLXByaW9yaXR5XCIpO1xuY29uc3QgdGFza0RldGFpbHNDb21wbGV0ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGV0YWlscy1wcm9qZWN0XCIpO1xuXG4vL2xlZnQgbmF2IGJhciBzdGF0aWMgYnV0dG9uc1xuXG5jb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFza1wiKTtcbmNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0XCIpO1xuY29uc3QgZGVmYXVsdENvbnRhaW5lckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGVmYXVsdC1wcm9qZWN0XCIpO1xuXG4vL2VtcHR5IHByb2plY3QgbW9kYWxcbmNvbnN0IG9rQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5va1wiKTtcbmNvbnN0IGRlbGV0ZVByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uLmRlbGV0ZS1wcm9qZWN0XCIpO1xuY29uc3QgZW1wdHlQcm9qZWN0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVtcHR5LXByb2plY3QtbW9kYWxcIik7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmNsYXNzIER5bmFtaWNFbGVtZW50cyB7XG4gIHN0YXRpYyBuZXdQcm9qZWN0QWRkZWQocHJvamVjdFRpdGxlKSB7XG4gICAgdGhpcy51cGRhdGVUYXNrTW9kYWwocHJvamVjdFRpdGxlKTtcbiAgICB0aGlzLnVwZGF0ZUxlZnROYXYoKTtcbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVUYXNrTW9kYWwocHJvamVjdFRpdGxlKSB7XG4gICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICBvcHRpb24udGV4dENvbnRlbnQgPSBwcm9qZWN0VGl0bGU7XG4gICAgb3B0aW9uLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIHByb2plY3RUaXRsZS50b0xvd2VyQ2FzZSgpKTtcbiAgICB0YXNrQXNzaWduVG9Qcm9qZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlTGVmdE5hdigpIHtcbiAgICB0aGlzLmRlbGV0ZUNoaWxkcmVuKGxvd2VyQnV0dG9uc01haW5MZWZ0KTtcblxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgQWxsUHJvamVjdHMuZ2V0UHJvamVjdHNDb3VudCgpOyBpKyspIHtcbiAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBidG4uY2xhc3NMaXN0LmFkZChcInByb2plY3RzXCIpO1xuICAgICAgYnRuLmlubmVySFRNTCA9IGA8aW1nIHNyYz0nLi9pbWFnZXMvZm9ybWF0LWxpc3QtY2hlY2tzLnBuZycgYWx0PSdJbWFnZSBvZiBjaGVja2xpc3QnPiR7QWxsUHJvamVjdHMuZ2V0UHJvamVjdEF0SW5kZXgoXG4gICAgICAgIGlcbiAgICAgICkuZ2V0TmFtZSgpfWA7XG4gICAgICBsb3dlckJ1dHRvbnNNYWluTGVmdC5hcHBlbmRDaGlsZChidG4pO1xuICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnBvcHVsYXRlUHJvamVjdERldGFpbHMpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVDaGlsZHJlbihwYXJlbnQpIHtcbiAgICB3aGlsZSAocGFyZW50Lmxhc3RDaGlsZCAhPT0gYWRkUHJvamVjdEJ1dHRvbikge1xuICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKHBhcmVudC5sYXN0Q2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBwb3B1bGF0ZVByb2plY3REZXRhaWxzKGV2ZW50KSB7XG4gICAgLy8gY29uc29sZS5sb2coZXZlbnQudGFyZ2V0LmlubmVyVGV4dCk7XG4gICAgLy9DaGVjayB0byBzZWUgaWYgcHJvamVjdCBjbGlja2VkIGlzIGVtcHR5IGFuZCBpZiBpdCBpcyBicmluZyB1cCB0aGUgbW9kYWwsXG4gICAgLy8gaWYgaXQgaXNuJ3QgcG9wdWxhdGUgbWFpbiByaWdodCB3aXRoIHRoZSBwcm9qZWN0J3MgdGFza3NcbiAgICBpZiAoXG4gICAgICBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKGV2ZW50LnRhcmdldC5pbm5lclRleHQpLmdldFRhc2tzQ291bnQoKSA9PT0gMFxuICAgICkge1xuICAgICAgZW1wdHlQcm9qZWN0TW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImVtcHR5LXByb2plY3QtbW9kYWwtdmlzaWJsZVwiKTtcbiAgICAgIFVJLnRvZ2dsZUJsdXIoKTtcbiAgICAgIGRlbGV0ZVByb2plY3RCdXR0b24uc2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIsIGV2ZW50LnRhcmdldC5pbm5lclRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvL2NsZWFyIG1haW4tcmlnaHQgZGlzcGxheSBiZWZvcmUgcmVuZGVyaW5nIHRoZSB0YXNrc1xuXG4gICAgICB3aGlsZSAobWFpblJpZ2h0Lmxhc3RDaGlsZCkge1xuICAgICAgICBtYWluUmlnaHQucmVtb3ZlQ2hpbGQobWFpblJpZ2h0Lmxhc3RDaGlsZCk7XG4gICAgICB9XG5cbiAgICAgIC8vZ2VuZXJhdGUgdGhlIGhlYWRlciBhbmQgc3VtbWFyeSB3aXRoIG51bWJlciBvZiB0YXNrc1xuICAgICAgY29uc3QgaGVhZGVyMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAgIGNvbnN0IHRhc2tzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNvbnN0IHRhc2tzSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNvbnN0IHRhc2tzSGVhZGVyV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZGl2LnRleHRDb250ZW50ID0gXCJUYXNrcyBcIjtcbiAgICAgIGNvbnN0IHNwYW5OdW1iZXJPZlRhc2tzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICBjb25zdCBpbWdSZWZyZXNoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcblxuICAgICAgaGVhZGVyMS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC10aXRsZVwiKTtcbiAgICAgIGhlYWRlcjEudGV4dENvbnRlbnQgPSBldmVudC50YXJnZXQuaW5uZXJUZXh0O1xuXG4gICAgICB0YXNrc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwidGFza3MtY29udGFpbmVyXCIpO1xuICAgICAgdGFza3NIZWFkZXIuY2xhc3NMaXN0LmFkZChcInRhc2tzLWhlYWRlclwiKTtcbiAgICAgIHRhc2tzSGVhZGVyV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwidGFza3MtaGVhZGVyLXdyYXBwZXJcIik7XG4gICAgICBzcGFuTnVtYmVyT2ZUYXNrcy5jbGFzc0xpc3QuYWRkKFwibnVtYmVyLW9mLXRhc2tzXCIpO1xuICAgICAgc3Bhbk51bWJlck9mVGFza3MudGV4dENvbnRlbnQgPSBgKCR7QWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShcbiAgICAgICAgZXZlbnQudGFyZ2V0LmlubmVyVGV4dFxuICAgICAgKS5nZXRUYXNrc0NvdW50KCl9KWA7XG5cbiAgICAgIGltZ1JlZnJlc2guc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiLi9pbWFnZXMvcmVmcmVzaC1jaXJjbGUuc3ZnXCIpO1xuICAgICAgaW1nUmVmcmVzaC5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgXCJJbWFnZSBvZiByZWZyZXNoIGJ1dHRvblwiKTtcbiAgICAgIGltZ1JlZnJlc2guc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIFwiMjVweFwiKTtcbiAgICAgIGltZ1JlZnJlc2guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgRHluYW1pY0VsZW1lbnRzLnBvcHVsYXRlUHJvamVjdERldGFpbHMoZXZlbnQpO1xuICAgICAgfSk7XG5cbiAgICAgIGRpdi5hcHBlbmRDaGlsZChzcGFuTnVtYmVyT2ZUYXNrcyk7XG4gICAgICB0YXNrc0hlYWRlcldyYXBwZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgIHRhc2tzSGVhZGVyV3JhcHBlci5hcHBlbmRDaGlsZChpbWdSZWZyZXNoKTtcbiAgICAgIHRhc2tzSGVhZGVyLmFwcGVuZENoaWxkKHRhc2tzSGVhZGVyV3JhcHBlcik7XG4gICAgICB0YXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrc0hlYWRlcik7XG5cbiAgICAgIG1haW5SaWdodC5hcHBlbmRDaGlsZChoZWFkZXIxKTtcbiAgICAgIG1haW5SaWdodC5hcHBlbmRDaGlsZCh0YXNrc0NvbnRhaW5lcik7XG5cbiAgICAgIGZvciAoXG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgaSA8XG4gICAgICAgIEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoZXZlbnQudGFyZ2V0LmlubmVyVGV4dCkuZ2V0VGFza3NDb3VudCgpO1xuICAgICAgICBpKytcbiAgICAgICkge1xuICAgICAgICBjb25zb2xlLnRhYmxlKFxuICAgICAgICAgIEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoZXZlbnQudGFyZ2V0LmlubmVyVGV4dCkuZ2V0VGFza0J5SW5kZXgoaSlcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcmVndWxhclRhc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICByZWd1bGFyVGFzay5jbGFzc0xpc3QuYWRkKFwicmVndWxhci10YXNrXCIpO1xuICAgICAgICByZWd1bGFyVGFzay5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgIEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoZXZlbnQudGFyZ2V0LmlubmVyVGV4dCkuZ2V0VGFza0J5SW5kZXgoaSlcbiAgICAgICAgICAgIC5wcmlvcml0eVxuICAgICAgICApO1xuICAgICAgICBjb25zdCB0b0RvTmFtZVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0b0RvTmFtZVdyYXBwZXIuY2xhc3NMaXN0LmFkZChcInRvZG8tbmFtZS13cmFwcGVyXCIpO1xuICAgICAgICBjb25zdCB0b0RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgY29uc3Qgc3BhblRhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG5cbiAgICAgICAgc3BhblRhc2tOYW1lLnRleHRDb250ZW50ID0gQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShcbiAgICAgICAgICBldmVudC50YXJnZXQuaW5uZXJUZXh0XG4gICAgICAgICkuZ2V0VGFza0J5SW5kZXgoaSkudGl0bGU7XG4gICAgICAgIHNwYW5UYXNrTmFtZS5jbGFzc0xpc3QuYWRkKFwidGFzay1uYW1lXCIpO1xuICAgICAgICB0b0RvLmNsYXNzTGlzdC5hZGQoXCJ0b2RvXCIpO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKGV2ZW50LnRhcmdldC5pbm5lclRleHQpLmdldFRhc2tCeUluZGV4KGkpXG4gICAgICAgICAgICAuaXNDb21wbGV0ZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgdG9Eby5jbGFzc0xpc3QuYWRkKFwiY29tcGxldGVkXCIpO1xuICAgICAgICAgIHNwYW5UYXNrTmFtZS5jbGFzc0xpc3QuYWRkKFwiY29tcGxldGVkXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9Eby5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgIHRvRG8uY2xhc3NMaXN0LnRvZ2dsZShcImNvbXBsZXRlZFwiKTtcbiAgICAgICAgICBzcGFuVGFza05hbWUuY2xhc3NMaXN0LnRvZ2dsZShcImNvbXBsZXRlZFwiKTtcbiAgICAgICAgICBsZXQgaXNUYXNrQ29tcGxldGVkID0gQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5pbm5lclRleHRcbiAgICAgICAgICApLmdldFRhc2tCeUluZGV4KGkpLmlzQ29tcGxldGVkO1xuICAgICAgICAgIGlmIChpc1Rhc2tDb21wbGV0ZWQpIHtcbiAgICAgICAgICAgIEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoZXZlbnQudGFyZ2V0LmlubmVyVGV4dCkuZ2V0VGFza0J5SW5kZXgoXG4gICAgICAgICAgICAgIGlcbiAgICAgICAgICAgICkuaXNDb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShldmVudC50YXJnZXQuaW5uZXJUZXh0KS5nZXRUYXNrQnlJbmRleChcbiAgICAgICAgICAgICAgaVxuICAgICAgICAgICAgKS5pc0NvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0b0RvTmFtZVdyYXBwZXIuYXBwZW5kQ2hpbGQodG9Ebyk7XG4gICAgICAgIHRvRG9OYW1lV3JhcHBlci5hcHBlbmRDaGlsZChzcGFuVGFza05hbWUpO1xuICAgICAgICByZWd1bGFyVGFzay5hcHBlbmRDaGlsZCh0b0RvTmFtZVdyYXBwZXIpO1xuICAgICAgICB0YXNrc0NvbnRhaW5lci5hcHBlbmQocmVndWxhclRhc2spO1xuXG4gICAgICAgIGNvbnN0IHRvZG9PcHRpb25zV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRvZG9PcHRpb25zV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwidG9kby1vcHRpb25zLXdyYXBwZXJcIik7XG4gICAgICAgIGNvbnN0IHRvZG9EZXRhaWxzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgdG9kb0RldGFpbHMuY2xhc3NMaXN0LmFkZChcInRvZG8tZGV0YWlsc1wiKTtcbiAgICAgICAgdG9kb0RldGFpbHMudGV4dENvbnRlbnQgPSBcIkRFVEFJTFNcIjtcblxuICAgICAgICB0b2RvRGV0YWlscy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgIHRhc2tEZXRhaWxzTW9kYWwuY2xhc3NMaXN0LmFkZChcInRhc2stZGV0YWlscy1tb2RhbC12aXNpYmxlXCIpO1xuICAgICAgICAgIHRhc2tEZXRhaWxzQ2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIHRhc2tEZXRhaWxzTW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcInRhc2stZGV0YWlscy1tb2RhbC12aXNpYmxlXCIpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGFza0RldGFpbHNJbmZvLnRleHRDb250ZW50ID0gQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5pbm5lclRleHRcbiAgICAgICAgICApLmdldFRhc2tCeUluZGV4KGkpLnRpdGxlO1xuXG4gICAgICAgICAgdGFza0RldGFpbHNEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoXG4gICAgICAgICAgICBldmVudC50YXJnZXQuaW5uZXJUZXh0XG4gICAgICAgICAgKS5nZXRUYXNrQnlJbmRleChpKS5kZXNjcmlwdGlvbjtcblxuICAgICAgICAgIHRhc2tEZXRhaWxzRHVlRGF0ZS50ZXh0Q29udGVudCA9IEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoXG4gICAgICAgICAgICBldmVudC50YXJnZXQuaW5uZXJUZXh0XG4gICAgICAgICAgKS5nZXRUYXNrQnlJbmRleChpKS5kdWVkYXRlO1xuXG4gICAgICAgICAgdGFza0RldGFpbHNQcmlvcml0eS50ZXh0Q29udGVudCA9IEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoXG4gICAgICAgICAgICBldmVudC50YXJnZXQuaW5uZXJUZXh0XG4gICAgICAgICAgKS5nZXRUYXNrQnlJbmRleChpKS5wcmlvcml0eTtcblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoZXZlbnQudGFyZ2V0LmlubmVyVGV4dCkuZ2V0VGFza0J5SW5kZXgoXG4gICAgICAgICAgICAgIGlcbiAgICAgICAgICAgICkuaXNDb21wbGV0ZWRcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRhc2tEZXRhaWxzQ29tcGxldGVkLnRleHRDb250ZW50ID0gXCJDb21wbGV0ZWRcIjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFza0RldGFpbHNDb21wbGV0ZWQudGV4dENvbnRlbnQgPSBcIk5PVCBDb21wbGV0ZWRcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRvZG9PcHRpb25zV3JhcHBlci5hcHBlbmRDaGlsZCh0b2RvRGV0YWlscyk7XG4gICAgICAgIGNvbnN0IHNwYW5EdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIHNwYW5EdWVEYXRlLmNsYXNzTGlzdC5hZGQoXCJkdWUtZGF0ZVwiKTtcbiAgICAgICAgc3BhbkR1ZURhdGUudGV4dENvbnRlbnQgPSBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKFxuICAgICAgICAgIGV2ZW50LnRhcmdldC5pbm5lclRleHRcbiAgICAgICAgKS5nZXRUYXNrQnlJbmRleChpKS5kdWVkYXRlO1xuICAgICAgICB0b2RvT3B0aW9uc1dyYXBwZXIuYXBwZW5kQ2hpbGQoc3BhbkR1ZURhdGUpO1xuICAgICAgICBjb25zdCBpbWdFZGl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgaW1nRWRpdC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCIuL2ltYWdlcy9wZW5jaWwtYm94LW91dGxpbmUuc3ZnXCIpO1xuICAgICAgICBpbWdFZGl0LnNldEF0dHJpYnV0ZShcImFsdFwiLCBcIkJ1dHRvbiB0byBlZGl0IHRoZSB0YXNrXCIpO1xuICAgICAgICBpbWdFZGl0LnNldEF0dHJpYnV0ZShcImhlaWdodFwiLCBcIjI1cHhcIik7XG4gICAgICAgIHRvZG9PcHRpb25zV3JhcHBlci5hcHBlbmRDaGlsZChpbWdFZGl0KTtcbiAgICAgICAgY29uc3QgaW1nRGVsZXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgaW1nRGVsZXRlLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcIi4vaW1hZ2VzL3RyYXNoLWNhbi1vdXRsaW5lLnN2Z1wiKTtcbiAgICAgICAgaW1nRGVsZXRlLnNldEF0dHJpYnV0ZShcImFsdFwiLCBcIkJ1dHRvbiB0byBkZWxldGUgdGhlIHRhc2tcIik7XG4gICAgICAgIGltZ0RlbGV0ZS5zZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiwgXCIyNXB4XCIpO1xuXG4gICAgICAgIGltZ0RlbGV0ZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgIEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoXG4gICAgICAgICAgICBldmVudC50YXJnZXQuaW5uZXJUZXh0XG4gICAgICAgICAgKS5kZWxldGVUYXNrQXRJbmRleChpKTtcblxuICAgICAgICAgIHdoaWxlIChtYWluUmlnaHQubGFzdENoaWxkKSB7XG4gICAgICAgICAgICBtYWluUmlnaHQucmVtb3ZlQ2hpbGQobWFpblJpZ2h0Lmxhc3RDaGlsZCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgRHluYW1pY0VsZW1lbnRzLnBvcHVsYXRlUHJvamVjdERldGFpbHMoZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgdG9kb09wdGlvbnNXcmFwcGVyLmFwcGVuZENoaWxkKGltZ0RlbGV0ZSk7XG4gICAgICAgIHJlZ3VsYXJUYXNrLmFwcGVuZENoaWxkKHRvZG9PcHRpb25zV3JhcHBlcik7XG5cbiAgICAgICAgLy9UTyBGSU5JU0ggYWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgZWFjaCB0YXNrJ3MgYnV0dG9uc1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVQcm9qZWN0RnJvbVRhc2tNb2RhbCgpIHtcbiAgICAvL3F1ZXJyeSBhbGwgdGhlIG9wdGlvbi52YWx1ZXMgYW5kIGNoZWNrIHRvIHNlZSBpZiB0aGV5IGV4aXN0IGluIEFsbFByb2plY3RzIG9yIHRoZSB2YWx1ZSBpcyBlcXVhbCB0byBkZWxldGVQcm9qZWN0QnV0dG9uLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSwgaWYgdGhlIG9wdGlvbiBpc250IHRoZXJlLCBkZWxldGUgaXRcbiAgICAvLyBkZWxldGVQcm9qZWN0QnV0dG9uLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKTtcbiAgICAvLyBjb25zb2xlLmxvZyhkZWxldGVQcm9qZWN0QnV0dG9uLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSk7XG4gICAgbGV0IHZhbHVlID0gZGVsZXRlUHJvamVjdEJ1dHRvbi5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIik7XG4gICAgY29uc3QgdG9SZW1vdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBzZWxlY3QgPiBbdmFsdWU9XCIke3ZhbHVlfVwiXWApO1xuICAgIC8vIGNvbnNvbGUubG9nKHRvUmVtb3ZlKTtcbiAgICB0b1JlbW92ZS5yZW1vdmUoKTtcbiAgICAvLyAucmVtb3ZlKCk7XG4gIH1cbn1cblxuY2xhc3MgQWxlcnQge1xuICBzdGF0aWMgX2FsZXJ0KG1zZykge1xuICAgIGFsZXJ0KG1zZyk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJIHtcbiAgc3RhdGljIGluaXQoKSB7XG4gICAgdGhpcy5pbml0RGVmYXVsdENvbnRhaW5lcigpO1xuICAgIHRoaXMuYWRkTGlzdGVuZXJzKCk7XG4gICAgLy8gdGhpcy5hZGRUYXNrKCk7XG4gIH1cblxuICBzdGF0aWMgdG9nZ2xlQmx1cigpIHtcbiAgICBjb250ZW50LmNsYXNzTGlzdC50b2dnbGUoXCJibHVyLWNvbnRlbnRcIik7XG4gIH1cblxuICBzdGF0aWMgaW5pdERlZmF1bHRDb250YWluZXIoKSB7XG4gICAgLy9jcmVhdGUgYW4gZW1wdHkgUHJvamVjdCBhbmQgYXBwZW5kIGl0IHRvIHRoZSBQcm9qZWN0c0xpc3RcbiAgICBBbGxQcm9qZWN0cy5hcHBlbmROZXdQcm9qZWN0KG5ldyBQcm9qZWN0KFwiZGVmYXVsdFwiKSk7XG4gIH1cblxuICAvL3RvZG8gZ2F0aGVyIGFsbCBzdGF0aWMgbGlzdGVuZXJzIGluIG9uZSBmdW5jdGlvblxuICBzdGF0aWMgYWRkTGlzdGVuZXJzKCkge1xuICAgIC8vKyBBZGQgVGFzayBidXR0b25cbiAgICBhZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9wZW5UYXNrTW9kYWwpO1xuICAgIHRhc2tNb2RhbENhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbG9zZVRhc2tNb2RhbCk7XG4gICAgdGFza01vZGFsU3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnN1Ym1pdFRhc2spO1xuXG4gICAgLy8rIEFkZCBQcm9qZWN0IGJ1dHRvblxuICAgIGFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub3BlblByb2plY3RNb2RhbCk7XG4gICAgcHJvamVjdE1vZGFsQ2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNsb3NlUHJvamVjdE1vZGFsKTtcbiAgICBwcm9qZWN0TW9kYWxQcm9jZWVkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnN1Ym1pdFByb2plY3QpO1xuXG4gICAgLy9FbXB0eSBQcm9qZWN0IG1vZGFsIGJ1dHRvbnNcbiAgICBva0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbG9zZUVtcHR5UHJvamVjdE1vZGFsKTtcbiAgICBkZWxldGVQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmRlbGV0ZUVtcHR5UHJvamVjdCk7XG4gIH1cbiAgLy9FdmVudCBsaXN0ZW5lcnMgZm9yIHRoZSBob21lcGFnZSBhbmQgYWxsIG9mIHRoZSBtb2RhbHNcblxuICBzdGF0aWMgY2xvc2VUYXNrTW9kYWwoKSB7XG4gICAgdGFza01vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJhZGQtdGFzay1tb2RhbC12aXNpYmxlXCIpO1xuICAgIFVJLnRvZ2dsZUJsdXIoKTtcbiAgfVxuXG4gIHN0YXRpYyBvcGVuVGFza01vZGFsKCkge1xuICAgIHRhc2tNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiYWRkLXRhc2stbW9kYWwtdmlzaWJsZVwiKTtcbiAgICAvL2NsZWFyIGZpcnN0IHR3byBmaWVsZHMgZnJvbSBwcmV2aW91c2x5IGFkZGVkIHRhc2tcbiAgICB0YXNrVGl0bGUudmFsdWUgPSBcIlwiO1xuICAgIHRhc2tEZXNjcmlwdGlvbi52YWx1ZSA9IFwiXCI7XG4gICAgVUkudG9nZ2xlQmx1cigpO1xuICAgIC8vIGNvbnNvbGUudGFibGUoQWxsUHJvamVjdHMuZ2V0UHJvamVjdHMoKSk7XG4gIH1cblxuICBzdGF0aWMgc3VibWl0VGFzaygpIHtcbiAgICBpZiAodGFza0R1ZURhdGUudmFsdWUgJiYgdGFza1RpdGxlLnZhbHVlKSB7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKHRhc2tQcmlvcml0eS52YWx1ZSk7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKHRhc2tBc3NpZ25Ub1Byb2plY3QudmFsdWUpO1xuICAgICAgLy8gICBjb25zb2xlLmxvZyh0YXNrRGVzY3JpcHRpb24udmFsdWUpO1xuXG4gICAgICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2soXG4gICAgICAgIHRhc2tUaXRsZS52YWx1ZSxcbiAgICAgICAgdGFza1ByaW9yaXR5LnZhbHVlLFxuICAgICAgICB0YXNrRGVzY3JpcHRpb24udmFsdWUsXG4gICAgICAgIHRhc2tEdWVEYXRlLnZhbHVlXG4gICAgICApO1xuICAgICAgQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZSh0YXNrQXNzaWduVG9Qcm9qZWN0LnZhbHVlKS5hZGROZXdUYXNrKFxuICAgICAgICBuZXdUYXNrXG4gICAgICApO1xuICAgICAgVUkuY2xvc2VUYXNrTW9kYWwoKTtcbiAgICAgIC8vICAgY29uc29sZS5sb2codGFza0Fzc2lnblRvUHJvamVjdC52YWx1ZSk7XG4gICAgICAvLyAgICAgY29uc29sZS50YWJsZShcbiAgICAgIC8vICAgICAgIEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUodGFza0Fzc2lnblRvUHJvamVjdC52YWx1ZSkuZ2V0VGFza3MoKVxuICAgICAgLy8gICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIEFsZXJ0Ll9hbGVydChcIlRpdGxlIGFuZCBEdWUgRGF0ZSBhcmUgbWFuZGF0b3J5XCIpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBvcGVuUHJvamVjdE1vZGFsKCkge1xuICAgIHByb2plY3RUaXRsZS52YWx1ZSA9IFwiXCI7XG4gICAgcHJvamVjdE1vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJhZGQtcHJvamVjdC1tb2RhbC12aXNpYmxlXCIpO1xuICAgIFVJLnRvZ2dsZUJsdXIoKTtcbiAgfVxuXG4gIHN0YXRpYyBjbG9zZVByb2plY3RNb2RhbCgpIHtcbiAgICBwcm9qZWN0TW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImFkZC1wcm9qZWN0LW1vZGFsLXZpc2libGVcIik7XG4gICAgVUkudG9nZ2xlQmx1cigpO1xuICB9XG5cbiAgc3RhdGljIHN1Ym1pdFByb2plY3QoKSB7XG4gICAgaWYgKHByb2plY3RUaXRsZS52YWx1ZSkge1xuICAgICAgQWxsUHJvamVjdHMuYXBwZW5kTmV3UHJvamVjdChuZXcgUHJvamVjdChwcm9qZWN0VGl0bGUudmFsdWUpKTtcbiAgICAgIFVJLmNsb3NlUHJvamVjdE1vZGFsKCk7XG4gICAgICBEeW5hbWljRWxlbWVudHMubmV3UHJvamVjdEFkZGVkKHByb2plY3RUaXRsZS52YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIEFsZXJ0Ll9hbGVydChcIlRpdGxlIGNhbm5vdCBiZSBlbXB0eVwiKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgY2xvc2VFbXB0eVByb2plY3RNb2RhbCgpIHtcbiAgICBlbXB0eVByb2plY3RNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiZW1wdHktcHJvamVjdC1tb2RhbC12aXNpYmxlXCIpO1xuICAgIFVJLnRvZ2dsZUJsdXIoKTtcbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVFbXB0eVByb2plY3QoKSB7XG4gICAgQWxsUHJvamVjdHMuZGVsZXRlUHJvamVjdChkZWxldGVQcm9qZWN0QnV0dG9uLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSk7XG4gICAgRHluYW1pY0VsZW1lbnRzLnVwZGF0ZUxlZnROYXYoKTtcbiAgICBEeW5hbWljRWxlbWVudHMuZGVsZXRlUHJvamVjdEZyb21UYXNrTW9kYWwoKTtcbiAgICBVSS5jbG9zZUVtcHR5UHJvamVjdE1vZGFsKCk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3Qge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnRhc2tzID0gW107XG4gIH1cblxuICAvLyBnZXQgbmFtZSgpIHtcbiAgLy8gICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgLy8gfVxuXG4gIC8vIHNldCBuYW1lKHZhbHVlKSB7XG4gIC8vICAgaWYgKHZhbHVlLmxlbmd0aCA8IDEpIHtcbiAgLy8gICAgIGFsZXJ0KFwiUHJvamVjdCdzIG5hbWUgY2Fubm90IGJlIGVtcHR5LlwiKTtcbiAgLy8gICAgIHJldHVybjtcbiAgLy8gICB9XG4gIC8vICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xuICAvLyB9XG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIHNldE5hbWUobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gIH1cblxuICBnZXRUYXNrQnlJbmRleChpbmRleCkge1xuICAgIHJldHVybiB0aGlzLnRhc2tzW2luZGV4XTtcbiAgfVxuXG4gIGRlbGV0ZVRhc2tBdEluZGV4KGluZGV4KSB7XG4gICAgdGhpcy50YXNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgZ2V0VGFza3MoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFza3M7XG4gIH1cblxuICBnZXRUYXNrc0NvdW50KCkge1xuICAgIHJldHVybiB0aGlzLnRhc2tzLmxlbmd0aDtcbiAgfVxuXG4gIGFkZE5ld1Rhc2sodGFzaykge1xuICAgIHRoaXMudGFza3MucHVzaCh0YXNrKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWxsUHJvamVjdHMge1xuICBzdGF0aWMgcHJvamVjdHMgPSBbXTtcblxuICBzdGF0aWMgZ2V0UHJvamVjdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdHM7XG4gIH1cblxuICBzdGF0aWMgZ2V0UHJvamVjdHNDb3VudCgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5sZW5ndGg7XG4gIH1cblxuICBzdGF0aWMgZ2V0UHJvamVjdEF0SW5kZXgoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPCB0aGlzLnByb2plY3RzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvamVjdHNbaW5kZXhdO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRQcm9qZWN0QnlOYW1lKHByb2plY3ROYW1lKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5wcm9qZWN0c1tpXS5uYW1lID09PSBwcm9qZWN0TmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0c1tpXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYXBwZW5kTmV3UHJvamVjdChQcm9qZWN0KSB7XG4gICAgaWYgKFByb2plY3QubmFtZSkge1xuICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKFByb2plY3QpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVQcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmdldFByb2plY3RzQ291bnQoKTsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5wcm9qZWN0c1tpXS5uYW1lID09PSBwcm9qZWN0TmFtZSkge1xuICAgICAgICB0aGlzLnByb2plY3RzLnNwbGljZShpLCAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBwcmlvLCBkZXNjLCBkdWVkYXRlKSB7XG4gICAgdGhpcy50aXRsZSA9IG5hbWU7XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW87XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2M7XG4gICAgdGhpcy5kdWVkYXRlID0gZHVlZGF0ZTtcbiAgICB0aGlzLmlzQ29tcGxldGVkID0gZmFsc2U7XG4gIH1cblxuICAvLyBnZXQgbmFtZSgpIHtcbiAgLy8gICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgLy8gfVxuXG4gIC8vIHNldCBuYW1lKHZhbHVlKSB7XG4gIC8vICAgaWYgKHZhbHVlLmxlbmd0aCA8IDEpIHtcbiAgLy8gICAgIGFsZXJ0KFwiVGFzaydzIG5hbWUgY2Fubm90IGJlIGVtcHR5LlwiKTtcbiAgLy8gICAgIHJldHVybjtcbiAgLy8gICB9XG4gIC8vICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xuICAvLyB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBQcm9qZWN0IGZyb20gXCIuL3Byb2plY3RcIjtcbmltcG9ydCBBbGxQcm9qZWN0cyBmcm9tIFwiLi9wcm9qZWN0cy1saXN0XCI7XG5pbXBvcnQgVGFzayBmcm9tIFwiLi90YXNrXCI7XG5pbXBvcnQgVUkgZnJvbSBcIi4vZG9tXCI7XG5cblVJLmluaXQoKTtcblxuLy8gYWRkUHJvamVjdChBbGxQcm9qZWN0cyk7XG4vLyBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvb3RlclwiKTtcblxuLy8gZm9vdGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4vLyAgICAgY29uc3Qgc29tZVRhc2sgPSBuZXcgVGFzayhcIlByb2JhXCIsIFwibG93XCIsIFwiU29tZSBzdHVwaWQgc2hpdFwiLCBcIjMwLjExLjIwMjJcIik7XG4vLyAgICAgY29uc3QgcHJvaiA9IG5ldyBQcm9qZWN0KFwiTHVkbmljaGthXCIpO1xuLy8gICAgIHByb2ouYWRkTmV3VGFzayhzb21lVGFzayk7XG4vLyAgICAgY29uc29sZS5sb2cocHJvai5nZXRUYXNrcygpKTtcbi8vIH0pXG5cblxuXG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9