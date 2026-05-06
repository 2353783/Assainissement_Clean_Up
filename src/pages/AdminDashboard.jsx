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
  Lock,
  Calendar,
  Download,
  FileText,
  FileSpreadsheet,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

// Mock data for zones (static for now)
const denseZones = [
  { name: 'Gombe', clients: 124, status: 'Haute' },
  { name: 'Limete', clients: 98, status: 'Moyenne' },
  { name: 'Lemba', clients: 65, status: 'Moyenne' },
  { name: 'Kalamu', clients: 30, status: 'Basse' },
];

export default function AdminDashboard() {
  const { 
    createAgent, getAgents, createAdminAccount, getAdmins, 
    getClients, createTask, getTasks 
  } = useAuth();
  
  const [activeTab, setActiveTab] = useState('personnel'); // personnel | planning
  const [staff, setStaff] = useState([]);
  const [clients, setClients] = useState([]);
  const [tasks, setTasks] = useState([]);
  
  // Creation form states
  const [roleToCreate, setRoleToCreate] = useState('agent');
  const [staffName, setStaffName] = useState('');
  const [staffPhone, setStaffPhone] = useState('');
  const [staffPassword, setStaffPassword] = useState('');
  
  // Task assignment states
  const [selectedAgent, setSelectedAgent] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [taskDate, setTaskDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [message, setMessage] = useState('');

  const fetchData = async () => {
    const agentsList = await getAgents();
    const adminsList = await getAdmins();
    const clientsList = await getClients();
    const tasksList = await getTasks();
    
    setStaff([...adminsList, ...agentsList]);
    setClients(clientsList);
    setTasks(tasksList);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateStaff = async (e) => {
    e.preventDefault();
    let result;
    if (roleToCreate === 'admin') {
      result = await createAdminAccount(staffName, staffPhone, staffPassword);
    } else {
      result = await createAgent(staffName, staffPhone, staffPassword);
    }
    
    if (result.success) {
      setMessage(`${roleToCreate === 'admin' ? 'Administrateur' : 'Agent'} créé avec succès !`);
      setStaffName('');
      setStaffPhone('');
      setStaffPassword('');
      await fetchData();
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage(result.error);
    }
  };

  const handleAssignTask = async (e) => {
    e.preventDefault();
    if (!selectedAgent || !selectedClient) {
      setMessage("Veuillez sélectionner un agent et un client");
      return;
    }
    
    const client = clients.find(c => c.uid === selectedClient);
    const result = await createTask(selectedAgent, selectedClient, client.address || 'Zone Standard', taskDate);
    
    if (result.success) {
      setMessage("Planning assigné avec succès !");
      setSelectedClient('');
      await fetchData();
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage(result.error);
    }
  };

  // EXPORT PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Rapport d'Assainissement - CLEAN UP", 14, 15);
    doc.setFontSize(10);
    doc.text(`Date de génération: ${new Date().toLocaleString()}`, 14, 22);
    
    const tableData = tasks.map(t => [
      t.date,
      staff.find(s => s.uid === t.agentId)?.name || 'Inconnu',
      clients.find(c => c.uid === t.clientId)?.name || 'Inconnu',
      t.zone,
      t.status === 'completed' ? 'Terminé' : 'En attente'
    ]);

    doc.autoTable({
      head: [['Date', 'Agent', 'Client', 'Zone', 'Statut']],
      body: tableData,
      startY: 30,
    });

    doc.save(`Rapport_CleanUp_${new Date().getTime()}.pdf`);
  };

  // EXPORT EXCEL
  const exportExcel = () => {
    const reportData = tasks.map(t => ({
      Date: t.date,
      Agent: staff.find(s => s.uid === t.agentId)?.name || 'Inconnu',
      Client: clients.find(c => c.uid === t.clientId)?.name || 'Inconnu',
      Zone: t.zone,
      Statut: t.status === 'completed' ? 'Terminé' : 'En attente',
      'Terminé le': t.completedAt || '-'
    }));

    const ws = XLSX.utils.json_to_sheet(reportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rapport");
    XLSX.writeFile(wb, `Rapport_CleanUp_${new Date().getTime()}.xlsx`);
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: 'var(--text-main)' }}>Super Admin</h1>
          <p style={{ color: 'var(--text-muted)' }}>Monitoring et Pilotage des opérations</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={exportPDF} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={18} /> PDF
          </button>
          <button onClick={exportExcel} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileSpreadsheet size={18} /> Excel
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
        <button 
          onClick={() => setActiveTab('personnel')}
          style={{ 
            background: 'none', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer',
            color: activeTab === 'personnel' ? 'var(--primary)' : 'var(--text-muted)',
            fontWeight: '600', borderBottom: activeTab === 'personnel' ? '2px solid var(--primary)' : 'none'
          }}
        >
          Gestion Personnel
        </button>
        <button 
          onClick={() => setActiveTab('planning')}
          style={{ 
            background: 'none', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer',
            color: activeTab === 'planning' ? 'var(--primary)' : 'var(--text-muted)',
            fontWeight: '600', borderBottom: activeTab === 'planning' ? '2px solid var(--primary)' : 'none'
          }}
        >
          Planning & Monitoring
        </button>
      </div>

      {activeTab === 'personnel' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr lg:2fr 1fr', gap: '2rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem', flex: 2, minWidth: '300px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <Users size={20} color="var(--primary)" />
              Gestion des Comptes
            </h3>
            <div style={{ backgroundColor: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)', marginBottom: '2rem' }}>
              <h4 style={{ marginBottom: '1rem' }}>Ajouter un membre</h4>
              {message && <p style={{ color: message.includes('succès') ? 'var(--secondary)' : 'var(--danger)', marginBottom: '1rem' }}>{message}</p>}
              <form onSubmit={handleCreateStaff} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'end' }}>
                <div>
                  <label className="form-label">Rôle</label>
                  <select className="form-input" value={roleToCreate} onChange={(e) => setRoleToCreate(e.target.value)}>
                    <option value="agent">Agent</option>
                    <option value="admin">Administrateur</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Nom</label>
                  <input type="text" className="form-input" value={staffName} onChange={(e) => setStaffName(e.target.value)} required />
                </div>
                <div>
                  <label className="form-label">Tél</label>
                  <input type="text" className="form-input" value={staffPhone} onChange={(e) => setStaffPhone(e.target.value)} required />
                </div>
                <div>
                  <label className="form-label">Pass</label>
                  <input type="password" className="form-input" value={staffPassword} onChange={(e) => setStaffPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Ajouter</button>
              </form>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
                    <th style={{ padding: '1rem 0' }}>Nom</th>
                    <th style={{ padding: '1rem 0' }}>Tél</th>
                    <th style={{ padding: '1rem 0' }}>Rôle</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map(member => (
                    <tr key={member.uid} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                      <td style={{ padding: '1rem 0' }}>{member.name}</td>
                      <td style={{ padding: '1rem 0' }}>{member.phone}</td>
                      <td style={{ padding: '1rem 0' }}>
                        <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', backgroundColor: member.role === 'admin' ? 'rgba(14, 165, 233, 0.1)' : 'rgba(245, 158, 11, 0.1)', color: member.role === 'admin' ? 'var(--primary)' : 'var(--warning)' }}>
                          {member.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="glass-panel" style={{ padding: '1.5rem', flex: 1, minWidth: '300px' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Zones Denses</h3>
            {denseZones.map((zone, i) => (
              <div key={i} style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between' }}>
                <span>{zone.name}</span>
                <span style={{ fontWeight: 'bold' }}>{zone.clients} clients</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
          {/* Form Assignation */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={20} color="var(--primary)" /> Assignation
            </h3>
            <form onSubmit={handleAssignTask} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label">Choisir l'Agent</label>
                <select className="form-input" value={selectedAgent} onChange={(e) => setSelectedAgent(e.target.value)} required>
                  <option value="">Sélectionner...</option>
                  {staff.filter(s => s.role === 'agent').map(a => (
                    <option key={a.uid} value={a.uid}>{a.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Choisir le Client / Zone</label>
                <select className="form-input" value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)} required>
                  <option value="">Sélectionner...</option>
                  {clients.map(c => (
                    <option key={c.uid} value={c.uid}>{c.name} - {c.address}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Date d'intervention</label>
                <input type="date" className="form-input" value={taskDate} onChange={(e) => setTaskDate(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary">Assigner la mission</button>
            </form>
          </div>

          {/* Monitoring */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Suivi des Opérations</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '1rem 0' }}>Agent</th>
                    <th style={{ padding: '1rem 0' }}>Client</th>
                    <th style={{ padding: '1rem 0' }}>Date</th>
                    <th style={{ padding: '1rem 0' }}>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map(task => (
                    <tr key={task.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                      <td style={{ padding: '1rem 0' }}>{staff.find(s => s.uid === task.agentId)?.name}</td>
                      <td style={{ padding: '1rem 0' }}>{clients.find(c => c.uid === task.clientId)?.name}</td>
                      <td style={{ padding: '1rem 0' }}>{task.date}</td>
                      <td style={{ padding: '1rem 0' }}>
                        {task.status === 'completed' ? (
                          <span style={{ color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <CheckCircle2 size={16} /> Terminé
                          </span>
                        ) : (
                          <span style={{ color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Clock size={16} /> En attente
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

