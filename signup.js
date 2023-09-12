//sign up

import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import {Text, View, TextInput, Image, Dimensions, ActivityIndicator} from 'react-native'
//import { TextInput } from 'react-native-gesture-handler';
import plethore_icon from './img/ak.png';
import {firebase, db} from './fbconfig'
import LinearGradient from 'react-native-linear-gradient';
import fbicon from './img/facebook.png'
import gmailcon from './img/gmail.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pressable } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import * as Animatable from 'react-native-animatable'
import PushNotification, {importance} from 'react-native-push-notification';

const phoneWidth=Dimensions.get('window').width
const phoneHeight=Dimensions.get('window').height



const Signup=({navigation})=>{
    //const provider=new firebase.auth.FacebookAuthProvider()
    const [username, setUserName]=useState('')
    const [loggin, setLoggin]=useState(false)
    const [pwd, setPwd]=useState('')
    const [usermail, setUserMail]=useState('')

   // const dbRef=firebase.firestore().collection('users')
   // const auth=firebase.auth()
    //firebase.auth().useDeviceLanguage()//the google authentication will detect the phone's user language

    /*
    const googleAuth=()=>{
        firebase.auth().signInWithRedirect(provider)

    }
    */

    const saveValue= async()=>{
        if(usermail){
           await AsyncStorage.setItem('@mail', usermail)
            
        }
        if(pwd){
          await  AsyncStorage.setItem("@pass", pwd)
                        
        }
        //getValueFunc()
    }


    useEffect(()=>{
        
        const getVal=async()=>{
            let savedMail=await AsyncStorage.getItem("@mail")
           let savedPwd=await AsyncStorage.getItem("@pass")
           if(savedMail && savedPwd){

            firebase.auth()
            .signInWithEmailAndPassword(savedMail, savedPwd)
            
        }
        }
        getVal()

    }, [])

    
    
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((authenticated)=>{
      if(authenticated){
        //const email=firebase.auth().currentUser.email
        if(authenticated && firebase.auth().currentUser.email==="altokudos@gmail.com"){ 
          navigation.navigate('Admin')
        }
        else navigation.navigate('User')
//authenticated? setLog(true):setLog(false)

      }
    
      
    })
  }, [])
    

    const connectUser=()=>{
        setLoggin(true)
        if(!username || !pwd || !usermail){
            alert('Veuillez remplir tous les champs')
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(usermail, pwd)
                      .then((userCredential)=>{
                        const user=userCredential.user
                        const userId=user.uid
                        const userDetails={userId, username, pwd}
                        db.child('users').push(userDetails)
                        .then(()=>{
                            PushNotification.localNotification({
                                autoCancel: true,
                                channelId: "ak99",
                                bigText:
                                  `Ravi de te compter parmi nous, ${username}`,
                                subText: 'Bienvenu(e)',
                                title: 'Altokudos',
                                message: `Bienvenu(e)`,
                                vibrate: true,
                                vibration: 300,
                                playSound: true,
                                
                                soundName: 'default',
                                actions: '["Okay", "Ignorer"]'
                               
                              },
                             )
                            saveValue()
                            setLoggin(false)
                        })
                        //alert('Bienvenue')
                        .catch((error)=>{
                            alert(error.message)
                            setLoggin(false)
                        })
                      })
                      .catch((e)=>{
                        const errCode=e.code
                        const errMsg=e.message
                        alert(errMsg)
                        setLoggin(false)
                      })
        }
    }

    return(
      <LinearGradient start={{x:0,y:1}} end={{x:0, y:0}} style={styles.main} colors={["black", 'black']}>

<View style={styles.header}>
                <Animatable.Image animation="bounceInUp" source={plethore_icon} style={styles.logo_img}  delay={1000}/>
            </View>
        <Animatable.Text style={{color:'#ddd', position:'absolute', fontSize:24, top:'24%', fontFamily:"sans-serif", fontWeight:'bold', letterSpacing:2}} iterationCount={1} delay={1500} animation='fadeInUp'>ALTOKUDOS</Animatable.Text>

        
             <ScrollView style={{width:'100%', maxHeight:'70%', backgroundColor:'rgba(255, 255, 255, 0.9)', borderTopLeftRadius:20, borderTopRightRadius:20}}>

            <View>
            <Text style={{color:'#444',  fontSize:28, textAlign:'left', fontFamily:'fantasy', marginTop:'5%', marginLeft:'8%'}}>Créer un compte</Text>
            </View>
            

            <View style={styles.form}>

                <View style={styles.inputView}>
                    <Entypo name='user' color='black' size={22} style={{paddingHorizontal:8}} />
                <TextInput 
                    placeholder="Nom d'utilisateur"
                    placeholderTextColor="#333"
                    secureTextEntry
                    onChangeText={(e)=>setUserName(e)}
                    keyboardType='email-address'
                    value={username}
                    multiline={false}
                    style={styles.in}
                />
                </View>


                <View style={styles.inputView}>
                    <Entypo name='email' color='black' size={22} style={{paddingHorizontal:8}} />
                <TextInput 
                    placeholder="Email"
                    placeholderTextColor="#333"
                    onChangeText={(e)=>setUserMail(e)}
                    secureTextEntry
                    keyboardType='email-address'
                    value={usermail}
                    multiline={false}
                    style={styles.in}
                />
                </View>



                <View style={styles.inputView}>
                <Entypo name='lock' color='black' size={22} style={{paddingHorizontal:8}} />
                <TextInput 
                    placeholder="Mot de passe"
                    placeholderTextColor="#333"
                    onChangeText={(e)=>setPwd(e)}
                    secureTextEntry
                    value={pwd}
                    multiline={false}
                    style={styles.in}
                />
                </View>


                <View style={styles.inputView}>
                <Entypo name='lock' color='black' size={22} style={{paddingHorizontal:8}} />
                <TextInput 
                    placeholder="Confirmer le mdp"
                    placeholderTextColor="#333"
                    //onChangeText={(e)=>setPwd(e)}
                    secureTextEntry
                    //value={pwd}
                    multiline={false}
                    style={styles.in}
                />
                </View>
        

                <LinearGradient   start={{x:0, y:0}} end={{x:1, y:1}} style={styles.submit} colors={['black', '#111']}>
                {
                        loggin?
                        <ActivityIndicator size={'large'} color={'white'} />:
                        <Text onPress={connectUser} style={{color:'white', fontSize:22}}>connexion</Text>

                    }
                    
                </LinearGradient>

            </View>

           
            <LinearGradient start={{x:0, y:0}} end={{x:1, y:1}} colors={['#ddd', "#bbb"]} style={styles.create}>
                <Text style={{color:'white', fontSize:20}} onPress={()=>navigation.navigate('Login')}>Se connecter</Text>
            </LinearGradient>
           
            </ScrollView>
            
       
        </LinearGradient>
       
        
    )

}
export default Signup

