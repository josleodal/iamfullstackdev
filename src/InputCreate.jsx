import React, { useState } from 'react';

const InputCreate = () => {
  const [title, setTitle] = useState('');

  const handleInputChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title) return;

    try {
      const response = await fetch('http://localhost:3000/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });
      const data = await response.json();
      console.log('Task created:', data);
      setTitle('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ingrese el título de la tarea"
        value={title}
        onChange={handleInputChange}
      />
      <button type="submit">Crear tarea</button>
    </form>
  );
};

export default InputCreate;
