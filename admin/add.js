//add
import { View, Image, TouchableOpacity, PermissionsAndroid, Text, TextInput, Keyboard, ScrollView } from "react-native"
import React, {useEffect, useState} from "react"
import LinearGradient from "react-native-linear-gradient"
import {firebase, db} from '../fbconfig'
import { ActivityIndicator, Dimensions, FlatList } from "react-native"
import { Picker } from "@react-native-picker/picker"
import * as ImagePicker from 'expo-image-picker'
import {Entypo, AntDesign, MaterialIcons, Ionicons} from '@expo/vector-icons'

const Add=({navigation})=>{

    const [name, setName]=useState('')
    const [description, setDes]=useState('')
    const [category, setCat]=useState('iPhone')
    const [showBtn, setBtn]=useState(true)
    const [image, setImage]=useState(null)
    const [uploading, setUpload]=useState(false)
    const [quantity, setQuantity]=useState("")
    const [added, setAdded]=useState(false)
    const [price, setPrice]=useState('')
    const [promoPrice, setPromoPrice]=useState('')
    const [imgs, setImgs]=useState([])


    const el={
        st:'iPhone',
        nd:'Samsung',
        rd:'Autres',
        th:'Promo'
    }
    //const dbRef=firebase.firestore().collection("produits")
   // const timestamp=firebase.firestore.FieldValue.serverTimestamp()
    //timer
 

    let arr=[]
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
                   // allowsEditing:true,
                    aspect:[4, 3],
                    allowsMultipleSelection:true,
                    selectionLimit:5,
                    quality:1
                })
               
                if(!result.canceled){
                    setImage(result.uri? [result.uri]:result.selected)
                }
               
              
                    console.log(result)
                    for(let x of result.assets){
                       
                        arr=[...arr, x.uri]
                    }
                    setImgs(arr)
                    console.log(arr)  
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



    const adder=()=>{
        setUpload(true)
        setBtn(!showBtn)
        let x=0
        const promises=[]
        let imgArr=[]
        if(!(!name || !description || !price || !category || !quantity || !imgs)){
        imgs.forEach(async (img) => {
            const response=await fetch(img)

        const blob=await response.blob()
        const imgname=img.substring(img.lastIndexOf('/')+1)
       // firebase.storage().ref('images').child(imgname).put(blob)
       console.log('Uploading image');
        const uploadTask=firebase.storage().ref('images').child(imgname).put(blob);
            promises.push(uploadTask);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                snapshot=>{
                    const progress=snapshot.bytesTransferred/snapshot.totalBytes*100;

                    if(snapshot.state===firebase.storage.TaskState.RUNNING){
                        console.log('Progress ' + progress+"%")

                    }
                }    ,
                error=>console.log(error.code)
            )
            uploadTask.then(()=>{
                
                firebase.storage().ref('images').child(imgname).getDownloadURL()
                .then((imgurl)=>{
                    console.log('Download '+imgurl)
                    //setUrl((prev)=>[...prev, imgurl])
                 imgArr=[...imgArr, imgurl]
                  //  if(imgArr.length===imgs.length){
                  
                  x++
                  if(x===imgs.length || imgArr.length===imgs.length){
                    let time=new Date().getTime()
                    const state={name, description, price, category, promoPrice, quantity, time, imgArr};
                                db.child('products').push(state)
                                 .then(()=>{
                                    setAdded(true) 
                                    alert('publiée')
                                    setName('')
                                    setDes('')
                                    setPrice("")
                                    setQuantity('')
                                    setPromoPrice('')
                                    setCat('')
                                    setUpload(false)
                                    setImgs([])
                                    setImage(null)
                                    Keyboard.dismiss()
                                })
                                .catch((e)=>alert(e))

                  }
                  else{
                    console.log('oops')
                  }
        
                })
                .catch((e)=>console.log('Error downloading '))
                console.log('Image uploaded')
               
            })
           
            
        })
        Promise.all(promises)
        .then((res)=>{
            console.log('Uploading')
        })
    }
    else{
        alert('Veuillez remplir toutes les cases')
    }
    }
