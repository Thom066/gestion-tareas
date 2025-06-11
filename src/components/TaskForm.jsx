import { useState } from 'react';
import Swal from 'sweetalert2';

function TaskForm({ setTasks }) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !subject || !deadline) {
      Swal.fire('Faltan datos', 'Todos los campos son obligatorios', 'warning');
      return;
    }

    const newTask = {
      title,
      subject,
      deadline,
      status: 'pendiente'
    };

    try {
      const res = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
      });

      const created = await res.json();
      setTasks(prev => [...prev, created]);

      // Limpia el formulario
      setTitle('');
      setSubject('');
      setDeadline('');

      Swal.fire('Éxito', 'Tarea creada correctamente', 'success');
    } catch (err) {
      Swal.fire('Error', 'No se pudo crear la tarea', 'error');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>Crear nueva tarea</h3>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Materia"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
      />
      <button type="submit">Agregar Tarea</button>
    </form>
  );
}

export default TaskForm;
