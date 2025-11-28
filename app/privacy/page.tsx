import { LandingNavbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de confidentialité | ratee.me',
  description: 'Politique de confidentialité et protection des données personnelles de ratee.me',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-sora text-4xl font-bold text-content-primary mb-4">
            Politique de confidentialité
          </h1>
          <p className="text-content-secondary mb-8">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                1. Introduction
              </h2>
              <p className="text-content-secondary mb-4">
                Bienvenue sur ratee.me. Nous accordons une grande importance à la protection de vos données personnelles.
                Cette politique de confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos informations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                2. Données collectées
              </h2>
              <p className="text-content-secondary mb-4">
                Nous collectons les informations suivantes :
              </p>
              <ul className="list-disc list-inside text-content-secondary space-y-2 mb-4">
                <li><strong>Informations d'identification :</strong> nom, prénom, adresse email</li>
                <li><strong>Informations professionnelles :</strong> nom de l'entreprise, secteur d'activité</li>
                <li><strong>Données de feedback :</strong> réponses NPS, commentaires, témoignages</li>
                <li><strong>Données de paiement :</strong> traitées de manière sécurisée par Stripe (nous ne stockons pas vos coordonnées bancaires)</li>
                <li><strong>Données techniques :</strong> adresse IP, type de navigateur, pages visitées</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                3. Utilisation des données
              </h2>
              <p className="text-content-secondary mb-4">
                Nous utilisons vos données pour :
              </p>
              <ul className="list-disc list-inside text-content-secondary space-y-2 mb-4">
                <li>Fournir et améliorer nos services</li>
                <li>Gérer votre compte et vos abonnements</li>
                <li>Envoyer des demandes de feedback à vos clients</li>
                <li>Générer des statistiques et analyses</li>
                <li>Vous envoyer des communications importantes concernant le service</li>
                <li>Assurer la sécurité et prévenir la fraude</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                4. Partage des données
              </h2>
              <p className="text-content-secondary mb-4">
                Nous ne vendons jamais vos données personnelles. Nous pouvons partager vos données avec :
              </p>
              <ul className="list-disc list-inside text-content-secondary space-y-2 mb-4">
                <li><strong>Prestataires de services :</strong> Supabase (hébergement de base de données), Stripe (paiements), Resend (emails)</li>
                <li><strong>Obligations légales :</strong> si requis par la loi ou pour protéger nos droits</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                5. Sécurité des données
              </h2>
              <p className="text-content-secondary mb-4">
                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées :
              </p>
              <ul className="list-disc list-inside text-content-secondary space-y-2 mb-4">
                <li>Chiffrement SSL/TLS pour toutes les communications</li>
                <li>Authentification sécurisée via Supabase</li>
                <li>Sauvegardes régulières de la base de données</li>
                <li>Accès restreint aux données personnelles</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                6. Vos droits (RGPD)
              </h2>
              <p className="text-content-secondary mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside text-content-secondary space-y-2 mb-4">
                <li><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
                <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
                <li><strong>Droit à l'effacement :</strong> supprimer vos données (sous certaines conditions)</li>
                <li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format structuré</li>
                <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
                <li><strong>Droit de limitation :</strong> limiter le traitement de vos données</li>
              </ul>
              <p className="text-content-secondary mb-4">
                Pour exercer vos droits, contactez-nous à : <a href="mailto:privacy@ratee.me" className="text-emerald-500 hover:text-emerald-600">privacy@ratee.me</a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                7. Cookies
              </h2>
              <p className="text-content-secondary mb-4">
                Nous utilisons des cookies essentiels pour :
              </p>
              <ul className="list-disc list-inside text-content-secondary space-y-2 mb-4">
                <li>Maintenir votre session de connexion</li>
                <li>Assurer la sécurité du site</li>
                <li>Mémoriser vos préférences</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                8. Conservation des données
              </h2>
              <p className="text-content-secondary mb-4">
                Nous conservons vos données aussi longtemps que nécessaire pour fournir nos services et respecter nos obligations légales.
                Lorsque vous supprimez votre compte, vos données personnelles sont supprimées dans les 30 jours.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                9. Modifications de la politique
              </h2>
              <p className="text-content-secondary mb-4">
                Nous pouvons modifier cette politique de confidentialité. Nous vous informerons de tout changement important par email
                ou via une notification sur le site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                10. Contact
              </h2>
              <p className="text-content-secondary mb-4">
                Pour toute question concernant cette politique de confidentialité :
              </p>
              <ul className="list-none text-content-secondary space-y-2 mb-4">
                <li>Email : <a href="mailto:privacy@ratee.me" className="text-emerald-500 hover:text-emerald-600">privacy@ratee.me</a></li>
                <li>Site web : <a href="https://ratee.me" className="text-emerald-500 hover:text-emerald-600">https://ratee.me</a></li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
