import { useState } from 'react';
import UserInfo from './UserInfoBtn';
import Logout from './LogoutBtn';

function Menu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
                Menu
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <UserInfo />
                    <Logout />
                </div>
            )}
        </div>
    );
}

export default Menu;