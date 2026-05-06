import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Menu, X, Truck, Users } from 'lucide-react';
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
            <img src="/logo.png" alt="Clean Up Logo" style={{ height: '50px', objectFit: 'contain', clipPath: 'inset(2px)', mixBlendMode: 'multiply' }} />
          </Link>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Desktop Navigation */}
            <nav className="hide-mobile" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              {user && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <User size={16} />
                    {user.name}
                  </span>
                  
                  {user.role === 'client' && <Link to="/client" style={{ color: 'var(--text-main)', fontWeight: '600' }}>Mon Espace</Link>}
                  {user.role === 'agent' && <Link to="/agent" style={{ color: 'var(--text-main)', fontWeight: '600' }}>Feuille de route</Link>}
                  {user.role === 'admin' && <Link to="/admin" style={{ color: 'var(--text-main)', fontWeight: '600' }}>Administration</Link>}
                </div>
              )}
              
              <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.875rem' }}>
                <LogOut size={16} /> Quitter
              </button>
            </nav>

            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setIsMenuOpen(true)}
              style={{ display: 'none', background: 'var(--background)', border: '1px solid var(--glass-border)', cursor: 'pointer', padding: '0.5rem', borderRadius: 'var(--radius-md)', color: 'var(--text-main)' }}
              className="show-mobile-flex"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Professional Mobile Drawer */}
        <div className={`drawer-overlay ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(false)}></div>
        <div className={`mobile-drawer ${isMenuOpen ? 'open' : ''}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <img src="/logo.png" alt="Logo" style={{ height: '40px', mixBlendMode: 'multiply' }} />
            <button onClick={() => setIsMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
              <X size={28} />
            </button>
          </div>

          {user ? (
            <>
              <div style={{ padding: '1rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                <p style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--text-main)' }}>{user.name}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{user.role}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {user.role === 'client' && <Link to="/client" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><User size={20} /> Mon Espace</Link>}
                {user.role === 'agent' && <Link to="/agent" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Truck size={20} /> Feuille de route</Link>}
                {user.role === 'admin' && <Link to="/admin" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Users size={20} /> Administration</Link>}
              </div>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="btn btn-primary">Connexion</Link>
          )}

          <div style={{ marginTop: 'auto' }}>
            <button onClick={handleLogout} className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', borderColor: 'var(--danger)', color: 'var(--danger)' }}>
              <LogOut size={18} /> Déconnexion
            </button>
          </div>
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
