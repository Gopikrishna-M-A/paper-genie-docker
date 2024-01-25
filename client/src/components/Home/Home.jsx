import React, { useState, useEffect } from "react";
import { Typography, Button } from 'antd';
import { Link } from 'react-router-dom';

import {
  FileAddOutlined,
  CloudDownloadOutlined,
  EditOutlined,
} from "@ant-design/icons";


const { Text } = Typography;

export default function Home() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 711);

  useEffect(() => {
    // Add an event listener to handle window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 711);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="Home-section">
      <div className="home-left">
        <div className="Home-head">
          <div className="Home-head-title">
            Create Custom Question Papers in Minutes
          </div>

          <Text
            className="font"
            style={{ maxWidth: "500px", marginTop: "10px" }}
          >
            Unlock the magic of quick and easy question paper generation with
            Effortless Paper Genie
          </Text>

          <Text type="secondary">
            Check out our{" "}
            <Link to="/tutorial" className="tutorial-link font">
              Getting Started Guide
            </Link>
          </Text>

          <div style={{ marginTop: "30px" }} className="home-buttons">
            <Link to="/Add-question">
              <Button block size="large" type="primary">
                ADD QUESTION
              </Button>
            </Link>
            <Link to="/Create">
              <Button block size="large">
                GENERATE PAPER
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="home-right">
        <div className="gome-img-container">
          {isMobile ? (
            <img src="/home1.png" alt="" className="home-img" />
          ) : (
            <img src="/home.png" alt="" className="home-img" />
          )}
        </div>
      </div>
    </div>
  );
}

// <div className="Home-guide">
// <h2>Getting Started with Effortless Paper Genie</h2>
// <p>Welcome to Effortless Paper Genie! Our platform makes it simple to create custom question papers tailored to your needs. Here's how:</p>
// <ol>
//   <li><strong>Add Questions:</strong> Click on "Add Questions" to easily input new questions into your question bank.</li>
//   <li><strong>Generate Question Papers:</strong> Use the "Create Paper" feature to generate question papers with just a few clicks.</li>
//   <li><strong>Update Question Bank:</strong> Keep your question bank up-to-date by managing and viewing your existing questions.</li>
// </ol>
// <p>Ready to get started? Click below to add your first question:</p>
// <Button type="primary" size="large">
//   <Link to="/Add-question">Add Your First Question</Link>
// </Button>
// </div>
