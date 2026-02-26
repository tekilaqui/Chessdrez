import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import PlayPage from './pages/PlayPage';
import DashboardPage from './pages/DashboardPage';
import PuzzlePage from './pages/PuzzlePage';
import AnalysisPage from './pages/AnalysisPage';
import OpeningsPage from './pages/OpeningsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import LearnPage from './pages/LearnPage';

import { SettingsProvider } from './context/SettingsContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>Cargando...</div>;
    if (!user) return <Navigate to="/login" />;
    return <>{children}</>;
};

import Layout from './components/Layout';

const App: React.FC = () => {
    return (
        <Router>
            <AuthProvider>
                <SettingsProvider>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/" element={<ProtectedRoute><Layout><HomePage /></Layout></ProtectedRoute>} />
                        <Route path="/play" element={<ProtectedRoute><Layout><PlayPage /></Layout></ProtectedRoute>} />
                        <Route path="/dashboard" element={<ProtectedRoute><Layout><DashboardPage /></Layout></ProtectedRoute>} />
                        <Route path="/puzzles" element={<ProtectedRoute><Layout><PuzzlePage /></Layout></ProtectedRoute>} />
                        <Route path="/analysis" element={<ProtectedRoute><Layout><AnalysisPage /></Layout></ProtectedRoute>} />
                        <Route path="/openings" element={<ProtectedRoute><Layout><OpeningsPage /></Layout></ProtectedRoute>} />
                        <Route path="/profile" element={<ProtectedRoute><Layout><ProfilePage /></Layout></ProtectedRoute>} />
                        <Route path="/settings" element={<ProtectedRoute><Layout><SettingsPage /></Layout></ProtectedRoute>} />
                        <Route path="/learn" element={<ProtectedRoute><Layout><LearnPage /></Layout></ProtectedRoute>} />
                    </Routes>
                </SettingsProvider>
            </AuthProvider>
        </Router>
    );
};

export default App;
