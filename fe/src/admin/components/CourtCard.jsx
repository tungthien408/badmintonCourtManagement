function CourtCard({ court, selectedCourt, onClick }) {
    const isSelected = (selectedCourt?._id === court._id)
    const bgClass = court.isAvailable ? "bg-green-100" : "bg-red-100";

    /* 
    style={{
            padding: '10px',
            margin: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: court.isAvailable ? '#e8f5e8' : '#ffe8e8',
            color: '#000000'
        }}
    */
    return (
        <div onClick={onClick} className={`p-10 border border-solid border-inherit rounded-md cursor-pointer ${bgClass} text-black text-center min-h-20 flex flex-col justify-center text-lg transition-all duration-300 ease-in-out`}>
            <p>Court {court.name}</p>
            {isSelected && (
                <>
                    <p>Status: {court.isAvailable ? '✅ Available' : '❌ Booked'}</p>
                    <p>Branch: {court.branchId.name}</p>
                </>
            )}
        </div>
    )
}

export default CourtCard;