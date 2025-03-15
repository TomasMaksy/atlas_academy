"use client";

import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { Group, Box3, Vector3, AnimationClip } from "three";
import { useFrame, useThree } from "@react-three/fiber";

type GLTFResult = {
    scene: Group;
    animations: AnimationClip[];
};

interface AnimatedModelProps {
    animationName: string;
    rotation: Vector3;
}

const ZERO = new Vector3();

export default function AnimatedModel({ animationName, rotation }: AnimatedModelProps) {
    const modelRef = useRef<Group>(null);

    const { scene, animations } = useGLTF("/models/character.glb") as GLTFResult;
    const { actions } = useAnimations(animations, modelRef);
    const { camera } = useThree();

    const currentAnimation = useRef("Wave");
    const readyTime = useRef(3);

    function easeOutBack(x: number): number {
        const c1 = 1.70158;
        const c3 = c1 + 1;

        return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    }

    function clamp(x: number, min: number, max: number) {
        if (x < min) return min;
        if (x > max) return max;
        return x;
    }

    function lerp(a: number, b: number, t: number) {
        return (b - a) * t + a;
    }

    function damp(a: number, b: number, lambda: number, dt: number) {
        return lerp(a, b, 1 - Math.exp(-lambda * dt));
    }

    useFrame(({ clock }, delta) => {
        if (currentAnimation.current != animationName && clock.elapsedTime >= readyTime.current) {
            currentAnimation.current = animationName;
            readyTime.current = clock.elapsedTime + 1;
            transition();
        }

        if (modelRef.current) {
            const targetRotation = currentAnimation.current == "Idle" || currentAnimation.current == "Wave" ? rotation : ZERO;
            modelRef.current.rotation.x = damp(modelRef.current.rotation.x, targetRotation.x, 10, delta);
            modelRef.current.rotation.y = damp(modelRef.current.rotation.y, targetRotation.y, 10, delta);
            modelRef.current.rotation.order = "ZYX";

            modelRef.current.position.y = (easeOutBack(clamp(clock.elapsedTime - 0.25, 0, 1)) - 1) * 1.5;
        }
    });

    const transition = () => {
        if (actions) {
            Object.values(actions).forEach((action) => {
                if (action != null) action.fadeOut(0.5);
            });

            if (actions[currentAnimation.current]) {
                actions[currentAnimation.current].reset().fadeIn(0.5).play();
            }
        }
    }

    useEffect(() => {
        transition();
    }, [actions]);

    useEffect(() => {
        if (modelRef.current) {
            camera.position.set(0, 1.2, 2.5);
            camera.lookAt(new Vector3(0, 1, 0));
        }
    }, [camera]);

    return <primitive ref={modelRef} object={scene} scale={1} />;
}
