import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Articles from './components/Articles';
import EditSettings from './components/EditSettings';
import EditPreferences from './components/EditPreferences';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <LandingPage />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/profile/edit-settings" element={
              <ProtectedRoute>
                <EditSettings />
              </ProtectedRoute>
            } />
            <Route path="/profile/edit-preferences" element={
              <ProtectedRoute>
                <EditPreferences />
              </ProtectedRoute>
            } />
            <Route path="/articles" element={
              <ProtectedRoute>
                <Articles />
              </ProtectedRoute>
            } />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;