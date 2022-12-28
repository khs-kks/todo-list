/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOM-add-project.js":
/*!********************************!*\
  !*** ./src/DOM-add-project.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addProject)
/* harmony export */ });
/* harmony import */ var _class_project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class-project */ "./src/class-project.js");
/* harmony import */ var _class_projects_holder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./class-projects-holder */ "./src/class-projects-holder.js");
/* harmony import */ var _class_task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./class-task */ "./src/class-task.js");




function addProject(projectsList) {
  let addProjectButton = document.querySelector(".add-project");
  let closeButton = document.querySelector(".cancel-project-creation");
  let addButton = document.querySelector(".proceed-project-creation");

  addProjectButton.addEventListener("click", () => {
    toggleProjectCreationModal();
  });

  addButton.addEventListener("click", () => {
    if (document.querySelector("#project-title-form").value) {
      const creatingProject = new _class_project__WEBPACK_IMPORTED_MODULE_0__["default"](
        document.querySelector("#project-title-form").value
      );
      projectsList.appendNewProject(creatingProject);
      toggleProjectCreationModal();
      updateLeftNav(projectsList);
    } else {
      alert("Title cannot be empty!");
    }
  });

  closeButton.addEventListener("click", () => {
    toggleProjectCreationModal();
    updateLeftNav(projectsList);
  });
}

function toggleProjectCreationModal() {
  document.querySelector("#project-title-form").value = "";
  document.querySelector("#content").classList.toggle("blur-content");
  document
    .querySelector(".add-project-modal")
    .classList.toggle("add-project-modal-visible");
}

function updateLeftNav(projectsList) {
  //First delete every project but the + Add project button
  let projectsDisplay = document.querySelector(".lower-buttons");
  let addButton = document.querySelector(".add-project");

  while (projectsDisplay.lastChild !== addButton) {
    projectsDisplay.removeChild(projectsDisplay.lastChild);
  }

  //Then Populate the nav with the existing projects

  for (let i = 0; i < projectsList.getProjectsCount(); i += 1) {
    const btn = document.createElement("button");
    btn.classList.add("projects");
    btn.setAttribute("data-project", projectsList.getProjectAtIndex(i).name);
    const divider = document.createElement("span");
    divider.classList.add("divider");

    divider.innerHTML = `<img src='./images/format-list-checks.png' alt='Image of checklist'>${
      projectsList.getProjectAtIndex(i).name
    }`;

    const taskCount = document.createElement("span");
    taskCount.classList.add("task-count");
    taskCount.textContent = projectsList.getProjectAtIndex(i).getTasksCount();

    btn.appendChild(divider);
    btn.appendChild(taskCount);
    projectsDisplay.appendChild(btn);

    //Add event listener to each project's button on the left nav bar

    btn.addEventListener("click", () => {
      if (projectsList.getProjectAtIndex(i).getTasksCount() === 0) {
        updateRightMainEmptyProject(btn);
      } else {
        updateRightMainProjectWithTasks(btn);
      }
    });
  }
}

function updateRightMainEmptyProject(btn) {
  let mainRight = document.querySelector(".main-right");

  deleteChildren(mainRight);

  let div = document.createElement("div");
  div.classList.add("empty-project");

  let h1 = document.createElement("h1");
  h1.textContent = "Empty Project!";

  let p = document.createElement("p");
  p.textContent = "Create a new to-do item or delete the project";

  let divButtons = document.createElement("div");
  divButtons.classList.add("empty-project-buttons");

  let addButton = document.createElement("button");
  addButton.classList.add("add-todo");
  addButton.textContent = "ADD TO-DO";
  addButton.setAttribute("data-project", btn.getAttribute("data-project"));

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-project");
  deleteButton.textContent = "DELETE PROJECT";
  deleteButton.setAttribute("data-project", btn.getAttribute("data-project"));

  divButtons.appendChild(addButton);
  divButtons.appendChild(deleteButton);

  div.appendChild(h1);
  div.appendChild(p);
  div.appendChild(divButtons);

  mainRight.appendChild(div);

  //Add event listeners for delete project button

  deleteButton.addEventListener("click", () => {
    _class_projects_holder__WEBPACK_IMPORTED_MODULE_1__["default"].deleteProject(deleteButton.getAttribute("data-project"));
    updateLeftNav(_class_projects_holder__WEBPACK_IMPORTED_MODULE_1__["default"]);
    deleteChildren(mainRight);
  });

  //TODO Add event listeners for add todo project button
  addButton.addEventListener("click", () => {
    toggleTaskCreationModal(addButton.getAttribute("data-project"));
  });
}

