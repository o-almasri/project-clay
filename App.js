import { Text, View } from 'react-native';
import Main from './src/screens/main';
import styles from './src/styles/styles';
import Signup from './src/screens/signup';

export default function App() {
  return (
    <View style={styles.container}>
      <Signup />
      {/* <Main /> */}
    </View>
  );
}






