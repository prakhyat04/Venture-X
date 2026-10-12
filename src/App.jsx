import React from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Toast from './components/common/Toast';
import SearchModal from './components/search/SearchModal';
import ParticleCanvas from './components/common/ParticleCanvas';

// Pages
import HomePage from './pages/HomePage';
import LivePage from './pages/LivePage';
import TournamentsPage from './pages/TournamentsPage';
import TournamentDetailsPage from './pages/TournamentDetailsPage';
import GamesPage from './pages/GamesPage';
import GameDetailsPage from './pages/GameDetailsPage';
import CommunitiesPage from './pages/CommunitiesPage';
import CommunityDetailsPage from './pages/CommunityDetailsPage';
import PlayersPage from './pages/PlayersPage';
import PlayerProfilePage from './pages/PlayerProfilePage';
import CastersPage from './pages/CastersPage';
import CasterProfilePage from './pages/CasterProfilePage';
import VideosPage from './pages/VideosPage';
import VideoDetailsPage from './pages/VideoDetailsPage';
import SearchPage from './pages/SearchPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import SettingsPage from './pages/SettingsPage';
import StreamSetupPage from './pages/StreamSetupPage';

export default function App() {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'live':
        return <LivePage />;
      case 'tournaments':
        return <TournamentsPage />;
      case 'tournament-details':
        return <TournamentDetailsPage />;
      case 'games':
        return <GamesPage />;
      case 'game-details':
        return <GameDetailsPage />;
      case 'communities':
        return <CommunitiesPage />;
      case 'community-details':
        return <CommunityDetailsPage />;
      case 'players':
        return <PlayersPage />;
      case 'player-profile':
        return <PlayerProfilePage />;
      case 'casters':
        return <CastersPage />;
      case 'caster-profile':
        return <CasterProfilePage />;
      case 'videos':
        return <VideosPage />;
      case 'video-details':
        return <VideoDetailsPage />;
      case 'search':
        return <SearchPage />;
      case 'register':
        return <RegisterPage />;
      case 'login':
        return <LoginPage />;
      case 'my-profile':
        return <UserProfilePage />;
      case 'settings':
        return <SettingsPage />;
      case 'create-stream':
        return <StreamSetupPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Subtle Ambient Background Particle Canvas */}
      <ParticleCanvas />

      {/* Sticky Header Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        {renderPage()}
      </main>

      {/* Global Interactive Elements */}
      <SearchModal />
      <Toast />

      {/* Platform Footer */}
      <Footer />
    </div>
  );
}
