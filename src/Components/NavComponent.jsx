import React,{useState} from "react";
import { Container,Card,Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import NotificationIcon from "../assets/Icons/notification.svg";
import ChatIcon from "../assets/Icons/chat.svg";
import ProfileIcon from "../assets/Icons/profile.svg";
import Logo from "../assets/Images/logo.png";
import SearchBar from "./SearchBar";
import { useSearch } from "../Context/SearchContext";
import { useTheme } from "../Context/ThemeContext";
import DarkMoonIcon from "../assets/Icons/darkMoon.svg";
import DownArrow from "../assets/Icons/downArrow.svg";


const NavComponent = React.memo(({user,profile,handleLogout}) => {
    const { handleSearch } = useSearch();
    const { toggleTheme } = useTheme();
    const [showMore,setShowMore] = useState(false);

    const ShowMoreComponent = () => {
                return (
                <Card className="pop-over-profile-card">
                     <ul>   
                        <li>
                            <div className="profile-info-div">
                             <p>{profile?.name ?? user.user_metadata.name}</p>
                             <p>{profile?.email ?? user.email}</p>
                            </div>
                        </li>
                         <li><Link to="/profile">View Account</Link></li>
                        <li><a onClick={handleLogout}>Log Out</a></li>
                     </ul>
                </Card>);
    }

    return (
        <>
            {/* Fixed Navbar */}
            <nav className="navbar">
                <Container fluid>
                    <Row style={{ width: "100%" }}>
                        <ul className="nav-list">
                            <li><Link to="/home"><img src={Logo} alt="logo" width="70px" height="50px"  className="logo"/></Link></li>
                            <li><Link to="/home"><p>Home</p></Link></li>
                            <li><Link to="/create"><p>Create</p></Link></li>
                            <li className="search-bar">

                                <SearchBar handleSearch={handleSearch} />
                            </li>
                            <li ><img className="nav-icon" src={DarkMoonIcon} onClick={toggleTheme} alt="dark" /></li>
                            {/* <li><img src={NotificationIcon} alt="Notifications" className="nav-icon" /></li>
                            <li><img src={ChatIcon} alt="Chat" className="nav-icon" /></li> */}
                            <li ><Link to="/profile"><img src={profile?.avatar_url ?? user.user_metadata.avatar_url  ?? ProfileIcon} alt="Profile" className="nav-icon user-img" /></Link>
                            <img src={DownArrow} alt="Profile" className="nav-icon"  onClick={() => setShowMore(!showMore)}/>
                            </li>
                        
                        </ul>
                    </Row>
                </Container>
            </nav>

            {
                showMore && <ShowMoreComponent />
            }
           
        </>
    );
});

export default NavComponent;
