import { useEffect, useState } from "react";
import "./styles.css";

const URL = "https://jsonplaceholder.typicode.com/comments";

export default function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  const getData = async () => {
    try {
      const resp = await fetch(URL);
      if (!resp.ok) throw new Error("Error en fetch");
      const data = await resp.json();
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  /* Paginacion */
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const lastIndex = itemsPerPage * currentPage;
  const firstIndex = lastIndex - itemsPerPage;
  const dataPagination = data.slice(firstIndex, lastIndex);

  /* Funcionalidades de los botones */
  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <div className="App">
      <h1>Prueba Tecnica React</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.length ? (
            dataPagination.map((item) => (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
              </tr>
            ))
          ) : (
            <td colSpan={3}>No hay datos</td>
          )}
        </tbody>
      </table>

      <div className="buttons">
        <button
          disabled={currentPage === 1 || isLoading}
          onClick={goToFirstPage}
        >
          first
        </button>
        <button
          disabled={currentPage === 1 || isLoading}
          onClick={goToPreviousPage}
        >
          previous
        </button>
        <button
          disabled={currentPage === totalPages || isLoading}
          onClick={goToNextPage}
        >
          next
        </button>
        <button
          disabled={currentPage === totalPages || isLoading}
          onClick={goToLastPage}
        >
          end
        </button>
      </div>

      <p>
        {currentPage} de {totalPages}
      </p>
    </div>
  );
}
