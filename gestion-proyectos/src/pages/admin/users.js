import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import { getUsers, saveUsers } from '../../services/storageService';

export default function UsersAdmin() {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ email: '', password: '', role: 'Miembro del Equipo' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    if (user && user.role !== 'Administrador') {
      router.push('/dashboard');
    } else {
      const storedUsers = getUsers();
      setUsers(storedUsers);
    }
  }, [user, router]);

  const handleCreateUser = (e) => {
    e.preventDefault();
    const newId = Date.now();
    const createdUser = { id: newId, ...newUser };
    const updatedUsers = [...users, createdUser];
    saveUsers(updatedUsers);
    setUsers(updatedUsers);
    setNewUser({ email: '', password: '', role: 'Miembro del Equipo' });
  };

  const handleEditUser = (userToEdit) => {
    setEditingUser(userToEdit);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const updatedUsers = users.map((u) =>
      u.id === editingUser.id ? editingUser : u
    );
    saveUsers(updatedUsers);
    setUsers(updatedUsers);
    setEditingUser(null);
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((u) => u.id !== userId);
    saveUsers(updatedUsers);
    setUsers(updatedUsers);
  };

  if (!user || user.role !== 'Administrador') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Administración de Usuarios</h1>

      <div className="bg-white p-6 rounded shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Crear Nuevo Usuario</h2>
        <form onSubmit={handleCreateUser}>
          <input
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            placeholder="Email"
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            placeholder="Contraseña"
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="Administrador">Administrador</option>
            <option value="Gerente de Proyectos">Gerente de Proyectos</option>
            <option value="Miembro del Equipo">Miembro del Equipo</option>
          </select>
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
            Crear Usuario
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Lista de Usuarios</h2>
        <ul>
          {users.map((u) => (
            <li key={u.id} className="mb-2 flex justify-between items-center">
              <span>{u.email} - {u.role}</span>
              <div>
                <button
                  onClick={() => handleEditUser(u)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteUser(u.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {editingUser && (
        <div className="bg-white p-6 rounded shadow-md mt-6">
          <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>
          <form onSubmit={handleUpdateUser}>
            <input
              type="email"
              value={editingUser.email}
              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
              placeholder="Email"
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              type="password"
              value={editingUser.password}
              onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
              placeholder="Contraseña"
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <select
              value={editingUser.role}
              onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
              className="w-full p-2 mb-4 border rounded"
            >
              <option value="Administrador">Administrador</option>
              <option value="Gerente de Proyectos">Gerente de Proyectos</option>
              <option value="Miembro del Equipo">Miembro del Equipo</option>
            </select>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Actualizar Usuario
            </button>
          </form>
        </div>
      )}
    </div>
  );
}