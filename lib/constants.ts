export const APP_NAME = "ratee.me";
export const APP_DESCRIPTION =
  "Automate client feedback collection with NPS tracking";

export const API_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// Admin emails - these users have full access to admin pages
export const ADMIN_EMAILS = ["martincavil.dev@gmail.com"] as const;

export const PROJECT_STATUS = {
  IN_PROGRESS: "in_progress",
  DELIVERED: "delivered",
  ARCHIVED: "archived",
} as const;

export const FEEDBACK_STATUS = {
  NOT_SENT: "not_sent",
  SENT: "sent",
  RECEIVED: "received",
} as const;

export const NPS_CATEGORIES = {
  DETRACTOR: "detractor", // 0-6
  PASSIVE: "passive", // 7-8
  PROMOTER: "promoter", // 9-10
} as const;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  DASHBOARD: "/dashboard",
  PROJECTS: "/dashboard/projects",
  FEEDBACKS: "/dashboard/feedbacks",
  BADGE: "/dashboard/badge",
  EMAIL_AUTOMATION: "/dashboard/email-automation",
  SETTINGS: "/dashboard/settings",
} as const;

// Landing page content (bilingual)
export const content = {
  fr: {
    hero: {
      headline: "Les preuves valent plus que les promesses",
      subheadline:
        "Automatise la collecte de feedbacks. Affiche ton score NPS fièrement. Laisse tes clients satisfaits vendre pour toi.",
      description:
        "Freelance ou agence? Tu collectes manuellement les feedbacks clients, tu relances pour les avis, tu génères des rapports dans Excel. C'est fini. ratee.me automatise tout : feedbacks NPS envoyés au bon moment, citations collectées, badge à afficher sur ton site. Tout centralisé. Tout simple.",
      cta: "Essayer gratuitement",
      ctaSecondary: "Voir une démo rapide",
    },
    problem: {
      title: "Ce que ratee.me change pour toi",
      subtitle:
        "Freelances et agences gagnent en efficacité, en crédibilité et en revenus.",
      issues: [
        {
          icon: "⏱️",
          title: "Gain de temps",
          description:
            "Économise 5 à 6 heures par mois. Plus de relances manuelles, plus de fichiers Excel à maintenir. Les feedbacks arrivent automatiquement après chaque étape projet.",
          screen: "automation",
        },
        {
          icon: "🏆",
          title: "Légitimité renforcée",
          description:
            "Affiche ton score NPS sur ton site. Tes prospects voient immédiatement ta crédibilité. La preuve sociale qui convertit, sans effort.",
          screen: "badge",
        },
        {
          icon: "🔄",
          title: "Clients récurrents",
          description:
            "Identifie tes clients les plus satisfaits. Recontacte-les au bon moment pour de nouvelles missions. Transforme chaque projet réussi en opportunité.",
          screen: "dashboard",
        },
        {
          icon: "📈",
          title: "Process améliorés",
          description:
            "Les retours clients révèlent tes axes d'amélioration. Analyse les tendances, identifie les points de friction, et améliore continuellement ton service.",
          screen: "analytics",
        },
      ],
    },
    timeline: {
      title: "Pourquoi ratee.me est incontournable",
      items: [
        {
          icon: "🎯",
          title: "Zéro effort, maximum de data",
          description:
            "Les feedbacks s'envoient automatiquement à chaque étape projet. Tu ne fais rien, les données arrivent. Fini les relances oubliées.",
        },
        {
          icon: "💎",
          title: "Ta réputation, quantifiée",
          description:
            "Un score NPS objectif et mesurable. Plus besoin de dire 'mes clients sont satisfaits'. Tu le prouves avec des chiffres.",
        },
        {
          icon: "🚀",
          title: "Convertis plus de prospects",
          description:
            "Affiche ton badge NPS sur ton site. Les prospects voient immédiatement ta crédibilité. La confiance se construit avant même le premier contact.",
        },
        {
          icon: "♻️",
          title: "Transforme les clients en revenus récurrents",
          description:
            "Identifie tes promoteurs et recontacte-les au bon moment. Chaque projet réussi devient une opportunité de mission récurrente.",
        },
      ],
    },
    features: {
      title: "Tout ce dont tu as besoin",
      items: [
        {
          icon: "⚡",
          title: "Tout est automatique",
          description:
            "Feedbacks envoyés au bon moment, sans intervention. Tu peux virer ça de ta to-do list.",
        },
        {
          icon: "📈",
          title: "Un seul endroit pour tout",
          description:
            "Tous tes clients, tous leurs feedbacks, tous les scores NPS. Vue d'ensemble totale, une seule source de vérité.",
        },
        {
          icon: "⭐",
          title: "Scores + témoignages",
          description:
            "Collecte NPS 0-10 et citations. Voir qui te recommande vraiment, qui ne l'est pas. Data honnête.",
        },
        {
          icon: "🎖️",
          title: "Affiche ton score",
          description:
            "Badge NPS embeddable sur ton site. Prouve ta qualité en 1 clic. Clients voient ta crédibilité.",
        },
      ],
    },
    results: {
      title: "Les résultats qui comptent",
      stats: [
        {
          number: "5-6h",
          unit: "/mois",
          heading: "Gagnées par client",
          description:
            "Plus de relances manuelles, plus de follow-up Excel. Juste des feedbacks qui arrivent automatiquement.",
        },
        {
          number: "+35%",
          unit: "",
          heading: "Hausse satisfaction",
          description:
            "Les clients aiment la transparence et les feedbacks structurés. Meilleure expérience = plus de recommandations.",
        },
        {
          number: "100%",
          heading: "Des feedbacks centralisés",
          description:
            "Plus de data éparpillée. Un dashboard unique. Tu peux enfin analyser et améliorer avec confiance.",
        },
      ],
    },
    testimonials: {
      title: "Ce qu'ils en disent",
      items: [
        {
          name: "Sophie Laurent",
          title: "Directrice d'Agence",
          company: "Creative Studio Paris",
          quote:
            "Avant ratee.me, je passais des heures à relancer les clients pour les feedbacks. Maintenant, tout est auto. Et mon NPS? Passé de 6 à 8.2 en 3 mois. Les clients adorent la transparence.",
          metric: "NPS +2.2 | Temps -80%",
        },
        {
          name: "Marc Chen",
          title: "Freelancer UX/UI",
          company: "Lyon, France",
          quote:
            "Je pensais que c'était overkill pour moi en tant que solo. Pas du tout. ratee.me m'a économisé 4h par semaine et j'ai enfin de la data sur comment les clients me perçoivent vraiment. Game-changer.",
          metric: "4h/semaine gagnées | Recommandations +3x",
        },
        {
          name: "Alice Moreau",
          title: "Consultante Digital",
          company: "Moreau Consulting",
          quote:
            "Ce qui m'a surprise? La simplicité. Je pensais que ce serait compliqué à mettre en place. 15 minutes plus tard, c'était live. Et maintenant mon badge NPS est sur mon site. Les clients voient ma crédibilité d'emblée.",
          metric: "Setup 15min | Conversions +12%",
        },
      ],
    },
    howItWorks: {
      title: "Comment ça marche, en 30 secondes",
      steps: [
        "Tu crées un projet dans ratee.me (nom client, date livraison, étapes)",
        "À chaque étape complétée, ratee.me envoie un email feedback au client",
        "Le client clique, répond le NPS (0-10) + commentaire",
        "Tu reçois tout dans ton dashboard + un badge pour ton site",
        "Tu vois les trends, tu améliores, tu grandis",
      ],
    },
    pricing: {
      title: "Des prix transparents",
      tiers: [
        {
          name: "Free",
          heading: "Pour tester",
          price: "0€",
          period: "Pour toujours",
          features: [
            "1 utilisateur",
            "Projets illimités",
            "Feedbacks illimités",
            "Score NPS basique",
            "Badge partageable",
          ],
          cta: "Commencer gratuitement",
          popular: false,
        },
        {
          name: "Pro",
          heading: "Pour les freelances et agences",
          price: "19€",
          period: "/mois",
          features: [
            "Utilisateurs illimités",
            "Projets illimités",
            "Feedbacks illimités",
            "Analytics avancée",
            "Badge personnalisable",
            "Export des données",
            "Support prioritaire",
          ],
          cta: "Commencer maintenant",
          popular: true,
          badge: "Recommandé",
        },
        // TODO: Business plan - À implémenter plus tard
        // {
        //   name: "Business",
        //   heading: "Pour les agences",
        //   price: "Sur devis",
        //   period: "Contactez-nous",
        //   features: [
        //     "Tout de Pro +",
        //     "Multi-utilisateurs",
        //     "SSO / SAML",
        //     "API & Webhooks",
        //     "Account manager dédié",
        //   ],
        //   cta: "Demander un devis",
        //   popular: false,
        //   note: "Pour les équipes 5+ personnes",
        // },
      ],
    },
    faq: {
      title: "Questions fréquentes",
      items: [
        {
          question: "Ça prend combien de temps à setup?",
          answer:
            "15 minutes. Tu crées ton compte, tu configures tes étapes, c'est live.",
        },
        {
          question: "Est-ce que mes clients vont aimer recevoir des feedbacks?",
          answer:
            "Oui. 80%+ répondent quand c'est simple (NPS 1-click + commentaire). Et la transparence plaît.",
        },
        {
          question: "Je suis solo, c'est pour moi?",
          answer:
            "Totalement. Solo freelancer ou agence 50 personnes, tout le monde y gagne. Commence avec le plan Free (gratuit).",
        },
        {
          question: "Est-ce que je peux customiser les emails?",
          answer:
            "Sur le plan Pro+. Mais par défaut, on a déjà des templates pro qu'on recommande.",
        },
        {
          question: "Que se passe-t-il si je résilie?",
          answer:
            "Tes données te restent. Tu peux les télécharger en CSV. Zéro rétention.",
        },
      ],
    },
    ctaFinal: {
      headline: "Si tu es arrivé jusque-là, c'est qu'il est temps d'essayer.",
      subheadline:
        "Rejoins les freelances et agences qui ont déjà automatisé leur collecte de feedbacks.",
      ctaPrimary: "Commencer gratuitement",
      ctaSecondary: "Voir les tarifs",
    },
    footer: {
      tagline: "L'outil simple pour ne plus jamais laisser un client de côté",
      product: {
        title: "Produit",
        links: [
          { label: "Features", href: "#features" },
          { label: "Tarifs", href: "/pricing/" },
          // { label: "Demo", href: "#demo" },
          // { label: "Changelog", href: "/changelog" },
        ],
      },
      company: {
        title: "Société",
        links: [
          { label: "About", href: "/about" },
          { label: "Blog", href: "/blog" },
          // { label: "Press", href: "/press" },
        ],
      },
      legal: {
        title: "Legal",
        links: [
          { label: "Politique de confidentialité", href: "/privacy" },
          { label: "Conditions d'utilisation", href: "/terms" },
          // { label: "RGPD", href: "/gdpr" },
          { label: "Contact", href: "mailto:martin@ratee.me" },
        ],
      },
      copyright: "Copyright © 2025 ratee.me. All rights reserved.",
      madeIn: "Made in France 🇫🇷 | Serving the world 🌍",
    },
    nav: {
      features: "Features",
      pricing: "Tarifs",
      demo: "Demo",
      login: "Connexion",
      signup: "Inscription",
    },
    notFound: {
      title: "Page introuvable",
      description: "La page que tu cherches n'existe pas ou a été déplacée.",
      backHome: "Retour à l'accueil",
    },
    feedbackNotFound: {
      title: "Lien de feedback invalide",
      subtitle: "Ce lien de feedback est invalide ou a expiré.",
      description:
        "Le lien de feedback que tu essayes d'accéder n'existe pas ou n'est plus valide.",
      contact:
        "Si tu penses qu'il s'agit d'une erreur, veuillez contacter la personne qui t'a envoyé ce lien.",
      cta: "Aller sur la page d'accueil de ratee.me",
      poweredBy: "Certifié par",
    },
    dashboard: {
      welcome: "Bon retour",
      subtitle: "Voici ce qui se passe avec vos feedbacks clients",
      banners: {
        free: {
          title: "tu es en plan FREE (1 projet/mois)",
          description: "Upgrade pour projets illimités + email automation",
          action: "Upgrade",
        },
        trial: {
          title: "Tu es en PRO (30j gratuit)",
          daysLeft: "jours restants",
          description: "Email automation activée - profitez-en!",
        },
        pro: {
          title: "Tu es en plan PRO - Automations activées",
        },
      },
      stats: {
        totalProjects: "Total Projets",
        totalFeedbacks: "Total Feedbacks",
        avgNPS: "Score NPS Moyen",
        lastFeedback: "Dernier Feedback",
        noFeedbackYet: "Pas encore",
      },
      recentProjects: {
        title: "Projets Récents",
        viewAll: "Voir tout",
        empty: "Pas encore de projets",
        createFirst: "Créer votre premier projet",
        status: {
          delivered: "Livré",
          inProgress: "En cours",
          archived: "Archivé",
        },
      },
      recentFeedbacks: {
        title: "Feedbacks Récents",
        viewAll: "Voir tout",
        empty: "Pas encore de feedbacks",
        emptyDescription:
          "Les feedbacks apparaîtront ici une fois que vos clients répondront",
        noComment: "Pas de commentaire",
      },
    },
    projects: {
      title: "Projets",
      newProject: "Nouveau Projet",
      filters: {
        all: "Tous",
        inProgress: "En cours",
        delivered: "Livrés",
        archived: "Archivés",
      },
      table: {
        headers: {
          project: "Projet",
          client: "Client",
          deliveryDate: "Date de Livraison",
          status: "Statut",
          feedback: "Feedback",
          actions: "Actions",
        },
        empty: "Aucun projet trouvé",
        createFirst: "Créer votre premier projet",
        status: {
          delivered: "Livré",
          inProgress: "En cours",
          archived: "Archivé",
        },
        feedbackStatus: {
          received: "Reçu",
          sent: "Envoyé",
          notSent: "Non envoyé",
        },
        actions: {
          send: "Envoyer",
          edit: "Modifier",
          delete: "Supprimer",
        },
      },
    },
    feedbacks: {
      title: "Feedbacks Clients",
      stats: {
        avgNPS: "Score NPS Moyen",
        promoters: "Promoteurs (9-10)",
        passives: "Passifs (7-8)",
        detractors: "Détracteurs (0-6)",
      },
      list: {
        title: "Tous les Feedbacks",
        empty: "Pas encore de feedbacks",
        emptyDescription:
          "Les feedbacks apparaîtront ici une fois que vos clients répondront",
      },
    },
    settings: {
      title: "Paramètres",
      sections: {
        profile: "Informations du Profil",
        account: "Compte",
        session: "Session",
        dangerZone: "Zone de Danger",
      },
      form: {
        email: {
          label: "Email",
          helper: "L'email ne peut pas être modifié",
        },
        fullName: {
          label: "Nom Complet *",
        },
        companyName: {
          label: "Nom de l'Entreprise",
        },
        avatarUrl: {
          label: "URL Avatar",
          helper: "Optionnel : URL de votre photo de profil",
        },
        save: "Enregistrer les modifications",
        saving: "Enregistrement...",
        successMessage: "Profil mis à jour avec succès!",
      },
      account: {
        accountId: "ID du Compte",
        status: {
          label: "Statut",
          active: "Actif",
        },
      },
      session: {
        signOut: "Se déconnecter",
      },
      dangerZone: {
        description:
          "Une fois que tu supprimes ton compte, il n'y a plus de retour en arrière. Tous tes projets et feedbacks seront définitivement supprimés.",
        deleteAccount: "Supprimer le Compte",
        comingSoon: "Suppression de compte bientôt disponible",
      },
    },
    badge: {
      title: "Badge NPS",
      stats: {
        title: "Vos Statistiques",
        avgNPS: "NPS Moyen",
        promoters: "Promoteurs",
        passives: "Passifs",
        detractors: "Détracteurs",
      },
      preview: {
        title: "Aperçu du Badge",
        description:
          "Voici comment votre badge NPS apparaîtra sur votre site web",
        satisfaction: "Satisfaction Client",
        avgNPS: "Score NPS Moyen",
        totalFeedbacks: "feedbacks au total",
        certified: "Certifié par ratee.me",
        note: "Note",
        noteText:
          "Le badge se met à jour automatiquement quand tu reçois de nouveaux feedbacks !",
      },
      embed: {
        title: "Code d'Intégration",
        description:
          "Copiez ce code et collez-le n'importe où sur votre site web",
        copy: "Copier",
        copied: "Copié!",
        howToUse: "Comment l'utiliser :",
        steps: {
          step1: "Copiez le code d'intégration ci-dessus",
          step2: "Ouvrez le fichier HTML de votre site web",
          step3: "Collez le code là où tu veux que le badge apparaisse",
          step4: "Enregistrez et rafraîchissez votre site web",
        },
        tip: "Astuce",
        tipText:
          "Place ton badge sur ta page d'accueil, page à propos, ou portfolio pour inspirer confiance à tes clients potentiels !",
      },
    },
    navbar: {
      dashboard: "Tableau de bord",
      projects: "Projets",
      feedbacks: "Feedbacks",
      badge: "Badge",
      emailAutomation: "Emails auto",
      settings: "Paramètres",
      language: "Langue",
      logout: "Se déconnecter",
      loggingOut: "Déconnexion...",
    },
  },
  en: {
    hero: {
      headline: "Proof beats promises",
      subheadline:
        "Automate feedback collection. Display your NPS score proudly. Let satisfied clients do the selling for you.",
      description:
        "Freelancer or agency? You manually collect client feedback, chase for testimonials, build reports in Excel. Not anymore. ratee.me automates it all: NPS feedback sent at the right time, testimonials collected automatically, shareable badge for your site. Everything centralized. Everything simple.",
      cta: "Start Free",
      ctaSecondary: "Watch Demo",
    },
    problem: {
      title: "What ratee.me changes for you",
      subtitle:
        "Freelancers and agencies gain efficiency, credibility and revenue.",
      issues: [
        {
          icon: "⏱️",
          title: "Time savings",
          description:
            "Save 5-6 hours per month. No more manual follow-ups, no more Excel files to maintain. Feedback arrives automatically after each project stage.",
          screen: "automation",
        },
        {
          icon: "🏆",
          title: "Enhanced credibility",
          description:
            "Display your NPS score on your site. Prospects instantly see your credibility. Social proof that converts, effortlessly.",
          screen: "badge",
        },
        {
          icon: "🔄",
          title: "Recurring clients",
          description:
            "Identify your most satisfied clients. Reach out at the right time for new projects. Turn every successful project into an opportunity.",
          screen: "dashboard",
        },
        {
          icon: "📈",
          title: "Improved processes",
          description:
            "Client feedback reveals areas for improvement. Analyze trends, identify friction points, and continuously improve your service.",
          screen: "analytics",
        },
      ],
    },
    timeline: {
      title: "Why ratee.me is essential",
      items: [
        {
          icon: "🎯",
          title: "Zero effort, maximum data",
          description:
            "Feedback is sent automatically at each project stage. You do nothing, data arrives. No more forgotten follow-ups.",
        },
        {
          icon: "💎",
          title: "Your reputation, quantified",
          description:
            "An objective, measurable NPS score. No more saying 'my clients are satisfied'. You prove it with numbers.",
        },
        {
          icon: "🚀",
          title: "Convert more prospects",
          description:
            "Display your NPS badge on your site. Prospects instantly see your credibility. Trust is built before the first contact.",
        },
        {
          icon: "♻️",
          title: "Turn clients into recurring revenue",
          description:
            "Identify your promoters and reach out at the right time. Every successful project becomes a recurring opportunity.",
        },
      ],
    },
    features: {
      title: "Everything you need",
      items: [
        {
          icon: "⚡",
          title: "Everything automated",
          description:
            "Feedback sent at the right time, hands-free. Remove it from your to-do forever.",
        },
        {
          icon: "📈",
          title: "One place for everything",
          description:
            "All your clients, all their feedback, all their NPS scores. Complete overview, one source of truth.",
        },
        {
          icon: "⭐",
          title: "Scores + testimonials",
          description:
            "Collect NPS 0-10 and quotes. See who recommends you, who doesn't. Real data.",
        },
        {
          icon: "🎖️",
          title: "Show your score",
          description:
            "Embeddable NPS badge for your site. Prove quality instantly. Clients see your credibility.",
        },
      ],
    },
    results: {
      title: "Results that matter",
      stats: [
        {
          number: "5-6h",
          unit: "/month",
          heading: "Saved per client",
          description:
            "No more manual follow-ups, no more Excel tracking. Just automatic feedback arriving.",
        },
        {
          number: "+35%",
          unit: "",
          heading: "Happier clients",
          description:
            "Clients love transparency and structured feedback. Better experience = more referrals.",
        },
        {
          number: "100%",
          heading: "Centralized feedback",
          description:
            "No more scattered data. One dashboard. You can finally analyze and improve with confidence.",
        },
      ],
    },
    testimonials: {
      title: "What they say",
      items: [
        {
          name: "Sophie Laurent",
          title: "Agency Director",
          company: "Creative Studio Paris",
          quote:
            "Before ratee.me, I spent hours chasing clients for feedback. Now it's all automatic. My NPS? Jumped from 6 to 8.2 in 3 months. Clients love the transparency.",
          metric: "NPS +2.2 | Time -80%",
        },
        {
          name: "Marc Chen",
          title: "Freelance UX/UI Designer",
          company: "Lyon, France",
          quote:
            "I thought it was overkill for a solo freelancer. Nope. ratee.me saved me 4 hours a week and I finally have real data on how clients perceive me. Game-changer.",
          metric: "4h/week saved | Referrals +3x",
        },
        {
          name: "Alice Moreau",
          title: "Digital Consultant",
          company: "Moreau Consulting",
          quote:
            "What surprised me? The simplicity. I thought it'd be complex to set up. 15 minutes later, it was live. Now my NPS badge is on my site. Clients see my credibility instantly.",
          metric: "Setup 15min | Conversions +12%",
        },
      ],
    },
    howItWorks: {
      title: "How it works, in 30 seconds",
      steps: [
        "You create a project in ratee.me (client name, delivery date, stages)",
        "At each stage completion, ratee.me sends feedback email to client",
        "Client clicks, answers NPS (0-10) + comment",
        "You receive everything in your dashboard + a badge for your site",
        "You see trends, improve, grow",
      ],
    },
    pricing: {
      title: "Transparent pricing",
      tiers: [
        {
          name: "Free",
          heading: "To get started",
          price: "$0",
          period: "Forever",
          features: [
            "1 user",
            "Unlimited projects",
            "Unlimited feedbacks",
            "Basic NPS score",
            "Shareable badge",
          ],
          cta: "Start for free",
          popular: false,
        },
        {
          name: "Pro",
          heading: "For freelancers and agencies",
          price: "$19",
          period: "/month",
          features: [
            "Unlimited users",
            "Unlimited projects",
            "Unlimited feedbacks",
            "Advanced analytics",
            "Customizable badge",
            "Data export",
            "Priority support",
          ],
          cta: "Get Started Now",
          popular: true,
          badge: "Recommended",
        },
        // TODO: Business plan - To implement later
        // {
        //   name: "Business",
        //   heading: "For agencies",
        //   price: "Custom",
        //   period: "Contact us",
        //   features: [
        //     "Everything in Pro +",
        //     "Multi-users",
        //     "SSO / SAML",
        //     "API & Webhooks",
        //     "Dedicated account manager",
        //   ],
        //   cta: "Request a quote",
        //   popular: false,
        //   note: "For teams of 5+ people",
        // },
      ],
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          question: "How long does setup take?",
          answer:
            "15 minutes. Create account, configure your stages, you're live.",
        },
        {
          question: "Will my clients like getting feedback requests?",
          answer:
            "Yes. 80%+ respond when it's simple (1-click NPS + comment). And transparency is appreciated.",
        },
        {
          question: "I'm a solo freelancer. Is this for me?",
          answer:
            "Absolutely. Solo or 50-person agency, everyone wins. Start with Free.",
        },
        {
          question: "Can I customize the emails?",
          answer:
            "On Pro+ plans. But we have solid templates we recommend by default.",
        },
        {
          question: "What if I cancel?",
          answer:
            "Your data stays yours. Download as CSV anytime. Zero lock-in.",
        },
      ],
    },
    ctaFinal: {
      headline: "If you've made it this far, it's time to try.",
      subheadline:
        "Join freelancers and agencies who have already automated their feedback collection.",
      ctaPrimary: "Start for Free",
      ctaSecondary: "View pricing",
    },
    footer: {
      tagline: "The simplest way to automate client feedback",
      product: {
        title: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "Tarifs", href: "/pricing/" },
          // { label: "Demo", href: "#demo" },
          // { label: "Changelog", href: "/changelog" },
        ],
      },
      company: {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Blog", href: "/blog" },
          { label: "Careers", href: "/careers" },
          { label: "Press", href: "/press" },
        ],
      },
      legal: {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "/en/privacy" },
          { label: "Terms of Service", href: "/en/terms" },
          { label: "Contact", href: "mailto:legal@ratee.me" },
        ],
      },
      copyright: "Copyright © 2025 ratee.me. All rights reserved.",
      madeIn: "Made in France 🇫🇷 | Serving the world 🌍",
    },
    nav: {
      features: "Features",
      pricing: "Pricing",
      demo: "Demo",
      login: "Login",
      signup: "Sign up",
    },
    notFound: {
      title: "Page not found",
      description:
        "The page you are looking for does not exist or has been moved.",
      backHome: "Back to home",
    },
    feedbackNotFound: {
      title: "Invalid Feedback Link",
      subtitle: "This feedback link is invalid or has expired.",
      description:
        "The feedback link you're trying to access doesn't exist or is no longer valid.",
      contact:
        "If you believe this is an error, please contact the person who sent you this link.",
      cta: "Go to ratee.me Homepage",
      poweredBy: "Powered by",
    },
    dashboard: {
      welcome: "Welcome back",
      subtitle: "Here's what's happening with your client feedback",
      banners: {
        free: {
          title: "You're on the FREE plan (1 project/month)",
          description: "Upgrade for unlimited projects + email automation",
          action: "Upgrade",
        },
        trial: {
          title: "You're on PRO (30-day free trial)",
          daysLeft: "days left",
          description: "Email automation enabled - enjoy!",
        },
        pro: {
          title: "You're on the PRO plan - Automations enabled",
        },
      },
      stats: {
        totalProjects: "Total Projects",
        totalFeedbacks: "Total Feedback",
        avgNPS: "Average NPS Score",
        lastFeedback: "Last Feedback",
        noFeedbackYet: "Not yet",
      },
      recentProjects: {
        title: "Recent Projects",
        viewAll: "View all",
        empty: "No projects yet",
        createFirst: "Create your first project",
        status: {
          delivered: "Delivered",
          inProgress: "In Progress",
          archived: "Archived",
        },
      },
      recentFeedbacks: {
        title: "Recent Feedback",
        viewAll: "View all",
        empty: "No feedback yet",
        emptyDescription: "Feedback will appear here once your clients respond",
        noComment: "No comment",
      },
    },
    projects: {
      title: "Projects",
      newProject: "New Project",
      filters: {
        all: "All",
        inProgress: "In Progress",
        delivered: "Delivered",
        archived: "Archived",
      },
      table: {
        headers: {
          project: "Project",
          client: "Client",
          deliveryDate: "Delivery Date",
          status: "Status",
          feedback: "Feedback",
          actions: "Actions",
        },
        empty: "No projects found",
        createFirst: "Create your first project",
        status: {
          delivered: "Delivered",
          inProgress: "In Progress",
          archived: "Archived",
        },
        feedbackStatus: {
          received: "Received",
          sent: "Sent",
          notSent: "Not Sent",
        },
        actions: {
          send: "Send",
          edit: "Edit",
          delete: "Delete",
        },
      },
    },
    feedbacks: {
      title: "Client Feedback",
      stats: {
        avgNPS: "Average NPS Score",
        promoters: "Promoters (9-10)",
        passives: "Passives (7-8)",
        detractors: "Detractors (0-6)",
      },
      list: {
        title: "All Feedback",
        empty: "No feedback yet",
        emptyDescription: "Feedback will appear here once your clients respond",
      },
    },
    settings: {
      title: "Settings",
      sections: {
        profile: "Profile Information",
        account: "Account",
        session: "Session",
        dangerZone: "Danger Zone",
      },
      form: {
        email: {
          label: "Email",
          helper: "Email cannot be changed",
        },
        fullName: {
          label: "Full Name *",
        },
        companyName: {
          label: "Company Name",
        },
        avatarUrl: {
          label: "Avatar URL",
          helper: "Optional: URL to your profile picture",
        },
        save: "Save Changes",
        saving: "Saving...",
        successMessage: "Profile updated successfully!",
      },
      account: {
        accountId: "Account ID",
        status: {
          label: "Status",
          active: "Active",
        },
      },
      session: {
        signOut: "Log Out",
      },
      dangerZone: {
        description:
          "Once you delete your account, there's no going back. All your projects and feedback will be permanently deleted.",
        deleteAccount: "Delete Account",
        comingSoon: "Account deletion coming soon",
      },
    },
    badge: {
      title: "NPS Badge",
      stats: {
        title: "Your Stats",
        avgNPS: "Average NPS",
        promoters: "Promoters",
        passives: "Passives",
        detractors: "Detractors",
      },
      preview: {
        title: "Badge Preview",
        description: "This is how your NPS badge will appear on your website",
        satisfaction: "Client Satisfaction",
        avgNPS: "Average NPS Score",
        totalFeedbacks: "total feedback",
        certified: "Certified by ratee.me",
        note: "Note",
        noteText:
          "The badge updates automatically when you receive new feedback!",
      },
      embed: {
        title: "Embed Code",
        description: "Copy this code and paste it anywhere on your website",
        copy: "Copy",
        copied: "Copied!",
        howToUse: "How to use:",
        steps: {
          step1: "Copy the embed code above",
          step2: "Open your website's HTML file",
          step3: "Paste the code where you want the badge to appear",
          step4: "Save and refresh your website",
        },
        tip: "Pro tip",
        tipText:
          "Place your badge on your homepage, about page, or portfolio to build trust with potential clients!",
      },
    },
    navbar: {
      dashboard: "Dashboard",
      projects: "Projects",
      feedbacks: "Feedback",
      badge: "Badge",
      emailAutomation: "Emails",
      settings: "Settings",
      language: "Language",
      logout: "Log Out",
      loggingOut: "Logging out...",
    },
  },
} as const;
