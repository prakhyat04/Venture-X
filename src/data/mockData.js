/**
 * VentureX - Realistic eSports Ecosystem Mock Database
 * Contains rich datasets for Games, Tournaments, Live Streams, Casters,
 * Communities, Players, Brackets, Videos, and User Preferences.
 */

export const GAMES = [
  {
    id: 'valorant',
    name: 'VALORANT',
    category: 'Tactical FPS',
    developer: 'Riot Games',
    activeTournaments: 6,
    liveStreams: 14,
    activePlayers: '1.2M Online',
    communityCount: '48.5K Members',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    icon: '🎯',
    description: 'A 5v5 character-based tactical shooter where precise gunplay meets unique agent abilities in high-stakes competitive play.',
    platforms: ['PC'],
    prizeDistributed: '$350,000+'
  },
  {
    id: 'cs2',
    name: 'COUNTER-STRIKE 2',
    category: 'Competitive FPS',
    developer: 'Valve',
    activeTournaments: 4,
    liveStreams: 18,
    activePlayers: '950K Online',
    communityCount: '62.1K Members',
    banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    icon: '💣',
    description: 'The premier pinnacle of competitive first-person tactical shooting with legendary map control and economy mastery.',
    platforms: ['PC'],
    prizeDistributed: '$500,000+'
  },
  {
    id: 'bgmi',
    name: 'BGMI / PUBG MOBILE',
    category: 'Battle Royale',
    developer: 'Krafton',
    activeTournaments: 8,
    liveStreams: 24,
    activePlayers: '2.4M Online',
    communityCount: '94.2K Members',
    banner: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80',
    icon: '🪂',
    description: 'Intense 100-player battle royale action designed for mobile esports gladiators competing for chicken dinners.',
    platforms: ['Mobile', 'Tablet'],
    prizeDistributed: '$280,000+'
  },
  {
    id: 'apex-legends',
    name: 'APEX LEGENDS',
    category: 'Hero Battle Royale',
    developer: 'Respawn Entertainment',
    activeTournaments: 3,
    liveStreams: 9,
    activePlayers: '480K Online',
    communityCount: '31.4K Members',
    banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    icon: '⚡',
    description: 'Fast-paced squad battle royale where legendary characters with powerful abilities fight for fame and glory across the Outlands.',
    platforms: ['PC', 'PlayStation', 'Xbox'],
    prizeDistributed: '$180,000+'
  },
  {
    id: 'free-fire',
    name: 'FREE FIRE MAX',
    category: 'Mobile Battle Royale',
    developer: 'Garena',
    activeTournaments: 5,
    liveStreams: 16,
    activePlayers: '3.1M Online',
    communityCount: '110K Members',
    banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    icon: '🔥',
    description: 'Ultimate survival shooter game on mobile with rapid 10-minute battle royale matches and character loadouts.',
    platforms: ['Mobile'],
    prizeDistributed: '$220,000+'
  },
  {
    id: 'call-of-duty',
    name: 'CALL OF DUTY: WARZONE',
    category: 'Tactical Shooter',
    developer: 'Activision',
    activeTournaments: 4,
    liveStreams: 11,
    activePlayers: '620K Online',
    communityCount: '45.0K Members',
    banner: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=1200&q=80',
    icon: '🎖️',
    description: 'Massive combat battle royale featuring signature Call of Duty gunplay, gulag respawns, and squad skirmishes.',
    platforms: ['PC', 'PlayStation', 'Xbox'],
    prizeDistributed: '$240,000+'
  },
  {
    id: 'rocket-league',
    name: 'ROCKET LEAGUE',
    category: 'Vehicular Soccer',
    developer: 'Psyonix',
    activeTournaments: 2,
    liveStreams: 7,
    activePlayers: '340K Online',
    communityCount: '22.8K Members',
    banner: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80',
    icon: '🚀',
    description: 'High-powered hybrid of arcade soccer and vehicular mayhem with easy-to-understand physics and aerial mechanics.',
    platforms: ['PC', 'PlayStation', 'Xbox', 'Switch'],
    prizeDistributed: '$150,000+'
  },
  {
    id: 'dota-2',
    name: 'DOTA 2',
    category: 'MOBA',
    developer: 'Valve',
    activeTournaments: 3,
    liveStreams: 12,
    activePlayers: '710K Online',
    communityCount: '58.9K Members',
    banner: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1200&q=80',
    icon: '⚔️',
    description: 'Deep strategic 5v5 MOBA with over 120 heroes, intricate item builds, and massive world championships.',
    platforms: ['PC'],
    prizeDistributed: '$750,000+'
  }
];

