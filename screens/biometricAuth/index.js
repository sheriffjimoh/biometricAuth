import React,{Component} from "react";
import {View,Text,StyleSheet, TouchableOpacity,Image} from "react-native"
import ScanImage from "../../assets/download.png"

import * as LocalAuthentication from 'expo-local-authentication'

class index extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isBiometricSupported:false,
            isSavedBiometric:false
         }
     this.setIsBiometricSupported = this.setIsBiometricSupported.bind(this);
     this.handleBiometricAuth = this.handleBiometricAuth.bind(this);
     this.handLogin = this.handLogin.bind(this);
    }
    

    setIsBiometricSupported = async () => {
        // First, we have to check whether the device hardware has support for biometrics.
        //  We’ll use the hasHardwareAsync method provided by the Expo
         const compatible = await LocalAuthentication.hasHardwareAsync();
         this.setState({
             isBiometricSupported:compatible
         })
    }


   handleBiometricAuth = async () => {
    // To check whether biometrics are saved on the user’s device, we’ll use the isEnrolledAsync method. This method
    //  returns a promise that resolves to a boolean isEnrolledAsync(): Promise<boolean>:
     
     const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
          if (!savedBiometrics)
          return Alert.alert(
            'Biometric record not found',
            'Please verify your identity with your password',
            'OK',
            () => fallBackToDefaultAuth()
          );
    }

    handLogin = async () => {
        const LocalAuthenticationOptions = {
            promptMessage: "Login with finger/facial recognition",
            cancelLabel:"Stop login process",
            disableDeviceFallback: true,
            // fallbackLabel: string;
          };
       const hanldeLogin  = await  LocalAuthentication.authenticateAsync(LocalAuthenticationOptions)
       .then((Response) => {
       console.log(Response)
       })
       .catch((error) =>{
           console.log(error)
       })

    // alert("seen")

    }

    componentDidMount(){
        this.setIsBiometricSupported();

        if(this.state.isBiometricSupported){
            this.handleBiometricAuth();
        }
    }
    render() {
        return (
        
        <View style={styles.container}>
            <Text style={styles.headerText}>Login with Biometric</Text>
             <TouchableOpacity style={styles.touchScann} onPress={ () => this.handLogin()}>
              <Image  style={styles.image}   source={require("../../assets/download.png")} />
             </TouchableOpacity>


             <View style={{marginTop:15}}>  
                 <Text> {this.state.sBiometricSupported ? 'Your device is compatible with Biometrics' 
                  : 'Face or Fingerprint scanner is available on this device'}
                 </Text>
             </View>
          </View>

             );
    }

    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    touchScann:{
       
        marginTop:20
    },
    text:{
        color:'#fff'
    },
    image:{
        width:90,
        height:70
    },
    headerText:{
        fontSize:25
    }
  });
  
export default index;