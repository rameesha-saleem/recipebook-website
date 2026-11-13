import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

import { RecipeProvider } from "./context/RecipeContext";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RecipeProvider>
          <div className="app">
            <Navbar />

            <main className="main-content">
              <AppRoutes />
            </main>

            <Footer />
          </div>
        </RecipeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;