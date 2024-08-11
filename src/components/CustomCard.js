import { Pressable, View, Text } from "react-native";
import styles from "../styles/styles";
import { Alert } from "react-native";
function CustomCard() {


  const clicked = () => {
    console.log("pressed");
  };
  return (
    <View style={[styles.Center]}>
      <Pressable style={styles.skcard} onPress={clicked} />
      <Text style={styles.formText}>Temp Design </Text>
      <Pressable />
    </View>
  );

}

export default CustomCard;