import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Contexto de autenticación
import { getProjects, saveProject } from '../services/storageService'; // Funciones para manejar localStorage

const ProjectsPage = () => {
  const { user } = useAuth(); // Obtiene el usuario del contexto
  const isManager = user && user.role === 'manager'; // Verifica si es manager
  const [showCreateForm, setShowCreateForm] = useState(false); // Controla la visibilidad del formulario
  const projects = getProjects(); // Obtiene los proyectos de localStorage

  return (
    <div>
      <h1>Proyectos</h1>
      {/* Mostrar la lista de proyectos */}
      <ul>
        {projects.length > 0 ? (
          projects.map((project) => (
            <li key={project.id}>{project.name}</li>
          ))
        ) : (
          <p>No hay proyectos aún.</p>
        )}
      </ul>

      {/* Botón para crear proyecto, solo visible para managers */}
      {isManager && (
        <button onClick={() => setShowCreateForm(true)}>
          Crear Nuevo Proyecto
        </button>
      )}

      {/* Formulario para crear un nuevo proyecto */}
      {showCreateForm && (
        <CreateProjectForm
          onCreate={(newProject) => {
            saveProject(newProject); // Guarda el proyecto
            setShowCreateForm(false); // Oculta el formulario
          }}
        />
      )}
    </div>
  );
};

const CreateProjectForm = ({ onCreate }) => {
  const [projectName, setProjectName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectName.trim() === '') return; // Validación básica
    const newProject = { id: Date.now(), name: projectName }; // Crea un nuevo proyecto
    onCreate(newProject); // Llama a la función para guardar
    setProjectName(''); // Limpia el campo
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        placeholder="Nombre del proyecto"
      />
      <button type="submit">Crear</button>
    </form>
  );
};

export default ProjectsPage;