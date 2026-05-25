// Importamos los hooks necesarios de React
// useState: para manejar los datos, el estado de carga y los errores
// useEffect: para ejecutar el fetch cuando el componente se monta
import { useState, useEffect } from "react";

// Custom hook: es una función que comienza con "use" y encapsula
// lógica de estado reutilizable. En este caso, toda la lógica
// de cargar tareas desde la API queda aquí y no en App.jsx
const useTareas = () => {

  // Estado 1: array donde se guardarán las tareas que devuelve la API
  // Inicia vacío porque aún no hemos pedido nada
  const [tareas, setTareas] = useState([]);

  // Estado 2: indica si la petición está en curso
  // Inicia en true porque al montar el componente la carga empieza de inmediato
  const [cargando, setCargando] = useState(true);

  // Estado 3: guarda el mensaje de error si la petición falla
  // Inicia en null porque aún no hay ningún error
  const [error, setError] = useState(null);

  // useEffect con array vacío [] → se ejecuta UNA SOLA VEZ cuando el
  // componente que usa este hook se monta. Ideal para cargar datos iniciales.
  useEffect(() => {

    // Definimos la función async DENTRO del useEffect
    // (useEffect no puede ser async directamente, por eso se hace así)
    const cargarTareas = async () => {

      try {
        // fetch hace la petición GET a la API
        // ?_limit=10 le pide a JSONPlaceholder que devuelva solo 10 tareas
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=10"
        );

        // response.ok es true si el servidor respondió con código 200-299
        // Si respondió con 404, 500, etc. → lanzamos un error manualmente
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        // .json() convierte la respuesta (texto) a un array de objetos JavaScript
        // await espera a que esa conversión termine antes de continuar
        const data = await response.json();

        // La API devuelve { id, title, completed, userId }
        // Pero TaskCampus usa  { id, titulo, completada }
        // map transforma cada objeto del formato API al formato propio
        const tareasAdaptadas = data.map((item) => ({
          id: item.id,
          titulo: item.title,       // title  → titulo
          completada: item.completed, // completed → completada
        }));

        // Guardamos las tareas adaptadas en el estado
        setTareas(tareasAdaptadas);

      } catch (err) {
        // Si fetch falla (sin internet) o lanzamos el throw de arriba
        // guardamos el mensaje de error en el estado para mostrarlo en la UI
        setError(err.message);

      } finally {
        // finally se ejecuta SIEMPRE: haya éxito o error
        // Marcamos que la carga terminó para ocultar el spinner/mensaje de carga
        setCargando(false);
      }
    };

    // Llamamos a la función que acabamos de definir
    // (definirla y llamarla por separado es el patrón estándar con async en useEffect)
    cargarTareas();

  }, []); //array vacío = solo se ejecuta al montar, nunca más

  // Retornamos los tres estados y setTareas para que el componente
  // que use este hook pueda: mostrar las tareas, mostrar carga,
  // mostrar errores, y también modificar las tareas (agregar/completar)
  return { tareas, setTareas, cargando, error };
};

export default useTareas;