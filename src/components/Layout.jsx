import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Menu, X } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

export default function Layout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="glass-panel" style={{ padding: '0.5rem 0', borderRadius: '0', borderBottom: '1px solid var(--glass-border)', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" onClick={() => setIsMenuOpen(false)} style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="Clean Up Logo" style={{ height: '60px', objectFit: 'contain', clipPath: 'inset(2px)', mixBlendMode: 'multiply' }} />
          </Link>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Desktop Navigation */}
            <nav className="hide-mobile" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {user && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <User size={16} />
                    {user.name}
                  </span>
                  
                  {user.role === 'client' && <Link to="/client" style={{ color: 'var(--text-main)', fontWeight: '500' }}>Mon Espace</Link>}
                  {user.role === 'agent' && <Link to="/agent" style={{ color: 'var(--text-main)', fontWeight: '500' }}>Feuille de route</Link>}
                  {user.role === 'admin' && <Link to="/admin" style={{ color: 'var(--text-main)', fontWeight: '500' }}>Administration</Link>}
                </div>
              )}
              
              <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem' }}>
                <LogOut size={16} /> Quitter
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer' }}
              className="show-mobile-flex"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="animate-fade-in" style={{ 
            position: 'absolute', top: '100%', left: 0, right: 0, 
            backgroundColor: 'white', padding: '1rem', borderBottom: '1px solid var(--glass-border)',
            display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
          }}>
            {user && (
              <>
                <div style={{ paddingBottom: '0.5rem', borderBottom: '1px solid var(--background)' }}>
                  <p style={{ fontWeight: '600', color: 'var(--text-main)' }}>{user.name}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Role: {user.role}</p>
                </div>
                {user.role === 'client' && <Link to="/client" onClick={() => setIsMenuOpen(false)}>Mon Espace</Link>}
                {user.role === 'agent' && <Link to="/agent" onClick={() => setIsMenuOpen(false)}>Feuille de route</Link>}
                {user.role === 'admin' && <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Administration</Link>}
              </>
            )}
            <button onClick={handleLogout} className="btn btn-primary" style={{ width: '100%' }}>
              <LogOut size={18} /> Se déconnecter
            </button>
          </div>
        )}
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
