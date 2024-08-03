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
  const [password ,setPassword] = useState("");
  const [errors ,setErrors] = useState({});

  const validateForm = () => {
    let errors={}
    if(!name) errors.username = "Username is required"
    if(!password) errors.password = "password is required"

setErrors(errors)
return Object.keys(errors).length ===0;

  }
const handleSubmit = () =>{
  if(validateForm()){
    console.log("Submitted",name,password);
    setName("");
    setPassword("");
    setErrors({});

  }
}


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
              {errors.username ? <Text style={styles.errorText}>{errors.username}</Text>:null}
              <Text style={styles.formText} >UserName</Text>
            </View>
            <TextInput style={styles.input} value={name} onChangeText={setName} />


            {/*Password*/}
            <View style={styles.formTextView}>
              <Text style={styles.formText}>Password</Text>
              {errors.password ? <Text style={styles.errorText}>{errors.password}</Text>:null}
            </View>
            <TextInput style={styles.input} secureTextEntry={true} value={password} onChangeText={setPassword}  />

           
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

            <Pressable style={styles.btn} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>


            <Text style={styles.formText}>{isSelected?"checked":""}{name}{password}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default Form;
