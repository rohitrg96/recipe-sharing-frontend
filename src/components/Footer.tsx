const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-4">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 mb-3">
            <h5>About</h5>
            <p>Some information about the website or company.</p>
          </div>
          <div className="col-12 col-md-4 mb-3">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: example@example.com</li>
              <li>Phone: +123 456 7890</li>
            </ul>
          </div>
          <div className="col-12 col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/about" className="text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-3">
          <small>&copy; 2024 Your Company. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
