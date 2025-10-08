import styles from "./footer.module.css";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoSection}>
        <img
          src="https://evanforum.com/assets/logo-D98Zk6nH.png"
          alt="Evangadi Logo"
          className={styles.logoImg}
        />

        <div className={styles.socials}>
          <a
            href="https://web.facebook.com/evangaditech?_rdc=1&_rdr#"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.icon}
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.instagram.com/evangaditech/#"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.icon}
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.youtube.com/@EvangadiTech"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.icon}
          >
            <FaYoutube />
          </a>
        </div>
      </div>
      <div className={styles.linksSection}>
        <h4>Useful Link</h4>
        <ul>
          <li>
            <a href="/how-it-works">How it works</a>
          </li>
          <li>
            <a href="/terms-of-service">Terms of Service</a>
          </li>
          <li>
            <a href="/privacy-policy">Privacy policy</a>
          </li>
        </ul>
      </div>
      <div className={styles.contactSection}>
        <h4>Contact Info</h4>
        <p>Evangadi Networks</p>
        <p>support@evangadi.com</p>
        <p>+1-202-386-2702</p>
      </div>
    </footer>
  );
};

export default Footer;
