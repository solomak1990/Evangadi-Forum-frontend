import React from "react";
import classes from "./footer.module.css"
import logo from "../images/logo.png";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Footer() {
  return (
    <>
      <div className={classes.footer}>
        <div className={classes.footer_out_container}>
          <div className={classes.footer_inner_container}>
            <div className={classes.footer_data}>
              <div>
                <div className={classes.footer_icon}>
                  <img src={logo} />
                </div>
                <div className={classes.footer_icon2}>
                  <p>
                    <FacebookOutlinedIcon size={35} />
                  </p>
                  <p>
                    <InstagramIcon size={35} />
                  </p>

                  <YouTubeIcon size={35} />
                </div>
              </div>
              <div>
                <h3>Useful Link</h3>
                <ul>
                  
                  <li><a href="">How it works</a></li>
                  <li><a href="">Terms of Service</a></li>
                  <li><a href="">Privacy policy</a></li>
                </ul>
              </div>
              <div>
                <h3>Contact Info</h3>
                <ul>
                  <li>Contact Info</li>
                  <li>support@evangadi.com</li>
                  <li>+1-202-386-2702</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.copy_write}></div>
      </div>
    </>
  );
}

export default Footer;
