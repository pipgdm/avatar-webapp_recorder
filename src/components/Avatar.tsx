// components/Avatar.tsx
import React, { useEffect } from 'react';
import { useGLTF, useGraph } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Euler, Object3D } from 'three';

interface Blendshape {
  categoryName: string;
  score: number;
}

interface AvatarProps {
  url: string;
  blendshapes: Blendshape[];
  rotation: Euler;
}

export default function Avatar({ url, blendshapes, rotation }: AvatarProps) {
  const { scene } = useGLTF(url);
  const { nodes } = useGraph(scene);
  const headMesh: Object3D[] = [];

  useEffect(() => {
    if (nodes.Wolf3D_Head) headMesh.push(nodes.Wolf3D_Head);
    if (nodes.Wolf3
