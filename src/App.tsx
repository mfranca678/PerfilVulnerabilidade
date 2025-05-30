import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import QuestionnairePage from "./pages/QuestionnairePage";
import ResultPage from "./pages/ResultPageGolpes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/questionario" element={<ProtectedRoute>
                                                  <QuestionnairePage />
                                              </ProtectedRoute>
                                            } />
        <Route path="/resultado" element={<ResultPage />} />                                            
      </Routes>
    </BrowserRouter>
  );
}

export default App;
