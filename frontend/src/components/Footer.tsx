const Footer = () => {
  return (
    <footer className="flex h-12 items-center justify-between bg-black responsive-container text-white">
      <div className="text-sm">
        © {new Date().getFullYear()} Dawry. All rights reserved.
      </div>
      {/* <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="/terms" className="hover:underline">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="/privacy" className="hover:underline">
              Privacy Policy
            </a>
          </li>
        </ul>
      </nav>  */}
    </footer>
  );
};

export default Footer;
