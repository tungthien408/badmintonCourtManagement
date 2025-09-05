import { useState, useEffect } from 'react';
import CourtCard from './CourtCard';
// import CourtType from '../../../../be/models/CourtType';
import { useAuthRedirect } from '../../shared/hooks/useAuthRedirect';
import Modal from 'react-modal'

function CourtPage() {
  useAuthRedirect();
  function onClick(court) {
    if (selectedCourt && selectedCourt.id == court.id) {
      setSelectedCourt(null);
    } else {
      setSelectedCourt(court);
    }
  }

  function onClickEditBtn(e, court) {
    e.stopPropagation();
    setEditData({ _id: court._id, name: court.name, courtTypeId: court.courtTypeId, isAvailable: court.isAvailable });
    setIsModalOpen(true);
  }

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/courts/${editData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editData)
      });
      if (response.ok) {
        setCourts(courts.map(c => c._id === editData._id ? { ...c, ...editData } : c));
        setIsModalOpen(false);
      } else {
        console.error('Save failed');
      }
    } catch (error) {
      console.error('Error saving:', error);
    }
    console.log('Saving:', editData);
    setIsModalOpen(false);
  };

  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [courtType, setCourtType] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({ name: "", courtTypeId: "", isAvailable: "" });
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
    fetch(`http://localhost:5000/api/courts/${selectedCourt._id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
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
                onClickBtn={onClickEditBtn}
              />
            )
          )}
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        appElement={document.getElementById('root')}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex ',
            alignItems: 'center',
            justifyContent: 'center'
          },
          content: {
            position: 'relative',
            background: '#1a1a1a',
            border: 'none',
            borderRadius: '8px',
            padding: '20px',
            maxWidth: '400px',
            width: '100%',
            inset: 'auto',
            // margin: '50px'
          }
        }}
      >
        <div className='space-y-4'>
          <h2 className='flex  justify-center font-bold'>Chỉnh sửa thông tin sân cầu lông</h2>
          <form onSubmit={handleSave} className='space-y-2'>
            <div className='space-x-4 flex grid grid-cols-3'>
              <label htmlFor="name">Tên sân: </label>
              <input id="name" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
            </div>
            <div className='space-x-4 flex grid grid-cols-3'>
              <label htmlFor="courtTypeId">Loại sân: </label>
              <input disabled="true" id="courtTypeId" value="Đang phát triển" onChange={(e) => setEditData({ ...editData, courtTypeId: e.target.value })} />
              {/* <input id="courtTypeId" value={editData.courtTypeId} onChange={(e) => setEditData({ ...editData, courtTypeId: e.target.value })} /> */}
            </div>
            <div className='space-x-4 justify-items-start grid grid-cols-3'>
              <label htmlFor="isAvailable">Sân trống: </label>
              <input id="isAvailable" type="checkbox" checked={editData.isAvailable} onChange={(e) => setEditData({ ...editData, isAvailable: e.target.checked })} />
            </div>
            <div className='space-x-4 flex  justify-center'>
              <button type="submit">Lưu</button>
              <button onClick={() => setIsModalOpen(false)}>Hủy</button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default CourtPage;