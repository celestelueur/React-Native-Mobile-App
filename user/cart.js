import { View, Text, TouchableOpacity, useColorScheme, Dimensions, StyleSheet, Pressable, FlatList, ScrollView, Image, Button, ActivityIndicator } from "react-native"
import {firebase, db} from '../fbconfig'
import { useState, useEffect, useCallback } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { Entypo, Fontisto, Ionicons } from "@expo/vector-icons"
import LinearGradient from "react-native-linear-gradient"
import * as Animatable from 'react-native-animatable'
//import {  } from "react-native-gesture-handler"
const phoneWidth=Dimensions.get('window').width
const phoneHeight=Dimensions.get('window').height
//create
const Cart=({navigation})=>{
    const theme=useColorScheme()
    const isDarkTheme=theme==="dark"

    const Style={
        main:{
            flex:1,
            display:'flex',
            flexDirection:'column',
            justifyContent:'flex-end',
            backgroundColor:'black',
           
            height:phoneHeight,
            width:phoneWidth,
            zIndex:-1
        },
        box:{
            width:phoneWidth, height:'78%',  backgroundColor:isDarkTheme? '#111':'rgba(255,255, 255,0.9)', borderTopLeftRadius:20, borderTopRightRadius:20,
            flexDirection:'column',
            justifyContent:'flex-end',
            alignItems:'center'
        },
        text:{
            color:'white',
            fontSize:20,
            letterSpacing:2,
            fontWeight:'bold',
            fontFamily:'fantasy'
        },
        el:{
            width:phoneWidth,
            textAlign:'center',
            alignItems:'center',
            backgroundColor:isDarkTheme? '#111':'#fff',
            height:'100%',
            flexDirection:'column',
            justifyContent:'center',
        },
        content:{
            width:phoneWidth,
            justifyContent:'space-evenly',
            alignItems:'center',
            textAlign:'center',
            //borderWidth:1,
            borderTopLeftRadius:20, borderTopRightRadius:20,
            borderColor:'#222',
         
            backgroundColor:isDarkTheme?'#111':'#eee',
            flexDirection:'row',
            zIndex:-1
        },
        itemName:{
            fontSize:20,
            fontFamily:'Sans-serif',
            width:phoneWidth/2.02,
    
            marginLeft:'1%',
            color:'#aaa',
           
        },
        itemPrice:{
            fontWeight:'bold',
            fontSize:22,
            color:isDarkTheme?'#aaa':'#222',
            marginLeft:'1%',
        },
        itemDescription:{
            fontSize:16,
            marginBottom:'3%',
            color:'#aaa',
            marginLeft:'1%',
        },
        deleteFromCart:{
            width:200,
            backgroundColor:'#000',
            justifyContent:'center',
            alignItems:'center',
            borderRadius:10,
            height:60,
            flexDirection:'row',
            marginBottom:'2%',
           
        }
        ,
        finalizeaction:{
            width:200,
            backgroundColor:'darkred',
            justifyContent:'center',
            alignItems:'center',
            borderRadius:10,
            height:60,
            
            flexDirection:'row',
        },
        proceed:{
            backgroundColor:isDarkTheme? '#444':'white',
            width:phoneWidth,
            height:'12%',
            justifyContent:'center',
            alignItems:'center',
        },
        proceedBuy:{
            width:'90%',
            height:'70%',
            flexDirection:'row',
            backgroundColor:'black',
            justifyContent:'space-around',
            alignItems: 'center',
            borderRadius:10,
       
        }
    }
    


    const [users, setUsers]=useState([])
    const [currentUserId, setCurrentUserId]=useState('')
    const [allPrice, setPrices]=useState([])
    const [cartPrice, setCartPrice]=useState(0)
    const [buying, setBuy]=useState(false)
    const [itemBuy, setItemBuy]=useState({})
    const [totalPrice, setTotalPrice]=useState(0)

    const [offers, setOffers]=useState([])

    ///const [articleCount, setArticleCount]=useState(1)

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

   const buyItem=item=>{
    setBuy(true)
    hideTabBar()
    setItemBuy(item)
}

const cancelBuy=()=>{
    showTabBar()
    setBuy(false)
}

//

   const BuyItem=()=>{

    return(
        <Animatable.View animation='bounceInUp' iterationCount={1} style={{width:'96%', borderRadius:10, zIndex:1, position:'absolute', height:'80%', top:'12%', backgroundColor:'rgba(0,0,0,0.9)'}}>
            <View style={{flexDirection:'column', alignItems:'center', justifyContent:'space-between'}}>
                <Text ellipsizeMode="tail" numberOfLines={1} style={{color:'#ddd', fontWeight:'bold', letterSpacing:1, fontSize:18}}>{itemBuy.name}</Text>
                <TouchableOpacity style={{width:'60%', marginTop:'5%', backgroundColor:'white', height:'14%', alignItems:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:20, color:'black'}}><Entypo name='shopping-bag' color='#444' size={24} /> Commander</Text>
                </TouchableOpacity>

                <Text style={{color:'#bbb', fontSize:16, textAlign:'center'}}>Lorsque vous commandez seulement, vous ne paierez qu'à la livraison</Text>
              
                <LinearGradient start={{x:0, y:0}} end={{x:1, y:1}} colors={['seagreen', '#1589FF']} style={{width:'60%',marginTop:'3%',  backgroundColor:'blue', height:'18%', alignItems:'center', justifyContent:'center'}}>
                    <TouchableOpacity >
                        <Text style={{fontSize:20, color:'white'}}><Entypo name="shopping-cart" color='#ddd' size={24} /> Acheter en ligne</Text>
                    </TouchableOpacity>
                </LinearGradient>
               
                
                <Text style={{color:'#bbb', fontSize:16, textAlign:'center'}}>Acheter directement avec une carte Visa ou Mastercard</Text>
               

                <TouchableOpacity onPress={cancelBuy} style={{width:'60%',marginTop:'10%', backgroundColor:'black', height:'18%', alignItems:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:20, color:'white'}}>Annuler</Text>
                </TouchableOpacity>
            </View>
            
        </Animatable.View>
    )

   }




   const deleteItemFromCart=item=>{
    
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
        }     
    
   }


