import LogoutBtn from '../../shared/components/LogoutBtn';
import LoginBtn from '../../customer/components/LoginBtn';

function Navbar() {
    const logined = sessionStorage.getItem('jwtToken') ? true : false;
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-blue-600 text-white px-4 py-2 flex items-center justify-between">
            <div className="font-bold text-lg">logo</div>
            <ul className="flex space-x-6 items-center">
                <li><a href="/" className="hover:underline ">Trang chủ</a></li>
                <li><a href="/booking" className="hover:underline">Đặt sân</a></li>
                <li><a href="/courts" className="hover:underline">Quản lý</a></li>
                <li><a href="#" className="hover:underline">Khu vực</a></li>
                <li>{logined ? <LogoutBtn /> : <LoginBtn />}</li>
            </ul>
        </nav>
    )
}

export default Navbar;