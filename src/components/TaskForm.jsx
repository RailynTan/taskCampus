// Importamos useState para manejar el estado local del formulario
import { useState } from "react";

// TaskForm recibe una función onAgregar desde App.jsx
// que se ejecutará cuando el usuario envíe una tarea válida
const TaskForm = ({ onAgregar }) => {

  // Estado que almacena lo que el usuario escribe en el input
  // Inicia vacío y se actualiza con cada tecla que el usuario presiona
  const [titulo, setTitulo] = useState("");

  // Estado para mostrar mensajes de error al usuario
  // Inicia vacío (sin error) y se actualiza si la validación falla
  const [error, setError] = useState("");

  // Función que se ejecuta cuando el usuario envía el formulario
  // Recibe el evento "e" del formulario
  const handleSubmit = (e) => {

    // Evita que el formulario recargue la página (comportamiento por defecto del HTML)
    e.preventDefault();

    // VALIDACIÓN: trim() elimina espacios al inicio y al final
    // Si el título está vacío o solo tiene espacios, mostramos error y detenemos la ejecución
    if (titulo.trim() === "") {
      setError("El título de la tarea no puede estar vacío.");
      return; // Sale de la función sin agregar nada
    }

    // Si la validación pasó, llamamos a onAgregar con el título limpio (sin espacios extremos)
    // Esta función viene de App.jsx y agrega la tarea al array de tareas
    onAgregar(titulo.trim());

    // Limpiamos el input para que quede vacío después de agregar
    setTitulo("");

    // Limpiamos cualquier mensaje de error que pudiera existir
    setError("");
  };

  return (
    // onSubmit conecta el formulario con nuestra función handleSubmit
    <form onSubmit={handleSubmit} className="card">

      <h2 className="section-title">Agregar Nueva Tarea</h2>

      {/* Contenedor en fila: input a la izquierda, botón a la derecha */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>

        {/* Input controlado: su valor SIEMPRE refleja el estado "titulo"
            onChange actualiza el estado con cada tecla que el usuario presiona */}
        <input
          type="text"
          value={titulo}            // React controla el valor del input
          onChange={(e) => setTitulo(e.target.value)}  // e.target.value es lo que el usuario escribió
          placeholder="Ej: Estudiar para prueba de Física"
          style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
        />

        {/* type="submit" activa el onSubmit del formulario al hacer clic */}
        <button className="task-button" type="submit">Agregar</button>

      </div>

      {/* Renderizado condicional: el mensaje de error solo aparece si "error" no está vacío
          Si error === "" (falsy), no se renderiza nada */}
      {error && <p style={{ color: "red", fontSize: "0.875rem" }}>{error}</p>}

    </form>
  );
};

export default TaskForm;