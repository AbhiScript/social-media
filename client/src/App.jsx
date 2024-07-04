/* eslint-disable react/prop-types */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import ProfilePage from "./components/ProfilePage";
import Footer from "./components/Footer";
import AdminForm from "./components/AdminForm";
import styles from "./styles/App.module.css";
import { AppProvider, Home, ConditionalHeader } from "./store/AppContext";
import { PostProvider } from "./store/PostContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <AppProvider>
      <PostProvider>
        <div className={styles.appContainer}>
          <Router>
            <ConditionalHeader />
            <div className={styles.contentWrapper}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<AdminForm />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/profilePage" element={<ProfilePage />} />
              </Routes>
            </div>
          </Router>
          <Footer />
        </div>
      </PostProvider>
    </AppProvider>
  );
}

export default App;
