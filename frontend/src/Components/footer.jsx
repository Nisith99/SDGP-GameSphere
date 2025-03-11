import React from "react";
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
  GithubIcon,
  ArrowRightIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
} from "lucide-react";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="max-width-container">

        {/* Top section with logo  */}
        <div className="top-section">
          <div className="grid-container">
            {/* Company info */}
            <div className="company-info">
            <div className="logo-container">
                <img
                 src="/gameSphere_logo.png" // Path relative to the public folder
                 alt="Company Logo"
                 className="logo"
                />
                <span className="company-name">GAMESPHERE</span>
                </div>
              
              <div className="social-links">
                <a href="#" className="social-link">
                  <FacebookIcon size={20} />
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="#" className="social-link">
                  <TwitterIcon size={20} />
                  <span className="sr-only">Twitter</span>
                </a>
                <a href="#" className="social-link">
                  <InstagramIcon size={20} />
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="#" className="social-link">
                  <LinkedinIcon size={20} />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a href="#" className="social-link">
                  <GithubIcon size={20} />
                  <span className="sr-only">GitHub</span>
                </a>
              </div>
            </div>



            <div className="quick-links">
              <h3 className="link-title">Resources</h3>
              <ul className="link-list">
                <li className="link-item">
                  <a href="#" className="link">
                    Team
                  </a>
                </li>
                <li className="link-item">
                  <a href="#" className="link">
                    Help Center
                  </a>
                </li>
               
                
              </ul>
            </div>

            <div className="quick-links">
              <h3 className="link-title">Legal</h3>
              <ul className="link-list">
                <li className="link-item">
                  <a href="#" className="link">
                    Privacy
                  </a>
                </li>
                <li className="link-item">
                  <a href="#" className="link">
                    Terms
                  </a>
                </li>
                <li className="link-item">
                  <a href="#" className="link">
                    Cookie Policy
                  </a>
                </li>
                <li className="link-item">
                  <a href="#" className="link">
                    About
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact info */}
            <div className="contact-info">
              <h3 className="link-title">Contact</h3>
              <ul className="link-list">
                <li className="contact-item">
                  <MapPinIcon size={18} className="icon" />
                  <span>No:1,Bambalapitiya,Sri lanka,80001</span>
                </li>
                <li className="contact-item">
                  <PhoneIcon size={18} className="icon" />
                  <a href="tel:+15551234567" className="link">
                    +94 (111) 123-4567
                  </a>
                </li>
                <li className="contact-item">
                  <MailIcon size={18} className="icon" />
                  <a href="mailto:info@acme.com" className="link">
                    info@gamesphere.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        
        {/* Bottom section with copyright */}
        <div className="bottom-section">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} Gamesphere. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};