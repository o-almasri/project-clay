import React from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import styles, { colors } from "../styles/styles";
import { router } from 'expo-router';

function logout() {
    localStorage.removeItem('authToken');
}
const NavMenu = () => {
    return (
        <View style={styles.navcontainer}>
            <Pressable style={styles.navItem} onPress={() => { router.navigate(''); }}>
                <Image
                    source={require('../../../Public/glazeitlogo.png')}
                    // Replace with your actual logo path
                    style={styles.logo}
                />
            </Pressable>
            <View style={styles.navcontainer}>
                <Pressable style={styles.navItem} onPress={() => { /* TODO LATER Handle Home navigation */ }}>
                    <Text style={styles.navText}>Home</Text>
                </Pressable>
                <Pressable style={styles.navItem} onPress={() => { /* Handle About navigation */ }}>
                    <Text style={styles.navText}>About</Text>
                </Pressable>
                <Pressable style={styles.navItem} onPress={() => { /* Handle Contact navigation */
                    logout();
                    router.navigate('');
                }}>
                    <Text style={styles.navText}>LogOut</Text>
                </Pressable>
            </View>
        </View>
    );
};



export default NavMenu;