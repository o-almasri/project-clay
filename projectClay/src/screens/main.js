import { StatusBar } from 'expo-status-bar';
import {Text, View } from 'react-native';
import { Canvas } from '@react-three/fiber/native';
import styles from '../styles/styles';
import CustomButton from '../components/CustomButton'
export default function main() {

  return (

    <View style={styles.container}>
        
    <Canvas>
      <ambientLight intensity={0.1} />
      <directionalLight color="red" position={[0, 0, 5]} />
      <mesh >
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
    </Canvas>
      <View style={styles.overlay}>
          <Text style={styles.text}>2D Title</Text>
          <View style={styles.btnContainer}>
            <CustomButton/>
            <CustomButton/>
          </View>
          
        </View>
      </View>

  );
}

