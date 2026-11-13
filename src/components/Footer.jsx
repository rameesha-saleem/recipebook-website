import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-decoration footer-decoration-left">
        ✦
      </div>

      <div className="footer-content">

        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span>🍳</span>
            <strong>TastyBites</strong>
          </div>

          <p>
            Good Food <span>•</span> Happy Life
          </p>

          <small>
            Discover recipes, cook with love and share your
            favorite meals.
          </small>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h4>Quick Links</h4>

          <Link to="/">Home</Link>
          <Link to="/recipes">Recipes</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/my-recipes">My Recipes</Link>
        </div>

        {/* Support */}
        <div className="footer-column">
          <h4>Support</h4>

          <Link to="/profile">About Us</Link>
          <Link to="/search">Contact</Link>

          <a href="#">
            Privacy Policy
          </a>

          <a href="#">
            Terms & Conditions
          </a>
        </div>

        {/* Social */}
        <div className="footer-column footer-social">
          <h4>Follow Us</h4>

          <div className="social-icons">

            {/* Facebook */}
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <svg
                viewBox="0 0 24 24"
                width="17"
                height="17"
                fill="currentColor"
              >
                <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.67.33-1 1-1z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <svg
                viewBox="0 0 24 24"
                width="17"
                height="17"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                />

                <circle
                  cx="12"
                  cy="12"
                  r="4"
                />

                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
              >
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.5v-7l6.1 3.5-6.1 3.5Z" />
              </svg>
            </a>

          </div>

          <div className="footer-message">
            Cook <span>•</span> Share <span>•</span> Enjoy
            <Heart size={14} />
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>
          © 2026 TastyBites. All rights reserved.
        </p>
      </div>

      <div className="footer-decoration footer-decoration-right">
        ✦
      </div>
    </footer>
  );
};

export default Footer;
