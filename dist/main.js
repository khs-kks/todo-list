/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

/***/ "./src/redundant.js":
/*!**************************!*\
  !*** ./src/redundant.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addProject)
/* harmony export */ });
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ "./src/project.js");
/* harmony import */ var _projects_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects-list */ "./src/projects-list.js");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./task */ "./src/task.js");




function addProject() {

  let addProjectButton = document.querySelector(".add-project");
  let closeButton = document.querySelector(".cancel-project-creation");
  let addButton = document.querySelector(".proceed-project-creation");

  addProjectButton.addEventListener("click", () => {
    toggleProjectCreationModal();
  });

  addButton.addEventListener("click", () => {
    if (document.querySelector("#project-title-form").value) {
      const creatingProject = new _project__WEBPACK_IMPORTED_MODULE_0__["default"](
        document.querySelector("#project-title-form").value
      );
      _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].appendNewProject(creatingProject);
      toggleProjectCreationModal();
      updateLeftNav();
    } else {
      alert("Title cannot be empty!");
    }
  });

  closeButton.addEventListener("click", () => {
    toggleProjectCreationModal();
    updateLeftNav();
  });
}

function toggleProjectCreationModal() {
  document.querySelector("#project-title-form").value = "";
  document.querySelector("#content").classList.toggle("blur-content");
  document
    .querySelector(".add-project-modal")
    .classList.toggle("add-project-modal-visible");
}

function updateLeftNav() {
  //First delete every project but the + Add project button
  let projectsDisplay = document.querySelector(".lower-buttons");
  let addButton = document.querySelector(".add-project");

  while (projectsDisplay.lastChild !== addButton) {
    projectsDisplay.removeChild(projectsDisplay.lastChild);
  }

  //Then Populate the nav with the existing projects

  for (let i = 0; i < _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectsCount(); i++) {
    const btn = document.createElement("button");
    btn.classList.add("projects");
    btn.setAttribute("data-project", _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectAtIndex(i).name);
    const divider = document.createElement("span");
    divider.classList.add("divider");

    divider.innerHTML = `<img src='./images/format-list-checks.png' alt='Image of checklist'>${
      _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectAtIndex(i).name
    }`;

    const taskCount = document.createElement("span");
    taskCount.classList.add("task-count");
    taskCount.textContent = _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectAtIndex(i).getTasksCount();

    btn.appendChild(divider);
    btn.appendChild(taskCount);
    projectsDisplay.appendChild(btn);

    //Add event listener to each project's button on the left nav bar

    btn.addEventListener("click", () => {
      const buttons = Array.from(document.querySelectorAll(".projects"));

      //Switch the highlighted project
      buttons.forEach((button) => {
        if (button.classList.contains("projects-active")) {
          button.classList.toggle("projects-active");
        }
      });

      btn.classList.add("projects-active");
      if (_projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectAtIndex(i).getTasksCount() === 0) {
        updateRightMainEmptyProject(_projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectAtIndex(i).name);
      } else {
        updateRightMainProjectWithTasks(_projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectAtIndex(i).name);
      }
    });
  }
}

function updateRightMainEmptyProject(projectName) {
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
  addButton.setAttribute("data-project", projectName);

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-project");
  deleteButton.textContent = "DELETE PROJECT";
  deleteButton.setAttribute("data-project", projectName);

  divButtons.appendChild(addButton);
  divButtons.appendChild(deleteButton);

  div.appendChild(h1);
  div.appendChild(p);
  div.appendChild(divButtons);

  mainRight.appendChild(div);

  //Add event listeners for delete project button

  deleteButton.addEventListener("click", () => {
    _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].deleteProject(deleteButton.getAttribute("data-project"));
    updateLeftNav();
    deleteChildren(mainRight);
  });

  //Add event listeners for add todo project button
  addButton.addEventListener("click", () => {
    document.querySelector("#task-title-form").value = "";
    document.querySelector("#task-description").value = "";
    toggleTaskCreationModal(addButton.getAttribute("data-project"));
  });
}