export const TOURNAMENTS = [
  {
    id: 'val-champions-cup-2026',
    title: 'VALORANT Venture Crown Series Season 4',
    game: 'VALORANT',
    gameId: 'valorant',
    organizer: 'Valkyrie Global eSports',
    status: 'REGISTRATION OPEN', // 'REGISTRATION OPEN' | 'STARTING SOON' | 'ONGOING' | 'COMPLETED'
    statusType: 'open',
    prizePool: '$45,000 USD',
    prizeDistribution: [
      { place: '1st Place (Champions)', prize: '$24,000 + Gold Trophy + Pro Seed' },
      { place: '2nd Place (Finalist)', prize: '$12,000 + Silver Plaque' },
      { place: '3rd - 4th Place', prize: '$4,500 each' }
    ],
    format: '5v5 Single Elimination • Best of 3 (Finals Bo5)',
    totalSlots: 64,
    registeredSlots: 48,
    startDate: 'Sept 28, 2026',
    startTime: '18:00 UTC',
    region: 'North America / EMEA',
    entryFee: 'Free Entry',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    caster: 'ApexCaster & NovaStream',
    featured: true,
    overview: 'The official Valkyrie Crown Series brings together 64 of the finest tactical squads in a 4-day bracket knockout tournament. Teams will battle across Haven, Ascent, Lotus, and Sunset for international prestige.',
    rules: [
      'Standard VCT Tournament Competitive Mode rules enabled.',
      'Anti-Cheat: Vanguard must remain active at all times. Failure to run results in instant DQ.',
      'Roster Lock: Rosters cannot be altered 2 hours prior to bracket start.',
      'Substitutions: 1 registered sub allowed per squad.',
      'Disconnections: Up to 10 minutes tactical pause allowed per map.'
    ],
    castersList: [
      { name: 'ApexCaster', handle: '@ApexCaster', role: 'Play-by-Play' },
      { name: 'NovaStrike', handle: '@NovaCast', role: 'Color Analyst' }
    ]
  },
  {
    id: 'bgmi-invitational-masters',
    title: 'BGMI Elite Masters Invitational — Pro Division',
    game: 'BGMI / PUBG MOBILE',
    gameId: 'bgmi',
    organizer: 'Krafton Community VentureX',
    status: 'ONGOING',
    statusType: 'live',
    prizePool: '₹25,00,000 INR (~$30,000)',
    prizeDistribution: [
      { place: '1st Place', prize: '₹12,00,000 + MVP Award' },
      { place: '2nd Place', prize: '₹6,00,000' },
      { place: '3rd Place', prize: '₹3,50,000' }
    ],
    format: 'Squads (4 Players) • 18 Matches across Erangel, Miramar & Sanhok',
    totalSlots: 24,
    registeredSlots: 24,
    startDate: 'LIVE NOW',
    startTime: 'Match 4 of 6 Today',
    region: 'South Asia',
    entryFee: 'Invited & Qualifier Tier 1',
    banner: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80',
    caster: 'CastKing & Mamba_Gaming',
    featured: true,
    overview: 'The highest tier battle royale competition featuring the top 24 professional BGMI squads. Live broadcast with dedicated caster desk, real-time kill feed, and zone damage analytics.',
    rules: [
      'Official Esports Point System: 1st=15pts, 2nd=12pts, 3rd=10pts, Kill=1pt.',
      'All players must use registered mobile devices with screen stream recording enabled.',
      'Zero tolerance for emulator or unauthorized peripheral hardware.'
    ],
    castersList: [
      { name: 'CastKing', handle: '@CastKingLive', role: 'Lead Caster' },
      { name: 'ViperDesk', handle: '@ViperAnalyst', role: 'Tactical Desk' }
    ]
  },
  {
    id: 'cs2-VentureX-major-clash',
    title: 'CS2 VentureX Major Showdown — Dust II & Inferno',
    game: 'COUNTER-STRIKE 2',
    gameId: 'cs2',
    organizer: 'CS2 VentureX League',
    status: 'STARTING SOON',
    statusType: 'soon',
    prizePool: '$30,000 USD',
    prizeDistribution: [
      { place: '1st Place', prize: '$18,000' },
      { place: '2nd Place', prize: '$8,000' },
      { place: '3rd Place', prize: '$4,000' }
    ],
    format: '5v5 Double Elimination • MR12 Overtime Enabled',
    totalSlots: 32,
    registeredSlots: 30,
    startDate: 'Sept 22, 2026',
    startTime: '16:00 UTC',
    region: 'Europe / CIS',
    entryFee: 'Free Entry',
    banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    caster: 'RangerCS & PhoenixDesk',
    featured: true,
    overview: 'CS2 teams clash across legendary maps in a brutal double-elimination bracket. Overtime enabled with 10,000 starting cash.',
    rules: [
      'MR12 Standard competitive settings.',
      'Map veto conducted in-engine 15 minutes before match start.',
      'Default knife round for side choice.'
    ],
    castersList: [
      { name: 'RangerCS', handle: '@RangerCS', role: 'Play-by-Play' }
    ]
  },
  {
    id: 'apex-outlands-brawl',
    title: 'Apex Legends: Global Predator Clash',
    game: 'APEX LEGENDS',
    gameId: 'apex-legends',
    organizer: 'Apex Syndicate',
    status: 'REGISTRATION OPEN',
    statusType: 'open',
    prizePool: '$15,000 USD',
    prizeDistribution: [
      { place: '1st Place', prize: '$8,000' },
      { place: '2nd Place', prize: '$4,500' },
      { place: '3rd Place', prize: '$2,500' }
    ],
    format: 'Trios • Match Point Threshold: 50 pts',
    totalSlots: 20,
    registeredSlots: 14,
    startDate: 'Oct 02, 2026',
    startTime: '20:00 UTC',
    region: 'Americas',
    entryFee: 'Free Entry',
    banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    caster: 'ValkyrieCaster',
    featured: false,
    overview: 'High velocity trios battle using the famous Match Point format. Once a squad crosses 50 points, their next champion win crowns them tournament winners.',
    rules: [
      'ALGS Match Point System.',
      'Custom lobby with official EA broadcast code.'
    ],
    castersList: [
      { name: 'ValkyrieCaster', handle: '@ValkCaster', role: 'Shoutcaster' }
    ]
  },
  {
    id: 'ff-clash-of-titans',
    title: 'Free Fire MAX: Clash of Titans Summer Cup',
    game: 'FREE FIRE MAX',
    gameId: 'free-fire',
    organizer: 'Garena Community Guild',
    status: 'COMPLETED',
    statusType: 'completed',
    prizePool: '$20,000 USD',
    prizeDistribution: [
      { place: '1st Place: TEAM SOULX', prize: '$12,000' },
      { place: '2nd Place: CYBER RAIDERS', prize: '$5,000' },
      { place: '3rd Place: BLACK DRAGONS', prize: '$3,000' }
    ],
    format: 'Squads (4 Players) • 12 Matches',
    totalSlots: 18,
    registeredSlots: 18,
    startDate: 'Sept 10, 2026',
    startTime: 'Completed',
    region: 'Global',
    entryFee: 'Open Qualifiers',
    banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    caster: 'FireKing & ShadowPlay',
    featured: false,
    overview: 'A historic showdown of 18 squads concluded with TEAM SOULX emerging victorious in a nail-biting final circle in Bermuda.',
    rules: [
      'Standard Free Fire esports tournament point matrix.'
    ],
    castersList: [
      { name: 'FireKing', handle: '@FireKingFF', role: 'Lead Caster' }
    ]
  },
  {
    id: 'cod-warzone-night-ops',
    title: 'Warzone 2.0: Night Ops Kill Race Championship',
    game: 'CALL OF DUTY: WARZONE',
    gameId: 'call-of-duty',
    organizer: 'Shadow Company League',
    status: 'STARTING SOON',
    statusType: 'soon',
    prizePool: '$25,000 USD',
    prizeDistribution: [
      { place: '1st Place', prize: '$14,000' },
      { place: '2nd Place', prize: '$7,000' },
      { place: '3rd Place', prize: '$4,000' }
    ],
    format: 'Duos • 3-Hour Kill Race + Multiplier',
    totalSlots: 50,
    registeredSlots: 46,
    startDate: 'Sept 25, 2026',
    startTime: '21:00 UTC',
    region: 'Global Crossplay',
    entryFee: 'Free Entry',
    banner: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=1200&q=80',
    caster: 'WarzoneCast & Phantom',
    featured: false,
    overview: 'High octane Kill Race where duos drop into Urzikstan to rack up squad eliminations within a tight 3-hour window.',
    rules: [
      'Kill = 1 pt. Victory Royale = 10 pts bonus.',
      'Best 4 game scores counted.'
    ],
    castersList: [
      { name: 'WarzoneCast', handle: '@WarzoneCast', role: 'Commentator' }
    ]
  }
];

