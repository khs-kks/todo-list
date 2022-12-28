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

  for (let i = 0; i < _class_projects_holder__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectsCount(); i += 1) {
    const btn = document.createElement("button");
    btn.classList.add("projects");
    btn.setAttribute("data-project", _class_projects_holder__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectAtIndex(i).name);
    const divider = document.createElement("span");
    divider.classList.add("divider");

    divider.innerHTML = `<img src='./images/format-list-checks.png' alt='Image of checklist'>${
      _class_projects_holder__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectAtIndex(i).name
    }`;

    const taskCount = document.createElement("span");
    taskCount.classList.add("task-count");
    taskCount.textContent = _class_projects_holder__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectAtIndex(i).getTasksCount();

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

  //Add event listeners for add todo project button
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
  mainRight.appendChild(projectTitle);
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
/* harmony import */ var _class_task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./class-task */ "./src/class-task.js");
/* harmony import */ var _DOM_add_project__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DOM-add-project */ "./src/DOM-add-project.js");





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

(0,_DOM_add_project__WEBPACK_IMPORTED_MODULE_3__["default"])(_class_projects_holder__WEBPACK_IMPORTED_MODULE_1__["default"]);






})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3BCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTnNDO0FBQ1k7QUFDbEI7QUFDVzs7QUFFM0Msd0JBQXdCLHNEQUFPO0FBQy9CLGtCQUFrQixzREFBTzs7QUFFekIsK0VBQTRCO0FBQzVCLCtFQUE0QjtBQUM1QixZQUFZLDBFQUF1Qjs7QUFFbkM7O0FBRUEsNEVBQXlCO0FBQ3pCLFlBQVksMEVBQXVCOztBQUVuQyw0RUFBeUI7QUFDekIsWUFBWSwwRUFBdUI7O0FBRW5DLDREQUFVLENBQUMsOERBQVciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvRE9NLWFkZC1wcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jbGFzcy1wcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jbGFzcy1wcm9qZWN0cy1ob2xkZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NsYXNzLXRhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9qZWN0IGZyb20gXCIuL2NsYXNzLXByb2plY3RcIjtcbmltcG9ydCBBbGxQcm9qZWN0cyBmcm9tIFwiLi9jbGFzcy1wcm9qZWN0cy1ob2xkZXJcIjtcbmltcG9ydCBUYXNrIGZyb20gXCIuL2NsYXNzLXRhc2tcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkUHJvamVjdChwcm9qZWN0c0xpc3QpIHtcbiAgbGV0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0XCIpO1xuICBsZXQgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhbmNlbC1wcm9qZWN0LWNyZWF0aW9uXCIpO1xuICBsZXQgYWRkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9jZWVkLXByb2plY3QtY3JlYXRpb25cIik7XG5cbiAgYWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHRvZ2dsZVByb2plY3RDcmVhdGlvbk1vZGFsKCk7XG4gIH0pO1xuXG4gIGFkZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3QtdGl0bGUtZm9ybVwiKS52YWx1ZSkge1xuICAgICAgY29uc3QgY3JlYXRpbmdQcm9qZWN0ID0gbmV3IFByb2plY3QoXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC10aXRsZS1mb3JtXCIpLnZhbHVlXG4gICAgICApO1xuICAgICAgcHJvamVjdHNMaXN0LmFwcGVuZE5ld1Byb2plY3QoY3JlYXRpbmdQcm9qZWN0KTtcbiAgICAgIHRvZ2dsZVByb2plY3RDcmVhdGlvbk1vZGFsKCk7XG4gICAgICB1cGRhdGVMZWZ0TmF2KHByb2plY3RzTGlzdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KFwiVGl0bGUgY2Fubm90IGJlIGVtcHR5IVwiKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgdG9nZ2xlUHJvamVjdENyZWF0aW9uTW9kYWwoKTtcbiAgICB1cGRhdGVMZWZ0TmF2KHByb2plY3RzTGlzdCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB0b2dnbGVQcm9qZWN0Q3JlYXRpb25Nb2RhbCgpIHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LXRpdGxlLWZvcm1cIikudmFsdWUgPSBcIlwiO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRlbnRcIikuY2xhc3NMaXN0LnRvZ2dsZShcImJsdXItY29udGVudFwiKTtcbiAgZG9jdW1lbnRcbiAgICAucXVlcnlTZWxlY3RvcihcIi5hZGQtcHJvamVjdC1tb2RhbFwiKVxuICAgIC5jbGFzc0xpc3QudG9nZ2xlKFwiYWRkLXByb2plY3QtbW9kYWwtdmlzaWJsZVwiKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlTGVmdE5hdihwcm9qZWN0c0xpc3QpIHtcbiAgLy9GaXJzdCBkZWxldGUgZXZlcnkgcHJvamVjdCBidXQgdGhlICsgQWRkIHByb2plY3QgYnV0dG9uXG4gIGxldCBwcm9qZWN0c0Rpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvd2VyLWJ1dHRvbnNcIik7XG4gIGxldCBhZGRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0XCIpO1xuXG4gIHdoaWxlIChwcm9qZWN0c0Rpc3BsYXkubGFzdENoaWxkICE9PSBhZGRCdXR0b24pIHtcbiAgICBwcm9qZWN0c0Rpc3BsYXkucmVtb3ZlQ2hpbGQocHJvamVjdHNEaXNwbGF5Lmxhc3RDaGlsZCk7XG4gIH1cblxuICAvL1RoZW4gUG9wdWxhdGUgdGhlIG5hdiB3aXRoIHRoZSBleGlzdGluZyBwcm9qZWN0c1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgQWxsUHJvamVjdHMuZ2V0UHJvamVjdHNDb3VudCgpOyBpICs9IDEpIHtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwicHJvamVjdHNcIik7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiLCBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QXRJbmRleChpKS5uYW1lKTtcbiAgICBjb25zdCBkaXZpZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgZGl2aWRlci5jbGFzc0xpc3QuYWRkKFwiZGl2aWRlclwiKTtcblxuICAgIGRpdmlkZXIuaW5uZXJIVE1MID0gYDxpbWcgc3JjPScuL2ltYWdlcy9mb3JtYXQtbGlzdC1jaGVja3MucG5nJyBhbHQ9J0ltYWdlIG9mIGNoZWNrbGlzdCc+JHtcbiAgICAgIEFsbFByb2plY3RzLmdldFByb2plY3RBdEluZGV4KGkpLm5hbWVcbiAgICB9YDtcblxuICAgIGNvbnN0IHRhc2tDb3VudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIHRhc2tDb3VudC5jbGFzc0xpc3QuYWRkKFwidGFzay1jb3VudFwiKTtcbiAgICB0YXNrQ291bnQudGV4dENvbnRlbnQgPSBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QXRJbmRleChpKS5nZXRUYXNrc0NvdW50KCk7XG5cbiAgICBidG4uYXBwZW5kQ2hpbGQoZGl2aWRlcik7XG4gICAgYnRuLmFwcGVuZENoaWxkKHRhc2tDb3VudCk7XG4gICAgcHJvamVjdHNEaXNwbGF5LmFwcGVuZENoaWxkKGJ0bik7XG5cbiAgICAvL0FkZCBldmVudCBsaXN0ZW5lciB0byBlYWNoIHByb2plY3QncyBidXR0b24gb24gdGhlIGxlZnQgbmF2IGJhclxuXG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBpZiAocHJvamVjdHNMaXN0LmdldFByb2plY3RBdEluZGV4KGkpLmdldFRhc2tzQ291bnQoKSA9PT0gMCkge1xuICAgICAgICB1cGRhdGVSaWdodE1haW5FbXB0eVByb2plY3QoYnRuKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVwZGF0ZVJpZ2h0TWFpblByb2plY3RXaXRoVGFza3MoYnRuKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVSaWdodE1haW5FbXB0eVByb2plY3QoYnRuKSB7XG4gIGxldCBtYWluUmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tcmlnaHRcIik7XG5cbiAgZGVsZXRlQ2hpbGRyZW4obWFpblJpZ2h0KTtcblxuICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZGl2LmNsYXNzTGlzdC5hZGQoXCJlbXB0eS1wcm9qZWN0XCIpO1xuXG4gIGxldCBoMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgaDEudGV4dENvbnRlbnQgPSBcIkVtcHR5IFByb2plY3QhXCI7XG5cbiAgbGV0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgcC50ZXh0Q29udGVudCA9IFwiQ3JlYXRlIGEgbmV3IHRvLWRvIGl0ZW0gb3IgZGVsZXRlIHRoZSBwcm9qZWN0XCI7XG5cbiAgbGV0IGRpdkJ1dHRvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBkaXZCdXR0b25zLmNsYXNzTGlzdC5hZGQoXCJlbXB0eS1wcm9qZWN0LWJ1dHRvbnNcIik7XG5cbiAgbGV0IGFkZEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGFkZEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWRkLXRvZG9cIik7XG4gIGFkZEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQUREIFRPLURPXCI7XG4gIGFkZEJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIiwgYnRuLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSk7XG5cbiAgbGV0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGRlbGV0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLXByb2plY3RcIik7XG4gIGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiREVMRVRFIFBST0pFQ1RcIjtcbiAgZGVsZXRlQnV0dG9uLnNldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiLCBidG4uZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpKTtcblxuICBkaXZCdXR0b25zLmFwcGVuZENoaWxkKGFkZEJ1dHRvbik7XG4gIGRpdkJ1dHRvbnMuYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcblxuICBkaXYuYXBwZW5kQ2hpbGQoaDEpO1xuICBkaXYuYXBwZW5kQ2hpbGQocCk7XG4gIGRpdi5hcHBlbmRDaGlsZChkaXZCdXR0b25zKTtcblxuICBtYWluUmlnaHQuYXBwZW5kQ2hpbGQoZGl2KTtcblxuICAvL0FkZCBldmVudCBsaXN0ZW5lcnMgZm9yIGRlbGV0ZSBwcm9qZWN0IGJ1dHRvblxuXG4gIGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIEFsbFByb2plY3RzLmRlbGV0ZVByb2plY3QoZGVsZXRlQnV0dG9uLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSk7XG4gICAgdXBkYXRlTGVmdE5hdihBbGxQcm9qZWN0cyk7XG4gICAgZGVsZXRlQ2hpbGRyZW4obWFpblJpZ2h0KTtcbiAgfSk7XG5cbiAgLy9BZGQgZXZlbnQgbGlzdGVuZXJzIGZvciBhZGQgdG9kbyBwcm9qZWN0IGJ1dHRvblxuICBhZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICB0b2dnbGVUYXNrQ3JlYXRpb25Nb2RhbChhZGRCdXR0b24uZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZVRhc2tDcmVhdGlvbk1vZGFsKHByb2plY3QpIHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLXRpdGxlLWZvcm1cIikudmFsdWUgPSBcIlwiO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stZGVzY3JpcHRpb25cIikudmFsdWUgPSBcIlwiO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRlbnRcIikuY2xhc3NMaXN0LnRvZ2dsZShcImJsdXItY29udGVudFwiKTtcbiAgZG9jdW1lbnRcbiAgICAucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay1tb2RhbFwiKVxuICAgIC5jbGFzc0xpc3QudG9nZ2xlKFwiYWRkLXRhc2stbW9kYWwtdmlzaWJsZVwiKTtcbiAgaWYgKFxuICAgIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay1tb2RhbFwiKVxuICAgICAgLmNsYXNzTGlzdC5jb250YWlucyhcImFkZC10YXNrLW1vZGFsLXZpc2libGVcIilcbiAgKSB7XG4gICAgbGV0IGJ1dHRvbkNhbmNlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2stbW9kYWwtYnV0dG9ucy1jYW5jZWxcIik7XG4gICAgbGV0IGJ1dHRvbkFkZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2stbW9kYWwtYnV0dG9ucy1hZGRcIik7XG5cbiAgICBidXR0b25DYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRvZ2dsZVRhc2tDcmVhdGlvbk1vZGFsKHByb2plY3QpO1xuICAgIH0pO1xuXG4gICAgYnV0dG9uQWRkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBhZGRUYXNrVG9Qcm9qZWN0KHByb2plY3QpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHVwZGF0ZVJpZ2h0TWFpblByb2plY3RXaXRoVGFza3MocHJvamVjdCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkVGFza1RvUHJvamVjdChwcm9qZWN0TmFtZSkge1xuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay10aXRsZS1mb3JtXCIpLnZhbHVlO1xuICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kZXNjcmlwdGlvblwiKS52YWx1ZTtcbiAgY29uc3QgcHJpbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjUHJpb3JpdHlcIikudmFsdWU7XG4gIGNvbnN0IGR1ZWRhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stZHVlLWRhdGVcIikudmFsdWU7XG5cbiAgY29uc3QgbmV3VGFzayA9IG5ldyBUYXNrKHRpdGxlLCBwcmlvLCBkZXNjcmlwdGlvbiwgZHVlZGF0ZSk7XG5cbiAgQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShwcm9qZWN0TmFtZSkuYWRkTmV3VGFzayhuZXdUYXNrKTtcbiAgdXBkYXRlTGVmdE5hdihBbGxQcm9qZWN0cyk7XG5cbiAgdG9nZ2xlVGFza0NyZWF0aW9uTW9kYWwocHJvamVjdE5hbWUpO1xufVxuXG5mdW5jdGlvbiBkZWxldGVDaGlsZHJlbihwYXJlbnQpIHtcbiAgd2hpbGUgKHBhcmVudC5sYXN0Q2hpbGQpIHtcbiAgICBwYXJlbnQucmVtb3ZlQ2hpbGQocGFyZW50Lmxhc3RDaGlsZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlUmlnaHRNYWluUHJvamVjdFdpdGhUYXNrcyhidG4pIHtcbiAgbGV0IG1haW5SaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1yaWdodFwiKTtcbiAgZGVsZXRlQ2hpbGRyZW4obWFpblJpZ2h0KTtcblxuICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gIHByb2plY3RUaXRsZS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC10aXRsZVwiKTtcbiAgcHJvamVjdFRpdGxlLnRleHRDb250ZW50ID0gYnRuLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKTtcbiAgLy8gcHJvamVjdFRpdGxlLnRleHRDb250ZW50ID0gYnRuO1xuXG4gIGNvbnN0IHRhc2tzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdGFza3NDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInRhc2tzLWNvbnRhaW5lclwiKTtcblxuICBjb25zdCB0YXNrc0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHRhc2tzSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrcy1oZWFkZXJcIik7XG5cbiAgY29uc3QgdGFza3NIZWFkZXJXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdGFza3NIZWFkZXJXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrcy1oZWFkZXItd3JhcHBlclwiKTtcblxuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBkaXYudGV4dENvbnRlbnQgPSBcIlRhc2tzXCI7XG5cbiAgY29uc3Qgc3Bhbk51bWJlck9mVGFza3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgc3Bhbk51bWJlck9mVGFza3MuY2xhc3NMaXN0LmFkZChcIm51bWJlci1vZi10YXNrc1wiKTtcbiAgc3Bhbk51bWJlck9mVGFza3MudGV4dENvbnRlbnQgPSBgKCR7QWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShcbiAgICBidG4uZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpXG4gICkuZ2V0VGFza3NDb3VudCgpfSlgO1xuXG4gIGRpdi5hcHBlbmRDaGlsZChzcGFuTnVtYmVyT2ZUYXNrcyk7XG5cbiAgY29uc3QgZGl2MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGRpdjIuY2xhc3NMaXN0LmFkZChcImFkZC1hLXRhc2tcIik7XG5cbiAgY29uc3Qgc3BhblBsdXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgc3BhblBsdXMuY2xhc3NMaXN0LmFkZChcInBsdXNcIik7XG4gIHNwYW5QbHVzLnRleHRDb250ZW50ID0gXCIrXCI7XG5cbiAgY29uc3Qgc3BhbkFkZFRhc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgc3BhbkFkZFRhc2sudGV4dENvbnRlbnQgPSBcIkFkZCBhIHRhc2tcIjtcblxuICBkaXYyLmFwcGVuZENoaWxkKHNwYW5QbHVzKTtcbiAgZGl2Mi5hcHBlbmRDaGlsZChzcGFuQWRkVGFzayk7XG5cbiAgdGFza3NIZWFkZXJXcmFwcGVyLmFwcGVuZENoaWxkKGRpdik7XG4gIHRhc2tzSGVhZGVyV3JhcHBlci5hcHBlbmRDaGlsZChkaXYyKTtcblxuICB0YXNrc0hlYWRlci5hcHBlbmRDaGlsZCh0YXNrc0hlYWRlcldyYXBwZXIpO1xuXG4gIHRhc2tzQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tzSGVhZGVyKTtcbiAgbWFpblJpZ2h0LmFwcGVuZENoaWxkKHByb2plY3RUaXRsZSk7XG4gIG1haW5SaWdodC5hcHBlbmRDaGlsZCh0YXNrc0NvbnRhaW5lcik7XG4gIC8vVE9ETzogQWRkIHRoZSBsb2dpYyB0byBkaXNwbGF5IGN1cnJlbnQgdGFza3Ncbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3Qge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnRhc2tzID0gW107XG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuXG4gIHNldCBuYW1lKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlLmxlbmd0aCA8IDEpIHtcbiAgICAgIGFsZXJ0KFwiUHJvamVjdCdzIG5hbWUgY2Fubm90IGJlIGVtcHR5LlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0VGFza3MoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFza3M7XG4gIH1cblxuICBnZXRUYXNrc0NvdW50KCkge1xuICAgIHJldHVybiB0aGlzLnRhc2tzLmxlbmd0aDtcbiAgfVxuXG4gIGFkZE5ld1Rhc2sodGFzaykge1xuICAgIHRoaXMudGFza3MucHVzaCh0YXNrKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWxsUHJvamVjdHMge1xuICBzdGF0aWMgcHJvamVjdHMgPSBbXTtcblxuICBzdGF0aWMgZ2V0UHJvamVjdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdHM7XG4gIH1cblxuICBzdGF0aWMgZ2V0UHJvamVjdHNDb3VudCgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5sZW5ndGg7XG4gIH1cblxuICBzdGF0aWMgZ2V0UHJvamVjdEF0SW5kZXgoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPCB0aGlzLmdldFByb2plY3RzQ291bnQoKSkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvamVjdHNbaW5kZXhdO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRQcm9qZWN0QnlOYW1lKHByb2plY3ROYW1lKSB7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZ2V0UHJvamVjdHNDb3VudCgpOyBpKz0xKSB7XG4gICAgICAgIGlmICh0aGlzLmdldFByb2plY3RzKClbaV0ubmFtZSA9PT0gcHJvamVjdE5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGFwcGVuZE5ld1Byb2plY3QoUHJvamVjdCkge1xuICAgIGlmIChQcm9qZWN0Lm5hbWUpIHtcbiAgICAgIHRoaXMucHJvamVjdHMucHVzaChQcm9qZWN0KTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlUHJvamVjdChwcm9qZWN0TmFtZSkge1xuICAgIHRoaXMucHJvamVjdHMgPSB0aGlzLnByb2plY3RzLmZpbHRlcihmdW5jdGlvbiAob2JqLCBpbmRleCwgYXJyKSB7XG4gICAgICByZXR1cm4gb2JqLm5hbWUgIT09IHByb2plY3ROYW1lO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gICBjb25zdHJ1Y3RvcigpIHtcbiAgLy8gICAgIHRoaXMucHJvamVjdHMgPSBbXTtcbiAgLy8gICB9XG5cbiAgLy8gICBnZXRQcm9qZWN0cygpIHtcbiAgLy8gICAgIHJldHVybiB0aGlzLnByb2plY3RzO1xuICAvLyAgIH1cblxuICAvLyAgIGdldFByb2plY3RzQ291bnQoKSB7XG4gIC8vICAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5sZW5ndGg7XG4gIC8vICAgfVxuXG4gIC8vICAgZ2V0UHJvamVjdEF0SW5kZXgoaW5kZXgpIHtcbiAgLy8gICAgIGlmIChpbmRleCA8IHRoaXMuZ2V0UHJvamVjdHNDb3VudCgpKSB7XG4gIC8vICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzW2luZGV4XTtcbiAgLy8gICAgIH1cbiAgLy8gICB9XG4gIC8vICAgYXBwZW5kTmV3UHJvamVjdChQcm9qZWN0KSB7XG4gIC8vICAgICBpZiAoUHJvamVjdC5uYW1lKSB7XG4gIC8vICAgICAgIHRoaXMucHJvamVjdHMucHVzaChQcm9qZWN0KTtcbiAgLy8gICAgIH1cbiAgLy8gICB9XG5cbiAgLy8gICBkZWxldGVQcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gIC8vICAgICB0aGlzLnByb2plY3RzID0gdGhpcy5wcm9qZWN0cy5maWx0ZXIoZnVuY3Rpb24gKG9iaiwgaW5kZXgsIGFycikge1xuICAvLyAgICAgICByZXR1cm4gb2JqLm5hbWUgIT09IHByb2plY3ROYW1lO1xuICAvLyAgICAgfSk7XG4gIC8vICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIHByaW8sIGRlc2MsIGR1ZWRhdGUpIHtcbiAgICB0aGlzLnRpdGxlID0gbmFtZTtcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpbztcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzYztcbiAgICB0aGlzLmR1ZWRhdGUgPSBkdWVkYXRlO1xuICAgIHRoaXMuY29tcGxldGVkID0gZmFsc2U7XG4gIH1cblxuICAvLyBnZXQgbmFtZSgpIHtcbiAgLy8gICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgLy8gfVxuXG4gIC8vIHNldCBuYW1lKHZhbHVlKSB7XG4gIC8vICAgaWYgKHZhbHVlLmxlbmd0aCA8IDEpIHtcbiAgLy8gICAgIGFsZXJ0KFwiVGFzaydzIG5hbWUgY2Fubm90IGJlIGVtcHR5LlwiKTtcbiAgLy8gICAgIHJldHVybjtcbiAgLy8gICB9XG4gIC8vICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xuICAvLyB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBQcm9qZWN0IGZyb20gXCIuL2NsYXNzLXByb2plY3RcIjtcbmltcG9ydCBBbGxQcm9qZWN0cyBmcm9tIFwiLi9jbGFzcy1wcm9qZWN0cy1ob2xkZXJcIjtcbmltcG9ydCBUYXNrIGZyb20gXCIuL2NsYXNzLXRhc2tcIjtcbmltcG9ydCBhZGRQcm9qZWN0IGZyb20gXCIuL0RPTS1hZGQtcHJvamVjdFwiO1xuXG5jb25zdCB0ZXN0UHJvamVjdCA9IG5ldyBQcm9qZWN0KFwiS3Jpc2thdGEgc2UgdWNoaVwiKTtcbmNvbnN0IHRlc3QyID0gbmV3IFByb2plY3QoXCJQcm9iYVwiKTtcblxuQWxsUHJvamVjdHMuYXBwZW5kTmV3UHJvamVjdCh0ZXN0Mik7XG5BbGxQcm9qZWN0cy5hcHBlbmROZXdQcm9qZWN0KHRlc3RQcm9qZWN0KTtcbmNvbnNvbGUubG9nKEFsbFByb2plY3RzLmdldFByb2plY3RzKCkpO1xuXG5jb25zb2xlLmxvZyhcIkFmdGVyIGZpbHRlcmluZzogXCIpXG5cbkFsbFByb2plY3RzLmRlbGV0ZVByb2plY3QodGVzdDIubmFtZSk7XG5jb25zb2xlLmxvZyhBbGxQcm9qZWN0cy5nZXRQcm9qZWN0cygpKTtcblxuQWxsUHJvamVjdHMuZGVsZXRlUHJvamVjdChcInByb2JhMVwiKTtcbmNvbnNvbGUubG9nKEFsbFByb2plY3RzLmdldFByb2plY3RzKCkpO1xuXG5hZGRQcm9qZWN0KEFsbFByb2plY3RzKTtcblxuXG5cblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=