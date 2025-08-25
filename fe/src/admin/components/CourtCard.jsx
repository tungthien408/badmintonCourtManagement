function CourtCard({ court, selectedCourt, onClick }) {
    const isSelected = (selectedCourt?._id === court._id)
    return (
        <div onClick={onClick} style={{
            padding: '10px',
            margin: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: court.isAvailable ? '#e8f5e8' : '#ffe8e8',
            color: '#000000'
        }}>
            <p>Court {court.name}</p>
            {isSelected && (
                <>
                    <p>Status: {court.isAvailable ? '✅ Available' : '❌ Booked'}</p>
                    <p>Branch: {court.branchId}</p>
                </>
            )}
        </div>
    )
}

export default CourtCard;