export const LIVE_STREAMS = [
  {
    id: 'stream-val-grand-finals',
    title: 'GRAND FINALS: Sentinel X vs Fnatic Vanguard | Map 3 Decider [HAVEN]',
    streamer: 'VentureX Esports TV 1',
    streamerAvatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200&q=80',
    game: 'VALORANT',
    gameId: 'valorant',
    viewers: '48,920',
    tournamentName: 'VALORANT Venture Crown Series',
    isOfficial: true,
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80',
    tags: ['Grand Finals', '1080p60', 'Drops Enabled', 'VCT Rules'],
    casters: 'ApexCaster & NovaStrike',
    chatLog: [
      { id: 1, user: 'PhantomSniper', time: '18:42', text: 'THAT 1v3 CLUTCH WAS INSANE OMG!! 🔥' },
      { id: 2, user: 'ViperQueen', time: '18:42', text: 'Sentinel X economy is completely broken now.' },
      { id: 3, user: 'AetherKnight', time: '18:43', text: 'Gold tournament trophy goes to Fnatic for sure 🏆' },
      { id: 4, user: 'FragGod_99', time: '18:43', text: 'OP shot through smoke was pure game sense!' },
      { id: 5, user: 'CyberWolf', time: '18:44', text: 'LETS GO SENTINEL! ONE MORE ROUND!!' }
    ]
  },
  {
    id: 'stream-bgmi-masters-live',
    title: 'MATCH 4 [ERANGEL] — BGMI Elite Masters Pro Division Day 2',
    streamer: 'Krafton India Esports',
    streamerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    game: 'BGMI / PUBG MOBILE',
    gameId: 'bgmi',
    viewers: '92,400',
    tournamentName: 'BGMI Elite Masters Invitational',
    isOfficial: true,
    thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=900&q=80',
    tags: ['Erangel Zone 6', '4v4 Final Circle', 'Hindi / Eng Cast'],
    casters: 'CastKing & ViperDesk',
    chatLog: [
      { id: 1, user: 'GodL_Fan', time: '19:10', text: 'Zone shift to Military base bridge!!' },
      { id: 2, user: 'SoulMortalFan', time: '19:10', text: 'M416 spray transfer was unbelievable!!' },
      { id: 3, user: 'EsportsWatcher', time: '19:11', text: 'Who has better position? Team Soul or GodL?' }
    ]
  },
  {
    id: 'stream-cs2-pro-scrims',
    title: 'CS2 Tier 1 Pro Scrims & Mirage Strat Practice | Faceit Level 10 3500+ ELO',
    streamer: 'RangerCS Official',
    streamerAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    game: 'COUNTER-STRIKE 2',
    gameId: 'cs2',
    viewers: '12,650',
    tournamentName: 'CS2 VentureX League Scrims',
    isOfficial: false,
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80',
    tags: ['Pro POV', 'Analysis', 'High ELO', 'Caster POV'],
    casters: 'RangerCS',
    chatLog: [
      { id: 1, user: 'AimMaster', time: '19:15', text: 'That AWP flick was pixel perfect' },
      { id: 2, user: 'SmokeNade', time: '19:16', text: 'Can you show the mid window smoke lineup again?' }
    ]
  },
  {
    id: 'stream-apex-predator-grind',
    title: 'TOP 5 PREDATOR LOBBIES — Ranked Season 22 with Voice Comms',
    streamer: 'Valkyrie_Queen',
    streamerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    game: 'APEX LEGENDS',
    gameId: 'apex-legends',
    viewers: '8,420',
    tournamentName: 'Outlands Syndicate Scrims',
    isOfficial: false,
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80',
    tags: ['Predator', 'Horizon Main', 'Pro Comms'],
    casters: 'ValkyrieCaster',
    chatLog: [
      { id: 1, user: 'R-99Laser', time: '19:20', text: 'She never misses a single bullet on Horizon Q' },
      { id: 2, user: 'ShieldBattery', time: '19:21', text: 'GG champion squad!' }
    ]
  }
];

