import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import TaskSummary from '../components/TaskSummary';


function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const user = JSON.parse(localStorage.getItem('auth'));

  // Cargar tareas
  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(() => {
        Swal.fire('Error', 'No se pudieron cargar las tareas', 'error');
      });
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('auth');
    window.location.href = '/';
  };

  // Función para filtrar tareas
  const filteredTasks = tasks.filter(task => {
    return (
      task.title.toLowerCase().includes(filter.toLowerCase()) &&
      (statusFilter ? task.status === statusFilter : true)
    );
  });

  return (
    <div className="dashboard-container">
      <header>
        <h2>Bienvenido, {user.name}</h2>
        <TaskSummary tasks={tasks} />
        <button onClick={handleLogout}>Cerrar sesión</button>
      </header>

      <TaskForm setTasks={setTasks} />

      <div className="filters">
        <input
          type="text"
          placeholder="Buscar por título o materia"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">Todos</option>
          <option value="pendiente">Pendiente</option>
          <option value="completada">Completada</option>
        </select>
      </div>

      <div className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} setTasks={setTasks} />
          ))
        ) : (
          <p>No hay tareas para mostrar.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
