import { useState, useEffect } from 'react';
import { api } from './services/api';
import './App.css'

function App() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await api.get('/applications');
        setApplications(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchApps();

  }, []);

  return (
    <>
      <h1>
        Simple Job Tracker
      </h1>
      {applications.map(app => (
        <div key={app._id}>
          <h3>{app.company}</h3>
          <p>{app.position}</p>
          <p>{app.status}</p>
        </div>
      ))}
    </>
  )
}

export default App