export const CASTERS = [
  {
    id: 'apex-caster',
    name: 'Marcus "ApexCaster" Vance',
    handle: '@ApexCaster',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    verified: true,
    isLive: true,
    role: 'Lead Play-by-Play Shoutcaster',
    bio: 'Official international eSports commentator with 6+ years casting Tier 1 Valorant Champions Tour & CS2 Majors. Known for high-energy hype delivery and deep tactical breakdown.',
    gamesCovered: ['VALORANT', 'COUNTER-STRIKE 2'],
    languages: ['English', 'German'],
    community: 'Valkyrie Global eSports',
    stats: {
      matchesCasted: '420+',
      peakViewers: '185,000',
      rating: '4.98 / 5.0',
      tournamentsHost: '38'
    },
    upcomingBroadcasts: [
      { title: 'VALORANT Venture Crown Grand Finals', date: 'Tonight, 18:00 UTC' },
      { title: 'CS2 Major Quarterfinals Day 1', date: 'Sept 22, 16:00 UTC' }
    ],
    socials: { twitter: 'twitter.com/ApexCaster', twitch: 'twitch.tv/ApexCaster', youtube: 'youtube.com/@ApexCaster' }
  },
  {
    id: 'cast-king',
    name: 'Rohan "CastKing" Sharma',
    handle: '@CastKingLive',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    verified: true,
    isLive: true,
    role: 'Official Battle Royale Caster',
    bio: 'Pioneer of BGMI and Free Fire esports commentary across South Asia. Veteran shoutcaster with over 500 professional LAN matches and invitational finals covered.',
    gamesCovered: ['BGMI / PUBG MOBILE', 'FREE FIRE MAX'],
    languages: ['Hindi', 'English'],
    community: 'Krafton Community VentureX',
    stats: {
      matchesCasted: '580+',
      peakViewers: '340,000',
      rating: '4.95 / 5.0',
      tournamentsHost: '52'
    },
    upcomingBroadcasts: [
      { title: 'BGMI Elite Masters Finals Day 3', date: 'Tomorrow, 17:30 IST' }
    ],
    socials: { twitter: 'twitter.com/CastKing', twitch: 'twitch.tv/CastKingLive', youtube: 'youtube.com/@CastKingOfficial' }
  },
  {
    id: 'nova-strike',
    name: 'Elena "NovaStrike" Rostova',
    handle: '@NovaCast',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    verified: true,
    isLive: false,
    role: 'Tactical Analyst & Color Caster',
    bio: 'Former professional Valorant controller player turned tactical analyst. Specializes in economy analysis, utility usage breakdowns, and post-round analytical replays.',
    gamesCovered: ['VALORANT', 'APEX LEGENDS'],
    languages: ['English', 'Spanish', 'Russian'],
    community: 'Valkyrie Global eSports',
    stats: {
      matchesCasted: '290+',
      peakViewers: '120,000',
      rating: '4.92 / 5.0',
      tournamentsHost: '26'
    },
    upcomingBroadcasts: [
      { title: 'Apex Outlands Season 22 Playoffs', date: 'Oct 02, 20:00 UTC' }
    ],
    socials: { twitter: 'twitter.com/NovaCast', twitch: 'twitch.tv/NovaStrike', youtube: 'youtube.com/@NovaAnalysis' }
  },
  {
    id: 'ranger-cs',
    name: 'David "RangerCS" Lindholm',
    handle: '@RangerCS',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    verified: true,
    isLive: false,
    role: 'CS2 Senior Commentator',
    bio: 'Swedish CS veteran casting since CS:GO DreamHack 2017. Unmatched game knowledge and signature iconic voice during nail-biting 1vX clutch rounds.',
    gamesCovered: ['COUNTER-STRIKE 2'],
    languages: ['English', 'Swedish'],
    community: 'CS2 VentureX League',
    stats: {
      matchesCasted: '640+',
      peakViewers: '210,000',
      rating: '4.99 / 5.0',
      tournamentsHost: '60'
    },
    upcomingBroadcasts: [
      { title: 'CS2 VentureX Major Showdown', date: 'Sept 22, 16:00 UTC' }
    ],
    socials: { twitter: 'twitter.com/RangerCS', twitch: 'twitch.tv/RangerCS', youtube: 'youtube.com/@RangerCS' }
  }
];

