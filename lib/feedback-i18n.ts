export type FeedbackLanguage = 'fr' | 'en';

export const feedbackTranslations = {
  fr: {
    title: "Nous aimerions avoir votre avis !",
    subtitle: "Projet :",
    description: "Votre retour nous aide à nous améliorer et à livrer de meilleurs résultats",

    nps: {
      title: "Quelle est la probabilité que vous nous recommandiez à un ami ou un collègue ?",
      notLikely: "Pas du tout probable",
      veryLikely: "Extrêmement probable",
      labels: {
        detractor: "Détracteur",
        passive: "Passif",
        promoter: "Promoteur",
        superPromoter: "Super Promoteur",
      },
      scoreLabel: "Score :",
    },

    ratings: {
      title: "Comment évalueriez-vous les aspects suivants ?",
      communication: {
        title: "Communication",
        description: "Clarté, réactivité, écoute",
      },
      quality: {
        title: "Qualité du travail",
        description: "Professionnalisme, attention aux détails",
      },
      deadlines: {
        title: "Respect des délais",
        description: "Ponctualité, respect des échéances",
      },
      value: {
        title: "Rapport qualité/prix",
        description: "Valeur perçue du service",
      },
      overall: {
        title: "Satisfaction globale",
        description: "Expérience générale",
      },
      stars: {
        1: "Très insatisfait",
        2: "Insatisfait",
        3: "Neutre",
        4: "Satisfait",
        5: "Très satisfait",
      },
    },

    form: {
      name: "Votre nom",
      nameRequired: "Nom requis",
      email: "Votre email (optionnel)",
      comment: "Que pourrions-nous améliorer ? (optionnel)",
      commentPlaceholder: "Partagez vos suggestions...",
      submit: "Envoyer mon avis",
      submitting: "Envoi en cours...",
    },

    errors: {
      selectScore: "Veuillez sélectionner un score NPS",
      nameRequired: "Le nom est requis",
      submitError: "Une erreur est survenue. Veuillez réessayer.",
    },

    footer: "Propulsé par",
  },

  en: {
    title: "We'd love your feedback!",
    subtitle: "Project:",
    description: "Your feedback helps us improve and deliver better results",

    nps: {
      title: "How likely are you to recommend us to a friend or colleague?",
      notLikely: "Not likely at all",
      veryLikely: "Extremely likely",
      labels: {
        detractor: "Detractor",
        passive: "Passive",
        promoter: "Promoter",
        superPromoter: "Super Promoter",
      },
      scoreLabel: "Score:",
    },

    ratings: {
      title: "How would you rate the following aspects?",
      communication: {
        title: "Communication",
        description: "Clarity, responsiveness, listening",
      },
      quality: {
        title: "Quality of work",
        description: "Professionalism, attention to detail",
      },
      deadlines: {
        title: "Respect of deadlines",
        description: "Punctuality, meeting deadlines",
      },
      value: {
        title: "Value for money",
        description: "Perceived value of service",
      },
      overall: {
        title: "Overall satisfaction",
        description: "General experience",
      },
      stars: {
        1: "Very dissatisfied",
        2: "Dissatisfied",
        3: "Neutral",
        4: "Satisfied",
        5: "Very satisfied",
      },
    },

    form: {
      name: "Your name",
      nameRequired: "Name required",
      email: "Your email (optional)",
      comment: "What could we improve? (optional)",
      commentPlaceholder: "Share your thoughts...",
      submit: "Submit Feedback",
      submitting: "Submitting...",
    },

    errors: {
      selectScore: "Please select an NPS score",
      nameRequired: "Name is required",
      submitError: "An error occurred. Please try again.",
    },

    footer: "Powered by",
  },
};

export function getFeedbackText(lang: FeedbackLanguage) {
  return feedbackTranslations[lang];
}
