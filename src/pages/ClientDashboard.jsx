import React, { useState } from 'react';
import { Calendar as CalendarIcon, MapPin, AlertCircle, User, Phone } from 'lucide-react';
import Wallet from '../components/Wallet';
import PlanSelection from '../components/PlanSelection';
import MapComponent from '../components/MapComponent';
import { useAuth } from '../lib/AuthContext';

export default function ClientDashboard() {
  const { user, updateUser } = useAuth();
  
  // Position par défaut ou la position de l'utilisateur
  const userLocation = user?.location || { lat: -4.4419, lng: 15.2663 };

  const handleRecharge = async (amount) => {
    const newBalance = (user?.balance || 0) + amount;
    await updateUser({ balance: newBalance });
  };

  const handleSelectPlan = async (planId) => {
    await updateUser({ plan: planId });
  };


  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--text-main)' }}>Bonjour, {user?.name || 'Client'} !</h1>
        <p style={{ color: 'var(--text-muted)' }}>Bienvenue dans votre espace personnel d'assainissement</p>
      </header>

      {/* Profil Client */}
      <div className="glass-panel animate-fade-in" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <User size={40} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Profil Personnel</h2>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={16} /> {user?.name}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={16} /> {user?.phone}
            </span>
            {user?.address && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} /> {user.address}
              </span>
            )}
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)' }}>
              <MapPin size={16} /> Coordonnées GPS enregistrées
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
        {/* Ligne 1: Wallet et Calendrier/Prochain Passage */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <Wallet balance={user?.balance || 0} onRecharge={handleRecharge} />
          
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <CalendarIcon size={20} color="var(--primary)" />
              Prochain passage
            </h3>
            
            {user?.plan ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', backgroundColor: 'rgba(14, 165, 233, 0.05)', borderRadius: 'var(--radius-md)', padding: '2rem' }}>
                <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>L'équipe passera le</p>
                <h2 style={{ color: 'var(--primary)', fontSize: '2rem', marginBottom: '0.5rem' }}>Jeudi, 8 Mai</h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '500' }}>Entre 08h00 et 12h00</p>
                <div style={{ marginTop: '1.5rem', padding: '0.5rem 1rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--secondary)', borderRadius: 'var(--radius-full)', fontSize: '0.875rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '8px', height: '8px', backgroundColor: 'var(--secondary)', borderRadius: '50%', display: 'inline-block' }}></span>
                  Confirmé
                </div>
              </div>
            ) : (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <AlertCircle size={48} color="var(--warning)" style={{ marginBottom: '1rem', opacity: 0.5 }} />
                <p style={{ color: 'var(--text-muted)' }}>Vous n'avez pas de forfait actif.</p>
                <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Veuillez choisir un forfait ci-dessous pour planifier un ramassage.</p>
              </div>
            )}
          </div>
        </div>

        {/* Ligne 2: Carte de la parcelle */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <MapPin size={20} color="var(--secondary)" />
            Localisation de ma parcelle
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Les agents se baseront sur cette adresse pour la collecte.
          </p>
          <div style={{ height: '250px', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <MapComponent initialPosition={userLocation} readonly={true} />
          </div>
        </div>

        {/* Ligne 3: Sélection des forfaits */}
        <div style={{ marginTop: '1rem' }}>
          <PlanSelection currentPlanId={user?.plan} onSelectPlan={handleSelectPlan} />
        </div>
        
      </div>
    </div>
  );
}
