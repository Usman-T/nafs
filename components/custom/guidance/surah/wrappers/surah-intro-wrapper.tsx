import React from "react";
import SurahIntro from "../surah-intro";

const surah = [

  {
    id: 1,
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    translation:
      "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
    transliteration: "Bismillahir rahmanir raheem",
    wordByWord: [
      { arabic: "بِسْمِ", translation: "In (the) name" },
      { arabic: "اللَّهِ", translation: "(of) Allah" },
      { arabic: "الرَّحْمَٰنِ", translation: "the Most Gracious" },
      { arabic: "الرَّحِيمِ", translation: "the Most Merciful" },
    ],
    tafsir:
      "This verse is known as the Basmalah, and it is recommended to recite it before starting any action. It acknowledges that everything we do is with the permission and blessing of Allah, who is described with two of His beautiful names: Ar-Rahman (the Most Gracious) and Ar-Raheem (the Most Merciful).",
    audio: "https://example.com/audio/1_1.mp3",
  },
  {
    id: 2,
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    translation: "All praise is due to Allah, Lord of the worlds.",
    transliteration: "Alhamdu lillahi rabbil 'alamin",
    wordByWord: [
      { arabic: "الْحَمْدُ", translation: "All praise" },
      { arabic: "لِلَّهِ", translation: "(is) for Allah" },
      { arabic: "رَبِّ", translation: "(the) Lord" },
      { arabic: "الْعَالَمِينَ", translation: "(of) the worlds" },
    ],
    tafsir:
      "This verse establishes that all praise belongs to Allah alone, who is the Lord and Sustainer of all creation. The term 'worlds' refers to everything that exists, including all creatures, realms, and dimensions.",
    audio: "https://example.com/audio/1_2.mp3",
  },
  {
    id: 3,
    arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
    translation: "The Entirely Merciful, the Especially Merciful.",
    transliteration: "Ar-Rahmanir-Raheem",
    wordByWord: [
      { arabic: "الرَّحْمَٰنِ", translation: "The Most Gracious" },
      { arabic: "الرَّحِيمِ", translation: "the Most Merciful" },
    ],
    tafsir:
      "This verse repeats the two beautiful names of Allah mentioned in the Basmalah, emphasizing His all-encompassing mercy. Ar-Rahman refers to the general mercy that Allah extends to all creation, while Ar-Raheem refers to the special mercy He bestows upon the believers.",
    audio: "https://example.com/audio/1_3.mp3",
  },
  {
    id: 4,
    arabic: "مَالِكِ يَوْمِ الدِّينِ",
    translation: "Sovereign of the Day of Recompense.",
    transliteration: "Maliki yawmid-deen",
    wordByWord: [
      { arabic: "مَالِكِ", translation: "Master" },
      { arabic: "يَوْمِ", translation: "(of the) Day" },
      { arabic: "الدِّينِ", translation: "(of) Judgment" },
    ],
    tafsir:
      "This verse highlights Allah's absolute sovereignty, particularly on the Day of Judgment when all souls will be held accountable for their deeds. It serves as a reminder of the ultimate reality that we will all face.",
    audio: "https://example.com/audio/1_4.mp3",
  },
  {
    id: 5,
    arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    translation: "It is You we worship and You we ask for help.",
    transliteration: "Iyyaka na'budu wa iyyaka nasta'een",
    wordByWord: [
      { arabic: "إِيَّاكَ", translation: "You Alone" },
      { arabic: "نَعْبُدُ", translation: "we worship" },
      { arabic: "وَإِيَّاكَ", translation: "and You Alone" },
      { arabic: "نَسْتَعِينُ", translation: "we ask for help" },
    ],
    tafsir:
      "This verse represents the essence of Islamic monotheism, where the believer affirms that worship and seeking help are directed solely to Allah. It establishes the direct relationship between the servant and their Creator, without any intermediaries.",
    audio: "https://example.com/audio/1_5.mp3",
  },
  {
    id: 6,
    arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    translation: "Guide us to the straight path.",
    transliteration: "Ihdinas-siratal-mustaqeem",
    wordByWord: [
      { arabic: "اهْدِنَا", translation: "Guide us" },
      { arabic: "الصِّرَاطَ", translation: "(to) the path" },
      { arabic: "الْمُسْتَقِيمَ", translation: "the straight" },
    ],
    tafsir:
      "This verse contains the most important supplication a believer can make: asking for guidance to the straight path. This path represents the way of truth, righteousness, and correct understanding that leads to Allah's pleasure and Paradise.",
    audio: "https://example.com/audio/1_6.mp3",
  },
  {
    id: 7,
    arabic:
      "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
    translation:
      "The path of those upon whom You have bestowed favor, not of those who have earned [Your] anger or of those who are astray.",
    transliteration:
      "Siratal-latheena an'amta 'alayhim ghayril-maghdubi 'alayhim wa lad-dalleen",
    wordByWord: [
      { arabic: "صِرَاطَ", translation: "The path" },
      { arabic: "الَّذِينَ", translation: "(of) those" },
      { arabic: "أَنْعَمْتَ", translation: "You have bestowed favor" },
      { arabic: "عَلَيْهِمْ", translation: "upon them" },
      { arabic: "غَيْرِ", translation: "not" },
      {
        arabic: "الْمَغْضُوبِ",
        translation: "(of) those who earned (Your) anger",
      },
      { arabic: "عَلَيْهِمْ", translation: "upon them" },
      { arabic: "وَلَا", translation: "and not" },
      { arabic: "الضَّالِّينَ", translation: "(of) those who go astray" },
    ],
    tafsir:
      "This verse clarifies the straight path mentioned in the previous verse. It is the path of those whom Allah has blessed, such as the prophets, the truthful, the martyrs, and the righteous. It is not the path of those who have earned Allah's anger by knowing the truth but not following it, nor of those who have gone astray by deviating from the truth out of ignorance.",
    audio: "https://example.com/audio/1_7.mp3",
  },
];
const SurahIntroWrapper = ({ surahId }: { surahId: string }) => {
  return <SurahIntro surah={surah}/>;
};

export default SurahIntroWrapper;
