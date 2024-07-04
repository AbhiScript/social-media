import styles from "../styles/Footer.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3"></ul>
        <p className="text-center text-body-secondary">© 2024 Company, Inc</p>
      </footer>
    </div>
  );
}

export default Footer;
