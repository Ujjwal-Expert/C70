import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet,TextInput } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
        scannedData:'',
        scannedBookID:'',
        scannedStudentID: '',
        buttonState:'normal'
      }
    }

    getCameraPermissions = async (id) =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      
      this.setState({
        /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
        hasCameraPermissions: status === "granted",
        buttonState: id,
        scanned: false
      });
    }

    handleBarCodeScanned = async({type, data})=>{
      this.setState({
        scanned: true,
        scannedData: data,
        buttonState: 'normal'
      });
    }

    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;
      
      if (buttonState !== "normal" && hasCameraPermissions){
        return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        );
      }

      else if (buttonState === "normal"){
        return(
          <View style={styles.container}>
            <View>
              <Image sytle={{width:150,height:150}} source={require('../assets/booklogo.png')}/>
              <Text style={styles.wileyStyle}>Wily</Text>
            </View>

            <View style={styles.inputView}>
            <TextInput
              style = {styles.inputBox}
              placeholder="BookId"
              value = {this.state.scannedBookID>

.   n         <TouchableOpacity onPress={()=>{this.getCameraPermissions("BookID")}} style={styles.scanButtonInput}>
            <Text style = {styles.buttonText}>SCAN</Text>

              </TouchableOpacity>
             </View>
             <View style={styles.inputView}>
            <TextInput
              style = {styles.inputBox}
              placeholder="StudentId"
              value = {this.state.scannedStudentID}/>

            <TouchableOpacity onPress={()=>{this.getCameraPermissions("StudentID")}} style={styles.scanButtonInput}>
            <Text style = {styles.buttonText}>SCAN</Text>

              </TouchableOpacity>
             </View>
          <Text style={styles.displayText}>{
            hasCameraPermissions===true ? this.state.scannedData: "Request Camera Permission"
          }</Text>     

          <TouchableOpacity
            onPress={this.getCameraPermissions}
            style={styles.scanButton}>
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 20,
      textAlign: 'center',
      marginTop: 10
    },

    inputView:{
      flexDirection: 'row',
      margin: 20
    },
    inputBox:{
      width: 200,
      height: 40,
      borderWidth: 1.5,
      fontSize: 20

    },
    scanButtonInput:{
        backgroundColor: "#874412",
        width: 50,
        borderWidth: 1.5

    },
    wileyStyle:{
      fontSize:30,
      alignSelf:'center',
      color:'#a412b3'
    }
  });