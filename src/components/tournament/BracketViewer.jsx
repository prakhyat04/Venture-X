import React, { useState } from 'react';
import { MOCK_BRACKET } from '../../data/mockData';
import { Trophy, Flame, ChevronRight, Award, Radio } from 'lucide-react';
import Modal from '../common/Modal';
import Badge from '../common/Badge';

export default function BracketViewer({ bracketData = MOCK_BRACKET }) {
  const [selectedMatch, setSelectedMatch] = useState(null);

  return (
    <div className="bracket-container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Trophy size={18} style={{ color: 'var(--gold-bright)' }} />
            <span>Interactive Tournament Bracket</span>
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Single Elimination Knockout • Click any match to view breakdown
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gold-primary)' }} />
            <span>Advancing Winner</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span className="live-dot" />
            <span>Live Match</span>
          </div>
        </div>
      </div>

      <div className="bracket-tree">
        {bracketData.rounds.map((round, rIndex) => (
          <div key={rIndex} className="bracket-round">
            <div className="bracket-round-title">{round.roundName}</div>
            <div className="bracket-matches-list">
              {round.matches.map((match) => {
                const isLive = match.status.includes('LIVE');
                return (
                  <div
                    key={match.id}
                    className={`bracket-match-card ${isLive ? 'is-live' : ''}`}
                    onClick={() => setSelectedMatch(match)}
                  >
                    <div className="bracket-match-header">
                      <span>Match #{match.id.toUpperCase()}</span>
                      {isLive ? (
                        <span style={{ color: 'var(--live-red)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span className="live-dot" /> LIVE
                        </span>
                      ) : (
                        <span>{match.status}</span>
                      )}
                    </div>

                    {/* Team A */}
                    <div className={`bracket-team-row ${match.teamA.isWinner ? 'winner' : ''}`}>
                      <div className="bracket-team-info">
                        <span className="bracket-team-seed">{match.teamA.seed}</span>
                        <div className="bracket-team-logo">{match.teamA.name.slice(0, 1)}</div>
                        <span className="bracket-team-name">{match.teamA.name}</span>
                      </div>
                      <span className="bracket-team-score">{match.teamA.score}</span>
                    </div>

                    {/* Team B */}
                    <div className={`bracket-team-row ${match.teamB.isWinner ? 'winner' : ''}`}>
                      <div className="bracket-team-info">
                        <span className="bracket-team-seed">{match.teamB.seed}</span>
                        <div className="bracket-team-logo">{match.teamB.name.slice(0, 1)}</div>
                        <span className="bracket-team-name">{match.teamB.name}</span>
                      </div>
                      <span className="bracket-team-score">{match.teamB.score}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Champion Trophy Column */}
        <div style={{ minWidth: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="bracket-round-title">Championship Trophy</div>
          <div className="bracket-champion-box">
            <Trophy className="champion-trophy-icon" />
            <div className="champion-title">GRAND PRIZE</div>
            <div className="champion-name">{bracketData.champion.prize}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--gold-bright)', marginTop: '0.5rem', fontWeight: 700 }}>
              + Royal Gold Championship Ring
            </div>
          </div>
        </div>
      </div>

      {/* Match Detail Modal */}
      <Modal
        isOpen={!!selectedMatch}
        onClose={() => setSelectedMatch(null)}
        title={`Match Details: ${selectedMatch?.teamA.name} vs ${selectedMatch?.teamB.name}`}
      >
        {selectedMatch && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '1rem', padding: '1.5rem', background: 'var(--surface-elevated)', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', textAlign: 'center' }}>
              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: selectedMatch.teamA.isWinner ? 'var(--gold-bright)' : 'var(--text-primary)' }}>
                  {selectedMatch.teamA.name}
                </h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Seed {selectedMatch.teamA.seed}</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', marginTop: '0.5rem' }}>
                  {selectedMatch.teamA.score}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--gold-primary)' }}>VS</span>
                <Badge type={selectedMatch.status.includes('LIVE') ? 'live' : 'gold'}>
                  {selectedMatch.status}
                </Badge>
              </div>

              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: selectedMatch.teamB.isWinner ? 'var(--gold-bright)' : 'var(--text-primary)' }}>
                  {selectedMatch.teamB.name}
                </h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Seed {selectedMatch.teamB.seed}</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', marginTop: '0.5rem' }}>
                  {selectedMatch.teamB.score}
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>Match Breakdown:</div>
              <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <li>Map 1 (Haven): Sentinel X won 13-9 (MVP: Kaizen_God)</li>
                <li>Map 2 (Ascent): Fnatic Vanguard won 13-11 (MVP: BoasterX)</li>
                <li>Map 3 (Lotus): Decider currently live in progress</li>
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
