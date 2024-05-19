"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import { FC, MutableRefObject, use, useEffect, useRef, useState } from "react";
import { random } from "maath";

const Stars = (props) => {
  const inRef = useRef();
  const onRef = useRef();

  const [onSphere] = useState(() =>
    random.onSphere(new Float32Array(10000), { radius: 1 })
  );

  const [inSphere] = useState(() =>
    random.inSphere(new Float32Array(10000), { radius: 0.25 })
  );

  useFrame((state, delta) => {
    inRef.current.rotation.x -= delta / 10;
    inRef.current.rotation.y -= delta / 15;
    onRef.current.rotation.x += delta / 5;
    onRef.current.rotation.y -= delta / 5;
  });
  return (
    <group rotation={[0, 0, 0]}>
      <Points
        ref={inRef}
        positions={onSphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#2b19ed"
          size={0.0085}
          sizeAttenuation={true}
          depthWrite={true}
        />
      </Points>

      <Points
        ref={onRef}
        positions={inSphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="red"
          size={0.0085}
          sizeAttenuation={true}
          depthWrite={true}
        />
      </Points>
    </group>
  );
};

export default function Home(props: any) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("Receba!");
  useEffect(() => {
    setTimeout(() => {
      var _index = index;
      if (index >= text.length) {
        _index = -1;
      }
      setIndex(_index + 1);
    }, 500);
  }, [index]);

  return (
    <>
      <Canvas camera={{ position: [0, 0, 2] }}>
        <Stars />
      </Canvas>
      <h1 className="batata">{text.substring(0, index)}|</h1>
    </>
  );
}
