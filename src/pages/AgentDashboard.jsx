import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, CheckCircle, AlertTriangle, Phone, Clock } from 'lucide-react';
import MapComponent from '../components/MapComponent';
import { useAuth } from '../lib/AuthContext';

export default function AgentDashboard() {
  const { user, getTasks, updateTaskStatus, getClients } = useAuth();
  const [missions, setMissions] = useState([]);
  const [clients, setClients] = useState([]);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const allTasks = await getTasks();
    const allClients = await getClients();
    setClients(allClients);
    
    // Filter tasks for this agent
    const agentTasks = allTasks.filter(t => t.agentId === user.uid);
    
    // Enrich tasks with client data
    const enrichedTasks = agentTasks.map(task => {
      const client = allClients.find(c => c.uid === task.clientId);
      return {
        ...task,
        clientName: client?.name || 'Inconnu',
        phone: client?.phone || '-',
        address: client?.address || task.zone,
        plan: client?.plan || 'Standard',
        location: client?.location || { lat: -4.35, lng: 15.31 }
      };
    });
    
    setMissions(enrichedTasks);
    setLoading(false);
  };

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleUpdateStatus = async (id, newStatus) => {
    const result = await updateTaskStatus(id, newStatus);
    if (result.success) {
      if (newStatus === 'completed') {
        showToast('Ramassage validé avec succès !');
      } else {
        showToast('Statut mis à jour');
      }
      await fetchData();
    } else {
      showToast(result.error, 'error');
    }
  };

  const activeMarkers = missions
    .filter(m => m.status !== 'completed')
    .map(m => m.location);

  const centerPosition = { lat: -4.35, lng: 15.31 };

  if (loading) return <div className="container" style={{ padding: '2rem' }}>Chargement de votre feuille de route...</div>;

  return (
    <div className="container" style={{ padding: '2rem 1rem', position: 'relative' }}>
      
      {toast && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px', padding: '1rem',
          backgroundColor: toast.type === 'success' ? 'var(--secondary)' : 'var(--danger)',
          color: 'white', borderRadius: 'var(--radius-md)', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000, animation: 'fadeIn 0.3s ease-in-out'
        }}>
          {toast.message}
        </div>
      )}

      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--text-main)' }}>Bonjour, {user.name}</h1>
        <p style={{ color: 'var(--text-muted)' }}>Votre feuille de route pour aujourd'hui</p>
      </header>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <MapPin size={20} color="var(--primary)" />
            Aperçu de l'itinéraire ({activeMarkers.length} missions restantes)
          </h3>
          <div style={{ height: '300px', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <MapComponent initialPosition={centerPosition} readonly={true} markers={activeMarkers} />
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>Missions assignées</h3>
          
          {missions.length === 0 ? (
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              Aucune mission assignée pour le moment.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {missions.map((mission) => (
                <div 
                  key={mission.id} 
                  className="glass-panel" 
                  style={{ 
                    padding: '1.5rem',
                    borderLeft: `4px solid ${mission.status === 'completed' ? 'var(--secondary)' : 'var(--warning)'}`,
                    opacity: mission.status === 'completed' ? 0.7 : 1
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h4 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{mission.clientName}</h4>
                      <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <MapPin size={16} /> {mission.address}
                      </p>
                      <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <Phone size={16} /> {mission.phone}
                      </p>
                      <span style={{ display: 'inline-block', padding: '0.25rem 0.5rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontWeight: '500' }}>
                        {mission.plan || 'Forfait Standard'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {mission.status === 'pending' ? (
                        <button 
                          onClick={() => handleUpdateStatus(mission.id, 'completed')}
                          className="btn btn-primary"
                        >
                          <CheckCircle size={18} /> Valider le ramassage
                        </button>
                      ) : (
                        <span style={{ color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500' }}>
                          <CheckCircle size={20} /> Terminé
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

