import React, { useState } from 'react';
import { CreditCard, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';

export default function Wallet({ balance, onRecharge }) {
  const [showRecharge, setShowRecharge] = useState(false);
  const [amount, setAmount] = useState('');
  const [provider, setProvider] = useState('mpesa');

  const handleRecharge = (e) => {
    e.preventDefault();
    if (amount && !isNaN(amount) && Number(amount) > 0) {
      onRecharge(Number(amount));
      setAmount('');
      setShowRecharge(false);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CreditCard size={20} color="var(--primary)" />
          Mon Portefeuille
        </h3>
      </div>
      
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Solde actuel</p>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--text-main)' }}>
          {balance.toLocaleString()} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>FC</span>
        </h2>
      </div>

      {!showRecharge ? (
        <button 
          className="btn btn-primary" 
          style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}
          onClick={() => setShowRecharge(true)}
        >
          <ArrowUpRight size={18} />
          Recharger le compte
        </button>
      ) : (
        <form onSubmit={handleRecharge} className="animate-fade-in" style={{ backgroundColor: 'var(--surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
          <div className="form-group">
            <label className="form-label">Montant (FC)</label>
            <input 
              type="number" 
              className="form-input" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Ex: 15000" 
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Moyen de paiement</label>
            <select 
              className="form-input"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
            >
              <option value="mpesa">M-Pesa</option>
              <option value="airtel">Airtel Money</option>
              <option value="orange">Orange Money</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Valider</button>
            <button type="button" className="btn btn-outline" onClick={() => setShowRecharge(false)}>Annuler</button>
          </div>
        </form>
      )}

      <div style={{ marginTop: '2rem' }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>
          <Clock size={16} />
          Dernières transactions
        </h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {/* Simulation d'historique */}
          {balance > 0 ? (
            <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--glass-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ArrowUpRight size={16} />
                </div>
                <div>
                  <p style={{ fontWeight: '500', fontSize: '0.9rem' }}>Recharge Mobile Money</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Aujourd'hui</p>
                </div>
              </div>
              <span style={{ color: 'var(--secondary)', fontWeight: '500' }}>+{balance.toLocaleString()} FC</span>
            </li>
          ) : (
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textAlign: 'center' }}>Aucune transaction récente</p>
          )}
        </ul>
      </div>
    </div>
  );
}
