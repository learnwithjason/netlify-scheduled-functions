import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function loadNotionData() {
      const loadedItems = await fetch(
        'http://localhost:8888/.netlify/functions/get-notion-data',
      ).then((res) => res.json());

      setItems(loadedItems);
    }

    loadNotionData();
  }, []);

  return (
    <div className="App">
      <h1>Data Loaded From Notion, Published Every Minute</h1>
      <ul>
        {items.map((item) => (
          <li key={item.key}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
