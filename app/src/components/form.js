import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  CheckBox,
} from "react-native";

import { TabView, SceneMap } from 'react-native-tab-view';

import styles from "../styles/styles";
import { router } from 'expo-router';

function Form() {
  const [isSelected, setSelection] = useState(false);



  //for login
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  //for navigation
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'AboutUs' },
    { key: 'second', title: 'Login' },

  ]);




  //Login Functions
  const validateForm = () => {
    let errors = {}
    if (!name) errors.username = "Username is required"
    if (!password) errors.password = "password is required"


    setErrors(errors)
    return Object.keys(errors).length === 0;

  }

  const handleSubmit = () => {
    //TODO:: handleSubmit properly
    if (validateForm()) {
      console.log("Submitted", name, password);
      setName("");
      setPassword("");
      setErrors({});
      // http://localhost:8081/src/screens/selection

      router.navigate('/src/screens/home');
    }
  }

  function setphonenumber(text) {
    // // Remove non-numeric characters from the phone number
    const numericPhone = text.replace(/[^0-9]/g, '');

    // Check if the numeric phone number has a valid length
    if (numericPhone.length < 10) {
      setPhone(numericPhone)
    }
    else if (numericPhone.length >= 10 && numericPhone.length <= 15) {
      setPhone(numericPhone); // Update the state with the valid phone number
    } else {
      // Show an alert for invalid phone number
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number.');
    }
  };

  const next = () => {
    setIndex(1)
  }

  const login = () => {
    return (<>
      <View style={styles.ScrollView}>
        <Text style={styles.title}>Welcome Back </Text>
        <Text style={styles.subtitle}>
          Don't have an account ?{" "}
          <Pressable onPress={() => {
            // go to login
            router.navigate('/src/screens/signup');
          }}>
            <Text style={styles.formText}>SignUp</Text>
          </Pressable>
        </Text>

        {/*UserName*/}
        <View style={styles.formTextView}>

          <Text style={styles.formText} >UserName</Text>
          {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
        </View>
        <TextInput style={styles.input} value={name} onChangeText={setName} />


        {/*Password*/}
        <View style={styles.formTextView}>
          <Text style={styles.formText}>Password</Text>
          {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
        </View>
        <TextInput style={styles.input} secureTextEntry={true} value={password} onChangeText={setPassword} />


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


        <Text style={styles.formText}>{isSelected ? "checked" : ""}{name}{password}</Text>
      </View>
    </>);
  }




  function aboutus() {
    return (
      <View style={[styles.ScrollView]}>
        <Text style={styles.title}>Project Clay </Text>
        <Text style={styles.subtitle}>
          A cross-platform clay creation app for designing pottery, streamlining your creative process, and commissioning your designs from preferred shops
        </Text>

        <Text style={[styles.subtitle, styles.marginTop]}>
          Contributors :
        </Text>
        <Text style={styles.subtitle}>
          Omar Almasri || Oops SDK
        </Text >

        <Pressable style={[styles.btn, styles.marginTop]} onPress={next}>
          <Text style={styles.buttonText}>Next {'>>>'}</Text>
        </Pressable>

      </View >
    );
  }


  const renderScene = SceneMap({
    first: aboutus,
    second: login,

  });


  function navigator() {
    return (<TabView
      tabBarPosition='bottom'
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={() => { }}
    />
    )
  }





  return (
    <View style={styles.cardContainer}>
      <View style={[styles.card, styles.shadow]}>
        <ScrollView style={styles.noScroll} >
          {navigator()}
        </ScrollView>
      </View>
    </View>
  );
}

export default Form;
