//login page
import { ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity} from 'react-native';
import {Text, View, Image, Dimensions, TextInput} from 'react-native'
//import { TextInput } from 'react-native-gesture-handler';
import { useState, useEffect, useCallback } from 'react';
import {firebase} from './fbconfig'
import plethore_icon from './img/ak.png';
import LinearGradient from 'react-native-linear-gradient';
import fbicon from './img/facebook.png'
import bgImg from './img/xw.jpg'
import gmailcon from './img/gmail.png'
import * as Animatable from 'react-native-animatable'
import { useFocusEffect } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
const phoneWidth=Dimensions.get('window').width
const phoneHeight=Dimensions.get('window').height
const Login=({navigation})=>{

    const [pwd, setPwd]=useState('')
    const [usermail, setUserMail]=useState('')
    const [currentMail, setCurrentMail]=useState('')
    const [userIn, setUserIn]=useState(false)
    const [loggin, setLoggin]=useState(false)

    const saveValue= async()=>{
        if(usermail){
           await AsyncStorage.setItem('@mail', usermail)
            //setUserMail('')
        }
        if(pwd){
          await  AsyncStorage.setItem("@pass", pwd)
            //setPwd('')
        }
        //getVal()
    }


    /*
    const getVal=()=>{
        if(usermail==null && pwd==null){
            login()
        }
        else{
            if(usermail){
                AsyncStorage.getItem('@mail', usermail)
                setUserMail('')
            }
            if(pwd){
                AsyncStorage.getItem('@pass', pwd)
                                setPwd('')
            }

            firebase.auth().signInWithEmailAndPassword(usermail, pwd)
            .then(()=>{
                if(usermail==='altokudos@gmail.com'){
                    navigation.navigate('Admin')
                }
                else{
                    navigation.navigate('User')
                }
            })
            .catch((e)=>console.error(e))
        }
    }
    */


    useEffect(()=>{
        
        const getValue=async()=>{
            let savedMail=await AsyncStorage.getItem("@mail")
           let savedPwd=await AsyncStorage.getItem("@pass")
           if(savedMail && savedPwd){
            //setCurrentMail(savedMail)
            setUserIn(true)
            //setCurrentMail(savedMail)
            firebase.auth()
            .signInWithEmailAndPassword(savedMail, savedPwd)
            .then(()=>{
                if(savedMail=='altokudos@gmail.com'){
                    navigation.navigate('Admin')
                }

                else{
                    navigation.navigate('User')
                } 
            }
            )
            
        }
        else{
            setUserIn(false)
        }
        }
        
       getValue()

   }, [])


   

/*
    useEffect(()=>{
        const checker=async()=>{
            let savedMail=await AsyncStorage.getItem("@mail")
            //let savedPwd=await AsyncStorage.getItem("@pass")
            if(userIn){
                if(savedMail==='altokudos@gmail.com'){
                    navigation.navigate('Admin')
                }

                else navigation.navigate('User')
            }

        }     
        checker()   
        
    }, [])
    */
    
    

    
    const login=async()=>{
        setLoggin(true)
        if(usermail){
            await AsyncStorage.setItem('@mail', usermail)
             //setUserMail('')
         }
         if(pwd){
           await AsyncStorage.setItem("@pass", pwd)
             //setPwd('')
         }
        firebase.auth().signInWithEmailAndPassword(usermail, pwd)
        .then((user)=>{
            console.log(user)
            if(usermail==='altokudos@gmail.com'){
                navigation.navigate('Admin')
                setLoggin(false)
            }
            else{
                            navigation.navigate('User')
                            setLoggin(false)
                        }
            //saveValue()
            
        })
        .catch((error)=>{
            alert(error.message)
            setLoggin(false)
        })
    }
    
    /*

    const login=()=>{
        firebase.auth().signInWithEmailAndPassword(usermail, pwd)
        .then(()=>{
            if(usermail==='altokudos@gmail.com'){
                navigation.navigate('Admin')
            }
            else{
                navigation.navigate('User')
            }

        })
        .catch((e)=>console.log(e))

    }

*/
    


  useFocusEffect(
    useCallback(() => {
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              // User is sig in.

              if(usermail==='altokudos@gmail.com'){
                navigation.navigate('Admin')
            }
            else{
                            navigation.navigate('User')
                        }
            }
            else{
                navigation.navigate('Login')
            }
        })
    }))

