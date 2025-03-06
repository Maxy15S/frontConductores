import { useState } from 'react';
import axios from "axios";
import './App.css';

interface Driver {
  rut_conductor: string;
  nombre_conductor: string;
  numero_celular: string;
  fecha_nacimiento: string;
  licencia_conducir: string;
  estado_conductor: string;
  nombre_faena: string;
}

function App() {

  const [drivers, setDrivers]         = useState<Driver[]>([]); // Lista de conductores
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const driversPerPage                = 20; // Conductores por página

  // Obtener el token de autenticación
  async function getDrivers() {
    // const urlApi = "http://localhost:8080/conductores";
    const urlApi = "https://getconductores-638783315014.us-central1.run.app/conductores";
    try {
      const response = await axios.get<Driver[]>(urlApi);

      console.log(`Conductores: ${response.data}`);
      setDrivers(response.data);

    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  // Obtener los conductores de la página actual
  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const currentDrivers = drivers.slice(indexOfFirstDriver, indexOfLastDriver);

  // Cambiar la página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(drivers.length / driversPerPage);

  return (
    <>
      <div>
        <h1>Test FastAPI en React</h1>
        <div className="buttons">
          <button onClick={getDrivers}>getDrivers</button>
        </div>

        {/* Tabla para mostrar los conductores */}
        <div>
          {drivers.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>RUT</th>
                  <th>Nombre Conductor</th>
                  <th>Celular</th>
                  <th>Fecha Nacimiento</th>
                  <th>Licencia</th>
                  <th>Estado</th>
                  <th>Nombre Faena</th>
                </tr>
              </thead>
              <tbody>
                {currentDrivers.map(driver => (
                  <tr key={driver.rut_conductor}>
                    <td>{driver.rut_conductor}</td>
                    <td>{driver.nombre_conductor}</td>
                    <td>{driver.numero_celular}</td>
                    <td>{driver.fecha_nacimiento}</td>
                    <td>{driver.licencia_conducir}</td>
                    <td>{driver.estado_conductor}</td>
                    <td>{driver.nombre_faena}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay conductores disponibles.</p>
          )}
        </div>

        {/* Paginado */}
        <div className='paginado'>
          <button 
            onClick={() => paginate(currentPage - 1)} 
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span> Página {currentPage} de {totalPages} </span>
          <button 
            onClick={() => paginate(currentPage + 1)} 
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
