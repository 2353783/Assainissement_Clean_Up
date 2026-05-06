import React, { useState } from 'react';
import { MapPin, Navigation, CheckCircle, AlertTriangle, Phone } from 'lucide-react';
import MapComponent from '../components/MapComponent';

// Mock data pour les missions du jour
const mockMissions = [
  {
    id: 1,
    clientName: 'Maison Jean-Pierre',
    phone: '+243 81 234 5678',
    address: 'Limete Résidentiel',
    plan: 'Service Moyen (4-5 sacs)',
    status: 'pending', // pending, in_progress, completed, issue
    location: { lat: -4.3824, lng: 15.3371 }
  },
  {
    id: 2,
    clientName: 'Restaurant La Gombe',
    phone: '+243 99 876 5432',
    address: 'Gombe, Avenue de la Justice',
    plan: 'Service Grand (+5 sacs)',
    status: 'pending',
    location: { lat: -4.3059, lng: 15.2929 }
  },
  {
    id: 3,
    clientName: 'Appartements Lemba',
    phone: '+243 89 111 2222',
    address: 'Lemba Super',
    plan: 'Service Petit (1-3 sacs)',
    status: 'pending',
    location: { lat: -4.3986, lng: 15.3188 }
  }
];

export default function AgentDashboard() {
  const [missions, setMissions] = useState(mockMissions);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const updateMissionStatus = (id, newStatus) => {
    setMissions(missions.map(m => m.id === id ? { ...m, status: newStatus } : m));
    
    if (newStatus === 'in_progress') {
      showToast('Vous êtes en route. Le client a été notifié.');
    } else if (newStatus === 'completed') {
      showToast('Ramassage validé avec succès !');
    } else if (newStatus === 'issue') {
      showToast('Problème signalé à l\'administration.', 'error');
    }
  };

  // Extraire les marqueurs des missions non complétées
  const activeMarkers = missions
    .filter(m => m.status !== 'completed' && m.status !== 'issue')
    .map(m => m.location);

  // Position centrale de Kinshasa pour la carte globale de l'agent
  const centerPosition = { lat: -4.35, lng: 15.31 };

  return (
    <div className="container" style={{ padding: '2rem 1rem', position: 'relative' }}>
      
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '1rem',
          backgroundColor: toast.type === 'success' ? 'var(--secondary)' : 'var(--danger)',
          color: 'white',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
          animation: 'fadeIn 0.3s ease-in-out'
        }}>
          {toast.message}
        </div>
      )}

      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--text-main)' }}>Tableau de bord Agent</h1>
        <p style={{ color: 'var(--text-muted)' }}>Votre feuille de route pour aujourd'hui</p>
      </header>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        
        {/* Carte Globale de l'itinéraire */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <MapPin size={20} color="var(--primary)" />
            Aperçu de l'itinéraire ({activeMarkers.length} arrêts)
          </h3>
          <div style={{ height: '300px', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <MapComponent initialPosition={centerPosition} readonly={true} markers={activeMarkers} />
          </div>
        </div>

        {/* Liste des missions */}
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Missions à effectuer</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {missions.map((mission) => (
              <div 
                key={mission.id} 
                className="glass-panel" 
                style={{ 
                  padding: '1.5rem',
                  borderLeft: `4px solid ${
                    mission.status === 'completed' ? 'var(--secondary)' : 
                    mission.status === 'in_progress' ? 'var(--primary)' : 
                    mission.status === 'issue' ? 'var(--danger)' : 
                    'var(--text-muted)'
                  }`,
                  opacity: mission.status === 'completed' ? 0.7 : 1
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  
                  {/* Infos client */}
                  <div>
                    <h4 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{mission.clientName}</h4>
                    <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <MapPin size={16} /> {mission.address}
                    </p>
                    <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <Phone size={16} /> {mission.phone}
                    </p>
                    <span style={{ display: 'inline-block', padding: '0.25rem 0.5rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontWeight: '500' }}>
                      {mission.plan}
                    </span>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {mission.status === 'pending' && (
                      <button 
                        onClick={() => updateMissionStatus(mission.id, 'in_progress')}
                        className="btn btn-primary" 
                        style={{ backgroundColor: 'var(--primary)' }}
                      >
                        <Navigation size={18} /> En route
                      </button>
                    )}
                    
                    {mission.status === 'in_progress' && (
                      <button 
                        onClick={() => updateMissionStatus(mission.id, 'completed')}
                        className="btn btn-primary"
                      >
                        <CheckCircle size={18} /> Valider le ramassage
                      </button>
                    )}

                    {(mission.status === 'pending' || mission.status === 'in_progress') && (
                      <button 
                        onClick={() => updateMissionStatus(mission.id, 'issue')}
                        className="btn btn-outline" 
                        style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}
                      >
                        <AlertTriangle size={18} /> Problème
                      </button>
                    )}
                    
                    {mission.status === 'completed' && (
                      <span style={{ color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500' }}>
                        <CheckCircle size={20} /> Terminé
                      </span>
                    )}

                    {mission.status === 'issue' && (
                      <span style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500' }}>
                        <AlertTriangle size={20} /> Signalé
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
