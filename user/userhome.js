//
import { useEffect, useState, useRef } from "react"
import {ToastAndroid, Keyboard, Animated, Switch, BackHandler, useColorScheme ,ImageBackground,Vibration, View, Picker, Button, Image, TouchableOpacity, Text, ScrollView, FlatList, Pressable, ActivityIndicator, TextInput, Dimensions, Alert, Share  } from "react-native"
import {firebase, db} from '../fbconfig'
import {Entypo, AntDesign, MaterialIcons, Ionicons, Feather, FontAwesome, Fontisto, FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons'
import LinearGradient from "react-native-linear-gradient"
import MC from '../img/mc.png'
import Visa from '../img/visa.png'
import fr from 'javascript-time-ago/locale/fr.json'
import { useCallback } from "react"
import chatPic from '../img/msgs.png'
//import RNModal from 'react-native-modal'
import TimeAgo from "javascript-time-ago"
import { Modal } from "react-native"
import PushNotification, {Importance} from 'react-native-push-notification'
import appicon from '../img/ak.png'
import * as Animatable from 'react-native-animatable'
//phone width and height dimension
import { NavigationContainer, useFocusEffect } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ExpandingDot } from 'react-native-animated-pagination-dots';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

const phoneWidth=Dimensions.get('window').width
const phoneHeight=Dimensions.get('window').height

const Stack= createNativeStackNavigator()


  //here below goes the settings components
 

