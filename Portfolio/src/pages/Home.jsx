import { Suspense, useState, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'
import Island from '../models/Island'
import Sky from '../models/Sky'
import Plane from '../models/Plane'
import Bird from '../models/Bird'
import HomeInfo from '../components/HomeInfo'

const Home = () => {
  const [isRotating, setIsRotating] = useState(false)
  const [currentStage, setCurrentStage] = useState(1)
  const [lastX, setLastX] = useState(0)
  const [rotationSpeed, setRotationSpeed] = useState(0)

  const adjustIsland = () => {
    let screenScale = null
    let screenPosition = [0, -6.5, -43]
    let rotation = [0.1, 4.7, 0]

    if(window.innerWidth < 768){
      screenScale = [0.9, 0.9, 0.9]
    } else {
      screenScale = [1, 1, 1]
    }

    return [screenScale, screenPosition, rotation]
  }

  const adjustPlane = () => {
    let screenScale, screenPosition

    if(window.innerWidth < 768){
      screenScale = [1.5, 1.5, 1.5]
      screenPosition = [0, -1.5, 0]
    } else {
      screenScale = [3, 3, 3]
      screenPosition = [0, -4, -4]
    }

    return [screenScale, screenPosition]
  }

  const handleTouchStart = (event) => {
    event.preventDefault()
    setLastX(event.touches[0].clientX)
    setIsRotating(true)
  }

  const handleTouchMove = (event) => {
    event.preventDefault()
    if (isRotating) {
      const touch = event.touches[0]
      const currentX = touch.clientX
      const delta = (currentX - lastX) * 0.01
      setRotationSpeed(delta)
      setLastX(currentX)
    }
  }

  const handleTouchEnd = () => {
    setIsRotating(false)
    setRotationSpeed(0)
  }

  const [islandScale, islandPosition, islandRotation] = adjustIsland()
  const [planeScale, planePosition] = adjustPlane()

  return (
    <section 
      className="w-full h-screen relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute top-28 left-0 right-0 z-10 flex justify-center items-center">
        {currentStage && <HomeInfo currentStage={currentStage}/>}
      </div>
      
      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[10, 1, 1]} intensity={1.5} />
          <ambientLight intensity={0.5} />
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor="#000"
            intensity={1}
          />
          <Sky isRotating={isRotating}/>
          <Bird />
          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            rotationSpeed={rotationSpeed}
          />
          <Plane 
            isRotating={isRotating}
            scale={planeScale}
            position={planePosition}
            rotation={[0, 20, 0]}
            rotationSpeed={rotationSpeed}
          />
        </Suspense>
      </Canvas>
    </section>
  )
}

export default Home