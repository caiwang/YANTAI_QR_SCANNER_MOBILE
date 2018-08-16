import React,{component,PropTypes} from 'react'
import { View,Text,TextInput,Image,ImageBackground,Dimensions,Button,ScrollView} from 'react-native';
import { Actions,Alert } from 'react-native-router-flux';
import axios from 'axios';
import {url} from '../config';
import Loading from './Loading';
class Message extends React.Component{
    constructor(props) {
      super(props);
      this.state={
        loading:true
      };
    }
 
    componentDidMount(){
      

    }
    finish(){
      Actions.Shipment()
    }
  render(){
    return(       
      <ScrollView style={styles.flexbox}>
      
            <View style={styles.admin}>
                  <View style={styles.adminbtn}>
                    <Button title="扫描二维码" color="#4ea3f1" onPress={()=>alert('好喜欢你！')}>扫描二维码</Button>
                  </View>
            </View>

            <View style={styles.itemss}>
                <Text style={styles.fontwidth}>已读取二维码个数</Text>
                <Text style={styles.fontwidth}> 5
                </Text>
            </View>
             
            <View>
              <View style={styles.items}><Text style={styles.fontwidths}>交货订号</Text><TextInput style={styles.inputwidth}></TextInput></View>
              <View style={styles.items}><Text style={styles.fontwidths}>订单时间</Text><TextInput style={styles.inputwidth}></TextInput></View>
              <View style={styles.items}><Text style={styles.fontwidths}>订单编号</Text><TextInput style={styles.inputwidth}></TextInput></View>
              <View style={styles.items}><Text style={styles.fontwidths}>车牌号</Text><TextInput style={styles.inputwidth}></TextInput></View>
              <View style={styles.items}><Text style={styles.fontwidths}>装运项目</Text><TextInput style={styles.inputwidth}></TextInput></View>
              <View style={styles.items}><Text style={styles.fontwidths}>产品名称</Text><TextInput style={styles.inputwidth}></TextInput></View>
              <View style={styles.items}><Text style={styles.fontwidths}>产品规格</Text><TextInput style={styles.inputwidth}></TextInput></View>
              <View style={styles.items}><Text style={styles.fontwidths}>产品质量</Text><TextInput style={styles.inputwidth}></TextInput></View>
              <View style={styles.items}><Text style={styles.fontwidths}>发货数量</Text><TextInput style={styles.inputwidth}></TextInput></View>
              <View style={styles.items}><Text style={styles.fontwidths}>需求公司</Text><TextInput style={styles.inputwidth}></TextInput></View>
              <View style={styles.items}><Text style={styles.fontwidths}>发货地点</Text><TextInput style={styles.inputwidth}></TextInput></View>
            </View>

            <View style={styles.adminn}>
            <View style={styles.adminbtnn}>
              <Button title="继续扫描" color="#4ea3f1" onPress={()=>alert('好喜欢你')}>继续扫描</Button>
            </View>
            </View>
            <View style={styles.adminn}>
              <View style={styles.adminbtnn}>
                <Button title="取消关联" color="#4ea3f1" onPress={()=>alert('好喜欢你')}>取消关联</Button>
              </View>
            </View>
            <View style={styles.adminn}>
              <View style={[styles.adminbtnn,styles.adminbtnnleft]}>
                <Button title="确定完成" color="#4ea3f1" onPress={this.finish.bind(this)}>确定完成</Button>
              </View>
            </View>
           
      </ScrollView>
      )
      
}
}
const {width, height} = Dimensions.get('window')
const styles={
    admin:{
    width:width,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:20
    },
    adminbtn:{
      flex:0.8
    },
    flexbox:{
     flex:1
    },
     itemss:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      height:0.1*height,
      marginTop:20
    },
     items:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      height:0.1*height
    },
     fontwidth:{
      width:0.4*width,
      fontSize:15,
      textAlign:'left'
    },
     fontwidths:{
      width:0.2*width,
      fontSize:15,
      textAlign:'left'
    },
    inputwidth:{
      width:0.6*width
    },

    adminn:{
    width:width,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:30
    },
    adminbtnn:{
    flex:0.4
    

  },
  adminbtnnleft:{
     marginLeft:0.05*width

  }
 
  

}

export default Message







