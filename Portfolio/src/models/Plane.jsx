import { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

import planeScene from '../assets/3d/plane.glb'

const Plane = ({ isRotating, ...props }) => {
    const groupRef = useRef()
    const { scene, animations } = useGLTF(planeScene)
    const { actions } = useAnimations(animations, groupRef)

    useEffect(() => {
        console.log('Available animations:', animations)
        console.log('Available actions:', Object.keys(actions))
    }, [animations, actions])

    useEffect(() => {
        if (actions) {
            // Play all animations to check which one works
            Object.values(actions).forEach(action => {
                action.play()
            })
        }
    }, [actions])

    return (
        <group ref={groupRef} {...props}>
            <primitive object={scene} />
        </group>
    )
}

export default Plane

// Preload the model
useGLTF.preload(planeScene)
