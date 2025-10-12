export type Language = 'en' | 'hi';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Common
    'app.title': 'Manifesto Watch - 15 Categories',
    'app.subtitle': 'Track Political Promises & Government Accountability',
    'search': 'Search',
    'filter': 'Filter',
    'clear': 'Clear',
    'apply': 'Apply',
    'close': 'Close',
    'viewDetails': 'View Details',
    'backToHome': 'Back to Home',
    
    // Stats
    'stats.totalPromises': 'Total Promises',
    'stats.measurable': 'Measurable',
    'stats.withBudget': 'With Budget',
    
    // Status
    'status.Announced': 'Announced',
    'status.Actioned': 'Actioned',
    'status.Under implementation': 'Under Implementation',
    'status.Delivered': 'Delivered',
    'status.Deferred': 'Deferred',
    
    // Types
    'type.policy': 'Policy',
    'type.program': 'Program',
    'type.infrastructure': 'Infrastructure',
    'type.legal': 'Legal',
    
    // Timeline
    'timeline.100d': '100 Days',
    'timeline.5yr': '5 Years',
    'timeline.2047': 'Vision 2047',
    
    // Geography
    'geography.national': 'National',
    'geography.state': 'State',
    'geography.urban': 'Urban',
    'geography.rural': 'Rural',
    'geography.mixed': 'Mixed',
    
    // Filters
    'filters.status': 'Status',
    'filters.type': 'Type',
    'filters.timeline': 'Timeline',
    'filters.geography': 'Geography',
    'filters.measurable': 'Measurable Only',
    'filters.hasBudget': 'With Budget',
    
    // Table
    'table.title': 'Promise',
    'table.subTheme': 'Sub-Theme',
    'table.type': 'Type',
    'table.timeline': 'Timeline',
    'table.status': 'Status',
    'table.metric': 'Target Metric',
    
    // Details
    'details.description': 'Description',
    'details.metric': 'Measurable Target',
    'details.citations': 'Citations & Sources',
    'details.budget': 'Budget Mention',
    'details.geography': 'Geographic Scope',
    
    // Empty states
    'empty.noResults': 'No promises found',
    'empty.tryAdjusting': 'Try adjusting your filters',
  },
  hi: {
    // Common
    'app.title': 'घोषणापत्र वॉच - 15 श्रेणियां',
    'app.subtitle': 'राजनीतिक वादों और सरकारी जवाबदेही को ट्रैक करें',
    'search': 'खोजें',
    'filter': 'फ़िल्टर',
    'clear': 'साफ़ करें',
    'apply': 'लागू करें',
    'close': 'बंद करें',
    'viewDetails': 'विवरण देखें',
    'backToHome': 'होम पर वापस',
    
    // Stats
    'stats.totalPromises': 'कुल वादे',
    'stats.measurable': 'मापने योग्य',
    'stats.withBudget': 'बजट के साथ',
    
    // Status
    'status.Announced': 'घोषित',
    'status.Actioned': 'कार्रवाई की गई',
    'status.Under implementation': 'क्रियान्वयन में',
    'status.Delivered': 'पूर्ण',
    'status.Deferred': 'स्थगित',
    
    // Types
    'type.policy': 'नीति',
    'type.program': 'कार्यक्रम',
    'type.infrastructure': 'बुनियादी ढांचा',
    'type.legal': 'कानूनी',
    
    // Timeline
    'timeline.100d': '100 दिन',
    'timeline.5yr': '5 वर्ष',
    'timeline.2047': 'विजन 2047',
    
    // Geography
    'geography.national': 'राष्ट्रीय',
    'geography.state': 'राज्य',
    'geography.urban': 'शहरी',
    'geography.rural': 'ग्रामीण',
    'geography.mixed': 'मिश्रित',
    
    // Filters
    'filters.status': 'स्थिति',
    'filters.type': 'प्रकार',
    'filters.timeline': 'समयरेखा',
    'filters.geography': 'भूगोल',
    'filters.measurable': 'केवल मापने योग्य',
    'filters.hasBudget': 'बजट के साथ',
    
    // Table
    'table.title': 'वादा',
    'table.subTheme': 'उप-विषय',
    'table.type': 'प्रकार',
    'table.timeline': 'समयरेखा',
    'table.status': 'स्थिति',
    'table.metric': 'लक्ष्य मीट्रिक',
    
    // Details
    'details.description': 'विवरण',
    'details.metric': 'मापने योग्य लक्ष्य',
    'details.citations': 'उद्धरण और स्रोत',
    'details.budget': 'बजट उल्लेख',
    'details.geography': 'भौगोलिक दायरा',
    
    // Empty states
    'empty.noResults': 'कोई वादे नहीं मिले',
    'empty.tryAdjusting': 'अपने फ़िल्टर समायोजित करने का प्रयास करें',
  }
};

export const t = (key: string, lang: Language = 'en'): string => {
  return translations[lang][key] || key;
};
