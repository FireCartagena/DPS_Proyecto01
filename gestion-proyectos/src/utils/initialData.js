import { saveUsers, saveProjects, saveTasks } from '../services/storageService';

export const initializeData = () => {
  // Crear 3 tipos de usuarios si no existen
  if (!localStorage.getItem('users')) {
    const users = [
      { id: 1, email: 'admin@example.com', password: 'admin123', role: 'Administrador' },
      { id: 2, email: 'manager@example.com', password: 'manager123', role: 'Gerente de Proyectos' },
      { id: 3, email: 'member@example.com', password: 'member123', role: 'Miembro del Equipo' },
    ];
    saveUsers(users);
  }

  // Crear al menos 2 proyectos si no existen
  if (!localStorage.getItem('projects')) {
    const projects = [
      { id: 1, name: 'Proyecto Alpha', createdBy: 2 }, // Creado por el Gerente
      { id: 2, name: 'Proyecto Beta', createdBy: 2 },
    ];
    saveProjects(projects);
  }

  // Crear tareas para los proyectos si no existen
  if (!localStorage.getItem('tasks')) {
    const tasks = [
      { id: 1, projectId: 1, name: 'Diseñar interfaz', status: 'Pendiente' },
      { id: 2, projectId: 1, name: 'Implementar backend', status: 'En Progreso' },
      { id: 3, projectId: 2, name: 'Crear base de datos', status: 'Completada' },
      { id: 4, projectId: 2, name: 'Desarrollar API', status: 'Pendiente' },
    ];
    saveTasks(tasks);
  }
};