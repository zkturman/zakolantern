import { NavLink } from "react-router-dom";
import { IconButton } from "./IconButton";
import './ButtonMenu.css';

function ButtonMenu(){
    const navLinkStyles = ({ isActive }) => (isActive ? "active-link" : "");

    return (
        <>
            <div className="nav-button-container">
                <nav>
                <NavLink to="/" className={navLinkStyles}>
                    <IconButton iconSrc="/assets/InfoIcon.png" label="Info"></IconButton>
                </NavLink> |{" "}
                <NavLink to="/journal" className={navLinkStyles}>
                     <IconButton iconSrc="/assets/JournalIcon.png" label="Journal"></IconButton>
                </NavLink> |{" "}
                <NavLink to="/investigate" className={navLinkStyles}>
                     <IconButton iconSrc="/assets/ResearchIcon.png" label="Research"></IconButton>
                </NavLink> |{" "}
                <NavLink to="/chimes" className={navLinkStyles}>
                     <IconButton iconSrc="/assets/ChapelIcon.png" label="Chapel"></IconButton>
                </NavLink>
                </nav>
            </div>
        </>
    );
}

export {ButtonMenu};