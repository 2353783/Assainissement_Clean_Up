import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

export default function Layout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="glass-panel" style={{ padding: '1rem 0', borderRadius: '0', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="Clean Up Logo" style={{ height: '48px', objectFit: 'contain' }} onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }} />
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold', display: 'none' }}>CLEAN UP</span>
          </Link>
          
          <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {user && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginRight: '1rem' }}>
                  <User size={16} />
                  {user.name} 
                  <span style={{ backgroundColor: 'var(--background)', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.75rem', textTransform: 'capitalize' }}>
                    ({user.role})
                  </span>
                </span>
                
                {user.role === 'client' && <Link to="/client" style={{ color: 'var(--text-main)' }}>Mon Espace</Link>}
                {user.role === 'agent' && <Link to="/agent" style={{ color: 'var(--text-main)' }}>Feuille de route</Link>}
                {user.role === 'admin' && <Link to="/admin" style={{ color: 'var(--text-main)' }}>Administration</Link>}
              </div>
            )}
            
            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <LogOut size={16} /> Quitter
            </button>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      
      <footer style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
        <div className="container">
          &copy; {new Date().getFullYear()} CLEAN UP Kinshasa
        </div>
      </footer>
    </div>
  );
}
