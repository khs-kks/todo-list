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

  for (let i = 0; i < _class_projects_holder__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectsCount(); i++) {
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
      const buttons = Array.from(document.querySelectorAll(".projects"));

      //Switch the highlighted project
      buttons.forEach((button) => {
        if (button.classList.contains("projects-active")) {
          button.classList.toggle("projects-active");
        }
      });

      btn.classList.add("projects-active");
      if (_class_projects_holder__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectAtIndex(i).getTasksCount() === 0) {
        updateRightMainEmptyProject(_class_projects_holder__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectAtIndex(i).name);
      } else {
        updateRightMainProjectWithTasks(_class_projects_holder__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectAtIndex(i).name);
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
    _class_projects_holder__WEBPACK_IMPORTED_MODULE_1__["default"].deleteProject(deleteButton.getAttribute("data-project"));
    updateLeftNav();
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
    const buttonCancel = document.querySelector(
      ".add-task-modal-buttons-cancel"
    );
    const buttonAdd = document.querySelector(".add-task-modal-buttons-add");
    buttonAdd.setAttribute("data-project", project);

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
  updateLeftNav();

  toggleTaskCreationModal(projectName);
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
  spanNumberOfTasks.textContent = `(${_class_projects_holder__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectByName(
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
    for(let i = 0; i < this.getProjectsCount(); i++) {
        if (this.getProjects()[i].name === projectName) {
            return this.projects[i];
        }
    }
    return
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





(0,_DOM_add_project__WEBPACK_IMPORTED_MODULE_3__["default"])(_class_projects_holder__WEBPACK_IMPORTED_MODULE_1__["default"]);
const footer = document.querySelector(".footer");

footer.addEventListener("click", () => {
    const someTask = new _class_task__WEBPACK_IMPORTED_MODULE_2__["default"]("Proba", "low", "Some stupid shit", "30.11.2022");
    const proj = new _class_project__WEBPACK_IMPORTED_MODULE_0__["default"]("Ludnichka");
    proj.addNewTask(someTask);
    console.log(proj.getTasks());
})






})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7Ozs7O0FDbEVlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNwQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05zQztBQUNZO0FBQ2xCO0FBQ1c7O0FBRTNDLDREQUFVLENBQUMsOERBQVc7QUFDdEI7O0FBRUE7QUFDQSx5QkFBeUIsbURBQUk7QUFDN0IscUJBQXFCLHNEQUFPO0FBQzVCO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL0RPTS1hZGQtcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY2xhc3MtcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY2xhc3MtcHJvamVjdHMtaG9sZGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jbGFzcy10YXNrLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9jbGFzcy1wcm9qZWN0XCI7XG5pbXBvcnQgQWxsUHJvamVjdHMgZnJvbSBcIi4vY2xhc3MtcHJvamVjdHMtaG9sZGVyXCI7XG5pbXBvcnQgVGFzayBmcm9tIFwiLi9jbGFzcy10YXNrXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFkZFByb2plY3QocHJvamVjdHNMaXN0KSB7XG4gIGxldCBhZGRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtcHJvamVjdFwiKTtcbiAgbGV0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYW5jZWwtcHJvamVjdC1jcmVhdGlvblwiKTtcbiAgbGV0IGFkZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvY2VlZC1wcm9qZWN0LWNyZWF0aW9uXCIpO1xuXG4gIGFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICB0b2dnbGVQcm9qZWN0Q3JlYXRpb25Nb2RhbCgpO1xuICB9KTtcblxuICBhZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LXRpdGxlLWZvcm1cIikudmFsdWUpIHtcbiAgICAgIGNvbnN0IGNyZWF0aW5nUHJvamVjdCA9IG5ldyBQcm9qZWN0KFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3QtdGl0bGUtZm9ybVwiKS52YWx1ZVxuICAgICAgKTtcbiAgICAgIHByb2plY3RzTGlzdC5hcHBlbmROZXdQcm9qZWN0KGNyZWF0aW5nUHJvamVjdCk7XG4gICAgICB0b2dnbGVQcm9qZWN0Q3JlYXRpb25Nb2RhbCgpO1xuICAgICAgdXBkYXRlTGVmdE5hdigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydChcIlRpdGxlIGNhbm5vdCBiZSBlbXB0eSFcIik7XG4gICAgfVxuICB9KTtcblxuICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHRvZ2dsZVByb2plY3RDcmVhdGlvbk1vZGFsKCk7XG4gICAgdXBkYXRlTGVmdE5hdigpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlUHJvamVjdENyZWF0aW9uTW9kYWwoKSB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC10aXRsZS1mb3JtXCIpLnZhbHVlID0gXCJcIjtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250ZW50XCIpLmNsYXNzTGlzdC50b2dnbGUoXCJibHVyLWNvbnRlbnRcIik7XG4gIGRvY3VtZW50XG4gICAgLnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXByb2plY3QtbW9kYWxcIilcbiAgICAuY2xhc3NMaXN0LnRvZ2dsZShcImFkZC1wcm9qZWN0LW1vZGFsLXZpc2libGVcIik7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxlZnROYXYoKSB7XG4gIC8vRmlyc3QgZGVsZXRlIGV2ZXJ5IHByb2plY3QgYnV0IHRoZSArIEFkZCBwcm9qZWN0IGJ1dHRvblxuICBsZXQgcHJvamVjdHNEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb3dlci1idXR0b25zXCIpO1xuICBsZXQgYWRkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtcHJvamVjdFwiKTtcblxuICB3aGlsZSAocHJvamVjdHNEaXNwbGF5Lmxhc3RDaGlsZCAhPT0gYWRkQnV0dG9uKSB7XG4gICAgcHJvamVjdHNEaXNwbGF5LnJlbW92ZUNoaWxkKHByb2plY3RzRGlzcGxheS5sYXN0Q2hpbGQpO1xuICB9XG5cbiAgLy9UaGVuIFBvcHVsYXRlIHRoZSBuYXYgd2l0aCB0aGUgZXhpc3RpbmcgcHJvamVjdHNcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IEFsbFByb2plY3RzLmdldFByb2plY3RzQ291bnQoKTsgaSsrKSB7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidG4uY2xhc3NMaXN0LmFkZChcInByb2plY3RzXCIpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIiwgQWxsUHJvamVjdHMuZ2V0UHJvamVjdEF0SW5kZXgoaSkubmFtZSk7XG4gICAgY29uc3QgZGl2aWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIGRpdmlkZXIuY2xhc3NMaXN0LmFkZChcImRpdmlkZXJcIik7XG5cbiAgICBkaXZpZGVyLmlubmVySFRNTCA9IGA8aW1nIHNyYz0nLi9pbWFnZXMvZm9ybWF0LWxpc3QtY2hlY2tzLnBuZycgYWx0PSdJbWFnZSBvZiBjaGVja2xpc3QnPiR7XG4gICAgICBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QXRJbmRleChpKS5uYW1lXG4gICAgfWA7XG5cbiAgICBjb25zdCB0YXNrQ291bnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICB0YXNrQ291bnQuY2xhc3NMaXN0LmFkZChcInRhc2stY291bnRcIik7XG4gICAgdGFza0NvdW50LnRleHRDb250ZW50ID0gQWxsUHJvamVjdHMuZ2V0UHJvamVjdEF0SW5kZXgoaSkuZ2V0VGFza3NDb3VudCgpO1xuXG4gICAgYnRuLmFwcGVuZENoaWxkKGRpdmlkZXIpO1xuICAgIGJ0bi5hcHBlbmRDaGlsZCh0YXNrQ291bnQpO1xuICAgIHByb2plY3RzRGlzcGxheS5hcHBlbmRDaGlsZChidG4pO1xuXG4gICAgLy9BZGQgZXZlbnQgbGlzdGVuZXIgdG8gZWFjaCBwcm9qZWN0J3MgYnV0dG9uIG9uIHRoZSBsZWZ0IG5hdiBiYXJcblxuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgYnV0dG9ucyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0c1wiKSk7XG5cbiAgICAgIC8vU3dpdGNoIHRoZSBoaWdobGlnaHRlZCBwcm9qZWN0XG4gICAgICBidXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgICBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucyhcInByb2plY3RzLWFjdGl2ZVwiKSkge1xuICAgICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKFwicHJvamVjdHMtYWN0aXZlXCIpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0cy1hY3RpdmVcIik7XG4gICAgICBpZiAoQWxsUHJvamVjdHMuZ2V0UHJvamVjdEF0SW5kZXgoaSkuZ2V0VGFza3NDb3VudCgpID09PSAwKSB7XG4gICAgICAgIHVwZGF0ZVJpZ2h0TWFpbkVtcHR5UHJvamVjdChBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QXRJbmRleChpKS5uYW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVwZGF0ZVJpZ2h0TWFpblByb2plY3RXaXRoVGFza3MoQWxsUHJvamVjdHMuZ2V0UHJvamVjdEF0SW5kZXgoaSkubmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlUmlnaHRNYWluRW1wdHlQcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gIGxldCBtYWluUmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tcmlnaHRcIik7XG5cbiAgZGVsZXRlQ2hpbGRyZW4obWFpblJpZ2h0KTtcblxuICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZGl2LmNsYXNzTGlzdC5hZGQoXCJlbXB0eS1wcm9qZWN0XCIpO1xuXG4gIGxldCBoMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgaDEudGV4dENvbnRlbnQgPSBcIkVtcHR5IFByb2plY3QhXCI7XG5cbiAgbGV0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgcC50ZXh0Q29udGVudCA9IFwiQ3JlYXRlIGEgbmV3IHRvLWRvIGl0ZW0gb3IgZGVsZXRlIHRoZSBwcm9qZWN0XCI7XG5cbiAgbGV0IGRpdkJ1dHRvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBkaXZCdXR0b25zLmNsYXNzTGlzdC5hZGQoXCJlbXB0eS1wcm9qZWN0LWJ1dHRvbnNcIik7XG5cbiAgbGV0IGFkZEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGFkZEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWRkLXRvZG9cIik7XG4gIGFkZEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQUREIFRPLURPXCI7XG4gIGFkZEJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIiwgcHJvamVjdE5hbWUpO1xuXG4gIGxldCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBkZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZChcImRlbGV0ZS1wcm9qZWN0XCIpO1xuICBkZWxldGVCdXR0b24udGV4dENvbnRlbnQgPSBcIkRFTEVURSBQUk9KRUNUXCI7XG4gIGRlbGV0ZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIiwgcHJvamVjdE5hbWUpO1xuXG4gIGRpdkJ1dHRvbnMuYXBwZW5kQ2hpbGQoYWRkQnV0dG9uKTtcbiAgZGl2QnV0dG9ucy5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xuXG4gIGRpdi5hcHBlbmRDaGlsZChoMSk7XG4gIGRpdi5hcHBlbmRDaGlsZChwKTtcbiAgZGl2LmFwcGVuZENoaWxkKGRpdkJ1dHRvbnMpO1xuXG4gIG1haW5SaWdodC5hcHBlbmRDaGlsZChkaXYpO1xuXG4gIC8vQWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgZGVsZXRlIHByb2plY3QgYnV0dG9uXG5cbiAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgQWxsUHJvamVjdHMuZGVsZXRlUHJvamVjdChkZWxldGVCdXR0b24uZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpKTtcbiAgICB1cGRhdGVMZWZ0TmF2KCk7XG4gICAgZGVsZXRlQ2hpbGRyZW4obWFpblJpZ2h0KTtcbiAgfSk7XG5cbiAgLy9BZGQgZXZlbnQgbGlzdGVuZXJzIGZvciBhZGQgdG9kbyBwcm9qZWN0IGJ1dHRvblxuICBhZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICB0b2dnbGVUYXNrQ3JlYXRpb25Nb2RhbChhZGRCdXR0b24uZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZVRhc2tDcmVhdGlvbk1vZGFsKHByb2plY3QpIHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLXRpdGxlLWZvcm1cIikudmFsdWUgPSBcIlwiO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stZGVzY3JpcHRpb25cIikudmFsdWUgPSBcIlwiO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRlbnRcIikuY2xhc3NMaXN0LnRvZ2dsZShcImJsdXItY29udGVudFwiKTtcbiAgZG9jdW1lbnRcbiAgICAucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay1tb2RhbFwiKVxuICAgIC5jbGFzc0xpc3QudG9nZ2xlKFwiYWRkLXRhc2stbW9kYWwtdmlzaWJsZVwiKTtcbiAgaWYgKFxuICAgIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay1tb2RhbFwiKVxuICAgICAgLmNsYXNzTGlzdC5jb250YWlucyhcImFkZC10YXNrLW1vZGFsLXZpc2libGVcIilcbiAgKSB7XG4gICAgY29uc3QgYnV0dG9uQ2FuY2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIFwiLmFkZC10YXNrLW1vZGFsLWJ1dHRvbnMtY2FuY2VsXCJcbiAgICApO1xuICAgIGNvbnN0IGJ1dHRvbkFkZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2stbW9kYWwtYnV0dG9ucy1hZGRcIik7XG4gICAgYnV0dG9uQWRkLnNldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiLCBwcm9qZWN0KTtcblxuICAgIGJ1dHRvbkNhbmNlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdG9nZ2xlVGFza0NyZWF0aW9uTW9kYWwocHJvamVjdCk7XG4gICAgfSk7XG5cbiAgICBidXR0b25BZGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGFkZFRhc2tUb1Byb2plY3QocHJvamVjdCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgdXBkYXRlUmlnaHRNYWluUHJvamVjdFdpdGhUYXNrcyhwcm9qZWN0KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRUYXNrVG9Qcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLXRpdGxlLWZvcm1cIikudmFsdWU7XG4gIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWRlc2NyaXB0aW9uXCIpLnZhbHVlO1xuICBjb25zdCBwcmlvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNQcmlvcml0eVwiKS52YWx1ZTtcbiAgY29uc3QgZHVlZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kdWUtZGF0ZVwiKS52YWx1ZTtcblxuICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2sodGl0bGUsIHByaW8sIGRlc2NyaXB0aW9uLCBkdWVkYXRlKTtcblxuICBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKHByb2plY3ROYW1lKS5hZGROZXdUYXNrKG5ld1Rhc2spO1xuICB1cGRhdGVMZWZ0TmF2KCk7XG5cbiAgdG9nZ2xlVGFza0NyZWF0aW9uTW9kYWwocHJvamVjdE5hbWUpO1xufVxuXG5mdW5jdGlvbiBkZWxldGVDaGlsZHJlbihwYXJlbnQpIHtcbiAgd2hpbGUgKHBhcmVudC5sYXN0Q2hpbGQpIHtcbiAgICBwYXJlbnQucmVtb3ZlQ2hpbGQocGFyZW50Lmxhc3RDaGlsZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlUmlnaHRNYWluUHJvamVjdFdpdGhUYXNrcyhwcm9qZWN0TmFtZSkge1xuICBsZXQgbWFpblJpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLXJpZ2h0XCIpO1xuICBkZWxldGVDaGlsZHJlbihtYWluUmlnaHQpO1xuXG4gIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgcHJvamVjdFRpdGxlLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LXRpdGxlXCIpO1xuICBwcm9qZWN0VGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0TmFtZTtcbiAgLy8gcHJvamVjdFRpdGxlLnRleHRDb250ZW50ID0gYnRuO1xuXG4gIGNvbnN0IHRhc2tzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdGFza3NDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInRhc2tzLWNvbnRhaW5lclwiKTtcblxuICBjb25zdCB0YXNrc0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHRhc2tzSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrcy1oZWFkZXJcIik7XG5cbiAgY29uc3QgdGFza3NIZWFkZXJXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdGFza3NIZWFkZXJXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrcy1oZWFkZXItd3JhcHBlclwiKTtcblxuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBkaXYudGV4dENvbnRlbnQgPSBcIlRhc2tzXCI7XG5cbiAgY29uc3Qgc3Bhbk51bWJlck9mVGFza3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgc3Bhbk51bWJlck9mVGFza3MuY2xhc3NMaXN0LmFkZChcIm51bWJlci1vZi10YXNrc1wiKTtcbiAgc3Bhbk51bWJlck9mVGFza3MudGV4dENvbnRlbnQgPSBgKCR7QWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShcbiAgICBwcm9qZWN0TmFtZVxuICApLmdldFRhc2tzQ291bnQoKX0pYDtcblxuICBkaXYuYXBwZW5kQ2hpbGQoc3Bhbk51bWJlck9mVGFza3MpO1xuXG4gIGNvbnN0IGRpdjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBkaXYyLmNsYXNzTGlzdC5hZGQoXCJhZGQtYS10YXNrXCIpO1xuXG4gIGNvbnN0IHNwYW5QbHVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIHNwYW5QbHVzLmNsYXNzTGlzdC5hZGQoXCJwbHVzXCIpO1xuICBzcGFuUGx1cy50ZXh0Q29udGVudCA9IFwiK1wiO1xuXG4gIGNvbnN0IHNwYW5BZGRUYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIHNwYW5BZGRUYXNrLnRleHRDb250ZW50ID0gXCJBZGQgYSB0YXNrXCI7XG5cbiAgZGl2Mi5hcHBlbmRDaGlsZChzcGFuUGx1cyk7XG4gIGRpdjIuYXBwZW5kQ2hpbGQoc3BhbkFkZFRhc2spO1xuXG4gIHRhc2tzSGVhZGVyV3JhcHBlci5hcHBlbmRDaGlsZChkaXYpO1xuICB0YXNrc0hlYWRlcldyYXBwZXIuYXBwZW5kQ2hpbGQoZGl2Mik7XG5cbiAgdGFza3NIZWFkZXIuYXBwZW5kQ2hpbGQodGFza3NIZWFkZXJXcmFwcGVyKTtcblxuICB0YXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrc0hlYWRlcik7XG4gIG1haW5SaWdodC5hcHBlbmRDaGlsZChwcm9qZWN0VGl0bGUpO1xuICBtYWluUmlnaHQuYXBwZW5kQ2hpbGQodGFza3NDb250YWluZXIpO1xuICAvL1RPRE86IEFkZCB0aGUgbG9naWMgdG8gZGlzcGxheSBjdXJyZW50IHRhc2tzXG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy50YXNrcyA9IFtdO1xuICB9XG5cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cblxuICBzZXQgbmFtZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZS5sZW5ndGggPCAxKSB7XG4gICAgICBhbGVydChcIlByb2plY3QncyBuYW1lIGNhbm5vdCBiZSBlbXB0eS5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX25hbWUgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldFRhc2tzKCkge1xuICAgIHJldHVybiB0aGlzLnRhc2tzO1xuICB9XG5cbiAgZ2V0VGFza3NDb3VudCgpIHtcbiAgICByZXR1cm4gdGhpcy50YXNrcy5sZW5ndGg7XG4gIH1cblxuICBhZGROZXdUYXNrKHRhc2spIHtcbiAgICB0aGlzLnRhc2tzLnB1c2godGFzayk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFsbFByb2plY3RzIHtcbiAgc3RhdGljIHByb2plY3RzID0gW107XG5cbiAgc3RhdGljIGdldFByb2plY3RzKCkge1xuICAgIHJldHVybiB0aGlzLnByb2plY3RzO1xuICB9XG5cbiAgc3RhdGljIGdldFByb2plY3RzQ291bnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdHMubGVuZ3RoO1xuICB9XG5cbiAgc3RhdGljIGdldFByb2plY3RBdEluZGV4KGluZGV4KSB7XG4gICAgaWYgKGluZGV4IDwgdGhpcy5nZXRQcm9qZWN0c0NvdW50KCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb2plY3RzW2luZGV4XTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0UHJvamVjdEJ5TmFtZShwcm9qZWN0TmFtZSkge1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmdldFByb2plY3RzQ291bnQoKTsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLmdldFByb2plY3RzKClbaV0ubmFtZSA9PT0gcHJvamVjdE5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVyblxuICB9XG5cbiAgc3RhdGljIGFwcGVuZE5ld1Byb2plY3QoUHJvamVjdCkge1xuICAgIGlmIChQcm9qZWN0Lm5hbWUpIHtcbiAgICAgIHRoaXMucHJvamVjdHMucHVzaChQcm9qZWN0KTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlUHJvamVjdChwcm9qZWN0TmFtZSkge1xuICAgIHRoaXMucHJvamVjdHMgPSB0aGlzLnByb2plY3RzLmZpbHRlcihmdW5jdGlvbiAob2JqLCBpbmRleCwgYXJyKSB7XG4gICAgICByZXR1cm4gb2JqLm5hbWUgIT09IHByb2plY3ROYW1lO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gICBjb25zdHJ1Y3RvcigpIHtcbiAgLy8gICAgIHRoaXMucHJvamVjdHMgPSBbXTtcbiAgLy8gICB9XG5cbiAgLy8gICBnZXRQcm9qZWN0cygpIHtcbiAgLy8gICAgIHJldHVybiB0aGlzLnByb2plY3RzO1xuICAvLyAgIH1cblxuICAvLyAgIGdldFByb2plY3RzQ291bnQoKSB7XG4gIC8vICAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5sZW5ndGg7XG4gIC8vICAgfVxuXG4gIC8vICAgZ2V0UHJvamVjdEF0SW5kZXgoaW5kZXgpIHtcbiAgLy8gICAgIGlmIChpbmRleCA8IHRoaXMuZ2V0UHJvamVjdHNDb3VudCgpKSB7XG4gIC8vICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzW2luZGV4XTtcbiAgLy8gICAgIH1cbiAgLy8gICB9XG4gIC8vICAgYXBwZW5kTmV3UHJvamVjdChQcm9qZWN0KSB7XG4gIC8vICAgICBpZiAoUHJvamVjdC5uYW1lKSB7XG4gIC8vICAgICAgIHRoaXMucHJvamVjdHMucHVzaChQcm9qZWN0KTtcbiAgLy8gICAgIH1cbiAgLy8gICB9XG5cbiAgLy8gICBkZWxldGVQcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gIC8vICAgICB0aGlzLnByb2plY3RzID0gdGhpcy5wcm9qZWN0cy5maWx0ZXIoZnVuY3Rpb24gKG9iaiwgaW5kZXgsIGFycikge1xuICAvLyAgICAgICByZXR1cm4gb2JqLm5hbWUgIT09IHByb2plY3ROYW1lO1xuICAvLyAgICAgfSk7XG4gIC8vICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIHByaW8sIGRlc2MsIGR1ZWRhdGUpIHtcbiAgICB0aGlzLnRpdGxlID0gbmFtZTtcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpbztcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzYztcbiAgICB0aGlzLmR1ZWRhdGUgPSBkdWVkYXRlO1xuICAgIHRoaXMuY29tcGxldGVkID0gZmFsc2U7XG4gIH1cblxuICAvLyBnZXQgbmFtZSgpIHtcbiAgLy8gICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgLy8gfVxuXG4gIC8vIHNldCBuYW1lKHZhbHVlKSB7XG4gIC8vICAgaWYgKHZhbHVlLmxlbmd0aCA8IDEpIHtcbiAgLy8gICAgIGFsZXJ0KFwiVGFzaydzIG5hbWUgY2Fubm90IGJlIGVtcHR5LlwiKTtcbiAgLy8gICAgIHJldHVybjtcbiAgLy8gICB9XG4gIC8vICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xuICAvLyB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBQcm9qZWN0IGZyb20gXCIuL2NsYXNzLXByb2plY3RcIjtcbmltcG9ydCBBbGxQcm9qZWN0cyBmcm9tIFwiLi9jbGFzcy1wcm9qZWN0cy1ob2xkZXJcIjtcbmltcG9ydCBUYXNrIGZyb20gXCIuL2NsYXNzLXRhc2tcIjtcbmltcG9ydCBhZGRQcm9qZWN0IGZyb20gXCIuL0RPTS1hZGQtcHJvamVjdFwiO1xuXG5hZGRQcm9qZWN0KEFsbFByb2plY3RzKTtcbmNvbnN0IGZvb3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9vdGVyXCIpO1xuXG5mb290ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjb25zdCBzb21lVGFzayA9IG5ldyBUYXNrKFwiUHJvYmFcIiwgXCJsb3dcIiwgXCJTb21lIHN0dXBpZCBzaGl0XCIsIFwiMzAuMTEuMjAyMlwiKTtcbiAgICBjb25zdCBwcm9qID0gbmV3IFByb2plY3QoXCJMdWRuaWNoa2FcIik7XG4gICAgcHJvai5hZGROZXdUYXNrKHNvbWVUYXNrKTtcbiAgICBjb25zb2xlLmxvZyhwcm9qLmdldFRhc2tzKCkpO1xufSlcblxuXG5cblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=