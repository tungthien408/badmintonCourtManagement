import { useState, useEffect } from 'react';
// import '../../App.css';
import CourtCard from './CourtCard';
// import Navbar from '../../customer/components/Navbar';
import { useAuthRedirect } from '../../shared/hooks/useAuthRedirect';

function CourtPage() {
  useAuthRedirect();
  function onClick(court) {
    if (selectedCourt && selectedCourt.id == court.id) {
      setSelectedCourt(null);
    } else {
      setSelectedCourt(court);
    }
  }

  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const token = sessionStorage.getItem('jwtToken');

  useEffect(() => {
    // Fetch courts data from our backend
    fetch('http://localhost:5000/api/courts', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
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
      {/* <Navbar /> */}
      <h1>🏸 Badminton Court Management</h1>
      <p className="text-lg m-2">Available Courts</p>

      {courts.length === 0 ? (
        <p>Loading courts...</p>
      ) : (
        <div className="m-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courts.map(
            court => (
              <CourtCard
                key={court._id}
                court={court}
                selectedCourt={selectedCourt}
                onClick={() => onClick(court)}
              />
            )
          )}
        </div>
      )}
    </>
  )
}

export default CourtPage;