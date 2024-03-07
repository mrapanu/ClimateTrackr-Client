import React from "react";
import { FaGithub } from "react-icons/fa";
import "./Footer.css";
const Footer = ({isNightTime}) => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="centered-content">
          <FaGithub size={25} className="github-icon" />
          <a
            className={`footer-link ${isNightTime ? "night" : "day"}`}
            href="https://github.com/mrapanu/ClimateTrackr-Client"
            target="_blank"
            rel="noopener noreferrer"
          >
            °ClimateTrackr
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
