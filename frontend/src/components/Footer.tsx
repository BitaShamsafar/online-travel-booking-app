const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-column">
                    <h3 className="footer-title">Online Booking Webapp</h3>
                    <p className="footer-text">
                        Building modern web experiences with clean design and performance in mind.
                    </p>
                </div>


                <div className="footer-column">
                    <h4 className="footer-title">Quick Links</h4>
                    <ul className="footer-links">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Blog</a></li>
                    </ul>
                </div>


                <div className="footer-column">
                    <h4 className="footer-title">Support</h4>
                    <ul className="footer-links">
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">FAQs</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms & Conditions</a></li>
                    </ul>
                </div>


                <div className="footer-column">
                    <h4 className="footer-title">Contact</h4>
                    <ul className="footer-links">
                        <li>Email: info@yourbrand.com</li>
                        <li>Phone: +49 15257664562</li>
                        <li className="social-links">
                            <a href="#">Facebook</a>
                            <a href="#">Twitter</a>
                            <a href="#">LinkedIn</a>
                        </li>
                    </ul>
                </div>

            </div>

            <div className="footer-bottom">
                <p>© 2026 BitaShamsafar. All rights reserved.</p>
            </div>
        </footer>
    )
}
export default Footer