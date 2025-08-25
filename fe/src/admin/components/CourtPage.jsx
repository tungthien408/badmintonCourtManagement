import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../../App.css'
import CourtCard from './CourtCard'
import { jwtDecode } from "jwt-decode";

function CourtPage() {
  const navigate = useNavigate();
  // verify JWT Token
  useEffect(() => {
    const token = sessionStorage.getItem('jwtToken');
    if (!token) {
      navigate('/login');
    } else {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        console.log("navigated from courts => login", Date.now() - decoded.date);
        navigate('/login');
      } else if (decoded.role === 'customer') {
        navigate('/booking');
      }
    }
  }, [navigate]);


  function onClick(court) {
    if (selectedCourt && selectedCourt.id == court.id) {
      setSelectedCourt(null);
    } else {
      setSelectedCourt(court);
    }
  }

  const [courts, setCourts] = useState([])
  const [selectedCourt, setSelectedCourt] = useState(null)

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

  useEffect(() => {
    if (!selectedCourt) return;
    fetch(`http://localhost:5000/api/courts/${selectedCourt._id}`)
      .then(response => response.json())
      .then(data => {
        const updateCourts = courts.map(court => {
          if (court._id === selectedCourt._id) return data.court;
          else return court;
        });
        setCourts(updateCourts)
      })
      .catch(error => {
        console.error('Error fetching courts:', error)
      })
  }, [selectedCourt])

  return (
    <>
      <h1>🏸 Badminton Court Management</h1>
      <h2>Available Courts</h2>

      {courts.length === 0 ? (
        <p>Loading courts...</p>
      ) : (
        courts.map(
          court => (
            <CourtCard key={court._id} court={court} selectedCourt={selectedCourt} onClick={() => onClick(court)} />
          ))
      )}
    </>
  )
}

export default CourtPage;