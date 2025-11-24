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
  LOGIN: "/login",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
  PROJECTS: "/dashboard/projects",
  FEEDBACKS: "/dashboard/feedbacks",
  BADGE: "/dashboard/badge",
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
      title: "Ce que ratee.me change pour vous",
      subtitle: "Freelances et agences gagnent en efficacité, en crédibilité et en revenus.",
      issues: [
        {
          icon: "⏱️",
          title: "Gain de temps",
          description:
            "Économisez 5 à 6 heures par mois. Plus de relances manuelles, plus de fichiers Excel à maintenir. Les feedbacks arrivent automatiquement après chaque étape projet.",
          screen: "automation",
        },
        {
          icon: "🏆",
          title: "Légitimité renforcée",
          description:
            "Affichez votre score NPS sur votre site. Vos prospects voient immédiatement votre crédibilité. La preuve sociale qui convertit, sans effort.",
          screen: "badge",
        },
        {
          icon: "🔄",
          title: "Clients récurrents",
          description:
            "Identifiez vos clients les plus satisfaits. Recontactez-les au bon moment pour de nouvelles missions. Transformez chaque projet réussi en opportunité.",
          screen: "dashboard",
        },
        {
          icon: "📈",
          title: "Process améliorés",
          description:
            "Les retours clients révèlent vos axes d'amélioration. Analysez les tendances, identifiez les points de friction, et améliorez continuellement votre service.",
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
            "Les feedbacks s'envoient automatiquement à chaque étape projet. Vous ne faites rien, les données arrivent. Fini les relances oubliées.",
        },
        {
          icon: "💎",
          title: "Votre réputation, quantifiée",
          description:
            "Un score NPS objectif et mesurable. Plus besoin de dire 'mes clients sont satisfaits'. Vous le prouvez avec des chiffres.",
        },
        {
          icon: "🚀",
          title: "Convertissez plus de prospects",
          description:
            "Affichez votre badge NPS sur votre site. Les prospects voient immédiatement votre crédibilité. La confiance se construit avant même le premier contact.",
        },
        {
          icon: "♻️",
          title: "Transformez les clients en revenus récurrents",
          description:
            "Identifiez vos promoteurs et recontactez-les au bon moment. Chaque projet réussi devient une opportunité de mission récurrente.",
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
          unit: "des feedbacks",
          heading: "Centralisés",
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
            "1 projet actif",
            "3 feedbacks/mois",
            "Score NPS basique",
            "Badge partageable",
          ],
          cta: "Commencer gratuitement",
          popular: false,
        },
        {
          name: "Pro",
          heading: "Pour les freelances",
          price: "19€",
          period: "/mois",
          features: [
            "Projets illimités",
            "Feedbacks illimités",
            "Analytics avancée",
            "Badge personnalisable",
            "Export des données",
            "Support prioritaire",
          ],
          cta: "Essayer 14 jours gratuits",
          popular: true,
          badge: "Recommandé",
        },
        {
          name: "Business",
          heading: "Pour les agences",
          price: "Sur devis",
          period: "Contactez-nous",
          features: [
            "Tout de Pro, plus",
            "Multi-utilisateurs",
            "SSO / SAML",
            "API & Webhooks",
            "Account manager dédié",
          ],
          cta: "Demander un devis",
          popular: false,
          note: "Pour les équipes 5+ personnes",
        },
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
            "Totalement. Solo freelancer ou agence 50 personnes, tout le monde y gagne. Commence avec le plan Starter (gratuit).",
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
      headline: "Si vous êtes arrivé jusque-là, c'est qu'il est temps d'essayer.",
      subheadline:
        "Rejoignez les freelances et agences qui ont déjà automatisé leur collecte de feedbacks.",
      ctaPrimary: "Commencer gratuitement",
      ctaSecondary: "Voir les tarifs",
    },
    footer: {
      tagline: "L'outil simple pour ne plus jamais laisser un client de côté",
      product: {
        title: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "Demo", href: "#demo" },
          { label: "Changelog", href: "/changelog" },
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
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" },
          { label: "GDPR", href: "/gdpr" },
          { label: "Contact", href: "/contact" },
        ],
      },
      copyright: "Copyright © 2024 ratee.me. All rights reserved.",
      madeIn: "Made in France 🇫🇷 | Serving the world 🌍",
    },
    nav: {
      features: "Features",
      pricing: "Pricing",
      demo: "Demo",
      login: "Connexion",
      signup: "Inscription",
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
      subtitle: "Freelancers and agencies gain efficiency, credibility and revenue.",
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
          unit: "of feedback",
          heading: "Centralized",
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
            "1 active project",
            "3 feedbacks/month",
            "Basic NPS score",
            "Shareable badge",
          ],
          cta: "Start for free",
          popular: false,
        },
        {
          name: "Pro",
          heading: "For freelancers",
          price: "$19",
          period: "/month",
          features: [
            "Unlimited projects",
            "Unlimited feedbacks",
            "Advanced analytics",
            "Customizable badge",
            "Data export",
            "Priority support",
          ],
          cta: "Try 14 days free",
          popular: true,
          badge: "Recommended",
        },
        {
          name: "Business",
          heading: "For agencies",
          price: "Custom",
          period: "Contact us",
          features: [
            "Everything in Pro, plus",
            "Multi-users",
            "SSO / SAML",
            "API & Webhooks",
            "Dedicated account manager",
          ],
          cta: "Request a quote",
          popular: false,
          note: "For teams of 5+ people",
        },
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
            "Absolutely. Solo or 50-person agency, everyone wins. Start with Starter (free).",
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
      ctaPrimary: "Start for free",
      ctaSecondary: "View pricing",
    },
    footer: {
      tagline: "The simplest way to automate client feedback",
      product: {
        title: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "Demo", href: "#demo" },
          { label: "Changelog", href: "/changelog" },
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
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" },
          { label: "GDPR", href: "/gdpr" },
          { label: "Contact", href: "/contact" },
        ],
      },
      copyright: "Copyright © 2024 ratee.me. All rights reserved.",
      madeIn: "Made in France 🇫🇷 | Serving the world 🌍",
    },
    nav: {
      features: "Features",
      pricing: "Pricing",
      demo: "Demo",
      login: "Login",
      signup: "Sign up",
    },
  },
} as const;
