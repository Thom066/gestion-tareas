import { useState } from 'react';
import Swal from 'sweetalert2';

function TaskCard({ task, setTasks }) {
  const { id, title, subject, deadline, status } = task;
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editSubject, setEditSubject] = useState(subject);
  const [editDeadline, setEditDeadline] = useState(deadline);

  const handleDelete = () => {
    Swal.fire({
      title: '¿Eliminar tarea?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`http://localhost:3000/tasks/${id}`, {
          method: 'DELETE',
        });
        setTasks(prev => prev.filter(t => t.id !== id));
        Swal.fire('Eliminado', 'La tarea ha sido eliminada', 'success');
      }
    });
  };

  const handleToggleStatus = async () => {
    const newStatus = status === 'pendiente' ? 'completada' : 'pendiente';
    const res = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    const updated = await res.json();
    setTasks(prev => prev.map(t => (t.id === id ? updated : t)));
  };

  const handleSaveEdit = async () => {
    if (!editTitle || !editSubject || !editDeadline) {
      Swal.fire('Campos incompletos', 'Completa todos los campos', 'warning');
      return;
    }

    const updatedData = {
      title: editTitle,
      subject: editSubject,
      deadline: editDeadline
    };

    const res = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });

    const updated = await res.json();
    setTasks(prev => prev.map(t => (t.id === id ? updated : t)));
    setIsEditing(false);
    Swal.fire('Actualizado', 'Tarea editada correctamente', 'success');
  };

  return (
    <div className={`task-card ${status}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <input
            type="text"
            value={editSubject}
            onChange={(e) => setEditSubject(e.target.value)}
          />
          <input
            type="date"
            value={editDeadline}
            onChange={(e) => setEditDeadline(e.target.value)}
          />
          <button onClick={handleSaveEdit}>Guardar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </>
      ) : (
        <>
          <h4>{title}</h4>
          <p><strong>Materia:</strong> {subject}</p>
          <p><strong>Fecha límite:</strong> {deadline}</p>
          <p><strong>Estado:</strong> {status}</p>

          <button onClick={handleToggleStatus}>
            {status === 'pendiente' ? 'Marcar como completada' : 'Marcar como pendiente'}
          </button>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button onClick={handleDelete} className="delete-btn">Eliminar</button>
        </>
      )}
    </div>
  );
}

export default TaskCard;

