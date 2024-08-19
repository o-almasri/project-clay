import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    ScrollView,
    TextInput,
    Pressable,
    CheckBox,
    Alert,
} from "react-native";

import { TabView, SceneMap } from 'react-native-tab-view';
import { router } from 'expo-router';
import styles, { colors } from "../styles/styles";
import Select from 'react-select'

import NavMenu from "../components/navMenu";
import Footer from "../components/Footer";
import axios from 'axios';



function signupfunc() {
    useEffect(() => {
        setTimeout(() => {
            getcountries();
            setCountry(countryOptions[0]);
        }, 100); // Adjust the timeout as needed

    }, []);



    //for signup
    const [email, setEmail] = useState("");
    const [newpassword, setnewPassword] = useState("");
    const [newpassword2, setnewPassword2] = useState("");
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState();

    const [errors, setErrors] = useState({});
    const [isSelected, setSelection] = useState(false);

    const [countryOptions, setcountryOptions] = useState([]);

    const [cityOptions, setcityOptions] = useState([]);

    const [country, setCountry] = useState();


    useEffect(() => {
        setTimeout(() => {
            if (country)
                getcities();
        }, 200); // Adjust the timeout as needed

    }, [country]);

    const handlesignup = () => {
        if (validateInput()) {
            //console.log("New Record To Be Sent", email, newpassword, phone, street, city.value, country.value, isSelected);
            //TODO:: add data sanatization and regex

            const data = {
                email: email,
                pass: newpassword,
                phone: phone,
                street: street,
                city: city.value,
            };
            axios.post('http://localhost/glazeit/add_user.php', data)
                .then(response => {
                    // console.log(response.data);
                    if (response.data == -1) {
                        console.log(response.data);
                        localStorage.removeItem('authToken');
                    } else if (response.data == -2) {
                        //user already exist

                        setErrors({ userexist: 'User already Exist' })
                        localStorage.removeItem('authToken');
                    } else {
                        //user added and login
                        localStorage.setItem('authToken', response.data);
                        router.navigate('/src/screens/home');
                    }

                })
                .catch(error => {
                    console.error("Error sending data: ", error);
                });

            setEmail("");
            setnewPassword("");
            setnewPassword2("");
            setPhone("");
            setStreet("");
            setCity("");
            setCountry("");
            setErrors({});


            //router.navigate('');
        }
    }

    function getcountries() {

        axios.post('http://localhost/glazeit/get_countries.php')
            .then(response => {
                //console.log(response.data);
                let countries = [];
                response.data.forEach(element => {
                    countries.push({ value: element.id, label: element.name })
                });

                setcountryOptions(countries);
                setCountry(countries[0]);
            })
            .catch(error => {
                console.error("Error sending data: ", error);
            });

    }


    function getcities() {
        const data = {
            id: country.value,
        };
        axios.post('http://localhost/glazeit/get_cities.php', data)
            .then(response => {

                //console.log(response.data);
                let cities = [];
                response.data.forEach(element => {
                    cities.push({ value: element.id, label: element.name })
                });

                setcityOptions(cities);
                setCity(cities[0]);
            })
            .catch(error => {
                console.error("Error sending data: ", error);
            });

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

    function validatePass() {
        //TODO: Regex Check Password Match and criteria  
        let isValid = true;
        let newErrors = {};

        // Check if passwords match
        if (newpassword !== newpassword2) {
            isValid = false;
            newErrors.newpassword2 = 'Passwords do not match';
        }

        // Password criteria check (adjust as needed)
        // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        // if (!passwordRegex.test(newpassword)) {
        //     isValid = false;
        //     newErrors.newpassword = 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character';
        // }
        return isValid;
    };

    const phoneOptions = [
        { value: 'CA', label: 'Canada (+1)' },
        { value: 'JO', label: 'Jordan (+962)' },
        { value: 'US', label: 'United States (+1)' },
        { value: 'BR', label: 'Brazil (+55)' },
        { value: 'CN', label: 'China (+86)' },
        { value: 'FR', label: 'France (+33)' },
        { value: 'DE', label: 'Germany (+49)' },
        { value: 'IN', label: 'India (+91)' },
        { value: 'JP', label: 'Japan (+81)' },
        { value: 'MX', label: 'Mexico (+52)' },
        { value: 'RU', label: 'Russia (+7)' },
        { value: 'ZA', label: 'South Africa (+27)' }
    ]

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
        if (!isSelected) errors.checkbox = "you need to agree to terms and conditions"
        if (!validatePass()) {
            errors.passwordmismatch = "Password Mismatch"
        }

        setErrors(errors)
        return Object.keys(errors).length === 0;

    }


    return (

        <View >
            <Text style={styles.title}>Signup </Text>
            <Text style={styles.subtitle}>
                Already have an account ?{" "}
                <Pressable onPress={() => {
                    router.navigate('');
                }}>
                    <Text style={styles.formText}>Login</Text>
                </Pressable>
            </Text>

            {/*Email/UserName*/}
            <View style={styles.formTextView}>
                <Text style={styles.formText} >Email</Text>
                {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                {errors.userexist ? <Text style={styles.errorText}>{errors.userexist}</Text> : null}
            </View>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} />


            {/*Password*/}

            <View style={styles.formTextView}>
                <Text style={styles.formText}>Password</Text>
                {errors.newpassword ? <Text style={styles.errorText}>{errors.newpassword}</Text> : null}
            </View>
            <TextInput style={styles.input} secureTextEntry={true} value={newpassword} onChangeText={setnewPassword} />
            {errors.passwordmismatch ? <Text style={styles.errorText}>{errors.passwordmismatch}</Text> : null}
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


            <TextInput
                style={[styles.input]}
                keyboardType="numeric"
                value={phone} // Add the value prop here
                onChangeText={(text) => { setphonenumber(text) }}
            />


            {/*TODO:: FIX STYling for this*/}
            {/* <Select
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? colors.teal : colors.pinkish,
                        borderRadius: '10px',
                        width: '10%',
                    }),
                    menu: (baseStyles) => ({  // <-- Add this section
                        ...baseStyles,
                        width: '20%',
                    }),
                    option: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor: state.isFocused ? colors.teal : colors.white,  // Example colors
                        // color: state.isFocused ? 'black' : 'black',               // Example colors
                        ':hover': {                                               // Hover styles
                            backgroundColor: colors.teal,
                            color: colors.white,
                        },
                    }),
                }}
                // defaultValue={countryOptions[0]}
                isClearable={true}
                isSearchable={true}
                name="PhoneOptions"
                options={phoneOptions}
            //onChange={(selectedOption) => { setPhone(selectedOption.value ? selectedOption.value : "") }}
            /> */}


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

            <Select
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? colors.teal : colors.pinkish,
                        width: '95%',
                        borderRadius: '10px',
                    }),
                    menu: (baseStyles) => ({  // <-- Add this section
                        ...baseStyles,
                        width: '95%',       // <-- Set your desired width here
                    }),
                    option: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor: state.isFocused ? colors.teal : colors.white,  // Example colors
                        // color: state.isFocused ? 'black' : 'black',               // Example colors
                        ':hover': {                                               // Hover styles
                            backgroundColor: colors.teal,
                            color: colors.white,
                        },
                    }),
                }}
                //defaultValue={countryOptions[0]}
                isClearable={true}
                isSearchable={true}
                name="city"
                options={cityOptions}
                value={city}
                onChange={(selectedOption) => { setCity(selectedOption ? selectedOption : "") }}
            />
            {/*country*/}
            <View style={styles.formTextView}>
                <Text style={styles.formText}>country</Text>
                {errors.country ? <Text style={styles.errorText}>{errors.country}</Text> : null}
            </View>
            {/* <Select style={styles.input} options={countryOptions} /> */}
            {/* <TextInput style={styles.input} value={country} onChangeText={setCountry} /> */}
            <Select
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? colors.teal : colors.pinkish,
                        width: '95%',
                        borderRadius: '10px',
                    }),
                    menu: (baseStyles) => ({  // <-- Add this section
                        ...baseStyles,
                        width: '95%',       // <-- Set your desired width here
                    }),
                    option: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor: state.isFocused ? colors.teal : colors.white,
                        color: colors.black,
                        ':hover': {
                            backgroundColor: colors.teal,
                            color: colors.white,
                        },
                    }),
                }}
                isClearable={true}
                isSearchable={true}
                name="Country"
                options={countryOptions}
                value={country}
                onChange={(selectedOption) => { setCountry(selectedOption ? selectedOption : "") }}
            />

            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    style={styles.checkbox}
                />

                <Text style={[styles.subtitle, { margin: 1 }]}>
                    I agree to{" "}
                    <Pressable onPress={() => {
                        //TODO:: Navigate to TermsAnd Conditions Page
                    }}>
                        <Text style={styles.formText}>Terms and Conditions</Text>
                    </Pressable>
                </Text>

            </View>
            {errors.checkbox ? <Text style={styles.errorText}>{errors.checkbox}</Text> : null}
            <Pressable style={styles.btn} onPress={handlesignup}>
                <Text style={styles.buttonText}>Create Account</Text>
            </Pressable>



        </View>

    );
}

export default function singup() {





    return (
        <>

            <NavMenu />
            <ScrollView >
                <View style={[styles.Center, styles.margin_bottom]}>
                    <View style={[styles.card_Full, styles.shadow,]}>
                        {signupfunc()}
                    </View>
                </View>
                <Footer />
            </ScrollView >

        </>
    );
}





