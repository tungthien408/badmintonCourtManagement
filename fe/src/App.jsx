import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [courts, setCourts] = useState([])

  useEffect(() => {
    // Fetch courts data from our backend
    fetch('http://localhost:5000/api/courts')
      .then(response => response.json())
      .then(data => {
        setCourts(data.courts)
      })
      .catch(error => {
        console.error('Error fetching courts:', error)
      })
  }, [])

  return (
    <>
      <h1>🏸 Badminton Court Management</h1>
      <h2>Available Courts</h2>
      
      {courts.length === 0 ? (
        <p>Loading courts...</p>
      ) : (
        <div>
          {courts.map(court => (
            <div key={court.id} style={{ 
              padding: '10px', 
              margin: '10px', 
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: court.isAvailable ? '#e8f5e8' : '#ffe8e8'
            }}>
              <h3>Court {court.name}</h3>
              <p>Status: {court.isAvailable ? '✅ Available' : '❌ Booked'}</p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default App
