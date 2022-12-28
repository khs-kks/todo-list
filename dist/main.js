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
    btn.setAttribute("data-project", projectsList.getProjectAtIndex(i).name)
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
    //TODO TURN THE HOLDER INTO STATIC CLASS
  })
}

function deleteChildren(parent) {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
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
  constructor() {
    this.projects = [];
  }

  getProjects() {
    return this.projects;
  }

  getProjectsCount() {
    return this.projects.length;
  }

  getProjectAtIndex(index) {
    if (index < this.getProjectsCount()) {
      return this.projects[index];
    }
  }
  appendNewProject(Project) {
    if (Project.name) {
      this.projects.push(Project);
    }
  }

  deleteProject(projectName) {
    this.projects = this.projects.filter(function (obj, index, arr) {
      return obj.name !== projectName;
    });
  }
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
const projectsList = new _class_projects_holder__WEBPACK_IMPORTED_MODULE_1__["default"]();
const test2 = new _class_project__WEBPACK_IMPORTED_MODULE_0__["default"]("Proba");

projectsList.appendNewProject(test2);
projectsList.appendNewProject(testProject);
console.log(projectsList.getProjects());

console.log("After filtering: ")

projectsList.deleteProject(test2.name);
console.log(projectsList.getProjects());

projectsList.deleteProject("proba1");
console.log(projectsList.getProjects());

(0,_DOM_add_project__WEBPACK_IMPORTED_MODULE_2__["default"])(projectsList);





})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0M7O0FBRXZCO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxrQ0FBa0Msc0RBQU87QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLGtCQUFrQixxQ0FBcUM7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDN0hlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDekJlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7VUM3QkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTnNDO0FBQ1k7QUFDUDs7QUFFM0Msd0JBQXdCLHNEQUFPO0FBQy9CLHlCQUF5Qiw4REFBVztBQUNwQyxrQkFBa0Isc0RBQU87O0FBRXpCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsNERBQVUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvRE9NLWFkZC1wcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jbGFzcy1wcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jbGFzcy1wcm9qZWN0cy1ob2xkZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9qZWN0IGZyb20gXCIuL2NsYXNzLXByb2plY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkUHJvamVjdChwcm9qZWN0c0xpc3QpIHtcbiAgbGV0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0XCIpO1xuICBsZXQgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhbmNlbC1wcm9qZWN0LWNyZWF0aW9uXCIpO1xuICBsZXQgYWRkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9jZWVkLXByb2plY3QtY3JlYXRpb25cIik7XG5cbiAgYWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHRvZ2dsZVByb2plY3RDcmVhdGlvbk1vZGFsKCk7XG4gIH0pO1xuXG4gIGFkZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3QtdGl0bGUtZm9ybVwiKS52YWx1ZSkge1xuICAgICAgY29uc3QgY3JlYXRpbmdQcm9qZWN0ID0gbmV3IFByb2plY3QoXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC10aXRsZS1mb3JtXCIpLnZhbHVlXG4gICAgICApO1xuICAgICAgcHJvamVjdHNMaXN0LmFwcGVuZE5ld1Byb2plY3QoY3JlYXRpbmdQcm9qZWN0KTtcbiAgICAgIHRvZ2dsZVByb2plY3RDcmVhdGlvbk1vZGFsKCk7XG4gICAgICB1cGRhdGVMZWZ0TmF2KHByb2plY3RzTGlzdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KFwiVGl0bGUgY2Fubm90IGJlIGVtcHR5IVwiKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgdG9nZ2xlUHJvamVjdENyZWF0aW9uTW9kYWwoKTtcbiAgICB1cGRhdGVMZWZ0TmF2KHByb2plY3RzTGlzdCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB0b2dnbGVQcm9qZWN0Q3JlYXRpb25Nb2RhbCgpIHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LXRpdGxlLWZvcm1cIikudmFsdWUgPSBcIlwiO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRlbnRcIikuY2xhc3NMaXN0LnRvZ2dsZShcImJsdXItY29udGVudFwiKTtcbiAgZG9jdW1lbnRcbiAgICAucXVlcnlTZWxlY3RvcihcIi5hZGQtcHJvamVjdC1tb2RhbFwiKVxuICAgIC5jbGFzc0xpc3QudG9nZ2xlKFwiYWRkLXByb2plY3QtbW9kYWwtdmlzaWJsZVwiKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlTGVmdE5hdihwcm9qZWN0c0xpc3QpIHtcbiAgLy9GaXJzdCBkZWxldGUgZXZlcnkgcHJvamVjdCBidXQgdGhlICsgQWRkIHByb2plY3QgYnV0dG9uXG4gIGxldCBwcm9qZWN0c0Rpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvd2VyLWJ1dHRvbnNcIik7XG4gIGxldCBhZGRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0XCIpO1xuXG4gIHdoaWxlIChwcm9qZWN0c0Rpc3BsYXkubGFzdENoaWxkICE9PSBhZGRCdXR0b24pIHtcbiAgICBwcm9qZWN0c0Rpc3BsYXkucmVtb3ZlQ2hpbGQocHJvamVjdHNEaXNwbGF5Lmxhc3RDaGlsZCk7XG4gIH1cblxuICAvL1RoZW4gUG9wdWxhdGUgdGhlIG5hdiB3aXRoIHRoZSBleGlzdGluZyBwcm9qZWN0c1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdHNMaXN0LmdldFByb2plY3RzQ291bnQoKTsgaSArPSAxKSB7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidG4uY2xhc3NMaXN0LmFkZChcInByb2plY3RzXCIpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIiwgcHJvamVjdHNMaXN0LmdldFByb2plY3RBdEluZGV4KGkpLm5hbWUpXG4gICAgY29uc3QgZGl2aWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIGRpdmlkZXIuY2xhc3NMaXN0LmFkZChcImRpdmlkZXJcIik7XG5cbiAgICBkaXZpZGVyLmlubmVySFRNTCA9IGA8aW1nIHNyYz0nLi9pbWFnZXMvZm9ybWF0LWxpc3QtY2hlY2tzLnBuZycgYWx0PSdJbWFnZSBvZiBjaGVja2xpc3QnPiR7XG4gICAgICBwcm9qZWN0c0xpc3QuZ2V0UHJvamVjdEF0SW5kZXgoaSkubmFtZVxuICAgIH1gO1xuXG4gICAgY29uc3QgdGFza0NvdW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgdGFza0NvdW50LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWNvdW50XCIpO1xuICAgIHRhc2tDb3VudC50ZXh0Q29udGVudCA9IHByb2plY3RzTGlzdC5nZXRQcm9qZWN0QXRJbmRleChpKS5nZXRUYXNrc0NvdW50KCk7XG5cbiAgICBidG4uYXBwZW5kQ2hpbGQoZGl2aWRlcik7XG4gICAgYnRuLmFwcGVuZENoaWxkKHRhc2tDb3VudCk7XG4gICAgcHJvamVjdHNEaXNwbGF5LmFwcGVuZENoaWxkKGJ0bik7XG5cbiAgICAvL0FkZCBldmVudCBsaXN0ZW5lciB0byBlYWNoIHByb2plY3QncyBidXR0b24gb24gdGhlIGxlZnQgbmF2IGJhclxuXG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBpZiAocHJvamVjdHNMaXN0LmdldFByb2plY3RBdEluZGV4KGkpLmdldFRhc2tzQ291bnQoKSA9PT0gMCkge1xuICAgICAgICB1cGRhdGVSaWdodE1haW5FbXB0eVByb2plY3QoYnRuKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVSaWdodE1haW5FbXB0eVByb2plY3QoYnRuKSB7XG4gIGxldCBtYWluUmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tcmlnaHRcIik7XG5cbiAgZGVsZXRlQ2hpbGRyZW4obWFpblJpZ2h0KTtcblxuICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZGl2LmNsYXNzTGlzdC5hZGQoXCJlbXB0eS1wcm9qZWN0XCIpO1xuXG4gIGxldCBoMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgaDEudGV4dENvbnRlbnQgPSBcIkVtcHR5IFByb2plY3QhXCI7XG5cbiAgbGV0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgcC50ZXh0Q29udGVudCA9IFwiQ3JlYXRlIGEgbmV3IHRvLWRvIGl0ZW0gb3IgZGVsZXRlIHRoZSBwcm9qZWN0XCI7XG5cbiAgbGV0IGRpdkJ1dHRvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBkaXZCdXR0b25zLmNsYXNzTGlzdC5hZGQoXCJlbXB0eS1wcm9qZWN0LWJ1dHRvbnNcIik7XG5cbiAgbGV0IGFkZEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGFkZEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWRkLXRvZG9cIik7XG4gIGFkZEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQUREIFRPLURPXCI7XG4gIGFkZEJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIiwgYnRuLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSk7XG5cbiAgbGV0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGRlbGV0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLXByb2plY3RcIik7XG4gIGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiREVMRVRFIFBST0pFQ1RcIjtcbiAgZGVsZXRlQnV0dG9uLnNldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiLCBidG4uZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIpKTtcblxuICBkaXZCdXR0b25zLmFwcGVuZENoaWxkKGFkZEJ1dHRvbik7XG4gIGRpdkJ1dHRvbnMuYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcblxuICBkaXYuYXBwZW5kQ2hpbGQoaDEpO1xuICBkaXYuYXBwZW5kQ2hpbGQocCk7XG4gIGRpdi5hcHBlbmRDaGlsZChkaXZCdXR0b25zKTtcblxuICBtYWluUmlnaHQuYXBwZW5kQ2hpbGQoZGl2KTtcblxuICAvL0FkZCBldmVudCBsaXN0ZW5lcnMgZm9yIGRlbGV0ZSBwcm9qZWN0IGJ1dHRvblxuXG4gIGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIC8vVE9ETyBUVVJOIFRIRSBIT0xERVIgSU5UTyBTVEFUSUMgQ0xBU1NcbiAgfSlcbn1cblxuZnVuY3Rpb24gZGVsZXRlQ2hpbGRyZW4ocGFyZW50KSB7XG4gIHdoaWxlIChwYXJlbnQubGFzdENoaWxkKSB7XG4gICAgcGFyZW50LnJlbW92ZUNoaWxkKHBhcmVudC5sYXN0Q2hpbGQpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy50YXNrcyA9IFtdO1xuICB9XG5cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cblxuICBzZXQgbmFtZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZS5sZW5ndGggPCAxKSB7XG4gICAgICBhbGVydChcIlByb2plY3QncyBuYW1lIGNhbm5vdCBiZSBlbXB0eS5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX25hbWUgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldFRhc2tzKCkge1xuICAgIHJldHVybiB0aGlzLnRhc2tzO1xuICB9XG5cbiAgZ2V0VGFza3NDb3VudCgpIHtcbiAgICByZXR1cm4gdGhpcy50YXNrcy5sZW5ndGg7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFsbFByb2plY3RzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wcm9qZWN0cyA9IFtdO1xuICB9XG5cbiAgZ2V0UHJvamVjdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdHM7XG4gIH1cblxuICBnZXRQcm9qZWN0c0NvdW50KCkge1xuICAgIHJldHVybiB0aGlzLnByb2plY3RzLmxlbmd0aDtcbiAgfVxuXG4gIGdldFByb2plY3RBdEluZGV4KGluZGV4KSB7XG4gICAgaWYgKGluZGV4IDwgdGhpcy5nZXRQcm9qZWN0c0NvdW50KCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb2plY3RzW2luZGV4XTtcbiAgICB9XG4gIH1cbiAgYXBwZW5kTmV3UHJvamVjdChQcm9qZWN0KSB7XG4gICAgaWYgKFByb2plY3QubmFtZSkge1xuICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKFByb2plY3QpO1xuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZVByb2plY3QocHJvamVjdE5hbWUpIHtcbiAgICB0aGlzLnByb2plY3RzID0gdGhpcy5wcm9qZWN0cy5maWx0ZXIoZnVuY3Rpb24gKG9iaiwgaW5kZXgsIGFycikge1xuICAgICAgcmV0dXJuIG9iai5uYW1lICE9PSBwcm9qZWN0TmFtZTtcbiAgICB9KTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9jbGFzcy1wcm9qZWN0XCI7XG5pbXBvcnQgQWxsUHJvamVjdHMgZnJvbSBcIi4vY2xhc3MtcHJvamVjdHMtaG9sZGVyXCI7XG5pbXBvcnQgYWRkUHJvamVjdCBmcm9tIFwiLi9ET00tYWRkLXByb2plY3RcIjtcblxuY29uc3QgdGVzdFByb2plY3QgPSBuZXcgUHJvamVjdChcIktyaXNrYXRhIHNlIHVjaGlcIik7XG5jb25zdCBwcm9qZWN0c0xpc3QgPSBuZXcgQWxsUHJvamVjdHMoKTtcbmNvbnN0IHRlc3QyID0gbmV3IFByb2plY3QoXCJQcm9iYVwiKTtcblxucHJvamVjdHNMaXN0LmFwcGVuZE5ld1Byb2plY3QodGVzdDIpO1xucHJvamVjdHNMaXN0LmFwcGVuZE5ld1Byb2plY3QodGVzdFByb2plY3QpO1xuY29uc29sZS5sb2cocHJvamVjdHNMaXN0LmdldFByb2plY3RzKCkpO1xuXG5jb25zb2xlLmxvZyhcIkFmdGVyIGZpbHRlcmluZzogXCIpXG5cbnByb2plY3RzTGlzdC5kZWxldGVQcm9qZWN0KHRlc3QyLm5hbWUpO1xuY29uc29sZS5sb2cocHJvamVjdHNMaXN0LmdldFByb2plY3RzKCkpO1xuXG5wcm9qZWN0c0xpc3QuZGVsZXRlUHJvamVjdChcInByb2JhMVwiKTtcbmNvbnNvbGUubG9nKHByb2plY3RzTGlzdC5nZXRQcm9qZWN0cygpKTtcblxuYWRkUHJvamVjdChwcm9qZWN0c0xpc3QpO1xuXG5cblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=