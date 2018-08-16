import React from 'react'
import { View,Text,TextInput,Image,ImageBackground,Dimensions,Button,ScrollView} from 'react-native';
import { Actions,Alert } from 'react-native-router-flux';

class Loading extends React.Component{
 
  render(){
    return(       
      
        <View style={styles.v}>
        <Text style={styles.c}>网络不给力...加载中...</Text>
        </View>
      )
      
}
}
const {width, height} = Dimensions.get('window');
const styles={
      v:{
      	width:width,
	    height:0.7*height,
	    flexDirection:'row',
	    justifyContent:'center',
	    alignItems:'center'
      },
      c:{
      	fontSize:16,
      	color:'#f00'

      }
      }
export default Loading







