import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  CheckBox,
} from "react-native";

import {
  useGLTF,
  MeshTransmissionMaterial,
  ContactShadows,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber/native";
import styles, { colors } from "../styles/styles";
import CustomButton from "../components/CustomButton";

export default function main() {
  const [isSelected, setSelection] = useState(false);
  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas} shadows>
        <PerspectiveCamera
          makeDefault
          fov={50}
          position={[0, 0, 5]} // Set the camera's position
          rotation={[0, 0, 0]} // Set the camera's rotation
          near={0.1} // Set the near clipping plane
          far={1000} // Set the far clipping plane
        />
        <ambientLight intensity={2} />
        <directionalLight position={[5, 10, 5]} intensity={4} castShadow />
        <ContactShadows
          resolution={512}
          position={[0, -0.8, 0]}
          opacity={0}
          scale={100}
          blur={0}
          far={0.8}
        />
        {/* Ground Plane */}
        <mesh
          position={[0, -1, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color={colors.white} />
          {/* Set the plane's color to match the background */}
        </mesh>
        {/* BOX */}
        <mesh position={[-1, -0.4, 0]} rotation={[0.1, -0.4, 0]} castShadow>
          <boxGeometry />
          <meshStandardMaterial color={colors.orange} />
        </mesh>
      </Canvas>

      <View style={styles.cardContainer}>
        <View style={[styles.card, styles.shadow]}>
          <ScrollView>
            <View style={styles.ScrollView}>
              <Text style={styles.title}>Welcome Back </Text>
              <Text style={styles.subtitle}>
                Don't have an account ? <Text>SignUp</Text>
              </Text>
              <View style={styles.formTextView}>
                <Text style={styles.formText}>User Name</Text>
              </View>
              <TextInput style={styles.input} placeholder="" />
              <View style={styles.formTextView}>
                <Text style={styles.formText}>Password</Text>
              </View>

              <TextInput
                style={styles.input}
                placeholder="Need Better Implementation"
              />
              <View style={styles.checkboxContainer}>
                <CheckBox
                  value={isSelected}
                  onValueChange={setSelection}
                  style={styles.checkbox}
                />
                <Text style={[styles.formText, styles.nomargin]}>
                  Remember Mes
                </Text>
              </View>

              <Pressable style={styles.btn}>
                <Text style={styles.buttonText}>Login</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
