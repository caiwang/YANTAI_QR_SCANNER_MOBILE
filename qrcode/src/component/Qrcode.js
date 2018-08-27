import React,{component,PropTypes}from 'react'
import { View,Text,TextInput,Image,ImageBackground,Dimensions,Button,TouchableNativeFeedback,NativeModules, DeviceEventEmitter} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import {url} from '../config';
const scanToastAndroid = NativeModules.ScanToastAndroid;
class Qrcode extends React.Component{
  constructor(props){
        super(props)
        this.state={
          obj:'',
         alert:'按下F5扫码',
         CodeList:[],
         count:''
      }
  }

  componentDidMount(){
    // const counts=new Array();
      DeviceEventEmitter.addListener('EventName', (res) => {
            this.setState({ obj: res });
            let scanres=this.state.obj.SCAN;
                this.state.CodeList.push(scanres);
                // alert(counts);
            let countsset=new Set(this.state.CodeList);
            let countarray=Array.from(countsset);//这是一个数组
            // alert(countarray);
            // // alert(countsset);
            // let countslength=countsset.size;
            this.setState({count:countarray.length,CodeList:countarray});
            
        });
  }


  makesure(){
    if (this.state.CodeList.length>0) {
      let qrcodeidid=this.props.ID;
      let arrcodelist=this.state.CodeList;
      Actions.Shipment({qrcodeidid,arrcodelist})
    }else{
      alert('请您扫码后再点击进入，否则没有权限进入')
    }
     
  }
  
  makeback(){
     let arr=this.state.CodeList.slice(0,-1);
    // console.log(arr)
    this.setState({
      CodeList:arr,
      count:arr.length
    })
  }
  render(){
    
    return(
      <View style={styles.flexbox}>
        

        <View style={styles.admin}>
        <Text style={styles.contentfontred}>{this.state.alert}</Text>
        </View>



        <View style={styles.itemss}>
                <Text style={styles.fontwidth}>已读取个数</Text>
                <Text style={styles.fontwidth}>{this.state.count}</Text>
        </View>



        <View style={styles.admin}>
            <View style={styles.adminbtn}>
              <Text style={{color:'#fff',fontSize:18}} onPress={this.makeback.bind(this)} >撤销一个</Text>
            </View>
        </View>

        <View style={styles.admin}>
            <View style={styles.adminbtn}>
              <Text style={{color:'#fff',fontSize:18}} onPress={this.makesure.bind(this)} >确定完成</Text>
            </View>
        </View>

      </View>
      )
      
}
}
const {width, height} = Dimensions.get('window')
const styles={
  flexbox:{
   flex:1
  },
  admin:{
    width:width,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:0.1*height
  },
  contentfontred:{
    color:'#4ea3f1',
    fontSize:22,
    fontWeight:'bold'
  },
  adminbtn:{
    width:width*0.4,
    height:0.15*height,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#4ea3f1',
    borderRadius:10
  },
     itemss:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      height:0.1*height,
      marginTop:15
    },
     fontwidth:{
      width:0.4*width,
      fontSize:20,
      textAlign:'left',
      color:'#4ea3f1'
    }

}

export default Qrcode







