import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './pages/login/login';
import UserList from './pages/user-list/user-list';
import UserDetail from './pages/user-detail/user-detail'

function App() {
  return (
    <Router>
      <div>
        <Link to="/login">跳转登录2</Link>
      </div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/user-detail/:id" element={<UserDetail />} />
      </Routes>
    </Router>
  )
}

export default App
