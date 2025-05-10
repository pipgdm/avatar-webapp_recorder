import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Object3D } from 'three';

interface Blendshape {
  categoryName: string;
  score: number;
}

interface BlendshapeFrame {
  timestamp: number;
  blendshapes: Blendshape[];
}

interface Props {
  url: string;
  data: BlendshapeFrame[];
}

export default function AvatarPlayerScreen({ url, data }: Props) {
  const { scene, nodes } = useGLTF(url, true);
  const headMeshRef = useRef<Object3D[]>([]);
  const [frameIndex, setFrameIndex] = useState(0);
  const avatarUrl = 'https://models.readyplayer.me/6460d95f9ae10f45bffb2864.glb?morphTargets=ARKit&textureAtlas=1024';


  useEffect(() => {
    const meshes = headMeshRef.current;
    meshes.length = 0;

    if (nodes.Wolf3D_Head) meshes.push(nodes.Wolf3D_Head);
    if (nodes.Wolf3D_Teeth) meshes.push(nodes.Wolf3D_Teeth);
    if (nodes.Wolf3D_Beard) meshes.push(nodes.Wolf3D_Beard);
    if (nodes.Wolf3D_Avatar) meshes.push(nodes.Wolf3D_Avatar);
    if (nodes.Wolf3D_Head_Custom) meshes.push(nodes.Wolf3D_Head_Custom);
  }, [nodes]);

  useFrame(() => {
    if (!data || data.length === 0) return;

    const frame = data[frameIndex];
    const meshes = headMeshRef.current;

    console.log("🎞️ Frame", frameIndex); // 👈 Add this


    frame.blendshapes.forEach(({ categoryName, score }) => {
      meshes.forEach(mesh => {
        const dict = (mesh as any).morphTargetDictionary;
        const influences = (mesh as any).morphTargetInfluences;
        const index = dict?.[categoryName];
        console.log(`🎭 Applying ${categoryName}: ${score} → index ${index}`);
        if (index >= 0 && influences) {
          influences[index] = score;
        }
      });
    });

    // ✅ Loop to beginning
    setFrameIndex(i => (i + 1) % data.length);
  });

  return <primitive object={scene} position={[0, -3.9, 1.5]} scale={2.3} />;
}
