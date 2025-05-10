import React, { useState, useEffect } from 'react';
import { blendshapeRecorder } from './blendshaper_recorder';

interface Props {
  setIsRecording: (value: boolean) => void;
}

const RecorderControls: React.FC<Props> = ({ setIsRecording }) => {
  const [isRecording, setRecordingState] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      setSeconds(0);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = () => {
    blendshapeRecorder.clear();
    setRecordingState(true);
    setIsRecording(true);
  };

  const stopRecording = () => {
    setRecordingState(false);
    setIsRecording(false);
    blendshapeRecorder.download("blendshapes_recording");
    setSavedMessage("✅ Saved to 'blendshapes_recording.json'");
    setTimeout(() => setSavedMessage(''), 4000);
  };

  return (
    <div style={{
      position: 'absolute',
      top: 20,
      left: 20,
      zIndex: 999,
      background: 'rgba(0,0,0,0.6)',
      padding: '12px',
      borderRadius: '8px',
      color: 'white',
      fontFamily: 'sans-serif',
      width: 'fit-content',
      boxShadow: '0 0 8px rgba(0,0,0,0.3)'
    }}>
      <button onClick={startRecording} style={{ marginRight: 8 }}>▶ Start</button>
      <button onClick={stopRecording}>⏹ Stop</button>

      {isRecording && (
        <div style={{ color: 'red', fontSize: '14px', marginTop: 8 }}>
          ● Recording... {String(Math.floor(seconds / 60)).padStart(2, '0')}:
          {String(seconds % 60).padStart(2, '0')}
        </div>
      )}

      {savedMessage && (
        <div style={{ color: 'lightgreen', fontSize: '12px', marginTop: 6 }}>
          {savedMessage}
        </div>
      )}
    </div>
  );
};

export default RecorderControls;
