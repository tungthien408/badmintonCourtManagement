
import Menu from '../../shared/components/Menu';
import LoginBtn from '../components/LoginBtn';
import logo from "../../assets/image/2137712306ad74a453808b4857a072b1ff032aef.png"

function Navbar() {
    const logined = sessionStorage.getItem('jwtToken') ? true : false;
    return (
        <nav className="max-h-88 fixed top-0 left-0 w-full z-50 bg-[#E1EAF6] text-[#2C3E50] px-4 py-2 flex items-center justify-between">
            <div className="h-20 w-20">
                <img src={logo} alt="logo" />
            </div>
            <ul className="flex space-x-6 items-center">
                <li><a href="/" className="hover:text-[#EE5858] active:text-[#EE5858] ">Trang chủ</a></li>
                <li><a href="/booking" className="hover:text-[#EE5858] active:text-[#EE5858]">Đặt sân</a></li>
                <li><a href="/courts" className="hover:text-[#EE5858] active:text-[#EE5858]">Quản lý</a></li>
                <li><a href="#" className="hover:text-[#EE5858] active:text-[#EE5858]">Khu vực</a></li>
                <li>{logined ? <Menu /> : <LoginBtn />}</li>
            </ul>
        </nav>
    )
}

export default Navbar;
