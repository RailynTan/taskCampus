import { useState } from "react";
const TaskList = ({ tareas, onCompletar }) => {
  const [filtro, setFiltro] = useState("todas");
  // Filtra según el botón activo
  const tareasFiltradas = tareas.filter((t) => {
    if (filtro === "pendientes") return !t.completada;
    if (filtro === "completadas") return t.completada;
    return true;
  });
  return (
    <div className="card">
      <h2 className="section-title">Lista de Tareas</h2>
      {/* Botones de filtro */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        <button className="task-button" onClick={() => setFiltro("todas")}>Todas</button>
        <button className="task-button" onClick={() => setFiltro("pendientes")}>Pendientes</button>
        <button className="task-button" onClick={() => setFiltro("completadas")}>Completadas</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tareasFiltradas.map((tarea) => (
          <li
            key={tarea.id}
            className="task-item"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {/* Título tachado si está completada */}
            <span
              style={{
                textDecoration: tarea.completada ? "line-through" : "none",
                color: tarea.completada ? "#94a3b8" : "inherit",
              }}>
              {tarea.titulo}
            </span>
            {/* Ícono si completada, botón si pendiente */}
            {tarea.completada ? (
              <span>✅</span>
            ) : (
              <button className="task-button" onClick={() => onCompletar(tarea.id)}
              >
                Completar
              </button>
            )}
          </li>
        ))}
      </ul>
      {/* Mensaje si no hay tareas en el filtro activo */}
      {tareasFiltradas.length === 0 && (
        <p>No hay tareas en esta categoría.</p>
      )}
    </div>
    
  );
};

export default TaskList;