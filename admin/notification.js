//notifications
import { useState, useEffect } from "react"
import { View, FlatList, Image, ScrollView, Text, Dimensions, TouchableOpacity, useColorScheme, ActivityIndicator } from "react-native"
import {firebase, db} from '../fbconfig'
import LinearGradient from "react-native-linear-gradient"
import { Pressable } from "react-native"
import TimeAgo from "javascript-time-ago"
import fr from 'javascript-time-ago/locale/fr.json'
import { Entypo, AntDesign, MaterialIcons } from "@expo/vector-icons"
import { NavigationContainer, useFocusEffect } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const phoneWidth=Dimensions.get('window').width
const phoneHeight=Dimensions.get('window').height
const Stack= createNativeStackNavigator()
const Notifications=()=>{
    const [orders, setOrders]=useState([])

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

    const Main=({navigation})=>{
        const [orders, setOrders]=useState([])
    const [deleting, setDelete]=useState(false)
    const deleteAll=()=>{
        setDelete(true)
       
                    db.child(`orders`).remove()
                        .then(()=>{
                            navigation.navigate('Accueil')
                            setDelete(false)
                    })
               
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
        db.child('orders').on('value', (snapshot)=>{
            let update=[]
            snapshot.forEach((child)=>{
                update.push({
                    id:child.key,
                    customerName:child.val().customerName,
                    customerNumber:child.val().customerNumber,
                    customerAdress:child.val().customerAdress,
                    customerPic:child.val().customerPic,
                    time:child.val().time,
                    itemCount:child.val().itemCount,
                    itemName:child.val().itemName,
                    itemImage:child.val().itemImage,
                    itemPrice:child.val().itemPrice
                })
            })  
            setOrders(update)
        })
    }, [])

    return(
        <LinearGradient start={{x:0, y:0}} end={{x:1, y:0}} colors={['black', 'black']} style={Style.main}>
             <Text style={Style.text}>Notification</Text>
            <View style={Style.box}>
                
                
                {
                    orders.length<=0?
                    <Text style={{color:'#444'}}>Aucune Notification</Text>:
                    
                            <View>
                                <View style={{flexDirection:'row', width:'100%', justifyContent:'space-evenly'}}>
                    <Text style={{color:'#222', fontSize:16}}><Entypo name='bell' size={24} color={"#311"} />{orders.length}</Text>
                    <Text onPress={deleteAll} style={{color:'#222', fontSize:16}}><Entypo name="trash" size={24} color={"#311"} />{deleting? <ActivityIndicator size={"small"} color={"#311"} />: 'Tout Supprimer'} </Text>
                </View>
                            <FlatList data={[...orders].reverse()}
                            
                            numColumns={1}
              renderItem={({item})=>(                                     
                <Pressable onPress={()=>navigation.navigate('OrderView', {el: item})}>
                <LinearGradient style={[...orders].reverse().indexOf(item)===[...orders].reverse().length-1? {justifyContent:'center', marginBottom:'0%', borderRadius:10, marginLeft:'2.5%', width:phoneWidth/1.05, height:140, borderColor:'#ddd'}:{justifyContent:'center',  borderRadius:10, marginLeft:'2.5%', width:phoneWidth/1.05, height:140, marginBottom:'1%', marginTop:'6%',  borderColor:'#ddd'} } colors={isDarkTheme? ['#444', '#111']: ['white', '#eee']} >
    

                <View style={{position:'absolute', top:'-9%', left:'1%', width:'40%', zIndex:3}}>
                    <View style={{width:'100%',  height:'100%', flexDirection:'row', justifyContent:'center'}}>
                        <Image source={{uri:item.customerPic}} style={{width:50, height:50, borderRadius:100}} />
                        
                    </View>
                   
                </View>
      
                <View style={{width:'100%', flexDirection:'row', alignItems:'center'}}>
               
                {item.itemImage? <Image source={{uri:item.itemImage}} style={{width:'40%', marginLeft:'1%', height:100, borderRadius:8, resizeMode:'contain'}} />:''}
                            
                           
                            <Text ellipsizeMode="tail" style={{marginLeft:'3%', color:'#aaa', letterSpacing:1, maxWidth:"42%", fontSize:16}} numberOfLines={1} >{item.itemName}</Text>
                                        
                            <Text style={{position:'absolute', right:'3%', fontSize:22, color:isDarkTheme? '#bbb': '#444', fontWeight:'bold'}}>{item.itemPrice*item.itemCount}$</Text>
                            <Text style={{position:'absolute', bottom:'0%', left:'44%', color:'#aaa'}}>Commande {item.itemCount>1? `de ${item.itemCount} pièces`:''}</Text>
                            <Text style={{color:'#aaa', fontSize:12, position:'absolute', top:'0%', left:'44%'}} >{timeAgo.format(item.time-60*1000)==='il y a 1 minute'? "A l'instant":timeAgo.format(item.time-60*1000)}</Text>
                  
            </View>
        
            
            </LinearGradient>
            </Pressable>

              )}/></View>
                        

}
           
                  
                
            </View>
           
        </LinearGradient>
    )

}

    const OrderView=({navigation, route})=>{
        const [orders, setOrders]=useState([])
        useEffect(()=>{
            db.child('orders').on('value', (snapshot)=>{
                let update=[]
                snapshot.forEach((child)=>{
                    update.push({
                        id:child.key,
                        customerName:child.val().customerName,
                        customerNumber:child.val().customerNumber,
                        customerAdress:child.val().customerAdress,
                        customerPic:child.val().customerPic,
                        time:child.val().time,
                        itemCount:child.val().itemCount,
                        itemName:child.val().itemName,
                        itemImage:child.val().itemImage,
                        itemPrice:child.val().itemPrice
                    })
                })  
                setOrders(update)
            })
        }, [])

        for(let a of orders){
            if(a.id===route.params.el.id){            
                return(
                                     
                    <LinearGradient start={{x:0, y:0}} end={{x:1, y:0}} colors={isDarkTheme?['#444', '#444']: ['black', '#111']} style={Styles.articleDetail}>
                    <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.itemtitle}>{a.itemName} </Text>
                    <TouchableOpacity style={Styles.back}>
                        <AntDesign onPress={()=>{navigation.navigate('Main');}} name='back' size={34} color={isDarkTheme? '#eee':'white'}  />
                    </TouchableOpacity>
            
                            
                    <View style={{flexDirection:'row',   borderTopLeftRadius:20, borderTopRightRadius:20, backgroundColor: isDarkTheme? '#111':'rgba(255,255,255, 0.99)', justifyContent:'space-between', alignContent:'space-between', alignItems:'stretch',width:'100%', height:'90%',}}>
                        
             
                    <ScrollView>
                    
                        <View  style={{flexDirection:'column', marginTop:20, marginBottom:'20%',}}>
                        <Text style={Styles.time}>{timeAgo.format(a.time-60*1000)==='il y a 1 minute'? "A l'instant":timeAgo.format(a.time-60*1000)}</Text>
                            
                        <View style={{flexDirection:'column', justifyContent:'space-evenly', alignItems:'center'}}>
                            <Image source={{uri:a.customerPic}} style={{width:80, height:80, borderRadius:160}} />
                            <Text style={{color:isDarkTheme? '#aaa':'#444', fontWeight:'bold'}}>{a.customerName} a commandé</Text>
                        </View>  

                        <Image source={{uri:a.itemImage}} style={{width:'90%', marginTop:'2%', height:phoneHeight/2.3, marginLeft:'5%'}} />
                  
                    <Text style={{ color:isDarkTheme? '#aaa':'#222', fontSize:24, fontWeight:'700', marginLeft:'5%', }}><Text style={{color:'orangered'}}>$</Text> {a.itemPrice*a.itemCount}
                    </Text>


                        
                            <Text style={{marginLeft:'5%', marginTop:'3%', color:isDarkTheme? '#aaa':'#aaa' }}>Nombre d'article commandé: {a.itemCount}</Text>

                            <Text style={{marginLeft:'5%', fontWeight:'bold', fontSize:25, marginTop:'3%', marginBottom:'3%', color:'#aaa'}}>Coordonnées du client</Text> 
                            <Text style={{marginLeft:'5%', fontSize:16, color:'#666'}}><MaterialIcons name='call' size={24} /> {a.customerNumber}</Text>  
                            <Text style={{marginLeft:'5%', fontSize:16, color:'#666', marginBottom:'2%'}}><MaterialIcons name='location-pin' size={24} /> {a.customerAdress}</Text>                                   

                        </View>
                    </ScrollView>
                    </View>
                   
                </LinearGradient>
                    
                                     
                                )
    
            }
        }   

    }

    return(
        <NavigationContainer independent>
    <Stack.Navigator>

        <Stack.Screen name='Main' component={Main} options={{headerShown:false}}/>
        <Stack.Screen name='OrderView' component={OrderView} options={{headerShown:false}} />
      
      
    </Stack.Navigator>
</NavigationContainer>
    )


}
export default Notifications

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
