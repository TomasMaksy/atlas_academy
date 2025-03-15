"use client";

import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Group, Box3, Vector3, AnimationClip } from "three";
import { useThree } from "@react-three/fiber";

type GLTFResult = {
    scene: Group;
    animations: AnimationClip[];
};

interface AnimatedModelProps {
    animationName: string;
}

export default function AnimatedModel({ animationName }: AnimatedModelProps) {
    const modelRef = useRef<Group>(null);
    const { scene, animations } = useGLTF("/models/character.glb") as GLTFResult;
    const { actions } = useAnimations(animations, modelRef);
    const { camera } = useThree();

    useEffect(() => {
        if (actions) {
            // Stop previous animations smoothly
            Object.values(actions).forEach((action) => {
                if (action != null) action.fadeOut(0.5);
            });

            // Play the new animation smoothly
            if (actions[animationName]) {
                actions[animationName].reset().fadeIn(0.5).play();
            }
        }
    }, [animationName, actions]);

    // Center the camera on the model
    useEffect(() => {
        if (modelRef.current) {
            const box = new Box3().setFromObject(modelRef.current);
            const center = box.getCenter(new Vector3());

            // camera.position.set(center.x, center.y + 0.2, center.z + 1.6);
            camera.position.set(center.x, center.y + 0.5, center.z + 2.5);
            // camera.fov = 10;
            center.y += 0.25;
            camera.lookAt(center);
        }
    }, [camera]);

    return <primitive ref={modelRef} object={scene} scale={1} />;
}
