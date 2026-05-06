import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Recycle, ShieldCheck, MapPin } from 'lucide-react';

export default function Landing() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation */}
      <header className="glass-panel" style={{ padding: '1rem 0', borderRadius: '0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="Clean Up Logo" style={{ height: '56px', objectFit: 'contain' }} onError={(e) => {
              // Fallback au cas où l'image n'est pas encore dans le dossier public
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }} />
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--secondary)', display: 'none' }}>CLEAN UP</span>
          </div>
          
          <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <a href="#services" style={{ color: 'var(--text-main)', fontWeight: '500' }}>Nos Services</a>
            <a href="#about" style={{ color: 'var(--text-main)', fontWeight: '500' }}>À Propos</a>
            <Link to="/login" className="btn btn-primary">
              Espace Client <ArrowRight size={18} />
            </Link>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <section style={{ padding: '6rem 0', textAlign: 'center', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(14, 165, 233, 0.1) 100%)' }}>
          <div className="container animate-fade-in">
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: 'var(--text-main)', lineHeight: '1.2' }}>
              Pour un Congo plus <span style={{ color: 'var(--secondary)' }}>propre</span> et plus <span style={{ color: 'var(--primary)' }}>sain</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 2.5rem auto' }}>
              CLEAN UP est votre partenaire de confiance pour la collecte et la gestion professionnelle des déchets. Simplifiez-vous la vie avec nos forfaits adaptés à tous.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link to="/login" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                Créer un compte
              </Link>
              <a href="#services" className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                Découvrir nos offres
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="about" style={{ padding: '6rem 0' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Pourquoi choisir <span style={{ color: 'var(--primary)' }}>CLEAN UP</span> ?</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.8' }}>
                  Nous sommes bien plus qu'un simple service de ramassage. CLEAN UP apporte une véritable révolution technologique et logistique pour garantir la salubrité de vos parcelles. Fini les incertitudes, fini les poubelles qui débordent : nous prenons le relais avec professionnalisme.
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Géolocalisation Précise</h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Nos agents trouvent votre domicile instantanément grâce au GPS, même sans adresse numérotée.</p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(14, 165, 233, 0.1)', color: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Recycle size={24} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Collecte Régulière et Suivie</h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Vous connaissez à l'avance notre calendrier de passage et êtes notifié dès que nos équipes sont en route.</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Paiement Sécurisé</h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Rechargez votre portefeuille numérique via Mobile Money en toute simplicité et en toute sécurité.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div style={{ position: 'relative' }}>
                <img 
                  src="/city.png" 
                  alt="Ville propre et verte" 
                  style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} 
                />
                <div className="glass-panel" style={{ position: 'absolute', bottom: '-20px', left: '-20px', padding: '1.5rem', maxWidth: '250px' }}>
                  <h4 style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }}>Notre Objectif</h4>
                  <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>Un environnement sans déchet pour la santé de tous.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specialty Section */}
        <section style={{ padding: '6rem 0', backgroundColor: 'var(--surface)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
              <div style={{ order: 2 }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Notre Spécialité : <span style={{ color: 'var(--secondary)' }}>L'Excellence Opérationnelle</span></h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.8' }}>
                  La force de CLEAN UP réside dans son équipe d'agents qualifiés et équipés. Formés aux standards d'hygiène les plus stricts, nos collecteurs opèrent avec du matériel adapté pour sécuriser vos espaces rapidement.
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.8' }}>
                  Qu'il s'agisse de déchets ménagers, de résidus commerciaux ou d'un grand nettoyage de printemps, nous avons l'infrastructure nécessaire pour intervenir proprement, sans laisser de traces.
                </p>
                <Link to="/login" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
                  Demander une collecte
                </Link>
              </div>
              
              <div style={{ order: 1 }}>
                <img 
                  src="/team.png" 
                  alt="Équipe CLEAN UP" 
                  style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" style={{ padding: '6rem 0', background: 'linear-gradient(to bottom, #ffffff, var(--background))' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '2.5rem' }}>Nos Forfaits</h2>
              <p style={{ color: 'var(--text-muted)' }}>Des solutions adaptées à votre volume de déchets.</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {/* Plan 1 */}
              <div className="glass-panel" style={{ padding: '2rem', borderTop: '4px solid var(--primary)' }}>
                <h3 style={{ color: 'var(--primary)' }}>Service Petit</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0' }}>15.000 FC<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 'normal' }}> / mois</span></p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', color: 'var(--text-muted)' }}>
                  <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--glass-border)' }}><strong>Volume :</strong> 1 à 3 sacs</li>
                  <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--glass-border)' }}><strong>Fréquence :</strong> 2 passages / semaine</li>
                  <li style={{ padding: '0.5rem 0' }}><strong>Idéal pour :</strong> Ménages restreints, studios</li>
                </ul>
                <Link to="/login" className="btn btn-outline" style={{ width: '100%', borderColor: 'var(--primary)', color: 'var(--primary)' }}>Choisir</Link>
              </div>

              {/* Plan 2 */}
              <div className="glass-panel" style={{ padding: '2rem', borderTop: '4px solid var(--secondary)', transform: 'scale(1.05)', boxShadow: '0 20px 40px rgba(16, 185, 129, 0.1)' }}>
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--secondary)', color: 'white', padding: '0.25rem 1rem', borderRadius: '1rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
                  Le plus populaire
                </div>
                <h3 style={{ color: 'var(--secondary)' }}>Service Moyen</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0' }}>25.000 FC<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 'normal' }}> / mois</span></p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', color: 'var(--text-muted)' }}>
                  <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--glass-border)' }}><strong>Volume :</strong> 4 à 6 sacs</li>
                  <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--glass-border)' }}><strong>Fréquence :</strong> Hebdomadaire</li>
                  <li style={{ padding: '0.5rem 0' }}><strong>Idéal pour :</strong> Familles moyennes</li>
                </ul>
                <Link to="/login" className="btn btn-primary" style={{ width: '100%' }}>Choisir</Link>
              </div>

              {/* Plan 3 */}
              <div className="glass-panel" style={{ padding: '2rem', borderTop: '4px solid var(--warning)' }}>
                <h3 style={{ color: 'var(--warning)' }}>Service Grand</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0' }}>40.000 FC<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 'normal' }}> / mois</span></p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', color: 'var(--text-muted)' }}>
                  <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--glass-border)' }}><strong>Volume :</strong> +7 sacs</li>
                  <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--glass-border)' }}><strong>Fréquence :</strong> Flexible / Haute fréquence</li>
                  <li style={{ padding: '0.5rem 0' }}><strong>Idéal pour :</strong> Restaurants, commerces</li>
                </ul>
                <Link to="/login" className="btn btn-outline" style={{ width: '100%', borderColor: 'var(--warning)', color: 'var(--warning)' }}>Choisir</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ backgroundColor: '#0f172a', color: 'white', padding: '3rem 0', textAlign: 'center' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <img src="/logo.png" alt="Clean Up Logo" style={{ height: '48px', objectFit: 'contain', backgroundColor: 'white', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }} onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }} />
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', display: 'none' }}>CLEAN UP</span>
          </div>
          <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Solution logistique pour la gestion des déchets à Kinshasa.</p>
          <div style={{ borderTop: '1px solid #334155', paddingTop: '1.5rem', color: '#64748b', fontSize: '0.875rem' }}>
            &copy; {new Date().getFullYear()} CLEAN UP. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}
