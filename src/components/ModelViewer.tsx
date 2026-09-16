import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Grid, Center, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

function Model({ url }: { url: string }) {
  const gltf = useGLTF(url);
  return (
    <Center>
      <primitive object={gltf.scene} />
    </Center>
  );
}

function ViewerFallback() {
  return (
    <div className="viewer-message">
      <div className="spinner" />
      <p>Loading 3D model…</p>
    </div>
  );
}

export default function ModelViewer({ url }: { url: string }) {
  return (
    <div className="model-viewer">
      <Canvas
        camera={{ position: [4, 3, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#0b1220"]} />
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 8, 5]} intensity={2} />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <Model url={url} />
          <Grid
            args={[20, 20]}
            cellSize={0.5}
            cellThickness={0.5}
            sectionSize={2}
            sectionThickness={1}
            fadeDistance={30}
            infiniteGrid
          />
        </Suspense>
        <OrbitControls
          makeDefault
          enableDamping
          minDistance={1}
          maxDistance={30}
        />
      </Canvas>
      <Suspense fallback={<ViewerFallback />}>
        <div className="viewer-controls">
          <span>Drag to rotate</span>
          <span>Scroll/pinch to zoom</span>
        </div>
      </Suspense>
    </div>
  );
}