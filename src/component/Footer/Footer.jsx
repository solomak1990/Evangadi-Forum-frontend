import React from "react";
import classes from "./footer.module.css"
import logo from "../images/logo.png";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className={classes.footer}>
  <div className={classes.footer_inner_container}>
    {/* Logo and Social Icons */}
    <div className={classes.footer_section}>
      <div className={classes.footer_icon}>
        <img src={logo} alt="Evangadi Logo" />
      </div>
      <div className={classes.footer_icon2}>
        <p><FacebookOutlinedIcon size={35} /></p>
        <p><InstagramIcon size={35} /></p>
        <p><YouTubeIcon size={35} /></p>
      </div>
    </div>

    {/* Useful Links */}
    <div className={classes.footer_section}>
      <h3>Useful Link</h3>
      <ul>
        <li><Link to="/how-it-works">How it works</Link></li>
        <li>Terms of Service</li>
        <li>Privacy policy</li>
      </ul>
    </div>

    {/* Contact Info */}
    <div className={classes.footer_section}>
      <h3>Contact Info</h3>
      <ul>
        <li>Contact Info</li>
        <li>support@evangadi.com</li>
        <li>+1-202-386-2702</li>
      </ul>
    </div>
  </div>

  <div className={classes.copy_write}>
    &copy; 2010–2025, Evangadi.com
  </div>
</div>

    </>
  );
}

export default Footer;
