import "./footer.css"
import {
  FaGithub,
  FaTwitter,
  FaFacebook,
  FaGlobe,
  FaLinkedin,
} from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h4>LinkedIn Post Generator</h4>
          <p>
            A simple AI-powered tool to help you create engaging LinkedIn posts
            faster and better.
          </p>
        </div>

        <div className="footer-col">
          <h4>About</h4>
          <ul>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a
                href="https://github.com/HoangBuiVietDuc28102006/linkedin-post-generator"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repo
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p>Email: contact@example.com</p>
          <p>Based in Vietnam</p>
        </div>

        <div className="footer-col">
          <h4>Follow Us</h4>
          <div className="socials">
            <a
              href="https://your-website.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Website"
            >
              <FaGlobe />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>

            <a
              href="https://github.com/HoangBuiVietDuc28102006"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 LinkedIn Post Generator. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
