import { Link } from "react-router-dom";
import './Navbar.css';

export default function Navbar() {
    return (
        <div className="navbarContainer">
            <Link to="/" className="navbarTitle"><img src="/mtgallery_icon.png" alt=""/>MTGallery</Link>
            <Link to="/cards">Cards</Link>
            <Link to="/sets">Sets</Link>
            <Link to="/other">Other link to a bit too long for mobile browsers</Link>
        </div>
    );
}