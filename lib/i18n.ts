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
  },
  fr: {
    why_us: 'Pourquois Nous',
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
    'hero.subtitle': 'Rejoignez des milliers d\'apprenants maîtrisant l\'allemand avec notre plateforme interactive',
    'hero.cta': 'Commencer à apprendre',
    'progress.level': 'Niveau 2',
    'progress.streak': 'Série',
    popularCourses: 'Cours populaires',
    dailyExercises: 'Exercices quotidiens',
    germanBasics: 'Bases de l\'allemand',
    phrases: 'Phrases & Expressions',
    grammar: 'Grammaire',
    lessons: 'Leçons',
    quizVocab: 'Quiz Vocabulaire',
    listening: 'Pratique d\'écoute',
    readyToPractice: 'Prêt à s\'entraîner ?',
    launchQuiz: 'Lancer un Quiz',
    myDashboard: 'Mon Tableau de bord',
    statistics: 'Statistiques',
    joinSession: 'Rejoindre une session',
    correctAnswers: 'Réponses correctes',
    levels: 'Niveaux A1 - C2',
    adminDashboard: 'Tableau de bord Admin',
    addExercise: 'Ajouter un exercice',
    addMeeting: 'Ajouter une réunion',
    selectUser: 'Sélectionner l\'utilisateur',
    meetingLink: 'Lien de réunion',
    submit: 'Soumettre',
    days: 'jours',
    'lessons.count': 'leçons',
  },
  ar: {
    why_us: 'Why Us',
    appName: 'Deutschly',
    tagline: 'تعلم اللغة الألمانية بسهولة',
    courses: 'الدورات',
    exercises: 'التمارين',
    videos: 'الفيديوهات',
    profile: 'الملف الشخصي',
    login: 'تسجيل الدخول',
    start: 'ابدأ',
    learnGerman: 'تعلم الألمانية',
    'hero.title': 'اتقن اللغة الألمانية بسهولة وفعالية',
    'hero.subtitle': 'انضم إلى آلاف المتعلمين الذين يتقنون اللغة الألمانية من خلال منصتنا التفاعلية',
    'hero.cta': 'ابدأ التعلم',
    'progress.level': 'المستوى 2',
    'progress.streak': 'السلسلة',
    popularCourses: 'الدورات الشهيرة',
    dailyExercises: 'التمارين اليومية',
    germanBasics: 'أساسيات الألمانية',
    phrases: 'الجمل والتعابير',
    grammar: 'القواعد',
    lessons: 'الدروس',
    quizVocab: 'اختبار المفردات',
    listening: 'ممارسة الاستماع',
    readyToPractice: 'هل أنت مستعد للممارسة؟',
    launchQuiz: 'بدء اختبار',
    myDashboard: 'لوحة التحكم الخاصة بي',
    statistics: 'الإحصائيات',
    joinSession: 'الانضمام إلى جلسة',
    correctAnswers: 'الإجابات الصحيحة',
    levels: 'المستويات A1 - C2',
    adminDashboard: 'لوحة تحكم المسؤول',
    addExercise: 'إضافة تمرين',
    addMeeting: 'إضافة اجتماع',
    selectUser: 'اختر المستخدم',
    meetingLink: 'رابط الاجتماع',
    submit: 'إرسال',
    days: 'أيام',
    'lessons.count': 'دروس',
  },
}

export function t(key: TranslationKey, language: Language = 'en'): string {
  return translations[language]?.[key] || key
}

export function getLanguageDirection(language: Language): 'ltr' | 'rtl' {
  return language === 'ar' ? 'rtl' : 'ltr'
}
