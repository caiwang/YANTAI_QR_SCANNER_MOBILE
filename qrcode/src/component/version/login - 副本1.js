import React,{component,PropTypes}from 'react'
import { View,Text,TextInput,Image,ImageBackground,Dimensions,Button,TouchableNativeFeedback} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import {url} from '../config'
class Login extends React.Component{
  constructor(props){
        super(props)
        this.state={
          admin:'',
          password:'',
          alert:'',
          showhide:true,
          autoFocus:false
      }
  }

  componentDidMount(){

  }

  // matchadmin=(event)=>{
  //   this.setState({alert:''});
  //   let admin=event.nativeEvent.text 
  //   let matchadmin=/^[A-Za-z]{6}$/;
  //   if (!matchadmin.test(admin)) { this.setState({alert:'请正确输入6-10位字母组合的用户名'})  ;}

  // }
  // matchpassword=(event)=>{
  //     this.setState({alert:''});
  //     let password=event.nativeEvent.text
  //     let matchpassword=/^[0-9]{6}$/;
  //     if(!matchpassword.test(password)){ 
  //     this.setState({alert:'请您输入6位数字密码'});}
  // }

  login=()=>{
        this.setState({alert:''})
        let admin=this.state.admin;
        let password=this.state.password;

        let matchadmin=/^[A-Za-z]{6,20}$/;
        let matchpassword=/^[0-9]{6}$/;

        if (!matchadmin.exec(admin)) {
            this.setState({alert:'请正确输入6-20位字母组合的用户名'})
            return false;
        }else{
        if (!matchpassword.exec(password)) {
            this.setState({alert:'请正确输入6位数字密码'})
            return false;
          }else{
            // 这里判断重复密码
            let passwordset=new Set(password)
            console.log(passwordset)
            if (passwordset.size==1) {
                this.setState({alert:'6位数字密码不能相同'})
                return false;
              }
          }
        }
     
    
    
        let data={
          UserName:this.state.admin,
          Password:this.state.password,
          }
          console.log(data)
        // axios.post(`${url}/UserService/Login`,data)
        // .then(res=>this.loginok(res))
        // .catch(err=>this.errback(err))
    }
    
  
  // loginok(res){
  //   Actions.Shipment()
  // }
  // errback(err){
  //   console.log(" ")
  // }



  changepassword(){
      let admin=this.state.admin;
      let password=this.state.password;
     Actions.Changepassword({admin,password})
  }
  render(){
    let {admin,
          password,
          alert,
          showhide,
          autoFocus}=this.state
    return(


      <View style={styles.flexbox}>
        <ImageBackground style={{height:height,width:width}} source={require('../img/back.jpg')} resizeMode='cover' opacity={1}>
     
        <View style={styles.loginn} >
          <Image style={{height:0.2*height,width:0.4*width}} source={require('../img/logo.png')} ></Image>
         </View>
       
        
        <View style={styles.login}>
          <View>
           <Text style={styles.hfont}>美盛智能物流追踪系统</Text>
          </View>
        </View>  

        <View style={styles.admin}>
           <View><Text style={styles.textfont}>账号:</Text></View>
           <View><TextInput autoFocus={this.state.autoFocus} placeholder='admin' placeholderTextColor="#888" maxLength={20} style={styles.contentfont}  onChangeText={(admin)=>{this.setState({admin:admin})}} value={admin} 
           // onBlur={this.matchadmin.bind(this)}
           ></TextInput></View>
        </View>

        <View style={styles.admin}>
           <View><Text style={styles.textfont}>密码:</Text></View>
           <View><TextInput placeholder='password' placeholderTextColor="#888" maxLength={6} keyboardType='numeric' style={styles.contentfont}  secureTextEntry={true} onChangeText={(password)=>{this.setState({password:password})}} value={password} 
           // onBlur={this.matchpassword.bind(this)}
           ></TextInput></View>
        </View>

        <View style={styles.admin}>
        <Text style={styles.contentfontred}>{this.state.alert}</Text>
        </View>

        <View style={styles.admin}>
            <View style={styles.adminbtn}>
              <Button title="登  录" color="#4ea3f1" onPress={this.login.bind(this)} >登  录</Button>
            </View>
        </View>

        <View style={styles.admin}>
        <View style={styles.password}>
          <Text  style={{color:"#095194"}} onPress={this.changepassword.bind(this)}>修改密码</Text>
        </View>
        </View>

        <View style={styles.copyright}>
          <Text  style={{color:"#eee",textAlign:'center'}} numberOfLines={2}>Copyright © 2017 Xiaoyu Video Communications (beijing). Technology Co.Ltd </Text>
        </View>
        </ImageBackground>
      </View>


      )
      
}
}
const {width, height} = Dimensions.get('window')
const styles={
    flexbox:{
   flex:1
  },
  login:{
    width:width,
    height:50,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:0.01*height
  },
  loginn:{
    width:width,
    height:0.2*height,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:0.12*height
  },
  hfont:{
    fontSize:22
    // color:'#13ad9b' 
  },
  admin:{
    width:width,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  contentfont:{
    width:0.5*width
    // color:'#13ad9b'
  },
  contentfontred:{
    color:'#f00'
  },
  textfont:{
    fontSize:16
    // color:'#13ad9b' 
  },
  adminbtn:{
    width:width*0.3,
    marginTop:15
  },
  password:{
    width:width*0.5,
    marginTop:15,
    alignItems:'center'
  },
  copyright:{
    width:width,
    marginTop:0.05*height
  }

}

export default Login







