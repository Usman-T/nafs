"use client";

import {
  createContext,
  useContext,
  useReducer,
  useRef,
  ReactNode,
} from "react";

interface Verse {
  id: number;
  arabic: string;
  translation: string;
  transliteration: string;
  wordByWord: { arabic: string; translation: string }[];
  tafsir: string;
  audio: string;
}

interface Surah {
  id: number;
  name: string;
  arabicName: string;
  verses: number;
  type: "Meccan" | "Medinan";
}

interface SurahState {
  currentVerse: number;
  bookmarkedVerses: number[];
  highlightedVerses: number[];
  showTafsir: number[];
  isPlaying: boolean;
  playingVerse: number | null;
  showWordByWord: boolean;
  fontSize: number;
  selectedReciter: number;
  selectedTranslation: number;
  isRepeat: boolean;
  volume: number;
  isMuted: boolean;
  userNotes: Record<number, string>;
  verses: Verse[];
}

type SurahAction =
  | { type: "SET_CURRENT_VERSE"; payload: number }
  | { type: "TOGGLE_BOOKMARK"; payload: number }
  | { type: "TOGGLE_HIGHLIGHT"; payload: number }
  | { type: "TOGGLE_TAFSIR"; payload: number }
  | { type: "SET_PLAYING"; payload: { isPlaying: boolean; verseId?: number } }
  | { type: "SET_WORD_BY_WORD"; payload: boolean }
  | { type: "SET_FONT_SIZE"; payload: number }
  | { type: "SET_RECITER"; payload: number }
  | { type: "SET_TRANSLATION"; payload: number }
  | { type: "SET_REPEAT"; payload: boolean }
  | { type: "SET_VOLUME"; payload: number }
  | { type: "SET_MUTED"; payload: boolean }
  | { type: "SET_NOTE"; payload: { verseId: number; note: string } }
  | { type: "RESET_SETTINGS" }
  | { type: "SET_VERSES"; payload: Verse[] };

interface SurahContextType {
  state: SurahState;
  dispatch: React.Dispatch<SurahAction>;
  refs: {
    versesRef: React.RefObject<HTMLDivElement>;
    containerRef: React.RefObject<HTMLDivElement>;
    settingsButtonRef: React.RefObject<HTMLButtonElement>;
    infoButtonRef: React.RefObject<HTMLButtonElement>;
    verseButtonRef: React.RefObject<HTMLButtonElement>;
    actionsButtonRef: React.RefObject<HTMLButtonElement>;
  };
  actions: {
    toggleBookmark: (verseId: number) => void;
    toggleHighlight: (verseId: number) => void;
    toggleTafsir: (verseId: number) => void;
    togglePlayPause: (verseId: number) => void;
    handlePlayPause: () => void;
    handlePreviousVerse: () => void;
    handleNextVerse: (totalVerses: number) => void;
    handleVolumeChange: (value: number[]) => void;
    handleToggleMute: () => void;
    handleToggleRepeat: () => void;
    scrollToVerse: (verseId: number) => void;
    saveNote: (verseId: number, note: string) => void;
  };
  surah: Surah;
  verses: Verse[];
}

const SurahContext = createContext<SurahContextType | undefined>(undefined);

