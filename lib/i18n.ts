// Simple i18n mock translation system

type TranslationKey =
  | 'why_us'
  | 'appName'
  | 'tagline'
  | 'courses'
  | 'exercises'
  | 'videos'
  | 'profile'
  | 'login'
  | 'start'
  | 'learnGerman'
  | 'hero.title'
  | 'hero.subtitle'
  | 'hero.cta'
  | 'progress.level'
  | 'progress.streak'
  | 'popularCourses'
  | 'dailyExercises'
  | 'germanBasics'
  | 'phrases'
  | 'grammar'
  | 'lessons'
  | 'quizVocab'
  | 'listening'
  | 'readyToPractice'
  | 'launchQuiz'
  | 'myDashboard'
  | 'statistics'
  | 'joinSession'
  | 'correctAnswers'
  | 'levels'
  | 'adminDashboard'
  | 'addExercise'
  | 'addMeeting'
  | 'selectUser'
  | 'meetingLink'
  | 'submit'
  | 'days'
  | 'lessons.count'

  // NEW KEYS 👇
  | 'why.title'
  | 'why.subtitle'
  | 'why.card1.title'
  | 'why.card1.desc'
  | 'why.card1.tag'
  | 'why.card2.title'
  | 'why.card2.desc'
  | 'why.card2.tag'
  | 'why.card3.title'
  | 'why.card3.desc'
  | 'why.card3.tag'
  | 'why.flashcards.title'
  | 'why.flashcards.desc'
  | 'why.flashcards.tag'
  | 'why.grammar.title'
  | 'why.grammar.desc'
  | 'why.grammar.tag'

  | 'cta.title'
  | 'cta.desc'
  | 'cta.button'

  | 'footer.courses'
  | 'footer.basics'
  | 'footer.advanced'
  | 'footer.exercises'
  | 'footer.quiz'
  | 'footer.practice'
  | 'footer.resources'
  | 'footer.blog'
  | 'footer.help'
  | 'footer.community'
  | 'footer.forum'
  | 'footer.events'
  | 'footer.tagline'

type Language = 'en' | 'fr' | 'ar'

