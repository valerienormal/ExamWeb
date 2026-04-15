import { useState, useEffect } from 'react';

const API = 'http://localhost:3001/api/visits';

export default function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);

  const send = async (action) => {
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, action })
      });

      const data = await res.json();
      if (data.people) setList(data.people);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(API);
        const data = await res.json();
        setList(data);
      } catch (e) {
        console.error(e);
      }
    };

    load();
  }, []);

  return (
    <div style={styles.wrap}>
      <h1 style={styles.title}>Журнал відвідувань</h1>

      <input
        style={styles.input}
        placeholder="Ваше ім'я"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div style={styles.row}>
        <button style={styles.btn} onClick={() => send('enter')}>Увійти</button>
        <button style={styles.btn} onClick={() => send('exit')}>Вийти</button>
      </div>

      <h2>Зараз у лабораторії:</h2>
      <ul>
        {list.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  wrap: { maxWidth: 400, margin: '40px auto', fontFamily: 'sans-serif' },
  title: { lineHeight: 1.2, marginBottom: 20 },
  input: { width: '100%', padding: 8, marginBottom: 12 },
  row: { display: 'flex', gap: 10, marginBottom: 20 },
  btn: { padding: '8px 16px', cursor: 'pointer' }
};
