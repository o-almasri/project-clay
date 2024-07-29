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


function Form() {
  const [isSelected, setSelection] = useState(false);


  //for signup
  const [email, setEmail] = useState("");
  const [newpassword, setnewPassword] = useState("");
  const [newpassword2, setnewPassword2] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  //for login
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  //for navigation
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'AboutUs' },
    { key: 'second', title: 'Login' },
    { key: 'third', title: 'SignUP' },
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

    }
  }

  //signUP functions
  const validateInput = () => {
    let errors = {}
    if (!email) errors.email = "Email is required"
    if (!newpassword) errors.newpassword = "password is required"
    if (!newpassword2) errors.newpassword2 = "Password Mismatch"
    if (!phone) errors.phone = "Phone is required"
    if (!street) errors.street = "Street is required"
    if (!city) errors.city = "City is required"
    if (!country) errors.country = "Country is required"

    setErrors(errors)
    return Object.keys(errors).length === 0;

  }

  const validatePass = () => {

  }

  const handlesignup = () => {
    if (validateInput()) {
      console.log("Submitted", email, newpassword);
      setEmail("");
      setnewPassword("");
      setErrors({});

    }
  }


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
            setIndex(2)
          }}>
            <Text style={styles.formText}>SignUp</Text>
          </Pressable>
        </Text>

        {/*UserName*/}
        <View style={styles.formTextView}>
          {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
          <Text style={styles.formText} >UserName</Text>
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


  //TODO: Start by asking for phone number and then navigate to external screen
  //TODO: Edit The Code to minimize layout shift as its BAAAD
  function signup() {
    return (
      <>
        <View style={styles.ScrollView}>
          <Text style={styles.title}>Signup </Text>
          <Text style={styles.subtitle}>
            Already have an account ?{" "}
            <Pressable onPress={() => {
              setIndex(1)
            }}>
              <Text style={styles.formText}>Login</Text>
            </Pressable>
          </Text>

          <Text style={styles.subtitle}>
            Lets Start by choosing username and password !
          </Text>

          {/*UserName*/}
          <View style={styles.formTextView}>
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
            <Text style={styles.formText} >Email</Text>
          </View>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} />


          {/*Password*/}
          <View style={styles.formTextView}>
            <Text style={styles.formText}>Password</Text>
            {errors.newpassword ? <Text style={styles.errorText}>{errors.newpassword}</Text> : null}
          </View>
          <TextInput style={styles.input} secureTextEntry={true} value={newpassword} onChangeText={setnewPassword} />

          {/*password verification*/}
          <View style={styles.formTextView}>
            <Text style={styles.formText}>Repeat Password</Text>
            {errors.newpassword2 ? <Text style={styles.errorText}>{errors.newpassword2}</Text> : null}
          </View>
          <TextInput style={styles.input} secureTextEntry={true} value={newpassword2} onChangeText={setnewPassword2} />

          {/*Phone*/}
          <View style={styles.formTextView}>
            <Text style={styles.formText}>Phone</Text>
            {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
          </View>
          <TextInput style={styles.input} value={phone} onChangeText={setPhone} />


          {/*street*/}
          <View style={styles.formTextView}>
            <Text style={styles.formText}>street</Text>
            {errors.street ? <Text style={styles.errorText}>{errors.street}</Text> : null}
          </View>
          <TextInput style={styles.input} value={street} onChangeText={setStreet} />

          {/*city*/}
          <View style={styles.formTextView}>
            <Text style={styles.formText}>city</Text>
            {errors.city ? <Text style={styles.errorText}>{errors.city}</Text> : null}
          </View>
          <TextInput style={styles.input} value={city} onChangeText={setCity} />

          {/*country*/}
          <View style={styles.formTextView}>
            <Text style={styles.formText}>country</Text>
            {errors.country ? <Text style={styles.errorText}>{errors.country}</Text> : null}
          </View>
          <TextInput style={styles.input} value={country} onChangeText={setCountry} />

          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isSelected}
              onValueChange={setSelection}
              style={styles.checkbox}
            />

            <Text style={[styles.subtitle, styles.nomargin]}>
              I agree to{" "}
              <Pressable onPress={() => {
                //TODO:: Navigate to TermsAnd Conditions Page
              }}>
                <Text style={styles.formText}>Terms and Conditions</Text>
              </Pressable>
            </Text>

          </View>

          <Pressable style={styles.btn} onPress={handlesignup}>
            <Text style={styles.buttonText}>Create Account</Text>
          </Pressable>

          <Text style={styles.formText}>{isSelected ? "checked" : ""}{name}{password}</Text>
        </View>
      </>
    );
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
    third: signup,
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
        <ScrollView style={styles.noScroll}>
          {navigator()}
        </ScrollView>
      </View>
    </View>
  );
}

export default Form;