const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    why_us: 'Why Us',
    appName: 'Deutschly',
    tagline: 'Learn German Easily',
    courses: 'Courses',
    exercises: 'Exercises',
    videos: 'Videos',
    profile: 'Profile',
    login: 'Login',
    start: 'Get Started',
    learnGerman: 'Learn German',

    'hero.title': 'Master German Easily and Effectively',
    'hero.subtitle': 'Join thousands of learners mastering German with our interactive platform',
    'hero.cta': 'Start Learning',

    'progress.level': 'Level 2',
    'progress.streak': 'Streak',

    popularCourses: 'Popular Courses',
    dailyExercises: 'Daily Exercises',
    germanBasics: 'German Basics',
    phrases: 'Phrases & Expressions',
    grammar: 'Grammar',
    lessons: 'Lessons',
    quizVocab: 'Quiz Vocabulary',
    listening: 'Listening Practice',

    readyToPractice: 'Ready to Practice?',
    launchQuiz: 'Launch a Quiz',

    myDashboard: 'My Dashboard',
    statistics: 'Statistics',
    joinSession: 'Join a Session',
    correctAnswers: 'Correct Answers',
    levels: 'Levels A1 - C2',

    adminDashboard: 'Admin Dashboard',
    addExercise: 'Add Exercise',
    addMeeting: 'Add Meeting',
    selectUser: 'Select User',
    meetingLink: 'Meeting Link',
    submit: 'Submit',
    days: 'days',
    'lessons.count': 'lessons',

    // WHY
    'why.title': 'Why choose Deutschly?',
    'why.subtitle': 'Everything you need to go from Hallo to fluency',

    'why.card1.title': 'Interactive lessons',
    'why.card1.desc': 'Smart exercises adapted to your pace every day',
    'why.card1.tag': 'No boredom',

    'why.card2.title': 'Real-time progress',
    'why.card2.desc': 'Monitor streaks, correct answers and your level',
    'why.card2.tag': 'Daily streaks 🔥',

    'why.card3.title': 'Listen & speak',
    'why.card3.desc': 'Audio lessons with real German conversations',
    'why.card3.tag': 'Native audio',

    'why.flashcards.title': 'Smart flashcards',
    'why.flashcards.desc': 'Spaced-repetition vocab so words actually stick',
    'why.flashcards.tag': '500+ word sets',

    'why.grammar.title': 'Clear grammar rules',
    'why.grammar.desc': 'Visual breakdowns of German structure & cases',
    'why.grammar.tag': 'A1 → B2 levels',

    // CTA
    'cta.title': 'Ready to Practice?',
    'cta.desc': 'Challenge yourself with our interactive quizzes and exercises',
    'cta.button': 'Start Practicing',

    // FOOTER
    'footer.courses': 'Courses',
    'footer.basics': 'Basics',
    'footer.advanced': 'Advanced',

    'footer.exercises': 'Exercises',
    'footer.quiz': 'Quiz',
    'footer.practice': 'Practice',

    'footer.resources': 'Resources',
    'footer.blog': 'Blog',
    'footer.help': 'Help',

    'footer.community': 'Community',
    'footer.forum': 'Forum',
    'footer.events': 'Events',

    'footer.tagline': 'Learn German Easily',
  },

  fr: {
    why_us: 'Pourquoi nous',
    appName: 'Deutschly',
    tagline: 'Apprenez l\'allemand facilement',

    courses: 'Cours',
    exercises: 'Exercices',
    videos: 'Vidéos',
    profile: 'Profil',
    login: 'Connexion',
    start: 'Commencer',
    learnGerman: 'Apprendre l\'allemand',

    'hero.title': 'Apprenez l\'allemand facilement et efficacement',
    'hero.subtitle': 'Rejoignez des milliers d\'apprenants maîtrisant l\'allemand',
    'hero.cta': 'Commencer',

    'progress.level': 'Niveau 2',
    'progress.streak': 'Série',

    readyToPractice: 'Prêt à pratiquer ?',
    launchQuiz: 'Lancer un quiz',

    myDashboard: 'Tableau de bord',
    statistics: 'Statistiques',
    joinSession: 'Rejoindre une session',

    correctAnswers: 'Réponses correctes',
    levels: 'Niveaux A1 - C2',

    addExercise: 'Ajouter un exercice',
    addMeeting: 'Ajouter une réunion',

    selectUser: 'Sélectionner un utilisateur',
    meetingLink: 'Lien de réunion',
    submit: 'Envoyer',

    days: 'jours',
    'lessons.count': 'leçons',

    // WHY
    'why.title': 'Pourquoi choisir Deutschly ?',
    'why.subtitle': 'Tout ce dont vous avez besoin pour devenir fluide',

    'why.card1.title': 'Leçons interactives',
    'why.card1.desc': 'Exercices adaptés à votre rythme',
    'why.card1.tag': 'Sans ennui',

    'why.card2.title': 'Progression en temps réel',
    'why.card2.desc': 'Suivez vos performances',
    'why.card2.tag': 'Streak quotidien 🔥',

    'why.card3.title': 'Écouter & parler',
    'why.card3.desc': 'Audio avec conversations réelles',
    'why.card3.tag': 'Audio natif',

    'why.flashcards.title': 'Cartes intelligentes',
    'why.flashcards.desc': 'Mémorisation efficace',
    'why.flashcards.tag': '500+ mots',

    'why.grammar.title': 'Grammaire claire',
    'why.grammar.desc': 'Explications visuelles',
    'why.grammar.tag': 'A1 → B2',

    // CTA
    'cta.title': 'Prêt à pratiquer ?',
    'cta.desc': 'Testez vos compétences',
    'cta.button': 'Commencer',

    // FOOTER
    'footer.courses': 'Cours',
    'footer.basics': 'Bases',
    'footer.advanced': 'Avancé',

    'footer.exercises': 'Exercices',
    'footer.quiz': 'Quiz',
    'footer.practice': 'Pratique',

    'footer.resources': 'Ressources',
    'footer.blog': 'Blog',
    'footer.help': 'Aide',

    'footer.community': 'Communauté',
    'footer.forum': 'Forum',
    'footer.events': 'Événements',

    'footer.tagline': 'Apprenez facilement',
  },

  ar: {
    why_us: 'لماذا نحن',
    appName: 'Deutschly',
    tagline: 'تعلم الألمانية بسهولة',

    courses: 'الدورات',
    exercises: 'التمارين',
    videos: 'الفيديوهات',
    profile: 'الملف الشخصي',
    login: 'تسجيل الدخول',
    start: 'ابدأ',
    learnGerman: 'تعلم الألمانية',

    'hero.title': 'تعلم الألمانية بسهولة وفعالية',
    'hero.subtitle': 'انضم إلى آلاف المتعلمين',
    'hero.cta': 'ابدأ الآن',

    'progress.level': 'المستوى 2',
    'progress.streak': 'السلسلة',

    readyToPractice: 'هل أنت مستعد؟',
    launchQuiz: 'ابدأ اختبار',

    myDashboard: 'لوحة التحكم',
    statistics: 'الإحصائيات',
    joinSession: 'الانضمام لجلسة',

    correctAnswers: 'الإجابات الصحيحة',
    levels: 'المستويات A1 - C2',

    addExercise: 'إضافة تمرين',
    addMeeting: 'إضافة اجتماع',

    selectUser: 'اختر المستخدم',
    meetingLink: 'رابط الاجتماع',
    submit: 'إرسال',

    days: 'أيام',
    'lessons.count': 'دروس',

    // WHY
    'why.title': 'لماذا تختار Deutschly؟',
    'why.subtitle': 'كل ما تحتاجه لتعلم الألمانية',

    'why.card1.title': 'دروس تفاعلية',
    'why.card1.desc': 'تمارين ذكية يومية',
    'why.card1.tag': 'بدون ملل',

    'why.card2.title': 'تقدم فوري',
    'why.card2.desc': 'تابع مستواك',
    'why.card2.tag': 'سلسلة يومية 🔥',

    'why.card3.title': 'استمع وتحدث',
    'why.card3.desc': 'دروس صوتية حقيقية',
    'why.card3.tag': 'صوت أصلي',

    'why.flashcards.title': 'بطاقات ذكية',
    'why.flashcards.desc': 'تثبيت المفردات',
    'why.flashcards.tag': '500+ كلمة',

    'why.grammar.title': 'قواعد واضحة',
    'why.grammar.desc': 'شرح مبسط',
    'why.grammar.tag': 'A1 → B2',

    // CTA
    'cta.title': 'هل أنت جاهز؟',
    'cta.desc': 'اختبر نفسك',
    'cta.button': 'ابدأ الآن',

    // FOOTER
    'footer.courses': 'الدورات',
    'footer.basics': 'الأساسيات',
    'footer.advanced': 'متقدم',

    'footer.exercises': 'التمارين',
    'footer.quiz': 'اختبار',
    'footer.practice': 'تدريب',

    'footer.resources': 'المصادر',
    'footer.blog': 'مدونة',
    'footer.help': 'مساعدة',

    'footer.community': 'المجتمع',
    'footer.forum': 'منتدى',
    'footer.events': 'فعاليات',

    'footer.tagline': 'تعلم بسهولة',
  },
}

export function t(key: TranslationKey, language: Language = 'en'): string {
  return translations[language]?.[key] || key
}

export function getLanguageDirection(language: Language): 'ltr' | 'rtl' {
  return language === 'ar' ? 'rtl' : 'ltr'
}