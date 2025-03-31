import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';
import { getProjects, saveProject, getTasks, saveTask } from '../services/storageService';

const ProtectedPage = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  return user ? children : null;
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [showCreateProjectForm, setShowCreateProjectForm] = useState(false);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const projects = getProjects();
  const tasks = getTasks();
  const memberTasks = tasks.filter(task => task.assignedTo === user.email);

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard - Bienvenido, {user.email}</h1>
          <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Cerrar Sesión
          </button>
        </div>

        {user.role === 'Administrador' && (
          <Link href="/admin/users" className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
            Administrar Usuarios
          </Link>
        )}

        {user.role === 'Gerente de Proyectos' && (
          <>
            <button
              onClick={() => setShowCreateProjectForm(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Crear Nuevo Proyecto
            </button>
            {showCreateProjectForm && (
              <CreateProjectForm
                onCreate={(newProject) => {
                  saveProject(newProject);
                  setShowCreateProjectForm(false);
                }}
              />
            )}

            <h2 className="text-2xl font-bold mt-6">Proyectos</h2>
            <ul>
              {projects.map((project) => (
                <li key={project.id} className="flex items-center mb-2">
                  <Link href={`/projects/${project.id}`} className="text-blue-500 hover:underline">
                    {project.name}
                  </Link>
                  <button
                    onClick={() => {
                      setSelectedProjectId(project.id);
                      setShowAddTaskForm(true);
                    }}
                    className="ml-4 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    Agregar Tarea
                  </button>
                </li>
              ))}
            </ul>

            {showAddTaskForm && (
              <AddTaskForm
                projectId={selectedProjectId}
                onAdd={(newTask) => {
                  saveTask(newTask);
                  setShowAddTaskForm(false);
                }}
              />
            )}
          </>
        )}

        {user.role === 'Miembro del Equipo' && (
          <>
            <h2 className="text-2xl font-bold mt-6">Tus Tareas</h2>
            <ul>
              {memberTasks.length > 0 ? (
                memberTasks.map((task) => (
                  <li key={task.id}>
                    {task.name} - {task.status} (Proyecto: {projects.find(p => p.id === task.projectId)?.name || 'Sin proyecto'})
                  </li>
                ))
              ) : (
                <p>No tienes tareas asignadas.</p>
              )}
            </ul>
          </>
        )}
      </div>
    </ProtectedPage>
  );
};

const CreateProjectForm = ({ onCreate }) => {
  const [projectName, setProjectName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectName.trim() === '') return;
    const newProject = { id: Date.now(), name: projectName };
    onCreate(newProject);
    setProjectName('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        placeholder="Nombre del proyecto"
        className="border p-2 rounded"
      />
      <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Crear
      </button>
    </form>
  );
};

const AddTaskForm = ({ projectId, onAdd }) => {
  const [taskName, setTaskName] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim() === '' || assignedTo.trim() === '') return;
    const newTask = { id: Date.now(), projectId, name: taskName, assignedTo, status: 'Pendiente' };
    onAdd(newTask);
    setTaskName('');
    setAssignedTo('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Nombre de la tarea"
        className="border p-2 rounded"
      />
      <input
        type="text"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        placeholder="Asignado a (email)"
        className="border p-2 rounded ml-2"
      />
      <button type="submit" className="ml-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Agregar Tarea
      </button>
    </form>
  );
};