const styles={
    main:{
        flex:1,
        flexDirection:'column',
        width:'100%',
        backgroundColor:'rgba(0,0,0,0.1)',
        alignItems:'center',
        //paddingTop:"2%",
        
        height:phoneHeight,
        justifyContent:'flex-end',
        
        
    },
    header:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        display:'flex',
        position:'absolute', fontSize:24, top:'10%',
       
    },
    inputView:{
        height:40,
        borderRadius:10,
        width:'96%',
        justifyContent:'center',
        display:'flex',
        flexDirection:'row',
        backgroundColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        marginTop:10,
        //borderRadius:10

    },
    gra:{
        paddingLeft:10,
        borderRadius:16,
        width:'100%',
        height:'100%',
        paddingRight:6,

    },
    logo_img:{
        width:120,
        height:120,
        alignItems:'center',
        borderRadius:100
    },
    in:{
        flex:1,
        width:'96%',
        textAlign:'left',
        color:'#333',
        //marginTop:12,
        fontSize:16,
        marginBottom:4,
        height:'100%',
        marginLeft:"3%",
        justifyContent:'space-around',
        alignItems:'center',

    },
    form:{
        marginLeft:'5%',
        justifyContent:'space-evenly',
        width:'90%',

        display:'flex',
        //backgroundColor:'rgba(0,0,0,0.5)',
        alignItems:'center',
        flexDirection:'column',
       // backgroundColor:'rgba(0,0,0,0.7)',
        //borderWidth:1,
        borderColor:'rgba(0,0,0,0.4)',
        borderRadius:24,
        height:400,
        maxHeight:420,
        //maxHeight:620,
        /*shadowOffset:{
            width:-1, height:8
        },
        shadowColor:'black',
        shadowOpacity:0.4,
        shadowRadius:4,
        elevation:10
    */
        
    },

    submit:{
        width:'96%',
        padding:12,
        flexDirection:'row',
        alignItems:'center',
        borderRadius:10,
        justifyContent:'center',
        
    },
    link:{
        width:'100%',
        display:'flex',
        marginTop:'4%',
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    conn:{
        width:60,
        height:60
    },
    create:{
        width:'86%',
        //height:'20%',
        flexDirection:'row',
        alignItems:'center',
        borderRadius:10,
        justifyContent:'center',
        borderWidth:2,
        marginLeft:'7%',        
        padding:12,
    }
    

}



