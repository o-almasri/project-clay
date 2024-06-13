import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  CheckBox,
} from "react-native";
import styles from "../styles/styles";


function Form() {
  const [isSelected ,setSelection] = useState(false);
  const [name ,setName] = useState("");
  const [Password ,setPassword] = useState("");

  return (
    <View style={styles.cardContainer}>
      <View style={[styles.card, styles.shadow]}>
        <ScrollView>
          <View style={styles.ScrollView}>
            <Text style={styles.title}>Welcome Back </Text>
            <Text style={styles.subtitle}>
              Don't have an account ?{" "}
              <Pressable>
                <Text style={styles.formText}>SignUp</Text>
              </Pressable>
            </Text>

            {/*UserName*/}
            <View style={styles.formTextView}>
              <Text style={styles.formText} >User Name</Text>
            </View>
            <TextInput style={styles.input} value={name} onChangeText={setName} />


            {/*Password*/}
            <View style={styles.formTextView}>
              <Text style={styles.formText}>Password</Text>
            </View>
            <TextInput style={styles.input} secureTextEntry={true} value={Password} onChangeText={setPassword}  />

           
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
              />
              <Text style={[styles.formText, styles.nomargin]}>
                Remember Me
              </Text>
            </View>

            <Pressable style={styles.btn}>
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>


            <Text style={styles.formText}>{isSelected?"checked":""}{name}{Password}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default Form;