const AllUser=({navigation})=>{
    const theme=useColorScheme()
    const isDarkTheme=theme==="dark"


    
const Styles={
    main:{
        flex:1,
        flexDirection:'column',
        paddingTop:50,
        backgroundColor:isDarkTheme? '#111':'#fff',
        width:phoneWidth,
        height:phoneHeight
    },
    reminder:{
        width:phoneHeight*0.5,
        height:phoneHeight*0.4,
        borderRadius:20,
        shadowOffset:{
            width:3, height:2
        },
        backgroundColor:isDarkTheme? '#111':'white',
      
        bottom:phoneHeight*0.12,
        left:phoneHeight*0.015,
        shadowColor:isDarkTheme? '#eee':'black',
        shadowOpacity:0.4,
        shadowRadius:4,
        position:'absolute',
        elevation:10,
   
        flexDirection:'column',
        justifyContent:'space-evenly',
        alignItems:'center',

    },
    remindbtn:{
        width:'80%',
        height:'20%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:isDarkTheme? '#111':'#eee',
        borderWidth:1,
        borderRadius:20

    },
    sty:{
        flexDirection:'row',
        flex:1,
        display:'flex',
        justifyContent:'space-between',
        position:'relative',
        backgroundColor:'#FFFFFF',
        height:phoneHeight,
        marginTop:'14%',
        flexWrap:'wrap',
        marginBottom:'43%',
        alignItems: 'center',
    }   
    ,
    pageHead1:{
        textAlign:'center',
        color:isDarkTheme? '#ddd':'#444',
        alignItems: 'center',
        fontSize:18,
        justifyContent:'center',
        marginTop:"5%",
        letterSpacing:1,
        fontFamily:'fantasy',
        fontWeight:'bold'
    },
    pageHead2:{
        textAlign:'center',
        color:isDarkTheme? '#ddd':'#444',
        alignItems: 'center',
        fontSize:18,
        justifyContent:'center',
        marginTop:"5%",
        letterSpacing:1,
        fontFamily:'fantasy',
        fontWeight:'bold'
    },
    pageHead3:{
        textAlign:'center',
        color:isDarkTheme? '#ddd':'#444',
        alignItems: 'center',
        fontSize:18,
        justifyContent:'center',
        marginTop:"5%",
        letterSpacing:1,
        fontFamily:'fantasy',
        fontWeight:'bold'
    },


    time:{
        //position:'absolute',
        left:'5%',
        color:isDarkTheme? '#eee': '#666'
    },
    ico:{
        justifyContent:'space-evenly', 
        alignItems:'center',
        flexDirection:'column',
        borderColor:isDarkTheme? 'rgba(255,255,255,0.1)':'rgba(0,0,0,0.1)',
        borderWidth:2,
        borderTopWidth:0,
        width:'30%',
        backgroundColor:isDarkTheme? "#111":'white',
        borderRadius:10,
        marginTop:'2%'
        
       
    }

    ,listTxt:{
        fontSize:14,
        color:isDarkTheme? '#eee': '#666',
        letterSpacing:1,
        left:'10%',
        fontFamily:'fantasy',
        fontWeight:'bold',
        maxWidth:'88%'
       // textAlign:'center',
        

    },
    pageHeadBlur:{
        borderTopWidth:3,
        borderTopColor:'rgba(0,0,0,0.1)'
    },
    adminPanel:{
        //display:'flex',
        flexDirection:'column',
        width:'90%',
        shadowOffset:{
            width:3, height:2
        },
        shadowColor:isDarkTheme? '#aaa':'black',
        shadowOpacity:0.4,
        shadowRadius:4,
        elevation:10,
        justifyContent:'flex-start',
        alignItems:'flex-start',
        alignContent:'flex-start',
       // position:'absolute',
        height:phoneHeight,
        zIndex:111,
        backgroundColor:isDarkTheme? '#111':'white',
       // left:"10%",
        top:0
    }
    ,
   
    tab:{
       position:'absolute',
       width:phoneWidth,
       zIndex:2,
       
       textAlign:'center',
       alignItems:'center',
       flexDirection:'column',
       backgroundColor:isDarkTheme? '#111':'#fff',
       height:phoneHeight,
      // flexDirection:'row',
      flex:1,
       justifyContent:'space-evenly',
    }
    ,
    menuTxtBox:{
        //color:'#333', fontFamily:'fantasy', fontSize:16, letterSpacing:0,
        width:"50%",
        justifyContent:'space-around',
        display:'flex',
        marginTop:'8%',
        marginLeft:'5%',
        borderWidth:0.1,
        flexDirection:'row',
        alignItems:'flex-start',
        height:'5%',
       
        
    },
    menuTxt:{
        
        color:'#666', fontFamily:'Cambria', fontSize:18, letterSpacing:0, fontWeight:'bold', width:'60%'
    }
    ,  
    headerIcon:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'flex-start',
       // height:'30%',
        letterSpacing:1,
        flex:1,
        top:"3%",
        zIndex:11,
        position:'absolute'
    },
    ic:{
        flexDirection:'column',
        justifyContent:'space-evenly',
        textAlign:'center',
        alignItems:'center',
        marginLeft:"5%",
    }
    ,
    searchPanel:{
        display:'flex',
        width:'80%',
       // height:"30%",
        
        position:'absolute',
        flexDirection:'row',
        top:7,
        zIndex:282827272,
        justifyContent:'center',
        alignItems:'flex-start',
       // backgroundColor:'#ccc'
       
    },
    articleDetail:{
        height:phoneHeight,
        width:phoneWidth,
        position:'absolute',
        zIndex:1111,
        flexDirection:'column',
        justifyContent:'flex-end',
        alignItems:'center',
        
       
    },
    search:{
        borderWidth:2,
        textAlign:'center',
        borderRadius:50,
        backgroundColor:'transparent',
        borderColor:isDarkTheme? '#444':'#aaa',
        color:isDarkTheme? '#eee':'#111',
        width:'80%',

    },
    itemtitle:{
        fontFamily:'fantasy',
        justifyContent:'space-around',
        fontSize:18,
        position:'absolute',
        textAlign:'center',
        fontWeight:'bold',
        top:"2%",
        width:'80%',
        color:isDarkTheme? '#eee':'white'
    },
    des:{
        fontSize:18,
        fontFamily:'notoserif',
        justifyContent:'space-around',
        textAlign:'left',
       // fontFamily:'Arial',
        //fontWeight:'bold',
        letterSpacing:1,
        marginTop:'1%',
        marginLeft:'5%'
        ,color:isDarkTheme? '#eee':'#444'
    },
    desTitle:{
        fontSize:22,
        fontFamily:'serif',
        justifyContent:'space-around',
        textAlign:'left',
        fontFamily:'courier neue',
        marginTop:'1%',
        marginLeft:'5%',
        fontWeight:'bold',
        color:isDarkTheme? '#eee':'#444'

    },
    prix:{
        fontSize:24,
        textAlign:'left',
        fontWeight:'bold',
        marginLeft:'5%',color:isDarkTheme? '#eee':'black'

    }
    ,
    back:{
       // backgroundColor:'black',
        top:"1.5%",
        borderRadius:12,
        position:'absolute',
        width:'10%',
        left:"2%"
        
    },
    deleteItem:{
        width:'30%',
        alignItems:'center',
        justifyContent:'center',
        height:"6%",
        backgroundColor:'black',
        color:isDarkTheme? '#111':'white',
        fontSize:18,
        bottom:'1%',
        left:"1%",
        zIndex:33399,
        position:'absolute',
    },
    action:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-evenly',
        alignItems:'center',
        marginTop:'5%',
        width:'100%',
        height:140,
        marginBottom:"5%"
    },
    finalAction:{
        width:'90%',
        alignItems:'center',
        borderRadius:10,
        justifyContent:'center',
        height:'44%'
    },
    settingPage:{
        zIndex:111,
        width:phoneWidth,
        flex:1,
        paddingTop:10,
        backgroundColor:isDarkTheme? '#111':"#fff",
        height:phoneHeight
    }
}

    const [showTuto, setShowTuto]=useState(true)

    const [menuIcon, setMenuIcon]=useState(true)

    const hideTabBar=()=>{
        navigation.setOptions({
                tabBarStyle:{display:'none'}
            })
       }
       const showTabBar=()=>{
        navigation.setOptions({
                tabBarStyle:{display:'flex'}
            })
       }

       //CHAT COMPONENT GOES HERE
       //chat room with the admin
       const Chat=({navigation, route})=>{

        const [message, setMessage]=useState('')

        const send=()=>{
            if(!(!message)){

                const item={
                    message:message,
                    time:new Date().getTime(),
                    
                }

                for(let x of users){
                    if(x.userId===currentUserId){
                       if(x.chat){
                     //   for(let a of x.activities){
                            /*
                            if(a.id===item.id){

                                db.child(`users/${x.id}/activities`).set([...x.activities])
                                return false
                            }
                            */
                            //else{
                               console.log('Ordered')
                               db.child(`users/${x.id}/chat`).set([...x.chat, item])
                        .then(()=>{
                         
                            ///turnOff()
                            console.log('Message sent successfully')
                            setMessage('')
                            
                        })
                        .catch((e)=>{alert(e); setMessage('')})
                           // }
                    //    }
                       }
                       else{
                        db.child(`users/${x.id}/chat`).set([item])
                        .then(()=>{
                            setMessage('')
                        })
                       }
                    }
                }


            }
                       
            
        }

        const [elmt, setElmt]=useState('')

        const chanc=(item)=>{
            for(let user of users){
                if(user.userId===currentUserId){
                  // for(let item of route.params.el){
                    for(let it of [...user.chat]){
                        if(item===it){
                          
                            console.log('cool')
                            setElmt(it)

                            /*
                            return(
                                <Pressable onPress={()=>cancelSelect(item)}>
                <View style={{marginLeft:'18%', minWidth:'20%', flex:1 ,maxWidth:'80%', justifyContent:'center', borderBottomLeftRadius:6, borderTopLeftRadius:6, borderTopRightRadius:6, backgroundColor:isDarkTheme? 'darkblue':'darkblue', minHeight:40}}>
                <Text style={{color:isDarkTheme? '#aaa':'#aaa', width:'95%', marginLeft:'2.5%', textAlign:'left'}}>{item.message}</Text>
        
            </View>
            </Pressable>
                            )*/
                        }
                    }
                }
              }
        }


        const cancelSelect=item=>{
            for(let user of users){
                if(user.userId===currentUserId){
                  // for(let item of route.params.el){
                    for(let it of [...user.chat]){
                        if(item===it){
                          
                            console.log('cool')
                            setElmt('')

                            /*
                            return(
                                <Pressable onPress={()=>cancelSelect(item)}>
                <View style={{marginLeft:'18%', minWidth:'20%', flex:1 ,maxWidth:'80%', justifyContent:'center', borderBottomLeftRadius:6, borderTopLeftRadius:6, borderTopRightRadius:6, backgroundColor:isDarkTheme? 'darkblue':'darkblue', minHeight:40}}>
                <Text style={{color:isDarkTheme? '#aaa':'#aaa', width:'95%', marginLeft:'2.5%', textAlign:'left'}}>{item.message}</Text>
        
            </View>
            </Pressable>
                            )*/
                        }
                    }
                }
              }
        }


        const deleteMsg=item=>{

            for(let user of users){
               if(user.userId===currentUserId){
                 // for(let item of route.params.el){
                   for(let it of [...user.chat]){
                       if(item===it){
                           let i=user.chat.indexOf(item)
                           if(i!==-1){
                               user.chat.splice(i, 1)
                              // dbRef.doc(x.id).update({myCart:[...x.myCart]})
                              db.child(`users/${user.id}/chat`).set([...user.chat])
                               .then(()=>{
                                   
                                   if(user.chat.length<=0){
                                       //dbRef.doc(x.id).update({myCart:''})
                                       db.child(`users/${user.id}/chat`).set([])
                                   }
                                   //setDeleted(true)
                                   //turnOff()
                                   
                             
                                   
                               })
                               .catch((e)=>alert(e))
                                   
                               }
                        
                       }
                   }
               }
             }}
        
       




       

        return(
            <View style={{backgroundColor:isDarkTheme? '#444':'black', flex:1, justifyContent:'flex-end' ,width:phoneWidth, height:phoneHeight}}>
                <View style={{width:'94%', position:'absolute', left:'3%', top:'3%', flexDirection:'row', justifyContent:'space-between'}}>
                    <Ionicons onPress={()=>navigation.navigate('UserHome')} style={{color:isDarkTheme? '#ddd':'#bbb'}} name='arrow-back' size={30} />
                    <View style={{flexDirection:'row', justifyContent:'center'}}><Image source={appicon} style={{width:34, height:34}} /><Text style={{color:isDarkTheme? '#aaa':'#bbb', fontSize:20, fontFamily:'serif', letterSpacing:1}}>Altokudos</Text></View>  
                </View>

                <View style={{height:'90%', borderTopLeftRadius:20, borderTopRightRadius:20 ,justifyContent:'flex-start', backgroundColor:isDarkTheme? '#111':'#fff'}}>
                    <View style={{flexDirection:'row', width:'100%', position:'absolute', top:'2%', height:"6%", justifyContent:'center', alignItems:'center'}}>
                        <View style={{justifyContent:'space-between', flexDirection:'row', width:'60%', borderBottomWidth:1, borderBottomColor:'#aaa', height:'100%'}}>
                            <MaterialIcons onPress={()=>Alert.alert('Nous appeler', "Cette fonction n'est pas encore paramétrée")} name='call' size={26} color={isDarkTheme? "#aaa":"#322"} />
                            <MaterialIcons onPress={()=>Alert.alert('Notre adresse', "Adresse non incluse")} name="location-pin" size={26} color={isDarkTheme?'#aaa':"#322"} />
                            <MaterialIcons name="delete" size={26} color={isDarkTheme?'#aaa':'#322'} />
                        </View>
                        
                    </View>

                    <Text ellipsizeMode="tail" numberOfLines={1} style={{color:isDarkTheme? '#bbb':"#444",marginBottom:'4%', fontSize:12, textAlign:'center', marginTop:"15%", width:'90%', marginLeft:'5%'}}>Vous avez un souci ou avez remarqué un bug, veuillez vous exprimer</Text>

                    <View style={{ marginBottom:'24%'}}>
                        {
                            Object.keys(users).map((i, v)=>{
                                if(users[i].userId===currentUserId){

                                    if(users[i].chat){

                                        return(
                                           
                                            <FlatList style={{ marginBottom:'12%'}} key={v} data={[...users[i].chat].reverse()}
                                            numColumns={1}
                                            inverted
                              renderItem={({item})=>(
                                item.admin===true?
                                <Pressable onLongPress={()=>chanc(item)}>
                                       {
                                            elmt===item?
                                            
                                                <Pressable onPress={()=>cancelSelect(item)}>
                                                     <View on style={{ maxWidth:'80%', minWidth:"20%", display:'flex', marginLeft:'2%', justifyContent:'center', borderBottomRightRadius:6, borderTopRightRadius:6, borderTopLeftRadius:6, backgroundColor:isDarkTheme? 'darkred':'darkred', minHeight:50}}>
                                                     <Entypo onPress={()=>deleteMsg(item)} name="trash" size={24} color={'red'} style={{position:'absolute', left:'107%'}} /><Text style={{color:isDarkTheme? '#aaa':'#aaa', width:'95%', marginLeft:'2.5%', textAlign:'left'}}>{item.message}</Text>
                                    </View>
                                                    </Pressable>

                                                    :
                                    <View on style={{ maxWidth:'80%', minWidth:"20%", display:'flex', marginLeft:'2%', justifyContent:'center', borderBottomRightRadius:6, borderTopRightRadius:6, borderTopLeftRadius:6, backgroundColor:isDarkTheme? 'rgba(50, 20, 10, 0.7)':'rgba(255, 225, 200, 0.8)', minHeight:50}}>
                                        <Text style={{color:isDarkTheme? '#aaa':'#111', width:'95%', marginLeft:'2.5%', textAlign:'left'}}>{item.message}</Text>
                                    </View>
                                       }
                                    <Text style={{fontSize:10, color:'#aaa', marginLeft:'2%',  width:'50%',marginBottom:"2%", marginTop:'1%', textAlign:'left'}}>{timeAgo.format(item.time-60*1000)==='il y a 1 minute'? "A l'instant":timeAgo.format(item.time-60*1000)}</Text>
                                
                                </Pressable>
                                :
                                <Pressable onLongPress={()=>chanc(item)}>
                                    {
elmt===item?
                                            
<Pressable onPress={()=>cancelSelect(item)}>
<View style={{marginLeft:'18%', minWidth:'20%', flex:1 ,maxWidth:'80%', justifyContent:'center', borderBottomLeftRadius:6, borderTopLeftRadius:6, borderTopRightRadius:6, backgroundColor:isDarkTheme? 'darkblue':'darkblue', minHeight:50}}>
<Entypo onPress={()=>deleteMsg(item)} name="trash" size={24} color={'red'} style={{position:'absolute', left:'-15%'}} /><Text style={{color:isDarkTheme? '#aaa':'#111', width:'95%', marginLeft:'2.5%', textAlign:'left'}}>{item.message}</Text>
                                    </View>
    </Pressable>
                                        :
                                    <View style={{marginLeft:'18%', minWidth:'20%', flex:1 ,maxWidth:'80%', justifyContent:'center', borderBottomLeftRadius:6, borderTopLeftRadius:6, borderTopRightRadius:6, backgroundColor:isDarkTheme? 'rgba(100, 90, 90, 0.7)':'rgba(255, 240, 210, 0.8)', minHeight:50}}>
                                        <Text style={{color:isDarkTheme? '#aaa':'#111', width:'95%', marginLeft:'2.5%', textAlign:'left'}}>{item.message}</Text>
                                    </View>

                        }
                                    <Text style={{fontSize:10, color:'#aaa', marginLeft:'48%',  width:'50%',marginBottom:"2%", marginTop:'1%', textAlign:'right'}}>{timeAgo.format(item.time-60*1000)==='il y a 1 minute'? "A l'instant":timeAgo.format(item.time-60*1000)}</Text>
                                </Pressable>
                                    
                              )}
    
                              />
                             
                                        )
                                    }
            
                                  }})
                        }
                         </View>





                    <View style={{width:'100%', position:'absolute', height:'8%', bottom:'0%', backgroundColor:isDarkTheme?'#444':'black',}}>
                        <View style={{width:"100%", height:'100%', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <TextInput onChangeText={(e)=>setMessage(e)} value={message} placeholder="saisir votre message" placeholderTextColor={'#aaa'} multiline style={{width:'86%', height:'86%', maxHeight:"100%", textAlign:'center', borderRadius:20, backgroundColor:isDarkTheme?'#ccc':'white'}}/>
                            <MaterialIcons onPress={send} name="send" size={36} color={"green"} />
                        </View>
                        
                    </View>
                </View>


            </View>
        )
       }

       //here's where chat component ends
       //


       //HERE GOES THE SETTING PAGE COMPONENT
    const Settings=({navigation})=>{    

        useEffect(()=>{
            BackHandler.addEventListener('hardwareBackPress', ()=>{
                navigation.navigate('UserHome');
                showTabBar()
            })
          }, [])

        const chckVal=async()=>{
            let savedMail=await AsyncStorage.getItem("tuto")
            if(savedMail){
                if(savedMail==="true"){
                    return true
                }
                else if(savedMail==="false"){
                    return false
                }
            }
            else{
                return true
            }
        }
        const [tuto, setTuto]=useState(chckVal())
        const [nightMode, setNightMode]=useState(false)
        const [vibrate, setVibrate]=useState(false)

        const toggletheme=()=>setNightMode(!nightMode)

        const togglevibrate=()=>setVibrate(!vibrate)


        const toggleTuto=async()=>{
            setTuto(!tuto)
            let savedMail=await AsyncStorage.getItem("tuto")
            if(savedMail){
               
                    AsyncStorage.getItem('tuto')
                    .then(data=>{
                        if(!tuto){
                        if(savedMail==="true"){
                            console.log(data)
                            //data=JSON.parse(data)
                            data='false'
                            AsyncStorage.setItem('tuto', data)
                            //setTuto(true)
                        }}
                        else{
                            console.log(data)
                            //data=JSON.parse(data)
                            data='true'
                            AsyncStorage.setItem('tuto', data)
                           // setTuto(false)
                        }
                })
                
               
            }
         
        }

        
        useEffect(()=>{
            const getVal=async()=>{
                let savedMail=await AsyncStorage.getItem("tuto")
                if(savedMail){
                if(savedMail==="true"){
                   setTuto(true)
                }
                else if(savedMail==="false"){
                    setTuto(false)
                }
            }
            }
                  
            getVal()
        }, [])


        return(
            <View style={Styles.settingPage}>
                <View style={{flexDirection:'row', width:'100%', justifyContent:'flex-start', zIndex:2222}}>
                    <AntDesign onPress={()=>{
                        navigation.navigate('UserHome');
                        showTabBar()

                        }} name='back' size={28} color={isDarkTheme? '#eee':'#111'} />
                    <Text style={{alignItems:'center', fontSize:20, position:'absolute', width:'34%', textAlign:'center', left:'33%', color:isDarkTheme? '#aaa':'#111'}}>Paramètres</Text>
                    
                </View>

                <View style={{flexDirection:'column', justifyContent:'flex-start', width:'100%', marginTop:"9%"}}>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', marginLeft:'5%', marginBottom:'12%', alignItems:'center'}}>
                        <Fontisto size={24} name='night-clear' color={isDarkTheme? '#aaa':'#111'} />
                        <Text style={{fontSize:20, marginLeft:'10%', color:isDarkTheme? '#aaa':'#111' }}>Mode nuit</Text>
                        <Switch trackColor={{false:'grey', true:'lightgrey'}} value={nightMode} onValueChange={toggletheme} thumbColor={nightMode? 'orangered':'#ddd'} style={{position:'absolute', right:'5%'}} />
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'flex-start', marginLeft:'5%', marginBottom:'12%', alignItems:'center'}}>
                        <Feather name='help-circle' size={24} color={isDarkTheme? '#aaa':'#111'} />
                        <Text style={{fontSize:20, marginLeft:'10%', color:isDarkTheme? '#aaa':'#111'}}>Dictatiel</Text>
                        <Switch trackColor={{false:'grey', true:'lightgrey'}} thumbColor={tuto? 'orangered':'#ddd'} value={tuto} onValueChange={toggleTuto} style={{position:'absolute', right:'5%'}} />
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'flex-start', marginLeft:'5%', marginBottom:'12%', alignItems:'center'}}>
                        <MaterialIcons size={24} name="vibration" color={isDarkTheme? '#aaa':'#111'} />
                        <Text style={{fontSize:20, marginLeft:'10%', color:isDarkTheme? '#aaa':'#111'}}>Vibreur</Text>
                        <Switch trackColor={{false:'grey', true:'lightgrey'}} thumbColor={vibrate? 'orangered':'#ddd'} value={vibrate} onValueChange={togglevibrate} style={{position:'absolute', right:'5%'}} />
                    </View>
                </View>
    
            </View>
        )
    }

    //SETTING PAGE COMPONENT ENDS HERE

    TimeAgo.addLocale(fr)
    const timeAgo=new TimeAgo('fr-FR')
    const [offers, setOffers]=useState([])
    const [users, setUsers] = useState([])
   // const userRef=firebase.firestore().collection('users')
    const [currentUserId, setCurrentUserId] = useState('')
    const [cartItem, setCartItem] = useState(false)

    useEffect(()=>{
        db.child('products').on('value', (snapshot)=>{
            let update=[]
            snapshot.forEach((child)=>{
                update.push({
                    id:child.key,
                    name:child.val().name,
                    description:child.val().description,
                    price:child.val().price,
                    imgurl:child.val().imgArr,
                    promoPrice:child.val().promoPrice,
                    quantity:child.val().quantity,
                    time:child.val().time,
                    category:child.val().category
                })
            })  
            setOffers(update)
        })
    }, [])

   //share the app
   const onShare=async()=>{
    try{
        const result= await Share.share({
            message:'Partager cette application'
        })
        if(result.action===Share.sharedAction){
            if(result.activityType){
            
            }
            else{
                //partagé
            }
        }
        else if(result.action===Share.dismissedAction){
            //annulé
        }
    }
    catch(err){
        alert(err.message)
    }
   }
   

    //see detail of a article
    const [seen, setSee]=useState(false)
    
 

   useEffect(()=>{
        firebase.auth().onAuthStateChanged((x)=>{
            if(x){
                setCurrentUserId(x.uid)
            }
            //setCurrentUserId(x.uid)
        })
    }, [])

    const [cart, setCart]=useState([])

    /*
    useEffect(()=>{
        for(let a of offers){
            if(a.id===item.id){
                setCart()
            }
        }
    })
    */

    useEffect(()=>{
        db.child('users').on('value', (snapshot)=>{
            let update=[]
            snapshot.forEach((child)=>{
                update.push({
                    id:child.key,
                    username:child.val().username,
                    myCart:child.val().myCart,
                    userId:child.val().userId,
                    activities:child.val().activities,
                    messages:child.val().messages,
                    chat:child.val().chat,
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
        for(let x of users){
            if(x.userId===currentUserId){
                
                if(x.myCart){
                    setCart(x.myCart)

                }
            }}
    }, [])
   
    const turnOff=()=>setTimeout(()=>setCartItem(false), 1500)

   // const [avoidOverride, setAvoidOverride]=useState(false)


    //ADD TO CART FUNCTION
    const addToCart=item=>{
        // dbRef.doc(users[x].id).update({pic: imgUrl()})
        setCartItem(true)
        for(let x of users){
            if(x.userId===currentUserId){
                const itemDetails ={
                    name:item.name,
                    description:item.description,
                    price:item.category==='Promo'? item.promoPrice:item.price,
                    quantity:item.quantity,
                    count:1,
                    category:item.category,
                    id:item.id,
                    url:item.imgurl[0]
                }
                //const add=()=>{
                    if(x.myCart){
                        for(let a of x.myCart){
                            if(a.id===itemDetails.id){
                                //alert('Cet article est déjà dans le panier')
                                
                                alert('Déjà dans le panier')
                                db.child(`users/${x.id}/myCart`).set([...x.myCart])
                                setCartItem(false)
                                return false
                            }
                            else{
                               
                               // userRef.doc(x.id).update({myCart:[...x.myCart, itemDetails]})
                               db.child(`users/${x.id}/myCart`).set([...x.myCart, itemDetails])
                        .then(()=>{
                         
                            turnOff()
                            console.log('Added to cart successfully')
                            
                        })
                        .catch((e)=>alert(e))
                            }
                        }
                        
                    }
                    else{
                        
                        //userRef.doc(x.id).update({myCart:[itemDetails]})
                        db.child(`users/${x.id}/myCart`).set([itemDetails])
                        .then(()=>{
                          
                            setTimeout(()=>setCartItem(false), 1200)
                        turnOff()
                            //console.log('Added')
                       
                    })
                    .catch((e)=>alert(e))

                    }
               // }     
            }

        }
            
}

    //HERE GOES THE PAGE WHERE USER BUYS 
    const BuyItem=({navigation, route})=>{

        const [articleCount, setArticleCount]=useState(1)
        const [ordering, setOrdered]=useState(false)
        
        const orderItem=item=>{
            setOrdered(true)
            item={...item, articleCount}
            let orderTime=new Date().getTime()
            item={...item, orderTime}
            let shipped=false
            item={...item, shipped}
            Alert.alert('Confirmation de la commande', `Voulez-vous vraiment commander cet article et payer ${item.category==="Promo"? item.promoPrice*articleCount:item.price*articleCount} $ lors de sa livraison?`, [
                {
                    text:"Oui",
                    onPress:()=>{
                        
                        db.child(`products/${item.id}/quantity`).set(item.quantity-articleCount)
                        .then(()=>{
                            Alert.alert('Réussi','Commandé avec succès')
                            for(let a of users){
                                if(a.userId===currentUserId){
                                    const order={
                                        itemName:item.name,
                                        itemPrice:item.category==="Promo"? item.promoPrice:item.price,
                                        itemCount:articleCount,
                                        time:new Date().getTime(),
                                        itemImage:item.imgurl[0],
                                        customerName:a.username,
                                        customerNumber:a.phonenumber? a.phonenumber:'',
                                        customerAdress:a.useradress? a.useradress:'',
                                        customerPic:a.pic? a.pic:''
                                    }
                                    db.child(`orders`).push(order)
                                    
                                }
                            }
                            
                           
                            for(let x of users){
                                if(x.userId===currentUserId){
                                   if(x.activities){
                                 //   for(let a of x.activities){
                                        /*
                                        if(a.id===item.id){

                                            db.child(`users/${x.id}/activities`).set([...x.activities])
                                            return false
                                        }
                                        */
                                        //else{
                                            
                                            
                                           console.log('Ordered')
                                           db.child(`users/${x.id}/activities`).set([...x.activities, item])
                                           
                                    .then(()=>{
                                       
                                        ///turnOff()
                                        console.log('Ordered successfully')
                                        setOrdered(false)
                                        
                                    })
                                    .catch((e)=>{alert(e); setOrdered(false)})
                                       // }
                                //    }
                                   }
                                   else{
                                    
                                    
                                    db.child(`users/${x.id}/activities`).set([item])
                                    .then(()=>{
                                        
                                        setOrdered(false)
                                    })
                                   }
                                }
                            }
                            navigation.navigate('UserHome')
                         })
                         .catch(err=>alert(err))
                     }
                    }
                   ,
                {
                    text:'Non',
                    onPress:()=>setOrdered(false)
                }
            ])    
        }

        useEffect(()=>{
            BackHandler.addEventListener('hardwareBackPress', ()=>navigation.navigate('UserHome'))
          })
        for(let x of offers){
            if(x.id===route.params.el.id){         

        return(
            <Animatable.View animation='bounceInUp' delay={500} iterationCount={1} style={{width:phoneWidth, zIndex:1,height:phoneHeight, backgroundColor:isDarkTheme? '#444':'rgba(0,0,0,0.9)', justifyContent:'flex-end'}}>
               
                <View style={{flexDirection:'column', justifyContent:'flex-end', alignItems:'center', top:'7.5%'}}>
                    
                 <Image source={{uri:x.imgurl[0]}} style={{width:90, height:90, borderRadius:180}} />
                 <Text ellipsizeMode="tail" numberOfLines={1} style={{color:'#ddd', fontWeight:'500', letterSpacing:1, fontSize:15, fontFamily:'serif'}}>{x.name}</Text>
                 </View>
                
                <View style={{flexDirection:'column', alignItems:'center', justifyContent:'flex-end'}}>
                  
                    <View style={{backgroundColor:isDarkTheme? '#000':'#eee', width:phoneWidth,alignItems:'center', justifyContent:'space-evenly', height:'90%', borderTopLeftRadius:20, borderTopRightRadius:20,}}>


                   

                        {
                            x.quantity>1?
                            <View style={{flexDirection:'column', zIndex:2, alignItems:'center', width:"100%", justifyContent:'center'}}>
                                  <Text onPress={()=>{
                                            setArticleCount(articleCount+1)
                                            if(articleCount>=x.quantity){
                                                setArticleCount(x.quantity)
                                            }
                                        }} style={{ color:isDarkTheme? 'red':'#333', textAlign:'center'}}><Ionicons name='add' size={24} color={isDarkTheme? '#ccc':'black'} /></Text>
                                                             
                                            <Text style={{color:'#aaa', fontSize:14, textAlign:'center'}}>{articleCount}/{x.quantity}</Text>
                                       
                                        <Text onPress={()=>{
                                            setArticleCount(articleCount-1)
                                            if(articleCount<=1){
                                                setArticleCount(1)
                                            }
                                        }} style={{ color:isDarkTheme? 'red': '#333', textAlign:'center'}}><Ionicons name='remove' size={24} color={isDarkTheme? '#ccc':'black'} /></Text>
                                    </View>:''
                        }
                                      

                   
                    <TouchableOpacity style={{width:'90%', marginTop:'5%', height:'10%', alignItems:'center', justifyContent:'center'}}>
                    <Pressable onPress={()=>orderItem(x)} style={{backgroundColor:'white', alignItems:'center', flexDirection:'row', justifyContent:'center', textAlign:'center', width:"100%", height:"90%"}}>
                        {
                            ordering?
                            <ActivityIndicator size={'large'} color={'#aaa'} />:
                            <><FontAwesome5 name="shipping-fast" color='#444' size={24} /><Text style={{fontSize:20, color:'black',}}> Commander</Text></>
                            
                        }
                        </Pressable>
                       
                        <Text style={{color:'#aaa', fontSize:16, textAlign:'center', width:'90%', marginTop:"4%"}}>Lorsque vous commandez seulement, vous ne paierez qu'à la livraison</Text>
                    </TouchableOpacity> 
                  
                  
                    <LinearGradient start={{x:0, y:0}} end={{x:1, y:1}} colors={['orangered', 'darkorange']} style={{width:'90%',marginTop:'3%',  backgroundColor:'blue', height:'10%', alignItems:'center', justifyContent:'center'}}>
                        <TouchableOpacity >
                            
                            <Text style={{fontSize:20, color:'white', fontWeight:'700', letterSpacing:2}}><FontAwesome name='opencart' color='#fff' size={24} /> {x.category==="Promo"? x.promoPrice*articleCount: x.price*articleCount} $</Text>
                           
                        </TouchableOpacity>
                      
                    </LinearGradient>
                    <View style={{flexDirection:'row', width:'80%', justifyContent:'space-evenly', alignItems:'center',marginTop:'-8%'}}>
                    <LinearGradient colors={['orangered', "darkorange"]} style={{width:phoneWidth/3,borderRadius:10, height:phoneHeight/15, backgroundColor:'orangered', justifyContent:'center', alignItems:'center', borderColor:10}}>
                            <Text style={{color:'white', textAlign:'center'}}>Visa</Text>
                       </LinearGradient>

                       <LinearGradient colors={['orangered', "darkorange"]} style={{width:phoneWidth/3,borderRadius:10, height:phoneHeight/15, backgroundColor:'orangered', justifyContent:'center', alignItems:'center', borderColor:10}}>
                        <Text style={{color:'white', textAlign:'center'}}>Mastercard</Text>
                       </LinearGradient>
                       
                       
                   </View>
                 

                    <TouchableOpacity onPress={()=>navigation.navigate('UserView', {el:x})} style={{width:'90%',marginTop:'10%', marginBottom:"12%", backgroundColor:isDarkTheme? '#444':'black', height:'8%', alignItems:'center', justifyContent:'center'}}>
                        <Text style={{fontSize:20, color:'white'}}>Annuler</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                
            </Animatable.View>
        )}}
    
    
       }
       

       //HERE IS THE COMPONENT A USER AKSED FOR DETAILS
const UserHomeView=({navigation, route})=>{

    const [users, setUsers] = useState([])
    const [currentUserId, setCurrentUserId] = useState('')
    useEffect(()=>{
        setMenuIcon(false)
    })
    

    const scroll=useRef(new Animated.Value(0)).current

    
const renderItem=useCallback(({item})=>{

    return(
      <View style={{width:phoneWidth}}>
        <Image style={{marginTop:20, width:'90%', height:phoneHeight/2.3, marginLeft:'5%', resizeMode:'contain'}} source={{uri:item}} />
      </View>
    )
  })

    useEffect(()=>{
        db.child('users').on('value', (snapshot)=>{
            let update=[]
            snapshot.forEach((child)=>{
                update.push({
                    id:child.key,
                    username:child.val().username,
                    myCart:child.val().myCart,
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


    //THIS COMPONENT CHECKS WHETHER AN ITEM IS ALREADY IN THE CART 
    const CartCheck=()=>{
        

        let arr=[]
            users.map((user)=>{
                if(user.userId===currentUserId){
                    if(user.myCart){
                        
                        for(let x of user.myCart){
                            arr=[...arr, x.id]

                        }}}})
                           
                        
                            if(arr.includes(route.params.el.id)){
                                return(
                                    <LinearGradient start={{x:0, y:0}} end={{x:1, y:1}} colors={ ['black', '#222']} style={Styles.finalAction}>
                                    <TouchableOpacity style={{alignItems:'center'}}>
                                        <Text style={{color:'#fff', fontSize:15}}>Cet article est dans le panier</Text>
                                      </TouchableOpacity>
                                   </LinearGradient>
                                  
                                )
                            }
                            else{
                                return(
                                    <LinearGradient start={{x:0, y:0}} end={{x:1, y:1}} colors={['black', '#222']} style={Styles.finalAction}>
                                    <TouchableOpacity style={{alignItems:'center'}} onPress={()=>addToCart(route.params.el)}>
                                        <FontAwesome5 name='cart-arrow-down' size={24} color='white' />
                                        {
                                            cartItem?
                                            <ActivityIndicator color='white' size="large" />:
                                            <Text style={{color:'#ddd', fontSize:16, letterSpacing:1, fontFamily:'serif-thin', fontWeight:'bold' }}>
                                             Ajouter au panier</Text>          
                                   
                                        }
                                      </TouchableOpacity>
                                   </LinearGradient>
                                )
                            }
                    
        
        
                                        
                                    
    }




    useEffect(()=>{
        firebase.auth().onAuthStateChanged((x)=>{
            if(x){
                setCurrentUserId(x.uid)
            }
            //setCurrentUserId(x.uid)
        })
    }, [])

    useEffect(()=>{
        BackHandler.addEventListener('hardwareBackPress', ()=>navigation.navigate('UserHome'))
      })
   
        for(let a of offers){
            if(a.id===route.params.el.id){
               
                return(
                                     
                    <LinearGradient start={{x:0, y:0}} end={{x:1, y:0}} colors={isDarkTheme?['#444', '#444']: ['black', '#111']} style={Styles.articleDetail}>
                            <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.itemtitle}>{a.name} {a.category==='Promo'? <Fontisto name="shopping-sale" color="red" size={24} />:''} {a.category==='Promo'? <Text style={{fontSize:14, color:isDarkTheme? '#eee':'#444'}}>-{100-(a.promoPrice*100/a.price).toPrecision(2)}%</Text>:''}</Text>
                            <TouchableOpacity style={Styles.back}>
                                <Ionicons onPress={()=>{navigation.navigate('UserHome');}} name='arrow-back' size={34} color={isDarkTheme? '#eee':'white'}  />
                            </TouchableOpacity>
                    
                                    
                            <View style={{flexDirection:'row',   borderTopLeftRadius:20, borderTopRightRadius:20, backgroundColor: isDarkTheme? '#111':'rgba(255,255,255, 0.89)', justifyContent:'space-between', alignContent:'space-between', alignItems:'stretch',width:'100%', height:'93%',}}>
                            
                     
                            <ScrollView>
                                <View  style={{flexDirection:'column', marginTop:20, marginBottom:'20%',}}>
                                <Text style={Styles.time}>{timeAgo.format(a.time-60*1000)==='il y a 1 minute'? "A l'instant":timeAgo.format(a.time-60*1000)}</Text>
                                
                                {
                        a.imgurl?
                        <View style={Styles.container}>
                        <FlatList data={a.imgurl} horizontal showsHorizontalScrollIndicator={false} onScroll={Animated.event(
                          [{nativeEvent: {contentOffset:{x:scroll}}}],
                          {useNativeDriver: false}
                        )}
                        pagingEnabled
                        scrollEventThrottle={10}
                    
                        renderItem={renderItem}
                        />
                        <ExpandingDot data={a.imgurl}
                        expandingDotWidth={12}
                        activeDotColor="orangered"
                        scrollX={scroll}
                        inActiveDotOpacity={0.65}
                        dotStyle={{
                          width:6,
                          height:6,
                          backgroundColor:'red',
                          borderRadius:5,
                          marginHorizontal:5
                        }}
                        containerStyle={{ bottom:30}}
                        />
                        </View>



                        :''
                      }  
                               
                               {
                            a.category==='Promo'?
                            <Text style={{ color:isDarkTheme? '#aaa': '#222', fontSize:24, fontWeight:'700', marginLeft:'5%', }}><Text style={{color:'orangered', fontSize:18}}>$</Text> <Text style={{textDecorationLine:'line-through', color:isDarkTheme? '#444':'#aaa', fontSize:18}}> {a.price} </Text><Entypo name='price-tag' size={24} color={"#aaa"} /> <Animatable.Text iterationCount="infinite" duration={1000} animation="bounce"> {a.promoPrice}</Animatable.Text><Text style={{color:'orangered'}}> $</Text></Text>:
                            <Text style={{ color:isDarkTheme? '#aaa':'#222', fontSize:24, fontWeight:'700', marginLeft:'5%', }}><Text style={{color:'orangered'}}>$</Text> {a.price}</Text>


                        }
                                <Text style={Styles.desTitle}>Description</Text>
                                    <Text style={Styles.des}>{a.description}</Text>
                                    <Text style={{marginLeft:'5%', marginTop:'3%', color:isDarkTheme? '#aaa':'#111' }}>{a.quantity>1? `${a.quantity} en stock`:""}</Text>
                    

                                   
            


                                    {
                                        a.quantity<1?
                                        <View style={{marginBottom:'5%', width:'90%', borderRadius:10, height:phoneHeight/14, marginLeft:'5%',  backgroundColor:'#510', justifyContent:'center', alignItems:'center'}}>
                                            <Text style={{color:'#fff', fontSize:20}}>Stock épuisé</Text>
                                        </View>
                                        :
                                        <View style={Styles.action}>
                                               <CartCheck />
                                                          
                                                          <LinearGradient start={{x:0, y:0}} end={{x:1, y:1}} colors={['orangered', 'darkorange']}  style={Styles.finalAction}>
                                                              <TouchableOpacity onPress={()=>navigation.navigate('BuyItem', {el:a})} style={{alignItems:'center'}}>
                                                                  <FontAwesome5 name='opencart' size={24} color='white' />
                                                               
                                                                      <Text style={{color:'#fff', fontSize:16, letterSpacing:1, fontFamily:'serif-thin',fontWeight:'bold'  }}>Acheter</Text>
                                                                  
                                                                  
                                                              </TouchableOpacity>
                                                            
                                                          </LinearGradient>
                                                         
                                                      </View>
                                    }
                                 
                                                                        
                            
                                </View>
                            </ScrollView>
                            </View>
                           
                        </LinearGradient>
                    
                                     
                                )
    
            }
        }   

    
}

const Tab=createMaterialTopTabNavigator()
const UserHome=({navigation})=>{
   
    const [adminpanel, checkAdmin]=useState(false)
    //buying

    const CategoryOne=()=>{
        
    let arr=[]
    users.map((user)=>{
        if(user.userId===currentUserId){
            if(user.myCart){
                
                for(let x of user.myCart){
                    arr=[...arr, x.id]

                }
            }
        }
    })
        
        return(
            <View style={Styles.tab}>
               
                <View style={{marginBottom:'43%', marginTop:'3%', backgroundColor:isDarkTheme? '#111':'#fff'}}> 

{!offers.length>0 ? <View style={{flexDirection:'column' ,justifyContent:'center', alignItems:'center'}}>
   <Text>Aucun contenu</Text>
    </View>:<FlatList 
data={[...offers].reverse()}
numColumns={2}
renderItem={({item})=>(
<Pressable onPress={()=>navigation.navigate('UserView', {el: item})}>
{
        item.category==="iPhone"?
 <LinearGradient colors={isDarkTheme?['#666', '#111']: ['white', '#eee']} style={{justifyContent:'center',borderRadius:10, width:phoneWidth/2, height:288, marginBottom:'1%', borderWidth:4, borderColor:isDarkTheme? '#111':'#fff'}}>
<ScrollView style={{width:'100%'}}>
  
        <View>
        
{item.imgurl? <Image source={{uri:item.imgurl[0]}} style={{width:'80%', height:180, marginLeft:'10%', borderRadius:8, resizeMode:'contain'}} />:''}
<Text ellipsizeMode="tail" numberOfLines={1} style={Styles.listTxt}>{item.name}</Text>
                        <Text style={{color: isDarkTheme? '#eee':'#222', fontSize:22, fontWeight:'700', textAlign:'left', marginLeft:'10%', }}><Text style={{color:'orangered'}}>$</Text> {item.price}</Text>
                       
                        <View style={{flexDirection:'row'}}>
                        <Text style={{textAlign:'left', marginLeft:'10%', fontSize:10, color:isDarkTheme? '#eee':'#666',}}>{timeAgo.format(item.time-60*1000)==='il y a 1 minute'? "A l'instant":timeAgo.format(item.time-60*1000)}</Text>
                        {
                            arr.includes(item.id)?
                            <Text style={{marginLeft:'12%'}}><Entypo name='shopping-cart' size={24} color={isDarkTheme? 'orangered':"#333"} /><Entypo name='check' size={24} color="green" /></Text>:
                            ''
                        }
                        </View>

                        {
                            item.quantity<1?
                            <View style={{position:'absolute', width:'42%', height:'9%', bottom:'26%', right:'10%', backgroundColor:'rgba(255, 40, 40, 0.7)', }}>
                                <View style={{justifyContent:'center', alignItems:'center', width:'100%', height:"100%"}}>
                                    <Text style={{color:'#fff', fontSize:12, fontFamily:"serif"}}>stock épuisé</Text>
                                </View>
                                
                            </View>:''
                        }
</View>



</ScrollView>

</LinearGradient>:""}



</Pressable>
)} />

} 
    
</View>
            </View>
        )

    }

    const CategoryTwo=()=>{
        
    let arr=[]
    users.map((user)=>{
        if(user.userId===currentUserId){
            if(user.myCart){
                
                for(let x of user.myCart){
                    arr=[...arr, x.id]

                }}}})
        return(
            <View style={Styles.tab}>
               
                <View style={{marginBottom:'43%', marginTop:'3%', backgroundColor:isDarkTheme? '#111':'#fff'}}> 

{!offers.length>0 ? <View style={{flexDirection:'column' ,justifyContent:'center', alignItems:'center'}}>
   <Text>Aucun contenu</Text>
    </View>:<FlatList 
data={[...offers].reverse()}
numColumns={2}
renderItem={({item})=>(
<Pressable onPress={()=>navigation.navigate('UserView', {el: item})}>
{
        item.category==="Samsung"?
 <LinearGradient colors={isDarkTheme?['#666', '#111']: ['white', '#eee']} style={{justifyContent:'center',borderRadius:10, width:phoneWidth/2, height:288, marginBottom:'1%', borderWidth:4, borderColor:isDarkTheme? '#111':'#fff'}}>
<ScrollView style={{width:'100%'}}>
  
        <View>
       
{item.imgurl? <Image source={{uri:item.imgurl[0]}} style={{width:'80%', height:180, marginLeft:'10%', borderRadius:8, resizeMode:'contain'}} />:''}
<Text ellipsizeMode="tail" numberOfLines={1} style={Styles.listTxt}>{item.name}</Text>
                        <Text style={{color: isDarkTheme? '#eee':'#222', fontSize:22, fontWeight:'700', textAlign:'left', marginLeft:'10%', }}><Text style={{color:'orangered'}}>$</Text> {item.price}</Text>
                       
                        <View style={{flexDirection:'row'}}>
                        <Text style={{textAlign:'left', marginLeft:'10%', fontSize:10, color:isDarkTheme? '#eee':'#666',}}>{timeAgo.format(item.time-60*1000)==='il y a 1 minute'? "A l'instant":timeAgo.format(item.time-60*1000)}</Text>
                        {
                            arr.includes(item.id)?
                            <Text style={{marginLeft:'12%'}}><Entypo name='shopping-cart' size={24} color={isDarkTheme? 'orangered':"#333"} /><Entypo name='check' size={24} color="green" /></Text>:
                            ''
                        }
                        </View>

                        {
                            item.quantity<1?
                            <View style={{position:'absolute', width:'42%', height:'9%', bottom:'26%', right:'10%', backgroundColor:'rgba(255, 40, 40, 0.7)', }}>
                                <View style={{justifyContent:'center', alignItems:'center', width:'100%', height:"100%"}}>
                                    <Text style={{color:'#fff', fontSize:12, fontFamily:"serif"}}>stock épuisé</Text>
                                </View>
                                
                            </View>:''
                        }
</View>



</ScrollView>

</LinearGradient>:""}



</Pressable>
)} />



} 
    
    
</View>
            </View>
        )
        
    }

    const CategoryThree=()=>{
        
    let arr=[]
    users.map((user)=>{
        if(user.userId===currentUserId){
            if(user.myCart){
                
                for(let x of user.myCart){
                    arr=[...arr, x.id]

                }}}})
        return(
            <View style={Styles.tab}>
               
                <View style={{marginBottom:'43%', marginTop:'3%', backgroundColor:isDarkTheme? '#111':'#fff'}}> 

{!offers.length>0 ? <View style={{flexDirection:'column' ,justifyContent:'center', alignItems:'center'}}>
   <Text>Aucun contenu</Text>
    </View>:<FlatList 
data={[...offers].reverse()}
numColumns={2}
renderItem={({item})=>(
<Pressable onPress={()=>navigation.navigate('UserView', {el: item})}>
{
        item.category==="Autres"?
 <LinearGradient colors={isDarkTheme?['#666', '#111']: ['white', '#eee']} style={{justifyContent:'center',borderRadius:10, width:phoneWidth/2, height:288, marginBottom:'1%', borderWidth:4, borderColor:isDarkTheme? '#111':'#fff'}}>
<ScrollView style={{width:'100%'}}>
  
        <View>
      
{item.imgurl? <Image source={{uri:item.imgurl[0]}} style={{width:'80%', height:180, marginLeft:'10%', borderRadius:8, resizeMode:'contain'}} />:''}
<Text ellipsizeMode="tail" numberOfLines={1} style={Styles.listTxt}>{item.name}</Text>
                        <Text style={{ color: isDarkTheme? '#eee':'#222', fontSize:22, fontWeight:'700', textAlign:'left', marginLeft:'10%', }}><Text style={{color:'orangered'}}>$</Text> {item.price}</Text>
                     
                        <View style={{flexDirection:'row'}}>
                        <Text style={{textAlign:'left', marginLeft:'10%', fontSize:10, color:isDarkTheme? '#eee':'#666',}}>{timeAgo.format(item.time-60*1000)==='il y a 1 minute'? "A l'instant":timeAgo.format(item.time-60*1000)}</Text>
                        {
                            arr.includes(item.id)?
                            <Text style={{marginLeft:'12%'}}><Entypo name='shopping-cart' size={24} color={isDarkTheme? 'orangered':"#333"} /><Entypo name='check' size={24} color="green" /></Text>:
                            ''
                        }
                        </View>
                        {
                            item.quantity<1?
                            <View style={{position:'absolute', width:'42%', height:'9%', bottom:'26%', right:'10%', backgroundColor:'rgba(255, 40, 40, 0.7)', }}>
                                <View style={{justifyContent:'center', alignItems:'center', width:'100%', height:"100%"}}>
                                    <Text style={{color:'#fff', fontSize:12, fontFamily:"serif"}}>stock épuisé</Text>
                                </View>
                                
                            </View>:''
                        }



</View>


</ScrollView>

</LinearGradient>:""}



</Pressable>
)} />


} 
    
    
</View>
            </View>
        )
        
    }


    
    const MainHomeComponent=()=>{

       

        const [searching, setSearch]=useState('')

    
    let finalsearch=searching.toLowerCase()
        return(
            <View style={Styles.tab}>
                    
                
                
                    <View style={Styles.searchPanel}>
                                <FontAwesome name='search' size={20} color={isDarkTheme? '#444':'#aaa'} style={{position:'absolute', left:'12%',marginTop:'1.6%'}} />
                                <TextInput style={Styles.search} placeholderTextColor={isDarkTheme? '#aaa':"#aaa"} value={searching} autoComplete="name" inputMode="search" keyboardAppearance="dark" onChangeText={(e)=>setSearch(e)} multiline={false} placeholder="rechercher" />
                                {
                                    !searching.length<=0?
                                    <FontAwesome style={{marginLeft:'-6.5%', marginTop:'1.6%'}} onPress={()=>{setSearch(''); Keyboard.dismiss()}} name='remove' size={20} color={isDarkTheme?'#bbb': "#555"} />:''
                                }
                               
                            </View>

                        <View style={Styles.sty}> 

                        {
                            searching===""?
                            <View style={{flexDirection:'row', width:phoneWidth, justifyContent:'space-between', alignItems:'center'}}>
                            <Text style={{ fontSize:20, fontFamily:'serif', fontWeight:'600', color:isDarkTheme? '#eee':'#666', marginLeft:'3%'}}>Tous les articles</Text>
                            <Text><Entypo name='shop' size={24} color={isDarkTheme? '#eee':'#333'}/></Text>
                            <Text style={{ fontSize:14, fontWeight:'500', color:isDarkTheme? '#eee':'#666', marginTop:'0.5%', marginRight:'1%'}}>{offers.length} Produits</Text></View>: <Text style={{ fontSize:24, fontWeight:'900', color:'#666', marginLeft:'3%'}}>Recherche</Text>
                        }


                        
                        {!offers.length>0? <Loader />:<FlatList
                
              data={[...offers].reverse()}
              numColumns={2}
              renderItem={({item})=>(
                <Pressable onPress={()=>navigation.navigate('UserView', {el: item})}>
                    {searching===""?  <LinearGradient colors={isDarkTheme?['#666', '#111']: ['white', '#eee']} style={{justifyContent:'center', borderRadius:10, width:phoneWidth/2, height:300, marginBottom:'1%', borderWidth:4, borderColor:isDarkTheme? '#111':'#fff'}}>
                       
                        {item.imgurl? <Image source={{uri:item.imgurl[0]}} style={{width:'80%', marginLeft:'10%', height:180, borderRadius:8, resizeMode:'contain'}} />:''}
                       
                        {
                            item.category==='Promo'?
                            <Animatable.View style={{backgroundColor:'red', position:'absolute', width:50, height:50, left:'10%', top:'55%', borderRadius:100}} animation="bounce" iterationCount='infinite' duration={1000}>
                                <View style={{width:"100%", height:'100%', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                    <Text style={{color:'white', fontWeight:'bold', fontSize:14}}>-{100-(item.promoPrice*100/item.price).toPrecision(2)}%</Text>
                                 
                                </View>
                                
                            </Animatable.View>
                                :''
                           }
                        <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.listTxt}>{item.name}</Text>
                        {
                            item.category==='Promo'?
                            <Text style={{ color:isDarkTheme? '#eee':'#222', fontSize:22, fontWeight:'700', textAlign:'left', marginLeft:'10%', }}><Text style={{color:'orangered', fontSize:14}}>$</Text> <Text style={{textDecorationLine:'line-through', color:'#aaa', fontSize:14}}> {item.price} </Text><Entypo name='price-tag' size={24} color={"#aaa"} /> <Animatable.Text iterationCount="infinite" duration={1000} animation="bounce"> {item.promoPrice}</Animatable.Text><Text style={{color:'orangered'}}> $</Text></Text>:
                            <Text style={{ color: isDarkTheme? '#eee':'#222', fontSize:22, fontWeight:'700', textAlign:'left', marginLeft:'10%', }}><Text style={{color:'orangered'}}>$</Text> {item.price}</Text>


                        }
                      
                        <View style={{flexDirection:'row'}}>
                        <Text style={{textAlign:'left', marginLeft:'10%', color:isDarkTheme? '#eee':'#666', fontSize:10}}>{timeAgo.format(item.time-60*1000)==='il y a 1 minute'? "A l'instant":timeAgo.format(item.time-60*1000)}</Text>
                        {
                            arr.includes(item.id)?
                            <Text style={{marginLeft:'12%'}}><Entypo name='shopping-cart' size={24} color={isDarkTheme? 'orangered':"#333"} /><Entypo name='check' size={24} color="green" /></Text>:
                            ''
                        }
                        </View>

                        {
                            item.quantity<1?
                            <View style={{position:'absolute', width:'42%', height:'9%', bottom:'30%', right:'10%', backgroundColor:'rgba(255, 40, 40, 0.7)', }}>
                                <View style={{justifyContent:'center', alignItems:'center', width:'100%', height:"100%"}}>
                                    <Text style={{color:'#fff', fontSize:12, fontFamily:"serif"}}>stock épuisé</Text>
                                </View>
                                
                            </View>:''
                        }
                       
                    
                    
                    </LinearGradient>:null}


                    {

                        searching && item.name.toLowerCase().includes(finalsearch)? 
                      <LinearGradient colors={isDarkTheme?['#666', '#111']: ['white', '#eee']} style={{justifyContent:'center', borderRadius:10, width:phoneWidth/2, height:300, marginBottom:'1%', borderWidth:4, borderColor:isDarkTheme? '#111':'#fff'}}>
                            
                        
                        
                        {item.imgurl? <Image source={{uri:item.imgurl[0]}} style={{width:'80%', height:180, borderRadius:8, marginLeft:'10%', resizeMode:'stretch'}} />:''}
                        {
                            item.category==='Promo'?
                            <Animatable.View style={{backgroundColor:'red', position:'absolute', width:50, height:50, left:'10%', top:'55%', borderRadius:100}} animation="bounce" iterationCount='infinite' duration={1000}>
                                <View style={{width:"100%", height:'100%', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                    <Text style={{color:'white', fontWeight:'bold', fontSize:14}}>-{100-(item.promoPrice*100/item.price).toPrecision(2)}%</Text>
                                 
                                </View>
                                
                            </Animatable.View>
                                :''
                           }
                        <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.listTxt}>{item.name}</Text>
                        {
                            item.category==='Promo'?
                            <Text style={{ color:isDarkTheme? '#eee':'#222', fontSize:22, fontWeight:'700', textAlign:'left', marginLeft:'10%', }}><Text style={{color:'orangered', fontSize:14}}>$</Text> <Text style={{textDecorationLine:'line-through', color:'#aaa', fontSize:14}}> {item.price} </Text><Entypo name='price-tag' size={24} color={"#aaa"} /> <Animatable.Text iterationCount="infinite" duration={1000} animation="bounce"> {item.promoPrice}</Animatable.Text><Text style={{color:'orangered'}}> $</Text></Text>:
                            <Text style={{ color:isDarkTheme? '#eee':'#222', fontSize:22, fontWeight:'700', textAlign:'left', marginLeft:'10%', }}><Text style={{color:'orangered'}}>$</Text> {item.price}</Text>


                        }
                         <Text style={{position:'absolute',zIndex:222, right:"10%", bottom:'14%', fontSize:12, fontWeight:'bold', color:'orangered'}}>{item.quantity}</Text>
                        <View style={{flexDirection:'row'}}>
                        <Text style={{textAlign:'left', marginLeft:'10%', fontSize:10, color:isDarkTheme? '#eee':'#666'}}>{timeAgo.format(item.time-60*1000)==='il y a 1 minute'? "A l'instant":timeAgo.format(item.time-60*1000)}</Text>
                        {
                            arr.includes(item.id)?
                            <Text style={{marginLeft:'12%'}}><Entypo name='shopping-cart' size={24} color={isDarkTheme? 'orangered':"#333"} /><Entypo name='check' size={24} color="green" /></Text>:
                            ''
                        }
                        </View>

                        {
                            item.quantity<1?
                            <View style={{position:'absolute', width:'42%', height:'9%', bottom:'30%', right:'10%', backgroundColor:'rgba(255, 40, 40, 0.7)', }}>
                                <View style={{justifyContent:'center', alignItems:'center', width:'100%', height:"100%"}}>
                                    <Text style={{color:'#fff', fontSize:12, fontFamily:"serif"}}>stock épuisé</Text>
                                </View>
                                
                            </View>:''
                        }
                    </LinearGradient>:null
                    }
                   
                </Pressable>
              )} />
             
            
            }                   
              
                        </View>
                      
                        
                    </View>
        )
    }


    const Loader=()=>{
        const [load, setLoad]=useState(false)
        const [x, setX]=useState(5)
     
            let i=setInterval(go, 1000)
            function go(){
                setX(x-1)
                if(x===0){
                    setLoad(true)
                    
                    clearInterval(i)
                }
                
            }
   
       
        return(
            <View style={{flexDirection:'column' ,justifyContent:'center', alignItems:'center', width:phoneWidth, height:phoneHeight,backgroundColor:'#fff'}}>
              
                    <Text>Aucun contenu trouvé</Text>
                
            </View>
        )
    }



    const [showMenu, setShowMenu]=useState(false)

    const toggleMenu=()=>{
        setShowMenu(!showMenu)
    }

    let arr=[]
    users.map((user)=>{
        if(user.userId===currentUserId){
            if(user.myCart){
                
                for(let x of user.myCart){
                    arr=[...arr, x.id]

                }}}})


   
    const stCategory=<CategoryOne />
    const ndCategory=<CategoryTwo />
    const rdCategory=<CategoryThree />
    const mainComponent=<MainHomeComponent />
    const scrollX=useRef(new Animated.Value(0)).current
    const alLComponents=[mainComponent, stCategory, ndCategory, rdCategory]


   const goToSetting=()=>{
        navigation.navigate('Settings')
        hideTabBar()
        setShowMenu(false)
   }

   const writeToUs=()=>{
    navigation.navigate('Chat')
    //hideTabBar()
    setShowMenu(false)
   }

   /*

<View style={{position:'absolute', top:phoneHeight/2, width:phoneWidth, zIndex:1}}>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <Animatable.View style={{flexDirection:'row', justifyContent:'center'}} animation={'slideInRight'} duration={1000} iterationCount={'infinite'}>
                        <AntDesign name='left' color={'#aaa'} size={20} />
                        <AntDesign name='left' color={'#aaa'} size={20} />
                    </Animatable.View>
                    <Animatable.View style={{flexDirection:'row', justifyContent:'center'}} animation={'slideInLeft'} duration={1000} iterationCount={'infinite'}>
                        <AntDesign name='right' color={'#aaa'} size={20} />
                        <AntDesign name='right' color={'#aaa'} size={20} />
                    </Animatable.View>
                </View>
           
            </View>

   */

            const readMsg=()=>{
                navigation.navigate('Chat')
                for(let x of users){
                    if(x.userId===currentUserId){
                       if(x.messages){
                            db.child(`users/${x.id}/messages`).set([])
                                .then(()=>{
                                   console.log('message read successfully');
                            })
                        }
                    }
                }
            }

            const [currentUserId, setCurrentUserId]=useState('')
            useEffect(()=>{
                firebase.auth().onAuthStateChanged((x)=>{
                    if(x){
                        setCurrentUserId(x.uid)
                    }
                    //setCurrentUserId(x.uid)
                })
            }, [])

            const [currentNotif, setNotif]=useState('')

           
            useEffect(()=>{
                for(let user of users){
                    if(user.messages){
                        for(let msg of user.messages){     
                                setNotif(msg.message)
                            
                        }
                    }
                }
            }, [])


            /*
            const sendNotif=()=>{
              let res=PushNotification.localNotification({
                    autoCancel: true,
                    channelId: "ak99",
                    ignoreInForeground: true,
                    onlyAlertOnce: true,
                    bigText:
                      `Nouveau message`,
                    subText: `Message de altokudos`,
                    title: 'Altokudos',
                    message: `${currentNotif}`,
                    picture: appicon,
                    vibrate: true,
                    vibration: 300,
                    playSound: true,
                    tag:'msg',
                    group:'msg',
                    groupSummary: true,
                    color:'orange',
                    soundName: 'default',
                    actions: '["Ouvrir", "Ignorer"]'
                   
                  },
                 )

                 return res
            }
            */
            

                   
    return(
        <View style={accountEdit? {opacity:0.1}: Styles.main}>

{
users.map((v, k)=>{
    if(v.userId===currentUserId){
       if(v.messages){
        PushNotification.localNotification({
            autoCancel: true,
            channelId: "ak99",
            ignoreInForeground: true,
            onlyAlertOnce: true,
            bigText:
              `Nouveau message`,
            subText: `Message de altokudos`,
            title: 'Altokudos',
            message: `${currentNotif}`,
            picture: appicon,
            vibrate: true,
            vibration: 300,
            playSound: true,
            tag:'msg',
            group:'msg',
            groupSummary: true,
            color:'orange',
            soundName: 'default',
            actions: '["Ouvrir", "Ignorer"]'
           
          },
         )

    

           

          return(
            <Pressable key={k} onPress={readMsg} style={{position:'absolute', width:phoneHeight/10, height:phoneHeight/10, borderRadius:phoneHeight/5, backgroundColor:'rgba(255, 90, 20, 0.75)' ,right:'3%', bottom:'3%', zIndex:4}}>
                <Animatable.View iterationCount={'infinite'} duration={800} animation={'bounce'} style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}}>
                    <Entypo name='chat' size={36} color={isDarkTheme? '#eee':'#eee'} />
                </Animatable.View>
                <FontAwesome name='circle' size={20} color={'red'} style={{position:'absolute', top:0}} />
            </Pressable>
          )
        }
        else{
            return(
                <Pressable key={k} onPress={()=>navigation.navigate('Chat')} style={{position:'absolute', width:phoneHeight/10, height:phoneHeight/10, borderRadius:phoneHeight/5, backgroundColor:'rgba(255, 90, 20, 0.75)' ,right:'3%', bottom:'3%', zIndex:4}}>
                <View style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}}>
                    <Entypo name='chat' size={36} color={isDarkTheme? '#eee':'#eee'} />
                </View>
            </Pressable>
            )
        }
    }
})
} 

    

            
           
            
            

<MaterialIcons onPress={toggleMenu} name="menu" style={{position:'absolute', zIndex:1, top:"1%"}} size={36} color={isDarkTheme?'#444': '#aaa'} />


<Modal transparent animationType="slide" visible={showMenu} >
<View style={Styles.adminPanel}>

<MaterialIcons onPress={toggleMenu} name="close" size={36} color={isDarkTheme? '#aaa': 'black'} />

<TouchableOpacity style={Styles.menuTxtBox} >
     <MaterialIcons name="category" size={28} color='#666' />
     <Text style={Styles.menuTxt}>Catégories</Text>
 </TouchableOpacity>

 <View style={{marginLeft:"20%", width:'100%', height:"23.5%"}}> 
 <TouchableOpacity style={{width:"50%",
        justifyContent:'space-around',
        display:'flex',
        marginTop:'8%',
        marginLeft:'5%',
        borderWidth:0.1,
        flexDirection:'row',
        alignItems:'flex-start',
        height:'18%',}} onPress={()=>{
    navigation.navigate('apple')
   // hideTabBar()
    setShowMenu(false)
}}>
     <Entypo name='app-store' size={28} color='#666' />
     <Text style={Styles.menuTxt}>Apple</Text>
 </TouchableOpacity>

 <TouchableOpacity style={{width:"50%",
        justifyContent:'space-around',
        display:'flex',
        marginTop:'8%',
        marginLeft:'5%',
        borderWidth:0.1,
        flexDirection:'row',
        alignItems:'flex-start',
        height:'18%',}} onPress={()=>{
    navigation.navigate('samsung')
   // hideTabBar()
    setShowMenu(false)
}}>
     <Ionicons name="phone-portrait-outline" size={28} color='#666' />
     <Text style={Styles.menuTxt}>Samsung</Text>
 </TouchableOpacity>


 <TouchableOpacity style={{width:"50%",
        justifyContent:'space-around',
        display:'flex',
        marginTop:'8%',
        marginLeft:'5%',
        borderWidth:0.1,
        flexDirection:'row',
        alignItems:'flex-start',
        height:'18%'}} onPress={()=>{
    navigation.navigate('autres')
   // hideTabBar()
    setShowMenu(false)
}}>
     <Entypo name='shop' size={28} color='#666' />
     <Text style={Styles.menuTxt}>Autres</Text>
 </TouchableOpacity>
 </View>






<TouchableOpacity style={Styles.menuTxtBox} onPress={writeToUs}>
     <Feather name="message-circle" size={28} color='#666' />
     <Text style={Styles.menuTxt}>Nous écrire</Text>
 </TouchableOpacity>

 <TouchableOpacity style={Styles.menuTxtBox} onPress={goToSetting}>
     <AntDesign name='setting' size={28} color='#666' />
     <Text style={Styles.menuTxt}>Paramètres</Text>
 </TouchableOpacity>

 <TouchableOpacity style={Styles.menuTxtBox} onPress={()=>{onShare();  setShowMenu(false)}}>
     <Entypo name='share' size={28} color='#666' />
     <Text style={Styles.menuTxt}>Partager</Text>
 </TouchableOpacity>

 <TouchableOpacity style={Styles.menuTxtBox}>
     <Entypo name='text' size={28} color='#666' />
     <Text style={Styles.menuTxt}>A propos</Text>
 </TouchableOpacity>

 <TouchableOpacity style={Styles.menuTxtBox} onPress={()=>{ setShowMenu(false)}}>
     <AntDesign name="exclamationcircle" size={28} color='#666' />
     <Text style={Styles.menuTxt}>v1.0</Text>
 </TouchableOpacity>


</View></Modal>

            <Image source={appicon} style={{width:phoneHeight/14, zIndex:111, height:phoneHeight/14, position:'absolute', right:"1%", top:"0%"}} />     


            < >

<Tab.Navigator independent screenOptions={{
"tabBarActiveTintColor":isDarkTheme?'white': "orangered",
"tabBarInactiveTintColor":isDarkTheme? "#eee":"#222",
"tabBarInactiveBackgroundColor":isDarkTheme? "#111": "white",
"tabBarActiveBackgroundColor":isDarkTheme?"#444": "white",
"tabBarLabelStyle":{
"fontSize":10,

'color':isDarkTheme? "#ccc": "#222"
},

"tabBarStyle": [
{
"display": "flex",
"height":"8%",
"backgroundColor":isDarkTheme? '#444':'#fff'


},
null
]
}}>
        <Tab.Screen name='tous' component={MainHomeComponent} options={{tabBarIcon:({color, size, focused})=>(
            <View style={{flexDirection:'column', justifyContent:'space-evenly', alignItems:'center'}}>
                {
                    focused?
                    <MaterialCommunityIcons color={isDarkTheme? '#aaa':'#222'} name='storefront' size={19} />:
                    <MaterialCommunityIcons color={isDarkTheme? '#aaa':'#222'} name="storefront-outline" size={16} />
                }
             
            
            </View>
            ), headerShown:false, tabBarIndicatorStyle:{borderBottomColor:isDarkTheme?'#aaa':'#222', borderBottomWidth:2}, tabBarLabelStyle:{display:'none'}}} />
        
        <Tab.Screen name='apple' component={CategoryOne} options={{tabBarIcon:({color, size, focused})=>(
            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                {
                    focused?
                    <AntDesign color={isDarkTheme? '#aaa':'#222'} name="apple1" size={18} />:
                    <AntDesign color={isDarkTheme? '#aaa':'#222'} name="apple-o" size={16} />
                }
            
            </View>
            ), headerShown:false, tabBarIndicatorStyle:{borderBottomColor:isDarkTheme?'#aaa':'#222', borderBottomWidth:2}, tabBarLabelStyle:{display:'none'}}}/>
        
        <Tab.Screen name="samsung" component={CategoryTwo} options={{tabBarIcon:({color, size, focused})=>(
            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                {
                    focused?
                    <Ionicons color={isDarkTheme? '#aaa':'#222'} name="phone-portrait" size={18} />:
                    <Ionicons color={isDarkTheme? '#aaa':'#222'} name="phone-portrait-outline" size={16} />
                }
            </View>
            ), headerShown:false, tabBarIndicatorStyle:{borderBottomColor:isDarkTheme?'#aaa':'#222', borderBottomWidth:2}, tabBarLabelStyle:{display:'none'}}} />
        
        <Tab.Screen name='autres' component={CategoryThree}  options={{tabBarIcon:({color, size, focused})=>(
            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                {
                    focused?
                    <MaterialCommunityIcons name="dots-horizontal-circle" color={isDarkTheme? '#aaa':'#222'}  size={24} />
                    :
                    <MaterialCommunityIcons name="dots-horizontal-circle-outline" color={isDarkTheme? '#aaa':'#222'}  size={19} />
                }
                
            </View>
            
            ), headerShown:false, tabBarIndicatorStyle:{borderBottomColor:isDarkTheme?'#aaa':'#222', borderBottomWidth:2}, tabBarLabelStyle:{display:'none'}}} />
       </Tab.Navigator>
</>


        </View>
    )
        
}


const [accountChecked, setAccountChecked]=useState(true)
const [accountEdit, setAccountEdit]=useState(false)

useEffect(()=>{
    for(let x of users){
        if(x.userId===currentUserId){
            if(!x.isAdmin){
                if(!x.pic || !x.phonenumber || !x.useradress){
               // setAccountChecked(false)
               
                    setTimeout(()=>setAccountEdit(true), 180000)
                }
                else{
                setAccountEdit(false)
                }
            }
            
            
        }
    }
}, [users])
/*
useEffect(()=>{
    if(accountChecked===false){
        setTimeout(()=>setAccountEdit(true), 6000)
    }
    else{
        setAccountEdit(false)
    }
}, [])
*/

//const [menuIcon, setMenuIcon]=useState(true)


    return(
     
            <>


   

            
            <Modal animationType="slide" visible={accountEdit} transparent>
                 <View style={Styles.reminder}>
                    <Text style={{color:isDarkTheme? '#aaa': '#555', width:'90%', fontSize:16, fontFamily:'serif', letterSpacing:2, textAlign:'center', fontWeight:'bold'}}>Votre profil manque d'informations. Voulez-vous en ajouter?</Text>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Profil'); setAccountEdit(false)}} style={Styles.remindbtn}>
                        <Text>Oui</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>setAccountEdit(false)} style={Styles.remindbtn}>
                        <Text>Plus tard</Text>
                    </TouchableOpacity>
                 
                 </View>
     
             </Modal>
           


               <NavigationContainer independent>
                <Stack.Navigator>
          
                    <Stack.Screen name='UserHome' component={UserHome} options={{headerShown:false}}/>
                    <Stack.Screen name='UserView' component={UserHomeView} options={{headerShown:false}} />
                    <Stack.Screen name='BuyItem' component={BuyItem} options={{headerShown:false}} />
                    <Stack.Screen name='Settings' component={Settings} options={{headerShown:false}} />
                    <Stack.Screen name="Chat" component={Chat} options={{headerShown:false}} />

                </Stack.Navigator>
            </NavigationContainer>
            </>

    )


}


export default AllUser
