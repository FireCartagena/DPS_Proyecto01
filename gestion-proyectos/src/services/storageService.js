export const saveUsers = (users) => localStorage.setItem('users', JSON.stringify(users));
export const saveProjects = (projects) => localStorage.setItem('projects', JSON.stringify(projects));
export const saveTasks = (tasks) => localStorage.setItem('tasks', JSON.stringify(tasks));
export const getUsers = () => {
    return JSON.parse(localStorage.getItem('users')) || [];
  };

  export const getProjects = () => {
    const projects = localStorage.getItem('projects');
    return projects ? JSON.parse(projects) : [];
  };
  
  export const saveProject = (project) => {
    const projects = getProjects();
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));
  };

export const getTasks = () => JSON.parse(localStorage.getItem('tasks')) || [];
export const saveTask = (task) => {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
};
