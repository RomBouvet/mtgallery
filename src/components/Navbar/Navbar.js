import { Link } from "react-router-dom";
import './Navbar.scss';

export default function Navbar() {
    return (
        <div className="navbarContainer">
            <div className="navbar">
                <Link to="/" className="navbarTitle"><img src="/mtgallery_icon.png" alt="" />MTGallery</Link>
                <Link to="/">Accueil</Link>
                <Link to="/search">Search</Link>
                <Link to="/sets">Sets</Link>
            </div>
        </div>
    );
}