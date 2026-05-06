import React, { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  Truck, 
  Map, 
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  UserPlus,
  Phone,
  Lock
} from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

// Mock data
const kpis = [
  { title: 'Revenus Mensuels', value: '1,450,000 FC', trend: '+12%', isPositive: true, icon: TrendingUp, color: 'var(--secondary)' },
  { title: 'Clients Actifs', value: '342', trend: '+5%', isPositive: true, icon: Users, color: 'var(--primary)' },
];

const denseZones = [
  { name: 'Gombe', clients: 124, status: 'Haute' },
  { name: 'Limete', clients: 98, status: 'Moyenne' },
  { name: 'Lemba', clients: 65, status: 'Moyenne' },
  { name: 'Kalamu', clients: 30, status: 'Basse' },
];

export default function AdminDashboard() {
  const { createAgent, getAgents } = useAuth();
  
  const [agents, setAgents] = useState([]);
  
  // Formulaire création agent
  const [agentName, setAgentName] = useState('');
  const [agentPhone, setAgentPhone] = useState('');
  const [agentPassword, setAgentPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAgents = async () => {
      const agentsList = await getAgents();
      setAgents(agentsList);
    };
    fetchAgents();
  }, []);

  const handleCreateAgent = async (e) => {
    e.preventDefault();
    const result = await createAgent(agentName, agentPhone, agentPassword);
    
    if (result.success) {
      setMessage('Agent créé avec succès !');
      setAgentName('');
      setAgentPhone('');
      setAgentPassword('');
      const agentsList = await getAgents();
      setAgents(agentsList);
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage(result.error);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: 'var(--text-main)' }}>Super Admin</h1>
          <p style={{ color: 'var(--text-muted)' }}>Vue d'ensemble des opérations et gestion du personnel</p>
        </div>
      </header>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="glass-panel animate-fade-in" style={{ padding: '1.5rem', animationDelay: `${index * 0.1}s` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                    {kpi.title}
                  </p>
                  <h2 style={{ fontSize: '2rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                    {kpi.value}
                  </h2>
                </div>
                <div style={{ padding: '0.75rem', backgroundColor: `${kpi.color}15`, borderRadius: 'var(--radius-md)', color: kpi.color }}>
                  <Icon size={24} />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem', fontSize: '0.875rem', color: kpi.isPositive ? 'var(--secondary)' : 'var(--danger)' }}>
                {kpi.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                <span style={{ fontWeight: '500' }}>{kpi.trend}</span>
                <span style={{ color: 'var(--text-muted)' }}>vs mois dernier</span>
              </div>
            </div>
          );
        })}
        
        {/* KPI Agents dynamique */}
        <div className="glass-panel animate-fade-in" style={{ padding: '1.5rem', animationDelay: '0.2s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Agents en service
              </p>
              <h2 style={{ fontSize: '2rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                {agents.length}
              </h2>
            </div>
            <div style={{ padding: '0.75rem', backgroundColor: `var(--warning)15`, borderRadius: 'var(--radius-md)', color: 'var(--warning)' }}>
              <Truck size={24} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr lg:2fr 1fr', gap: '2rem', flexWrap: 'wrap' }}>
        
        {/* Gestion des Agents */}
        <div className="glass-panel" style={{ padding: '1.5rem', flex: 2, minWidth: '300px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Users size={20} color="var(--primary)" />
            Gestion des Agents de Terrain
          </h3>

          {/* Formulaire de création */}
          <div style={{ backgroundColor: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)', marginBottom: '2rem' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Créer un nouveau compte Agent</h4>
            {message && <p style={{ color: message.includes('succès') ? 'var(--secondary)' : 'var(--danger)', marginBottom: '1rem' }}>{message}</p>}
            
            <form onSubmit={handleCreateAgent} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'end' }}>
              <div>
                <label className="form-label">Nom de l'agent</label>
                <div style={{ position: 'relative' }}>
                  <Users size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="text" className="form-input" style={{ paddingLeft: '2.5rem' }} value={agentName} onChange={(e) => setAgentName(e.target.value)} required />
                </div>
              </div>
              <div>
                <label className="form-label">Numéro de téléphone</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="tel" className="form-input" style={{ paddingLeft: '2.5rem' }} value={agentPhone} onChange={(e) => setAgentPhone(e.target.value)} required />
                </div>
              </div>
              <div>
                <label className="form-label">Mot de passe temporaire</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="password" className="form-input" style={{ paddingLeft: '2.5rem' }} value={agentPassword} onChange={(e) => setAgentPassword(e.target.value)} required />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                <UserPlus size={18} /> Ajouter
              </button>
            </form>
          </div>

          {/* Liste des agents */}
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Agents actifs</h4>
          {agents.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>Aucun agent enregistré pour le moment.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '1rem 0', fontWeight: '500' }}>Nom</th>
                    <th style={{ padding: '1rem 0', fontWeight: '500' }}>Téléphone</th>
                    <th style={{ padding: '1rem 0', fontWeight: '500' }}>Rôle</th>
                    <th style={{ padding: '1rem 0', width: '40px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map(agent => (
                    <tr key={agent.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                      <td style={{ padding: '1rem 0', fontWeight: '500' }}>{agent.name}</td>
                      <td style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>{agent.phone}</td>
                      <td style={{ padding: '1rem 0' }}>
                        <span style={{ padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: '600', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}>
                          Agent
                        </span>
                      </td>
                      <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                        <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Zones Denses */}
        <div className="glass-panel" style={{ padding: '1.5rem', flex: 1, minWidth: '300px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Map size={20} color="var(--primary)" />
              Densité par Zone
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {denseZones.map((zone, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{zone.name}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{zone.clients} clients</p>
                </div>
                <span style={{ 
                  fontSize: '0.75rem', 
                  fontWeight: '600', 
                  color: zone.status === 'Haute' ? 'var(--danger)' : zone.status === 'Moyenne' ? 'var(--warning)' : 'var(--secondary)'
                }}>
                  {zone.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
