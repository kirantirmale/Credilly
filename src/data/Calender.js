export const englishMonths = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

export const hijriMonths = [
    "01 - Muharram", "02 - Safar", "03 - Rabi' al-Awwal", "04 - Rabi' al-Thani", 
    "05 - Jumada al-Awwal", "06 - Jumada al-Thani", "07 - Rajab", "08 - Sha'ban", 
    "09 - Ramadan", "10 - Shawwal", "11 - Dhul-Qi'dah", "12 - Dhul-Hijjah"
];

const currentYear = new Date().getFullYear();

export const englishYears = Array.from({ length: 100 }, (_, index) => currentYear - index);
export const hijriYears = Array.from({ length: 100 }, (_, index) => 1446 + index);

export const carModels = ["3 Series", "718 Boxter T", "718 Cayman"];
export const banks = ["Standard Bank", "Standard Chartered", "Barclays"];
