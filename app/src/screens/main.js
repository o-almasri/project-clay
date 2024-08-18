import { View } from "react-native";
import styles, { colors } from "../styles/styles";
import Form from "../components/form";
import MyCanvas from "../components/MyCanvas";

import { useRef, forwardRef, useState, useEffect } from 'react'


import * as SQLite from 'expo-sqlite';

export default function main() {

  // Open or create a database (synchronously)
  const db = SQLite.openDatabaseAsync('glazeit.db');

  return (

    <View style={[styles.container]}>
      <MyCanvas />
      <Form />
    </View>

  );
}