/*
    const adder=async()=>{  
     
        if(!(!name || !description || !price || !category)){
            
            setBtn(!showBtn)
            //_______________________
            setUpload(true)
            const response=await fetch(image.uri)
           const blob=await response.blob()
             const imgname=image.uri.substring(image.uri.lastIndexOf('/')+1)
             var ref=firebase.storage().ref('images').child(imgname).put(blob)
            await ref;

            //download image url
            
            const imgurl=await firebase.storage().ref('images').child(imgname).getDownloadURL()
            const url=()=>{
                let time=new Date().getTime()
                
                const state={name, description, price, category, time, imgurl}
                return state
            }
            //______________________
           
            db.child('products').push(url())
            .then(()=>{
                setAdded(true) 
                alert('publiée')
                setName('')
                setDes('')
                setPrice("")
                setCat('')
                setUpload(false)
                
                setImage(null)
                    
                Keyboard.dismiss()
                
            })

        }

        else{
            alert('Veuillez remplir tous ls champs')
        }
        
    }
*/


    

    useEffect(()=>{
        if(added){
            navigation.navigate('Accueil')
            setTimeout(()=>{setAdded(false); setBtn(true)}, 1000)
        } 
       
    })

    return(
        <ScrollView>
        <LinearGradient colors={['black', 'black']} start={{x:0, y:0}} end={{x:1, y:0}} style={styles.main} >
             <Text style={styles.text}>Ajouter un article</Text>
        <View style={{justifyContent:'center', width:'100%', height:"90%", borderTopLeftRadius:20, borderTopRightRadius:20, flexDirection:'column', alignItems:'center', backgroundColor:'rgba(255,255,255,0.9)'}}>
       
       
    {   
        !showBtn? <View style={{flex:1, display:'flex', height:phoneHeight, flexDirection:'column', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
        <ActivityIndicator size='large' color='orangered' /><Text style={{}}>Publication en cours</Text>
        </View>:
             <LinearGradient style={styles.form} colors={["transparent", "transparent"]}>

            <TextInput placeholder="nom de l'article"
            placeholderTextColor="darkgrey"
            secureTextEntry
            onChangeText={(e)=>setName(e)}
            value={name}
            multiline={false}
            style={styles.in}
            blurOnSubmit
            />
        
             <TextInput placeholder="description"
            placeholderTextColor="darkgrey"
            onChangeText={(e)=>setDes(e)}
            value={description}
            multiline={true}
            style={styles.in}
            blurOnSubmit
            />

            <TextInput placeholder="quantité"
            placeholderTextColor="darkgrey"
            secureTextEntry
            onChangeText={(e)=>setQuantity(e)}
            value={quantity}
            keyboardType='numeric'
            
            style={styles.in}
            blurOnSubmit
            />

            <TouchableOpacity style={{flexDirection:'row', borderWidth:1,
        //backgroundColor:'none',
        borderColor:'#444',
        //borderRadius:10,
        width:'90%',
        textAlign:'center',
        borderRadius:20,
        color:'#444',
        marginTop:'8%',
        justifyContent:'space-evenly',
        alignItems:'center',}}>
                <Text>Catégorie:</Text>
            <Picker style={{height:16, width:60}} selectedValue={category} onValueChange={(e)=>setCat(e)}>
                
                <Picker.Item label={el.st} value={el.st} />
                <Picker.Item label={el.nd} value={el.nd} />
                <Picker.Item label={el.rd} value={el.rd} />
                <Picker.Item label={el.th} value={el.th} />
            </Picker>
            <Text>{category}</Text>
            </TouchableOpacity>
            
            <TextInput placeholder="prix"
            placeholderTextColor="darkgrey"
            onChangeText={(e)=>setPrice(e)}
            value={price}
            secureTextEntry
            multiline={false}
            keyboardType='numeric'
            blurOnSubmit
            maxLength={12}
            style={styles.in}
            />

            {
                category===el.th?
                <TextInput placeholder="prix de promotion"
                placeholderTextColor="darkgrey"
                onChangeText={(e)=>setPromoPrice(e)}
                secureTextEntry
                value={promoPrice}
                multiline={false}
                blurOnSubmit
                keyboardType='numeric'
                maxLength={12}
                style={styles.in}
                />:''
            }

            <Text style={{fontFamily:'fantasy', fontSize:15, color:'#444'}}>Importer une photo</Text>
            <TouchableOpacity onPress={pickImage} style={{paddingBottom:10}}>
            <Text style={{fontSize:30, color:'#444'}}><Entypo name='image' size={50} color='#444' />+</Text>
            </TouchableOpacity>
            <View style={{height:phoneHeight/8, width:phoneWidth}}>
              
            <FlatList
                data={imgs}
                horizontal
                //numColumns={5}
                renderItem={({item})=>(
                    <Image source={{uri:item}} style={{width:phoneWidth/5, height:80}} />

                )}
            />
            </View>
            <LinearGradient start={{x: 0, y:0}} end={{x:1, y:1}} style={styles.btn} colors={['orangered', 'darkorange']}>
               
                <TouchableOpacity onPress={adder}>
                    <Text style={{color:'white', fontSize:16}}>
                       + ajouter
                    </Text>
                </TouchableOpacity>
            </LinearGradient>        
           
        </LinearGradient>
               
    }
     
      </View>
    </LinearGradient>
    </ScrollView>
    )
}

export default Add
const phoneWidth=Dimensions.get('window').width
const phoneHeight=Dimensions.get('window').height
const styles={
    main:{
        flex:1,
        flexDirection:'column',
        justifyContent:'flex-end',
        alignItems:'center',
        height:phoneHeight,
        width:phoneWidth
    },
    inputCaption:{
        paddingLeft:'40%'

    },
    text:{
        position:'absolute',
        color:'#ddd',
        top:'3%',
        fontSize:20,
        letterSpacing:1,
        fontWeight:'bold',
        fontFamily:'fantasy'
    },
    in:{
        borderWidth:1,
        //backgroundColor:'none',
        borderColor:'#444',
        //borderRadius:10,
        width:'90%',
        textAlign:'center',
        borderRadius:20,
        color:'#444',
       
        marginTop:'8%',
        justifyContent:'space-evenly',
        alignItems:'center',

    },
    form:{
        justifyContent:'flex-start',
        alignContent:'center',
        width:phoneWidth,
        height:"100%",
        boxShadow:'0 3px 5px black',
        alignItems:'center',
        borderRadius:20
    },
    btn:{
        paddingLeft:10,
        //borderRadius:16,
        height:'8%',
        borderRadius:20,
        width:'90%',
        alignItems:'center',
        justifyContent:'center',
        paddingRight:6,
        
    }
}
