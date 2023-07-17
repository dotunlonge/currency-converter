import { StyleSheet } from 'react-native';


export const shared = {
  padButton: (height, width) => {
    const padHeight = height - (0.535 * height);
    const buttonWidth = width / 5;
    return {
      minWidth: buttonWidth,
      minHeight: padHeight / 5,
      margin: "0%",
      marginBottom: "5%",
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
      textAlign: 'center',
      padding: "0%",
    }
  }
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    height: '100%',
    paddingTop: "10%"
  },
  tofrom: {
    backgroundColor: 'black',
    height: "50%",
    paddingRight: "3.5%",
    paddingBottom: "3.5%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  divider: {
    height: 0,
    width: "100%",
    backgroundColor: "#1a1a1a",
    padding: 0.1,
    flex: 1,
    alignSelf: "center"
  },
  format: {
    width: "35%",
    text: {
      fontSize: 20,
      fontWeight: "500",
      color: "#fff",
      padding: 12.5,
      paddingLeft: 20,
      paddingRight: 20,
      borderColor: "#1a1a1a",
      borderRadius: 10,
      textAlign: 'center'
    }
  },
  values: {
    width: "65%",
    alignItems: "flex-start",
    justifyContent: "center",
    alignSelf: "center"
  },
  conversion: {
    width: '100%',
    height: '40%',
  },
  formatted: {
    fontSize: 14,
    color: "silver",
    paddingRight: 5,
    //flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: 'wrap'
  },
  valuesText: {
      fontSize: 45,
      fontWeight: "bold",
      color: "#fff",
  },
  pad: {
    width: '100%',
    height: '60%',
    backgroundColor: 'black',
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
    paddingLeft: "7%",
    paddingRight: "7%",
    marginTop: "7.5%",
    justifyContent: 'space-between',
  },
  PressedPadButton: (height, width) => {
    const btn = shared.padButton(height,width);
    return {
      ...btn,
      backgroundColor: 'gold',
    }
  },
  UnPressedPadButton:  (height, width) => {
    const btn = shared.padButton(height,width);
    return {
      ...btn,
      backgroundColor: '#1a1a1a',
    }
  },
  padIcon: {
    padding: 0,
    lineHeight: 0,
    height: "100%",
    width: "100%",
    margin: 0,
    textAlign: "center",
    flex: 1,
    fontSize: 21,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: "center",
  },
  padButtonText: {
    fontSize: 26,
    color: '#fff',
  }
});
