//admin home

import { useEffect, useRef, useState } from "react"
import { useCallback } from "react"
import {View, Image, TouchableOpacity, Text, ScrollView, FlatList,useColorScheme, Pressable, ActivityIndicator, TextInput, Dimensions, Alert, Share, Animated  } from "react-native"
//import {firebase} from '../fbconfig'
import {Entypo, AntDesign, MaterialIcons, Ionicons, Foundation, Fontisto} from '@expo/vector-icons'
import LinearGradient from "react-native-linear-gradient"
import {firebase, db} from '../fbconfig'
import RNRestart from 'react-native-restart'
import AsyncStorage from "@react-native-async-storage/async-storage"
import fr from 'javascript-time-ago/locale/fr.json'
import TimeAgo from "javascript-time-ago"
import { ExpandingDot } from 'react-native-animated-pagination-dots';
import * as Animatable from 'react-native-animatable'

//phone width and height dimension
const phoneWidth=Dimensions.get('window').width
const phoneHeight=Dimensions.get('window').height
const AdminHome=({navigation})=>{
    const theme=useColorScheme()
    const isDarkTheme=theme==="dark"

    //style
    const Styles={
        main:{
            flex:1,
            flexDirection:'column',
            backgroundColor:'#fff',
            paddingTop:20,   
        }
        ,
        pageHead1:{
            textAlign:'center',
            color:'#444',
            alignItems: 'center',
            fontSize:18,
            justifyContent:'center',
            marginTop:"10%",
            letterSpacing:1,
            fontFamily:'fantasy',
            fontWeight:'bold'
        },
        pageHead2:{
            textAlign:'center',
            color:'#444',
            alignItems: 'center',
            fontSize:18,
            justifyContent:'center',
            marginTop:"10%",
            letterSpacing:1,
            fontFamily:'fantasy',
            fontWeight:'bold'
        },
        pageHead3:{
            textAlign:'center',
            color:'#444',
            alignItems: 'center',
            fontSize:18,
            justifyContent:'center',
            marginTop:"10%",
            letterSpacing:1,
            fontFamily:'fantasy',
            fontWeight:'bold'
        },
        time:{
            //position:'absolute',
            left:'5%',
            color:'#333'
        },
        ico:{
            justifyContent:'space-evenly', 
            alignItems:'center',
            flexDirection:'column',
            //borderColor:'rgba(0,0,0,0.1)',
            borderWidth:2,
            borderColor:'#444',
            width:'30%',
            borderRadius:20,
            marginTop:'2%'
        }
        ,listTxt:{
            fontSize:14,
            color:'#555',
            letterSpacing:1,
            
            fontFamily:'fantasy',
            fontWeight:'bold',
            marginLeft:"10%",
        },
        pageHeadBlur:{
            borderTopWidth:3,
            borderTopColor:'rgba(0,0,0,0.1)'
        },
        adminPanel:{
            display:'flex',
            flexDirection:'column',
            width:"90%",
            borderWidth:0,
            
            shadowOffset:{
                width:3, height:2
            },
            shadowColor:'black',
            shadowOpacity:0.4,
            shadowRadius:4,
            elevation:10,
            justifyContent:'flex-start',
            alignItems:'flex-start',
            alignContent:'flex-start',
            position:'absolute',
            height:phoneHeight,
            zIndex:111,
           // backgroundColor:'orangered',
            left:"10%",
            top:0
        }
        ,
        tab:{
           width:phoneWidth,
           textAlign:'center',
           alignItems:'center',
           flexDirection:'column',
          backgroundColor:'#fff',
           height:'100%',
          // flexDirection:'row',
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
            zIndex:111111,
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
            width:'100%',
           // height:"30%",
            flex:1,
            position:'absolute',
            flexDirection:'row',
            top:0,
            zIndex:282827272,
            justifyContent:'center',
            alignItems:'flex-start',    
        },
        articleDetail:{
            height:phoneHeight,
            width:phoneWidth,
            position:'absolute',
            zIndex:22,
            flexDirection:'column',
            justifyContent:'flex-end',
            alignItems:'center', 
        },
        search:{
            borderWidth:2,
            textAlign:'center',
            borderRadius:50,
            backgroundColor:'transparent',
            borderColor:'darkgrey',
            width:'80%',
    
        },
        /*
        itemtitle:{
            fontFamily:'fantasy',
            justifyContent:'space-around',
            fontSize:22,
            position:'absolute',
            textAlign:'center',
            fontWeight:'bold',
            top:"2%",
            color:'#ddd'
        },*/
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
            fontFamily:'serif',
            justifyContent:'space-around',
            textAlign:'left',
            fontFamily:'courier neue',
            marginTop:'1%',
            marginLeft:'5%'
            ,color:'#444'
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
            color:'#444'
    
        },
        prix:{
            fontSize:24,
            textAlign:'left',
            fontWeight:'bold',
            marginLeft:'5%',color:'#111'
    
        }
        ,
        back:{
           // backgroundColor:'black',
            top:"1%",
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
            color:'white',
            fontSize:18,
            bottom:'1%',
            left:"1%",
            zIndex:33399,
            position:'absolute',
        }
    }
    
    //
    TimeAgo.addLocale(fr)
    const timeAgo=new TimeAgo('fr-FR')
    const [offers, setOffers]=useState([])
   
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

   const [searching, setSearch]=useState('')
    const [adminpanel, checkAdmin]=useState(false)
    let finalsearch=searching.toLowerCase()

    //see detail of a article
    const [seen, setSee]=useState(false)
    const [current, setCurrent]=useState()
    const seeIt=x=>{
     for(let a of offers){
         if(a.id===x){
             setSee(!seen)
             setCurrent(a)
         }
     }   
    }

    //

    //close the detail tab
    const close=()=>{
        setSee(!seen)

    }
    //check whether the home component is open
    const [home, setHome]=useState(true)
    useEffect(()=>{
     seen? setHome(false):setHome(true)
    })
   
   //When then menu tab is open, clicking the add button leads to the add page
    const goAdd=()=>{
        navigation.navigate('Ajouter')
        adminpanel? checkAdmin(!adminpanel):''
    }


    

