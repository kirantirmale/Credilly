import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { TextureLoader } from 'three';
import { Text } from '@react-three/drei';

extend({ MeshLineGeometry, MeshLineMaterial });

const BlogHome = () => {
    return (
        <div style={{  height: '100vh', background: 'black' }}>
            <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
                <Physics debug interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
                    <Band />
                </Physics>
            </Canvas>
        </div>
    );
};

function Band() {
    const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef();
    const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3();
    const { width, height } = useThree((state) => state.size);
    const [curve] = useState(() => new THREE.CatmullRomCurve3([
        new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()
    ]));
    const [dragged, drag] = useState(false);
    const [texture, setTexture] = useState(null);

    useEffect(() => {
        const loader = new TextureLoader();
        loader.load('/path-to-your-image.jpg', (loadedTexture) => {
            setTexture(loadedTexture);
        });
    }, []);

    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
    useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

    useFrame((state, delta) => {
        if (dragged) {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
            dir.copy(vec).sub(state.camera.position).normalize();
            vec.add(dir.multiplyScalar(state.camera.position.length()));
            [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
            card.current?.setNextKinematicTranslation({
                x: vec.x - dragged.x,
                y: vec.y - dragged.y,
                z: vec.z - dragged.z
            });
        }
        if (fixed.current) {
            curve.points[0].copy(j3.current.translation());
            curve.points[1].copy(j2.current.translation());
            curve.points[2].copy(j1.current.translation());
            curve.points[3].copy(fixed.current.translation());
            band.current.geometry.setPoints(curve.getPoints(32));
            ang.copy(card.current.angvel());
            rot.copy(card.current.rotation());
            card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
        }
    });

    return (
        <>
            <group position={[0, 4, 0]}>
                <RigidBody ref={fixed} angularDamping={2} linearDamping={2} type="fixed" />
                <RigidBody position={[0.5, 0, 0]} ref={j1} angularDamping={2} linearDamping={2}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody position={[1, 0, 0]} ref={j2} angularDamping={2} linearDamping={2}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody position={[1.5, 0, 0]} ref={j3} angularDamping={2} linearDamping={2}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody
                    position={[2, 0, 0]}
                    ref={card}
                    angularDamping={2}
                    linearDamping={2}
                    type={dragged ? 'kinematicPosition' : 'dynamic'}
                >
                    <CuboidCollider args={[0.8, 1.125, 0.01]}  />
                    <mesh
                        onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
                        onPointerDown={(e) => (
                            e.target.setPointerCapture(e.pointerId),
                            drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
                        )}
                    >
                        <planeGeometry args={[0.8 * 2, 1.125 * 2]} />
                        {texture ? (
                            <meshBasicMaterial map={texture} />
                        ) : (
                            <meshBasicMaterial transparent opacity={0.25}  color="teal" side={THREE.DoubleSide} />
                        )}
                    </mesh>

                    {/* Add text inside the card */}
                    <Text
                        position={[0, 0, 0.01]} // Adjust position to slightly come out of the plane
                        fontSize={0.3}
                        color="white"
                        fontWeight={800}
                        anchorX="center"
                        anchorY="middle"
                    >
                       Kiran
                    </Text>
                </RigidBody>

            </group>
            <mesh ref={band}>
                <meshLineGeometry />
                <meshLineMaterial transparent opacity={0.75} color="white" depthTest={false} resolution={[width, height]} lineWidth={2} />
            </mesh>
        </>
    );
}

export default BlogHome;
