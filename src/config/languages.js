/**
 * Centralized Language Configuration
 * All 22 Scheduled Languages of the Republic of India + English
 * Eighth Schedule to the Constitution of India
 */

export const SUPPORTED_LANGUAGES = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', script: 'Devanagari', direction: 'ltr' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', script: 'Tamil', direction: 'ltr' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', script: 'Devanagari', direction: 'ltr' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', script: 'Arabic-Persian', direction: 'rtl' },
  { code: 'en', name: 'English', nativeName: 'English', script: 'Latin', direction: 'ltr' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', script: 'Telugu', direction: 'ltr' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', script: 'Bengali', direction: 'ltr' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', script: 'Gujarati', direction: 'ltr' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', script: 'Kannada', direction: 'ltr' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', script: 'Malayalam', direction: 'ltr' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', script: 'Gurmukhi', direction: 'ltr' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', script: 'Odia', direction: 'ltr' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', script: 'Bengali-Assamese', direction: 'ltr' },
  { code: 'mai', name: 'Maithili', nativeName: 'मैथिली', script: 'Devanagari', direction: 'ltr' },
  { code: 'sat', name: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ', script: 'Ol Chiki', direction: 'ltr' },
  { code: 'ks', name: 'Kashmiri', nativeName: 'کٲشُر', script: 'Perso-Arabic', direction: 'rtl' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', script: 'Devanagari', direction: 'ltr' },
  { code: 'kok', name: 'Konkani', nativeName: 'कोंकणी', script: 'Devanagari', direction: 'ltr' },
  { code: 'doi', name: 'Dogri', nativeName: 'डोगरी', script: 'Devanagari', direction: 'ltr' },
  { code: 'sd', name: 'Sindhi', nativeName: 'سنڌي', script: 'Perso-Arabic', direction: 'rtl' },
  { code: 'brx', name: 'Bodo', nativeName: 'बर’', script: 'Devanagari', direction: 'ltr' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', script: 'Devanagari', direction: 'ltr' },
  { code: 'mni', name: 'Manipuri', nativeName: 'মৈতৈলোন্', script: 'Bengali/Meetei', direction: 'ltr' }
];

export const DEMO_MULTILINGUAL_SAMPLES = [
  {
    id: 'sample-hi',
    langCode: 'hi',
    langName: 'Hindi',
    nativeLabel: 'हिन्दी',
    title: 'Hindi Certified Daily Report',
    activity: 'Earthwork Excavation (A101)',
    text: 'आज ज़ोन ए में 1200 घन मीटर मिट्टी की खुदाई पूरी की गई। काम चेनिज 10+200 से 10+800 तक किया गया। मौसम साफ था। 4 उत्खननकर्ता और 12 टिपर तैनात किए गए थे।'
  },
  {
    id: 'sample-ta',
    langCode: 'ta',
    langName: 'Tamil',
    nativeLabel: 'தமிழ்',
    title: 'Tamil Certified Daily Report',
    activity: 'Earthwork Excavation (A101)',
    text: 'இன்று மண்டலம் A-வில் 1200 கன மீட்டர் மண் அகழ்வு பணி முடிக்கப்பட்டது. பணி 10+200 முதல் 10+800 வரை மேற்கொள்ளப்பட்டது. வானிலை தெளிவாக இருந்தது.'
  },
  {
    id: 'sample-mr',
    langCode: 'mr',
    langName: 'Marathi',
    nativeLabel: 'मराठी',
    title: 'Marathi Certified Daily Report',
    activity: 'Earthwork Excavation (A101)',
    text: 'आज झोन A मध्ये 1200 घनमीटर माती खोदकाम पूर्ण झाले. काम चेनेज 10+200 ते 10+800 पर्यंत केले गेले. हवामान स्वच्छ होते. साइट अभियंता राजेश शर्मा यांनी प्रमाणित केले.'
  },
  {
    id: 'sample-ur',
    langCode: 'ur',
    langName: 'Urdu',
    nativeLabel: 'اردو',
    title: 'Urdu Certified Daily Report',
    activity: 'Earthwork Excavation (A101)',
    text: 'آج زون A میں 1200 کیوبک میٹر مٹی کی کھدائی مکمل کی گئی۔ کام چینج 10+200 سے 10+800 تک کیا گیا۔ موسم صاف تھا اور تمام مشینری معمول کے مطابق کام کر رہی تھی۔'
  },
  {
    id: 'sample-te',
    langCode: 'te',
    langName: 'Telugu',
    nativeLabel: 'తెలుగు',
    title: 'Telugu Field Report',
    activity: 'Earthwork Excavation (A101)',
    text: 'ఈరోజు జోన్ A లో 1200 ఘనపు మీటర్ల మట్టి తవ్వకం పనులు పూర్తయ్యాయి. పని చైనేజ్ 10+200 నుండి 10+800 వరకు జరిగింది. వాతావరణం అనుకూలంగా ఉంది.'
  },
  {
    id: 'sample-bn',
    langCode: 'bn',
    langName: 'Bengali',
    nativeLabel: 'বাংলা',
    title: 'Bengali Daily Progress Report',
    activity: 'Earthwork Excavation (A101)',
    text: 'আজ জোন A তে ১২০০ ঘনমিটার মাটি খনন কাজ সম্পন্ন হয়েছে। কাজ চেইনেজ ১০+২০০ থেকে ১০+৮০০ পর্যন্ত করা হয়েছিল। ৪টি এক্সকাভেটর নিয়োজিত ছিল।'
  },
  {
    id: 'sample-en',
    langCode: 'en',
    langName: 'English',
    nativeLabel: 'English',
    title: 'Standard Certified Site Report',
    activity: 'Earthwork Excavation (A101)',
    text: 'Today, 1,200 cubic metres of earthwork excavation was completed in Zone A from Chainage 10+200 to 10+800. Weather clear, 4x excavators and 12x tippers deployed. Certified by Resident Engineer Rajesh Sharma on 04 Sep 2026.'
  }
];