export const COMMUNITIES = [
  {
    id: 'val-community',
    name: 'VALORANT Vanguard Hub',
    game: 'VALORANT',
    gameId: 'valorant',
    membersCount: '48,500 Members',
    activeTournamentsCount: 6,
    liveEventsCount: 3,
    castersCount: 8,
    verified: true,
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    avatar: '🎯',
    description: 'This community organizes and manages competitive activities, daily scrims, and verified prize-pool tournaments for VALORANT across all skill tiers.',
    leadAdmin: 'Valkyrie Staff',
    announcements: [
      { id: 1, title: 'Registration Open for Venture Crown Series S4 ($45,000 Prize)', date: '2 hours ago', author: 'ApexCaster (Admin)' },
      { id: 2, title: 'Weekly Radiant Scrims starting this Friday at 19:00 UTC', date: '1 day ago', author: 'Staff Moderator' }
    ]
  },
  {
    id: 'bgmi-community',
    name: 'BGMI Champions Guild',
    game: 'BGMI / PUBG MOBILE',
    gameId: 'bgmi',
    membersCount: '94,200 Members',
    activeTournamentsCount: 8,
    liveEventsCount: 5,
    castersCount: 14,
    verified: true,
    banner: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80',
    avatar: '🪂',
    description: 'The premier South Asian battle royale esports federation organizing weekly custom room tournaments, LAN events, and Tier 1 scrims.',
    leadAdmin: 'Krafton Community Lead',
    announcements: [
      { id: 1, title: 'BGMI Elite Masters Match 4 live broadcast running now on Theater Tab', date: '30 mins ago', author: 'CastKing' },
      { id: 2, title: 'Rules Update: Anti-Recoil device detection is now strictly automated.', date: '3 days ago', author: 'Disciplinary Desk' }
    ]
  },
  {
    id: 'cs2-community',
    name: 'CS2 VentureX Competitive League',
    game: 'COUNTER-STRIKE 2',
    gameId: 'cs2',
    membersCount: '62,100 Members',
    activeTournamentsCount: 4,
    liveEventsCount: 2,
    castersCount: 10,
    verified: true,
    banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    avatar: '💣',
    description: 'Dedicated to competitive 5v5 Counter-Strike 2. Hosts 128-tick equivalent custom servers, ladder leagues, and official seasonal majors.',
    leadAdmin: 'RangerCS & VentureX Board',
    announcements: [
      { id: 1, title: 'CS2 VentureX Major Showdown brackets will lock in 48 hours.', date: '4 hours ago', author: 'Tournament Director' }
    ]
  },
  {
    id: 'apex-community',
    name: 'Apex Syndicate Outlands',
    game: 'APEX LEGENDS',
    gameId: 'apex-legends',
    membersCount: '31,400 Members',
    activeTournamentsCount: 3,
    liveEventsCount: 1,
    castersCount: 6,
    verified: true,
    banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    avatar: '⚡',
    description: 'Home of the global Predator & Master trios. Competitive scrims, custom lobbies, and high-speed battle royale showdowns.',
    leadAdmin: 'Syndicate Council',
    announcements: [
      { id: 1, title: 'Global Predator Clash registration now open to all Master+ squads', date: '1 day ago', author: 'Council' }
    ]
  }
];

