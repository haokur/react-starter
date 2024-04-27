import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './pages/login/login';

function App() {
  return (
    <Router>
      <div>
        <Link to="/login">跳转登录</Link>
      </div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App
