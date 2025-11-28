import { LandingNavbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Conditions d'utilisation | ratee.me",
  description: "Conditions générales d'utilisation du service ratee.me",
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-sora text-4xl font-bold text-content-primary mb-4">
            Conditions générales d'utilisation
          </h1>
          <p className="text-content-secondary mb-8">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                1. Objet
              </h2>
              <p className="text-content-secondary mb-4">
                Les présentes conditions générales d'utilisation (CGU) régissent l'utilisation du service ratee.me,
                une plateforme SaaS de collecte automatisée de feedbacks NPS pour freelances et agences.
              </p>
              <p className="text-content-secondary mb-4">
                En utilisant ratee.me, vous acceptez pleinement et sans réserve les présentes CGU.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                2. Définitions
              </h2>
              <ul className="list-disc list-inside text-content-secondary space-y-2 mb-4">
                <li><strong>Service :</strong> la plateforme ratee.me et toutes ses fonctionnalités</li>
                <li><strong>Utilisateur :</strong> toute personne utilisant le Service</li>
                <li><strong>Client :</strong> toute personne invitée à donner un feedback via ratee.me</li>
                <li><strong>Compte :</strong> espace personnel de l'Utilisateur sur la plateforme</li>
                <li><strong>Abonnement :</strong> formule tarifaire choisie par l'Utilisateur</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                3. Inscription et compte
              </h2>
              <p className="text-content-secondary mb-4">
                <strong>3.1 Conditions d'inscription</strong><br />
                Pour utiliser ratee.me, vous devez :
              </p>
              <ul className="list-disc list-inside text-content-secondary space-y-2 mb-4">
                <li>Être âgé d'au moins 18 ans</li>
                <li>Fournir des informations exactes et à jour</li>
                <li>Créer un compte avec une adresse email valide</li>
              </ul>
              <p className="text-content-secondary mb-4">
                <strong>3.2 Sécurité du compte</strong><br />
                Vous êtes responsable de la confidentialité de vos identifiants et de toutes les activités effectuées depuis votre compte.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                4. Description du service
              </h2>
              <p className="text-content-secondary mb-4">
                ratee.me permet de :
              </p>
              <ul className="list-disc list-inside text-content-secondary space-y-2 mb-4">
                <li>Créer et gérer des projets clients</li>
                <li>Envoyer automatiquement des demandes de feedback NPS</li>
                <li>Collecter et analyser les réponses</li>
                <li>Obtenir des témoignages clients</li>
                <li>Afficher un badge NPS sur votre site</li>
                <li>Exporter vos données</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                5. Tarifs et paiement
              </h2>
              <p className="text-content-secondary mb-4">
                <strong>5.1 Plans tarifaires</strong><br />
                ratee.me propose différents plans tarifaires (Gratuit, Pro, Business). Les tarifs actuels sont disponibles sur la page <a href="/pricing" className="text-emerald-500 hover:text-emerald-600">Tarifs</a>.
              </p>
              <p className="text-content-secondary mb-4">
                <strong>5.2 Paiement</strong><br />
                Les paiements sont traités de manière sécurisée par Stripe. Les abonnements sont facturés mensuellement ou annuellement selon votre choix.
              </p>
              <p className="text-content-secondary mb-4">
                <strong>5.3 Résiliation</strong><br />
                Vous pouvez annuler votre abonnement à tout moment depuis votre compte. L'annulation prend effet à la fin de la période de facturation en cours.
              </p>
              <p className="text-content-secondary mb-4">
                <strong>5.4 Remboursement</strong><br />
                Aucun remboursement n'est effectué pour les périodes déjà facturées, sauf en cas de dysfonctionnement majeur du service non résolu dans un délai raisonnable.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                6. Utilisation du service
              </h2>
              <p className="text-content-secondary mb-4">
                <strong>6.1 Utilisation conforme</strong><br />
                Vous vous engagez à utiliser le Service de manière licite et conforme aux présentes CGU.
              </p>
              <p className="text-content-secondary mb-4">
                <strong>6.2 Interdictions</strong><br />
                Il est strictement interdit de :
              </p>
              <ul className="list-disc list-inside text-content-secondary space-y-2 mb-4">
                <li>Utiliser le Service pour envoyer du spam ou des messages non sollicités</li>
                <li>Tenter de contourner les limitations de votre plan tarifaire</li>
                <li>Usurper l'identité d'une autre personne ou entreprise</li>
                <li>Collecter des données de manière illégale</li>
                <li>Utiliser le Service pour harceler, menacer ou diffamer</li>
                <li>Tenter d'accéder aux systèmes de manière non autorisée</li>
                <li>Revendre ou redistribuer le Service sans autorisation</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                7. Propriété intellectuelle
              </h2>
              <p className="text-content-secondary mb-4">
                <strong>7.1 Service</strong><br />
                Tous les éléments du Service (code, design, marques, logos) sont la propriété exclusive de ratee.me et protégés par le droit d'auteur.
              </p>
              <p className="text-content-secondary mb-4">
                <strong>7.2 Vos données</strong><br />
                Vous conservez tous les droits sur les données que vous collectez via le Service. Nous ne revendiquons aucun droit de propriété sur vos données.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                8. Responsabilités
              </h2>
              <p className="text-content-secondary mb-4">
                <strong>8.1 Notre responsabilité</strong><br />
                Nous nous efforçons de maintenir le Service disponible 24/7, mais ne garantissons pas une disponibilité ininterrompue.
                Nous ne sommes pas responsables des dommages indirects résultant de l'utilisation du Service.
              </p>
              <p className="text-content-secondary mb-4">
                <strong>8.2 Votre responsabilité</strong><br />
                Vous êtes responsable de :
              </p>
              <ul className="list-disc list-inside text-content-secondary space-y-2 mb-4">
                <li>L'exactitude des informations que vous fournissez</li>
                <li>La conformité RGPD de vos campagnes de feedback</li>
                <li>L'obtention du consentement de vos clients pour les contacter</li>
                <li>La sauvegarde de vos données importantes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                9. Données personnelles
              </h2>
              <p className="text-content-secondary mb-4">
                L'utilisation de vos données personnelles est régie par notre <a href="/privacy" className="text-emerald-500 hover:text-emerald-600">Politique de confidentialité</a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                10. Suspension et résiliation
              </h2>
              <p className="text-content-secondary mb-4">
                Nous nous réservons le droit de suspendre ou résilier votre compte en cas de :
              </p>
              <ul className="list-disc list-inside text-content-secondary space-y-2 mb-4">
                <li>Violation des présentes CGU</li>
                <li>Non-paiement</li>
                <li>Utilisation frauduleuse ou abusive du Service</li>
                <li>Activité illégale</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                11. Modifications des CGU
              </h2>
              <p className="text-content-secondary mb-4">
                Nous pouvons modifier ces CGU à tout moment. Les modifications entrent en vigueur dès leur publication.
                Votre utilisation continue du Service après modification vaut acceptation des nouvelles CGU.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                12. Droit applicable
              </h2>
              <p className="text-content-secondary mb-4">
                Les présentes CGU sont régies par le droit français. Tout litige sera soumis aux tribunaux compétents de Paris, France.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                13. Contact
              </h2>
              <p className="text-content-secondary mb-4">
                Pour toute question concernant ces conditions d'utilisation :
              </p>
              <ul className="list-none text-content-secondary space-y-2 mb-4">
                <li>Email : <a href="mailto:legal@ratee.me" className="text-emerald-500 hover:text-emerald-600">legal@ratee.me</a></li>
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
