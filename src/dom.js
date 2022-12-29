import Project from "./project";
import AllProjects from "./projects-list";
import Task from "./task";

export default function addProject() {

  let addProjectButton = document.querySelector(".add-project");
  let closeButton = document.querySelector(".cancel-project-creation");
  let addButton = document.querySelector(".proceed-project-creation");

  addProjectButton.addEventListener("click", () => {
    toggleProjectCreationModal();
  });

  addButton.addEventListener("click", () => {
    if (document.querySelector("#project-title-form").value) {
      const creatingProject = new Project(
        document.querySelector("#project-title-form").value
      );
      AllProjects.appendNewProject(creatingProject);
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

  for (let i = 0; i < AllProjects.getProjectsCount(); i++) {
    const btn = document.createElement("button");
    btn.classList.add("projects");
    btn.setAttribute("data-project", AllProjects.getProjectAtIndex(i).name);
    const divider = document.createElement("span");
    divider.classList.add("divider");

    divider.innerHTML = `<img src='./images/format-list-checks.png' alt='Image of checklist'>${
      AllProjects.getProjectAtIndex(i).name
    }`;

    const taskCount = document.createElement("span");
    taskCount.classList.add("task-count");
    taskCount.textContent = AllProjects.getProjectAtIndex(i).getTasksCount();

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
      if (AllProjects.getProjectAtIndex(i).getTasksCount() === 0) {
        updateRightMainEmptyProject(AllProjects.getProjectAtIndex(i).name);
      } else {
        updateRightMainProjectWithTasks(AllProjects.getProjectAtIndex(i).name);
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
    AllProjects.deleteProject(deleteButton.getAttribute("data-project"));
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

  const newTask = new Task(title, prio, description, duedate);
  // console.log(projectName);
  // console.log(AllProjects.getProjectByName(projectName))
  AllProjects.getProjectByName(projectName).addNewTask(newTask);
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
  spanNumberOfTasks.textContent = `(${AllProjects.getProjectByName(
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
