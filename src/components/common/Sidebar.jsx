import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBriefcase, faUser, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="bg-gray-800 text-white h-screen w-16 fixed flex flex-col items-center">
      <div className="flex flex-col items-center mt-10 mb-4">
        <Link to="/">
          <FontAwesomeIcon icon={faHome} className="text-2xl mb-2 hover:text-gray-400 cursor-pointer" />
        </Link>
        <Link to="/jobs">
          <FontAwesomeIcon icon={faBriefcase} className="text-2xl mb-2 hover:text-gray-400 cursor-pointer" />
        </Link>
        <Link to={isAuthenticated ? '/profile' : '/login'}>
          <FontAwesomeIcon icon={faUser} className="text-2xl mb-2 hover:text-gray-400 cursor-pointer" />
        </Link>
        {isAuthenticated ? (
          <button onClick={onLogout} className="focus:outline-none">
            <FontAwesomeIcon icon={faSignOutAlt} className="text-2xl mb-2 hover:text-gray-400 cursor-pointer" />
          </button>
        ) : (
          <Link to="/login">
            <FontAwesomeIcon icon={faSignInAlt} className="text-2xl mb-2 hover:text-gray-400 cursor-pointer" />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Sidebar;