const scroll=useRef(new Animated.Value(0)).current

    
const renderItem=useCallback(({item})=>{

    return(
      <View style={{width:phoneWidth}}>
        <Image style={{marginTop:20, width:phoneWidth*0.9, height:phoneHeight/2.3, marginLeft:'5%', resizeMode:'contain'}} source={{uri:item}} />
      </View>
    )
  })

    

    const clearData=async()=>{
        try{
            const keys=await AsyncStorage.getAllKeys()
            await AsyncStorage.multiRemove(keys)
        }
        catch(err){
            console.log(err)
        }
    }

    const logout=()=>{
       
            AsyncStorage.getAllKeys()
                            .then(keys=>AsyncStorage.multiRemove(keys))
                            .then(()=>{
                                firebase.auth().signOut()
                                .then(()=>{
                                    navigation.navigate("Login")
                                    RNRestart.restart()
                                })
                                .catch((e)=>console.log(e))
                            })
        
        
    }

    //this function deletes the selected data
    const deleteOne=x=>{
        Alert.alert('Etes-vous sûre?', "Voulez-vous vraiment supprimer cet article?", [
            {
                text:"Oui",
                onPress:()=> db.child(`products/${x}`).remove()
                .then(()=>{
                  // Alert.alert('Réussi','Effacé avec succès')
                   seen? setSee(!seen):seen
                })
                .catch(err=>alert(err))
            },
            {
                text:'Non'
            }
        ])    
    }


    const CategoryOne=()=>{
        
        return(
            <View>
                <Text style={Styles.pageHead3}> <Entypo name='app-store' size={24} /> iPhone</Text>


                <View style={{marginBottom:'20%', marginTop:'10%'}}> 

{!offers.length>0 ? <View style={{flexDirection:'column' ,justifyContent:'space-evenly', alignItems:'center'}}>
    <ActivityIndicator size='large' color='orangered' /><Text style={{}}>Un instant</Text>
    </View>:<FlatList 
data={offers.reverse()}
numColumns={2}
renderItem={({item})=>(
<Pressable onPress={()=>seeIt(item.id)}>
{
        item.category==="iPhone"?<LinearGradient colors={['white', '#eee']} style={{justifyContent:'center', alignItems:'center', width:phoneWidth/2, height:300,  marginTop:'2%',  marginBottom:'1%', borderWidth:4, borderColor:'white'}}>
        <ScrollView style={{width:'100%'}}>
           
        {item.imgurl? <Image source={{uri:item.imgurl[0]}} style={{width:'80%', resizeMode:'contain', marginLeft:'10%', height:180, borderRadius:2}} />:''}
           <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.listTxt}>{item.name}</Text>
           <Text style={{ color:'#222', fontSize:22, fontWeight:'700', textAlign:'left', marginLeft:'10%', }}><Text style={{color:'orangered'}}>$</Text> {item.price}</Text>

           <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
           <Text style={{textAlign:'left', marginLeft:'10%', fontSize:10}}>{timeAgo.format(item.time-60*1000)==='il y a 1 minute'? "A l'instant":timeAgo.format(item.time-60*1000)}</Text>
           
           
           <TouchableOpacity onPress={()=>deleteOne(item.id)} style={{marginLeft:'10%'}}>
                   <Entypo name="trash" size={24} color='#444' />
           </TouchableOpacity>
           </View>

           {
                            item.quantity<1?
                            <View style={{position:'absolute', width:'42%', height:'9%', bottom:'30%', right:'10%', backgroundColor:'rgba(255, 40, 40, 0.7)', }}>
                                <View style={{justifyContent:'center', alignItems:'center', width:'100%', height:"100%"}}>
                                    <Text style={{color:'#fff', fontSize:12, fontFamily:"serif"}}>stock épuisé</Text>
                                </View>
                                
                            </View>:''
                        }
       
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
        return(
            <View>
              <Text style={Styles.pageHead3}><Ionicons name="phone-portrait-outline" size={21} /> Samsung</Text>
                <View style={{marginBottom:'20%', marginTop:'12%'}}> 

{!offers.length>0 ? <View style={{flexDirection:'column' ,justifyContent:'space-evenly', alignItems:'center'}}>
    <ActivityIndicator size='large' color='orangered' /><Text style={{}}>Un instant</Text>
    </View>:<FlatList 
data={offers.reverse()}
numColumns={2}
renderItem={({item})=>(
<Pressable onPress={()=>seeIt(item.id)}>
{
        item.category==="Samsung"?<LinearGradient colors={['white', '#eee']} style={{justifyContent:'center', alignItems:'center', width:phoneWidth/2, height:300,  marginTop:'2%',  marginBottom:'1%', borderWidth:4, borderColor:'white'}}>
        <ScrollView style={{width:'100%'}}>
           
        {item.imgurl? <Image source={{uri:item.imgurl[0]}} style={{width:'80%', resizeMode:'contain', marginLeft:'10%', height:180, borderRadius:2}} />:''}
           <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.listTxt}>{item.name}</Text>
           <Text style={{ color:'#222', fontSize:22, fontWeight:'700', textAlign:'left', marginLeft:'10%', }}><Text style={{color:'orangered'}}>$</Text> {item.price}</Text>

           <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
           <Text style={{textAlign:'left', marginLeft:'10%', fontSize:10}}>{timeAgo.format(item.time-60*1000)==='il y a 1 minute'? "A l'instant":timeAgo.format(item.time-60*1000)}</Text>
           
           
           <TouchableOpacity onPress={()=>deleteOne(item.id)} style={{marginLeft:'10%'}}>
                   <Entypo name="trash" size={24} color='#444' />
           </TouchableOpacity>
           </View> 

            {
                            item.quantity<1?
                            <View style={{position:'absolute', width:'42%', height:'9%', bottom:'30%', right:'10%', backgroundColor:'rgba(255, 40, 40, 0.7)', }}>
                                <View style={{justifyContent:'center', alignItems:'center', width:'100%', height:"100%"}}>
                                    <Text style={{color:'#fff', fontSize:12, fontFamily:"serif"}}>stock épuisé</Text>
                                </View>
                                
                            </View>:''
                        }        
           
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
        return(
            <View>
                                <Text style={Styles.pageHead3}><Entypo name='shop' style={{marginTop:"3%"}} size={22} color='black' />  Autres</Text>
                <View style={{marginBottom:'20%', marginTop:'12%'}}> 

{!offers.length>0 ? <View style={{flexDirection:'column' ,justifyContent:'space-evenly', alignItems:'center'}}>
    <ActivityIndicator size='large' color='orangered' /><Text style={{}}>Un instant</Text>
    </View>:<FlatList 
data={offers.reverse()}
numColumns={2}
renderItem={({item})=>(
<Pressable onPress={()=>seeIt(item.id)}>
{
        item.category==="Autres"? <LinearGradient colors={['white', '#eee']} style={{justifyContent:'center', alignItems:'center', width:phoneWidth/2, height:300,  marginTop:'2%',  marginBottom:'1%', borderWidth:4, borderColor:'white'}}>
        <ScrollView style={{width:'100%'}}>
           
        {item.imgurl? <Image source={{uri:item.imgurl[0]}} style={{width:'80%', resizeMode:'contain',marginLeft:'10%', height:180, borderRadius:2}} />:''}
           <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.listTxt}>{item.name}</Text>
           <Text style={{ color:'#222', fontSize:22, fontWeight:'700', textAlign:'left', marginLeft:'10%', }}><Text style={{color:'orangered'}}>$</Text> {item.price}</Text>

           <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
           <Text style={{textAlign:'left', marginLeft:'10%', fontSize:10}}>{timeAgo.format(item.time-60*1000)==='il y a 1 minute'? "A l'instant":timeAgo.format(item.time-60*1000)}</Text>
           
           
           <TouchableOpacity onPress={()=>deleteOne(item.id)} style={{marginLeft:'10%'}}>
                   <Entypo name="trash" size={24} color='#444' />
           </TouchableOpacity>
           </View>    
           {
                            item.quantity<1?
                            <View style={{position:'absolute', width:'42%', height:'9%', bottom:'30%', right:'10%', backgroundColor:'rgba(255, 40, 40, 0.7)', }}>
                                <View style={{justifyContent:'center', alignItems:'center', width:'100%', height:"100%"}}>
                                    <Text style={{color:'#fff', fontSize:12, fontFamily:"serif"}}>stock épuisé</Text>
                                </View>
                                
                            </View>:''
                        }    
           
        </ScrollView>
       
       </LinearGradient>:""}



</Pressable>
)} />

} 
    
</View>
            </View>
        )
        
    }

    if(home){
    return(
        <View style={Styles.main}>
           
            <View style={Styles.headerIcon}>
                                     
                        {
                            !adminpanel?
                           <MaterialIcons onPress={()=>checkAdmin(!adminpanel)} name="menu" size={36} color='black' />:
                           <MaterialIcons onPress={()=>checkAdmin(!adminpanel)} name="close" size={36} color='black' />
                        
                        }
                        
              </View>

                {
                    adminpanel?
                    <LinearGradient start={{x: 0, y:0}} end={{x:1, y:1}} colors={["white", 'white']} style={Styles.adminPanel}>
                       
                            <TouchableOpacity onPress={goAdd} style={Styles.menuTxtBox} >
                            <Entypo name='plus' size={28} color='#666' />
                                <Text style={Styles.menuTxt} >Ajouter</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={Styles.menuTxtBox} onPress={logout}>
                                <AntDesign name='logout' size={28} color='#666' />
                                <Text style={Styles.menuTxt}>Déconnexion</Text>
                            </TouchableOpacity>
                  
                            <TouchableOpacity style={Styles.menuTxtBox} onPress={()=>{navigation.navigate('Options'); adminpanel? checkAdmin(!adminpanel):''}}>
                                <AntDesign name='linechart' size={28} color='#666' />
                                <Text style={Styles.menuTxt}>Statistiques</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={Styles.menuTxtBox} onPress={()=>{navigation.navigate('Notifications'); adminpanel? checkAdmin(!adminpanel):''}}>
                                <Entypo name='bell' size={28} color='#666' />
                                <Text style={Styles.menuTxt}>Notifications</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={Styles.menuTxtBox} onPress={()=>{navigation.navigate('Options'); adminpanel? checkAdmin(!adminpanel):''}}>
                                <AntDesign name='setting' size={28} color='#666' />
                                <Text style={Styles.menuTxt}>Paramètres</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={Styles.menuTxtBox} onPress={()=>{onShare(); adminpanel? checkAdmin(!adminpanel):''}}>
                                <Entypo name='share' size={28} color='#666' />
                                <Text style={Styles.menuTxt}>Partager</Text>
                            </TouchableOpacity>
                                         
                    </LinearGradient>:""
                }

               <View style={{alignItems:'center', justifyContent:'space-between'}}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}  pagingEnabled >
                    <View style={Styles.tab}>
                    
                    <View style={Styles.searchPanel}>
                                <TextInput style={Styles.search} value={searching} onChangeText={(e)=>setSearch(e)} multiline={false} placeholder="rechercher" />
                            </View>

                        <View style={{marginBottom:'0%', marginTop:'10%'}}> 

                        {!offers.length>0? <View style={{flexDirection:'column' ,justifyContent:'space-evenly', alignItems:'center'}}>
                            <ActivityIndicator size='large' color='orangered' /><Text style={{}}>Un instant</Text>
                            </View>:<FlatList 
              data={offers.reverse()}
              numColumns={2}
              renderItem={({item})=>(
                <Pressable onPress={()=>seeIt(item.id)}>
                    {searching===""?  <LinearGradient colors={['white', '#eee']} style={{justifyContent:'center', alignItems:'center', width:phoneWidth/2, height:300,  marginTop:'2%',  marginBottom:'1%', borderWidth:4, borderColor:'white'}}>
                     <ScrollView style={{width:'100%'}}>
                        
                     {item.imgurl? <Image source={{uri:item.imgurl[0]}} style={{width:'80%',resizeMode:'contain', marginLeft:'10%', height:180, borderRadius:2}} />:''}
                     {
                            item.category==='Promo'?
                            <Animatable.View style={{backgroundColor:'red', position:'absolute', width:50, height:50, left:'10%', top:'55%', borderRadius:100}} animation="bounce" iterationCount='infinite' duration={1000}>
                                <View style={{width:"100%", height:'100%', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                    <Text style={{color:'white', fontWeight:'bold', fontSize:14}}>-{100-(item.promoPrice*100/item.price)}%</Text>
                                 
                                </View>
                                
                            </Animatable.View>
                                :''
                           }
                        
                        <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.listTxt}>{item.name}</Text>
                        {
                            item.category==='Promo'?
                            <Text style={{ color:'#222', fontSize:22, fontWeight:'700', textAlign:'left', marginLeft:'10%', }}><Text style={{color:'orangered', fontSize:18}}>$</Text> <Text style={{textDecorationLine:'line-through', color:'#aaa', fontSize:18}}> {item.price} </Text><Entypo name='price-tag' size={24} color={"#aaa"} /> <Animatable.Text iterationCount="infinite" duration={1000} animation="bounce"> {item.promoPrice}</Animatable.Text><Text style={{color:'orangered'}}> $</Text></Text>:
                            <Text style={{ color:'#222', fontSize:22, fontWeight:'700', textAlign:'left', marginLeft:'10%', }}><Text style={{color:'orangered'}}>$</Text> {item.price}</Text>


                        }
                      
                        <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
                        <Text style={{textAlign:'left', marginLeft:'10%', fontSize:10}}>{timeAgo.format(item.time-60*1000)==='il y a 1 minute'? "A l'instant":timeAgo.format(item.time-60*1000)}</Text>
                       
                        <TouchableOpacity onPress={()=>deleteOne(item.id)} style={{marginLeft:'10%'}}>
                                <Entypo name="trash" size={24} color='#444' />
                        </TouchableOpacity>
                      
                        </View>

                        {
                            item.quantity<1?
                            <View style={{position:'absolute', width:'42%', height:'9%', bottom:'30%', right:'10%', backgroundColor:'rgba(255, 40, 40, 0.7)', }}>
                                <View style={{justifyContent:'center', alignItems:'center', width:'100%', height:"100%"}}>
                                    <Text style={{color:'#fff', fontSize:12, fontFamily:"serif"}}>stock épuisé</Text>
                                </View>
                                
                            </View>:''
                        }
                      
                     </ScrollView>
                    
                    </LinearGradient>:null}

                    {
                        searching && item.name.toLowerCase().includes(finalsearch)? 
                        <LinearGradient colors={['white', '#eee']} style={{justifyContent:'center', alignItems:'center', width:phoneWidth/2, height:300,  marginTop:'2%',  marginBottom:'1%', borderWidth:4, borderColor:'white'}}>
                        <ScrollView style={{width:'100%'}}>
                           
                        {item.imgurl? <Image source={{uri:item.imgurl[0]}} style={{width:'80%',resizeMode:'contain', marginLeft:'10%', height:180, borderRadius:2}} />:''}
                        {
                            item.category==='Promo'?
                            <Animatable.View style={{backgroundColor:'red', position:'absolute', width:50, height:50, left:'10%', top:'55%', borderRadius:100}} animation="bounce" iterationCount='infinite' duration={1000}>
                                <View style={{width:"100%", height:'100%', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                    <Text style={{color:'white', fontWeight:'bold', fontSize:14}}>-{100-(item.promoPrice*100/item.price)}%</Text>
                                 
                                </View>
                                
                            </Animatable.View>
                                :''
                           }
                           <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.listTxt}>{item.name}</Text>

                           {
                            item.category==='Promo'?
                            <Text style={{ color:'#222', fontSize:22, fontWeight:'700', textAlign:'left', marginLeft:'10%', }}><Text style={{color:'orangered', fontSize:18}}>$</Text> <Text style={{textDecorationLine:'line-through', color:'#aaa', fontSize:18}}> {item.price} </Text><Entypo name='price-tag' size={24} color={"#aaa"} /> <Animatable.Text iterationCount="infinite" duration={1000} animation="bounce"> {item.promoPrice}</Animatable.Text><Text style={{color:'orangered'}}> $</Text></Text>:
                            <Text style={{ color:'#222', fontSize:22, fontWeight:'700', textAlign:'left', marginLeft:'10%', }}><Text style={{color:'orangered'}}>$</Text> {item.price}</Text>


                        }
                          
   
                           <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
                           <Text style={{textAlign:'left', marginLeft:'10%', fontSize:10}}>{timeAgo.format(item.time-60*1000)==='il y a 1 minute'? "A l'instant":timeAgo.format(item.time-60*1000)}</Text>
                           
                           
                           <TouchableOpacity onPress={()=>deleteOne(item.id)} style={{marginLeft:'10%'}}>
                                   <Entypo name="trash" size={24} color='#444' />
                           </TouchableOpacity>
    
                           </View>

                           {
                            item.quantity<1?
                            <View style={{position:'absolute', width:'42%', height:'9%', bottom:'30%', right:'10%', backgroundColor:'rgba(255, 40, 40, 0.7)', }}>
                                <View style={{justifyContent:'center', alignItems:'center', width:'100%', height:"100%"}}>
                                    <Text style={{color:'#fff', fontSize:12, fontFamily:"serif"}}>stock épuisé</Text>
                                </View>
                                
                            </View>:''
                        }
                                        
                           
                        </ScrollView>
                       
                       </LinearGradient>:null
                    }
                   
                </Pressable>
              )} />           
            
            }                          
                            
                     </View>
                        
                    </View>

                    <View style={Styles.tab}>
                        <CategoryOne />
                    </View>

                    <View style={Styles.tab}>
                        <CategoryTwo />
                    </View>

                    <View style={Styles.tab}>
                        <CategoryThree />
                    </View>

                    </ScrollView>
                    
                </View>

            <ScrollView >

            </ScrollView>
        </View>
    )
        }
        else{
            return(
                <LinearGradient start={{x:0, y:0}} end={{x:1, y:0}} colors={isDarkTheme?['#444', '#444']: ['black', '#111']} style={Styles.articleDetail}>
                <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.itemtitle}>{current.name} {current.category==='Promo'? <Fontisto name="shopping-sale" color="red" size={24} />:''} {current.category==='Promo'? <Text style={{fontSize:14, color:isDarkTheme? '#eee':'#444'}}>-{100-(current.promoPrice*100/current.price).toPrecision(2)}%</Text>:''}</Text>
                <TouchableOpacity style={Styles.back}>
                    <AntDesign onPress={()=>{setSee(!seen);}} name='back' size={34} color={isDarkTheme? '#eee':'white'}  />
                </TouchableOpacity>
        
                        
                <View style={{flexDirection:'row',   borderTopLeftRadius:20, borderTopRightRadius:20, backgroundColor: isDarkTheme? '#111':'rgba(255,255,255, 0.89)', justifyContent:'space-between', alignContent:'space-between', alignItems:'stretch',width:'100%', height:'90%',}}>
                
         
                <ScrollView>
                    <View  style={{flexDirection:'column', marginTop:20, marginBottom:'20%',}}>
                    <Text style={Styles.time}>{timeAgo.format(current.time-60*1000)==='il y a 1 minute'? "A l'instant":timeAgo.format(current.time-60*1000)}</Text>
                    
                    {
            current.imgurl?
            <View style={Styles.container}>
            <FlatList data={current.imgurl} horizontal showsHorizontalScrollIndicator={false} onScroll={Animated.event(
              [{nativeEvent: {contentOffset:{x:scroll}}}],
              {useNativeDriver: false}
            )}
            pagingEnabled
            scrollEventThrottle={10}
        
            renderItem={renderItem}
            />
            <ExpandingDot data={current.imgurl}
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
                current.category==='Promo'?
                <Text style={{ color:isDarkTheme? '#aaa': '#222', fontSize:24, fontWeight:'700', marginLeft:'5%', }}><Text style={{color:'orangered', fontSize:18}}>$</Text> <Text style={{textDecorationLine:'line-through', color:isDarkTheme? '#444':'#aaa', fontSize:18}}> {current.price} </Text><Entypo name='price-tag' size={24} color={"#aaa"} /> <Animatable.Text iterationCount="infinite" duration={1000} animation="bounce"> {current.promoPrice}</Animatable.Text><Text style={{color:'orangered'}}> $</Text></Text>:
                <Text style={{ color:isDarkTheme? '#aaa':'#222', fontSize:24, fontWeight:'700', marginLeft:'5%', }}><Text style={{color:'orangered'}}>$</Text> {current.price}</Text>


            }
                    <Text style={Styles.desTitle}>Description</Text>
                        <Text style={Styles.des}>{current.description}</Text>
                        <Text style={{marginLeft:'5%', marginTop:'3%', color:isDarkTheme? '#aaa':'#111' }}>{current.quantity>1? `${current.quantity} en stock`:""}</Text>
        

                       



                        {
                            current.quantity<1?
                            <View style={{marginBottom:'5%', width:'90%', borderRadius:10, height:phoneHeight/14, marginLeft:'5%',  backgroundColor:'#510', justifyContent:'center', alignItems:'center'}}>
                                <Text style={{color:'#fff', fontSize:20}}>Stock épuisé</Text>
                            </View>
                            :
                           ""
                        }
                     
                                                            
                
                    </View>
                </ScrollView>
                </View>
               
            </LinearGradient>         

            )
        }
}

export default AdminHome
