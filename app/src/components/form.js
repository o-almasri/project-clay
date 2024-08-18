import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  CheckBox,
} from "react-native";

import { TabView } from 'react-native-tab-view';

import styles from "../styles/styles";
import { router } from 'expo-router';

// Memoized UserNameInput component to prevent re-renders
const UserNameInput = React.memo(({ value, onChangeText }) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
    />
  );
});

// Memoized PasswordInput component to prevent re-renders
const PasswordInput = React.memo(({ value, onChangeText }) => {
  return (
    <TextInput
      style={styles.input}
      secureTextEntry={true}
      value={value}
      onChangeText={onChangeText}
    />
  );
});

// Memoized Login scene
const LoginScene = React.memo(({ name, setName, password, setPassword, errors, isSelected, setSelection, handleSubmit }) => {
  return (
    <View style={[styles.ScrollView]}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>
        Don't have an account?{" "}
        <Pressable onPress={() => router.navigate('/src/screens/signup')}>
          <Text style={styles.formText}>SignUp</Text>
        </Pressable>
      </Text>

      {/* UserName */}
      <View style={styles.formTextView}>
        <Text style={styles.formText}>UserName</Text>
        {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
      </View>
      <UserNameInput value={name} onChangeText={setName} />

      {/* Password */}
      <View style={styles.formTextView}>
        <Text style={styles.formText}>Password</Text>
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
      </View>
      <PasswordInput value={password} onChangeText={setPassword} />

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
  );
});

// Memoized AboutUs scene
const AboutUsScene = React.memo(({ next }) => {
  return (
    <View style={[styles.ScrollView]}>
      <Text style={styles.title}>Project Clay</Text>
      <Text style={styles.subtitle}>
        A cross-platform clay creation app for designing pottery, streamlining your creative process, and commissioning your designs from preferred shops.
      </Text>

      <Text style={[styles.subtitle, styles.marginTop]}>
        Contributors:
      </Text>
      <Text style={styles.subtitle}>
        Omar Almasri || Oops SDK
      </Text >

      <Pressable style={[styles.btn, styles.marginTop]} onPress={next}>
        <Text style={styles.buttonText}>Next {'>>>'}</Text>
      </Pressable>
    </View>
  );
});

function Form() {
  const [isSelected, setSelection] = useState(false);

  // State for login
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // State for navigation
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'AboutUs' },
    { key: 'second', title: 'Login' },
  ]);

  // Login Functions
  const validateForm = () => {
    let errors = {};
    if (!name) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Submitted", name, password);
      setName("");
      setPassword("");
      setErrors({});
      router.navigate('/src/screens/home');
    }
  };

  const next = () => {
    setIndex(1);
  };

  // Custom render method for scenes
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <AboutUsScene next={next} />;
      case 'second':
        return <LoginScene
          name={name}
          setName={setName}
          password={password}
          setPassword={setPassword}
          errors={errors}
          isSelected={isSelected}
          setSelection={setSelection}
          handleSubmit={handleSubmit}
        />;
      default:
        return null;
    }
  };

  return (
    <View style={[styles.cardContainer]}>
      <View style={[styles.card, styles.shadow]}>
        <ScrollView style={[styles.noScroll]}>
          <TabView

            tabBarPosition='bottom'
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={() => null}
          />
        </ScrollView>
      </View>
    </View>
  );
}

export default Form;
