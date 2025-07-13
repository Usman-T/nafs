'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { fetchSurahData, fetchVersesData } from '@/lib/data/surah';
import { useSurah } from '@/lib/context/surah-page-context';
import AudioPlayer from './surah-audio-player';
import SettingsPanel from './surah-settings';
import SurahInfoPanel from './surah-info-panel';
import VerseListPanel from './surah-verse-list';

interface SurahClientProps {
  surahId: number;
}

export default function SurahClient({ surahId }: SurahClientProps) {
  const router = useRouter();
  const { state, dispatch } = useSurah();
  const versesRef = useRef<HTMLDivElement>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);
  const infoButtonRef = useRef<HTMLButtonElement>(null);
  const verseButtonRef = useRef<HTMLButtonElement>(null);
  const actionsButtonRef = useRef<HTMLButtonElement>(null);

  // Initialize client-side data
  useEffect(() => {
    async function loadData() {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      try {
        const [surahData, versesData] = await Promise.all([
          fetchSurahData(surahId),
          fetchVersesData(surahId),
        ]);
        
        dispatch({ type: 'SET_SURAH', payload: surahData });
        dispatch({ type: 'SET_VERSES', payload: versesData });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load data' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }

    loadData();
  }, [surahId, dispatch]);

  // Auto-scroll to current verse
  useEffect(() => {
    if (versesRef.current && !state.isLoading) {
      const verseElement = document.getElementById(`verse-${state.currentVerse}`);
      if (verseElement) {
        verseElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [state.currentVerse, state.isLoading]);

  // Event handlers
  const handlePlayPause = () => {
    if (state.isPlaying) {
      dispatch({ type: 'SET_PLAYING', payload: { isPlaying: false } });
    } else {
      dispatch({ 
        type: 'SET_PLAYING', 
        payload: { 
          isPlaying: true, 
          verseId: state.playingVerse || state.currentVerse 
        } 
      });
    }
  };

  const handlePreviousVerse = () => {
    dispatch({ type: 'PREVIOUS_VERSE' });
  };

  const handleNextVerse = () => {
    dispatch({ type: 'NEXT_VERSE' });
  };

  const handleVolumeChange = (value: number[]) => {
    dispatch({ type: 'SET_VOLUME', payload: value[0] });
  };

  const handleToggleMute = () => {
    dispatch({ type: 'SET_MUTED', payload: !state.isMuted });
  };

  const handleToggleRepeat = () => {
    dispatch({ type: 'SET_REPEAT', payload: !state.isRepeat });
  };

  const handleGoBack = () => {
    router.push('/dashboard/guidance');
  };

  const handleSelectVerse = (id: number) => {
    dispatch({ type: 'SET_CURRENT_VERSE', payload: id });
    actionsButtonRef?.current?.click();
    verseButtonRef?.current?.click();
  };

  const handleFontSizeChange = (size: number) => {
    dispatch({ type: 'SET_FONT_SIZE', payload: size });
  };

  const handleToggleWordByWord = () => {
    dispatch({ type: 'SET_SHOW_WORD_BY_WORD', payload: !state.showWordByWord });
  };

  const handleReciterChange = (reciter: number) => {
    dispatch({ type: 'SET_SELECTED_RECITER', payload: reciter });
  };

  const handleTranslationChange = (translation: number) => {
    dispatch({ type: 'SET_SELECTED_TRANSLATION', payload: translation });
  };

  return (
    <>
      {/* Navigation Controls */}
      <NavigationControls
        currentVerse={state.currentVerse}
        totalVerses={state.verses.length}
        onPrevious={handlePreviousVerse}
        onNext={handleNextVerse}
        isDarkMode={state.isDarkMode}
      />

      {/* Audio Player */}
      <AudioPlayer
        isPlaying={state.isPlaying}
        currentVerse={state.currentVerse}
        totalVerses={state.verses.length}
        isDarkMode={state.isDarkMode}
        onPlayPause={handlePlayPause}
        onPrevious={handlePreviousVerse}
        onNext={handleNextVerse}
        onToggleRepeat={handleToggleRepeat}
        isRepeat={state.isRepeat}
        volume={state.volume}
        onVolumeChange={handleVolumeChange}
        isMuted={state.isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Settings Panel */}
      <SettingsPanel
        fontSize={state.fontSize}
        onFontSizeChange={handleFontSizeChange}
        showWordByWord={state.showWordByWord}
        onToggleWordByWord={handleToggleWordByWord}
        selectedReciter={state.selectedReciter}
        onReciterChange={handleReciterChange}
        selectedTranslation={state.selectedTranslation}
        onTranslationChange={handleTranslationChange}
        settingsButtonRef={settingsButtonRef}
      />

      {/* Surah Info Panel */}
      {state.surah && (
        <SurahInfoPanel
          surah={state.surah}
          isDarkMode={state.isDarkMode}
          infoButtonRef={infoButtonRef}
        />
      )}

      {/* Verse List Panel */}
      <VerseListPanel
        verses={state.verses}
        currentVerse={state.currentVerse}
        isDarkMode={state.isDarkMode}
        onSelectVerse={handleSelectVerse}
        verseButtonRef={verseButtonRef}
      />
    </>
  );
}