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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFnQztBQUNVO0FBQ2hCOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxvQkFBb0IsSUFBSSx1RUFBNEIsSUFBSTtBQUN4RDtBQUNBO0FBQ0EsNkZBQTZGLHdFQUE2QjtBQUMxSDtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLHVFQUE0QjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLHVFQUE0QjtBQUN0RTtBQUNBLHdCQUF3Qjs7QUFFeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdUVBQTRCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLFVBQVUsdUVBQTRCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSx1RUFBNEI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1DQUFtQyx1RUFBNEI7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVLHVFQUE0QjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyx1RUFBNEI7QUFDNUQ7QUFDQTtBQUNBO0FBQ0EsWUFBWSx1RUFBNEI7QUFDeEM7QUFDQTtBQUNBLFlBQVk7QUFDWixZQUFZLHVFQUE0QjtBQUN4QztBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXOztBQUVYLHdDQUF3Qyx1RUFBNEI7QUFDcEU7QUFDQTs7QUFFQSwrQ0FBK0MsdUVBQTRCO0FBQzNFO0FBQ0E7O0FBRUEsMkNBQTJDLHVFQUE0QjtBQUN2RTtBQUNBOztBQUVBLDRDQUE0Qyx1RUFBNEI7QUFDeEU7QUFDQTs7QUFFQTtBQUNBLFlBQVksdUVBQTRCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyx1RUFBNEI7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVSx1RUFBNEI7QUFDdEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFLE1BQU07QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSSx1RUFBNEIsS0FBSyxnREFBTztBQUM1Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQkFBMEIsNkNBQUk7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sdUVBQTRCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNLHVFQUE0QixLQUFLLGdEQUFPO0FBQzlDO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxvRUFBeUI7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzNaZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM1Q2U7QUFDZjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsMEJBQTBCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQiw2QkFBNkI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN0Q2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3BCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTmdDO0FBQ1U7QUFDaEI7QUFDSDs7QUFFdkIsaURBQU87O0FBRVA7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3RzLWxpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9qZWN0IGZyb20gXCIuL3Byb2plY3RcIjtcbmltcG9ydCBBbGxQcm9qZWN0cyBmcm9tIFwiLi9wcm9qZWN0cy1saXN0XCI7XG5pbXBvcnQgVGFzayBmcm9tIFwiLi90YXNrXCI7XG5cbi8vcXVlcnkgYWxsIHRoZSBtb2RhbCBlbGVtZW50c1xuY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGVudFwiKTtcbmNvbnN0IGxvd2VyQnV0dG9uc01haW5MZWZ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb3dlci1idXR0b25zXCIpO1xuY29uc3QgbWFpblJpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLXJpZ2h0XCIpO1xuXG4vL25ldyBwcm9qZWN0IG1vZGFsXG5jb25zdCBwcm9qZWN0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0LW1vZGFsXCIpO1xuY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LXRpdGxlLWZvcm1cIik7XG5jb25zdCBwcm9qZWN0TW9kYWxDYW5jZWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICBcIi5jYW5jZWwtcHJvamVjdC1jcmVhdGlvblwiXG4pO1xuY29uc3QgcHJvamVjdE1vZGFsUHJvY2VlZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gIFwiLnByb2NlZWQtcHJvamVjdC1jcmVhdGlvblwiXG4pO1xuXG4vL3Rhc2sgY3JlYXRpb24gbW9kYWxcbmNvbnN0IHRhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2stbW9kYWxcIik7XG5jb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stdGl0bGUtZm9ybVwiKTtcbmNvbnN0IHRhc2tEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kZXNjcmlwdGlvblwiKTtcbmNvbnN0IHRhc2tEdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWR1ZS1kYXRlXCIpO1xuY29uc3QgdGFza1ByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNQcmlvcml0eVwiKTtcbmNvbnN0IHRhc2tBc3NpZ25Ub1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3QtdG8tYWRkLXRvXCIpO1xuY29uc3QgdGFza01vZGFsQ2FuY2VsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgXCIuYWRkLXRhc2stbW9kYWwtYnV0dG9ucy1jYW5jZWxcIlxuKTtcbmNvbnN0IHRhc2tNb2RhbFN1Ym1pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gIFwiLmFkZC10YXNrLW1vZGFsLWJ1dHRvbnMtYWRkXCJcbik7XG5cbi8vdGFzayBkZXRhaWxzIG1vZGFsXG5jb25zdCB0YXNrRGV0YWlsc01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWRldGFpbHMtbW9kYWxcIik7XG5jb25zdCB0YXNrRGV0YWlsc0Nsb3NlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jbG9zZS10YXNrLWRldGFpbHNcIik7XG5jb25zdCB0YXNrRGV0YWlsc0luZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGV0YWlscy1pbmZvXCIpO1xuY29uc3QgdGFza0RldGFpbHNEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gIFwiLnRhc2stZGV0YWlscy1kZXNjcmlwdGlvblwiXG4pO1xuY29uc3QgdGFza0RldGFpbHNEdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWRldGFpbHMtZHVlZGF0ZVwiKTtcbmNvbnN0IHRhc2tEZXRhaWxzUHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGV0YWlscy1wcmlvcml0eVwiKTtcbmNvbnN0IHRhc2tEZXRhaWxzQ29tcGxldGVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWRldGFpbHMtcHJvamVjdFwiKTtcblxuLy9sZWZ0IG5hdiBiYXIgc3RhdGljIGJ1dHRvbnNcblxuY29uc3QgYWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2tcIik7XG5jb25zdCBhZGRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtcHJvamVjdFwiKTtcbmNvbnN0IGRlZmF1bHRDb250YWluZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRlZmF1bHQtcHJvamVjdFwiKTtcblxuLy9lbXB0eSBwcm9qZWN0IG1vZGFsXG5jb25zdCBva0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub2tcIik7XG5jb25zdCBkZWxldGVQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJ1dHRvbi5kZWxldGUtcHJvamVjdFwiKTtcbmNvbnN0IGVtcHR5UHJvamVjdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lbXB0eS1wcm9qZWN0LW1vZGFsXCIpO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5jbGFzcyBEeW5hbWljRWxlbWVudHMge1xuICBzdGF0aWMgbmV3UHJvamVjdEFkZGVkKHByb2plY3RUaXRsZSkge1xuICAgIHRoaXMudXBkYXRlVGFza01vZGFsKHByb2plY3RUaXRsZSk7XG4gICAgdGhpcy51cGRhdGVMZWZ0TmF2KCk7XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlVGFza01vZGFsKHByb2plY3RUaXRsZSkge1xuICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgb3B0aW9uLnRleHRDb250ZW50ID0gcHJvamVjdFRpdGxlO1xuICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBwcm9qZWN0VGl0bGUudG9Mb3dlckNhc2UoKSk7XG4gICAgdGFza0Fzc2lnblRvUHJvamVjdC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZUxlZnROYXYoKSB7XG4gICAgdGhpcy5kZWxldGVDaGlsZHJlbihsb3dlckJ1dHRvbnNNYWluTGVmdCk7XG5cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IEFsbFByb2plY3RzLmdldFByb2plY3RzQ291bnQoKTsgaSsrKSB7XG4gICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0c1wiKTtcbiAgICAgIGJ0bi5pbm5lckhUTUwgPSBgPGltZyBzcmM9Jy4vaW1hZ2VzL2Zvcm1hdC1saXN0LWNoZWNrcy5wbmcnIGFsdD0nSW1hZ2Ugb2YgY2hlY2tsaXN0Jz4ke0FsbFByb2plY3RzLmdldFByb2plY3RBdEluZGV4KFxuICAgICAgICBpXG4gICAgICApLmdldE5hbWUoKX1gO1xuICAgICAgbG93ZXJCdXR0b25zTWFpbkxlZnQuYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5wb3B1bGF0ZVByb2plY3REZXRhaWxzKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlQ2hpbGRyZW4ocGFyZW50KSB7XG4gICAgd2hpbGUgKHBhcmVudC5sYXN0Q2hpbGQgIT09IGFkZFByb2plY3RCdXR0b24pIHtcbiAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChwYXJlbnQubGFzdENoaWxkKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgcG9wdWxhdGVQcm9qZWN0RGV0YWlscyhldmVudCkge1xuICAgIC8vIGNvbnNvbGUubG9nKGV2ZW50LnRhcmdldC5pbm5lclRleHQpO1xuICAgIC8vQ2hlY2sgdG8gc2VlIGlmIHByb2plY3QgY2xpY2tlZCBpcyBlbXB0eSBhbmQgaWYgaXQgaXMgYnJpbmcgdXAgdGhlIG1vZGFsLFxuICAgIC8vIGlmIGl0IGlzbid0IHBvcHVsYXRlIG1haW4gcmlnaHQgd2l0aCB0aGUgcHJvamVjdCdzIHRhc2tzXG4gICAgaWYgKFxuICAgICAgQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShldmVudC50YXJnZXQuaW5uZXJUZXh0KS5nZXRUYXNrc0NvdW50KCkgPT09XG4gICAgICAgIDAgJiZcbiAgICAgIGV2ZW50LnRhcmdldC5pbm5lclRleHQgIT09IFwiRGVmYXVsdCBDb250YWluZXJcIlxuICAgICkge1xuICAgICAgZW1wdHlQcm9qZWN0TW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImVtcHR5LXByb2plY3QtbW9kYWwtdmlzaWJsZVwiKTtcbiAgICAgIFVJLnRvZ2dsZUJsdXIoKTtcbiAgICAgIGRlbGV0ZVByb2plY3RCdXR0b24uc2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0XCIsIGV2ZW50LnRhcmdldC5pbm5lclRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvL2NsZWFyIG1haW4tcmlnaHQgZGlzcGxheSBiZWZvcmUgcmVuZGVyaW5nIHRoZSB0YXNrc1xuXG4gICAgICB3aGlsZSAobWFpblJpZ2h0Lmxhc3RDaGlsZCkge1xuICAgICAgICBtYWluUmlnaHQucmVtb3ZlQ2hpbGQobWFpblJpZ2h0Lmxhc3RDaGlsZCk7XG4gICAgICB9XG5cbiAgICAgIC8vZ2VuZXJhdGUgdGhlIGhlYWRlciBhbmQgc3VtbWFyeSB3aXRoIG51bWJlciBvZiB0YXNrc1xuICAgICAgY29uc3QgaGVhZGVyMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAgIGNvbnN0IHRhc2tzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNvbnN0IHRhc2tzSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNvbnN0IHRhc2tzSGVhZGVyV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZGl2LnRleHRDb250ZW50ID0gXCJUYXNrcyBcIjtcbiAgICAgIGNvbnN0IHNwYW5OdW1iZXJPZlRhc2tzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICBjb25zdCBpbWdSZWZyZXNoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcblxuICAgICAgaGVhZGVyMS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC10aXRsZVwiKTtcbiAgICAgIGhlYWRlcjEudGV4dENvbnRlbnQgPSBldmVudC50YXJnZXQuaW5uZXJUZXh0O1xuXG4gICAgICB0YXNrc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwidGFza3MtY29udGFpbmVyXCIpO1xuICAgICAgdGFza3NIZWFkZXIuY2xhc3NMaXN0LmFkZChcInRhc2tzLWhlYWRlclwiKTtcbiAgICAgIHRhc2tzSGVhZGVyV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwidGFza3MtaGVhZGVyLXdyYXBwZXJcIik7XG4gICAgICBzcGFuTnVtYmVyT2ZUYXNrcy5jbGFzc0xpc3QuYWRkKFwibnVtYmVyLW9mLXRhc2tzXCIpO1xuICAgICAgc3Bhbk51bWJlck9mVGFza3MudGV4dENvbnRlbnQgPSBgKCR7QWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShcbiAgICAgICAgZXZlbnQudGFyZ2V0LmlubmVyVGV4dFxuICAgICAgKS5nZXRUYXNrc0NvdW50KCl9KWA7XG5cbiAgICAgIGltZ1JlZnJlc2guc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiLi9pbWFnZXMvcmVmcmVzaC1jaXJjbGUuc3ZnXCIpO1xuICAgICAgaW1nUmVmcmVzaC5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgXCJJbWFnZSBvZiByZWZyZXNoIGJ1dHRvblwiKTtcbiAgICAgIGltZ1JlZnJlc2guc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIFwiMjVweFwiKTtcbiAgICAgIGltZ1JlZnJlc2guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgRHluYW1pY0VsZW1lbnRzLnBvcHVsYXRlUHJvamVjdERldGFpbHMoZXZlbnQpO1xuICAgICAgfSk7XG5cbiAgICAgIGRpdi5hcHBlbmRDaGlsZChzcGFuTnVtYmVyT2ZUYXNrcyk7XG4gICAgICB0YXNrc0hlYWRlcldyYXBwZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgIHRhc2tzSGVhZGVyV3JhcHBlci5hcHBlbmRDaGlsZChpbWdSZWZyZXNoKTtcbiAgICAgIHRhc2tzSGVhZGVyLmFwcGVuZENoaWxkKHRhc2tzSGVhZGVyV3JhcHBlcik7XG4gICAgICB0YXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrc0hlYWRlcik7XG5cbiAgICAgIG1haW5SaWdodC5hcHBlbmRDaGlsZChoZWFkZXIxKTtcbiAgICAgIG1haW5SaWdodC5hcHBlbmRDaGlsZCh0YXNrc0NvbnRhaW5lcik7XG5cbiAgICAgIGZvciAoXG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgaSA8XG4gICAgICAgIEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoZXZlbnQudGFyZ2V0LmlubmVyVGV4dCkuZ2V0VGFza3NDb3VudCgpO1xuICAgICAgICBpKytcbiAgICAgICkge1xuICAgICAgICBjb25zb2xlLnRhYmxlKFxuICAgICAgICAgIEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoZXZlbnQudGFyZ2V0LmlubmVyVGV4dCkuZ2V0VGFza0J5SW5kZXgoaSlcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcmVndWxhclRhc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICByZWd1bGFyVGFzay5jbGFzc0xpc3QuYWRkKFwicmVndWxhci10YXNrXCIpO1xuICAgICAgICByZWd1bGFyVGFzay5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgIEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoZXZlbnQudGFyZ2V0LmlubmVyVGV4dCkuZ2V0VGFza0J5SW5kZXgoaSlcbiAgICAgICAgICAgIC5wcmlvcml0eVxuICAgICAgICApO1xuICAgICAgICBjb25zdCB0b0RvTmFtZVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0b0RvTmFtZVdyYXBwZXIuY2xhc3NMaXN0LmFkZChcInRvZG8tbmFtZS13cmFwcGVyXCIpO1xuICAgICAgICBjb25zdCB0b0RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgY29uc3Qgc3BhblRhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG5cbiAgICAgICAgc3BhblRhc2tOYW1lLnRleHRDb250ZW50ID0gQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShcbiAgICAgICAgICBldmVudC50YXJnZXQuaW5uZXJUZXh0XG4gICAgICAgICkuZ2V0VGFza0J5SW5kZXgoaSkudGl0bGU7XG4gICAgICAgIHNwYW5UYXNrTmFtZS5jbGFzc0xpc3QuYWRkKFwidGFzay1uYW1lXCIpO1xuICAgICAgICB0b0RvLmNsYXNzTGlzdC5hZGQoXCJ0b2RvXCIpO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKGV2ZW50LnRhcmdldC5pbm5lclRleHQpLmdldFRhc2tCeUluZGV4KGkpXG4gICAgICAgICAgICAuaXNDb21wbGV0ZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgdG9Eby5jbGFzc0xpc3QuYWRkKFwiY29tcGxldGVkXCIpO1xuICAgICAgICAgIHNwYW5UYXNrTmFtZS5jbGFzc0xpc3QuYWRkKFwiY29tcGxldGVkXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9Eby5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgIHRvRG8uY2xhc3NMaXN0LnRvZ2dsZShcImNvbXBsZXRlZFwiKTtcbiAgICAgICAgICBzcGFuVGFza05hbWUuY2xhc3NMaXN0LnRvZ2dsZShcImNvbXBsZXRlZFwiKTtcbiAgICAgICAgICBsZXQgaXNUYXNrQ29tcGxldGVkID0gQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5pbm5lclRleHRcbiAgICAgICAgICApLmdldFRhc2tCeUluZGV4KGkpLmlzQ29tcGxldGVkO1xuICAgICAgICAgIGlmIChpc1Rhc2tDb21wbGV0ZWQpIHtcbiAgICAgICAgICAgIEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoZXZlbnQudGFyZ2V0LmlubmVyVGV4dCkuZ2V0VGFza0J5SW5kZXgoXG4gICAgICAgICAgICAgIGlcbiAgICAgICAgICAgICkuaXNDb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShldmVudC50YXJnZXQuaW5uZXJUZXh0KS5nZXRUYXNrQnlJbmRleChcbiAgICAgICAgICAgICAgaVxuICAgICAgICAgICAgKS5pc0NvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0b0RvTmFtZVdyYXBwZXIuYXBwZW5kQ2hpbGQodG9Ebyk7XG4gICAgICAgIHRvRG9OYW1lV3JhcHBlci5hcHBlbmRDaGlsZChzcGFuVGFza05hbWUpO1xuICAgICAgICByZWd1bGFyVGFzay5hcHBlbmRDaGlsZCh0b0RvTmFtZVdyYXBwZXIpO1xuICAgICAgICB0YXNrc0NvbnRhaW5lci5hcHBlbmQocmVndWxhclRhc2spO1xuXG4gICAgICAgIGNvbnN0IHRvZG9PcHRpb25zV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRvZG9PcHRpb25zV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwidG9kby1vcHRpb25zLXdyYXBwZXJcIik7XG4gICAgICAgIGNvbnN0IHRvZG9EZXRhaWxzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgdG9kb0RldGFpbHMuY2xhc3NMaXN0LmFkZChcInRvZG8tZGV0YWlsc1wiKTtcbiAgICAgICAgdG9kb0RldGFpbHMudGV4dENvbnRlbnQgPSBcIkRFVEFJTFNcIjtcblxuICAgICAgICB0b2RvRGV0YWlscy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgIHRhc2tEZXRhaWxzTW9kYWwuY2xhc3NMaXN0LmFkZChcInRhc2stZGV0YWlscy1tb2RhbC12aXNpYmxlXCIpO1xuICAgICAgICAgIHRhc2tEZXRhaWxzQ2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIHRhc2tEZXRhaWxzTW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcInRhc2stZGV0YWlscy1tb2RhbC12aXNpYmxlXCIpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGFza0RldGFpbHNJbmZvLnRleHRDb250ZW50ID0gQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZShcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5pbm5lclRleHRcbiAgICAgICAgICApLmdldFRhc2tCeUluZGV4KGkpLnRpdGxlO1xuXG4gICAgICAgICAgdGFza0RldGFpbHNEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoXG4gICAgICAgICAgICBldmVudC50YXJnZXQuaW5uZXJUZXh0XG4gICAgICAgICAgKS5nZXRUYXNrQnlJbmRleChpKS5kZXNjcmlwdGlvbjtcblxuICAgICAgICAgIHRhc2tEZXRhaWxzRHVlRGF0ZS50ZXh0Q29udGVudCA9IEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoXG4gICAgICAgICAgICBldmVudC50YXJnZXQuaW5uZXJUZXh0XG4gICAgICAgICAgKS5nZXRUYXNrQnlJbmRleChpKS5kdWVkYXRlO1xuXG4gICAgICAgICAgdGFza0RldGFpbHNQcmlvcml0eS50ZXh0Q29udGVudCA9IEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoXG4gICAgICAgICAgICBldmVudC50YXJnZXQuaW5uZXJUZXh0XG4gICAgICAgICAgKS5nZXRUYXNrQnlJbmRleChpKS5wcmlvcml0eTtcblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoZXZlbnQudGFyZ2V0LmlubmVyVGV4dCkuZ2V0VGFza0J5SW5kZXgoXG4gICAgICAgICAgICAgIGlcbiAgICAgICAgICAgICkuaXNDb21wbGV0ZWRcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRhc2tEZXRhaWxzQ29tcGxldGVkLnRleHRDb250ZW50ID0gXCJDb21wbGV0ZWRcIjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFza0RldGFpbHNDb21wbGV0ZWQudGV4dENvbnRlbnQgPSBcIk5PVCBDb21wbGV0ZWRcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRvZG9PcHRpb25zV3JhcHBlci5hcHBlbmRDaGlsZCh0b2RvRGV0YWlscyk7XG4gICAgICAgIGNvbnN0IHNwYW5EdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIHNwYW5EdWVEYXRlLmNsYXNzTGlzdC5hZGQoXCJkdWUtZGF0ZVwiKTtcbiAgICAgICAgc3BhbkR1ZURhdGUudGV4dENvbnRlbnQgPSBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKFxuICAgICAgICAgIGV2ZW50LnRhcmdldC5pbm5lclRleHRcbiAgICAgICAgKS5nZXRUYXNrQnlJbmRleChpKS5kdWVkYXRlO1xuICAgICAgICB0b2RvT3B0aW9uc1dyYXBwZXIuYXBwZW5kQ2hpbGQoc3BhbkR1ZURhdGUpO1xuICAgICAgICBjb25zdCBpbWdFZGl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgaW1nRWRpdC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCIuL2ltYWdlcy9wZW5jaWwtYm94LW91dGxpbmUuc3ZnXCIpO1xuICAgICAgICBpbWdFZGl0LnNldEF0dHJpYnV0ZShcImFsdFwiLCBcIkJ1dHRvbiB0byBlZGl0IHRoZSB0YXNrXCIpO1xuICAgICAgICBpbWdFZGl0LnNldEF0dHJpYnV0ZShcImhlaWdodFwiLCBcIjI1cHhcIik7XG4gICAgICAgIHRvZG9PcHRpb25zV3JhcHBlci5hcHBlbmRDaGlsZChpbWdFZGl0KTtcbiAgICAgICAgY29uc3QgaW1nRGVsZXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgaW1nRGVsZXRlLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcIi4vaW1hZ2VzL3RyYXNoLWNhbi1vdXRsaW5lLnN2Z1wiKTtcbiAgICAgICAgaW1nRGVsZXRlLnNldEF0dHJpYnV0ZShcImFsdFwiLCBcIkJ1dHRvbiB0byBkZWxldGUgdGhlIHRhc2tcIik7XG4gICAgICAgIGltZ0RlbGV0ZS5zZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiwgXCIyNXB4XCIpO1xuXG4gICAgICAgIGltZ0RlbGV0ZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgIEFsbFByb2plY3RzLmdldFByb2plY3RCeU5hbWUoXG4gICAgICAgICAgICBldmVudC50YXJnZXQuaW5uZXJUZXh0XG4gICAgICAgICAgKS5kZWxldGVUYXNrQXRJbmRleChpKTtcblxuICAgICAgICAgIHdoaWxlIChtYWluUmlnaHQubGFzdENoaWxkKSB7XG4gICAgICAgICAgICBtYWluUmlnaHQucmVtb3ZlQ2hpbGQobWFpblJpZ2h0Lmxhc3RDaGlsZCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgRHluYW1pY0VsZW1lbnRzLnBvcHVsYXRlUHJvamVjdERldGFpbHMoZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgdG9kb09wdGlvbnNXcmFwcGVyLmFwcGVuZENoaWxkKGltZ0RlbGV0ZSk7XG4gICAgICAgIHJlZ3VsYXJUYXNrLmFwcGVuZENoaWxkKHRvZG9PcHRpb25zV3JhcHBlcik7XG5cbiAgICAgICAgLy9UTyBGSU5JU0ggYWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgZWFjaCB0YXNrJ3MgYnV0dG9uc1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVQcm9qZWN0RnJvbVRhc2tNb2RhbCgpIHtcbiAgICAvL3F1ZXJyeSBhbGwgdGhlIG9wdGlvbi52YWx1ZXMgYW5kIGNoZWNrIHRvIHNlZSBpZiB0aGV5IGV4aXN0IGluIEFsbFByb2plY3RzIG9yIHRoZSB2YWx1ZSBpcyBlcXVhbCB0byBkZWxldGVQcm9qZWN0QnV0dG9uLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSwgaWYgdGhlIG9wdGlvbiBpc250IHRoZXJlLCBkZWxldGUgaXRcbiAgICAvLyBkZWxldGVQcm9qZWN0QnV0dG9uLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKTtcbiAgICAvLyBjb25zb2xlLmxvZyhkZWxldGVQcm9qZWN0QnV0dG9uLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSk7XG4gICAgbGV0IHZhbHVlID0gZGVsZXRlUHJvamVjdEJ1dHRvbi5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3RcIik7XG4gICAgY29uc3QgdG9SZW1vdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBzZWxlY3QgPiBbdmFsdWU9XCIke3ZhbHVlfVwiXWApO1xuICAgIC8vIGNvbnNvbGUubG9nKHRvUmVtb3ZlKTtcbiAgICB0b1JlbW92ZS5yZW1vdmUoKTtcbiAgICAvLyAucmVtb3ZlKCk7XG4gIH1cbn1cblxuY2xhc3MgQWxlcnQge1xuICBzdGF0aWMgX2FsZXJ0KG1zZykge1xuICAgIGFsZXJ0KG1zZyk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJIHtcbiAgc3RhdGljIGluaXQoKSB7XG4gICAgdGhpcy5pbml0RGVmYXVsdENvbnRhaW5lcigpO1xuICAgIHRoaXMuYWRkTGlzdGVuZXJzKCk7XG4gICAgLy8gdGhpcy5hZGRUYXNrKCk7XG4gIH1cblxuICBzdGF0aWMgdG9nZ2xlQmx1cigpIHtcbiAgICBjb250ZW50LmNsYXNzTGlzdC50b2dnbGUoXCJibHVyLWNvbnRlbnRcIik7XG4gIH1cblxuICBzdGF0aWMgaW5pdERlZmF1bHRDb250YWluZXIoKSB7XG4gICAgLy9jcmVhdGUgYW4gZW1wdHkgUHJvamVjdCBhbmQgYXBwZW5kIGl0IHRvIHRoZSBQcm9qZWN0c0xpc3RcbiAgICBBbGxQcm9qZWN0cy5hcHBlbmROZXdQcm9qZWN0KG5ldyBQcm9qZWN0KFwiRGVmYXVsdCBDb250YWluZXJcIikpO1xuICB9XG5cbiAgLy90b2RvIGdhdGhlciBhbGwgc3RhdGljIGxpc3RlbmVycyBpbiBvbmUgZnVuY3Rpb25cbiAgc3RhdGljIGFkZExpc3RlbmVycygpIHtcbiAgICAvLysgQWRkIFRhc2sgYnV0dG9uXG4gICAgYWRkVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vcGVuVGFza01vZGFsKTtcbiAgICB0YXNrTW9kYWxDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuY2xvc2VUYXNrTW9kYWwpO1xuICAgIHRhc2tNb2RhbFN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5zdWJtaXRUYXNrKTtcblxuICAgIC8vKyBBZGQgUHJvamVjdCBidXR0b25cbiAgICBhZGRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9wZW5Qcm9qZWN0TW9kYWwpO1xuICAgIHByb2plY3RNb2RhbENhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbG9zZVByb2plY3RNb2RhbCk7XG4gICAgcHJvamVjdE1vZGFsUHJvY2VlZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5zdWJtaXRQcm9qZWN0KTtcblxuICAgIC8vRW1wdHkgUHJvamVjdCBtb2RhbCBidXR0b25zXG4gICAgb2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuY2xvc2VFbXB0eVByb2plY3RNb2RhbCk7XG4gICAgZGVsZXRlUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5kZWxldGVFbXB0eVByb2plY3QpO1xuXG4gICAgLy9EZWZhdWx0IENvbnRhaW5lciBidXR0b25cbiAgICBkZWZhdWx0Q29udGFpbmVyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9wZW5EZWZhdWx0Q29udGFpbmVyKTtcbiAgfVxuICAvL0V2ZW50IGxpc3RlbmVycyBmb3IgdGhlIGhvbWVwYWdlIGFuZCBhbGwgb2YgdGhlIG1vZGFsc1xuXG4gIHN0YXRpYyBjbG9zZVRhc2tNb2RhbCgpIHtcbiAgICB0YXNrTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImFkZC10YXNrLW1vZGFsLXZpc2libGVcIik7XG4gICAgVUkudG9nZ2xlQmx1cigpO1xuICB9XG5cbiAgc3RhdGljIG9wZW5UYXNrTW9kYWwoKSB7XG4gICAgdGFza01vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJhZGQtdGFzay1tb2RhbC12aXNpYmxlXCIpO1xuICAgIC8vY2xlYXIgZmlyc3QgdHdvIGZpZWxkcyBmcm9tIHByZXZpb3VzbHkgYWRkZWQgdGFza1xuICAgIHRhc2tUaXRsZS52YWx1ZSA9IFwiXCI7XG4gICAgdGFza0Rlc2NyaXB0aW9uLnZhbHVlID0gXCJcIjtcbiAgICBVSS50b2dnbGVCbHVyKCk7XG4gICAgLy8gY29uc29sZS50YWJsZShBbGxQcm9qZWN0cy5nZXRQcm9qZWN0cygpKTtcbiAgfVxuXG4gIHN0YXRpYyBzdWJtaXRUYXNrKCkge1xuICAgIGlmICh0YXNrRHVlRGF0ZS52YWx1ZSAmJiB0YXNrVGl0bGUudmFsdWUpIHtcbiAgICAgIC8vICAgY29uc29sZS5sb2codGFza1ByaW9yaXR5LnZhbHVlKTtcbiAgICAgIC8vICAgY29uc29sZS5sb2codGFza0Fzc2lnblRvUHJvamVjdC52YWx1ZSk7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKHRhc2tEZXNjcmlwdGlvbi52YWx1ZSk7XG5cbiAgICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayhcbiAgICAgICAgdGFza1RpdGxlLnZhbHVlLFxuICAgICAgICB0YXNrUHJpb3JpdHkudmFsdWUsXG4gICAgICAgIHRhc2tEZXNjcmlwdGlvbi52YWx1ZSxcbiAgICAgICAgdGFza0R1ZURhdGUudmFsdWVcbiAgICAgICk7XG4gICAgICBBbGxQcm9qZWN0cy5nZXRQcm9qZWN0QnlOYW1lKHRhc2tBc3NpZ25Ub1Byb2plY3QudmFsdWUpLmFkZE5ld1Rhc2soXG4gICAgICAgIG5ld1Rhc2tcbiAgICAgICk7XG4gICAgICBVSS5jbG9zZVRhc2tNb2RhbCgpO1xuICAgICAgLy8gICBjb25zb2xlLmxvZyh0YXNrQXNzaWduVG9Qcm9qZWN0LnZhbHVlKTtcbiAgICAgIC8vICAgICBjb25zb2xlLnRhYmxlKFxuICAgICAgLy8gICAgICAgQWxsUHJvamVjdHMuZ2V0UHJvamVjdEJ5TmFtZSh0YXNrQXNzaWduVG9Qcm9qZWN0LnZhbHVlKS5nZXRUYXNrcygpXG4gICAgICAvLyAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgQWxlcnQuX2FsZXJ0KFwiVGl0bGUgYW5kIER1ZSBEYXRlIGFyZSBtYW5kYXRvcnlcIik7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG9wZW5Qcm9qZWN0TW9kYWwoKSB7XG4gICAgcHJvamVjdFRpdGxlLnZhbHVlID0gXCJcIjtcbiAgICBwcm9qZWN0TW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImFkZC1wcm9qZWN0LW1vZGFsLXZpc2libGVcIik7XG4gICAgVUkudG9nZ2xlQmx1cigpO1xuICB9XG5cbiAgc3RhdGljIGNsb3NlUHJvamVjdE1vZGFsKCkge1xuICAgIHByb2plY3RNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiYWRkLXByb2plY3QtbW9kYWwtdmlzaWJsZVwiKTtcbiAgICBVSS50b2dnbGVCbHVyKCk7XG4gIH1cblxuICBzdGF0aWMgc3VibWl0UHJvamVjdCgpIHtcbiAgICBpZiAocHJvamVjdFRpdGxlLnZhbHVlKSB7XG4gICAgICBBbGxQcm9qZWN0cy5hcHBlbmROZXdQcm9qZWN0KG5ldyBQcm9qZWN0KHByb2plY3RUaXRsZS52YWx1ZSkpO1xuICAgICAgVUkuY2xvc2VQcm9qZWN0TW9kYWwoKTtcbiAgICAgIER5bmFtaWNFbGVtZW50cy5uZXdQcm9qZWN0QWRkZWQocHJvamVjdFRpdGxlLnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgQWxlcnQuX2FsZXJ0KFwiVGl0bGUgY2Fubm90IGJlIGVtcHR5XCIpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBjbG9zZUVtcHR5UHJvamVjdE1vZGFsKCkge1xuICAgIGVtcHR5UHJvamVjdE1vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJlbXB0eS1wcm9qZWN0LW1vZGFsLXZpc2libGVcIik7XG4gICAgVUkudG9nZ2xlQmx1cigpO1xuICB9XG5cbiAgc3RhdGljIGRlbGV0ZUVtcHR5UHJvamVjdCgpIHtcbiAgICBpZiAoXG4gICAgICBkZWxldGVQcm9qZWN0QnV0dG9uLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKSAhPT0gXCJEZWZhdWx0IENvbnRhaW5lclwiXG4gICAgKSB7XG4gICAgICBBbGxQcm9qZWN0cy5kZWxldGVQcm9qZWN0KFxuICAgICAgICBkZWxldGVQcm9qZWN0QnV0dG9uLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdFwiKVxuICAgICAgKTtcbiAgICAgIER5bmFtaWNFbGVtZW50cy51cGRhdGVMZWZ0TmF2KCk7XG4gICAgICBEeW5hbWljRWxlbWVudHMuZGVsZXRlUHJvamVjdEZyb21UYXNrTW9kYWwoKTtcbiAgICAgIFVJLmNsb3NlRW1wdHlQcm9qZWN0TW9kYWwoKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgb3BlbkRlZmF1bHRDb250YWluZXIoZXZlbnQpIHtcbiAgICAgIER5bmFtaWNFbGVtZW50cy5wb3B1bGF0ZVByb2plY3REZXRhaWxzKGV2ZW50KTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMudGFza3MgPSBbXTtcbiAgfVxuXG4gIC8vIGdldCBuYW1lKCkge1xuICAvLyAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAvLyB9XG5cbiAgLy8gc2V0IG5hbWUodmFsdWUpIHtcbiAgLy8gICBpZiAodmFsdWUubGVuZ3RoIDwgMSkge1xuICAvLyAgICAgYWxlcnQoXCJQcm9qZWN0J3MgbmFtZSBjYW5ub3QgYmUgZW1wdHkuXCIpO1xuICAvLyAgICAgcmV0dXJuO1xuICAvLyAgIH1cbiAgLy8gICB0aGlzLl9uYW1lID0gdmFsdWU7XG4gIC8vIH1cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgc2V0TmFtZShuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfVxuXG4gIGdldFRhc2tCeUluZGV4KGluZGV4KSB7XG4gICAgcmV0dXJuIHRoaXMudGFza3NbaW5kZXhdO1xuICB9XG5cbiAgZGVsZXRlVGFza0F0SW5kZXgoaW5kZXgpIHtcbiAgICB0aGlzLnRhc2tzLnNwbGljZShpbmRleCwgMSk7XG4gIH1cblxuICBnZXRUYXNrcygpIHtcbiAgICByZXR1cm4gdGhpcy50YXNrcztcbiAgfVxuXG4gIGdldFRhc2tzQ291bnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFza3MubGVuZ3RoO1xuICB9XG5cbiAgYWRkTmV3VGFzayh0YXNrKSB7XG4gICAgdGhpcy50YXNrcy5wdXNoKHRhc2spO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBbGxQcm9qZWN0cyB7XG4gIHN0YXRpYyBwcm9qZWN0cyA9IFtdO1xuXG4gIHN0YXRpYyBnZXRQcm9qZWN0cygpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0cztcbiAgfVxuXG4gIHN0YXRpYyBnZXRQcm9qZWN0c0NvdW50KCkge1xuICAgIHJldHVybiB0aGlzLnByb2plY3RzLmxlbmd0aDtcbiAgfVxuXG4gIHN0YXRpYyBnZXRQcm9qZWN0QXRJbmRleChpbmRleCkge1xuICAgIGlmIChpbmRleCA8IHRoaXMucHJvamVjdHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9qZWN0c1tpbmRleF07XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldFByb2plY3RCeU5hbWUocHJvamVjdE5hbWUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLnByb2plY3RzW2ldLm5hbWUgPT09IHByb2plY3ROYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzW2ldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBhcHBlbmROZXdQcm9qZWN0KFByb2plY3QpIHtcbiAgICBpZiAoUHJvamVjdC5uYW1lKSB7XG4gICAgICB0aGlzLnByb2plY3RzLnB1c2goUHJvamVjdCk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGRlbGV0ZVByb2plY3QocHJvamVjdE5hbWUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZ2V0UHJvamVjdHNDb3VudCgpOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLnByb2plY3RzW2ldLm5hbWUgPT09IHByb2plY3ROYW1lKSB7XG4gICAgICAgIHRoaXMucHJvamVjdHMuc3BsaWNlKGksIDEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIHByaW8sIGRlc2MsIGR1ZWRhdGUpIHtcbiAgICB0aGlzLnRpdGxlID0gbmFtZTtcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpbztcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzYztcbiAgICB0aGlzLmR1ZWRhdGUgPSBkdWVkYXRlO1xuICAgIHRoaXMuaXNDb21wbGV0ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIGdldCBuYW1lKCkge1xuICAvLyAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAvLyB9XG5cbiAgLy8gc2V0IG5hbWUodmFsdWUpIHtcbiAgLy8gICBpZiAodmFsdWUubGVuZ3RoIDwgMSkge1xuICAvLyAgICAgYWxlcnQoXCJUYXNrJ3MgbmFtZSBjYW5ub3QgYmUgZW1wdHkuXCIpO1xuICAvLyAgICAgcmV0dXJuO1xuICAvLyAgIH1cbiAgLy8gICB0aGlzLl9uYW1lID0gdmFsdWU7XG4gIC8vIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdFwiO1xuaW1wb3J0IEFsbFByb2plY3RzIGZyb20gXCIuL3Byb2plY3RzLWxpc3RcIjtcbmltcG9ydCBUYXNrIGZyb20gXCIuL3Rhc2tcIjtcbmltcG9ydCBVSSBmcm9tIFwiLi9kb21cIjtcblxuVUkuaW5pdCgpO1xuXG4vLyBhZGRQcm9qZWN0KEFsbFByb2plY3RzKTtcbi8vIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9vdGVyXCIpO1xuXG4vLyBmb290ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbi8vICAgICBjb25zdCBzb21lVGFzayA9IG5ldyBUYXNrKFwiUHJvYmFcIiwgXCJsb3dcIiwgXCJTb21lIHN0dXBpZCBzaGl0XCIsIFwiMzAuMTEuMjAyMlwiKTtcbi8vICAgICBjb25zdCBwcm9qID0gbmV3IFByb2plY3QoXCJMdWRuaWNoa2FcIik7XG4vLyAgICAgcHJvai5hZGROZXdUYXNrKHNvbWVUYXNrKTtcbi8vICAgICBjb25zb2xlLmxvZyhwcm9qLmdldFRhc2tzKCkpO1xuLy8gfSlcblxuXG5cblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=