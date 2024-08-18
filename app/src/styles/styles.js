import { Scroll } from "@react-three/drei";
import { StyleSheet, Dimensions, PixelRatio } from "react-native";
import { ScrollView } from "react-native-web";

let windowWidth = Dimensions.get("window").width;
let windowHeight = Dimensions.get("window").height;
export const colors = {
  white: "rgba(235, 235, 235, 1)", // Blue
  black: "rgba(60, 60, 60, 1)", // White
  pinkish: "rgba(193, 131, 159, 1)", // Orange
  orange: "rgba(255, 90, 95, 1)", // Grey
  teal: "rgba(8, 126, 139, 1)", // Light Grey
  green: "rgba(60, 179, 113, 1)", // Light Grey
  /*
  white: "rgba(235, 235, 235, 1)", // Blue
  black: "rgba(60, 60, 60, 1)", // White
  pinkish: "rgba(193, 131, 159, 1)", // Orange
  orange: "rgba(255, 90, 95, 1)", // Grey
  teal: "rgba(8, 126, 139, 1)", // Light Grey
  */
  // ... add more colors as needed
};


const styles = StyleSheet.create({
  //entire page container

  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center", //Centered vertically
  },
  canvas: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    //zIndex: -1, // Place canvas behind the overlay
    touchAction: 'none',
  },
  //Card page wide container
  cardContainer: {
    //backgroundColor: "rgba(125, 125, 125, 0)",
    justifyContent: "flexStart",
    alignItems: "center",
    margin: "1%", // margin above title and below buttons adjust later
    borderRadius: 10,
    padding: 20, // Add padding
    flexDirection: "row-reverse",
    height: "100%",
    paddingRight: windowWidth <= 900 ? "auto" : "10%",
    paddingLeft: windowWidth <= 900 ? "auto" : "auto",
    pointerEvents: 'box-none',
  },
  card: {
    width: windowWidth <= 900 ? "100%" : "30%",
    height: "50%",
    backgroundColor: colors.white,
    padding: "1%",
    borderRadius: 20,
    pointerEvents: 'auto',

  },
  ScrollView: { width: "100%", alignItems: "center", },
  noScroll: {
    showsVerticalScrollIndicator: 'false',

  },
  input: {
    borderColor: colors.pinkish,
    width: "95%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: "1%",
  },
  title: {
    fontSize: 32, // Adjust font size as needed
    fontWeight: "bold",
    color: colors.black, // White text color
    textAlign: "center", // Center alignment
    marginBottom: 10, // Add some space below the title
  },
  subtitle: {
    fontSize: 18, // Adjust font size as needed
    fontWeight: "bold",
    color: colors.black, // White text color
    textAlign: "center", // Center alignment
    marginBottom: 10, // Add some space below the title
  },
  btn: {
    backgroundColor: colors.teal, // Blue button color
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: "2%",
    width: "95%",

  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  formText: {
    textAlign: "left",
    color: colors.orange,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: "1%",
    marginBottom: "1%",
  },
  formTextView: {
    textAlign: "left",
    width: "95%",
    marginTop: "1%",
  },
  checkboxContainer: {
    textAlign: "left",
    flexDirection: "row",
    width: "95%",
    marginTop: "1%",
  },
  checkbox: {
    margin: "1%",
  },

  //proper styles start here
  shadow: {
    shadowColor: colors.teal,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 2,
  },
  nomargin: {
    marginTop: 0,
  },
  marginTop: {
    marginTop: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  containerfill: {

    alignitems: 'space-between',

  },
  Center: {
    alignItems: "center",
  },
  width_80: {
    width: windowWidth <= 900 ? "95%" : "80%",
  },
  height_80: {
    height: "80%",
  },
  card_Full: {
    width: windowWidth <= 900 ? "95%" : "80%",
    backgroundColor: colors.white,
    padding: "1%",
    borderRadius: 20,
    pointerEvents: 'auto',
    marginTop: '2%',

  },
  inputcontainer: {
    flexDirection: 'row', // Arrange elements horizontally
    width: '85%',
  },
  firstElement: {
    flex: 1,             // 10% of available space

  },
  secondElement: {
    flex: 8.5,           // 85% of available space

  },

  // home screen styles
  maxwidth: {
    maxWidth: windowWidth <= 900 ? "95%" : '20%',

  },
  section: {
    flexDirection: 'row', // Arrange items horizontally
    justifyContent: 'center', // Distribute space evenly around items
    alignItems: 'center', // Center items vertically (if needed)
    paddingHorizontal: 15, // Optional: Add padding for better visual spacing
    margin: 20,


  },
  scrollViewContent: {
    flexGrow: 1, // Allow content to expand and fill available space
    paddingHorizontal: '10%',
    justifyContent: 'space-evenly', // Evenly space cards horizontally
    width: '100%',  // Ensure ScrollView takes full width
  },
  skcard: {
    backgroundColor: '#E0E0E0', // Light grey color
    borderRadius: 8,           // Optional: rounded corners
    height: '10vw',
    width: '10vw',
    margin: 10,
  },
  //nav menu

  navcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 10,
  },
  footercontainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.teal,
    padding: 10,
    //marginTop: 20,

  },
  navItem: {
    padding: 10,

  },
  navText: {
    fontSize: windowWidth <= 900 ? "3vw" : "1.5vw",
    textAlign: 'center',
    color: colors.orange,
    fontWeight: 'bold',
    padding: 10,
  },
  footerText: {
    fontSize: windowWidth <= 900 ? "3vw" : "1vw",
    textAlign: 'center',
    color: colors.white,
    fontWeight: 'bold',
    padding: 10,
  },
  logo: {
    width: '10vw', // Adjust width as needed
    height: '3.5vw',  // Adjust height as needed
  },
  margin_bottom: {
    marginBottom: 20,
  }
});

export default styles; // Default export