export const PLAYERS = [
  {
    id: 'player-kaizen',
    username: 'Kaizen_God',
    displayName: 'Kaelen "Kaizen" Zhang',
    rank: 'Grandmaster / Radiance #4',
    tier: 'GRANDMASTER',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    bio: 'Professional Duelist for Sentinel X. 3x Tournament MVP, 2025 Regional Champion. Jett & Reyna main with 1.48 K/D.',
    country: 'Canada',
    favoriteGames: ['VALORANT', 'CS2', 'Apex Legends'],
    currentTeam: 'Sentinel X Esports',
    stats: {
      winRate: '74.2%',
      kdRatio: '1.48',
      headshotRate: '41.5%',
      tournamentsWon: 14,
      totalEarnings: '$84,500',
      matchesPlayed: 820
    },
    achievements: [
      { title: 'CHAMPION', event: 'Venture Crown Series S3', date: '2025', icon: '🏆' },
      { title: 'MVP', event: 'VCT Summer Masters', date: '2025', icon: '⭐' },
      { title: 'TOURNAMENT WINNER', event: 'Red Bull Campus Clash', date: '2024', icon: '🥇' },
      { title: 'FINALIST', event: 'Global Predator Cup', date: '2024', icon: '🥈' }
    ],
    recentMatches: [
      { map: 'Haven', score: '13 - 9', result: 'VICTORY', kills: 28, deaths: 12, rating: '1.64' },
      { map: 'Ascent', score: '13 - 11', result: 'VICTORY', kills: 24, deaths: 15, rating: '1.38' },
      { map: 'Lotus', score: '10 - 13', result: 'DEFEAT', kills: 19, deaths: 16, rating: '1.12' }
    ]
  },
  {
    id: 'player-viperx',
    username: 'ViperX_Pro',
    displayName: 'Aryan "ViperX" Singhania',
    rank: 'Conqueror Tier #1',
    tier: 'CONQUEROR',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80',
    bio: 'IGL for Team SoulX. Renowned tactical shot-caller and precision gyro sniper. Multi-season BGMI Major Champion.',
    country: 'India',
    favoriteGames: ['BGMI / PUBG MOBILE', 'Free Fire'],
    currentTeam: 'Team SoulX',
    stats: {
      winRate: '68.5%',
      kdRatio: '6.82',
      headshotRate: '29.8%',
      tournamentsWon: 18,
      totalEarnings: '₹62,00,000 (~$75K)',
      matchesPlayed: 1420
    },
    achievements: [
      { title: 'CHAMPION', event: 'Clash of Titans 2026', date: '2026', icon: '🏆' },
      { title: 'MVP', event: 'BGMI National Series', date: '2025', icon: '⭐' },
      { title: 'TOURNAMENT WINNER', event: 'All-Stars Invitational', date: '2025', icon: '🥇' }
    ],
    recentMatches: [
      { map: 'Erangel', score: '1st Place (14 Kills)', result: 'VICTORY', kills: 6, deaths: 0, rating: '9.8' },
      { map: 'Miramar', score: '3rd Place (8 Kills)', result: 'TOP 3', kills: 4, deaths: 1, rating: '8.4' }
    ]
  },
  {
    id: 'player-niko-aim',
    username: 'AetherStrike',
    displayName: 'Nikolai "Aether" Lind',
    rank: 'Global Elite / 3400 ELO',
    tier: 'GLOBAL ELITE',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    bio: 'Entry fragger & Rifler for Nordic Vanguard. CS2 Major Finalist. 54% career headshot ratio.',
    country: 'Sweden',
    favoriteGames: ['CS2', 'VALORANT'],
    currentTeam: 'Nordic Vanguard',
    stats: {
      winRate: '71.0%',
      kdRatio: '1.39',
      headshotRate: '54.2%',
      tournamentsWon: 11,
      totalEarnings: '$68,000',
      matchesPlayed: 960
    },
    achievements: [
      { title: 'CHAMPION', event: 'DreamVentureX Masters 2025', date: '2025', icon: '🏆' },
      { title: 'MVP', event: 'Stockholm Open', date: '2025', icon: '⭐' }
    ],
    recentMatches: [
      { map: 'Inferno', score: '13 - 8', result: 'VICTORY', kills: 26, deaths: 11, rating: '1.55' }
    ]
  }
];

