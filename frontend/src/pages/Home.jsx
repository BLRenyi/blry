import { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    axios('http://localhost:8000/api/hello/')
      .then((res) => {
        if (isMounted) {
          setMessage(res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('API connection failed:', err);
        if (isMounted) {
          setMessage('Backend connection unavailable');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to BLRY</h1>
        <p className="hero-subtitle">
          A modern React application with Django backend integration
        </p>
        {loading ? (
          <p>Connecting to backend...</p>
        ) : (
          <p className="api-status">Backend says: {message}</p>
        )}
        <div className="hero-features">
          <div className="feature">
            <h3>⚛️ React 19</h3>
            <p>Latest React with modern hooks and features</p>
          </div>
          <div className="feature">
            <h3>⚡ Vite</h3>
            <p>Lightning fast development and build tool</p>
          </div>
          <div className="feature">
            <h3>🐍 Django Ready</h3>
            <p>Prepared for seamless Django backend integration</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
