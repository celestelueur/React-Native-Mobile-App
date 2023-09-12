//profil
import {View, Text, Dimensions} from 'react-native'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LinearGradient from 'react-native-linear-gradient'
const phoneWidth=Dimensions.get('window').width
const phoneHeight=Dimensions.get('window').height
const AdminProfil=()=>{
    return(
        <LinearGradient start={{x:0, y:0}} end={{x:1, y:1}} colors={['violet', 'darkblue']} style={Style.main}>
            <View>
                <Text>Profil</Text>
            </View>      
        </LinearGradient>
    )
}
export default AdminProfil
const Style={
    main:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        height:phoneHeight,
        width:phoneWidth
        
    }
}