export const VIDEOS = [
  {
    id: 'vid-clutch-haven',
    title: 'THE GREATEST 1v4 ACE CLUTCH IN ESPORTS HISTORY! (VCT Finals)',
    creator: 'Kaizen_God',
    creatorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
    game: 'VALORANT',
    duration: '03:42',
    views: '420,500',
    date: '2 days ago',
    category: 'Highlights',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'vid-bgmi-final-circle',
    title: 'Unbelievable 1v3 Clutch in the Final Circle of Erangel | BGMI Masters',
    creator: 'CastKing Live',
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    game: 'BGMI / PUBG MOBILE',
    duration: '05:18',
    views: '890,200',
    date: '1 day ago',
    category: 'Tournament Moments',
    thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'vid-cs2-smoke-tactics',
    title: 'Top 10 Game-Changing CS2 Grenade & Smoke Lineups for Inferno 2026',
    creator: 'RangerCS Official',
    creatorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80',
    game: 'COUNTER-STRIKE 2',
    duration: '12:40',
    views: '154,000',
    date: '4 days ago',
    category: 'Match Recaps',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'vid-apex-movement-guide',
    title: 'Superglide & Tap-Strafe Mastery in Apex Legends (Pro Predator Breakdown)',
    creator: 'Valkyrie_Queen',
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    game: 'APEX LEGENDS',
    duration: '08:15',
    views: '230,100',
    date: '6 days ago',
    category: 'Player Clips',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'
  }
];

