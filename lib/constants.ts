export const APP_NAME = 'ratee.me';
export const APP_DESCRIPTION = 'Automate client feedback collection with NPS tracking';

export const API_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// Admin emails - these users have full access to admin pages
export const ADMIN_EMAILS = [
  'martincavil.dev@gmail.com',
] as const;

export const PROJECT_STATUS = {
  IN_PROGRESS: 'in_progress',
  DELIVERED: 'delivered',
  ARCHIVED: 'archived',
} as const;

export const FEEDBACK_STATUS = {
  NOT_SENT: 'not_sent',
  SENT: 'sent',
  RECEIVED: 'received',
} as const;

export const NPS_CATEGORIES = {
  DETRACTOR: 'detractor', // 0-6
  PASSIVE: 'passive', // 7-8
  PROMOTER: 'promoter', // 9-10
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  PROJECTS: '/dashboard/projects',
  FEEDBACKS: '/dashboard/feedbacks',
  BADGE: '/dashboard/badge',
  SETTINGS: '/dashboard/settings',
} as const;

// Landing page content (bilingual)
export const content = {
  fr: {
    hero: {
      headline: "Plus jamais laisser un client de côté",
      subheadline: "Automatise ton suivi client de A à Z. Feedbacks, NPS, citations, tout en pilote automatique.",
      description: "Freelance ou agence? Tu collectes manuellement les feedbacks clients, tu relances pour les avis, tu génères des rapports dans Excel. C'est fini. ratee.me automatise tout : feedbacks NPS envoyés au bon moment, citations collectées, badge à afficher sur ton site. Tout centralisé. Tout simple.",
      cta: "Essayer gratuitement",
      ctaSecondary: "Voir une démo rapide",
    },
    problem: {
      title: "Le problème que tu connais trop bien",
      description: [
        "À la fin d'une mission, tu dois envoyer un mail de feedback. Sauf que tu l'oublies. Ou le client oublie de répondre. Résultat: zéro data sur comment tu vraiment te débrouilles.",
        "Les clients satisfaits ne reviennent jamais d'eux-mêmes. Il faut les demander. Mais tu sais pas qui est vraiment satisfait. Pas de NPS, pas de système. Juste du vent.",
        "Et même si tu collectes les feedbacks, c'est en 5 endroits différents. Un mail ici, un Slack là, une réponse Google Form ailleurs. Pas de dashboard, pas de vue d'ensemble, pas de insights exploitables."
      ],
      issues: [
        {
          icon: "😰",
          title: "Manuellement, c'est un cauchemar",
          description: "Chaque feedback à demander, chaque client à relancer, zero données exploitables"
        },
        {
          icon: "📉",
          title: "Tu perds des recommendations",
          description: "Les clients heureux ne reviennent pas d'eux-mêmes sans un petit coup de pouce"
        },
        {
          icon: "🔀",
          title: "Tout éparpillé partout",
          description: "Email, Slack, Spreadsheets, Notion. Zéro vue d'ensemble."
        }
      ]
    },
    solution: {
      title: "Comment ça marche",
      steps: [
        {
          icon: "⚙️",
          heading: "Configure une fois",
          description: "Définis tes étapes de projet (onboarding, mission, livraison). Choisis quand envoyer les feedbacks. C'est tout."
        },
        {
          icon: "🤖",
          heading: "Laisse la magie opérer",
          description: "À chaque étape complétée, un mail de feedback part automatiquement au client. Zéro effort de ta part."
        },
        {
          icon: "📊",
          heading: "Les données arrivent toutes seules",
          description: "Les clients remplissent le formulaire (1 clic + commentaire). Tu reçois tout dans ton dashboard ratee.me."
        },
        {
          icon: "📈",
          heading: "Utilise les insights pour mieux faire",
          description: "NPS moyen, citations, tendances. Tu sais comment tu performes vraiment. Tu améliores ce qui ne marche pas."
        }
      ]
    },
    features: {
      title: "Tout ce dont tu as besoin",
      items: [
        {
          icon: "⚡",
          title: "Tout est automatique",
          description: "Feedbacks envoyés au bon moment, sans intervention. Tu peux virer ça de ta to-do list."
        },
        {
          icon: "📈",
          title: "Un seul endroit pour tout",
          description: "Tous tes clients, tous leurs feedbacks, tous les scores NPS. Vue d'ensemble totale, une seule source de vérité."
        },
        {
          icon: "⭐",
          title: "Scores + témoignages",
          description: "Collecte NPS 0-10 et citations. Voir qui te recommande vraiment, qui ne l'est pas. Data honnête."
        },
        {
          icon: "🎖️",
          title: "Affiche ton score",
          description: "Badge NPS embeddable sur ton site. Prouve ta qualité en 1 clic. Clients voient ta crédibilité."
        }
      ]
    },
    results: {
      title: "Les résultats qui comptent",
      stats: [
        {
          number: "5-6h",
          unit: "/mois",
          heading: "Gagnées par client",
          description: "Plus de relances manuelles, plus de follow-up Excel. Juste des feedbacks qui arrivent automatiquement."
        },
        {
          number: "+35%",
          unit: "",
          heading: "Hausse satisfaction",
          description: "Les clients aiment la transparence et les feedbacks structurés. Meilleure expérience = plus de recommandations."
        },
        {
          number: "100%",
          unit: "des feedbacks",
          heading: "Centralisés",
          description: "Plus de data éparpillée. Un dashboard unique. Tu peux enfin analyser et améliorer avec confiance."
        }
      ]
    },
    testimonials: {
      title: "Ce qu'ils en disent",
      items: [
        {
          name: "Sophie Laurent",
          title: "Directrice d'Agence",
          company: "Creative Studio Paris",
          quote: "Avant ratee.me, je passais des heures à relancer les clients pour les feedbacks. Maintenant, tout est auto. Et mon NPS? Passé de 6 à 8.2 en 3 mois. Les clients adorent la transparence.",
          metric: "NPS +2.2 | Temps -80%"
        },
        {
          name: "Marc Chen",
          title: "Freelancer UX/UI",
          company: "Lyon, France",
          quote: "Je pensais que c'était overkill pour moi en tant que solo. Pas du tout. ratee.me m'a économisé 4h par semaine et j'ai enfin de la data sur comment les clients me perçoivent vraiment. Game-changer.",
          metric: "4h/semaine gagnées | Recommandations +3x"
        },
        {
          name: "Alice Moreau",
          title: "Consultante Digital",
          company: "Moreau Consulting",
          quote: "Ce qui m'a surprise? La simplicité. Je pensais que ce serait compliqué à mettre en place. 15 minutes plus tard, c'était live. Et maintenant mon badge NPS est sur mon site. Les clients voient ma crédibilité d'emblée.",
          metric: "Setup 15min | Conversions +12%"
        }
      ]
    },
    howItWorks: {
      title: "Comment ça marche, en 30 secondes",
      steps: [
        "Tu crées un projet dans ratee.me (nom client, date livraison, étapes)",
        "À chaque étape complétée, ratee.me envoie un email feedback au client",
        "Le client clique, répond le NPS (0-10) + commentaire",
        "Tu reçois tout dans ton dashboard + un badge pour ton site",
        "Tu vois les trends, tu améliores, tu grandis"
      ]
    },
    pricing: {
      title: "Des prix transparents",
      tiers: [
        {
          name: "Starter",
          heading: "Parfait pour débuter",
          price: "Gratuit",
          period: "Toujours gratuit",
          features: [
            "5 projets",
            "Feedbacks illimités",
            "NPS + citations",
            "Dashboard basique",
            "Badge partageable"
          ],
          cta: "Commencer gratuitement",
          popular: false
        },
        {
          name: "Pro",
          heading: "Pour les agences",
          price: "€29",
          period: "Facturé annuellement (€290/an)",
          features: [
            "Projets illimités",
            "Team members (3)",
            "Intégrations (Slack, Zapier)",
            "Analytics avancée",
            "Support prioritaire"
          ],
          cta: "Essayer 30j gratuitement",
          popular: true,
          badge: "Populaire"
        },
        {
          name: "Enterprise",
          heading: "Sur mesure",
          price: "Sur devis",
          period: "Contact us",
          features: [
            "Tout de Pro, plus",
            "SSO / SAML",
            "Webhooks",
            "Custom integrations",
            "Dedicated support"
          ],
          cta: "Demander une démo",
          popular: false,
          note: "Pour les équipes 50+ personnes"
        }
      ]
    },
    faq: {
      title: "Questions fréquentes",
      items: [
        {
          question: "Ça prend combien de temps à setup?",
          answer: "15 minutes. Tu crées ton compte, tu configures tes étapes, c'est live."
        },
        {
          question: "Est-ce que mes clients vont aimer recevoir des feedbacks?",
          answer: "Oui. 80%+ répondent quand c'est simple (NPS 1-click + commentaire). Et la transparence plaît."
        },
        {
          question: "Je suis solo, c'est pour moi?",
          answer: "Totalement. Solo freelancer ou agence 50 personnes, tout le monde y gagne. Commence avec le plan Starter (gratuit)."
        },
        {
          question: "Est-ce que je peux customiser les emails?",
          answer: "Sur le plan Pro+. Mais par défaut, on a déjà des templates pro qu'on recommande."
        },
        {
          question: "Que se passe-t-il si je résilie?",
          answer: "Tes données te restent. Tu peux les télécharger en CSV. Zéro rétention."
        }
      ]
    },
    ctaFinal: {
      headline: "Prêt à arrêter le suivi manuel?",
      subheadline: "Rejoins 500+ freelances et agences qui automatisent leur suivi client.",
      ctaPrimary: "Essayer gratuitement",
      ctaSecondary: "Voir une démo",
      microcopy: [
        "Plan Starter gratuit",
        "Setup 15 min",
        "Pas de CB requise",
        "Support 24/7"
      ]
    },
    footer: {
      tagline: "L'outil simple pour ne plus jamais laisser un client de côté",
      product: {
        title: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "Demo", href: "#demo" },
          { label: "Changelog", href: "/changelog" }
        ]
      },
      company: {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Blog", href: "/blog" },
          { label: "Careers", href: "/careers" },
          { label: "Press", href: "/press" }
        ]
      },
      legal: {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" },
          { label: "GDPR", href: "/gdpr" },
          { label: "Contact", href: "/contact" }
        ]
      },
      copyright: "Copyright © 2024 ratee.me. All rights reserved.",
      madeIn: "Made in France 🇫🇷 | Serving the world 🌍"
    },
    nav: {
      features: "Features",
      pricing: "Pricing",
      demo: "Demo",
      login: "Connexion",
      signup: "Inscription"
    }
  },
  en: {
    hero: {
      headline: "Never leave a client behind",
      subheadline: "Automate your client feedback end-to-end. NPS scores, testimonials, everything on autopilot.",
      description: "Freelancer or agency? You manually collect client feedback, chase for testimonials, build reports in Excel. Not anymore. ratee.me automates it all: NPS feedback sent at the right time, testimonials collected automatically, shareable badge for your site. Everything centralized. Everything simple.",
      cta: "Try for free",
      ctaSecondary: "See a quick demo",
    },
    problem: {
      title: "The problem you know too well",
      description: [
        "After a project ends, you should send a feedback form. But you forget. Or the client forgets to respond. Result: zero data on how you're actually performing.",
        "Happy clients don't come back on their own. You need to ask. But you don't know who's truly satisfied. No NPS, no system. Just guesses.",
        "Even if you collect feedback, it's scattered everywhere. One email here, a Slack message there, a Google Form response somewhere else. No dashboard. No overview. No actionable insights."
      ],
      issues: [
        {
          icon: "😰",
          title: "Manually, it's a nightmare",
          description: "Every feedback to request, every client to chase, zero actionable data"
        },
        {
          icon: "📉",
          title: "You lose recommendations",
          description: "Happy clients don't come back without a nudge"
        },
        {
          icon: "🔀",
          title: "Everything scattered",
          description: "Email, Slack, Spreadsheets, Notion. Zero overview."
        }
      ]
    },
    solution: {
      title: "How it works",
      steps: [
        {
          icon: "⚙️",
          heading: "Configure once",
          description: "Define your project stages (kickoff, in-progress, delivery). Choose when to send feedback forms. Done."
        },
        {
          icon: "🤖",
          heading: "Let the magic happen",
          description: "When each stage is done, feedback forms are sent automatically. Zero manual work."
        },
        {
          icon: "📊",
          heading: "Data arrives automatically",
          description: "Clients fill the form (1-click NPS + comment). Everything lands in your ratee.me dashboard."
        },
        {
          icon: "📈",
          heading: "Use insights to improve",
          description: "Average NPS, testimonials, trends. You see how you're actually performing. You improve what doesn't work."
        }
      ]
    },
    features: {
      title: "Everything you need",
      items: [
        {
          icon: "⚡",
          title: "Everything automated",
          description: "Feedback sent at the right time, hands-free. Remove it from your to-do forever."
        },
        {
          icon: "📈",
          title: "One place for everything",
          description: "All your clients, all their feedback, all their NPS scores. Complete overview, one source of truth."
        },
        {
          icon: "⭐",
          title: "Scores + testimonials",
          description: "Collect NPS 0-10 and quotes. See who recommends you, who doesn't. Real data."
        },
        {
          icon: "🎖️",
          title: "Show your score",
          description: "Embeddable NPS badge for your site. Prove quality instantly. Clients see your credibility."
        }
      ]
    },
    results: {
      title: "Results that matter",
      stats: [
        {
          number: "5-6h",
          unit: "/month",
          heading: "Saved per client",
          description: "No more manual follow-ups, no more Excel tracking. Just automatic feedback arriving."
        },
        {
          number: "+35%",
          unit: "",
          heading: "Happier clients",
          description: "Clients love transparency and structured feedback. Better experience = more referrals."
        },
        {
          number: "100%",
          unit: "of feedback",
          heading: "Centralized",
          description: "No more scattered data. One dashboard. You can finally analyze and improve with confidence."
        }
      ]
    },
    testimonials: {
      title: "What they say",
      items: [
        {
          name: "Sophie Laurent",
          title: "Agency Director",
          company: "Creative Studio Paris",
          quote: "Before ratee.me, I spent hours chasing clients for feedback. Now it's all automatic. My NPS? Jumped from 6 to 8.2 in 3 months. Clients love the transparency.",
          metric: "NPS +2.2 | Time -80%"
        },
        {
          name: "Marc Chen",
          title: "Freelance UX/UI Designer",
          company: "Lyon, France",
          quote: "I thought it was overkill for a solo freelancer. Nope. ratee.me saved me 4 hours a week and I finally have real data on how clients perceive me. Game-changer.",
          metric: "4h/week saved | Referrals +3x"
        },
        {
          name: "Alice Moreau",
          title: "Digital Consultant",
          company: "Moreau Consulting",
          quote: "What surprised me? The simplicity. I thought it'd be complex to set up. 15 minutes later, it was live. Now my NPS badge is on my site. Clients see my credibility instantly.",
          metric: "Setup 15min | Conversions +12%"
        }
      ]
    },
    howItWorks: {
      title: "How it works, in 30 seconds",
      steps: [
        "You create a project in ratee.me (client name, delivery date, stages)",
        "At each stage completion, ratee.me sends feedback email to client",
        "Client clicks, answers NPS (0-10) + comment",
        "You receive everything in your dashboard + a badge for your site",
        "You see trends, improve, grow"
      ]
    },
    pricing: {
      title: "Transparent pricing",
      tiers: [
        {
          name: "Starter",
          heading: "Perfect to start",
          price: "Free",
          period: "Always free",
          features: [
            "5 projects",
            "Unlimited feedbacks",
            "NPS + testimonials",
            "Basic dashboard",
            "Shareable badge"
          ],
          cta: "Start free",
          popular: false
        },
        {
          name: "Pro",
          heading: "For growing teams",
          price: "$29",
          period: "Billed yearly ($290/year)",
          features: [
            "Unlimited projects",
            "Team members (3)",
            "Integrations (Slack, Zapier)",
            "Advanced analytics",
            "Priority support"
          ],
          cta: "Try free 30 days",
          popular: true,
          badge: "Most popular"
        },
        {
          name: "Enterprise",
          heading: "Custom",
          price: "Custom",
          period: "Contact us",
          features: [
            "Everything in Pro, plus",
            "SSO / SAML",
            "Webhooks",
            "Custom integrations",
            "Dedicated support"
          ],
          cta: "Request demo",
          popular: false,
          note: "For teams 50+ people"
        }
      ]
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          question: "How long does setup take?",
          answer: "15 minutes. Create account, configure your stages, you're live."
        },
        {
          question: "Will my clients like getting feedback requests?",
          answer: "Yes. 80%+ respond when it's simple (1-click NPS + comment). And transparency is appreciated."
        },
        {
          question: "I'm a solo freelancer. Is this for me?",
          answer: "Absolutely. Solo or 50-person agency, everyone wins. Start with Starter (free)."
        },
        {
          question: "Can I customize the emails?",
          answer: "On Pro+ plans. But we have solid templates we recommend by default."
        },
        {
          question: "What if I cancel?",
          answer: "Your data stays yours. Download as CSV anytime. Zero lock-in."
        }
      ]
    },
    ctaFinal: {
      headline: "Ready to stop manual follow-ups?",
      subheadline: "Join 500+ freelancers and agencies automating their client feedback.",
      ctaPrimary: "Try for free",
      ctaSecondary: "Watch demo",
      microcopy: [
        "Free Starter plan",
        "15 min setup",
        "No credit card",
        "24/7 support"
      ]
    },
    footer: {
      tagline: "The simplest way to automate client feedback",
      product: {
        title: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "Demo", href: "#demo" },
          { label: "Changelog", href: "/changelog" }
        ]
      },
      company: {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Blog", href: "/blog" },
          { label: "Careers", href: "/careers" },
          { label: "Press", href: "/press" }
        ]
      },
      legal: {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" },
          { label: "GDPR", href: "/gdpr" },
          { label: "Contact", href: "/contact" }
        ]
      },
      copyright: "Copyright © 2024 ratee.me. All rights reserved.",
      madeIn: "Made in France 🇫🇷 | Serving the world 🌍"
    },
    nav: {
      features: "Features",
      pricing: "Pricing",
      demo: "Demo",
      login: "Login",
      signup: "Sign up"
    }
  }
} as const;
