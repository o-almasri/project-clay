import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Canvas } from '@react-three/fiber/native';





export default function App() {
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
      <Text style={styles.text}>Hello There</Text>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  canvas: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: -1, // Place canvas behind the overlay
    pointerEvents: 'none'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black', // Adjust text color as needed
  },
});




