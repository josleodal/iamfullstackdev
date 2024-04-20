import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from './Home.jsx'
import ItemDetailPage from "./ItemDetailPage.jsx";
import InputCreate from "./InputCreate.jsx";

const App = () => {
  const [data, setData] = useState(null);
  const urlApi = 'http://localhost:3000';

  const fetchData = async () => {
    try {
      const response = await fetch(urlApi);
      if (!response.ok) {
        throw new Error('Failed to fetch data from the server');
      }
      const resData = await response.json();
      setData(resData);
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  const handleTaskCreate = async (newTask) => {
    try {
      const response = await fetch(`${urlApi}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTask }),
      });
      if (!response.ok) {
        throw new Error('Failed to create task');
      }
      fetchData(); // Refetch data after creating task
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Inicio</Link>
        </nav>
        {data === null ? (
          <div>cargando...</div>
        ) : (
          <Routes>
            <Route path="/" element={<Home data={data} />} />
            {data.map(item => (
              <Route key={item._id} path={`/${item._id}`} element={<ItemDetailPage item={item}/>} />
            ))}
            <Route path="/create" element={<InputCreate onTaskCreate={handleTaskCreate} />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
