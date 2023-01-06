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
        }

        toDo.addEventListener("click", () => {
          toDo.classList.toggle("completed");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTmdDO0FBQ1U7QUFDaEI7QUFDSDs7QUFFdkIsaURBQU87O0FBRVA7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3RzLWxpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9qZWN0IGZyb20gXCIuL3Byb2plY3RcIjtcbmltcG9ydCBBbGxQcm9qZWN0cyBmcm9tIFwiLi9wcm9qZWN0cy1saXN0XCI7XG5pbXBvcnQgVGFzayBmcm9tIFwiLi90YXNrXCI7XG5cbi8vcXVlcnkgYWxsIHRoZSBtb2RhbCBlbGVtZW50c1xuY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGVudFwiKTtcbmNvbnN0IGxvd2VyQnV0dG9uc01haW5MZWZ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb3dlci1idXR0b25zXCIpO1xuY29uc3QgbWFpblJpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLXJpZ2h0XCIpO1xuXG4vL25ldyBwcm9qZWN0IG1vZGFsXG5jb25zdCBwcm9qZWN0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0LW1vZGFsXCIpO1xuY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LXRpdGxlLWZvcm1cIik7XG5jb25zdCBwcm9qZWN0TW9kYWxDYW5jZWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICBcIi5jYW5jZWwtcHJvamVjdC1jcmVhdGlvblwiXG4pO1xuY29uc3QgcHJvamVjdE1vZGFsUHJvY2VlZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gIFwiLnByb2NlZWQtcHJvamVjdC1jcmVhdGlvblwiXG4pO1xuXG4vL3Rhc2sgY3JlYXRpb24gbW9kYWxcbmNvbnN0IHRhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2stbW9kYWxcIik7XG5jb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stdGl0bGUtZm9ybVwiKTtcbmNvbnN0IHRhc2tEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kZXNjcmlwdGlvblwiKTtcbmNvbnN0IHRhc2tEdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWR1ZS1kYXRlXCIpO1xuY29uc3QgdGFza1ByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNQcmlvcml0eVwiKTtcbmNvbnN0IHRhc2tBc3NpZ25Ub1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3QtdG8tYWRkLXRvXCIpO1xuY29uc3QgdGFza01vZGFsQ2FuY2VsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgXCIuYWRkLXRhc2stbW9kYWwtYnV0dG9ucy1jYW5jZWxcIlxuKTtcbmNvbnN0IHRhc2tNb2RhbFN1Ym1pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gIFwiLmFkZC10YXNrLW1vZGFsLWJ1dHRvbnMtYWRkXCJcbik7XG5cbi8vdGFzayBkZXRhaWxzIG1vZGFsXG5jb25zdCB0YXNrRGV0YWlsc0luZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGV0YWlscy1pbmZvXCIpO1xuY29uc3QgdGFza0RldGFpbHNEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gIFwiLnRhc2stZGV0YWlscy1kZXNjcmlwdGlvblwiXG4pO1xuY29uc3QgdGFza0RldGFpbHNEdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWRldGFpbHMtZHVlZGF0ZVwiKTtcbmNvbnN0IHRhc2tEZXRhaWxzUHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGV0YWlscy1wcmlvcml0eVwiKTtcbmNvbnN0IHRhc2tEZXRhaWxzUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1kZXRhaWxzLXByb2plY3RcIik7XG5cbi8vbGVmdCBuYXYgYmFyIHN0YXRpYyBidXR0b25zXG5cbmNvbnN0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrXCIpO1xuY29uc3QgYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXByb2plY3RcIik7XG5jb25zdCBkZWZhdWx0Q29udGFpbmVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZWZhdWx0LXByb2plY3RcIik7XG5cbi8vZW1wdHkgcHJvamVjdCBtb2RhbFxuY29uc3Qgb2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm9rXCIpO1xuY29uc3QgZGVsZXRlUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b24uZGVsZXRlLXByb2plY3RcIik7XG5jb25zdCBlbXB0eVByb2plY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZW1wdHktcHJvamVjdC1tb2RhbFwiKTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuY2xhc3MgRHluYW1pY0VsZW1lbnRzIHtcbiAgc3RhdGljIG5ld1Byb2plY3RBZGRlZChwcm9qZWN0VGl0bGUpIHtcbiAgICB0aGlzLnVwZGF0ZVRhc2tNb2RhbChwcm9qZWN0VGl0bGUpO1xuICAgIHRoaXMudXBkYXRlTGVmdE5hdigpO1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZVRhc2tNb2RhbChwcm9qZWN0VGl0bGUpIHtcbiAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3RUaXRsZTtcbiAgICBvcHRpb24uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgcHJvamVjdFRpdGxlLnRvTG93ZXJDYXNlKCkpO1xuICAgIHRhc2tBc3NpZ25Ub1Byb2plY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVMZWZ0TmF2KCkge1xuICAgIHRoaXMuZGVsZXRlQ2hpbGRyZW4obG93ZXJCdXR0b25zTWFpbkxlZnQpO1xuXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0c0NvdW50KCk7IGkrKykge1xuICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwicHJvamVjdHNcIik7XG4gICAgICBidG4uaW5uZXJIVE1MID0gYDxpbWcgc3JjPScuL2ltYWdlcy9mb3JtYXQtbGlzdC1jaGVja3MucG5nJyBhbHQ9J0ltYWdlIG9mIGNoZWNrbGlzdCc+JHtBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QXRJbmRleChcbiAgICAgICAgaVxuICAgICAgKS5nZXROYW1lKCl9YDtcbiAgICAgIGxvd2VyQnV0dG9uc01haW5MZWZ0LmFwcGVuZENoaWxkKGJ0bik7XG4gICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMucG9wdWxhdGVQcm9qZWN0RGV0YWlscyk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGRlbGV0ZUNoaWxkcmVuKHBhcmVudCkge1xuICAgIHdoaWxlIChwYXJlbnQubGFzdENoaWxkICE9PSBhZGRQcm9qZWN0QnV0dG9uKSB7XG4gICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQocGFyZW50Lmxhc3RDaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHBvcHVsYXRlUHJvamVjdERldGFpbHMoZXZlbnQpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhldmVudC50YXJnZXQuaW5uZXJUZXh0KTtcbiAgICAvL0NoZWNrIHRvIHNlZSBpZiBwcm9qZWN0IGNsaWNrZWQgaXMgZW1wdHkgYW5kIGlmIGl0IGlzIGJyaW5nIHVwIHRoZSBtb2RhbCxcbiAgICAvLyBpZiBpdCBpc24ndCBwb3B1bGF0ZSBtYWluIHJpZ2h0IHdpdGggdGhlIHByb2plY3QncyB0YXNrc1xuICAgIGlmIChcbiAgICAgIEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoZXZlbnQudGFyZ2V0LmlubmVyVGV4dCkuZ2V0VGFza3NDb3VudCgpID09PSAwXG4gICAgKSB7XG4gICAgICBlbXB0eVByb2plY3RNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiZW1wdHktcHJvamVjdC1tb2RhbC12aXNpYmxlXCIpO1xuICAgICAgVUkudG9nZ2xlQmx1cigpO1xuICAgICAgZGVsZXRlUHJvamVjdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIiwgZXZlbnQudGFyZ2V0LmlubmVyVGV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vY2xlYXIgbWFpbi1yaWdodCBkaXNwbGF5IGJlZm9yZSByZW5kZXJpbmcgdGhlIHRhc2tzXG5cbiAgICAgIHdoaWxlIChtYWluUmlnaHQubGFzdENoaWxkKSB7XG4gICAgICAgIG1haW5SaWdodC5yZW1vdmVDaGlsZChtYWluUmlnaHQubGFzdENoaWxkKTtcbiAgICAgIH1cblxuICAgICAgLy9nZW5lcmF0ZSB0aGUgaGVhZGVyIGFuZCBzdW1tYXJ5IHdpdGggbnVtYmVyIG9mIHRhc2tzXG4gICAgICBjb25zdCBoZWFkZXIxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgY29uc3QgdGFza3NDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY29uc3QgdGFza3NIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY29uc3QgdGFza3NIZWFkZXJXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBkaXYudGV4dENvbnRlbnQgPSBcIlRhc2tzIFwiO1xuICAgICAgY29uc3Qgc3Bhbk51bWJlck9mVGFza3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgIGNvbnN0IGltZ1JlZnJlc2ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuXG4gICAgICBoZWFkZXIxLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LXRpdGxlXCIpO1xuICAgICAgaGVhZGVyMS50ZXh0Q29udGVudCA9IGV2ZW50LnRhcmdldC5pbm5lclRleHQ7XG5cbiAgICAgIHRhc2tzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrcy1jb250YWluZXJcIik7XG4gICAgICB0YXNrc0hlYWRlci5jbGFzc0xpc3QuYWRkKFwidGFza3MtaGVhZGVyXCIpO1xuICAgICAgdGFza3NIZWFkZXJXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrcy1oZWFkZXItd3JhcHBlclwiKTtcbiAgICAgIHNwYW5OdW1iZXJPZlRhc2tzLmNsYXNzTGlzdC5hZGQoXCJudW1iZXItb2YtdGFza3NcIik7XG4gICAgICBzcGFuTnVtYmVyT2ZUYXNrcy50ZXh0Q29udGVudCA9IGAoJHtBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKFxuICAgICAgICBldmVudC50YXJnZXQuaW5uZXJUZXh0XG4gICAgICApLmdldFRhc2tzQ291bnQoKX0pYDtcblxuICAgICAgaW1nUmVmcmVzaC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCIuL2ltYWdlcy9yZWZyZXNoLWNpcmNsZS5zdmdcIik7XG4gICAgICBpbWdSZWZyZXNoLnNldEF0dHJpYnV0ZShcImFsdFwiLCBcIkltYWdlIG9mIHJlZnJlc2ggYnV0dG9uXCIpO1xuICAgICAgaW1nUmVmcmVzaC5zZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiwgXCIyNXB4XCIpO1xuICAgICAgaW1nUmVmcmVzaC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBEeW5hbWljRWxlbWVudHMucG9wdWxhdGVQcm9qZWN0RGV0YWlscyhldmVudCk7XG4gICAgICB9KTtcblxuICAgICAgZGl2LmFwcGVuZENoaWxkKHNwYW5OdW1iZXJPZlRhc2tzKTtcbiAgICAgIHRhc2tzSGVhZGVyV3JhcHBlci5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgdGFza3NIZWFkZXJXcmFwcGVyLmFwcGVuZENoaWxkKGltZ1JlZnJlc2gpO1xuICAgICAgdGFza3NIZWFkZXIuYXBwZW5kQ2hpbGQodGFza3NIZWFkZXJXcmFwcGVyKTtcbiAgICAgIHRhc2tzQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tzSGVhZGVyKTtcblxuICAgICAgbWFpblJpZ2h0LmFwcGVuZENoaWxkKGhlYWRlcjEpO1xuICAgICAgbWFpblJpZ2h0LmFwcGVuZENoaWxkKHRhc2tzQ29udGFpbmVyKTtcblxuICAgICAgZm9yIChcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBpIDxcbiAgICAgICAgQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShldmVudC50YXJnZXQuaW5uZXJUZXh0KS5nZXRUYXNrc0NvdW50KCk7XG4gICAgICAgIGkrK1xuICAgICAgKSB7XG4gICAgICAgIGNvbnNvbGUudGFibGUoXG4gICAgICAgICAgQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShldmVudC50YXJnZXQuaW5uZXJUZXh0KS5nZXRUYXNrQnlJbmRleChpKVxuICAgICAgICApO1xuICAgICAgICBjb25zdCByZWd1bGFyVGFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHJlZ3VsYXJUYXNrLmNsYXNzTGlzdC5hZGQoXCJyZWd1bGFyLXRhc2tcIik7XG4gICAgICAgIHJlZ3VsYXJUYXNrLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShldmVudC50YXJnZXQuaW5uZXJUZXh0KS5nZXRUYXNrQnlJbmRleChpKVxuICAgICAgICAgICAgLnByaW9yaXR5XG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHRvRG9OYW1lV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRvRG9OYW1lV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwidG9kby1uYW1lLXdyYXBwZXJcIik7XG4gICAgICAgIGNvbnN0IHRvRG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjb25zdCBzcGFuVGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblxuICAgICAgICBzcGFuVGFza05hbWUudGV4dENvbnRlbnQgPSBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKFxuICAgICAgICAgIGV2ZW50LnRhcmdldC5pbm5lclRleHRcbiAgICAgICAgKS5nZXRUYXNrQnlJbmRleChpKS50aXRsZTtcbiAgICAgICAgc3BhblRhc2tOYW1lLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLW5hbWVcIik7XG4gICAgICAgIHRvRG8uY2xhc3NMaXN0LmFkZChcInRvZG9cIik7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoZXZlbnQudGFyZ2V0LmlubmVyVGV4dCkuZ2V0VGFza0J5SW5kZXgoaSlcbiAgICAgICAgICAgIC5pc0NvbXBsZXRlZFxuICAgICAgICApIHtcbiAgICAgICAgICB0b0RvLmNsYXNzTGlzdC5hZGQoXCJjb21wbGV0ZWRcIik7XG4gICAgICAgIH1cblxuICAgICAgICB0b0RvLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgdG9Eby5jbGFzc0xpc3QudG9nZ2xlKFwiY29tcGxldGVkXCIpO1xuICAgICAgICAgIGxldCBpc1Rhc2tDb21wbGV0ZWQgPSBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKFxuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmlubmVyVGV4dFxuICAgICAgICAgICkuZ2V0VGFza0J5SW5kZXgoaSkuaXNDb21wbGV0ZWQ7XG4gICAgICAgICAgaWYgKGlzVGFza0NvbXBsZXRlZCkge1xuICAgICAgICAgICAgQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShldmVudC50YXJnZXQuaW5uZXJUZXh0KS5nZXRUYXNrQnlJbmRleChcbiAgICAgICAgICAgICAgaVxuICAgICAgICAgICAgKS5pc0NvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKGV2ZW50LnRhcmdldC5pbm5lclRleHQpLmdldFRhc2tCeUluZGV4KFxuICAgICAgICAgICAgICBpXG4gICAgICAgICAgICApLmlzQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRvRG9OYW1lV3JhcHBlci5hcHBlbmRDaGlsZCh0b0RvKTtcbiAgICAgICAgdG9Eb05hbWVXcmFwcGVyLmFwcGVuZENoaWxkKHNwYW5UYXNrTmFtZSk7XG4gICAgICAgIHJlZ3VsYXJUYXNrLmFwcGVuZENoaWxkKHRvRG9OYW1lV3JhcHBlcik7XG4gICAgICAgIHRhc2tzQ29udGFpbmVyLmFwcGVuZChyZWd1bGFyVGFzayk7XG5cbiAgICAgICAgY29uc3QgdG9kb09wdGlvbnNXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdG9kb09wdGlvbnNXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLW9wdGlvbnMtd3JhcHBlclwiKTtcbiAgICAgICAgY29uc3QgdG9kb0RldGFpbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICB0b2RvRGV0YWlscy5jbGFzc0xpc3QuYWRkKFwidG9kby1kZXRhaWxzXCIpO1xuICAgICAgICB0b2RvRGV0YWlscy50ZXh0Q29udGVudCA9IFwiREVUQUlMU1wiO1xuICAgICAgICB0b2RvT3B0aW9uc1dyYXBwZXIuYXBwZW5kQ2hpbGQodG9kb0RldGFpbHMpO1xuICAgICAgICBjb25zdCBzcGFuRHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBzcGFuRHVlRGF0ZS5jbGFzc0xpc3QuYWRkKFwiZHVlLWRhdGVcIik7XG4gICAgICAgIHNwYW5EdWVEYXRlLnRleHRDb250ZW50ID0gQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShcbiAgICAgICAgICBldmVudC50YXJnZXQuaW5uZXJUZXh0XG4gICAgICAgICkuZ2V0VGFza0J5SW5kZXgoaSkuZHVlZGF0ZTtcbiAgICAgICAgdG9kb09wdGlvbnNXcmFwcGVyLmFwcGVuZENoaWxkKHNwYW5EdWVEYXRlKTtcbiAgICAgICAgY29uc3QgaW1nRWRpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgIGltZ0VkaXQuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiLi9pbWFnZXMvcGVuY2lsLWJveC1vdXRsaW5lLnN2Z1wiKTtcbiAgICAgICAgaW1nRWRpdC5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgXCJCdXR0b24gdG8gZWRpdCB0aGUgdGFza1wiKTtcbiAgICAgICAgaW1nRWRpdC5zZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiwgXCIyNXB4XCIpO1xuICAgICAgICB0b2RvT3B0aW9uc1dyYXBwZXIuYXBwZW5kQ2hpbGQoaW1nRWRpdCk7XG4gICAgICAgIGNvbnN0IGltZ0RlbGV0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgIGltZ0RlbGV0ZS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCIuL2ltYWdlcy90cmFzaC1jYW4tb3V0bGluZS5zdmdcIik7XG4gICAgICAgIGltZ0RlbGV0ZS5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgXCJCdXR0b24gdG8gZGVsZXRlIHRoZSB0YXNrXCIpO1xuICAgICAgICBpbWdEZWxldGUuc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIFwiMjVweFwiKTtcbiAgICAgICAgdG9kb09wdGlvbnNXcmFwcGVyLmFwcGVuZENoaWxkKGltZ0RlbGV0ZSk7XG4gICAgICAgIHJlZ3VsYXJUYXNrLmFwcGVuZENoaWxkKHRvZG9PcHRpb25zV3JhcHBlcik7XG5cbiAgICAgICAgLy9UTyBGSU5JU0ggYWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgZWFjaCB0YXNrJ3MgYnV0dG9uc1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVQcm9qZWN0RnJvbVRhc2tNb2RhbCgpIHtcbiAgICAvL3F1ZXJyeSBhbGwgdGhlIG9wdGlvbi52YWx1ZXMgYW5kIGNoZWNrIHRvIHNlZSBpZiB0aGV5IGV4aXN0IGluIEFsbFByb2plY3RzIG9yIHRoZSB2YWx1ZSBpcyBlcXVhbCB0byBkZWxldGVQcm9qZWN0QnV0dG9uLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSwgaWYgdGhlIG9wdGlvbiBpc250IHRoZXJlLCBkZWxldGUgaXRcbiAgICAvLyBkZWxldGVQcm9qZWN0QnV0dG9uLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKTtcbiAgICAvLyBjb25zb2xlLmxvZyhkZWxldGVQcm9qZWN0QnV0dG9uLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSk7XG4gICAgbGV0IHZhbHVlID0gZGVsZXRlUHJvamVjdEJ1dHRvbi5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIik7XG4gICAgY29uc3QgdG9SZW1vdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBzZWxlY3QgPiBbdmFsdWU9XCIke3ZhbHVlfVwiXWApO1xuICAgIC8vIGNvbnNvbGUubG9nKHRvUmVtb3ZlKTtcbiAgICB0b1JlbW92ZS5yZW1vdmUoKTtcbiAgICAvLyAucmVtb3ZlKCk7XG4gIH1cbn1cblxuY2xhc3MgQWxlcnQge1xuICBzdGF0aWMgX2FsZXJ0KG1zZykge1xuICAgIGFsZXJ0KG1zZyk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJIHtcbiAgc3RhdGljIGluaXQoKSB7XG4gICAgdGhpcy5pbml0RGVmYXVsdENvbnRhaW5lcigpO1xuICAgIHRoaXMuYWRkTGlzdGVuZXJzKCk7XG4gICAgLy8gdGhpcy5hZGRUYXNrKCk7XG4gIH1cblxuICBzdGF0aWMgdG9nZ2xlQmx1cigpIHtcbiAgICBjb250ZW50LmNsYXNzTGlzdC50b2dnbGUoXCJibHVyLWNvbnRlbnRcIik7XG4gIH1cblxuICBzdGF0aWMgaW5pdERlZmF1bHRDb250YWluZXIoKSB7XG4gICAgLy9jcmVhdGUgYW4gZW1wdHkgUHJvamVjdCBhbmQgYXBwZW5kIGl0IHRvIHRoZSBQcm9qZWN0c0xpc3RcbiAgICBBbGxQcm9qZWN0cy5hcHBlbmROZXdQcm9qZWN0KG5ldyBQcm9qZWN0KFwiZGVmYXVsdFwiKSk7XG4gIH1cblxuICAvL3RvZG8gZ2F0aGVyIGFsbCBzdGF0aWMgbGlzdGVuZXJzIGluIG9uZSBmdW5jdGlvblxuICBzdGF0aWMgYWRkTGlzdGVuZXJzKCkge1xuICAgIC8vKyBBZGQgVGFzayBidXR0b25cbiAgICBhZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9wZW5UYXNrTW9kYWwpO1xuICAgIHRhc2tNb2RhbENhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbG9zZVRhc2tNb2RhbCk7XG4gICAgdGFza01vZGFsU3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnN1Ym1pdFRhc2spO1xuXG4gICAgLy8rIEFkZCBQcm9qZWN0IGJ1dHRvblxuICAgIGFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub3BlblByb2plY3RNb2RhbCk7XG4gICAgcHJvamVjdE1vZGFsQ2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNsb3NlUHJvamVjdE1vZGFsKTtcbiAgICBwcm9qZWN0TW9kYWxQcm9jZWVkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnN1Ym1pdFByb2plY3QpO1xuXG4gICAgLy9FbXB0eSBQcm9qZWN0IG1vZGFsIGJ1dHRvbnNcbiAgICBva0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbG9zZUVtcHR5UHJvamVjdE1vZGFsKTtcbiAgICBkZWxldGVQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmRlbGV0ZUVtcHR5UHJvamVjdCk7XG4gIH1cbiAgLy9FdmVudCBsaXN0ZW5lcnMgZm9yIHRoZSBob21lcGFnZSBhbmQgYWxsIG9mIHRoZSBtb2RhbHNcblxuICBzdGF0aWMgY2xvc2VUYXNrTW9kYWwoKSB7XG4gICAgdGFza01vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJhZGQtdGFzay1tb2RhbC12aXNpYmxlXCIpO1xuICAgIFVJLnRvZ2dsZUJsdXIoKTtcbiAgfVxuXG4gIHN0YXRpYyBvcGVuVGFza01vZGFsKCkge1xuICAgIHRhc2tNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiYWRkLXRhc2stbW9kYWwtdmlzaWJsZVwiKTtcbiAgICAvL2NsZWFyIGZpcnN0IHR3byBmaWVsZHMgZnJvbSBwcmV2aW91c2x5IGFkZGVkIHRhc2tcbiAgICB0YXNrVGl0bGUudmFsdWUgPSBcIlwiO1xuICAgIHRhc2tEZXNjcmlwdGlvbi52YWx1ZSA9IFwiXCI7XG4gICAgVUkudG9nZ2xlQmx1cigpO1xuICAgIC8vIGNvbnNvbGUudGFibGUoQWxsUHJvamVjdHMuZ2V0UHJvamVjdHMoKSk7XG4gIH1cblxuICBzdGF0aWMgc3VibWl0VGFzaygpIHtcbiAgICBpZiAodGFza0R1ZURhdGUudmFsdWUgJiYgdGFza1RpdGxlLnZhbHVlKSB7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKHRhc2tQcmlvcml0eS52YWx1ZSk7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKHRhc2tBc3NpZ25Ub1Byb2plY3QudmFsdWUpO1xuICAgICAgLy8gICBjb25zb2xlLmxvZyh0YXNrRGVzY3JpcHRpb24udmFsdWUpO1xuXG4gICAgICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2soXG4gICAgICAgIHRhc2tUaXRsZS52YWx1ZSxcbiAgICAgICAgdGFza1ByaW9yaXR5LnZhbHVlLFxuICAgICAgICB0YXNrRGVzY3JpcHRpb24udmFsdWUsXG4gICAgICAgIHRhc2tEdWVEYXRlLnZhbHVlXG4gICAgICApO1xuICAgICAgQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZSh0YXNrQXNzaWduVG9Qcm9qZWN0LnZhbHVlKS5hZGROZXdUYXNrKFxuICAgICAgICBuZXdUYXNrXG4gICAgICApO1xuICAgICAgVUkuY2xvc2VUYXNrTW9kYWwoKTtcbiAgICAgIC8vICAgY29uc29sZS5sb2codGFza0Fzc2lnblRvUHJvamVjdC52YWx1ZSk7XG4gICAgICAvLyAgICAgY29uc29sZS50YWJsZShcbiAgICAgIC8vICAgICAgIEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUodGFza0Fzc2lnblRvUHJvamVjdC52YWx1ZSkuZ2V0VGFza3MoKVxuICAgICAgLy8gICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIEFsZXJ0Ll9hbGVydChcIlRpdGxlIGFuZCBEdWUgRGF0ZSBhcmUgbWFuZGF0b3J5XCIpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBvcGVuUHJvamVjdE1vZGFsKCkge1xuICAgIHByb2plY3RUaXRsZS52YWx1ZSA9IFwiXCI7XG4gICAgcHJvamVjdE1vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJhZGQtcHJvamVjdC1tb2RhbC12aXNpYmxlXCIpO1xuICAgIFVJLnRvZ2dsZUJsdXIoKTtcbiAgfVxuXG4gIHN0YXRpYyBjbG9zZVByb2plY3RNb2RhbCgpIHtcbiAgICBwcm9qZWN0TW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImFkZC1wcm9qZWN0LW1vZGFsLXZpc2libGVcIik7XG4gICAgVUkudG9nZ2xlQmx1cigpO1xuICB9XG5cbiAgc3RhdGljIHN1Ym1pdFByb2plY3QoKSB7XG4gICAgaWYgKHByb2plY3RUaXRsZS52YWx1ZSkge1xuICAgICAgQWxsUHJvamVjdHMuYXBwZW5kTmV3UHJvamVjdChuZXcgUHJvamVjdChwcm9qZWN0VGl0bGUudmFsdWUpKTtcbiAgICAgIFVJLmNsb3NlUHJvamVjdE1vZGFsKCk7XG4gICAgICBEeW5hbWljRWxlbWVudHMubmV3UHJvamVjdEFkZGVkKHByb2plY3RUaXRsZS52YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIEFsZXJ0Ll9hbGVydChcIlRpdGxlIGNhbm5vdCBiZSBlbXB0eVwiKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgY2xvc2VFbXB0eVByb2plY3RNb2RhbCgpIHtcbiAgICBlbXB0eVByb2plY3RNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiZW1wdHktcHJvamVjdC1tb2RhbC12aXNpYmxlXCIpO1xuICAgIFVJLnRvZ2dsZUJsdXIoKTtcbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVFbXB0eVByb2plY3QoKSB7XG4gICAgQWxsUHJvamVjdHMuZGVsZXRlUHJvamVjdChkZWxldGVQcm9qZWN0QnV0dG9uLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSk7XG4gICAgRHluYW1pY0VsZW1lbnRzLnVwZGF0ZUxlZnROYXYoKTtcbiAgICBEeW5hbWljRWxlbWVudHMuZGVsZXRlUHJvamVjdEZyb21UYXNrTW9kYWwoKTtcbiAgICBVSS5jbG9zZUVtcHR5UHJvamVjdE1vZGFsKCk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3Qge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnRhc2tzID0gW107XG4gIH1cblxuICAvLyBnZXQgbmFtZSgpIHtcbiAgLy8gICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgLy8gfVxuXG4gIC8vIHNldCBuYW1lKHZhbHVlKSB7XG4gIC8vICAgaWYgKHZhbHVlLmxlbmd0aCA8IDEpIHtcbiAgLy8gICAgIGFsZXJ0KFwiUHJvamVjdCdzIG5hbWUgY2Fubm90IGJlIGVtcHR5LlwiKTtcbiAgLy8gICAgIHJldHVybjtcbiAgLy8gICB9XG4gIC8vICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xuICAvLyB9XG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIHNldE5hbWUobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gIH1cblxuICBnZXRUYXNrQnlJbmRleChpbmRleCkge1xuICAgIHJldHVybiB0aGlzLnRhc2tzW2luZGV4XTtcbiAgfVxuXG4gIGdldFRhc2tzKCkge1xuICAgIHJldHVybiB0aGlzLnRhc2tzO1xuICB9XG5cbiAgZ2V0VGFza3NDb3VudCgpIHtcbiAgICByZXR1cm4gdGhpcy50YXNrcy5sZW5ndGg7XG4gIH1cblxuICBhZGROZXdUYXNrKHRhc2spIHtcbiAgICB0aGlzLnRhc2tzLnB1c2godGFzayk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFsbFByb2plY3RzIHtcbiAgc3RhdGljIHByb2plY3RzID0gW107XG5cbiAgc3RhdGljIGdldFByb2plY3RzKCkge1xuICAgIHJldHVybiB0aGlzLnByb2plY3RzO1xuICB9XG5cbiAgc3RhdGljIGdldFByb2plY3RzQ291bnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdHMubGVuZ3RoO1xuICB9XG5cbiAgc3RhdGljIGdldFByb2plY3RBdEluZGV4KGluZGV4KSB7XG4gICAgaWYgKGluZGV4IDwgdGhpcy5wcm9qZWN0cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb2plY3RzW2luZGV4XTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0UHJvamVjdEJ5TmFtZShwcm9qZWN0TmFtZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMucHJvamVjdHNbaV0ubmFtZSA9PT0gcHJvamVjdE5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvamVjdHNbaV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGFwcGVuZE5ld1Byb2plY3QoUHJvamVjdCkge1xuICAgIGlmIChQcm9qZWN0Lm5hbWUpIHtcbiAgICAgIHRoaXMucHJvamVjdHMucHVzaChQcm9qZWN0KTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlUHJvamVjdChwcm9qZWN0TmFtZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5nZXRQcm9qZWN0c0NvdW50KCk7IGkrKykge1xuICAgICAgaWYgKHRoaXMucHJvamVjdHNbaV0ubmFtZSA9PT0gcHJvamVjdE5hbWUpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIHtcbiAgY29uc3RydWN0b3IobmFtZSwgcHJpbywgZGVzYywgZHVlZGF0ZSkge1xuICAgIHRoaXMudGl0bGUgPSBuYW1lO1xuICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjO1xuICAgIHRoaXMuZHVlZGF0ZSA9IGR1ZWRhdGU7XG4gICAgdGhpcy5pc0NvbXBsZXRlZCA9IGZhbHNlO1xuICB9XG5cbiAgLy8gZ2V0IG5hbWUoKSB7XG4gIC8vICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIC8vIH1cblxuICAvLyBzZXQgbmFtZSh2YWx1ZSkge1xuICAvLyAgIGlmICh2YWx1ZS5sZW5ndGggPCAxKSB7XG4gIC8vICAgICBhbGVydChcIlRhc2sncyBuYW1lIGNhbm5vdCBiZSBlbXB0eS5cIik7XG4gIC8vICAgICByZXR1cm47XG4gIC8vICAgfVxuICAvLyAgIHRoaXMuX25hbWUgPSB2YWx1ZTtcbiAgLy8gfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0XCI7XG5pbXBvcnQgQWxsUHJvamVjdHMgZnJvbSBcIi4vcHJvamVjdHMtbGlzdFwiO1xuaW1wb3J0IFRhc2sgZnJvbSBcIi4vdGFza1wiO1xuaW1wb3J0IFVJIGZyb20gXCIuL2RvbVwiO1xuXG5VSS5pbml0KCk7XG5cbi8vIGFkZFByb2plY3QoQWxsUHJvamVjdHMpO1xuLy8gY29uc3QgZm9vdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb290ZXJcIik7XG5cbi8vIGZvb3Rlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuLy8gICAgIGNvbnN0IHNvbWVUYXNrID0gbmV3IFRhc2soXCJQcm9iYVwiLCBcImxvd1wiLCBcIlNvbWUgc3R1cGlkIHNoaXRcIiwgXCIzMC4xMS4yMDIyXCIpO1xuLy8gICAgIGNvbnN0IHByb2ogPSBuZXcgUHJvamVjdChcIkx1ZG5pY2hrYVwiKTtcbi8vICAgICBwcm9qLmFkZE5ld1Rhc2soc29tZVRhc2spO1xuLy8gICAgIGNvbnNvbGUubG9nKHByb2ouZ2V0VGFza3MoKSk7XG4vLyB9KVxuXG5cblxuXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==