function toggleTaskCreationModal(project) {
  document.querySelector("#content").classList.toggle("blur-content");
  document
    .querySelector(".add-task-modal")
    .classList.toggle("add-task-modal-visible");
  // if (
  // document
  //   .querySelector(".add-task-modal")
  //   .classList.contains("add-task-modal-visible");
  // ) {
  const buttonCancel = document.querySelector(".add-task-modal-buttons-cancel");
  const buttonAdd = document.querySelector(".add-task-modal-buttons-add");
  buttonAdd.setAttribute("data-project", project);

  buttonCancel.addEventListener("click", () => {
    document.querySelector("#content").classList.toggle("blur-content");
    document
      .querySelector(".add-task-modal")
      .classList.toggle("add-task-modal-visible");
  });

  buttonAdd.addEventListener("click", () => {
    addTaskToProject(project);
    document.querySelector("#content").classList.toggle("blur-content");
    document
      .querySelector(".add-task-modal")
      .classList.toggle("add-task-modal-visible");
    updateRightMainProjectWithTasks(project);
  });
  // } else {
  //
  // }
}

function addTaskToProject(projectName) {
  const title = document.querySelector("#task-title-form").value;
  const description = document.querySelector("#task-description").value;
  const prio = document.querySelector("#Priority").value;
  const duedate = document.querySelector("#task-due-date").value;

  const newTask = new _task__WEBPACK_IMPORTED_MODULE_2__["default"](title, prio, description, duedate);
  // console.log(projectName);
  // console.log(AllProjects.getProjectByName(projectName))
  _projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectByName(projectName).addNewTask(newTask);
  updateLeftNav();
}

function deleteChildren(parent) {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
}

