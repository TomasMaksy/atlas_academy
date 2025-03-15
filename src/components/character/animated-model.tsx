"use client";

import { useGLTF, useAnimations } from "@react-three/drei";
import { useCallback, useEffect, useRef } from "react";
import { Group, Vector3, AnimationClip } from "three";
import { useFrame, useThree } from "@react-three/fiber";

type GLTFResult = {
    scene: Group;
    animations: AnimationClip[];
};

interface AnimatedModelProps {
    animationName: string;
    rotation: Vector3;
    closeup: boolean;
    model: string;
}

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

export default function AnimatedModel({ animationName, rotation, closeup, model }: AnimatedModelProps) {
    const modelRef = useRef<Group>(null);

    const { scene, animations } = useGLTF(model) as GLTFResult;
    const { actions } = useAnimations(animations, modelRef);
    const { camera } = useThree();

    const currentAnimation = useRef("Wave");
    const readyTime = useRef(3);
    const rotationStrength = useRef(0);


    useFrame(({ clock }, delta) => {
        if (currentAnimation.current != animationName && clock.elapsedTime >= readyTime.current) {
            currentAnimation.current = animationName;
            readyTime.current = clock.elapsedTime + 1;
            transition();
        }

        if (modelRef.current) {
            const targetStrength = currentAnimation.current == "Wave" || currentAnimation.current == "Idle" || currentAnimation.current == "Talk" ? 1 : 0;
            rotationStrength.current = damp(rotationStrength.current, targetStrength, 5, delta);

            const targetRotation = rotation.clone().multiplyScalar(rotationStrength.current);
            modelRef.current.rotation.x = damp(modelRef.current.rotation.x, targetRotation.x, 10, delta);
            modelRef.current.rotation.y = damp(modelRef.current.rotation.y, targetRotation.y, 10, delta);
            modelRef.current.rotation.order = "ZYX";

            modelRef.current.position.y = (easeOutBack(clamp(clock.elapsedTime - 0.25, 0, 1)) - 1) * 1.5;
        }
    });

    const transition = useCallback(() => {
        if (actions) {
            Object.values(actions).forEach((action) => {
                if (action) action.fadeOut(0.5);
            });

            if (actions[currentAnimation.current]) {
                actions[currentAnimation.current].reset().fadeIn(0.5).play();
            }
        }
    }, [actions]);

    useEffect(() => {
        transition();
    }, [actions, transition]);

    useEffect(() => {
        if (modelRef.current) {
            if (closeup) {
                camera.position.set(0, 1.2, 2.5);
                camera.lookAt(new Vector3(0, 1, 0));
            } else {
                camera.position.set(0, 1, 3.5);
                camera.lookAt(new Vector3(0, 0.8, 0));
            }
        }
    }, [camera, closeup]);

    return <primitive ref={modelRef} object={scene} scale={1} />;
}
