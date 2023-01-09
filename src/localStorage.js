import Project from "./project";
import AllProjects from "./projects-list";

export function retrieveLocalStorage() {
  function revive(key, value) {
    if (key === "") return value;
    if (value.constructor === Object && "name" in value && "tasks" in value) {
      const revivedObject = Object.assign({}, value);
      Object.setPrototypeOf(revivedObject, Project.prototype);
      return revivedObject;
    }
    return value;
  }

  const objectArrayString = localStorage.getItem('objectArrayKey');
  const objectArray = JSON.parse(objectArrayString, revive);

  AllProjects.projects = [...objectArray];
}

export function updateLocalStorage() {
    localStorage.setItem('objectArrayKey', JSON.stringify(AllProjects.projects));
}