function updateRightMainProjectWithTasks(projectName) {
  let mainRight = document.querySelector(".main-right");
  deleteChildren(mainRight);

  const projectTitle = document.createElement("h1");
  projectTitle.classList.add("project-title");
  projectTitle.textContent = projectName;
  // projectTitle.textContent = btn;

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
  spanNumberOfTasks.textContent = `(${_projects_list__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectByName(
    projectName
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
  mainRight.appendChild(projectTitle);
  mainRight.appendChild(tasksContainer);
  //TODO: Add the logic to display current tasks
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
/* harmony import */ var _redundant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./redundant */ "./src/redundant.js");





(0,_redundant__WEBPACK_IMPORTED_MODULE_3__["default"])();

// addProject(AllProjects);
const footer = document.querySelector(".footer");

footer.addEventListener("click", () => {
    const someTask = new _task__WEBPACK_IMPORTED_MODULE_2__["default"]("Proba", "low", "Some stupid shit", "30.11.2022");
    const proj = new _project__WEBPACK_IMPORTED_MODULE_0__["default"]("Ludnichka");
    proj.addNewTask(someTask);
    console.log(proj.getTasks());
})






})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNwQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05nQztBQUNVO0FBQ2hCO0FBQ1E7O0FBRWxDLHNEQUFPOztBQUVQO0FBQ0E7O0FBRUE7QUFDQSx5QkFBeUIsNkNBQUk7QUFDN0IscUJBQXFCLGdEQUFPO0FBQzVCO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3RzLWxpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3JlZHVuZGFudC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMudGFza3MgPSBbXTtcbiAgfVxuXG4gIC8vIGdldCBuYW1lKCkge1xuICAvLyAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAvLyB9XG5cbiAgLy8gc2V0IG5hbWUodmFsdWUpIHtcbiAgLy8gICBpZiAodmFsdWUubGVuZ3RoIDwgMSkge1xuICAvLyAgICAgYWxlcnQoXCJQcm9qZWN0J3MgbmFtZSBjYW5ub3QgYmUgZW1wdHkuXCIpO1xuICAvLyAgICAgcmV0dXJuO1xuICAvLyAgIH1cbiAgLy8gICB0aGlzLl9uYW1lID0gdmFsdWU7XG4gIC8vIH1cblxuICBnZXRUYXNrcygpIHtcbiAgICByZXR1cm4gdGhpcy50YXNrcztcbiAgfVxuXG4gIGdldFRhc2tzQ291bnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFza3MubGVuZ3RoO1xuICB9XG5cbiAgYWRkTmV3VGFzayh0YXNrKSB7XG4gICAgdGhpcy50YXNrcy5wdXNoKHRhc2spO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBbGxQcm9qZWN0cyB7XG4gIHN0YXRpYyBwcm9qZWN0cyA9IFtdO1xuXG4gIHN0YXRpYyBnZXRQcm9qZWN0cygpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0cztcbiAgfVxuXG4gIHN0YXRpYyBnZXRQcm9qZWN0c0NvdW50KCkge1xuICAgIHJldHVybiB0aGlzLnByb2plY3RzLmxlbmd0aDtcbiAgfVxuXG4gIHN0YXRpYyBnZXRQcm9qZWN0QXRJbmRleChpbmRleCkge1xuICAgIGlmIChpbmRleCA8IHRoaXMucHJvamVjdHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9qZWN0c1tpbmRleF07XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldFByb2plY3RCeU5hbWUocHJvamVjdE5hbWUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLnByb2plY3RzW2ldLm5hbWUgPT09IHByb2plY3ROYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzW2ldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBhcHBlbmROZXdQcm9qZWN0KFByb2plY3QpIHtcbiAgICBpZiAoUHJvamVjdC5uYW1lKSB7XG4gICAgICB0aGlzLnByb2plY3RzLnB1c2goUHJvamVjdCk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGRlbGV0ZVByb2plY3QocHJvamVjdE5hbWUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZ2V0UHJvamVjdHNDb3VudCgpOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLnByb2plY3RzW2ldLm5hbWUgPT09IHByb2plY3ROYW1lKSB7XG4gICAgICAgIHRoaXMucHJvamVjdHMuc3BsaWNlKGksIDEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdFwiO1xuaW1wb3J0IEFsbFByb2plY3RzIGZyb20gXCIuL3Byb2plY3RzLWxpc3RcIjtcbmltcG9ydCBUYXNrIGZyb20gXCIuL3Rhc2tcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkUHJvamVjdCgpIHtcblxuICBsZXQgYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXByb2plY3RcIik7XG4gIGxldCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FuY2VsLXByb2plY3QtY3JlYXRpb25cIik7XG4gIGxldCBhZGRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2NlZWQtcHJvamVjdC1jcmVhdGlvblwiKTtcblxuICBhZGRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgdG9nZ2xlUHJvamVjdENyZWF0aW9uTW9kYWwoKTtcbiAgfSk7XG5cbiAgYWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC10aXRsZS1mb3JtXCIpLnZhbHVlKSB7XG4gICAgICBjb25zdCBjcmVhdGluZ1Byb2plY3QgPSBuZXcgUHJvamVjdChcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LXRpdGxlLWZvcm1cIikudmFsdWVcbiAgICAgICk7XG4gICAgICBBbGxQcm9qZWN0cy5hcHBlbmROZXdQcm9qZWN0KGNyZWF0aW5nUHJvamVjdCk7XG4gICAgICB0b2dnbGVQcm9qZWN0Q3JlYXRpb25Nb2RhbCgpO1xuICAgICAgdXBkYXRlTGVmdE5hdigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydChcIlRpdGxlIGNhbm5vdCBiZSBlbXB0eSFcIik7XG4gICAgfVxuICB9KTtcblxuICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHRvZ2dsZVByb2plY3RDcmVhdGlvbk1vZGFsKCk7XG4gICAgdXBkYXRlTGVmdE5hdigpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlUHJvamVjdENyZWF0aW9uTW9kYWwoKSB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC10aXRsZS1mb3JtXCIpLnZhbHVlID0gXCJcIjtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250ZW50XCIpLmNsYXNzTGlzdC50b2dnbGUoXCJibHVyLWNvbnRlbnRcIik7XG4gIGRvY3VtZW50XG4gICAgLnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXByb2plY3QtbW9kYWxcIilcbiAgICAuY2xhc3NMaXN0LnRvZ2dsZShcImFkZC1wcm9qZWN0LW1vZGFsLXZpc2libGVcIik7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxlZnROYXYoKSB7XG4gIC8vRmlyc3QgZGVsZXRlIGV2ZXJ5IHByb2plY3QgYnV0IHRoZSArIEFkZCBwcm9qZWN0IGJ1dHRvblxuICBsZXQgcHJvamVjdHNEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb3dlci1idXR0b25zXCIpO1xuICBsZXQgYWRkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtcHJvamVjdFwiKTtcblxuICB3aGlsZSAocHJvamVjdHNEaXNwbGF5Lmxhc3RDaGlsZCAhPT0gYWRkQnV0dG9uKSB7XG4gICAgcHJvamVjdHNEaXNwbGF5LnJlbW92ZUNoaWxkKHByb2plY3RzRGlzcGxheS5sYXN0Q2hpbGQpO1xuICB9XG5cbiAgLy9UaGVuIFBvcHVsYXRlIHRoZSBuYXYgd2l0aCB0aGUgZXhpc3RpbmcgcHJvamVjdHNcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IEFsbFByb2plY3RzLmdldFByb2plY3RzQ291bnQoKTsgaSsrKSB7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidG4uY2xhc3NMaXN0LmFkZChcInByb2plY3RzXCIpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIiwgQWxsUHJvamVjdHMuZ2V0UHJvamVjdEF0SW5kZXgoaSkubmFtZSk7XG4gICAgY29uc3QgZGl2aWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIGRpdmlkZXIuY2xhc3NMaXN0LmFkZChcImRpdmlkZXJcIik7XG5cbiAgICBkaXZpZGVyLmlubmVySFRNTCA9IGA8aW1nIHNyYz0nLi9pbWFnZXMvZm9ybWF0LWxpc3QtY2hlY2tzLnBuZycgYWx0PSdJbWFnZSBvZiBjaGVja2xpc3QnPiR7XG4gICAgICBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QXRJbmRleChpKS5uYW1lXG4gICAgfWA7XG5cbiAgICBjb25zdCB0YXNrQ291bnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICB0YXNrQ291bnQuY2xhc3NMaXN0LmFkZChcInRhc2stY291bnRcIik7XG4gICAgdGFza0NvdW50LnRleHRDb250ZW50ID0gQWxsUHJvamVjdHMuZ2V0UHJvamVjdEF0SW5kZXgoaSkuZ2V0VGFza3NDb3VudCgpO1xuXG4gICAgYnRuLmFwcGVuZENoaWxkKGRpdmlkZXIpO1xuICAgIGJ0bi5hcHBlbmRDaGlsZCh0YXNrQ291bnQpO1xuICAgIHByb2plY3RzRGlzcGxheS5hcHBlbmRDaGlsZChidG4pO1xuXG4gICAgLy9BZGQgZXZlbnQgbGlzdGVuZXIgdG8gZWFjaCBwcm9qZWN0J3MgYnV0dG9uIG9uIHRoZSBsZWZ0IG5hdiBiYXJcblxuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgYnV0dG9ucyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0c1wiKSk7XG5cbiAgICAgIC8vU3dpdGNoIHRoZSBoaWdobGlnaHRlZCBwcm9qZWN0XG4gICAgICBidXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgICBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucyhcInByb2plY3RzLWFjdGl2ZVwiKSkge1xuICAgICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKFwicHJvamVjdHMtYWN0aXZlXCIpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0cy1hY3RpdmVcIik7XG4gICAgICBpZiAoQWxsUHJvamVjdHMuZ2V0UHJvamVjdEF0SW5kZXgoaSkuZ2V0VGFza3NDb3VudCgpID09PSAwKSB7XG4gICAgICAgIHVwZGF0ZVJpZ2h0TWFpbkVtcHR5UHJvamVjdChBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QXRJbmRleChpKS5uYW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVwZGF0ZVJpZ2h0TWFpblByb2plY3RXaXRoVGFza3MoQWxsUHJvamVjdHMuZ2V0UHJvamVjdEF0SW5kZXgoaSkubmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlUmlnaHRNYWluRW1wdHlQcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gIGxldCBtYWluUmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tcmlnaHRcIik7XG5cbiAgZGVsZXRlQ2hpbGRyZW4obWFpblJpZ2h0KTtcblxuICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZGl2LmNsYXNzTGlzdC5hZGQoXCJlbXB0eS1wcm9qZWN0XCIpO1xuXG4gIGxldCBoMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgaDEudGV4dENvbnRlbnQgPSBcIkVtcHR5IFByb2plY3QhXCI7XG5cbiAgbGV0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgcC50ZXh0Q29udGVudCA9IFwiQ3JlYXRlIGEgbmV3IHRvLWRvIGl0ZW0gb3IgZGVsZXRlIHRoZSBwcm9qZWN0XCI7XG5cbiAgbGV0IGRpdkJ1dHRvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBkaXZCdXR0b25zLmNsYXNzTGlzdC5hZGQoXCJlbXB0eS1wcm9qZWN0LWJ1dHRvbnNcIik7XG5cbiAgbGV0IGFkZEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGFkZEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWRkLXRvZG9cIik7XG4gIGFkZEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQUREIFRPLURPXCI7XG4gIGFkZEJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIiwgcHJvamVjdE5hbWUpO1xuXG4gIGxldCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBkZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZChcImRlbGV0ZS1wcm9qZWN0XCIpO1xuICBkZWxldGVCdXR0b24udGV4dENvbnRlbnQgPSBcIkRFTEVURSBQUk9KRUNUXCI7XG4gIGRlbGV0ZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIiwgcHJvamVjdE5hbWUpO1xuXG4gIGRpdkJ1dHRvbnMuYXBwZW5kQ2hpbGQoYWRkQnV0dG9uKTtcbiAgZGl2QnV0dG9ucy5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xuXG4gIGRpdi5hcHBlbmRDaGlsZChoMSk7XG4gIGRpdi5hcHBlbmRDaGlsZChwKTtcbiAgZGl2LmFwcGVuZENoaWxkKGRpdkJ1dHRvbnMpO1xuXG4gIG1haW5SaWdodC5hcHBlbmRDaGlsZChkaXYpO1xuXG4gIC8vQWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgZGVsZXRlIHByb2plY3QgYnV0dG9uXG5cbiAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgQWxsUHJvamVjdHMuZGVsZXRlUHJvamVjdChkZWxldGVCdXR0b24uZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpKTtcbiAgICB1cGRhdGVMZWZ0TmF2KCk7XG4gICAgZGVsZXRlQ2hpbGRyZW4obWFpblJpZ2h0KTtcbiAgfSk7XG5cbiAgLy9BZGQgZXZlbnQgbGlzdGVuZXJzIGZvciBhZGQgdG9kbyBwcm9qZWN0IGJ1dHRvblxuICBhZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stdGl0bGUtZm9ybVwiKS52YWx1ZSA9IFwiXCI7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWRlc2NyaXB0aW9uXCIpLnZhbHVlID0gXCJcIjtcbiAgICB0b2dnbGVUYXNrQ3JlYXRpb25Nb2RhbChhZGRCdXR0b24uZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZVRhc2tDcmVhdGlvbk1vZGFsKHByb2plY3QpIHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250ZW50XCIpLmNsYXNzTGlzdC50b2dnbGUoXCJibHVyLWNvbnRlbnRcIik7XG4gIGRvY3VtZW50XG4gICAgLnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2stbW9kYWxcIilcbiAgICAuY2xhc3NMaXN0LnRvZ2dsZShcImFkZC10YXNrLW1vZGFsLXZpc2libGVcIik7XG4gIC8vIGlmIChcbiAgLy8gZG9jdW1lbnRcbiAgLy8gICAucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay1tb2RhbFwiKVxuICAvLyAgIC5jbGFzc0xpc3QuY29udGFpbnMoXCJhZGQtdGFzay1tb2RhbC12aXNpYmxlXCIpO1xuICAvLyApIHtcbiAgY29uc3QgYnV0dG9uQ2FuY2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay1tb2RhbC1idXR0b25zLWNhbmNlbFwiKTtcbiAgY29uc3QgYnV0dG9uQWRkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay1tb2RhbC1idXR0b25zLWFkZFwiKTtcbiAgYnV0dG9uQWRkLnNldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiLCBwcm9qZWN0KTtcblxuICBidXR0b25DYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRlbnRcIikuY2xhc3NMaXN0LnRvZ2dsZShcImJsdXItY29udGVudFwiKTtcbiAgICBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2stbW9kYWxcIilcbiAgICAgIC5jbGFzc0xpc3QudG9nZ2xlKFwiYWRkLXRhc2stbW9kYWwtdmlzaWJsZVwiKTtcbiAgfSk7XG5cbiAgYnV0dG9uQWRkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgYWRkVGFza1RvUHJvamVjdChwcm9qZWN0KTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRlbnRcIikuY2xhc3NMaXN0LnRvZ2dsZShcImJsdXItY29udGVudFwiKTtcbiAgICBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2stbW9kYWxcIilcbiAgICAgIC5jbGFzc0xpc3QudG9nZ2xlKFwiYWRkLXRhc2stbW9kYWwtdmlzaWJsZVwiKTtcbiAgICB1cGRhdGVSaWdodE1haW5Qcm9qZWN0V2l0aFRhc2tzKHByb2plY3QpO1xuICB9KTtcbiAgLy8gfSBlbHNlIHtcbiAgLy9cbiAgLy8gfVxufVxuXG5mdW5jdGlvbiBhZGRUYXNrVG9Qcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLXRpdGxlLWZvcm1cIikudmFsdWU7XG4gIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWRlc2NyaXB0aW9uXCIpLnZhbHVlO1xuICBjb25zdCBwcmlvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNQcmlvcml0eVwiKS52YWx1ZTtcbiAgY29uc3QgZHVlZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kdWUtZGF0ZVwiKS52YWx1ZTtcblxuICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2sodGl0bGUsIHByaW8sIGRlc2NyaXB0aW9uLCBkdWVkYXRlKTtcbiAgLy8gY29uc29sZS5sb2cocHJvamVjdE5hbWUpO1xuICAvLyBjb25zb2xlLmxvZyhBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKHByb2plY3ROYW1lKSlcbiAgQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShwcm9qZWN0TmFtZSkuYWRkTmV3VGFzayhuZXdUYXNrKTtcbiAgdXBkYXRlTGVmdE5hdigpO1xufVxuXG5mdW5jdGlvbiBkZWxldGVDaGlsZHJlbihwYXJlbnQpIHtcbiAgd2hpbGUgKHBhcmVudC5sYXN0Q2hpbGQpIHtcbiAgICBwYXJlbnQucmVtb3ZlQ2hpbGQocGFyZW50Lmxhc3RDaGlsZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlUmlnaHRNYWluUHJvamVjdFdpdGhUYXNrcyhwcm9qZWN0TmFtZSkge1xuICBsZXQgbWFpblJpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLXJpZ2h0XCIpO1xuICBkZWxldGVDaGlsZHJlbihtYWluUmlnaHQpO1xuXG4gIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgcHJvamVjdFRpdGxlLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LXRpdGxlXCIpO1xuICBwcm9qZWN0VGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0TmFtZTtcbiAgLy8gcHJvamVjdFRpdGxlLnRleHRDb250ZW50ID0gYnRuO1xuXG4gIGNvbnN0IHRhc2tzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdGFza3NDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInRhc2tzLWNvbnRhaW5lclwiKTtcblxuICBjb25zdCB0YXNrc0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHRhc2tzSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrcy1oZWFkZXJcIik7XG5cbiAgY29uc3QgdGFza3NIZWFkZXJXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdGFza3NIZWFkZXJXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrcy1oZWFkZXItd3JhcHBlclwiKTtcblxuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBkaXYudGV4dENvbnRlbnQgPSBcIlRhc2tzXCI7XG5cbiAgY29uc3Qgc3Bhbk51bWJlck9mVGFza3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgc3Bhbk51bWJlck9mVGFza3MuY2xhc3NMaXN0LmFkZChcIm51bWJlci1vZi10YXNrc1wiKTtcbiAgc3Bhbk51bWJlck9mVGFza3MudGV4dENvbnRlbnQgPSBgKCR7QWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShcbiAgICBwcm9qZWN0TmFtZVxuICApLmdldFRhc2tzQ291bnQoKX0pYDtcblxuICBkaXYuYXBwZW5kQ2hpbGQoc3Bhbk51bWJlck9mVGFza3MpO1xuXG4gIGNvbnN0IGRpdjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBkaXYyLmNsYXNzTGlzdC5hZGQoXCJhZGQtYS10YXNrXCIpO1xuXG4gIGNvbnN0IHNwYW5QbHVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIHNwYW5QbHVzLmNsYXNzTGlzdC5hZGQoXCJwbHVzXCIpO1xuICBzcGFuUGx1cy50ZXh0Q29udGVudCA9IFwiK1wiO1xuXG4gIGNvbnN0IHNwYW5BZGRUYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIHNwYW5BZGRUYXNrLnRleHRDb250ZW50ID0gXCJBZGQgYSB0YXNrXCI7XG5cbiAgZGl2Mi5hcHBlbmRDaGlsZChzcGFuUGx1cyk7XG4gIGRpdjIuYXBwZW5kQ2hpbGQoc3BhbkFkZFRhc2spO1xuXG4gIHRhc2tzSGVhZGVyV3JhcHBlci5hcHBlbmRDaGlsZChkaXYpO1xuICB0YXNrc0hlYWRlcldyYXBwZXIuYXBwZW5kQ2hpbGQoZGl2Mik7XG5cbiAgdGFza3NIZWFkZXIuYXBwZW5kQ2hpbGQodGFza3NIZWFkZXJXcmFwcGVyKTtcblxuICB0YXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrc0hlYWRlcik7XG4gIG1haW5SaWdodC5hcHBlbmRDaGlsZChwcm9qZWN0VGl0bGUpO1xuICBtYWluUmlnaHQuYXBwZW5kQ2hpbGQodGFza3NDb250YWluZXIpO1xuICAvL1RPRE86IEFkZCB0aGUgbG9naWMgdG8gZGlzcGxheSBjdXJyZW50IHRhc2tzXG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIHtcbiAgY29uc3RydWN0b3IobmFtZSwgcHJpbywgZGVzYywgZHVlZGF0ZSkge1xuICAgIHRoaXMudGl0bGUgPSBuYW1lO1xuICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjO1xuICAgIHRoaXMuZHVlZGF0ZSA9IGR1ZWRhdGU7XG4gICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIGdldCBuYW1lKCkge1xuICAvLyAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAvLyB9XG5cbiAgLy8gc2V0IG5hbWUodmFsdWUpIHtcbiAgLy8gICBpZiAodmFsdWUubGVuZ3RoIDwgMSkge1xuICAvLyAgICAgYWxlcnQoXCJUYXNrJ3MgbmFtZSBjYW5ub3QgYmUgZW1wdHkuXCIpO1xuICAvLyAgICAgcmV0dXJuO1xuICAvLyAgIH1cbiAgLy8gICB0aGlzLl9uYW1lID0gdmFsdWU7XG4gIC8vIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdFwiO1xuaW1wb3J0IEFsbFByb2plY3RzIGZyb20gXCIuL3Byb2plY3RzLWxpc3RcIjtcbmltcG9ydCBUYXNrIGZyb20gXCIuL3Rhc2tcIjtcbmltcG9ydCBpbml0RG9tIGZyb20gXCIuL3JlZHVuZGFudFwiO1xuXG5pbml0RG9tKCk7XG5cbi8vIGFkZFByb2plY3QoQWxsUHJvamVjdHMpO1xuY29uc3QgZm9vdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb290ZXJcIik7XG5cbmZvb3Rlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNvbnN0IHNvbWVUYXNrID0gbmV3IFRhc2soXCJQcm9iYVwiLCBcImxvd1wiLCBcIlNvbWUgc3R1cGlkIHNoaXRcIiwgXCIzMC4xMS4yMDIyXCIpO1xuICAgIGNvbnN0IHByb2ogPSBuZXcgUHJvamVjdChcIkx1ZG5pY2hrYVwiKTtcbiAgICBwcm9qLmFkZE5ld1Rhc2soc29tZVRhc2spO1xuICAgIGNvbnNvbGUubG9nKHByb2ouZ2V0VGFza3MoKSk7XG59KVxuXG5cblxuXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==