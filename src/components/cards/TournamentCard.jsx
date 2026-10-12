import React from 'react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';
import GoldButton from '../common/GoldButton';
import Button from '../common/Button';
import { Trophy, Users, Calendar, ArrowRight } from 'lucide-react';

export default function TournamentCard({ tournament }) {
  const { navigateTo, user, registerForTournament } = useApp();

  const isRegistered = user.registeredTournaments.includes(tournament.id);
  const slotsPercentage = Math.round((tournament.registeredSlots / tournament.totalSlots) * 100);

  return (
    <div className="VentureX-card">
      <div className="VentureX-card-media">
        <img src={tournament.banner} alt={tournament.title} className="VentureX-card-img" />
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
          <Badge type={tournament.statusType}>{tournament.status}</Badge>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '12px',
            background: 'rgba(7, 8, 11, 0.85)',
            padding: '4px 10px',
            borderRadius: 'var(--radius-xs)',
            border: '1px solid rgba(201, 162, 39, 0.4)',
            fontSize: '0.8rem',
            fontWeight: 800,
            color: 'var(--gold-bright)'
          }}
        >
          {tournament.prizePool}
        </div>
      </div>

      <div className="VentureX-card-body">
        <div style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', color: 'var(--gold-bright)', textTransform: 'uppercase' }}>
          {tournament.game} • {tournament.organizer}
        </div>

        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.35 }}>
          {tournament.title}
        </h4>

        {/* Tournament Meta Strip */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 'auto', paddingTop: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Calendar size={14} style={{ color: 'var(--gold-primary)' }} />
            <span>{tournament.startDate}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Users size={14} style={{ color: 'var(--gold-primary)' }} />
            <span>{tournament.registeredSlots}/{tournament.totalSlots} Slots</span>
          </div>
        </div>

        {/* Slot Progress Bar */}
        <div style={{ width: '100%', height: '4px', background: 'var(--surface-elevated)', borderRadius: '2px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${slotsPercentage}%`,
              height: '100%',
              background: slotsPercentage >= 90 ? 'var(--live-red)' : 'var(--gold-gradient)'
            }}
          />
        </div>

        {/* Card Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.5rem', marginTop: '0.5rem' }}>
          {tournament.statusType === 'open' ? (
            <GoldButton
              size="sm"
              onClick={() => {
                if (!isRegistered) registerForTournament(tournament.id);
                else navigateTo('tournament-details', { id: tournament.id });
              }}
            >
              {isRegistered ? 'Registered ✓' : 'Register Now'}
            </GoldButton>
          ) : (
            <Button
              size="sm"
              variant="outline-gold"
              onClick={() => navigateTo('tournament-details', { id: tournament.id })}
            >
              View Bracket
            </Button>
          )}

          <Button
            size="sm"
            variant="secondary"
            onClick={() => navigateTo('tournament-details', { id: tournament.id })}
            title="Details"
          >
            <ArrowRight size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}
