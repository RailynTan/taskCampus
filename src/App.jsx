import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import TaskSummary from "./components/TaskSummary";
import TaskForm from "./components/TaskForm";
import "./App.css";

const App = () => {
  const [tareas, setTareas] = useState(() => {
    const guardadas = localStorage.getItem("taskcampus-tareas");
    return guardadas ? JSON.parse(guardadas) : [];
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const hayDatosLocales = localStorage.getItem("taskcampus-tareas");
    if (hayDatosLocales) return;
    const cargarDesdeAPI = async () => {
      setCargando(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=10"
        );
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const data = await response.json();

        const tareasAdaptadas = data.map((item) => ({
          id: item.id,
          titulo: item.title,
          completada: item.completed,
        }));

        setTareas(tareasAdaptadas);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargarDesdeAPI();
  }, []);

  useEffect(() => {
    localStorage.setItem("taskcampus-tareas", JSON.stringify(tareas));
  }, [tareas]);

  useEffect(() => {
    const pendientes = tareas.filter((t) => !t.completada).length;
    document.title = `TaskCampus (${pendientes} pendientes)`;
  }, [tareas]);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("TaskCampus activo");
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const agregarTarea = async (titulo) => {
    const nuevaTarea = { id: Date.now(), titulo, completada: false };
    setTareas([...tareas, nuevaTarea]);

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: titulo, completed: false, userId: 1 }),
      });
      const data = await response.json();
      console.log("Tarea creada en servidor:", data);
    } catch (err) {
      console.error("Error al crear tarea en servidor:", err);
    }
  };
  const completarTarea = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id
          ? { ...tarea, completada: true }
          : tarea
      )
    );
  };
  return (
    <div className="app-container">
      <Header title="TaskCampus" description="Gestiona tus tareas académicas" />
      <TaskSummary total={tareas.length} />
      <TaskForm onAgregar={agregarTarea} />
      <TaskList tareas={tareas} onCompletar={completarTarea} cargando={cargando} error={error} />
    </div>
  );
};

export default App;