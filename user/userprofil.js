//profiil
import { View, Text, Dimensions, useColorScheme, StyleSheet, PermissionsAndroid, TextInput, Image, BackHandler, TouchableHighlight, Keyboard, TouchableOpacity, ActivityIndicator } from "react-native"
import RNRestart from 'react-native-restart'
import defaultProfilPic from '../img/pof.png'
//import { Button } from "react-native-elements/dist/buttons/Button"
import {firebase, db} from '../fbconfig'
import { useState, useEffect } from "react"
import { Entypo } from "@expo/vector-icons"
//import { TouchableOpacity } from "react-native-gesture-handler"
import * as ImagePicker from 'expo-image-picker'
import LinearGradient from "react-native-linear-gradient"
import AsyncStorage from "@react-native-async-storage/async-storage"


const phoneWidth=Dimensions.get('window').width
const phoneHeight=Dimensions.get('window').height
const UserProfil=({navigation})=>{

    const theme=useColorScheme()
    const isDarkTheme=theme==="dark"

    const Style={
        main:{
            flex:1,
            display:'flex',
            flexDirection:'column',
            justifyContent:'flex-end',
            backgroundColor:'#aaa',
            alignItems:'center',
            height:phoneHeight,
            width:phoneWidth
            
        },
        box:{
            width:'100%', height:'90%',  backgroundColor:isDarkTheme? '#111':'#eee', borderTopLeftRadius:20, borderTopRightRadius:20,
            flexDirection:'column',
            justifyContent:'flex-start',
                    alignItems:'center',
                    marginTop:'22%'
        },
        text:{
            position:'absolute',
            color:'white',
            top:'3%',
            fontSize:20,
            letterSpacing:1,
            fontWeight:'bold',
            fontFamily:'fantasy'
        },
        profilDetails:{
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'darkcyan',
            width:phoneWidth,
            //height:200,
            zIndex:-1,
            flexDirection:'column',
        },
         userName:{
            fontSize:26,
            fontWeight:'bold',
            fontFamily:'sans-serif',
            textAlign:'center',
            //marginTop:'2%',
            alignItems: 'center',
            letterSpacing:1,
            color:'#eee'
         },
         logOut:{
          //  position:'absolute',
           // right:'1%',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            marginTop:"10%",
           // borderWidth:1,
            fontSize:16,
            borderColor:'#ddd',
            borderRadius:5,
            
            
         },
         addInfos:{
            justifyContent:'flex-start',
            width:phoneWidth,
            //marginTop:'10%',
           // marginLeft:'5%',
    
         }
         , infoAdd:{
            fontSize:19,
            color:isDarkTheme? '#ddd': '#666',
            marginLeft:'4%',
            
            alignItems: 'center',
            justifyContent:'center',
            
         }
         ,infosBox:{
            flexDirection:'row',
            marginTop:'6%',
            width:'90%',
            height:phoneHeight/15,
            alignItems:'center',
            borderRadius:20,
            //borderRadius:10,
            marginLeft:'5%',
            backgroundColor:isDarkTheme? '#444':'#fff'
           
         }
       
    }

    const [newUserName, setNewUserName]=useState('')
    const [newPhoneNumber, setPhoneNumber]=useState('')
    const [userAdress, setUserAdress]=useState('')
    const [image, setImage]=useState(null)
    const [users, setUsers]=useState([])
    const [upload, setUpload]=useState(false)
    const [setting, setSetting]=useState(false)
    const [currentUserId, setCurrentUserId]=useState('')
   // const dbRef=firebase.firestore().collection('users')

    /*
    useEffect(()=>{
        const go=async()=>{
        dbRef.onSnapshot(
            querySnapshot=>{
                const user=[]
                querySnapshot.forEach((doc)=>{
                    const {userId, username, pwd, phonenumber, useradress, pic}=doc.data()
                    user.push({
                        id:doc.id,
                        userId, username, pwd, phonenumber, useradress, pic
                    })
                })
                setUsers(user)
            }
        )

        }
        go()

   }, [dbRef])
   */


   useEffect(()=>{
    db.child('users').on('value', (snapshot)=>{
        let update=[]
        snapshot.forEach((child)=>{
            update.push({
                id:child.key,
                username:child.val().username,
                myCart:child.val().myCart,
                activities:child.val().activities,
                userId:child.val().userId,
                pwd:child.val().pwd,
                useradress:child.val().useradress,
                phonenumber:child.val().phonenumber,
                pic:child.val().pic
            })
        })  
        setUsers(update)
    })
}, [])


   useEffect(()=>{
        firebase.auth().onAuthStateChanged((x)=>{
            if(x){
                setCurrentUserId(x.uid)
            }
            //setCurrentUserId(x.uid)
        })
    }, [])

   
    const editedUserName=e=>{
           e.preventDefault()  
            Object.keys(users).map((x, y)=>{
                if(users[x].userId===currentUserId){
                  //   if(newUserName!=="" && newUserName.length>4){
                    setKey(false)
                    Keyboard.dismiss()
                    db.child(`users/${users[x].id}/username`).set(newUserName, (err)=>err)
                    //dbRef.doc(users[x].id).update({username: newUserName})
                   // .then(()=>)

                }
            })
           
        }

        const addEditPhoneNumber=e=>{
            e.preventDefault();
            Object.keys(users).map((x, y)=>{
                if(users[x].userId===currentUserId){
                  //   if(newUserName!=="" && newUserName.length>4){
                    setL(false)
                    Keyboard.dismiss()
                    db.child(`users/${users[x].id}/phonenumber`).set(newPhoneNumber, (err)=>err)
                   // dbRef.doc(users[x].id).update({phonenumber: newPhoneNumber})
                   // .then(()=>)

                }
            })
        }


        const addAdress=e=>{
            e.preventDefault();
            Object.keys(users).map((x, y)=>{
                if(users[x].userId===currentUserId){
                  //   if(newUserName!=="" && newUserName.length>4){
                    setM(false)
                    Keyboard.dismiss()
                    db.child(`users/${users[x].id}/useradress`).set(userAdress, (err)=>err)
                    //dbRef.doc(users[x].id).update({useradress: userAdress})
                   // .then(()=>)

                }
            })
        }

        //useEffect(()=>{
            const pickImage=async()=>{
                try{
                    const granted=await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,{
                        title:'Altokudos',
                        message:'Altokudos souhaite avoir accès à vos fichiers',
                        buttonPositive:"J'accepte",
                        buttonNegative:'Je refuse',
                        buttonNeutral:'Me redemander plus tard'

                    })
                    if(granted===PermissionsAndroid.RESULTS.GRANTED){
                        let result= await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.All,
                            allowsEditing:true,
                            aspect:[4, 3],
                            //allowsMultipleSelection:true,
                            quality:1
                        })
                        const source={uri: result.uri}
                        console.log(source)
                        setImage(source)
                        setUpload(true)
                    }
                    else{
                        alert('Accès refusé')
                    }
                }
                catch(e){
                    console.warn(e)
                }


                // if(image){
                
                }

                const up=async()=>{
                    setSetting(true)

                    if(!image.uri){
                        setSetting(false)
                        setUpload(false)
                    }
                    else{
                    const response=await fetch(image.uri)
                    const blob=await response.blob()
                    const imgname=image.uri.substring(image.uri.lastIndexOf('/')+1)
                    var ref=firebase.storage().ref('profil').child(imgname).put(blob)
        
                await ref
                 //download image url
                 
                 const userPic=await firebase.storage().ref('profil').child(imgname).getDownloadURL()
                 
                    const imgUrl=()=>{
                        return userPic
                    }

                       Object.keys(users).map((x, y)=>{
                        //setUpload(true)
                           if(users[x].userId===currentUserId){
                             //   if(newUserName!=="" && newUserName.length>4){
                               
                                 db.child(`users/${users[x].id}/pic`).set(imgUrl(), (err)=>err)
                               //dbRef.doc(users[x].id).update({pic: imgUrl()})
                               .then(()=>{setUpload(false); setSetting(false);})
                               
           
                           }
                       })
                    }
                             
                }
                useEffect(()=>{
                    if(upload) up()
                    else ''
                }, [upload])


                   

    const logout=()=>{
        AsyncStorage.getAllKeys()
                        .then(keys=>AsyncStorage.multiRemove(keys))
                        .then(()=>{
                            firebase.auth().signOut()
                            .then(()=>{
                                navigation.navigate("Login")
                               
                                
                            })
                            .catch((e)=>console.log(e))
                        })
    }

    const [k, setKey]=useState(false)// displaying the save icon beside the edit name field when this turns true
    const [l, setL]=useState(false)// || || || 
    const [m, setM]=useState(false)//||

    return(
        <LinearGradient start={{x: 0, y:1}} end={{x:1, y:0}} colors={['#eee', '#222']} style={Style.main}>
             

             
            {
                Object.keys(users).map((i, v)=>{
                    if(users[i].userId===currentUserId){
                        
                        return(
                        <View key={v}>
                             <LinearGradient start={{x: 0, y:1}} end={{x:0, y:0}} colors={['darkgrey', 'grey']} style={Style.profilDetails}>
                                    <Text style={{position:'absolute', fontWeight:'bold', right:"5%", zIndex:2, paddingTop:"24.5%", fontSize:16, color:"#bbb" }}>{users[i].activities? [... users[i].activities].length:0} <Entypo name="shopping-cart" color={'#bbb'} size={26} /></Text>
                             </LinearGradient>


                             
                        <View style={Style.box}>

                            <LinearGradient start={{x: 0, y:1}} end={{x:1, y:0}} colors={['black', 'grey']} style={{width:phoneWidth, borderTopLeftRadius:20, borderTopRightRadius:20, }}>
                               
                        <TouchableOpacity style={{marginTop:'-12%', alignItems:'center'}} onPress={pickImage}>
                                        
                                            {
                                                users[i].pic?
                                              
                                                    setting?
                                                <ActivityIndicator style={{position:'relative',width:120, height:120, borderRadius:60, borderColor:'black', backgroundColor:'#221'}} size={"small"} color={"white"} />:
                                                <Image source={{uri:users[i].pic}} style={{width:120, height:120, borderRadius:60, borderColor:'#aaa'}} />
                                                 :
                                               
                                                    
                                                        setting?
                                                        <ActivityIndicator style={{position:'relative',width:120, height:120, borderRadius:60,  borderColor:'black', backgroundColor:'#221'}} size={"small"} color={"white"} />:
                                                        <Image source={defaultProfilPic} style={{width:120, height:120, borderRadius:60}} />
                                                    
                                                   
                                            }
                                            <Entypo style={{marginTop:'24%', marginLeft:'94%', zIndex:1111 , position:'absolute'}} name="edit" color='white' size={22} />
                                    </TouchableOpacity>
                                    <Text style={Style.userName}>{users[i].username}</Text>

                                    <TouchableHighlight style={Style.logOut} onPress={logout}>
                                        <Text style={{fontStyle:'normal', fontWeight:'bold', color:'#bbB'}}>Déconnexion</Text>
                                    </TouchableHighlight>
                                    </LinearGradient> 

                                    
                                    <View style={{height:1, width:phoneWidth, borderWidth:1, backgroundColor:'#aaa'}}>
                                        <></>
                                    </View>

                                <View style={Style.addInfos}>
                                     <LinearGradient colors={isDarkTheme? ['#444', "#111"]:['#fff', '#eee']} style={Style.infosBox}>
                                        
                                        <Entypo name="pencil" style={{marginLeft:'2%'}} color={isDarkTheme? '#ddd':'#333'}size={24} />
                                        <TextInput style={Style.infoAdd} placeholderTextColor={isDarkTheme? '#ddd':'#666'} placeholder="Modifier le nom" value={newUserName} onChangeText={(e)=>setNewUserName(e)} onTextInput={()=>setKey(true)}  />
                                        <Entypo name="save" onPress={editedUserName} style={k? {display:'flex', marginLeft:'10%'}: {display:'none'}} color={isDarkTheme? '#aaa':"#333"} size={24} />
                                    </LinearGradient>

                                    <LinearGradient colors={isDarkTheme? ['#444', "#111"]:['#fff', '#eee']} style={Style.infosBox}>
                                        <Entypo name="phone" style={{marginLeft:'2%'}} color={isDarkTheme? '#ddd':'#333'} size={24} />
                                        <TextInput style={Style.infoAdd} placeholderTextColor={isDarkTheme? '#ddd':'#666'} placeholder={users[i].phonenumber? users[i].phonenumber:'Numéro de téléphone'} value={newPhoneNumber} onChangeText={(e)=>setPhoneNumber(e)} onTextInput={()=>setL(true)}/>                  
                                        <Entypo name="save" onPress={addEditPhoneNumber} style={l? {display:'flex', marginLeft:'10%'}: {display:'none'}} color={isDarkTheme? '#aaa':"#333"} size={24} />
                                    </LinearGradient>
                                    
                                    <LinearGradient colors={isDarkTheme? ['#444', "#111"]:['#fff', '#eee']} style={Style.infosBox}>
                                        <Entypo name="location-pin" style={{marginLeft:'2%'}} color={isDarkTheme? '#ddd':'#333'} size={24} />
                                        <TextInput style={Style.infoAdd} placeholderTextColor={isDarkTheme? '#ddd':'#666'} placeholder={users[i].useradress? users[i].useradress:'Adresse domicile'} value={userAdress} onChangeText={(e)=>setUserAdress(e)} onTextInput={()=>setM(true)} />
                                        <Entypo name="save" onPress={addAdress} style={m? {display:'flex', marginLeft:'10%'}: {display:'none'}} color={isDarkTheme? '#aaa':"#333"} size={24} />
                                    </LinearGradient>
                                    
                                    <LinearGradient colors={isDarkTheme? ['#444', "#111"]:['#fff', '#eee']} style={Style.infosBox}>
                                        <Entypo name="lock" style={{marginLeft:'2%'}} color={isDarkTheme? '#ddd':'#333'} size={24} />
                                        <TextInput style={Style.infoAdd} value={'Changer de mot de passe'} />

                                    </LinearGradient>

                                    <LinearGradient colors={isDarkTheme? ['#444', "#111"]:['#fff', '#eee']} style={Style.infosBox}>
                                        <Entypo name="remove-user" style={{marginLeft:'2%'}} color={isDarkTheme? '#ddd':'#333'} size={24} />
                                        <Text style={Style.infoAdd}>Supprimer mon compte</Text>

                                    </LinearGradient>

                                    
                                   


                                </View>
                            </View>
                        </View>
                        )
                                
                    }
                })


            }
             
           
        </LinearGradient>
    )


}
export default UserProfil



