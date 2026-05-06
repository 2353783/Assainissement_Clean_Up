import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    id: 'petit',
    name: 'Service Petit',
    volume: '1 à 3 sacs',
    frequency: '2 passages / semaine',
    target: 'Ménages restreints, studios.',
    price: '15.000 FC / mois',
    color: 'var(--primary)'
  },
  {
    id: 'moyen',
    name: 'Service Moyen',
    volume: '4 à 6 sacs',
    frequency: 'Hebdomadaire',
    target: 'Familles moyennes.',
    price: '25.000 FC / mois',
    color: 'var(--secondary)'
  },
  {
    id: 'grand',
    name: 'Service Grand',
    volume: '+7 sacs',
    frequency: 'Flexible / Haute fréquence',
    target: 'Restaurants, commerces.',
    price: '40.000 FC / mois',
    color: 'var(--warning)'
  }
];

export default function PlanSelection({ currentPlanId, onSelectPlan }) {
  return (
    <div style={{ marginTop: '1.5rem' }}>
      <h3 style={{ marginBottom: '1rem' }}>Nos Forfaits</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {plans.map((plan) => {
          const isSelected = currentPlanId === plan.id;
          
          return (
            <div 
              key={plan.id}
              className="glass-panel"
              style={{ 
                padding: '1.5rem', 
                borderTop: `4px solid ${plan.color}`,
                position: 'relative',
                transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                transition: 'all var(--transition-normal)',
                cursor: 'pointer',
                boxShadow: isSelected ? `0 8px 30px ${plan.color}33` : 'var(--glass-shadow)'
              }}
              onClick={() => onSelectPlan(plan.id)}
            >
              {isSelected && (
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', color: plan.color }}>
                  <Check size={24} />
                </div>
              )}
              
              <h3 style={{ color: plan.color, marginBottom: '0.5rem' }}>{plan.name}</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{plan.price}</p>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-muted)' }}>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontWeight: '500', color: 'var(--text-main)' }}>Volume:</span> {plan.volume}
                </li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontWeight: '500', color: 'var(--text-main)' }}>Fréquence:</span> {plan.frequency}
                </li>
                <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontWeight: '500', color: 'var(--text-main)' }}>Idéal pour:</span> {plan.target}
                </li>
              </ul>
              
              <button 
                className={`btn ${isSelected ? 'btn-primary' : 'btn-outline'}`}
                style={{ 
                  width: '100%', 
                  marginTop: '1.5rem',
                  backgroundColor: isSelected ? plan.color : 'transparent',
                  borderColor: plan.color,
                  color: isSelected ? 'white' : plan.color
                }}
              >
                {isSelected ? 'Forfait Actuel' : 'Choisir ce forfait'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
