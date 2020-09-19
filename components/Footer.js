import Link from "next/link";

const Footer = () => {
  return (
    <footer id="footer" className="wrapper">
      <div className="inner">
        <div id="footer-copyright">
          © 2020
          <Link href="/" className="main-nav-link">
            <a>mississippi-studio</a>
          </Link>
        </div>
      </div>
      <style jsx>{`
        #footer {
          padding: 40px 0;
          color: rgba(255, 255, 255, 0.6);
          font-family: Lato, "Helvetica Neue", Helvetica, Arial, sans-serif;
          position: relative;
          background: #171f26;
          text-align: left;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
