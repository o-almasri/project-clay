import { View } from "react-native";
import styles, { colors } from "../styles/styles";
import Form from "../components/form";
import MyCanvas from "../components/MyCanvas";

import { useRef, forwardRef, useState, useEffect } from 'react'
import { router } from 'expo-router';
function getToken() {
  return localStorage.getItem('authToken');
}
export default function main() {


  useEffect(() => {
    const session = getToken();
    if (session !== null) {
      // Redirect to login page
      setTimeout(() => {
        router.navigate('/src/screens/home');
      }, 100); // Adjust the timeout as needed
    }

  }, []);

  return (

    <View style={[styles.container]}>
      <MyCanvas />
      <Form />
    </View>

  );
}




