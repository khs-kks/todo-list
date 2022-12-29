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
    }
  }

  static deleteChildren(parent) {
    while (parent.lastChild !== addProjectButton) {
      parent.removeChild(parent.lastChild);
    }
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
    addTaskButton.addEventListener("click", this.openTaskModal);
    taskModalCancelBtn.addEventListener("click", this.closeTaskModal);
    taskModalSubmitBtn.addEventListener("click", this.submitTask);

    //+ Add Project button
    addProjectButton.addEventListener("click", this.openProjectModal);
    projectModalCancelBtn.addEventListener("click", this.closeProjectModal);
    projectModalProceedBtn.addEventListener("click", this.submitProject);
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
    this.completed = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3RzLWxpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9qZWN0IGZyb20gXCIuL3Byb2plY3RcIjtcbmltcG9ydCBBbGxQcm9qZWN0cyBmcm9tIFwiLi9wcm9qZWN0cy1saXN0XCI7XG5pbXBvcnQgVGFzayBmcm9tIFwiLi90YXNrXCI7XG5cbi8vcXVlcnkgYWxsIHRoZSBtb2RhbCBlbGVtZW50c1xuY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGVudFwiKTtcbmNvbnN0IGxvd2VyQnV0dG9uc01haW5MZWZ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb3dlci1idXR0b25zXCIpO1xuXG4vL25ldyBwcm9qZWN0IG1vZGFsXG5jb25zdCBwcm9qZWN0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0LW1vZGFsXCIpO1xuY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LXRpdGxlLWZvcm1cIik7XG5jb25zdCBwcm9qZWN0TW9kYWxDYW5jZWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICBcIi5jYW5jZWwtcHJvamVjdC1jcmVhdGlvblwiXG4pO1xuY29uc3QgcHJvamVjdE1vZGFsUHJvY2VlZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gIFwiLnByb2NlZWQtcHJvamVjdC1jcmVhdGlvblwiXG4pO1xuXG4vL3Rhc2sgY3JlYXRpb24gbW9kYWxcbmNvbnN0IHRhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2stbW9kYWxcIik7XG5jb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stdGl0bGUtZm9ybVwiKTtcbmNvbnN0IHRhc2tEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kZXNjcmlwdGlvblwiKTtcbmNvbnN0IHRhc2tEdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWR1ZS1kYXRlXCIpO1xuY29uc3QgdGFza1ByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNQcmlvcml0eVwiKTtcbmNvbnN0IHRhc2tBc3NpZ25Ub1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3QtdG8tYWRkLXRvXCIpO1xuY29uc3QgdGFza01vZGFsQ2FuY2VsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgXCIuYWRkLXRhc2stbW9kYWwtYnV0dG9ucy1jYW5jZWxcIlxuKTtcbmNvbnN0IHRhc2tNb2RhbFN1Ym1pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gIFwiLmFkZC10YXNrLW1vZGFsLWJ1dHRvbnMtYWRkXCJcbik7XG5cbi8vdGFzayBkZXRhaWxzIG1vZGFsXG5jb25zdCB0YXNrRGV0YWlsc0luZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGV0YWlscy1pbmZvXCIpO1xuY29uc3QgdGFza0RldGFpbHNEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gIFwiLnRhc2stZGV0YWlscy1kZXNjcmlwdGlvblwiXG4pO1xuY29uc3QgdGFza0RldGFpbHNEdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWRldGFpbHMtZHVlZGF0ZVwiKTtcbmNvbnN0IHRhc2tEZXRhaWxzUHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGV0YWlscy1wcmlvcml0eVwiKTtcbmNvbnN0IHRhc2tEZXRhaWxzUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1kZXRhaWxzLXByb2plY3RcIik7XG5cbi8vbGVmdCBuYXYgYmFyIHN0YXRpYyBidXR0b25zXG5cbmNvbnN0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrXCIpO1xuY29uc3QgYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXByb2plY3RcIik7XG5jb25zdCBkZWZhdWx0Q29udGFpbmVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZWZhdWx0LXByb2plY3RcIik7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmNsYXNzIER5bmFtaWNFbGVtZW50cyB7XG4gIHN0YXRpYyBuZXdQcm9qZWN0QWRkZWQocHJvamVjdFRpdGxlKSB7XG4gICAgdGhpcy51cGRhdGVUYXNrTW9kYWwocHJvamVjdFRpdGxlKTtcbiAgICB0aGlzLnVwZGF0ZUxlZnROYXYoKTtcbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVUYXNrTW9kYWwocHJvamVjdFRpdGxlKSB7XG4gICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICBvcHRpb24udGV4dENvbnRlbnQgPSBwcm9qZWN0VGl0bGU7XG4gICAgb3B0aW9uLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIHByb2plY3RUaXRsZS50b0xvd2VyQ2FzZSgpKTtcbiAgICB0YXNrQXNzaWduVG9Qcm9qZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlTGVmdE5hdigpIHtcblxuICAgIHRoaXMuZGVsZXRlQ2hpbGRyZW4obG93ZXJCdXR0b25zTWFpbkxlZnQpO1xuXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0c0NvdW50KCk7IGkrKykge1xuICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwicHJvamVjdHNcIik7XG4gICAgICBidG4uaW5uZXJIVE1MID0gYDxpbWcgc3JjPScuL2ltYWdlcy9mb3JtYXQtbGlzdC1jaGVja3MucG5nJyBhbHQ9J0ltYWdlIG9mIGNoZWNrbGlzdCc+JHtBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QXRJbmRleChcbiAgICAgICAgaVxuICAgICAgKS5nZXROYW1lKCl9YDtcbiAgICAgIGxvd2VyQnV0dG9uc01haW5MZWZ0LmFwcGVuZENoaWxkKGJ0bik7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGRlbGV0ZUNoaWxkcmVuKHBhcmVudCkge1xuICAgIHdoaWxlIChwYXJlbnQubGFzdENoaWxkICE9PSBhZGRQcm9qZWN0QnV0dG9uKSB7XG4gICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQocGFyZW50Lmxhc3RDaGlsZCk7XG4gICAgfVxuICB9XG59XG5cbmNsYXNzIEFsZXJ0IHtcbiAgc3RhdGljIF9hbGVydChtc2cpIHtcbiAgICBhbGVydChtc2cpO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSSB7XG4gIHN0YXRpYyBpbml0KCkge1xuICAgIHRoaXMuaW5pdERlZmF1bHRDb250YWluZXIoKTtcbiAgICB0aGlzLmFkZExpc3RlbmVycygpO1xuICAgIC8vIHRoaXMuYWRkVGFzaygpO1xuICB9XG5cbiAgc3RhdGljIHRvZ2dsZUJsdXIoKSB7XG4gICAgY29udGVudC5jbGFzc0xpc3QudG9nZ2xlKFwiYmx1ci1jb250ZW50XCIpO1xuICB9XG5cbiAgc3RhdGljIGluaXREZWZhdWx0Q29udGFpbmVyKCkge1xuICAgIC8vY3JlYXRlIGFuIGVtcHR5IFByb2plY3QgYW5kIGFwcGVuZCBpdCB0byB0aGUgUHJvamVjdHNMaXN0XG4gICAgQWxsUHJvamVjdHMuYXBwZW5kTmV3UHJvamVjdChuZXcgUHJvamVjdChcImRlZmF1bHRcIikpO1xuICB9XG5cbiAgLy90b2RvIGdhdGhlciBhbGwgc3RhdGljIGxpc3RlbmVycyBpbiBvbmUgZnVuY3Rpb25cbiAgc3RhdGljIGFkZExpc3RlbmVycygpIHtcbiAgICBhZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9wZW5UYXNrTW9kYWwpO1xuICAgIHRhc2tNb2RhbENhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbG9zZVRhc2tNb2RhbCk7XG4gICAgdGFza01vZGFsU3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnN1Ym1pdFRhc2spO1xuXG4gICAgLy8rIEFkZCBQcm9qZWN0IGJ1dHRvblxuICAgIGFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub3BlblByb2plY3RNb2RhbCk7XG4gICAgcHJvamVjdE1vZGFsQ2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNsb3NlUHJvamVjdE1vZGFsKTtcbiAgICBwcm9qZWN0TW9kYWxQcm9jZWVkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnN1Ym1pdFByb2plY3QpO1xuICB9XG4gIC8vRXZlbnQgbGlzdGVuZXJzIGZvciB0aGUgaG9tZXBhZ2UgYW5kIGFsbCBvZiB0aGUgbW9kYWxzXG5cbiAgc3RhdGljIGNsb3NlVGFza01vZGFsKCkge1xuICAgIHRhc2tNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiYWRkLXRhc2stbW9kYWwtdmlzaWJsZVwiKTtcbiAgICBVSS50b2dnbGVCbHVyKCk7XG4gIH1cblxuICBzdGF0aWMgb3BlblRhc2tNb2RhbCgpIHtcbiAgICB0YXNrTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImFkZC10YXNrLW1vZGFsLXZpc2libGVcIik7XG4gICAgLy9jbGVhciBmaXJzdCB0d28gZmllbGRzIGZyb20gcHJldmlvdXNseSBhZGRlZCB0YXNrXG4gICAgdGFza1RpdGxlLnZhbHVlID0gXCJcIjtcbiAgICB0YXNrRGVzY3JpcHRpb24udmFsdWUgPSBcIlwiO1xuICAgIFVJLnRvZ2dsZUJsdXIoKTtcbiAgICAvLyBjb25zb2xlLnRhYmxlKEFsbFByb2plY3RzLmdldFByb2plY3RzKCkpO1xuICB9XG5cbiAgc3RhdGljIHN1Ym1pdFRhc2soKSB7XG4gICAgaWYgKHRhc2tEdWVEYXRlLnZhbHVlICYmIHRhc2tUaXRsZS52YWx1ZSkge1xuICAgICAgLy8gICBjb25zb2xlLmxvZyh0YXNrUHJpb3JpdHkudmFsdWUpO1xuICAgICAgLy8gICBjb25zb2xlLmxvZyh0YXNrQXNzaWduVG9Qcm9qZWN0LnZhbHVlKTtcbiAgICAgIC8vICAgY29uc29sZS5sb2codGFza0Rlc2NyaXB0aW9uLnZhbHVlKTtcblxuICAgICAgY29uc3QgbmV3VGFzayA9IG5ldyBUYXNrKFxuICAgICAgICB0YXNrVGl0bGUudmFsdWUsXG4gICAgICAgIHRhc2tQcmlvcml0eS52YWx1ZSxcbiAgICAgICAgdGFza0Rlc2NyaXB0aW9uLnZhbHVlLFxuICAgICAgICB0YXNrRHVlRGF0ZS52YWx1ZVxuICAgICAgKTtcbiAgICAgIEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUodGFza0Fzc2lnblRvUHJvamVjdC52YWx1ZSkuYWRkTmV3VGFzayhcbiAgICAgICAgbmV3VGFza1xuICAgICAgKTtcbiAgICAgIFVJLmNsb3NlVGFza01vZGFsKCk7XG4gICAgLy8gICBjb25zb2xlLmxvZyh0YXNrQXNzaWduVG9Qcm9qZWN0LnZhbHVlKTtcbiAgICAvLyAgICAgY29uc29sZS50YWJsZShcbiAgICAvLyAgICAgICBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKHRhc2tBc3NpZ25Ub1Byb2plY3QudmFsdWUpLmdldFRhc2tzKClcbiAgICAvLyAgICAgKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICBBbGVydC5fYWxlcnQoXCJUaXRsZSBhbmQgRHVlIERhdGUgYXJlIG1hbmRhdG9yeVwiKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgb3BlblByb2plY3RNb2RhbCgpIHtcbiAgICBwcm9qZWN0VGl0bGUudmFsdWUgPSBcIlwiO1xuICAgIHByb2plY3RNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiYWRkLXByb2plY3QtbW9kYWwtdmlzaWJsZVwiKTtcbiAgICBVSS50b2dnbGVCbHVyKCk7XG4gIH1cblxuICBzdGF0aWMgY2xvc2VQcm9qZWN0TW9kYWwoKSB7XG4gICAgcHJvamVjdE1vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJhZGQtcHJvamVjdC1tb2RhbC12aXNpYmxlXCIpO1xuICAgIFVJLnRvZ2dsZUJsdXIoKTtcbiAgfVxuXG4gIHN0YXRpYyBzdWJtaXRQcm9qZWN0KCkge1xuICAgIGlmIChwcm9qZWN0VGl0bGUudmFsdWUpIHtcbiAgICAgIEFsbFByb2plY3RzLmFwcGVuZE5ld1Byb2plY3QobmV3IFByb2plY3QocHJvamVjdFRpdGxlLnZhbHVlKSk7XG4gICAgICBVSS5jbG9zZVByb2plY3RNb2RhbCgpO1xuICAgICAgRHluYW1pY0VsZW1lbnRzLm5ld1Byb2plY3RBZGRlZChwcm9qZWN0VGl0bGUudmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBBbGVydC5fYWxlcnQoXCJUaXRsZSBjYW5ub3QgYmUgZW1wdHlcIik7XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy50YXNrcyA9IFtdO1xuICB9XG5cbiAgLy8gZ2V0IG5hbWUoKSB7XG4gIC8vICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIC8vIH1cblxuICAvLyBzZXQgbmFtZSh2YWx1ZSkge1xuICAvLyAgIGlmICh2YWx1ZS5sZW5ndGggPCAxKSB7XG4gIC8vICAgICBhbGVydChcIlByb2plY3QncyBuYW1lIGNhbm5vdCBiZSBlbXB0eS5cIik7XG4gIC8vICAgICByZXR1cm47XG4gIC8vICAgfVxuICAvLyAgIHRoaXMuX25hbWUgPSB2YWx1ZTtcbiAgLy8gfVxuICBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWU7XG4gIH1cblxuICBzZXROYW1lKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICB9XG5cbiAgZ2V0VGFza3MoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFza3M7XG4gIH1cblxuICBnZXRUYXNrc0NvdW50KCkge1xuICAgIHJldHVybiB0aGlzLnRhc2tzLmxlbmd0aDtcbiAgfVxuXG4gIGFkZE5ld1Rhc2sodGFzaykge1xuICAgIHRoaXMudGFza3MucHVzaCh0YXNrKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWxsUHJvamVjdHMge1xuICBzdGF0aWMgcHJvamVjdHMgPSBbXTtcblxuICBzdGF0aWMgZ2V0UHJvamVjdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdHM7XG4gIH1cblxuICBzdGF0aWMgZ2V0UHJvamVjdHNDb3VudCgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5sZW5ndGg7XG4gIH1cblxuICBzdGF0aWMgZ2V0UHJvamVjdEF0SW5kZXgoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPCB0aGlzLnByb2plY3RzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvamVjdHNbaW5kZXhdO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRQcm9qZWN0QnlOYW1lKHByb2plY3ROYW1lKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5wcm9qZWN0c1tpXS5uYW1lID09PSBwcm9qZWN0TmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0c1tpXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYXBwZW5kTmV3UHJvamVjdChQcm9qZWN0KSB7XG4gICAgaWYgKFByb2plY3QubmFtZSkge1xuICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKFByb2plY3QpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVQcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmdldFByb2plY3RzQ291bnQoKTsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5wcm9qZWN0c1tpXS5uYW1lID09PSBwcm9qZWN0TmFtZSkge1xuICAgICAgICB0aGlzLnByb2plY3RzLnNwbGljZShpLCAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBwcmlvLCBkZXNjLCBkdWVkYXRlKSB7XG4gICAgdGhpcy50aXRsZSA9IG5hbWU7XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW87XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2M7XG4gICAgdGhpcy5kdWVkYXRlID0gZHVlZGF0ZTtcbiAgICB0aGlzLmNvbXBsZXRlZCA9IGZhbHNlO1xuICB9XG5cbiAgLy8gZ2V0IG5hbWUoKSB7XG4gIC8vICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIC8vIH1cblxuICAvLyBzZXQgbmFtZSh2YWx1ZSkge1xuICAvLyAgIGlmICh2YWx1ZS5sZW5ndGggPCAxKSB7XG4gIC8vICAgICBhbGVydChcIlRhc2sncyBuYW1lIGNhbm5vdCBiZSBlbXB0eS5cIik7XG4gIC8vICAgICByZXR1cm47XG4gIC8vICAgfVxuICAvLyAgIHRoaXMuX25hbWUgPSB2YWx1ZTtcbiAgLy8gfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0XCI7XG5pbXBvcnQgQWxsUHJvamVjdHMgZnJvbSBcIi4vcHJvamVjdHMtbGlzdFwiO1xuaW1wb3J0IFRhc2sgZnJvbSBcIi4vdGFza1wiO1xuaW1wb3J0IFVJIGZyb20gXCIuL2RvbVwiO1xuXG5VSS5pbml0KCk7XG5cbi8vIGFkZFByb2plY3QoQWxsUHJvamVjdHMpO1xuLy8gY29uc3QgZm9vdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb290ZXJcIik7XG5cbi8vIGZvb3Rlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuLy8gICAgIGNvbnN0IHNvbWVUYXNrID0gbmV3IFRhc2soXCJQcm9iYVwiLCBcImxvd1wiLCBcIlNvbWUgc3R1cGlkIHNoaXRcIiwgXCIzMC4xMS4yMDIyXCIpO1xuLy8gICAgIGNvbnN0IHByb2ogPSBuZXcgUHJvamVjdChcIkx1ZG5pY2hrYVwiKTtcbi8vICAgICBwcm9qLmFkZE5ld1Rhc2soc29tZVRhc2spO1xuLy8gICAgIGNvbnNvbGUubG9nKHByb2ouZ2V0VGFza3MoKSk7XG4vLyB9KVxuXG5cblxuXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==