function toggleTaskCreationModal(project) {
  document.querySelector("#task-title-form").value = "";
  document.querySelector("#task-description").value = "";
  document.querySelector("#content").classList.toggle("blur-content");
  document
    .querySelector(".add-task-modal")
    .classList.toggle("add-task-modal-visible");
  if (
    document
      .querySelector(".add-task-modal")
      .classList.contains("add-task-modal-visible")
  ) {
    let buttonCancel = document.querySelector(".add-task-modal-buttons-cancel");
    let buttonAdd = document.querySelector(".add-task-modal-buttons-add");

    buttonCancel.addEventListener("click", () => {
      toggleTaskCreationModal(project);
    });

    buttonAdd.addEventListener("click", () => {
      addTaskToProject(project);
    });
  } else {
    updateRightMainProjectWithTasks(project);
  }
}

function addTaskToProject(projectName) {
  const title = document.querySelector("#task-title-form").value;
  const description = document.querySelector("#task-description").value;
  const prio = document.querySelector("#Priority").value;
  const duedate = document.querySelector("#task-due-date").value;

  const newTask = new _class_task__WEBPACK_IMPORTED_MODULE_2__["default"](title, prio, description, duedate);

  _class_projects_holder__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectByName(projectName).addNewTask(newTask);
  updateLeftNav(_class_projects_holder__WEBPACK_IMPORTED_MODULE_1__["default"]);

  toggleTaskCreationModal(projectName);
}

function deleteChildren(parent) {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
}

function updateRightMainProjectWithTasks(btn) {
  let mainRight = document.querySelector(".main-right");
  deleteChildren(mainRight);

  const projectTitle = document.createElement("h1");
  projectTitle.classList.add("project-title");
  projectTitle.textContent = btn.getAttribute("data-project");

  const tasksContainer = document.createElement("div");
  tasksContainer.classList.add("tasks-container");

  const tasksHeader = document.createElement("div");
  tasksHeader.classList.add("tasks-header");

  const tasksHeaderWrapper = document.createElement("div");
  tasksHeaderWrapper.classList.add("tasks-header-wrapper");

  const div = document.createElement("div");
  div.textContent = "Tasks";

  const spanNumberOfTasks = document.createElement("span");
  spanNumberOfTasks.classList.add("number-of-tasks");
  spanNumberOfTasks.textContent = `(${_class_projects_holder__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectByName(
    btn.getAttribute("data-project")
  ).getTasksCount()})`;

  div.appendChild(spanNumberOfTasks);

  const div2 = document.createElement("div");
  div2.classList.add("add-a-task");

  const spanPlus = document.createElement("span");
  spanPlus.classList.add("plus");
  spanPlus.textContent = "+";

  const spanAddTask = document.createElement("span");
  spanAddTask.textContent = "Add a task";

  div2.appendChild(spanPlus);
  div2.appendChild(spanAddTask);

  tasksHeaderWrapper.appendChild(div);
  tasksHeaderWrapper.appendChild(div2);

  tasksHeader.appendChild(tasksHeaderWrapper);

  tasksContainer.appendChild(tasksHeader);
  mainRight.appendChild(tasksContainer);
  //TODO: Add the logic to display current tasks
}


/***/ }),

/***/ "./src/class-project.js":
/*!******************************!*\
  !*** ./src/class-project.js ***!
  \******************************/
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

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 1) {
      alert("Project's name cannot be empty.");
      return;
    }
    this._name = value;
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

