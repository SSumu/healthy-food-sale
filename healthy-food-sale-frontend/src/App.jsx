import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/common/Navbar.jsx";
import AppRoutes from "./routes.jsx";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <AppRoutes />
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
