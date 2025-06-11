import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#28a745', '#ffc107'];

function TaskSummary({ tasks }) {
  const total = tasks.length;
  const completadas = tasks.filter(t => t.status === 'completada').length;
  const pendientes = tasks.filter(t => t.status === 'pendiente').length;

  const data = [
    { name: 'Completadas', value: completadas },
    { name: 'Pendientes', value: pendientes }
  ];

  return (
    <div className="task-summary">
      <h3>Resumen de tareas</h3>
      <ul>
        <li>Total: {total}</li>
        <li>Completadas: {completadas}</li>
        <li>Pendientes: {pendientes}</li>
      </ul>

      {total > 0 && (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default TaskSummary;