/***/ "./src/class-projects-holder.js":
/*!**************************************!*\
  !*** ./src/class-projects-holder.js ***!
  \**************************************/
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
    if (index < this.getProjectsCount()) {
      return this.projects[index];
    }
  }

  static getProjectByName(projectName) {
    for(let i = 0; i < this.getProjectsCount(); i+=1) {
        if (this.getProjects()[i].name === projectName) {
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
    this.projects = this.projects.filter(function (obj, index, arr) {
      return obj.name !== projectName;
    });
  }

  //   constructor() {
  //     this.projects = [];
  //   }

  //   getProjects() {
  //     return this.projects;
  //   }

  //   getProjectsCount() {
  //     return this.projects.length;
  //   }

  //   getProjectAtIndex(index) {
  //     if (index < this.getProjectsCount()) {
  //       return this.projects[index];
  //     }
  //   }
  //   appendNewProject(Project) {
  //     if (Project.name) {
  //       this.projects.push(Project);
  //     }
  //   }

  //   deleteProject(projectName) {
  //     this.projects = this.projects.filter(function (obj, index, arr) {
  //       return obj.name !== projectName;
  //     });
  //   }
}


/***/ }),

/***/ "./src/class-task.js":
/*!***************************!*\
  !*** ./src/class-task.js ***!
  \***************************/
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
/* harmony import */ var _class_project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class-project */ "./src/class-project.js");
/* harmony import */ var _class_projects_holder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./class-projects-holder */ "./src/class-projects-holder.js");
/* harmony import */ var _DOM_add_project__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOM-add-project */ "./src/DOM-add-project.js");




const testProject = new _class_project__WEBPACK_IMPORTED_MODULE_0__["default"]("Kriskata se uchi");
const test2 = new _class_project__WEBPACK_IMPORTED_MODULE_0__["default"]("Proba");

_class_projects_holder__WEBPACK_IMPORTED_MODULE_1__["default"].appendNewProject(test2);
_class_projects_holder__WEBPACK_IMPORTED_MODULE_1__["default"].appendNewProject(testProject);
console.log(_class_projects_holder__WEBPACK_IMPORTED_MODULE_1__["default"].getProjects());

console.log("After filtering: ")

_class_projects_holder__WEBPACK_IMPORTED_MODULE_1__["default"].deleteProject(test2.name);
console.log(_class_projects_holder__WEBPACK_IMPORTED_MODULE_1__["default"].getProjects());

_class_projects_holder__WEBPACK_IMPORTED_MODULE_1__["default"].deleteProject("proba1");
console.log(_class_projects_holder__WEBPACK_IMPORTED_MODULE_1__["default"].getProjects());

