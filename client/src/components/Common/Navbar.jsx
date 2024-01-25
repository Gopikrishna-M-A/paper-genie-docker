import React, { useState } from "react";
import "./navbar.css";
import { MenuOutlined, UserOutlined, LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Button, Dropdown, message } from "antd";
import baseURL from '../baseURL'

const Navbar = ({ user, setUser}) => {
  const navigate = useNavigate();
  const [isNavExpanded, setIsNavExpanded] = useState(false);



  const toggleNav = () => {
    setIsNavExpanded(!isNavExpanded);
  };
  const closeNav = () => {
    setIsNavExpanded(false);
  };

  const handleMenuClick = async(e) => {
    if (e.key === '1') { // Check if the key is '1', which corresponds to the 'Logout' option
      try {
        // Send a POST request to logout
        const response = await fetch(`${baseURL}/auth/logout`, {
          method: 'POST',
          credentials: 'include', // Include cookies in the request
        });
  
        if (response.status === 200) {
          // Logout successful, navigate to /login
          setUser(null)
          message.success('Logout successful.');
          navigate('/login');
        } else {
          message.error('Logout failed. Please try again.');
        }
      } catch (error) {
        console.error('Logout error:', error);
        message.error('Logout failed. Please try again.');
      }
    }else if (e.key === '2') { // Check if the key is '2', which corresponds to the 'Settings' option
      // Navigate to the /settings route
      navigate('/settings');
    }
  };
  const items = [
    {
      label: 'Logout',
      key: '1',
      icon: <LogoutOutlined />,
    },
    {
      label: 'Settings',
      key: '2',
      icon: <SettingOutlined />,
    }
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <>
      <nav className={`nav ${isNavExpanded ? "nav--expanded" : ""}`}>
        <div className="nav-left-sec">
        <MenuOutlined className="nav__collapser" onClick={toggleNav} />
        <div className="nav-content-wrapper">
        <Link onClick={closeNav} className="nav__brand" to="/">
          {/* <img className="logo-img" src="/logo.png" alt="" /> */}
          Paper Genie
        </Link>
        {user ? (
          <Dropdown.Button
            className="profile-small"
            menu={menuProps}
            placement="bottom"
            icon={<UserOutlined />}
          />
        ) : (
          <Link to="/login" className="profile-small">
            <Button type="primary">Login</Button>
          </Link>
        )}
        </div>
        </div>

        <div className="nav__collapsable">


          <Link className="link-item" onClick={closeNav} to="/Add-question">
            Add Question
          </Link>
          <Link className="link-item" onClick={closeNav} to="/Create">
            Create Paper
          </Link>
          <Link className="link-item" onClick={closeNav} to="/view-questions">
            Question Bank
          </Link>


      {user ? (
        <Dropdown.Button
          className="profile-big"
          menu={menuProps}
          placement="bottom"
          icon={<UserOutlined />}
        >
          {user.username}
        </Dropdown.Button>
      ) : (
        <Link to="/login" className="profile-big">
          <Button >Login</Button>
        </Link>
)}

        </div>
      </nav>
    </>
  );
};

export default Navbar;
