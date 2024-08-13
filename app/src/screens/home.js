import {
    View, Text,
    ScrollView,
    TextInput,
    Pressable,
} from "react-native";
import styles, { colors } from "../styles/styles";
import Form from "../components/form";
import MyCanvas from "../components/MyCanvas";
import CustomCard from "../components/CustomCard";
import NavMenu from "../components/navMenu";
import Footer from "../components/Footer";
const section = () => {

    return (
        // first section
        <>
            <NavMenu />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>

                <View style={[, styles.section]}>
                    <Pressable style={[styles.btn, styles.maxwidth]} onPress={() => {
                        // go to login
                    }}>
                        <Text style={[styles.buttonText,]}>New Design</Text>
                    </Pressable>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', maxWidth: '100%' }}>
                    <View style={{ flex: 1, height: 2, backgroundColor: 'black' }} />
                    <View>
                        <Text style={[styles.buttonText, { width: 100, textAlign: 'center', color: colors.black }]}>Suggested Designs</Text>
                    </View>
                    <View style={{ flex: 1, height: 2, backgroundColor: 'black' }} />
                </View>


                <View style={[styles.section]}>
                    <CustomCard />
                    <CustomCard />
                    <CustomCard />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', maxWidth: '100%' }}>
                    <View style={{ flex: 1, height: 2, backgroundColor: 'black' }} />
                    <View>
                        <Text style={[styles.buttonText, { width: 100, textAlign: 'center', color: colors.black }]}>My History</Text>
                    </View>
                    <View style={{ flex: 1, height: 2, backgroundColor: 'black' }} />
                </View>


                <View style={[styles.section]}>
                    <CustomCard />
                    <CustomCard />
                    <CustomCard />
                </View>



                <Footer />
            </ScrollView>

        </>
    );
}



export default function Home() {
    return (
        <View style={styles.container}>
            {section()}
        </View>
    );
}
