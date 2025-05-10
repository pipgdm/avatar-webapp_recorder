// src/screens/AvatarPlayerScreen.tsx

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Color } from 'three';
import AvatarPlayer from './AvatarPlayer';
import animationData from './bs_8.json';

const avatarUrl =
  'https://models.readyplayer.me/6460d95f9ae10f45bffb2864.glb?morphTargets=ARKit&textureAtlas=1024';

export default function AvatarPlayerScreen() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ fov: 20 }} shadows>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color={new Color(1, 1, 0)} intensity={0.5} castShadow />
        <pointLight position={[-10, 0, 10]} color={new Color(1, 0, 0)} intensity={0.5} castShadow />
        <pointLight position={[0, 0, 10]} intensity={0.5} castShadow />
        <AvatarPlayer url={avatarUrl} data={animationData} />
      </Canvas>
    </div>
  );
}
