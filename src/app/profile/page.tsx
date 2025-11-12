'use client'

import axios from 'axios';
import React , {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';

function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState({});

  const handleLogout = () => {
      axios.get('/api/users/logout')
      .then((res) => {
        router.push('/login');
      })
      .catch(err => {
        console.log(err);
      });
  };

  
  useEffect(() => {
    axios.get('/api/users/me').then(res => {
      setUser(res.data.data);
    }).catch(err => {
      console.log(err)
    })
  }, [])


  return (
    <div style={{ minHeight: '100vh', background: '#f9fafd' }}>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '1.5rem 2rem',
          background: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
        }}
      >
        <button
          onClick={handleLogout}
          style={{
            padding: '0.6em 1.5em',
            background:
              'linear-gradient(90deg, #6366f1 0%, #4f46e5 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '1.5em',
            fontWeight: 600,
            fontSize: '1rem',
            letterSpacing: '.04em',
            cursor: 'pointer',
            boxShadow: '0 1px 4px rgba(45,55,72,0.10)',
            transition: 'background 0.2s, filter 0.2s',
          }}
          onMouseOver={e =>
            (e.currentTarget.style.filter = 'brightness(.96)')
          }
          onMouseOut={e =>
            (e.currentTarget.style.filter = 'none')
          }
        >
          Logout
        </button>
      </nav>
      <div style={{ padding: '2rem' , color : "black"}}>
      {user && user._id ? user._id : 'Loading...'} 
      </div>
    </div>
  );
} 

export default ProfilePage;