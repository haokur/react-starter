
// import { BrowserRouter as Router } from 'react-router-dom';
import { HashRouter as Router } from 'react-router-dom';

import AppRoutes from "./routes/routes"

export default () => {
  return <div>
    <Router>
      <AppRoutes></AppRoutes>
    </Router>
  </div>
}