class BlendshapeRecorder {
    private frames: { timestamp: number, blendshapes: { name: string, score: number }[] }[] = [];
  
    addFrame(blendshapes: { categoryName: string, score: number }[]) {
      this.frames.push({
        timestamp: Date.now(),
        blendshapes: blendshapes.map(({ categoryName, score }) => ({
          name: categoryName,
          score
        }))
      });
    }
  
    download(filename = "blendshapes_recording") {
      const json = JSON.stringify(this.frames, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
  
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  
    clear() {
      this.frames = [];
    }
  }
  
  export const blendshapeRecorder = new BlendshapeRecorder();
  