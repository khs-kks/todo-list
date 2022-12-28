import Project from "./class-project";

export default function addProject(projectsList) {
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
