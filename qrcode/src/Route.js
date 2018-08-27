import React, { Component } from 'react';
import { Platform,StyleSheet,Text,View } from 'react-native';
import { Scene, Router ,Actions } from 'react-native-router-flux';
import Login from './component/login';
import Changepassword from './component/Changepassword';
import Qrcode from './component/Qrcode';
import Shipment from './component/Shipment';
import Message from './component/Message';

class Route extends Component{
  render() {
    return (
    <Router >
	    <Scene key='Route'>
	        <Scene hideNavBar key='Login' component={Login} title="用户登录"  titleStyle={{color:'#eee'}} initial={true}/>

          <Scene key='Changepassword' component={Changepassword} title="修改密码"  titleStyle={{color:'#eee'}} navBarButtonColor='#eee' navigationBarStyle={{backgroundColor:'#444'}} headerMode='float'/>

          <Scene key='Qrcode' component={Qrcode} title="扫描二维码"  titleStyle={{color:'#eee'}} navBarButtonColor='#eee' navigationBarStyle={{backgroundColor:'#444'}} headerMode='float'/>

	        <Scene key='Shipment' component={Shipment} title="待发货清单"  titleStyle={{color:'#eee'}} navBarButtonColor='#eee' navigationBarStyle={{backgroundColor:'#444'}} headerMode='float'/>

          <Scene key='Message' component={Message} title="关联发货单" titleStyle={{color:'#eee'}} navBarButtonColor='#eee' navigationBarStyle={{backgroundColor:'#444'}} headerMode='float'/>
	    </Scene>
    </Router>
    );
  }
}
const styles={

}
export default Route

