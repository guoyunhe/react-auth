// In real-world project, you should use BrowserRouter instead.
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

export default function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="login">
          <Login />
        </Route>
        <Route path="register">
          <Register />
        </Route>
        <Route path="dashboard">
          <Login />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}
