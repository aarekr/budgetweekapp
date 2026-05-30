import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
  },
  top: {
    //flex: 1,
    width: '100%',
    backgroundColor: '#9ea7d6',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 35,
    textTransform: 'uppercase',
    marginBottom: 50,
  },
  body: {
    flex: 1,
    //backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  bodytext: {
    margin: 5,
  },
  summaryText: {
    margin: 2,
  },
  textinput: {
    width: 200,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: '38%',
    marginTop: 10,
    marginBottom: 10,
  },
  startbutton: {
    width: 120,
    height: 30,
    backgroundColor: '#4bd14b',
    alignItems: 'center',
    //justifyContent: 'center',
    //marginBottom: 20,
    margin: 10,
  },
  warningModal: {
    width: 300,
    height: 270,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099'
  },
  warningTitle: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  warningBody: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warningMobalButton: {
    backgroundColor: '#00ffff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default styles