/*
  useEffect(()=>{
    userIn? navigation.navigate('User'):''
  }, [userIn])
*:

  /*
   userIn? 
        <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center', width:phoneWidth, height:phoneHeight}}>
                <Animatable.View animation='bounceInUp' iterationCount={1} style={{width:'80%', borderRadius:20, height:'30%', justifyContent:'space-evenly', alignItems:'center', backgroundColor:'rgba(0,0,0,0.8)'}}>
                <Image source={plethore_icon} style={{width:80, height:80}} />
                
                <ActivityIndicator color='darkorange' />
               
        </Animatable.View>

        </View>
        
        
        :


  */


    return(
        userIn? 
        <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center', width:phoneWidth, height:phoneHeight}}>
                <Animatable.View animation='bounceInUp' iterationCount={1} style={{width:'100%', height:'100%', justifyContent:'space-evenly', alignItems:'center', backgroundColor:'rgba(0,0,0,0.9)'}}>
                <Image source={plethore_icon} style={{width:120, height:120}} />
                
                <ActivityIndicator color='darkorange' />
               
        </Animatable.View>

        </View>
        
        
        :
    
     
      <LinearGradient start={{x:0,y:1}} end={{x:0, y:0}} style={styles.main} colors={["#000", "#222"]}>

        
            
            <View style={styles.header}>
                <Animatable.Image animation="bounceInUp" source={plethore_icon} style={styles.logo_img}  delay={1000}/>
            </View>
        <Animatable.Text style={{color:'#ddd', position:'absolute', fontSize:24, top:'24%', fontFamily:"sans-serif", fontWeight:'bold', letterSpacing:2}} iterationCount={1} delay={1500} animation='fadeInUp'>ALTOKUDOS</Animatable.Text>
       
        
        
             <ScrollView style={{width:'100%', maxHeight:'60%', backgroundColor:'rgba(255, 255, 255, 0.7)', borderTopLeftRadius:20, borderTopRightRadius:20}}>
             
            

            <View>
            <Text style={{color:'#444',  fontSize:28, textAlign:'left', fontFamily:'fantasy', marginTop:'5%', marginLeft:'8%'}}>Se connecter</Text>
            </View>
            

            <View style={styles.form}>
                <View style={styles.inputView}>
                    <Entypo name='email' color='black' size={22} style={{paddingHorizontal:8}} />
                <TextInput 
                    placeholder="Email"
                    placeholderTextColor="#333"
                    onChangeText={(e)=>setUserMail(e)}
                    secureTextEntry
                    keyboardType='email-address'
                    blurOnSubmit
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
                    blurOnSubmit
                    style={styles.in}
                />
                </View>

                

                <LinearGradient start={{x:0,y:0}} end={{x:1, y:1}} style={styles.submit} colors={['black', '#111']}>
                    {
                        loggin?
                        <ActivityIndicator size={'large'} color={'white'} />:
                        <Text onPress={login} style={{color:'white', fontSize:22}}>connexion</Text>

                    }
                    
                </LinearGradient>

            </View>

            <LinearGradient start={{x:0,y:0}} end={{x:1, y:1}}colors={['#ddd', "#bbb"]} style={styles.create}>
                <Text style={{color:'black', fontSize:22}} onPress={()=>navigation.navigate('Signup')}>Créer un compte</Text>
            </LinearGradient>

            <Text style={{color:'#333', marginTop:'4%', marginLeft:'7%', fontWeight:'bold', fontSize:14}}>Mot de passe oublié?</Text>
           
            </ScrollView>
            
       
        </LinearGradient>
     
        
    )

}
export default Login

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
        height:300,
        maxHeight:340,
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
      //  backgroundColor:'darkorange',
        width:'96%',
        //height:'20%',
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

