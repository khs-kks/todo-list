import Project from "./class-project";

export default function addProject(projectsList) {

  let addProjectButton = document.querySelector(".add-project");
  

  addProjectButton.addEventListener("click", () => {
    toggleProjectCreationModal();
  });

  //   document.querySelector("#project-title-form").value

  let closeButton = document.querySelector(".cancel-project-creation");
  let addButton = document.querySelector(".proceed-project-creation");

  addButton.addEventListener("click", () => {
    if (document.querySelector("#project-title-form").value) {
      const creatingProject = new Project(
        document.querySelector("#project-title-form").value
      );
      projectsList.appendNewProject(creatingProject);
      toggleProjectCreationModal();
    } else {
      alert("Title cannot be empty!");
    }

    console.log(projectsList);
  });

  closeButton.addEventListener("click", () => {
    toggleProjectCreationModal();
  });
}

function toggleProjectCreationModal() {
  document.querySelector("#project-title-form").value = "";
  document.querySelector("#content").classList.toggle("blur-content");
  document
    .querySelector(".add-project-modal")
    .classList.toggle("add-project-modal-visible");
}
