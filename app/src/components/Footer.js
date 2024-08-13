import React from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import styles, { colors } from "../styles/styles";
import { router } from 'expo-router';
const Footer = () => {
    return (
        <View style={styles.footercontainer}>
            <Pressable style={styles.navItem} onPress={() => { router.navigate(''); }}>
                <Text style={styles.footerText}>Copy Rights Reserved</Text>
            </Pressable>
        </View>
    );
};



export default Footer;