export const MOCK_BRACKET = {
  tournamentTitle: 'VALORANT Venture Crown Series Season 4',
  rounds: [
    {
      roundName: 'Quarterfinals',
      matches: [
        {
          id: 'm1',
          teamA: { name: 'Sentinel X', score: 2, isWinner: true, seed: '#1' },
          teamB: { name: 'Cloud Titan', score: 0, isWinner: false, seed: '#8' },
          status: 'COMPLETED'
        },
        {
          id: 'm2',
          teamA: { name: 'Nordic Vanguard', score: 2, isWinner: true, seed: '#4' },
          teamB: { name: 'Omega Cyber', score: 1, isWinner: false, seed: '#5' },
          status: 'COMPLETED'
        },
        {
          id: 'm3',
          teamA: { name: 'Fnatic Vanguard', score: 2, isWinner: true, seed: '#2' },
          teamB: { name: 'Apex Storm', score: 0, isWinner: false, seed: '#7' },
          status: 'COMPLETED'
        },
        {
          id: 'm4',
          teamA: { name: 'Draco Legion', score: 2, isWinner: true, seed: '#3' },
          teamB: { name: 'Phantom Force', score: 1, isWinner: false, seed: '#6' },
          status: 'COMPLETED'
        }
      ]
    },
    {
      roundName: 'Semifinals',
      matches: [
        {
          id: 'm5',
          teamA: { name: 'Sentinel X', score: 2, isWinner: true, seed: '#1' },
          teamB: { name: 'Nordic Vanguard', score: 1, isWinner: false, seed: '#4' },
          status: 'COMPLETED'
        },
        {
          id: 'm6',
          teamA: { name: 'Fnatic Vanguard', score: 2, isWinner: true, seed: '#2' },
          teamB: { name: 'Draco Legion', score: 0, isWinner: false, seed: '#3' },
          status: 'COMPLETED'
        }
      ]
    },
    {
      roundName: 'Grand Finals',
      matches: [
        {
          id: 'm7',
          teamA: { name: 'Sentinel X', score: 1, isWinner: false, seed: '#1' },
          teamB: { name: 'Fnatic Vanguard', score: 1, isWinner: false, seed: '#2' },
          status: 'LIVE (MAP 3 DECIDER)'
        }
      ]
    }
  ],
  champion: {
    name: 'PENDING (LIVE IN PROGRESS)',
    trophy: 'ROYAL GOLD CROWN',
    prize: '$24,000 USD'
  }
};

export const INITIAL_USER = {
  id: 'user-current',
  username: 'AetherKnight',
  displayName: 'Prakhar "Aether" Sharma',
  email: 'prakhar.esports@VentureX.gg',
  role: 'PLAYER',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
  country: 'India',
  language: 'English',
  tier: 'DIAMOND III',
  favoriteGames: ['VALORANT', 'BGMI / PUBG MOBILE', 'CS2'],
  bio: 'Competitive esports player & strategist. Climbing the Radiant ladder in Valorant. Always ready to enter the VentureX.',
  registeredTournaments: [
    'val-champions-cup-2026',
    'bgmi-invitational-masters'
  ],
  savedCommunities: ['val-community', 'bgmi-community'],
  followedCasters: ['apex-caster', 'cast-king'],
  stats: {
    matchesPlayed: 342,
    winRate: '64.8%',
    tournamentsJoined: 12,
    trophiesCount: 4
  }
};
