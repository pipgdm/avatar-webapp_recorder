import React, { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useGraph } from '@react-three/fiber';
import { Euler } from 'three';
import avatarData from './blendshapes_recording.json'; // ✅ Imported directly

interface BlendshapeFrame {
  timestamp: number;
  blendshapes: { name: string; score: number }[];
}

export default function AvatarPlayer({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const { nodes } = useGraph(scene);
  const [frameIndex, setFrameIndex] = useState(0);
  const [headMesh, setHeadMesh] = useState<any[]>([]);

  useEffect(() => {
    const meshes: any[] = [];
    if (nodes.Wolf3D_Head) meshes.push(nodes.Wolf3D_Head);
    if (nodes.Wolf3D_Teeth) meshes.push(nodes.Wolf3D_Teeth);
    if (nodes.Wolf3D_Beard) meshes.push(nodes.Wolf3D_Beard);
    if (nodes.Wolf3D_Avatar) meshes.push(nodes.Wolf3D_Avatar);
    if (nodes.Wolf3D_Head_Custom) meshes.push(nodes.Wolf3D_Head_Custom);
    setHeadMesh(meshes);
  }, [nodes]);

  useFrame(() => {
    if (!avatarData || frameIndex >= avatarData.length) return;

    const current = avatarData[frameIndex];

    current.blendshapes.forEach(({ name, score }) => {
      headMesh.forEach(mesh => {
        const index = mesh.morphTargetDictionary?.[name];
        if (index !== undefined && index >= 0) {
          mesh.morphTargetInfluences[index] = score;
        }
      });
    });

    setFrameIndex(i => i + 1);
  });

  return <primitive object={scene} position={[0, -3.9, 1.5]} scale={2.3} />;
}
