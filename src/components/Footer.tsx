const Footer: React.FC = () => {
  return (
    <footer className="bg-light p-2 text-dark bg-opacity-60 text-dark py-4 mt-4">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 mb-3">
            <h5>About</h5>
            <p>
              Tasty Tales: Where Flavor Meets Storytelling" Every great meal has a story, and every story deserves to be
              shared.{' '}
            </p>
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
                <a href="/about" className="text-dark">
                  About Us
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-dark">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-dark">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-3">
          <small>&copy; 2024 Tasty Tales. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
