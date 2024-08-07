import { Pressable, View } from "react-native";
import styles from "../styles/styles";

function CustomCard() {

  return (
    <View style={styles.skcard}>
      <Pressable
        title="Press me"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
    </View>
  );

}

export default CustomCard;