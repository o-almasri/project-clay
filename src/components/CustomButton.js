import { Button ,View } from "react-native";
import styles from "../styles/styles";

function CustomButton(){

return(
  <View style={styles.btn}>
  <Button 
        title="Press me"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
</View>
);

}

export default CustomButton;