export function SurahProvider({
  children,
  initialSurah,
  initialVerses,
}: {
  children: ReactNode;
  initialSurah: Surah;
  initialVerses: Verse[];
}) {
  const initialState: SurahState = {
    currentVerse: 1,
    bookmarkedVerses: [],
    highlightedVerses: [],
    showTafsir: [],
    isPlaying: false,
    playingVerse: null,
    showWordByWord: false,
    fontSize: 20,
    selectedReciter: 1,
    selectedTranslation: 1,
    isRepeat: false,
    volume: 80,
    isMuted: false,
    userNotes: {},
    verses: initialVerses,
  };

  function surahReducer(state: SurahState, action: SurahAction): SurahState {
    switch (action.type) {
      case "SET_CURRENT_VERSE":
        return { ...state, currentVerse: action.payload };
      case "TOGGLE_BOOKMARK":
        return {
          ...state,
          bookmarkedVerses: state.bookmarkedVerses.includes(action.payload)
            ? state.bookmarkedVerses.filter((id) => id !== action.payload)
            : [...state.bookmarkedVerses, action.payload],
        };
      case "TOGGLE_HIGHLIGHT":
        return {
          ...state,
          highlightedVerses: state.highlightedVerses.includes(action.payload)
            ? state.highlightedVerses.filter((id) => id !== action.payload)
            : [...state.highlightedVerses, action.payload],
        };
      case "TOGGLE_TAFSIR":
        return {
          ...state,
          showTafsir: state.showTafsir.includes(action.payload)
            ? state.showTafsir.filter((id) => id !== action.payload)
            : [...state.showTafsir, action.payload],
        };
      case "SET_PLAYING":
        return {
          ...state,
          isPlaying: action.payload.isPlaying,
          playingVerse: action.payload.verseId || state.playingVerse,
          currentVerse: action.payload.verseId || state.currentVerse,
        };
      case "SET_WORD_BY_WORD":
        return { ...state, showWordByWord: action.payload };
      case "SET_FONT_SIZE":
        return { ...state, fontSize: action.payload };
      case "SET_RECITER":
        return { ...state, selectedReciter: action.payload };
      case "SET_TRANSLATION":
        return { ...state, selectedTranslation: action.payload };
      case "SET_REPEAT":
        return { ...state, isRepeat: action.payload };
      case "SET_VOLUME":
        return {
          ...state,
          volume: action.payload,
          isMuted: action.payload === 0,
        };
      case "SET_MUTED":
        return { ...state, isMuted: action.payload };
      case "SET_NOTE":
        return {
          ...state,
          userNotes: {
            ...state.userNotes,
            [action.payload.verseId]: action.payload.note,
          },
        };
      case "RESET_SETTINGS":
        return {
          ...state,
          fontSize: 20,
          showWordByWord: false,
          selectedReciter: 1,
          selectedTranslation: 1,
          volume: 80,
          isMuted: false,
          isRepeat: false,
        };
      case "SET_VERSES":
        return { ...state, verses: action.payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(surahReducer, initialState);

  const versesRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);
  const infoButtonRef = useRef<HTMLButtonElement>(null);
  const verseButtonRef = useRef<HTMLButtonElement>(null);
  const actionsButtonRef = useRef<HTMLButtonElement>(null);

  const refs = {
    versesRef,
    containerRef,
    settingsButtonRef,
    infoButtonRef,
    verseButtonRef,
    actionsButtonRef,
  };

  const actions = {
    toggleBookmark: (verseId: number) =>
      dispatch({ type: "TOGGLE_BOOKMARK", payload: verseId }),
    toggleHighlight: (verseId: number) =>
      dispatch({ type: "TOGGLE_HIGHLIGHT", payload: verseId }),
    toggleTafsir: (verseId: number) =>
      dispatch({ type: "TOGGLE_TAFSIR", payload: verseId }),
    togglePlayPause: (verseId: number) => {
      if (state.playingVerse === verseId && state.isPlaying) {
        dispatch({ type: "SET_PLAYING", payload: { isPlaying: false } });
      } else {
        dispatch({
          type: "SET_PLAYING",
          payload: { isPlaying: true, verseId },
        });
      }
    },
    handlePlayPause: () => {
      if (state.isPlaying) {
        dispatch({ type: "SET_PLAYING", payload: { isPlaying: false } });
      } else {
        dispatch({
          type: "SET_PLAYING",
          payload: {
            isPlaying: true,
            verseId: state.playingVerse || state.currentVerse,
          },
        });
      }
    },
    handlePreviousVerse: () => {
      if (state.currentVerse > 1) {
        const newVerse = state.currentVerse - 1;
        dispatch({ type: "SET_CURRENT_VERSE", payload: newVerse });
        if (state.isPlaying) {
          dispatch({
            type: "SET_PLAYING",
            payload: { isPlaying: true, verseId: newVerse },
          });
        }
      }
    },
    handleNextVerse: (totalVerses: number) => {
      if (state.currentVerse < totalVerses) {
        const newVerse = state.currentVerse + 1;
        dispatch({ type: "SET_CURRENT_VERSE", payload: newVerse });
        if (state.isPlaying) {
          dispatch({
            type: "SET_PLAYING",
            payload: { isPlaying: true, verseId: newVerse },
          });
        }
      }
    },
    handleVolumeChange: (value: number[]) =>
      dispatch({ type: "SET_VOLUME", payload: value[0] }),
    handleToggleMute: () =>
      dispatch({ type: "SET_MUTED", payload: !state.isMuted }),
    handleToggleRepeat: () =>
      dispatch({ type: "SET_REPEAT", payload: !state.isRepeat }),
    scrollToVerse: (verseId: number) => {
      dispatch({ type: "SET_CURRENT_VERSE", payload: verseId });
      if (versesRef.current) {
        const verseElement = document.getElementById(`verse-${verseId}`);
        if (verseElement) {
          verseElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    },
    saveNote: (verseId: number, note: string) => {
      dispatch({ type: "SET_NOTE", payload: { verseId, note } });
    },
  };

  const value: SurahContextType = {
    state,
    dispatch,
    refs,
    actions,
    surah: initialSurah,
    verses: initialVerses,
  };

  return <SurahContext.Provider value={value}>{children}</SurahContext.Provider>;
}

export function useSurah() {
  const context = useContext(SurahContext);
  if (!context) {
    throw new Error("useSurah must be used within a SurahProvider");
  }
  return context;
}

export type { Verse, Surah, SurahState, SurahAction };
