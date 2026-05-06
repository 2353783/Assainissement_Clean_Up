import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Lock, User, AlertCircle, Map, Crosshair } from 'lucide-react';
import MapComponent from '../components/MapComponent';
import { useAuth } from '../lib/AuthContext';

export default function Auth() {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [location, setLocation] = useState(null);
  
  // Form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  
  const [error, setError] = useState('');

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        },
        (err) => {
          setError("Impossible de récupérer votre position. Veuillez cliquer sur la carte ou l'autoriser dans votre navigateur.");
        }
      );
    } else {
      setError("La géolocalisation n'est pas supportée par votre navigateur.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const result = await login(phone, password);
      if (result.success) {
        if (result.user.role === 'client') navigate('/client');
        if (result.user.role === 'agent') navigate('/agent');
        if (result.user.role === 'admin') navigate('/admin');
      } else {
        setError(result.error);
      }
    } else {
      if (!location) {
        setError('Veuillez sélectionner votre adresse sur la carte.');
        return;
      }
      
      const result = await signup(name, phone, password, location, address);
      if (result.success) {
        navigate('/client');
      } else {
        setError(result.error);
      }
    }
  };

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 0' }}>
      <div className="glass-panel animate-fade-in" style={{ padding: '2.5rem', width: '100%', maxWidth: '500px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img src="/logo.png" alt="Clean Up Logo" style={{ height: '64px', objectFit: 'contain', marginBottom: '1rem' }} onError={(e) => e.target.style.display='none'} />
          <h2>{isLogin ? 'Connexion' : 'Créer un compte Client'}</h2>
          <p style={{ color: 'var(--text-muted)' }}>Accédez à votre espace Assainissement</p>
        </div>

        {error && (
          <div style={{ padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={20} />
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group animate-fade-in">
              <label className="form-label">Nom complet</label>
              <div style={{ position: 'relative' }}>
                <User size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Votre nom" 
                  style={{ paddingLeft: '3rem' }} 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Numéro de téléphone</label>
            <div style={{ position: 'relative' }}>
              <Phone size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                className="form-input" 
                placeholder="Ex: 0812345678 (admin)" 
                style={{ paddingLeft: '3rem' }} 
                required 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Mot de passe</label>
            <div style={{ position: 'relative' }}>
              <Lock size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="password" 
                className="form-input" 
                placeholder="•••••••• (admin)" 
                style={{ paddingLeft: '3rem' }} 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {!isLogin && (
            <div className="form-group animate-fade-in">
              <label className="form-label">Adresse physique</label>
              <div style={{ position: 'relative' }}>
                <Map size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Avenue, Quartier, Commune..." 
                  style={{ paddingLeft: '3rem' }} 
                  required 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
          )}

          {!isLogin && (
            <div className="form-group animate-fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Géolocalisation de votre parcelle</label>
                <button 
                  type="button" 
                  onClick={handleLocateMe}
                  className="btn btn-outline" 
                  style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem', borderColor: 'var(--primary)', color: 'var(--primary)' }}
                >
                  <Crosshair size={14} /> Me localiser
                </button>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Cliquez sur la carte ou utilisez le bouton "Me localiser".</p>
              <MapComponent onLocationSelect={setLocation} currentPosition={location} />
              {location && (
                <p style={{ fontSize: '0.8rem', color: 'var(--secondary)', marginTop: '0.5rem' }}>
                  Position sélectionnée : {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </p>
              )}
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.875rem' }}>
            {isLogin ? 'Se connecter' : "S'inscrire"}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {isLogin ? "Vous n'avez pas de compte client ?" : "Vous avez déjà un compte ?"}
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); }} 
              style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: '500', marginLeft: '0.5rem', fontFamily: 'inherit' }}
            >
              {isLogin ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
