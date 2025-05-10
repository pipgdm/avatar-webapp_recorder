import React, { useState } from 'react';
import { blendshapeRecorder } from './blendshaper_recorder'; // ✅ path must match your file

const RecorderControls = ({ setIsRecording }) => {
  const [recording, setRecording] = useState(false);

  const toggleRecording = () => {
    const newState = !recording;
    setRecording(newState);
    setIsRecording(newState); // ✅ THIS is what makes App update

    if (!newState) {
      console.log("🟢 Stopped recording, downloading...");
      console.log("💾 Frame count:", blendshapeRecorder['frames']?.length);
      blendshapeRecorder.download();
    } else {
      console.log("🔴 Started recording, clearing previous data...");
      blendshapeRecorder.clear();
    }
  };

  return (
    <button onClick={toggleRecording}>
      {recording ? "Stop Recording" : "Start Recording"}
    </button>
  );
};

export default RecorderControls;
