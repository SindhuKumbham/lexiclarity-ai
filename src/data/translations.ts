export type SupportedLanguage = 'en' | 'hi' | 'es' | 'te' | 'ta';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  regionFocus: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🌐', regionFocus: 'Global / US / UK' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', regionFocus: 'India (National Official)' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', regionFocus: 'Spain / Latin America / US' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', regionFocus: 'Telangana & Andhra Pradesh' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', regionFocus: 'Tamil Nadu & Singapore' }
];

export interface ClauseTranslationMap {
  [clauseId: string]: {
    [lang in SupportedLanguage]?: {
      plainText: string;
      obligation: string;
      advice: string;
    };
  };
}

export const CLAUSE_TRANSLATIONS: ClauseTranslationMap = {
  'cl-lease-1': {
    en: {
      plainText: 'If you want to move out when your lease ends, you must send a certified physical letter at least 60 days before the deadline. Emails or phone calls do not count. If you forget, you are automatically locked into another whole year with a 15% rent increase.',
      obligation: 'Must send certified registered postal mail on or before December 2, 2025 to avoid auto-locking into another full year.',
      advice: 'Set three calendar alerts: 90 days, 75 days, and 65 days before lease end. If you want to move out, send the certified letter early with stamped proof.'
    },
    hi: {
      plainText: 'यदि आप लीज समाप्त होने पर मकान खाली करना चाहते हैं, तो आपको अंतिम तिथि से कम से कम 60 दिन पहले डाक (Certified Mail) द्वारा लिखित नोटिस भेजना होगा। ईमेल या फोन कॉल मान्य नहीं होंगे। यदि आप चूक जाते हैं, तो आपकी लीज 15% किराए की बढ़ोतरी के साथ 1 साल के लिए स्वतः रिन्यू हो जाएगी।',
      obligation: 'स्वतः रिन्यूअल से बचने के लिए 2 दिसंबर 2025 तक डाक से लिखित नोटिस अनिवार्य है।',
      advice: 'लीज खत्म होने से 90 दिन और 65 दिन पहले रिमाइंडर सेट करें और डाक रसीद सुरक्षित रखें।'
    },
    es: {
      plainText: 'Si desea mudarse al terminar su contrato, debe enviar una carta física certificada al menos 60 días antes de la fecha límite. Los correos electrónicos o llamadas no cuentan. Si lo olvida, quedará atrapado automáticamente por otro año completo con un aumento de renta del 15%.',
      obligation: 'Debe enviar correo certificado antes del 2 de diciembre de 2025 para evitar renovación automática.',
      advice: 'Programe recordatorios en su calendario con 90 y 65 días de anticipación y exija recibo firmado.'
    },
    te: {
      plainText: 'లీజు గడువు ముగిసిన తర్వాత మీరు ఖాళీ చేయాలనుకుంటే, గడువుకు కనీసం 60 రోజుల ముందు రిజిస్టర్డ్ పోస్ట్ ద్వారా రాతపూర్వక నోటీసు పంపాలి. ఈమెయిల్ లేదా ఫోన్ కాల్స్ చెల్లవు. మీరు మర్చిపోతే, 15% అద్దె పెంపుతో మరో సంవత్సరం ఆటోమేటిక్‌గా పొడిగించబడుతుంది.',
      obligation: 'ఆటోమేటిక్ రెన్యూవల్ నివారించడానికి డిసెంబర్ 2, 2025 లోపు పోస్టు ద్వారా నోటీసు పంపడం తప్పనిసరి.',
      advice: 'లీజు ముగింపుకు 90 రోజుల ముందు క్యాలెండర్ రిమైండర్లను సెట్ చేసుకోండి.'
    },
    ta: {
      plainText: 'குத்தகை முடிவடைந்ததும் நீங்கள் வீட்டை காலி செய்ய விரும்பினால், காலக்கெடுவிற்கு குறைந்தபட்சம் 60 நாட்களுக்கு முன்பு பதிவு தபால் மூலம் எழுத்துப்பூர்வ அறிவிப்பை அனுப்ப வேண்டும். மின்னஞ்சல் அல்லது தொலைபேசி அழைப்பு செல்லாது. தவறினால், 15% வாடகை உயர்வுடன் மேலும் ஒரு வருடத்திற்கு தானாகவே புதுப்பிக்கப்படும்.',
      obligation: 'தானாக புதுப்பிக்கப்படுவதைத் தவிர்க்க டிசம்பர் 2, 2025 க்குள் பதிவு தபால் அனுப்ப வேண்டும்.',
      advice: 'முடிவடைவதற்கு 90 நாட்களுக்கு முன்பே நினைவூட்டல்களை அமைத்து தபால் ரசீதை பாதுகாக்கவும்.'
    }
  },
  'cl-lease-4': {
    en: {
      plainText: 'You agree to protect the landlord and pay for their lawyers if an injury or accident happens in the building—even if the accident was caused by the landlord’s own carelessness or negligence!',
      obligation: 'Pay landlord legal expenses and damages even if landlord was at fault.',
      advice: 'Strike out "even if caused in whole or in part by the active or passive negligence of Landlord" and replace with mutual fault indemnity.'
    },
    hi: {
      plainText: 'यदि भवन में कोई दुर्घटना होती है, तो आपको मकान मालिक की कानूनी फीस और हर्जाना भरना होगा—भले ही वह दुर्घटना मकान मालिक की अपनी लापरवाही के कारण हुई हो! यह एक गंभीर और अनुचित शर्त है।',
      obligation: 'मकान मालिक की खुद की गलती होने पर भी उनके कानूनी खर्चे आपको वहन करने होंगे।',
      advice: 'इस शर्त को तुरंत हटाने की मांग करें क्योंकि कई राज्यों के कानून में यह गैर-कानूनी मानी जाती है।'
    },
    es: {
      plainText: 'Usted acepta proteger al propietario y pagar a sus abogados si ocurre un accidente en el edificio, ¡incluso si el accidente fue causado por negligencia o descuido del propio propietario!',
      obligation: 'Pagar gastos legales del arrendador aun cuando el arrendador sea el culpable.',
      advice: 'Elimine esta cláusula de inmediato y exija indemnización mutua solo por dolo o negligencia grave.'
    },
    te: {
      plainText: 'భవనంలో ఏదైనా ప్రమాదం జరిగితే, యజమాని నిర్లక్ష్యం వల్ల జరిగినప్పటికీ వారి తరపు న్యాయవాది ఖర్చులు మరియు నష్టపరిహారం మీరే చెల్లించాలి! ఇది చాలా ఏకపక్షమైన నిబంధన.',
      obligation: 'యజమాని తప్పు చేసినప్పటికీ వారి లీగల్ ఖర్చులు భరించవలసి ఉంటుంది.',
      advice: 'ఈ నిబంధనను సవరించి యజమాని స్వంత తప్పులకు బాధ్యత వహించేలా డిమాండ్ చేయండి.'
    },
    ta: {
      plainText: 'கட்டடத்தில் விபத்து ஏற்பட்டால், அது நில உரிமையாளரின் சொந்த கவனக்குறைவால் ஏற்பட்டிருந்தாலும் கூட, நீங்கள் அவர்களின் வழக்கறிஞர் கட்டணத்தையும் இழப்பீட்டையும் செலுத்த வேண்டும்!',
      obligation: 'நில உரிமையாளரின் தவறுக்கும் நீங்கள் சட்ட செலவுகளை ஏற்க வேண்டியிருக்கும்.',
      advice: 'இந்த நிபந்தனையை உடனடியாக நீக்குமாறு கோருங்கள்; இது ஒருதலைப்பட்சமான அநீதியாகும்.'
    }
  }
};
