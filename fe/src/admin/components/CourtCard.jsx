function CourtCard({ court, selectedCourt, onClick, onClickBtn }) {
    const isSelected = (selectedCourt?._id === court._id)
    const bgClass = court.isAvailable ? "bg-green-100" : "bg-red-100";

    return (
        <div onClick={onClick} className={`p-10 border border-solid border-inherit rounded-md cursor-pointer ${bgClass} text-black text-center min-h-20 flex flex-col justify-center text-lg transition-all duration-300 ease-in-out`}>
            <p>Court {court.name}</p>
            {isSelected && (
                <>
                    <p>Status: {court.isAvailable ? '✅ Sân trống' : '❌ Đã đặt'}</p>
                    <p>Branch: {court.branchId.name}</p>
                    <div>
                        <button onClick={(e) => onClickBtn(e, court)} className={`m-3`}>Sửa</button>
                        {/* <button className={"m-3 bg-pink-500 text-white rounded hover:bg-pink-600 transition ml-2"}>Xóa</button> */}
                    </div>
                </>
            )}
        </div>
    )
}

export default CourtCard;