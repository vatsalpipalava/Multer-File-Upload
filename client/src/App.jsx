import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EnterDetails from "./pages/EnterDetails";
import Users from "./pages/Users";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<EnterDetails />} />
                <Route path="/users" element={<Users />} />
            </Routes>
        </Router>
    );
}

export default App;
