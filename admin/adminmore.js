//more
import { useEffect, useState } from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import {firebase, db} from '../fbconfig'
import LinearGradient from "react-native-linear-gradient"
import { AntDesign, Entypo } from "@expo/vector-icons"
import boxIcon from '../img/shopping.png'
const Adminmore=()=>{

    const [offers, setOffers]=useState([])
    const [users, setUsers]=useState([])

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

    const [cost, setCost]=useState()
   // const [costDisplayy, setCostDisplay]=useState("")

    useEffect(()=>{
     //   Object.keys(offers).map((i, v)=>{
                     
            let res=0
            let arr=[]
            
            offers.map((user)=>{
            
                    if(offers.length>0){
                    //   [...user.price].map((el)=>{
                            arr=[...arr, user.price]
                            //let res=
                            res=arr.reduce((a,b)=>{return Number(a)+Number(b)})
                          //  setCost(res)
                            if(res>=1000 && res<1000000){
                                setCost((res/1000).toFixed(2)+'k')
                            }
                            else if(res>=1000000){
                                setCost((res/1000000).toFixed(2)+'M')
                            }
                            else{
                                setCost(res)
                            }
                     //   })
                    }
                
            })
      //  })

    })


    

    useEffect(()=>{
        db.child('products').on('value', (snapshot)=>{
            let update=[]
            snapshot.forEach((child)=>{
                update.push({
                    id:child.key,
                    name:child.val().name,
                    description:child.val().description,
                    price:child.val().price,
                    imgurl:child.val().imgurl,
                    time:child.val().time,
                    category:child.val().category
                })
            })  
            setOffers(update)
        })
    }, [])
    return(
        <LinearGradient start={{x:0, y:0}} end={{x:1, y:0}} colors={['black', 'black']} style={{flex:1, justifyContent:'flex-end', alignItems:'center', marginTop:'0%', backgroundColor:'white'}}>
            <Text style={Style.text}>Statistique</Text>
            <View style={{width:'100%', height:'90%', bottom:0, backgroundColor:'rgba(255, 255, 255, 0.9)', borderTopLeftRadius:20, borderTopRightRadius:20}}>
        <Text style={Style.caption}>Données</Text>
        <View style={Style.stat}>
           <LinearGradient start={{x: 0, y:0}} end={{x:1, y:1}} colors={['transparent', 'transparent']} style={Style.each}>
                <Entypo name='box' color='#111' size={34} />
                <Text style={Style.value}>{offers.length}</Text>
           </LinearGradient> 
           <LinearGradient start={{x: 0, y:0}} end={{x:1, y:1}} colors={['transparent', 'transparent']} style={Style.each}>
                <AntDesign name='shoppingcart' color='#111' size={34} />
                <Text style={Style.value}>0</Text>
           </LinearGradient>
           <LinearGradient start={{x: 0, y:0}} end={{x:1, y:1}} colors={['transparent', 'transparent']} style={Style.each}>
                <Entypo name='user' color='#111' size={34} />
                <Text style={Style.value}>{users.length-1}</Text>
           </LinearGradient>
           <LinearGradient start={{x: 0, y:0}} end={{x:1, y:1}} colors={['transparent', 'transparent']} style={Style.each}>
                <AntDesign name='message1' color='#111' size={34} />
                <Text style={Style.value}>0</Text>
           </LinearGradient>
           
        </View>

                                <View >

                                <TouchableOpacity style={Style.proceedBuy}>
                                    <Text style={{fontWeight:'bold', color:'#333', marginLeft:'5%', fontWeight:'bold', fontSize:23}}><Text style={{fontSize:16, color:'#555', marginLeft:'3%', fontWeight:'normal'}}>Total attendu: </Text>{cost} $</Text>
                                </TouchableOpacity>
                                </View>


        <View style={{marginBottom:'4%', borderBottomColor:'white', borderBottomWidth:3}}>
            <Text style={Style.caption}>Total des entrées</Text>
            <View style={Style.nd}>
            <Entypo name='credit' color="#444" size={36} />
            <Text style={Style.value}>0 </Text>
        </View>
        </View>


        <View style={Style.explain}>
            <View style={Style.detail}>
                <Entypo name='box' color='#444' size={34} />
                <Text style={Style.subvalue}>Nombre d'articles disponibles</Text>
            </View>

            <View style={Style.detail}>
                <AntDesign name='shoppingcart' color='#444' size={34} />
                <Text style={Style.subvalue}>Nombre d'articles vendus</Text>
            </View>
                
            <View style={Style.detail}>
                <Entypo name='user' color='#444' size={34} />
                <Text style={Style.subvalue}>Nombre d'utilisateurs</Text>
            </View>

            <View style={Style.detail}>
                <AntDesign name='message1' color='#444' size={34} />
                <Text style={Style.subvalue}>Nombre de notifications</Text>
            </View>
                
           
            </View>
            </View>
        
        </LinearGradient>
    )

}
export default Adminmore

const Style={
    stat:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        marginBottom:'5%',
        borderBottomColor:'white',
        borderBottomWidth:3,
        justifyContent:'space-evenly'
    },
    caption:{
        fontSize:26,
        marginLeft:'5%',
        marginTop:'3%',
        color:'#666',
        marginBottom:'3%'

    },
    value:{
        fontSize:22,
        color:'#444',
        fontWeight:'bold',

    },
    subvalue:{
        fontSize:16,
        color:'#444',
        fontFamily:'Helvetica',
        marginLeft:'2%'
    }
    ,
    each:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:'3%',
        borderRadius:20,
        width:"20%",
       
        backgroundColor:'none',
       
    },
    explain:{
        marginLeft:'5%'
    },
    detail:{
        flexDirection:'row',
        width:'100%',
        alignItems:'center',
        marginTop:'3%'

    },
    nd:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        width:"50%",
        marginLeft:'5%',
        borderRadius:20,
        marginBottom:'3%',
        borderWidth:2,
        borderColor:'#222'
    }
    ,
    text:{
        position:'absolute',
        color:'white',
        top:'3%',
        fontSize:20,
        letterSpacing:1,
        fontWeight:'bold',
        fontFamily:'fantasy'
    }
}
