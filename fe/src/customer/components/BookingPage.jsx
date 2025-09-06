import Navbar from '../layouts/Navbar';

function BookingPage() {
    return (
        <>
            <Navbar />
            <div className="pt-16 w-full min-h-screen bg-[#E1EAF6] fixed top-15 left-0">
                <div className="p-10 absolute top-[0px] w-full flex items-center space-x-3">
                    <img 
                        src="src/assets/image/buttonLeft.png" className="w-10 h-10"
                    />
                    <div className="border border-blue-500 px-2 py-1 rounded w-30 h-10 shadow-lg text-blue-500 font-semibold flex items-center justify-center">
                        <p>Sân A</p>
                    </div>
                     <div className="border px-2 py-1 rounded shadow-lg font-semibold flex items-center justify-center bg-red-500 w-5 h-5">
                       
                    </div>
                </div>
                <div className="bg-white shadow-lg p-88 absolute left-[40px] right-[40px] top-[100px] ">

                </div>
            </div>
        </>
    )
}

export default BookingPage;