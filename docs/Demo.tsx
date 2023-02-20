import { Link, MemoryRouter, Route, Routes } from 'react-router-dom';
import { RequireAuth } from '../src/RequireAuth';

export default function Demo() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          path="dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="/" element={<Home />} />
      </Routes>
    </MemoryRouter>
  );
}

function Home() {
  return (
    <div>
      <div>Home</div>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
}

function Login() {
  return <div>Login</div>;
}

function Dashboard() {
  return <div>Login</div>;
}
