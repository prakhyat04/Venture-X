import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  GAMES,
  TOURNAMENTS,
  LIVE_STREAMS,
  CASTERS,
  COMMUNITIES,
  PLAYERS,
  VIDEOS,
  INITIAL_USER
} from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageParams, setPageParams] = useState({});
  const [user, setUser] = useState(INITIAL_USER);
  const [tournamentsList, setTournamentsList] = useState(TOURNAMENTS);
  const [communitiesList, setCommunitiesList] = useState(COMMUNITIES);
  const [castersList, setCastersList] = useState(CASTERS);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLanguage, setActiveLanguage] = useState('English');
  const [activeTheme, setActiveTheme] = useState('Dark Competitive');
  const [toasts, setToasts] = useState([]);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Grand Finals Live Alert',
      message: 'VALORANT Venture Crown Series Grand Finals are starting now on VentureX TV 1!',
      time: '5m ago',
      read: false,
      type: 'live'
    },
    {
      id: 2,
      title: 'Tournament Registration Confirmed',
      message: 'Your squad is officially registered for BGMI Elite Masters Invitational.',
      time: '2h ago',
      read: false,
      type: 'tournament'
    },
    {
      id: 3,
      title: 'Community Announcement',
      message: 'VALORANT Vanguard Hub posted a new Radiant scrims schedule.',
      time: '1d ago',
      read: true,
      type: 'community'
    }
  ]);

  // Global Keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Navigation Helper
  const navigateTo = (page, params = {}) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
    setPageParams(params);
  };

  // Toast Notification Helper
  const triggerToast = (title, message = '', type = 'gold') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Register for a tournament
  const registerForTournament = (tournamentId) => {
    if (user.registeredTournaments.includes(tournamentId)) {
      triggerToast('Already Registered', 'You are already registered for this tournament.', 'info');
      return false;
    }

    // Update user state
    setUser((prev) => ({
      ...prev,
      registeredTournaments: [...prev.registeredTournaments, tournamentId],
      stats: {
        ...prev.stats,
        tournamentsJoined: prev.stats.tournamentsJoined + 1
      }
    }));

    // Increment tournament registered slots
    setTournamentsList((prev) =>
      prev.map((t) =>
        t.id === tournamentId
          ? { ...t, registeredSlots: Math.min(t.totalSlots, t.registeredSlots + 1) }
          : t
      )
    );

    triggerToast('Registration Successful! 🏆', 'Welcome to the bracket! Your squad slot has been confirmed.', 'gold');
    return true;
  };

  // Toggle follow community
  const toggleFollowCommunity = (communityId) => {
    setUser((prev) => {
      const isSaved = prev.savedCommunities.includes(communityId);
      const updated = isSaved
        ? prev.savedCommunities.filter((id) => id !== communityId)
        : [...prev.savedCommunities, communityId];

      triggerToast(
        isSaved ? 'Unfollowed Community' : 'Joined Community! ⚡',
        isSaved ? 'You will no longer receive match alerts.' : 'You are now an active member of this game community.',
        'gold'
      );

      return { ...prev, savedCommunities: updated };
    });
  };

  // Toggle follow caster
  const toggleFollowCaster = (casterId) => {
    setUser((prev) => {
      const isFollowing = prev.followedCasters.includes(casterId);
      const updated = isFollowing
        ? prev.followedCasters.filter((id) => id !== casterId)
        : [...prev.followedCasters, casterId];

      triggerToast(
        isFollowing ? 'Unfollowed Caster' : 'Followed Caster! 🎙️',
        isFollowing ? 'Caster removed from favorites.' : 'You will be notified whenever this caster goes live!',
        'gold'
      );

      return { ...prev, followedCasters: updated };
    });
  };

  // Mark all notifications as read
  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    triggerToast('Notifications', 'All notifications marked as read.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        pageParams,
        navigateTo,
        user,
        setUser,
        games: GAMES,
        tournaments: tournamentsList,
        liveStreams: LIVE_STREAMS,
        casters: castersList,
        communities: communitiesList,
        players: PLAYERS,
        videos: VIDEOS,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        notifications,
        markAllNotificationsRead,
        toasts,
        triggerToast,
        registerForTournament,
        toggleFollowCommunity,
        toggleFollowCaster,
        activeLanguage,
        setActiveLanguage,
        activeTheme,
        setActiveTheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
