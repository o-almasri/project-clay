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







function signupfunc() {

    //for signup
    const [email, setEmail] = useState("");
    const [newpassword, setnewPassword] = useState("");
    const [newpassword2, setnewPassword2] = useState("");
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [errors, setErrors] = useState({});
    const [isSelected, setSelection] = useState(false);

    const handlesignup = () => {
        if (validateInput()) {
            console.log("Submitted", email, newpassword);
            setEmail("");
            setnewPassword("");
            setErrors({});

        }
    }


    return (

        <View>
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

            <Text style={styles.formText}>{isSelected ? "checked" : ""}{"name"}{"password"}</Text>
        </View>

    );
}

export default function singup() {
    return (


        <ScrollView contentContainerStyle={[styles.Center,]}>
            <View style={[styles.card_Full, styles.shadow,]}>
                {/* {signupfunc()} */}
            </View>
        </ScrollView >

    );
}



