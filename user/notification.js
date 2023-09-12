//Notfication
import {firebase, db} from '../fbconfig'
import { useState, useEffect, useRef } from "react"
import { Entypo, AntDesign, MaterialIcons, Ionicons, Feather, FontAwesome, Fontisto, FontAwesome5 } from "@expo/vector-icons"
//import { Entypo } from "@expo/vector-icons"
import * as Animatable from 'react-native-animatable'
import { View, Alert, Text, Dimensions, FlatList, useColorScheme, Pressable, Image, Animated, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native"
import LinearGradient from 'react-native-linear-gradient'
import MC from '../img/mc.png'
import Visa from '../img/visa.png'
import { NavigationContainer, useFocusEffect } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ExpandingDot } from 'react-native-animated-pagination-dots';
import fr from 'javascript-time-ago/locale/fr.json'
import { useCallback } from "react"
//import LinearGradient from "react-native-linear-gradient"
import TimeAgo from "javascript-time-ago"

const Stack= createNativeStackNavigator()
const Notification=({navigation})=>{

    const theme=useColorScheme()
    const isDarkTheme=theme==="dark"

    const Styles={
        main:{
            flex:1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
           
            width:phoneWidth,
            height:phoneHeight,
            backgroundColor:isDarkTheme? '#444':"#000",
            display:'flex',
            zIndex:-1
        },
        div:{
            flexDirection: 'column',
            alignItems: 'center',
            height:'90%',
            backgroundColor:isDarkTheme? '#111':'#eee',
            borderTopLeftRadius:20, borderTopRightRadius:20,
            justifyContent:'center',
                    
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
            ,color:isDarkTheme? '#aaa':'#444'
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
            color: isDarkTheme? '#aaa':'#444'
    
        },
        itemtitle:{
            fontFamily:'fantasy',
            justifyContent:'space-around',
            fontSize:18,
            position:'absolute',
            textAlign:'center',
            fontWeight:'bold',
            top:"3%",
            width:'80%',
            color:isDarkTheme?'#aaa': 'white'
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
        back:{
            // backgroundColor:'black',
             top:"2.5%",
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
    }
    const [cart, setCart]=useState([])

    TimeAgo.addLocale(fr)
    const timeAgo=new TimeAgo('fr-FR')
    const [offers, setOffers]=useState([])
    const [users, setUsers] = useState([])
   // const userRef=firebase.firestore().collection('users')
    const [currentUserId, setCurrentUserId] = useState('')

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

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((x)=>{
            if(x){
                setCurrentUserId(x.uid)
            }
            //setCurrentUserId(x.uid)
        })
    }, [])

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
   const [cartItem, setCartItem] = useState(false)
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


    const UserOfferView=({navigation, route})=>{
        
    const [users, setUsers] = useState([])
    const [currentUserId, setCurrentUserId] = useState('')
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
                    activities:child.val().activities,
                    pwd:child.val().pwd,
                    useradress:child.val().useradress,
                    phonenumber:child.val().phonenumber,
                    pic:child.val().pic
                })
            })  
            setUsers(update)
        })
    }, [])


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
                                    <LinearGradient start={{x:0, y:0}} end={{x:1, y:1}} colors={['black', '#222']} style={Styles.finalAction}>
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
   
        for(let a of offers){
            if(a.id===route.params.el.id){            
                return(
                                     
                    <LinearGradient start={{x:0, y:0}} end={{x:1, y:0}} colors={isDarkTheme?['#444', '#444']: ['black', '#111']} style={Styles.articleDetail}>
                    <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.itemtitle}>{a.name} {a.category==='Promo'? <Fontisto name="shopping-sale" color="red" size={24} />:''} {a.category==='Promo'? <Text style={{fontSize:14, color:isDarkTheme? '#eee':'#444', textAlign:'center'}}>-{100-(a.promoPrice*100/a.price).toPrecision(2)}%</Text>:''}</Text>
                    <TouchableOpacity style={Styles.back}>
                        <Ionicons onPress={()=>{navigation.navigate('Main');}} name='arrow-back' size={34} color={isDarkTheme? '#eee':'white'}  />
                    </TouchableOpacity>
            
                            
                    <View style={{flexDirection:'row',   borderTopLeftRadius:20, borderTopRightRadius:20, backgroundColor: isDarkTheme? '#111':'rgba(255,255,255, 0.89)', justifyContent:'space-between', alignContent:'space-between', alignItems:'stretch',width:'100%', height:'90%',}}>
                    
             
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
                                    </View>:
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
                         .catch(err=>{alert(err);})
                     }
                    }
                   ,
                {
                    text:'Non',
                    onPress:()=>setOrdered(false)
                }
            ])    
        }

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
                        
                        <Text style={{fontSize:20, color:'white', fontWeight:'700', letterSpacing:2}}><FontAwesome name='opencart' color='#fff' size={24} /> {x.category==="Promo"? x.promoPrice*articleCount:x.price*articleCount} $</Text>
                       
                    </TouchableOpacity>
                  
                </LinearGradient>
                <View style={{flexDirection:'row', width:'80%', justifyContent:'space-evenly', alignItems:'center',marginTop:'-8%'}}>
                <LinearGradient colors={['orangered', "darkorange"]} style={{width:phoneWidth/3, height:phoneHeight/15, backgroundColor:'orangered', borderRadius:10, justifyContent:'center', alignItems:'center', borderColor:10}}>
                            <Text style={{color:'white', textAlign:'center'}}>Visa</Text>
                       </LinearGradient>

                       <LinearGradient colors={['orangered', "darkorange"]} style={{width:phoneWidth/3, height:phoneHeight/15, backgroundColor:'orangered', borderRadius:10, justifyContent:'center', alignItems:'center', borderColor:10}}>
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


    const Main=({navigation})=>{


    const count=()=>{
        let arr=[]
        for(let a of offers){
            if(a.category==="Promo"){
                arr=[...arr, a]
            }
        }
        return arr.length
    }



    return(
        <View style={Styles.main}>
            <Text style={{color:'#eee', position:'absolute', fontSize:20,
        letterSpacing:2,
        fontWeight:'bold',
        fontFamily:'fantasy', textAlign:'center', top:'3%'}}><MaterialIcons name="local-offer" size={24} color="#eee" /> Offres<View style={{justifyContent:'center', alignItems:'center', backgroundColor:'red', width:20, height:20, borderRadius:40,}}><Text style={{color:'white',  fontSize:12}}>{count()}</Text></View></Text>
           



            {!offers.length>0 ?  <View style={Styles.div}>
                <Text>Aucune Notification</Text>
            </View>:<View style={Styles.div}>
               
                <FlatList
                 
    data={[...offers].reverse()}
    numColumns={2}
    style={{marginTop:'5%', width:phoneWidth}}
    renderItem={({item})=>(
    <Pressable onPress={()=>navigation.navigate('UserView', {el: item})}>
    {
            item.category==="Promo"?
     <LinearGradient colors={isDarkTheme? ['#444', '#111']: ['white', '#eee']} style={{justifyContent:'center',  borderRadius:10, marginLeft:'2.5%', width:phoneWidth/1.05, height:140, marginBottom:'1%',  borderColor:'#ddd'}}>
    
      
            <View style={{width:'100%', flexDirection:'row', alignItems:'center'}}>
           
            {item.imgurl? <Image source={{uri:item.imgurl[0]}} style={{width:'40%', marginLeft:'1%', height:100, borderRadius:8, resizeMode:'contain'}} />:''}
                        
                        {
                            item.category==='Promo'?
                            <Animatable.View style={{backgroundColor:'red', position:'absolute', width:50, height:50, left:'1%', bottom:'5%', borderRadius:100}} animation="bounce" iterationCount='infinite' duration={1000}>
                                <View style={{width:"100%", height:'100%', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                    <Text style={{color:'white', fontWeight:'bold', fontSize:14}}>-{100-(item.promoPrice*100/item.price).toPrecision(2)}%</Text>
                                 
                                </View>
                                
                            </Animatable.View>
                                :''
                           }
                        <Text ellipsizeMode="tail" style={{marginLeft:'3%', color:'#aaa', letterSpacing:1, maxWidth:"56%", fontSize:16}} numberOfLines={1} >{item.name}</Text>
                        {
                            item.category==='Promo'?
                            <Text style={{ color:isDarkTheme? '#ccc':'#222', position:'absolute', bottom:"1%", right:'1%', fontSize:22, fontWeight:'700', textAlign:'left', marginLeft:'10%', }}><Text style={{color:'orangered', fontSize:14}}>$</Text> <Text style={{textDecorationLine:'line-through', color:'#aaa', fontSize:14}}> {item.price} </Text><Entypo name='price-tag' size={24} color={"#aaa"} /> <Animatable.Text iterationCount="infinite" duration={1000} animation="bounce"> {item.promoPrice}</Animatable.Text><Text style={{color:'orangered'}}> $</Text></Text>:
                            <Text style={{ color:'#222', fontSize:22, fontWeight:'700', textAlign:'left', marginLeft:'10%', }}><Text style={{color:'orangered'}}>$</Text> {item.price}</Text>


                        }

                       
                     
    </View>
    
    
    

    
    </LinearGradient>:""}
    
    
    
    </Pressable>
    )} />
    </View>
    
    
    
    } 

        </View>
    )


}


return(
    <NavigationContainer independent>
    <Stack.Navigator>

        <Stack.Screen name='Main' component={Main} options={{headerShown:false}}/>
        <Stack.Screen name='UserView' component={UserOfferView} options={{headerShown:false}} />
        <Stack.Screen name='BuyItem' component={BuyItem} options={{headerShown:false}} />
      
    </Stack.Navigator>
</NavigationContainer>
)





}
export default Notification

const phoneWidth=Dimensions.get('window').width
const phoneHeight=Dimensions.get('window').height
