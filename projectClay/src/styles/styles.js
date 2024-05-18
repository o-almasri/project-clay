import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: { flex: 1},
    canvas: {
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      zIndex: -1, // Place canvas behind the overlay
      pointerEvents: 'none'
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'space-between',
      alignItems: 'center',
      margin:'20%', // margin above title and below buttons adjust later
      
      
    },
    btnContainer:{
      //adjust later to test buttons as list items if better
      flexDirection: "row",
      justifyContent: "space-around",
      flexWrap: 'wrap',
      width:'100%'
    },
    btn:{
      width:'40%'
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black', // Adjust text color as needed
    },

  });

export default styles; // Default export


