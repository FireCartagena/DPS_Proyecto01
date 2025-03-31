import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import { getProjects, getTasks } from '../../services/storageService';

const ProjectDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Obtiene el ID del proyecto desde la URL
  const { user } = useAuth();

  // Obtiene proyectos y tareas
  const projects = getProjects();
  const tasks = getTasks();

  // Busca el proyecto actual por ID
  const project = projects.find((p) => p.id === Number(id));
  const projectTasks = tasks.filter((t) => t.projectId === Number(id));

  // Si no se encuentra el proyecto, muestra un mensaje
  if (!project) {
    return <div className="min-h-screen bg-gray-100 p-6">Proyecto no encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Detalles del Proyecto: {project.name}</h1>
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Tareas</h2>
        {projectTasks.length > 0 ? (
          <ul>
            {projectTasks.map((task) => (
              <li key={task.id} className="mb-2">
                {task.name} - Asignado a: {task.assignedTo} - Estado: {task.status}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay tareas asociadas a este proyecto.</p>
        )}
      </div>
      <button
        onClick={() => router.push('/dashboard')}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Volver al Dashboard
      </button>
    </div>
  );
};

export default ProjectDetail;