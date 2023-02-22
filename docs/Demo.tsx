import {
  AuthProvider,
  RedirectAfterAuth,
  RequireAuth,
  useAuth,
  useLogin,
  useLogout,
} from '@guoyunhe/react-auth';
import { useState } from 'react';
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom';

export default function Demo() {
  return (
    <MemoryRouter>
      <AuthProvider>
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
      </AuthProvider>
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useLogin({ email, password });

  return (
    <div>
      <RedirectAfterAuth />
      <p>Login</p>
      <p>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </p>
      <p>
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
      </p>
      <button onClick={login.submit} disabled={login.loading}>
        Login
      </button>
    </div>
  );
}

function Dashboard() {
  const auth = useAuth<{ id: number; name: string }>();
  const logout = useLogout();
  return (
    <div>
      <p>Dashboard</p>
      <p>Welcome, {auth.user!.name}</p>
      <button onClick={logout.submit} disabled={logout.loading}>
        Logout
      </button>
    </div>
  );
}
