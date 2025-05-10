import {
    FaceLandmarker,
    FilesetResolver,
    FaceLandmarkerResult
  } from '@mediapipe/tasks-vision';
  import { Euler, Matrix4 } from 'three';
  
  let faceLandmarker: FaceLandmarker;
  let lastVideoTime = -1;
  
  const options = {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
      delegate: 'GPU'
    },
    numFaces: 1,
    runningMode: 'VIDEO' as const,
    outputFaceBlendshapes: true,
    outputFacialTransformationMatrixes: true,
  };
  
  export async function initFaceTracking(
    video: HTMLVideoElement,
    onFrame: (blendshapes: any[], rotation: Euler) => void
  ) {
    const filesetResolver = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm'
    );
  
    faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, options);
  
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 1280, height: 720 },
      audio: false
    });
  
    video.srcObject = stream;
    video.onloadeddata = () => predict(video, onFrame);
  }
  
  async function predict(
    video: HTMLVideoElement,
    onFrame: (blendshapes: any[], rotation: Euler) => void
  ) {
    const nowInMs = Date.now();
    if (lastVideoTime !== video.currentTime) {
      lastVideoTime = video.currentTime;
  
      const result: FaceLandmarkerResult = faceLandmarker.detectForVideo(video, nowInMs);
  
      const categories = result?.faceBlendshapes?.[0]?.categories;
      const matrixData = result?.facialTransformationMatrixes?.[0]?.data;
  
      if (categories && matrixData) {
        const rotation = new Euler().setFromRotationMatrix(new Matrix4().fromArray(matrixData));
        onFrame(categories, rotation);
      }
    }
  
    requestAnimationFrame(() => predict(video, onFrame));
  }
  