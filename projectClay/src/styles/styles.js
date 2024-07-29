import { Scroll } from "@react-three/drei";
import { StyleSheet, Dimensions } from "react-native";
import { ScrollView } from "react-native-web";

const windowWidth = Dimensions.get("window").width;
export const colors = {
  white: "rgba(235, 235, 235, 1)", // Blue
  black: "rgba(60, 60, 60, 1)", // White
  pinkish: "rgba(193, 131, 159, 1)", // Orange
  orange: "rgba(255, 90, 95, 1)", // Grey
  teal: "rgba(8, 126, 139, 1)", // Light Grey
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
  ScrollView: { width: "100%", alignItems: "center" },
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
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default styles; // Default export