/*
   useEffect(()=>{

        for(let x of users){
            if(x.userId===currentUserId){
                for(let el of x.myCart){
                    
                    Object.keys(offers).map((v,k)=>{
                        let i=x.myCart.indexOf(el)
                        if(offers[v].id===el.id){
                            if(offers[v].quantity!==el.quantity){
                            db.child(`users/${x.id}/myCart/${i}/quantity`).set(offers[v].quantity)
                        }
                    }
                })
            }
        }
    }

   }, [])
   */
   

   //auto delete an article when it's sold out
   useEffect(()=>{

    for(let x of users){
        if(x.userId===currentUserId){

            let arr=[]
            for(let el of x.myCart){


                for(let a of offers){
                    if(a.id===el.id){
                        if(a.quantity<1){
                            let i=x.myCart.indexOf(el)
                            if(i!==-1){
                                x.myCart.splice(i, 1)
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
                        }
                    }
                }

            }

            

            }
            
        }     
   }, [])

  /*
  


   */
  const [adding, setAdding]=useState(false)
  const [array, setArray]=useState('')

  const addOne=item=>{
    setArray(item.id)
    for(let x of users){
        if(x.userId===currentUserId){
                for(let one of x.myCart){
                    if(one.id===item.id){
                        for(let a of offers){
                            if(a.id===item.id){
                                let i=x.myCart.indexOf(item);
                                if(i!==-1){
                                    db.child(`users/${x.id}/myCart/${i}/count`).set(item.count>=a.quantity? item.count=a.quantity:item.count+1)
                                    .then(()=>{
                                        setArray('')
                                    })
                                }

                            }
                        }
                

                    
                    }
                }
           
            }
        }     
  }

  const removeOne=item=>{
    setArray(item.id)
    for(let x of users){
        if(x.userId===currentUserId){
                for(let one of x.myCart){
                    if(one.id===item.id){
                      //  setAdding(true)
                        let i=x.myCart.indexOf(item);
                        if(i!==-1){
                            db.child(`users/${x.id}/myCart/${i}/count`).set(item.count<=1? item.count=1:item.count-1)
                            .then(()=>{
                                setArray('')
                            })
                        }
                    }
                }
            }
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


    return(
        <LinearGradient start={{x: 1, y:0}} end={{x:0, y:1}} colors={isDarkTheme? ['#444', '#444']: ['black', 'black']} style={Style.main}>

             <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', left:"2%", position:'absolute', top:"3%"}}>
                    <Entypo name="shopping-cart" size={28} color='white' />
                    <Text style={Style.text}>Mon Panier</Text>
              </View>
            
             <View style={Style.box}>

                {
                    buying?
                    <BuyItem />:''
                }
            
             
             {
                Object.keys(users).map((i, v)=>{
                    let cart=users[i].myCart
                   if(users[i].userId===currentUserId){
                    if(users[i].myCart){
                    if(users[i].myCart.length>0){
                        return(
                            <View key={v}> 
                                <View style={{flexDirection:'row',justifyContent: 'center'}}>

                                   
                                    
                                    <Entypo name="shopping-cart" size={24} color={isDarkTheme? '#ddd':'#444'} />
                                    <Text style={{fontSize:20, marginTop:'2%', color:isDarkTheme? '#ddd':'#333'}}>{users[i].myCart.length}</Text>
                                </View>
                                
                            <FlatList data={[...users[i].myCart].reverse()}
                            
                            numColumns={1}
              renderItem={({item})=>(
                <View key={item.id} style={Style.content}>
                <Pressable>


                    <LinearGradient colors={isDarkTheme? ['#444', "#111"]:['white', '#eee']} >
                       
                            <View key={item.id+item.name} style={{ borderBottomColor:isDarkTheme? '#111':'#ddd' ,flexDirection:'row', marginLeft:5, width:phoneWidth, height:120, alignItems:'center'}}>
                                <Image source={{uri:item.url}} style={{width:80, marginBottom:'2%', resizeMode:'stretch' ,height:80, borderRadius:20 ,alignItems:'center'}} />
                                <View style={{flexDirection:'column', marginLeft:'3%'}} >
                                <Text ellipsizeMode="tail" numberOfLines={1} style={Style.itemName}>{item.name}</Text>
                                <Text style={Style.itemPrice}>{item.price*item.count}$</Text>
                            </View>
                                
                                <View style={{left:'55%', width:"20%", position:'absolute'}}>
                                    <View style={{flexDirection:'column', alignItems:'center', width:"100%", justifyContent:'center'}}>
                                        <Text onPress={()=>addOne(item)} style={{left:'65%', color:isDarkTheme? 'red':'#333', textAlign:'center'}}><Ionicons name='add' size={24} color={isDarkTheme? '#ccc':'black'} /></Text>
                                       
                                       {
                                        item.id===array?
                                         
                                            <ActivityIndicator style={{left:'65%', color:'#333', fontSize:14, textAlign:'center'}} color={isDarkTheme?'#aaa': 'black'}/>
                                             :                                      
                                            <Text style={{left:'65%',color:'#aaa', fontSize:14, textAlign:'center'}}>{item.count}/{
                                                Object.keys(offers).map((x, y)=>{
                                                    if(offers[x].id===item.id){
                                                       // if(offers[x].quantity<1){
                                                        return offers[x].quantity
                                                        //}
                                                    }
                                                })
                                                }</Text>
                                       }
                                        <Text onPress={()=>removeOne(item)} style={{left:'65%', color:isDarkTheme? 'red': '#333', textAlign:'center'}}><Ionicons name='remove' size={24} color={isDarkTheme? '#ccc':'black'} /></Text>
                                    </View>
                                </View>
                               
                                <Text style={{left:'85%', position:'absolute'}} onPress={()=>deleteItemFromCart(item)} ><Entypo name="trash" color={isDarkTheme? '#ddd':'black'} size={24} /></Text>
                                   
                            </View>                  
                              
                            </LinearGradient></Pressable>
               
                </View>
                    
              )} /></View>
                        )               
                        
                    }
                    else{
                        return(
                           
                            <Text key={0} style={{justifyContent:'center',  position:'absolute', top:'30%', left:'40%'}}>Panier Vide</Text>
                       
                    )
                    }
                }
                    else{
                        return(
                           
                                <Text key={0} style={{justifyContent:'center',  position:'absolute', top:'30%', left:'40%'}}>Panier Vide</Text>
                           
                        )
                    }
                    
                   }
                })
             }
             
            </View>



                {
                     Object.keys(users).map((i, v)=>{
                        let cart=users[i].myCart
                       if(users[i].userId===currentUserId){
                        if(users[i].myCart){
                            let res=0
                            let arr=[]
                            
                            users.map((user)=>{
                                if(user.userId===currentUserId){
                                    if(user.myCart.length>0){
                                       [...user.myCart].map((el)=>{
                                            arr=[...arr, el.price*el.count]
                                            //let res=
                                            res=arr.reduce((a,b)=>{return Number(a)+Number(b)})
                                        })
                                    }
                                }
                            })
                            return(
                                <View key={v} style={Style.proceed}>

                                <TouchableOpacity style={Style.proceedBuy}>
                                    <Text style={{color:'white', fontSize:18, letterSpacing:1, justifyContent:'center'}}>Procéder <Fontisto name='opencart' size={22} color='white' /></Text>
                                    <Text style={{color:'white', fontSize:22, letterSpacing:1, justifyContent:'center'}}>|</Text>
                                    <Text style={{fontWeight:'bold', color:'white', fontWeight:'bold', fontSize:23}}><Text style={{fontSize:14, color:'white', fontWeight:'normal'}}>total: </Text>{res} $</Text>
                                </TouchableOpacity>
                                </View>
                            )

                        }
                    }
                })
                }

        </LinearGradient>
    )


}
export default Cart


