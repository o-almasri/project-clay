import { View } from "react-native";
import styles, { colors } from "../styles/styles";
import Form from "../components/form";
import MyCanvas from "../components/MyCanvas";

export default function main() {
  return (
    <View style={styles.container}>
      <MyCanvas />
      {/*<Form />*/}
    </View>
  );
}
