import React, { useState } from 'react';
import { storage } from '../lib/storage';

export default function SetupAdmin() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleCreateAdmin = async () => {
    setLoading(true);
    setMessage('');
    try {
      await storage.createAdmin('Super Admin', 'admin', 'admin123');
      setMessage('Succès ! Le compte Admin a été créé. Connectez-vous avec Téléphone: admin, Mot de passe: admin123');
    } catch (error) {
      console.error(error);
      setMessage(error.message || 'Erreur lors de la création du compte Admin');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '4rem', textAlign: 'center' }}>
      <h2>Installation Automatique</h2>
      <p>Cliquez sur le bouton ci-dessous pour générer automatiquement votre compte Administrateur.</p>
      
      <button 
        onClick={handleCreateAdmin} 
        disabled={loading}
        className="btn btn-primary"
        style={{ marginTop: '2rem', padding: '1rem 2rem' }}
      >
        {loading ? 'Création en cours...' : 'Générer le compte Admin'}
      </button>

      {message && (
        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: '8px' }}>
          {message}
        </div>
      )}
    </div>
  );
}

