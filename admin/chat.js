import { useState, useEffect } from "react"
import { View, FlatList, Image, ScrollView, Text, TextInput, Dimensions, TouchableOpacity, useColorScheme, ActivityIndicator } from "react-native"
import {firebase, db} from '../fbconfig'
import LinearGradient from "react-native-linear-gradient"
import { Pressable } from "react-native"
import TimeAgo from "javascript-time-ago"
import fr from 'javascript-time-ago/locale/fr.json'
import img from '../img/img.png'
import { Entypo, AntDesign, MaterialIcons } from "@expo/vector-icons"
import { NavigationContainer, useFocusEffect } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Alert } from "react-native"

const phoneWidth=Dimensions.get('window').width
const phoneHeight=Dimensions.get('window').height
const Stack= createNativeStackNavigator()


const Chat=()=>{
    const Styles={
        articleDetail:{
            height:phoneHeight,
            width:phoneWidth,
            position:'absolute',
            zIndex:1111,
            flexDirection:'column',
            justifyContent:'flex-end',
            alignItems:'center',
            
           
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
            color:isDarkTheme?'#aaa': 'white'
        },
        back:{
            // backgroundColor:'black',
             top:"1%",
             borderRadius:12,
             position:'absolute',
             width:'10%',
             left:"2%"
             
         },
         time:{
            //position:'absolute',
            left:'5%',
            color:isDarkTheme? '#aaa': '#666'
        },
    
    }
    const theme=useColorScheme()
    const isDarkTheme=theme==="dark"

    TimeAgo.addLocale(fr)
    const timeAgo=new TimeAgo('fr-FR')

    const List=({navigation})=>{

        const [users, setUsers]=useState([])
        const [currentUserId, setCurrentUserId]=useState('')
    
        //const [users, setUsers]=useState([])
    
        useEffect(()=>{
            db.child('users').on('value', (snapshot)=>{
                let update=[]
                snapshot.forEach((child)=>{
                    update.push({
                        id:child.key,
                        username:child.val().username,
                        chat:child.val().chat,
                        activities:child.val().activities,
                        myCart:child.val().myCart,
                        messages:child.val().messages,
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


        return(
            <LinearGradient start={{x:0, y:0}} end={{x:1, y:0}} colors={['black', 'black']} style={Style.main}>
             <Text style={Style.text}>Messages</Text>
            <View style={Style.box}>

               
                            
                                <FlatList data={[...users].reverse()}
                            
                                numColumns={1}
                  renderItem={({item})=>(     
                    
                    
                        item.chat?
                    
                    <Pressable  onPress={()=>navigation.navigate('Conversation', {el: item})}>
                    <LinearGradient style={[...users].reverse().indexOf(item)===[...users].reverse().length-1? {justifyContent:'center', marginTop:'3%', marginBottom:'0%', borderRadius:10, width:phoneWidth/1.05, height:90, borderColor:'#ddd'}:{justifyContent:'center',  borderRadius:10, width:phoneWidth/1.05, height:90, marginBottom:'1%', marginTop:'6%',  borderColor:'#ddd'} } colors={isDarkTheme? ['#aaa', 'white']: ['white', '#aaa']} >
        
          
                    <View style={{width:'100%', flexDirection:'row', alignItems:'center'}}>
                   
                    {item.pic? <Image source={{uri:item.pic}} style={{width:60, marginLeft:'1%', height:60, borderRadius:120, resizeMode:'contain'}} />:<Image source={img} style={{width:60, marginLeft:'1%', height:60, borderRadius:120, resizeMode:'contain'}} />}
                                
                               
                               

                                {
                                    [...item.chat].map((v, k)=>{
                                        if(item.chat)
                                        if([...item.chat].indexOf(v)===[...item.chat].length-1){
                                            return(
                                                <View key={k} style={{position:'absolute', left:'20%', width:'80%', bottom:'2%', height:'100%'}}>
                                                    <View style={{flexDirection:'column', justifyContent:'space-around', height:'100%', width:'100%'}}> 
                                                 <Text ellipsizeMode="tail" style={{color:'#222', fontFamily:'serif', letterSpacing:1, width:"80%", fontSize:16}} numberOfLines={1} >{item.username}</Text>
                                     
                                                                                            {
                                                                                                v.admin?
                                                                                                <Text ellipsizeMode="tail" style={{width:'90%', color:'#322'}} numberOfLines={1}>moi: {v.message}</Text>:
                                                                                                <Text ellipsizeMode="tail" style={{width:'90%', color:'#322', fontWeight:'bold'}} numberOfLines={1}>{v.message}</Text>
                                                                                            }
                                                                                           
                                                                                           </View>
                                                                                           <Text style={{position:'absolute', right:'2%', bottom:'-14%' ,fontSize:11, color:'#666'}}>{timeAgo.format(v.time-60*1000)==='il y a 1 minute'? "A l'instant":timeAgo.format(v.time-60*1000)}</Text>
                                                                                        </View>
                                                                                        )
                                        }
                                        
                                        
                                    })
                                }

                              
                               
                </View>
            
                
                </LinearGradient>
                </Pressable>:''
    
                  )}/>
                            

                        
                    
            
           
                  
                
            </View>
           
        </LinearGradient>
        )


    }

    /*
<View style={{backgroundColor:isDarkTheme? '#444':'black', flex:1, justifyContent:'flex-end' ,width:phoneWidth, height:phoneHeight}}>
                <View style={{width:'94%', position:'absolute', left:'3%', top:'3%', flexDirection:'row', justifyContent:'space-between'}}>
                    <AntDesign onPress={backToHome} style={{color:isDarkTheme? '#ddd':'#bbb'}} name='back' size={30} />
                    <View style={{flexDirection:'row', justifyContent:'center'}}><Image source={appicon} style={{width:34, height:34}} /><Text style={{color:isDarkTheme? '#aaa':'#bbb', fontSize:20, fontFamily:'serif', letterSpacing:1}}>Altokudos</Text></View>  
                </View>

                <View style={{height:'90%', borderTopLeftRadius:20, borderTopRightRadius:20 ,justifyContent:'flex-start', backgroundColor:isDarkTheme? '#111':'#fff'}}>
                    <View style={{flexDirection:'row', width:'100%', position:'absolute', top:'2%', height:"6%", justifyContent:'center', alignItems:'center'}}>
                        <View style={{justifyContent:'space-between', flexDirection:'row', width:'60%', borderBottomWidth:1, borderBottomColor:'#aaa', height:'100%'}}>
                            <MaterialIcons name='call' size={26} color={isDarkTheme? "#aaa":"#322"} />
                            <MaterialIcons name="location-pin" size={26} color={isDarkTheme?'#aaa':"#322"} />
                            <MaterialIcons name="delete" size={26} color={isDarkTheme?'#aaa':'#322'} />
                        </View>
                        
                    </View>

                    <Text ellipsizeMode="tail" numberOfLines={1} style={{color:isDarkTheme? '#bbb':"#444",marginBottom:'4%', fontSize:12, textAlign:'center', marginTop:"15%", width:'90%', marginLeft:'5%'}}>Vous avez un souci ou avez remarqué un bug, veuillez vous exprimer</Text>


                        {
                            Object.keys(users).map((i, v)=>{
                                if(users[i].userId===currentUserId){

                                    if(users[i].chat){

                                        return(
                                            <FlatList key={v} data={users[i].chat}
                                            numColumns={1}
                              renderItem={({item})=>(
                                <View>
                                    <View style={{width:'80%', marginLeft:'19%', justifyContent:'center', borderBottomLeftRadius:20, borderTopLeftRadius:20, borderTopRightRadius:20, backgroundColor:isDarkTheme? 'rgba(100, 50, 50, 0.7)':'#322', minHeight:40}}>
                                        <Text style={{color:'white', width:'95%', marginLeft:'2.5%', textAlign:'center'}}>{item.message}</Text>
                                
                                    </View>
                                    <Text style={{fontSize:10, color:'#aaa', marginLeft:'48%',  width:'50%',marginBottom:"2%", marginTop:'1%', textAlign:'right'}}>{timeAgo.format(item.time-60*1000)==='il y a 1 minute'? "A l'instant":timeAgo.format(item.time-60*1000)}</Text>
                                 
                                </View>
                                    
                              )}
    
                              />
                                        )
                                    }
            
                                  }})
                        }





                    <View style={{width:'100%', position:'absolute', height:'8%', bottom:'0%', backgroundColor:isDarkTheme?'#444':'black',}}>
                        <View style={{width:"100%", height:'100%', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <TextInput onChangeText={(e)=>setMessage(e)} value={message} placeholder="saisir votre message" placeholderTextColor={'#aaa'} multiline style={{width:'86%', height:'86%', maxHeight:"100%", textAlign:'center', borderRadius:20, backgroundColor:isDarkTheme?'#ccc':'white'}}/>
                            <MaterialIcons onPress={send} name="send" size={36} color={"green"} />
                        </View>
                        
                    </View>
                </View>


            </View>

    */


    const Conversations=({navigation, route})=>{
        const [users, setUsers]=useState([])
        const [currentUserId, setCurrentUserId]=useState('')
    
        const [message, setMessage]=useState('')


        const send=()=>{
            if(!(!message)){

                const item={
                    message:message,
                    time:new Date().getTime(),
                    admin:true
                }

                const msg={
                    message:message,
                    time:new Date().getTime()
                }

                for(let x of users){
                    if(x.id===route.params.el.id){
                       if(x.chat){
                     //   for(let a of x.activities){
                            /*
                            if(a.id===item.id){

                                db.child(`users/${x.id}/activities`).set([...x.activities])
                                return false
                            }
                            */
                            //else{
                               console.log('message sent')
                               db.child(`users/${x.id}/chat`).set([...x.chat, item])
                        .then(()=>{
                         
                            ///turnOff()
                            //console.log('Message sent successfully')
                            if(x.messages){
                                db.child(`users/${x.id}/messages`).set([...x.messages, msg])
                                .then(()=>{
                                    console.log('Notification sent to the user')
                                })
                                .catch(e=>console.log(e))
                            }
                            else{
                                db.child(`users/${x.id}/messages`).set([msg])
                                .then(()=>{
                                    console.log('Notification sent to the user')
                                })
                            }
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
        //const [users, setUsers]=useState([])



    
        useEffect(()=>{
            db.child('users').on('value', (snapshot)=>{
                let update=[]
                snapshot.forEach((child)=>{
                    update.push({
                        id:child.key,
                        username:child.val().username,
                        chat:child.val().chat,
                        activities:child.val().activities,
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

        const [selected, setSelected]=useState(false)

        
        const onSelect=it=>{
            //if(item)
            

          for(let user of users){
            if(user.id===route.params.el.id){
              // for(let item of route.params.el){
                for(let item of [...user.chat]){
                    if(item===it){
                        console.log('goooo')
                        setSelected(true)
                    }
                }
            }
          }

                             
                            
                   
           
        }

        const cancelSelect=item=>{
            for(let user of users){
                if(user.id===route.params.el.id){
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

        const [elmt, setElmt]=useState('')

        const chanc=(item)=>{
            for(let user of users){
                if(user.id===route.params.el.id){
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

        
        const deleteMsg=item=>{

             for(let user of users){
                if(user.id===route.params.el.id){
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
              }
              
/*
            for(let x of users){
                if(x.userId===currentUserId){
        
                    let i=x.myCart.indexOf(item)
                    if(i!==-1){
                        x.myCart.splice(i, 1)
                       // dbRef.doc(x.id).update({myCart:[...x.myCart]})
                       db.child(`users/${x.id}/myCart`).set([...x.myCart])
                        .then(()=>{
                            
                            if(x.myCart.length<=0){
                                //dbRef.doc(x.id).update({myCart:''})
                                db.child(`users/${x.id}/myCart`).set([])
                            }
                            //setDeleted(true)
                            //turnOff()
                            
                      
                            
                        })
                        .catch((e)=>alert(e))
                            
                        }
        
                        else{
                            alert('Item non trouvé')
                        }
                    }
                }     */
        }
        

        for(let a of users){
            if(a.id===route.params.el.id){  
        return( 
            <View style={{backgroundColor:isDarkTheme? '#444':'black', flex:1, justifyContent:'flex-end' ,width:phoneWidth, height:phoneHeight}}>
                <View style={{width:'94%', position:'absolute', left:'3%', top:'3%', flexDirection:'row', justifyContent:'space-between'}}>
                    <AntDesign onPress={()=>navigation.navigate('List')} style={{color:isDarkTheme? '#ddd':'#bbb'}} name='back' size={30} />
                    <View style={{flexDirection:'row', justifyContent:'center'}}><Image source={a.pic? {uri:a.pic}:img} style={{width:34, height:34, borderRadius:64}} /><Text numberOfLines={1} ellipsizeMode="tail" style={{color:isDarkTheme? '#aaa':'#bbb', fontSize:18, marginLeft:'1%', fontFamily:'serif', letterSpacing:1}}> {a.username}</Text></View>  
                </View>

                <View style={{height:'90%', borderTopLeftRadius:20, borderTopRightRadius:20 ,justifyContent:'flex-start', backgroundColor:isDarkTheme? '#111':'#fff'}}>
                    <View style={{flexDirection:'row', width:'100%', zIndex:3, position:'absolute', top:'2%', height:"6%", justifyContent:'center', alignItems:'center'}}>
                        <View style={{justifyContent:'space-between', flexDirection:'row', width:'60%', borderBottomWidth:1, borderBottomColor:'#aaa', height:'100%'}}>
                            <MaterialIcons onPress={()=>Alert.alert(`Appeler ${a.phonenumber? a.phonenumber: a.username}`, 'Cette fonction est indisponible pour le moment')} name='call' size={26} color={isDarkTheme? "#aaa":"#322"} />
                            <MaterialIcons onPress={()=>{
                                Alert.alert(`Adresse de ${a.username}`, a.useradress? a.useradress:'Aucune adresse définie pour ce client')
                            }} name="location-pin" size={26} color={isDarkTheme?'#aaa':"#322"} />
                            <MaterialIcons name="delete" size={26} color={isDarkTheme?'#aaa':'#322'} />
                        </View>
                        
                    </View>
                    <View style={{marginTop:'16%', marginBottom:'14%'}}>
                    <FlatList data={[...a.chat].reverse()}
                    inverted
                                            numColumns={1}
                              renderItem={({item})=>(
                                item.admin===true?
                                <Pressable onLongPress={()=>chanc(item)}>

                                        {
                                            elmt===item?
                                            
                                                <Pressable onPress={()=>cancelSelect(item)}>
                                                   
                                <View style={{marginLeft:'18%', minWidth:'20%', flex:1 ,maxWidth:'80%', justifyContent:'center', borderBottomLeftRadius:6, borderTopLeftRadius:6, borderTopRightRadius:6, backgroundColor:isDarkTheme? 'darkblue':'darkblue', minHeight:50}}>
                                <Entypo onPress={()=>deleteMsg(item)} name="trash" size={24} color={'red'} style={{position:'absolute', left:'-15%'}} /><Text style={{color:isDarkTheme? '#aaa':'#aaa', width:'95%', marginLeft:'2.5%', textAlign:'left'}}>{item.message}</Text>
                        
                            </View>
                            </Pressable>:  <View style={{marginLeft:'18%', minWidth:'20%', flex:1 ,maxWidth:'80%', justifyContent:'center', borderBottomLeftRadius:6, borderTopLeftRadius:6, borderTopRightRadius:6, backgroundColor:isDarkTheme? 'rgba(100, 90, 90, 0.7)':'rgba(255, 240, 210, 0.8)', minHeight:50}}>
                                        <Text style={{color:isDarkTheme? '#aaa':'#111', width:'95%', marginLeft:'2.5%', textAlign:'left'}}>{item.message}</Text>
                                
                                    </View>
                                            
                                        }
                                   
                                      
                                    
                               
                                <Text style={{fontSize:10, color:'#aaa', marginLeft:'48%',  width:'50%',marginBottom:"2%", marginTop:'1%', textAlign:'right'}}>{timeAgo.format(item.time-60*1000)==='il y a 1 minute'? "A l'instant":timeAgo.format(item.time-60*1000)}</Text>
                             
                            </Pressable>
                                :
                                <Pressable onLongPress={()=>chanc(item)}>
                                    {
                                        elmt===item?
                                        <Pressable onPress={()=>cancelSelect(item)}>
                                        <View style={{ maxWidth:'80%', minWidth:"20%", display:'flex', marginLeft:'2%', justifyContent:'center', borderBottomRightRadius:6, borderTopRightRadius:6, borderTopLeftRadius:6, backgroundColor:isDarkTheme? 'darkred':'darkred', minHeight:50}}>
                                        <Entypo onPress={()=>deleteMsg(item)} name="trash" size={24} color={'red'} style={{position:'absolute', left:'107%'}} /><Text style={{color:isDarkTheme? '#aaa':'#aaa', width:'95%', marginLeft:'2.5%', textAlign:'left'}}>{item.message}</Text>
                                
                                    </View>
                                    </Pressable>
                                        :
                                        <View style={{ maxWidth:'80%', minWidth:"20%", display:'flex', marginLeft:'2%', justifyContent:'center', borderBottomRightRadius:6, borderTopRightRadius:6, borderTopLeftRadius:6, backgroundColor:isDarkTheme? 'rgba(50, 20, 10, 0.7)':'rgba(255, 225, 200, 0.8)', minHeight:50}}>
                                        <Text style={{color:isDarkTheme? '#aaa':'#111', width:'95%', marginLeft:'2.5%', textAlign:'left'}}>{item.message}</Text>
                                
                                    </View>
                                    }
                                   
                                    <Text style={{fontSize:10, color:'#aaa', marginLeft:'2%',  width:'50%',marginBottom:"2%", marginTop:'1%', textAlign:'left'}}>{timeAgo.format(item.time-60*1000)==='il y a 1 minute'? "A l'instant":timeAgo.format(item.time-60*1000)}</Text>
                                 
                                </Pressable>
                                    
                              )}
    
                              />
                              </View>
                </View>


                



                <View style={{width:'100%', position:'absolute', height:'8%', bottom:'0%', backgroundColor:isDarkTheme?'#444':'black',}}>
                        <View style={{width:"100%", height:'100%', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <TextInput onChangeText={(e)=>setMessage(e)} value={message} placeholder="saisir votre message" placeholderTextColor={'#aaa'} multiline style={{width:'86%', height:'86%', maxHeight:"100%", textAlign:'center', borderRadius:20, backgroundColor:isDarkTheme?'#ccc':'white'}}/>
                            <MaterialIcons onPress={send} name="send" size={36} color={"green"} />
                        </View>
                        
                    </View>
                </View>
        )
            }}
    }


    return(
        <NavigationContainer independent>
        <Stack.Navigator>
    
            <Stack.Screen name='List' component={List} options={{headerShown:false}}/>
            <Stack.Screen name='Conversation' component={Conversations} options={{headerShown:false}} />
          
          
        </Stack.Navigator>
    </NavigationContainer>
    )

}
export default Chat


const Style={
    main:{
        flex:1,
        flexDirection:'column',
        justifyContent:'flex-end',
        alignItems:'center',
        height:phoneHeight,
        width:phoneWidth
        
    },
    box:{
        width:'100%', height:'90%',  backgroundColor:'rgba(255, 255, 255, 0.9)', borderTopLeftRadius:20, borderTopRightRadius:20,
        flexDirection:'column',
      
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        position:'absolute',
        color:'#ddd',
        top:'3%',
        fontSize:20,
        letterSpacing:1,
        fontWeight:'bold',
        fontFamily:'fantasy'
    }
}

