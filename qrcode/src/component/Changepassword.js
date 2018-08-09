import React from 'react'
import { View,Text,TextInput,Image,ImageBackground,Dimensions,Button,ScrollView} from 'react-native';
import { Actions,Alert } from 'react-native-router-flux';

class Changepassword extends React.Component{
  constructor(props){
        super(props)
        this.state={
          useradmin:'',
          userpassword:'',
          useralert:'',
          usernewpassword:'',
          userconfirmpassword:''
      }
      
  }

  componentDidMount(){

  }
   changepassword=()=>{
        this.setState({useralert:''})
        let useradmin=this.state.useradmin;
        let userpassword=this.state.userpassword;
        let usernewpassword=this.state.usernewpassword;
        let userconfirmpassword=this.state.userconfirmpassword;

        let usermatchadmin=/^[A-Za-z]{6,20}$/;
        let usermatchpassword=/^[0-9]{6}$/;
          
        if (!usermatchadmin.exec(useradmin)) {
            this.setState({useralert:'请正确输入6-20位字母组合的用户名'});
            return false;
        }
        if (!usermatchpassword.exec(userpassword)) {
            this.setState({useralert:'请正确输入6位数字密码'});
            return false;
          }
        if (!usermatchpassword.exec(usernewpassword)) {
            this.setState({useralert:'请正确输入6位数字密码'});
            return false;
        }
        let userpasswordset=new Set(userpassword)
            console.log(userpasswordset)
        if (userpasswordset.size==1) {
            this.setState({useralert:'6位数字密码不能相同'});
            return false;
          }
        let usernewpasswordset=new Set(usernewpassword)
            console.log(usernewpasswordset)
        if (usernewpasswordset.size==1) {
            this.setState({useralert:'6位数字密码不能相同'});
            return false;
          }
        if (usernewpassword!==userconfirmpassword) {
          this.setState({useralert:'两次密码不一致，请检查后再次确认'});
            return false;
        };

    
    
        
    }
  render(){
    return(       
      <View >
        
              <View style={styles.items}>
                 <Text style={styles.fonttitle}>请输入以下内容</Text>
              </View>
              <View>
                  <View style={styles.items}><Image style={{width:20,height:20}} source={require('../img/user.png')}/><Text style={styles.font}>用户名</Text><TextInput maxLength={20} style={styles.marginl} onChangeText={(useradmin)=>{this.setState({useradmin:useradmin})}} value={this.state.admin}
                  ></TextInput></View>

                  <View style={styles.items}><Image style={{width:20,height:20}} source={require('../img/password.png')}/><Text style={styles.font}>密 码</Text><TextInput maxLength={6} keyboardType='numeric' secureTextEntry={true} style={styles.marginl} onChangeText={(userpassword)=>{this.setState({userpassword:userpassword})}}></TextInput></View>

                  <View style={styles.items}><Image style={{width:20,height:20}} source={require('../img/new.png')}/><Text style={styles.font}>新密码</Text><TextInput maxLength={6} keyboardType='numeric' secureTextEntry={true} style={styles.marginl} onChangeText={(usernewpassword)=>{this.setState({usernewpassword:usernewpassword})}}></TextInput></View>

                  <View style={styles.items}><Image style={{width:20,height:20}} source={require('../img/comfirm.png')}/><Text style={styles.font}>确认密码</Text><TextInput maxLength={6} keyboardType='numeric' secureTextEntry={true} style={styles.marginl} onChangeText={(userconfirmpassword)=>{this.setState({userconfirmpassword:userconfirmpassword})}}></TextInput></View>
                  
              </View>

              <View style={styles.adminn}>
                  <Text style={styles.contentfontred}>{this.state.useralert}</Text>
             </View>

              <View style={styles.adminn}>
                  <View style={styles.adminbtnn}>
                    <Button title="确 定" color="#4ea3f1" onPress={this.changepassword.bind(this)}>确 定</Button>
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
    items:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      height:0.1*height
    },
    fonttitle:{
      width:width*0.9,
      fontSize:19,
      // color:'#2c5c53'
      // backgroundColor:'#f00'
    },
    font:{
      width:width*0.2,
      fontSize:16,
      // color:'#2c5c53',
      textAlign:'left'
    },
    marginl:{
      width:width*0.6,
      fontSize:16
      // color:'#2c5c53'
      
    },
    adminn:{
    width:width,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  adminbtnn:{
    width:width*0.3,
    marginTop:30
  },
  contentfontred:{
    color:'#f00'
  }
  

}

export default Changepassword