(0,_DOM_add_project__WEBPACK_IMPORTED_MODULE_2__["default"])(_class_projects_holder__WEBPACK_IMPORTED_MODULE_1__["default"]);





})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOc0M7QUFDWTtBQUNQOztBQUUzQyx3QkFBd0Isc0RBQU87QUFDL0Isa0JBQWtCLHNEQUFPOztBQUV6QiwrRUFBNEI7QUFDNUIsK0VBQTRCO0FBQzVCLFlBQVksMEVBQXVCOztBQUVuQzs7QUFFQSw0RUFBeUI7QUFDekIsWUFBWSwwRUFBdUI7O0FBRW5DLDRFQUF5QjtBQUN6QixZQUFZLDBFQUF1Qjs7QUFFbkMsNERBQVUsQ0FBQyw4REFBVyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9ET00tYWRkLXByb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NsYXNzLXByb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NsYXNzLXByb2plY3RzLWhvbGRlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY2xhc3MtdGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vY2xhc3MtcHJvamVjdFwiO1xuaW1wb3J0IEFsbFByb2plY3RzIGZyb20gXCIuL2NsYXNzLXByb2plY3RzLWhvbGRlclwiO1xuaW1wb3J0IFRhc2sgZnJvbSBcIi4vY2xhc3MtdGFza1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGRQcm9qZWN0KHByb2plY3RzTGlzdCkge1xuICBsZXQgYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXByb2plY3RcIik7XG4gIGxldCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FuY2VsLXByb2plY3QtY3JlYXRpb25cIik7XG4gIGxldCBhZGRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2NlZWQtcHJvamVjdC1jcmVhdGlvblwiKTtcblxuICBhZGRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgdG9nZ2xlUHJvamVjdENyZWF0aW9uTW9kYWwoKTtcbiAgfSk7XG5cbiAgYWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC10aXRsZS1mb3JtXCIpLnZhbHVlKSB7XG4gICAgICBjb25zdCBjcmVhdGluZ1Byb2plY3QgPSBuZXcgUHJvamVjdChcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LXRpdGxlLWZvcm1cIikudmFsdWVcbiAgICAgICk7XG4gICAgICBwcm9qZWN0c0xpc3QuYXBwZW5kTmV3UHJvamVjdChjcmVhdGluZ1Byb2plY3QpO1xuICAgICAgdG9nZ2xlUHJvamVjdENyZWF0aW9uTW9kYWwoKTtcbiAgICAgIHVwZGF0ZUxlZnROYXYocHJvamVjdHNMaXN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoXCJUaXRsZSBjYW5ub3QgYmUgZW1wdHkhXCIpO1xuICAgIH1cbiAgfSk7XG5cbiAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICB0b2dnbGVQcm9qZWN0Q3JlYXRpb25Nb2RhbCgpO1xuICAgIHVwZGF0ZUxlZnROYXYocHJvamVjdHNMaXN0KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZVByb2plY3RDcmVhdGlvbk1vZGFsKCkge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3QtdGl0bGUtZm9ybVwiKS52YWx1ZSA9IFwiXCI7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGVudFwiKS5jbGFzc0xpc3QudG9nZ2xlKFwiYmx1ci1jb250ZW50XCIpO1xuICBkb2N1bWVudFxuICAgIC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0LW1vZGFsXCIpXG4gICAgLmNsYXNzTGlzdC50b2dnbGUoXCJhZGQtcHJvamVjdC1tb2RhbC12aXNpYmxlXCIpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVMZWZ0TmF2KHByb2plY3RzTGlzdCkge1xuICAvL0ZpcnN0IGRlbGV0ZSBldmVyeSBwcm9qZWN0IGJ1dCB0aGUgKyBBZGQgcHJvamVjdCBidXR0b25cbiAgbGV0IHByb2plY3RzRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG93ZXItYnV0dG9uc1wiKTtcbiAgbGV0IGFkZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXByb2plY3RcIik7XG5cbiAgd2hpbGUgKHByb2plY3RzRGlzcGxheS5sYXN0Q2hpbGQgIT09IGFkZEJ1dHRvbikge1xuICAgIHByb2plY3RzRGlzcGxheS5yZW1vdmVDaGlsZChwcm9qZWN0c0Rpc3BsYXkubGFzdENoaWxkKTtcbiAgfVxuXG4gIC8vVGhlbiBQb3B1bGF0ZSB0aGUgbmF2IHdpdGggdGhlIGV4aXN0aW5nIHByb2plY3RzXG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0c0xpc3QuZ2V0UHJvamVjdHNDb3VudCgpOyBpICs9IDEpIHtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwicHJvamVjdHNcIik7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiLCBwcm9qZWN0c0xpc3QuZ2V0UHJvamVjdEF0SW5kZXgoaSkubmFtZSk7XG4gICAgY29uc3QgZGl2aWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIGRpdmlkZXIuY2xhc3NMaXN0LmFkZChcImRpdmlkZXJcIik7XG5cbiAgICBkaXZpZGVyLmlubmVySFRNTCA9IGA8aW1nIHNyYz0nLi9pbWFnZXMvZm9ybWF0LWxpc3QtY2hlY2tzLnBuZycgYWx0PSdJbWFnZSBvZiBjaGVja2xpc3QnPiR7XG4gICAgICBwcm9qZWN0c0xpc3QuZ2V0UHJvamVjdEF0SW5kZXgoaSkubmFtZVxuICAgIH1gO1xuXG4gICAgY29uc3QgdGFza0NvdW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgdGFza0NvdW50LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWNvdW50XCIpO1xuICAgIHRhc2tDb3VudC50ZXh0Q29udGVudCA9IHByb2plY3RzTGlzdC5nZXRQcm9qZWN0QXRJbmRleChpKS5nZXRUYXNrc0NvdW50KCk7XG5cbiAgICBidG4uYXBwZW5kQ2hpbGQoZGl2aWRlcik7XG4gICAgYnRuLmFwcGVuZENoaWxkKHRhc2tDb3VudCk7XG4gICAgcHJvamVjdHNEaXNwbGF5LmFwcGVuZENoaWxkKGJ0bik7XG5cbiAgICAvL0FkZCBldmVudCBsaXN0ZW5lciB0byBlYWNoIHByb2plY3QncyBidXR0b24gb24gdGhlIGxlZnQgbmF2IGJhclxuXG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBpZiAocHJvamVjdHNMaXN0LmdldFByb2plY3RBdEluZGV4KGkpLmdldFRhc2tzQ291bnQoKSA9PT0gMCkge1xuICAgICAgICB1cGRhdGVSaWdodE1haW5FbXB0eVByb2plY3QoYnRuKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVwZGF0ZVJpZ2h0TWFpblByb2plY3RXaXRoVGFza3MoYnRuKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVSaWdodE1haW5FbXB0eVByb2plY3QoYnRuKSB7XG4gIGxldCBtYWluUmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tcmlnaHRcIik7XG5cbiAgZGVsZXRlQ2hpbGRyZW4obWFpblJpZ2h0KTtcblxuICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZGl2LmNsYXNzTGlzdC5hZGQoXCJlbXB0eS1wcm9qZWN0XCIpO1xuXG4gIGxldCBoMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgaDEudGV4dENvbnRlbnQgPSBcIkVtcHR5IFByb2plY3QhXCI7XG5cbiAgbGV0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgcC50ZXh0Q29udGVudCA9IFwiQ3JlYXRlIGEgbmV3IHRvLWRvIGl0ZW0gb3IgZGVsZXRlIHRoZSBwcm9qZWN0XCI7XG5cbiAgbGV0IGRpdkJ1dHRvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBkaXZCdXR0b25zLmNsYXNzTGlzdC5hZGQoXCJlbXB0eS1wcm9qZWN0LWJ1dHRvbnNcIik7XG5cbiAgbGV0IGFkZEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGFkZEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWRkLXRvZG9cIik7XG4gIGFkZEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQUREIFRPLURPXCI7XG4gIGFkZEJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIiwgYnRuLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSk7XG5cbiAgbGV0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGRlbGV0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLXByb2plY3RcIik7XG4gIGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiREVMRVRFIFBST0pFQ1RcIjtcbiAgZGVsZXRlQnV0dG9uLnNldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiLCBidG4uZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpKTtcblxuICBkaXZCdXR0b25zLmFwcGVuZENoaWxkKGFkZEJ1dHRvbik7XG4gIGRpdkJ1dHRvbnMuYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcblxuICBkaXYuYXBwZW5kQ2hpbGQoaDEpO1xuICBkaXYuYXBwZW5kQ2hpbGQocCk7XG4gIGRpdi5hcHBlbmRDaGlsZChkaXZCdXR0b25zKTtcblxuICBtYWluUmlnaHQuYXBwZW5kQ2hpbGQoZGl2KTtcblxuICAvL0FkZCBldmVudCBsaXN0ZW5lcnMgZm9yIGRlbGV0ZSBwcm9qZWN0IGJ1dHRvblxuXG4gIGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIEFsbFByb2plY3RzLmRlbGV0ZVByb2plY3QoZGVsZXRlQnV0dG9uLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSk7XG4gICAgdXBkYXRlTGVmdE5hdihBbGxQcm9qZWN0cyk7XG4gICAgZGVsZXRlQ2hpbGRyZW4obWFpblJpZ2h0KTtcbiAgfSk7XG5cbiAgLy9UT0RPIEFkZCBldmVudCBsaXN0ZW5lcnMgZm9yIGFkZCB0b2RvIHByb2plY3QgYnV0dG9uXG4gIGFkZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHRvZ2dsZVRhc2tDcmVhdGlvbk1vZGFsKGFkZEJ1dHRvbi5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIikpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlVGFza0NyZWF0aW9uTW9kYWwocHJvamVjdCkge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stdGl0bGUtZm9ybVwiKS52YWx1ZSA9IFwiXCI7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kZXNjcmlwdGlvblwiKS52YWx1ZSA9IFwiXCI7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGVudFwiKS5jbGFzc0xpc3QudG9nZ2xlKFwiYmx1ci1jb250ZW50XCIpO1xuICBkb2N1bWVudFxuICAgIC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrLW1vZGFsXCIpXG4gICAgLmNsYXNzTGlzdC50b2dnbGUoXCJhZGQtdGFzay1tb2RhbC12aXNpYmxlXCIpO1xuICBpZiAoXG4gICAgZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrLW1vZGFsXCIpXG4gICAgICAuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWRkLXRhc2stbW9kYWwtdmlzaWJsZVwiKVxuICApIHtcbiAgICBsZXQgYnV0dG9uQ2FuY2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay1tb2RhbC1idXR0b25zLWNhbmNlbFwiKTtcbiAgICBsZXQgYnV0dG9uQWRkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay1tb2RhbC1idXR0b25zLWFkZFwiKTtcblxuICAgIGJ1dHRvbkNhbmNlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdG9nZ2xlVGFza0NyZWF0aW9uTW9kYWwocHJvamVjdCk7XG4gICAgfSk7XG5cbiAgICBidXR0b25BZGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGFkZFRhc2tUb1Byb2plY3QocHJvamVjdCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgdXBkYXRlUmlnaHRNYWluUHJvamVjdFdpdGhUYXNrcyhwcm9qZWN0KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRUYXNrVG9Qcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLXRpdGxlLWZvcm1cIikudmFsdWU7XG4gIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWRlc2NyaXB0aW9uXCIpLnZhbHVlO1xuICBjb25zdCBwcmlvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNQcmlvcml0eVwiKS52YWx1ZTtcbiAgY29uc3QgZHVlZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kdWUtZGF0ZVwiKS52YWx1ZTtcblxuICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2sodGl0bGUsIHByaW8sIGRlc2NyaXB0aW9uLCBkdWVkYXRlKTtcblxuICBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKHByb2plY3ROYW1lKS5hZGROZXdUYXNrKG5ld1Rhc2spO1xuICB1cGRhdGVMZWZ0TmF2KEFsbFByb2plY3RzKTtcblxuICB0b2dnbGVUYXNrQ3JlYXRpb25Nb2RhbChwcm9qZWN0TmFtZSk7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZUNoaWxkcmVuKHBhcmVudCkge1xuICB3aGlsZSAocGFyZW50Lmxhc3RDaGlsZCkge1xuICAgIHBhcmVudC5yZW1vdmVDaGlsZChwYXJlbnQubGFzdENoaWxkKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVSaWdodE1haW5Qcm9qZWN0V2l0aFRhc2tzKGJ0bikge1xuICBsZXQgbWFpblJpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLXJpZ2h0XCIpO1xuICBkZWxldGVDaGlsZHJlbihtYWluUmlnaHQpO1xuXG4gIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgcHJvamVjdFRpdGxlLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LXRpdGxlXCIpO1xuICBwcm9qZWN0VGl0bGUudGV4dENvbnRlbnQgPSBidG4uZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpO1xuXG4gIGNvbnN0IHRhc2tzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdGFza3NDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInRhc2tzLWNvbnRhaW5lclwiKTtcblxuICBjb25zdCB0YXNrc0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHRhc2tzSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrcy1oZWFkZXJcIik7XG5cbiAgY29uc3QgdGFza3NIZWFkZXJXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdGFza3NIZWFkZXJXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrcy1oZWFkZXItd3JhcHBlclwiKTtcblxuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBkaXYudGV4dENvbnRlbnQgPSBcIlRhc2tzXCI7XG5cbiAgY29uc3Qgc3Bhbk51bWJlck9mVGFza3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgc3Bhbk51bWJlck9mVGFza3MuY2xhc3NMaXN0LmFkZChcIm51bWJlci1vZi10YXNrc1wiKTtcbiAgc3Bhbk51bWJlck9mVGFza3MudGV4dENvbnRlbnQgPSBgKCR7QWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShcbiAgICBidG4uZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpXG4gICkuZ2V0VGFza3NDb3VudCgpfSlgO1xuXG4gIGRpdi5hcHBlbmRDaGlsZChzcGFuTnVtYmVyT2ZUYXNrcyk7XG5cbiAgY29uc3QgZGl2MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGRpdjIuY2xhc3NMaXN0LmFkZChcImFkZC1hLXRhc2tcIik7XG5cbiAgY29uc3Qgc3BhblBsdXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgc3BhblBsdXMuY2xhc3NMaXN0LmFkZChcInBsdXNcIik7XG4gIHNwYW5QbHVzLnRleHRDb250ZW50ID0gXCIrXCI7XG5cbiAgY29uc3Qgc3BhbkFkZFRhc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgc3BhbkFkZFRhc2sudGV4dENvbnRlbnQgPSBcIkFkZCBhIHRhc2tcIjtcblxuICBkaXYyLmFwcGVuZENoaWxkKHNwYW5QbHVzKTtcbiAgZGl2Mi5hcHBlbmRDaGlsZChzcGFuQWRkVGFzayk7XG5cbiAgdGFza3NIZWFkZXJXcmFwcGVyLmFwcGVuZENoaWxkKGRpdik7XG4gIHRhc2tzSGVhZGVyV3JhcHBlci5hcHBlbmRDaGlsZChkaXYyKTtcblxuICB0YXNrc0hlYWRlci5hcHBlbmRDaGlsZCh0YXNrc0hlYWRlcldyYXBwZXIpO1xuXG4gIHRhc2tzQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tzSGVhZGVyKTtcbiAgbWFpblJpZ2h0LmFwcGVuZENoaWxkKHRhc2tzQ29udGFpbmVyKTtcbiAgLy9UT0RPOiBBZGQgdGhlIGxvZ2ljIHRvIGRpc3BsYXkgY3VycmVudCB0YXNrc1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMudGFza3MgPSBbXTtcbiAgfVxuXG4gIGdldCBuYW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICB9XG5cbiAgc2V0IG5hbWUodmFsdWUpIHtcbiAgICBpZiAodmFsdWUubGVuZ3RoIDwgMSkge1xuICAgICAgYWxlcnQoXCJQcm9qZWN0J3MgbmFtZSBjYW5ub3QgYmUgZW1wdHkuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9uYW1lID0gdmFsdWU7XG4gIH1cblxuICBnZXRUYXNrcygpIHtcbiAgICByZXR1cm4gdGhpcy50YXNrcztcbiAgfVxuXG4gIGdldFRhc2tzQ291bnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFza3MubGVuZ3RoO1xuICB9XG5cbiAgYWRkTmV3VGFzayh0YXNrKSB7XG4gICAgdGhpcy50YXNrcy5wdXNoKHRhc2spO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBbGxQcm9qZWN0cyB7XG4gIHN0YXRpYyBwcm9qZWN0cyA9IFtdO1xuXG4gIHN0YXRpYyBnZXRQcm9qZWN0cygpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0cztcbiAgfVxuXG4gIHN0YXRpYyBnZXRQcm9qZWN0c0NvdW50KCkge1xuICAgIHJldHVybiB0aGlzLnByb2plY3RzLmxlbmd0aDtcbiAgfVxuXG4gIHN0YXRpYyBnZXRQcm9qZWN0QXRJbmRleChpbmRleCkge1xuICAgIGlmIChpbmRleCA8IHRoaXMuZ2V0UHJvamVjdHNDb3VudCgpKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9qZWN0c1tpbmRleF07XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldFByb2plY3RCeU5hbWUocHJvamVjdE5hbWUpIHtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5nZXRQcm9qZWN0c0NvdW50KCk7IGkrPTEpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0UHJvamVjdHMoKVtpXS5uYW1lID09PSBwcm9qZWN0TmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvamVjdHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYXBwZW5kTmV3UHJvamVjdChQcm9qZWN0KSB7XG4gICAgaWYgKFByb2plY3QubmFtZSkge1xuICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKFByb2plY3QpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVQcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gICAgdGhpcy5wcm9qZWN0cyA9IHRoaXMucHJvamVjdHMuZmlsdGVyKGZ1bmN0aW9uIChvYmosIGluZGV4LCBhcnIpIHtcbiAgICAgIHJldHVybiBvYmoubmFtZSAhPT0gcHJvamVjdE5hbWU7XG4gICAgfSk7XG4gIH1cblxuICAvLyAgIGNvbnN0cnVjdG9yKCkge1xuICAvLyAgICAgdGhpcy5wcm9qZWN0cyA9IFtdO1xuICAvLyAgIH1cblxuICAvLyAgIGdldFByb2plY3RzKCkge1xuICAvLyAgICAgcmV0dXJuIHRoaXMucHJvamVjdHM7XG4gIC8vICAgfVxuXG4gIC8vICAgZ2V0UHJvamVjdHNDb3VudCgpIHtcbiAgLy8gICAgIHJldHVybiB0aGlzLnByb2plY3RzLmxlbmd0aDtcbiAgLy8gICB9XG5cbiAgLy8gICBnZXRQcm9qZWN0QXRJbmRleChpbmRleCkge1xuICAvLyAgICAgaWYgKGluZGV4IDwgdGhpcy5nZXRQcm9qZWN0c0NvdW50KCkpIHtcbiAgLy8gICAgICAgcmV0dXJuIHRoaXMucHJvamVjdHNbaW5kZXhdO1xuICAvLyAgICAgfVxuICAvLyAgIH1cbiAgLy8gICBhcHBlbmROZXdQcm9qZWN0KFByb2plY3QpIHtcbiAgLy8gICAgIGlmIChQcm9qZWN0Lm5hbWUpIHtcbiAgLy8gICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKFByb2plY3QpO1xuICAvLyAgICAgfVxuICAvLyAgIH1cblxuICAvLyAgIGRlbGV0ZVByb2plY3QocHJvamVjdE5hbWUpIHtcbiAgLy8gICAgIHRoaXMucHJvamVjdHMgPSB0aGlzLnByb2plY3RzLmZpbHRlcihmdW5jdGlvbiAob2JqLCBpbmRleCwgYXJyKSB7XG4gIC8vICAgICAgIHJldHVybiBvYmoubmFtZSAhPT0gcHJvamVjdE5hbWU7XG4gIC8vICAgICB9KTtcbiAgLy8gICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIHtcbiAgY29uc3RydWN0b3IobmFtZSwgcHJpbywgZGVzYywgZHVlZGF0ZSkge1xuICAgIHRoaXMudGl0bGUgPSBuYW1lO1xuICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjO1xuICAgIHRoaXMuZHVlZGF0ZSA9IGR1ZWRhdGU7XG4gICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIGdldCBuYW1lKCkge1xuICAvLyAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAvLyB9XG5cbiAgLy8gc2V0IG5hbWUodmFsdWUpIHtcbiAgLy8gICBpZiAodmFsdWUubGVuZ3RoIDwgMSkge1xuICAvLyAgICAgYWxlcnQoXCJUYXNrJ3MgbmFtZSBjYW5ub3QgYmUgZW1wdHkuXCIpO1xuICAvLyAgICAgcmV0dXJuO1xuICAvLyAgIH1cbiAgLy8gICB0aGlzLl9uYW1lID0gdmFsdWU7XG4gIC8vIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vY2xhc3MtcHJvamVjdFwiO1xuaW1wb3J0IEFsbFByb2plY3RzIGZyb20gXCIuL2NsYXNzLXByb2plY3RzLWhvbGRlclwiO1xuaW1wb3J0IGFkZFByb2plY3QgZnJvbSBcIi4vRE9NLWFkZC1wcm9qZWN0XCI7XG5cbmNvbnN0IHRlc3RQcm9qZWN0ID0gbmV3IFByb2plY3QoXCJLcmlza2F0YSBzZSB1Y2hpXCIpO1xuY29uc3QgdGVzdDIgPSBuZXcgUHJvamVjdChcIlByb2JhXCIpO1xuXG5BbGxQcm9qZWN0cy5hcHBlbmROZXdQcm9qZWN0KHRlc3QyKTtcbkFsbFByb2plY3RzLmFwcGVuZE5ld1Byb2plY3QodGVzdFByb2plY3QpO1xuY29uc29sZS5sb2coQWxsUHJvamVjdHMuZ2V0UHJvamVjdHMoKSk7XG5cbmNvbnNvbGUubG9nKFwiQWZ0ZXIgZmlsdGVyaW5nOiBcIilcblxuQWxsUHJvamVjdHMuZGVsZXRlUHJvamVjdCh0ZXN0Mi5uYW1lKTtcbmNvbnNvbGUubG9nKEFsbFByb2plY3RzLmdldFByb2plY3RzKCkpO1xuXG5BbGxQcm9qZWN0cy5kZWxldGVQcm9qZWN0KFwicHJvYmExXCIpO1xuY29uc29sZS5sb2coQWxsUHJvamVjdHMuZ2V0UHJvamVjdHMoKSk7XG5cbmFkZFByb2plY3QoQWxsUHJvamVjdHMpO1xuXG5cblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=