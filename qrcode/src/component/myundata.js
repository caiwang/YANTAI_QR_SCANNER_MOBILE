import React,{component,PropTypes} from 'react'
import {Modal,View,Text,TextInput,Image,ImageBackground,Dimensions,Button,ScrollView,NativeModules, DeviceEventEmitter,AsyncStorage,Alert} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import {url} from '../config';
import CheckBox from 'react-native-checkbox';
import Loading from './Loading';
import Sound from 'react-native-sound';

let demoAudio = require('./112.m4a');//支持众多格式
let message=''
let tijiaomessage=''
let chexiaozuihoumessage=''
let zhuanyizuihoumessage=''
//let listener
const scanToastAndroid = NativeModules.ScanToastAndroid;
class myundata extends React.Component{
    constructor(props) {
      super(props);
      this.state={
        Loading:false,
        modalVisiblemydata:false,
        GetListByUserInfoIDlists:[],
        newID:'',
        SCANSs:'',
        zhuanyizuihouyigee:false,
        alert:'',
        modalheight:1,
        nheight:22,
        CodeList:'', 
        newCodeList:'',
        invoiceShipmentList:'',
        count:0,
        countcounts:0,
        

        obj: '',
        pinleizhiliang:[],
        zongzhiliang:0,
        modalVisible:false,

        no :'',
        InvoiceTime :'',
        orderNo:'',
        OrderTime:'',
        CustomerNo:'',
        DealerName:'',
        DealerPostcord :'',
        DealerPlace:'',
        ShipmentMode:'',
        DeliveryMode:'',
        PlateNumber:[],
        DriverName:'',
        DriverPhoneNo:'',
        ShippingProject:'',
        ShippingMaterials:'',
        ShippingNumber:'',
        ShippingDescribe:'',
        fendai:'',
        zongdaishu:''
      };
    }
    
    componentWillUnmount(){
      this.listener.remove()
      //alert('我的未完成1')
    }
 
     async componentDidMount(){
      
      //alert('我的未完成2')
      this.setState({
        Loading:false,
      })
      axios.get(`${url}/Invoice/get/${this.props.fahuodanid}`)
      .then(res=>{
        //alert('componentDidMount12')
        //alert(res.data.data.memo)
        this.setState({
        CodeList:res.data.data.codeList,
        invoiceShipmentList:res.data.data.invoiceShipmentList,
        count:res.data.data.codeList.length,
        countcounts:res.data.data.groupNoList.length,
        no:res.data.data.no,
        InvoiceTime:res.data.data.invoiceTime,
        orderNo:res.data.data.orderNo,
        OrderTime:res.data.data.orderTime,
        CustomerNo:res.data.data.customerNo,
        DealerName:res.data.data.dealerName,
        DealerPostcord:res.data.data.dealerPostcord,
        DealerPlace:res.data.data.dealerPlace,
        ShipmentMode:res.data.data.shipmentMode,
        DeliveryMode:res.data.data.deliveryMode,
        PlateNumber:res.data.data.plateNumber,
        DriverName:res.data.data.driverName,
        DriverPhoneNo:res.data.data.driverPhoneNo,
        fendai:res.data.data.memo,
        zongdaishu:res.data.data.quantity
      });
     
    })
      .catch(err=>{
        Alert.alert(
          '提示',
          '您的网络不好',
          [
            // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: '确定', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      });
      //alert(111111)
      //alert('此发货单进行了部分扫描，按下F5继续扫描')
      // if (Actions.state.index==2) {
        this.listener=DeviceEventEmitter.addListener('EventName', (res) => {
          //alert('我的未完成3')
          
            let countss=new Array();
            this.setState({ obj: res });
            let scanres=this.state.obj.SCAN;
                countss.push(scanres);
            let countssets=new Set(countss);
            let countarrays=Array.from(countssets);
            let newcountarrays=countarrays;            
            // this.setState({ SCANSs: newcountarrays });
            if (newcountarrays.length==0) {
              this.setState({
                alert:'没有二维码'
              })              
              return false;
            }else{

            //   this.setState({
            //   alert:'扫到二维码',
            //   CodeList:newcountarrays
            //  })

            let qr="";
              let qrcodeTime="";
              AsyncStorage.getItem('qrcodeTime',(error,tm)=>{
                if(tm){
                  qrcodeTime=tm; 
                }
              })
              AsyncStorage.getItem('qr',(error,qrc)=>{
                if(qrc){
                  qr=qrc; 
                }
              })
              if(qr==""||qr!=newcountarray){
                  AsyncStorage.setItem('qrcode',newcountarray,(e)=>{})//存记录
                  AsyncStorage.setItem('qrcodeTime',(new Date().getTime()),(er)=>{})
                  console.log("qrcode"+newcountarray);
                  console.log("qrcodeTime"+new Date().getTime());
                  this.sendQrcode(newcountarray);
              }else if(qr==newcountarray){
                let ctime=new Date().getTime();
                if(ctime-qrcodeTime>3000){
                  this.sendQrcode(newcountarray);
                }
              }


            
              }
            
            
        });
      // };
      

         if(this.state.invoiceShipmentList==null||this.state.invoiceShipmentList=="") {
              this.setState({
                nheight:22
              })
         }else{
          this.setState({
                nheight:this.state.invoiceShipmentList.length*10+22
              })
         }

      }

     sendQrcode(qrcode){
      let data={
        CodeList:qrcode,
        id:this.props.fahuodanid,
        userInfoID:this.props.userInfoIDD,
        //id:this.props.fayundanID
       }
       //alert(this.props.fahuodanid)

      //if(this.state.CodeList.length==1&&data!=null){
        
            axios.post(`${url}/Invoice/UpdateQRcode`,data)
               .then(res=>{  
                   let abc=res.data.message
                   switch(abc){
                     case "网兜扫描成功":message='网兜扫描成功';break;
                     case "此交货单没有装运物料！":message='此交货单没有装运物料！';break;
                     case "此二维码不存在！":message='此二维码不存在！';break;
                     case "网兜重复扫描！":message='网兜重复扫描！';break;
                     case "网兜已被扫描！":message='网兜已被扫描！';break;
                     case "该品类已经发运完成，请勿多扫！":message='该品类已经发运完成，请勿多扫！';break;
                     case "该订单装运项目已经发运完成！":message='该订单装运项目已经发运完成！';break;
                     case "此网兜所属物料与交货单的装运项目不符！":message='此网兜所属物料与交货单的装运项目不符！';break;

                   } 
                 
                 
                 
                   if(message=="网兜扫描成功" || message=="该订单装运项目已经发运完成！"){
                       
                         //提示音
                         const s = new Sound(demoAudio, (e) => {
                             if (e) {
                                 console.log('播放失败');
                                 return;
                             }
                             s.play(() => s.release());
                         });

                         //提示弹窗
                         
                           Alert.alert(
                               '提示',
                               message,
                               [
                                 // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                                 // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                 {text: '确定', onPress: () => console.log('OK Pressed')},
                               ],
                               { cancelable: false }
                             )
                             
                       
                 
                     }else{
                           //提示弹窗
                           if(message!=""){
                             Alert.alert(
                                 '提示',
                                 message,
                                 [
                                   // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                                   // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                   {text: '确定', onPress: () => console.log('OK Pressed')},
                                 ],
                                 { cancelable: false }
                               )
                             }
                             
                     }
                       this.setState({
                           count:res.data.invoice.codeList.length==0?0:res.data.invoice.codeList.length,
                           countcounts:res.data.invoice.groupNoList.length==0?0:res.data.invoice.groupNoList.length
                       })
                      

                  }
             )
             .catch(err=>{
               //alert(error)
              //  Alert.alert(
              //    '提示',
              //    '您的网络不好1111',
              //    [
              //      // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              //      // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              //      {text: '确定', onPress: () => console.log('OK Pressed')},
              //    ],
              //    { cancelable: false }
              //  )
             })
           
           //}
      //  }else{
      //    alert('未扫到二维码')
      //  }
     }


      myundataUpdateQRcode(){
        axios.get(`${url}/Invoice/get/${this.props.fahuodanid}`)
      .then(res=>{
        //alert(res.data.data.memo)
        this.setState({
        
        count:res.data.data.codeList.length,
        countcounts:res.data.data.groupNoList.length
      });})
      .catch(err=>{
        Alert.alert(
          '提示',
          '您的网络不好',
          [
            // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: '确定', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      });
      }


      myundatasx(){
        this.setState({
          Loading:true
        })
      axios.get(`${url}/Invoice/get/${this.props.fahuodanid}`)
      .then(res=>{
        //alert(res.data.data.memo)
        this.setState({
        Loading:false,
        CodeList:res.data.data.codeList,
        invoiceShipmentList:res.data.data.invoiceShipmentList,
        count:res.data.data.codeList.length,
        countcounts:res.data.data.groupNoList.length,
        no:res.data.data.no,
        InvoiceTime:res.data.data.invoiceTime,
        orderNo:res.data.data.orderNo,
        OrderTime:res.data.data.orderTime,
        CustomerNo:res.data.data.customerNo,
        DealerName:res.data.data.dealerName,
        DealerPostcord:res.data.data.dealerPostcord,
        DealerPlace:res.data.data.dealerPlace,
        ShipmentMode:res.data.data.shipmentMode,
        DeliveryMode:res.data.data.deliveryMode,
        PlateNumber:res.data.data.plateNumber,
        DriverName:res.data.data.driverName,
        DriverPhoneNo:res.data.data.driverPhoneNo,
        fendai:res.data.data.memo,
        zongdaishu:res.data.data.quantity
      });})
      .catch(err=>{
        Alert.alert(
          '提示',
          '您的网络不好',
          [
            // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: '确定', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      });
      }
   deletecode(){     
      axios.get(`${url}/invoice/DeleteCodeByUserinfoID?id=${this.props.fayundanID}&userinfoID=${this.props.renyuandengluid}`)
      .then(res=>{
        if(res.data.codeList.length==0 && res.data.groupNoList.length==0){
          this.setState({
            count:0,
            countcounts:0,
            alert:'没有二维码',
            CodeList:''
          })
          Alert.alert(
            '提示',
            '取消完成',
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: '确定', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
          }else{
            Alert.alert(
              '提示',
              '取消失败',
              [
                // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: '确定', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: false }
            )
          }
      })
      .catch(err=>console.log(' '))
    }
    
    
    finish(){
        let zongzhiliang=0;
        this.setState({
        modalVisible:true
        })
        let data={
            // CodeList:this.state.CodeList
            id:this.props.fahuodanid
          }
          axios.post(`${url}/invoice/GetGroupByID`,data)
            .then(res=>{this.setState({pinleizhiliang:res.data.data});
              // for (let i=0;i<res.data.length;i++) {zongzhiliang+=res.data[i].rule*100/100};
              this.setState({zongzhiliang:res.data.quantity});
              // if (res.data.length<5) {
              //   this.setState({modalheight:1})
              // }else if(5<res.data.length<10){
              //   this.setState({modalheight:2})
              // }else if(10<res.data.length<15){
              //   this.setState({modalheight:3})
              // }
          })
            .catch(err=>{
              Alert.alert(
                '提示',
                '您的网络不好',
                [
                  // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                  // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: '确定', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )
            })
        
    }

    quedingtijiao(){
      this.setState({
        modalVisible:false
      })
      
      if(this.props.ID==3){
        // alert(this.props.fahuodanid)
            axios.get(`${url}/Invoice/AddFlagLimit?id=${this.props.fahuodanid}&userInfoID=${this.props.userInfoIDD}`)
            .then(res=>{

              let abc=res.data.message
              switch(abc){
                case "此交货单已经发运完成，请勿重新提交！":tijiaomessage='此交货单已经发运完成，请勿重新提交！';break;
                case "数量不符，不能提交！":tijiaomessage='数量不符，不能提交！';break;
                case "提交失败":tijiaomessage='提交失败';break;
                case "提交的交货单没有物料！":tijiaomessage='提交的交货单没有物料！';break;
                case "提交成功":tijiaomessage='提交成功';break;
                

              }

                  Alert.alert(
                  '提示',
                  tijiaomessage,
                  [
                    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: '确定', onPress: () => console.log('OK Pressed')},
                  ],
                  { cancelable: false }
                )
              
            })
            .catch(err=>{
              Alert.alert(
                '提示',
                '您的网络不好',
                [
                  // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                  // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: '确定', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )
            })
      }else if(this.props.ID==2){
        //alert(2222)
        //alert(this.props.IDdweiwancheng)
        axios.get(`${url}/Invoice/AddFlag?id=${this.props.fahuodanid}`)
        .then(res=>{

          //alert(res)
          if(res.data==true){
              Alert.alert(
                '提示',
                '提交完成',
                [
                  // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                  // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: '确定', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )
            }else{
             
              Alert.alert(
                '提示',
                '提交失败',
                [
                  // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                  // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: '确定', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )
            }
        })
        .catch(err=>{
          Alert.alert(
            '提示',
            '您的网络不好',
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: '确定', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
        })
      }
    }

    close(){
      this.setState({
        modalVisible:false
      })
      
    }

    onPressLearnMore(){
      //alert(1)
      if(this.state.fendai.trim()!=''){
        //alert(2)
        let data={
          id:this.props.fahuodanid,
          memo:this.state.fendai,
        }
        axios.post(`${url}/invoice/QuantitySum`,data)
          .then(res=>this.setState({
            zongdaishu:res.data.quantity
          })
          ).catch(err=>alert(err))
      }
      
    }


// 撤销最后一兜
    chexiaozuihouyigee(){
      let data={
        UserInfoID:this.props.userInfoIDD,
        id:this.props.fahuodanid
      }
       axios.post(`${url}/invoice/TransferGroupNo`,data)
        .then(res=>{
          if(res.data.result==true){
            chexiaozuihoumessage="撤销最后一兜成功！"
            Alert.alert(
              '提示',
              chexiaozuihoumessage,
              [
                // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: '确定', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: false }
            )
            this.setState({
                // count:this.state.count-1,
                countcounts:this.state.countcounts-1,
                zhuanyizuihouyigee:false
              }) 
          }else{
            chexiaozuihoumessage="此发货单下没有网兜，无法撤销！"
            chexiaozuihoumessage="此理货员名下没有网兜，无法撤销！"
            chexiaozuihoumessage="撤销最后一兜失败！"
            Alert.alert(
              '提示',
              chexiaozuihoumessage,
              [
                // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: '确定', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: false }
            )
          }
        })
        .catch(err=>{
          Alert.alert(
            '提示',
            '您的网络不好',
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: '确定', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
        })
    }
// 撤销某一兜
    chexiaomouyigee(){
        // Subscription.remove()
       let myundataid=this.props.listindex.id;
       let myundatauserInfoID=this.props.userInfoIDD;
        Actions.chexiaomouyigee({myundataid,myundatauserInfoID})
      // let data={
      //   userInfoID:this.props.userInfoIDD,
      //   id:this.props.listindex.id,
      //   revokeQRCode:this.state.SCANSs.toString()
      // }
      //  axios.post(`${url}/invoice/RevokeQRCode`,data)
      //   .then(res=>{
      //     if (res.data.result==true) {
      //       alert(res.data.message);
      //       this.setState({
      //           // count:this.state.count-1,
      //           countcounts:this.state.countcounts-1,
      //           zhuanyizuihouyigee:false
      //         }) 
      //     }else{
      //       alert(res.data.message);
      //     }          
      //   })
      //   .catch(err=>{console.log(' ')})
    }
// 转移最后一个 弹出list列表
    zhuanyizuihouyigee(){
      this.setState({
        zhuanyizuihouyigee:true
      })
      let data={
        userInfoID:this.props.userInfoIDD
      }
      axios.post(`${url}/invoice/GetListByUserInfoID`,data)
        .then(res=>{
          this.setState({
            GetListByUserInfoIDlists:res.data
          })
        })
        .catch(err=>{
          Alert.alert(
            '提示',
            '您的网络不好',
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: '确定', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
        })
    }

    checkboxxx(index,item){
        // let checkboxxxid=this.state.GetListByUserInfoIDlists[index].id;
        // let userInfoID=this.props.userInfoIDD;
        // let id=this.props.listindex.id;
        // alert([checkboxxid,id,userInfoID])
        let data={
          userInfoID:this.props.userInfoIDD,
          id:this.props.listindex.id,
          newID:this.state.GetListByUserInfoIDlists[index].id
        }
        axios.post(`${url}/invoice/TransferGroupNo`,data)
        .then(res=>{
          if (res.data.result==true) {
              
            zhuanyizuihoumessage="转移最后一兜成功！"
            Alert.alert(
              '提示',
              zhuanyizuihoumessage,
              [
                // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: '确定', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: false }
            )
               this.setState({
                // count:this.state.count-1,
                countcounts:this.state.countcounts-1,
                zhuanyizuihouyigee:false
              }) 
          }else{
            zhuanyizuihoumessage="此单没有最后一兜，无法转移！"
            zhuanyizuihoumessage="此理货员名下没有最后一兜，无法转移！"
            zhuanyizuihoumessage="新交货单已经发运，无法转移！"
            zhuanyizuihoumessage="新交货单没有发运物料信息！"
            zhuanyizuihoumessage="最后一个网兜没有二维码信息！"
            zhuanyizuihoumessage="最后一个网兜物料与新交货单不符！"
            zhuanyizuihoumessage="转移最后一兜失败！"

            Alert.alert(
              '提示',
              zhuanyizuihoumessage,
              [
                // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: '确定', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: false }
            )
          }
        })
        .catch(err=>console.log(err))
    }
    quxiaozhuanyi(){
      this.setState({
        zhuanyizuihouyigee:false
      })
    }
    quedingzhuanyi(){
        this.setState({
          zhuanyizuihouyigee:false
        })
    }
  render(){
    
    //alert('我的未完成')

    let jisuandaishu=<View>
                        <View style={{display:'flex',flexDirection:'row', justifyContent:'space-around'}}>
                          <TextInput
                            style={{width:width-120,borderColor:'#aaa',borderWidth:1,marginTop:20,fontSize:20,marginLeft:10,lineHeight:50}}
                            value={this.state.fendai}
                            underlineColorAndroid='transparent'
                            autoFocus={false}
                            multiline = {true}
                            keyboardType='numeric'
                            placeholder="请输入袋数,以‘+’分隔"
                            onChangeText={(text) => this.setState({fendai:text})}
                          />
                          <View style={{width:80,height:50,marginTop:20,fontSize:26}}>
                            <Button
                            style={{height:50,lineHeight:50,height:50}}
                              onPress={this.onPressLearnMore.bind(this)}
                              title="计算"
                              color="#aaa"
                              accessibilityLabel="Learn more about this purple button"
                            />
                          </View>
                        </View>
                        <View>
                          <Text style={{fontSize:20,marginTop:20,marginLeft:20}}>总袋数：{this.state.zongdaishu}</Text>
                        </View>
                        
                        
                    </View>
    return(
      <ScrollView style={styles.flexbox}>
      {
        this.state.Loading==true?<Loading/>:
        <ImageBackground style={{width:width}} source={require('../img/back.jpg')} resizeMode='cover' opacity={1}>
            <View style={styles.itemss}>
                <Text style={{width:0.35*width,fontSize:25,textAlign:'center'}}>二维码数</Text>
                <Text style={{width:0.15*width,fontSize:25,textAlign:'left',color:'#f00'}}>{this.state.count}</Text>
                 <Text style={{width:0.35*width,fontSize:25,textAlign:'center'}}>网兜数量</Text>
                <Text style={{width:0.15*width,fontSize:25,textAlign:'left',color:'#f00'}}>{this.state.countcounts}</Text>
            </View>

            {jisuandaishu}
             <View style={{width:width}}><Text style={{fontSize:30,color:"#f00",textAlign:'center'}}>{this.state.alert}</Text></View>
            <View>
            <View style={styles.itemss}>
                <Image source={require('../img/sx.png')} style={{width:30,height:30}}/>
                <Text style={{width:0.85*width,fontSize:24,textAlign:'center',color:'red'}} onPress={this.myundatasx.bind(this)}>撤销某一兜后请务必<Text style={{fontSize:30,textAlign:'center',color:'red'}}>点击这里</Text>进行刷新</Text>
            </View>
              <View style={styles.items}><Text style={styles.fontwidths}>交货单号</Text><Text style={styles.inputwidth}>
                  {this.state.no}
              </Text></View>
              <View style={styles.items}><Text style={styles.fontwidths}>发货时间</Text><Text style={styles.inputwidth}>
                  {this.state.InvoiceTime}
              </Text></View>
              <View style={styles.items}><Text style={styles.fontwidths}>订单号</Text><Text style={styles.inputwidth}>
                  {this.state.orderNo}
              </Text></View>
              {/*
              <View style={styles.items}><Text style={styles.fontwidths}>订单日期</Text><Text style={styles.inputwidth}>
                  {this.state.OrderTime}
              </Text></View>
              
              <View style={styles.items}><Text style={styles.fontwidths}>客户编号</Text><Text style={styles.inputwidth}>
                  {this.state.CustomerNo}
              </Text></View>
              <View style={styles.items}><Text style={styles.fontwidths}>经销商名称</Text><Text style={styles.inputwidth}>
                  {this.state.DealerName}
              </Text></View>
              <View style={styles.items}><Text style={styles.fontwidths}>经销商邮编</Text><Text style={styles.inputwidth}>
                  {this.state.DealerPostcord}
              </Text></View>
              <View style={styles.items}><Text style={styles.fontwidths}>经销商地址</Text><Text style={styles.inputwidth}>
                  {this.state.DealerPlace}
              </Text></View>
              <View style={styles.items}><Text style={styles.fontwidths}>装运方式</Text><Text style={styles.inputwidth}>
                  {this.state.ShipmentMode}
              </Text></View>
              <View style={styles.items}><Text style={styles.fontwidths}>交货方式</Text><Text style={styles.inputwidth}>
                  {this.state.DeliveryMode}
              </Text></View>
              */}


              <View style={styles.items}><Text style={styles.fontwidths}>车牌号</Text><Text style={styles.inputwidth}>
                  {this.state.PlateNumber}
              </Text></View>


              <View style={styles.items}><Text style={styles.fontwidths}>司机名</Text><Text style={styles.inputwidth}>
                  {this.state.DriverName }
              </Text></View>
               <View style={styles.items}><Text style={styles.fontwidths}>司机电话</Text><Text style={styles.inputwidth}>
                  {this.state.DriverPhoneNo }
              </Text></View>


              {
                (this.state.invoiceShipmentList==null||this.state.invoiceShipmentList=="")?
                <View style={{borderBottomWidth:1,borderBottomColor:'#ddd'}}>
                    <View style={styles.items}><Text style={styles.fontwidths}>装运项目</Text><Text style={styles.inputwidthcard}>
                    您没有填写
                    </Text></View>
                    <View style={styles.items}><Text style={styles.fontwidths}>装运物料</Text><Text style={styles.inputwidthcard}>
                    您没有填写
                    </Text></View>
                    <View style={styles.items}><Text style={styles.fontwidths}>装运数量</Text><Text style={styles.inputwidthcard}>
                    您没有填写
                    </Text></View>
                    <View style={styles.items}><Text style={styles.fontwidths}>装运物料描述</Text><Text style={styles.inputwidthcard}>
                    您没有填写
                    </Text></View>
                    </View>:this.state.invoiceShipmentList.map((item,index)=>{
                            return(
                            <View key={index} style={{borderBottomWidth:2,borderBottomColor:'#164d8d'}}>
                              <View style={styles.items}><Text style={styles.fontwidths}>装运项目</Text><Text style={styles.inputwidthcard}>
                              {item.project}
                              </Text></View>
                              <View style={styles.items}><Text style={styles.fontwidths}>装运物料</Text><Text style={styles.inputwidthcard}>
                              {item.materialNo}
                              </Text></View>
                              <View style={styles.items}><Text style={styles.fontwidths}>装运数量</Text><Text style={styles.inputwidthcard}>
                              {item.quantity}  
                              </Text></View>
                              <View style={styles.items}><Text style={styles.fontwidths}>装运物料描述</Text><Text style={styles.inputwidthcard}>
                              {item.describe}  
                              </Text></View>
                            </View>
                            )
                          })
              }

              
            </View>
            
              <View style={styles.adminnmargin}>
                
            </View>
            {
              this.state.countcounts>0?
              <View>
                <View style={styles.adminn}>
                  <Text style={styles.adminbtnntext} onPress={this.chexiaozuihouyigee.bind(this)}>撤销最后一兜</Text>
                </View>
                {/* <View style={styles.adminn}>
                    <Text style={styles.adminbtnntext} onPress={this.chexiaomouyigee.bind(this)}>撤销某一兜</Text>
                </View> */}
                <View style={styles.adminn}>
                    <Text style={styles.adminbtnntext} onPress={this.zhuanyizuihouyigee.bind(this)}>转移最后一兜</Text>
                </View>
              </View>:null
            }
            {/* <View style={styles.adminn}>
                <Text style={styles.adminbtnntext} onPress={this.deletecode.bind(this)}>取 消 关 联</Text>
            </View> */}

            <View style={styles.adminn}>
                <Text style={styles.adminbtnntext} onPress={this.finish.bind(this)}>确 定 完 成</Text>
            </View>


            <Modal
                  animationType='slide'
                  transparent={true}
                  visible={this.state.modalVisible} 
                  onRequestClose={()=>{console.log(' ')}}
            >
              <View style={styles.modal}>
                <View style={styles.viewmodal}>

                  <View style={styles.viewmodalheader}>
                    <Text style={styles.viewmodalheadertext}>扫描结果如下</Text>
                  </View>              
                  <View style={{height:0.6*height,backgroundColor:'#000'}}>
                  <ScrollView style={{backgroundColor:'#000'}}>
            
                 {
                              this.state.pinleizhiliang.map((item,index)=>{
                              return (
                              <View style={styles.viewmodalbody} key={index}>
                                <Text style={styles.viewmodalbodytext} numberOfLines={2}>品类{item ? (item.category ? (item.category.describe ? item.category.describe :'') : '') :''}</Text>
                                <Text style={styles.viewmodalbodytext} numberOfLines={2}>质量{item.rule ? item.rule :''}</Text>
                                <Text style={styles.viewmodalbodytext} numberOfLines={2}>人员{item.userInfoName ? item.userInfoName :''}</Text>
                              </View>
                              )
                            })
                              
                            }
                 
                  </ScrollView>
                  </View>
                  <View style={{alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:'#fff',fontSize:23}}>总 质 量：{this.state.zongzhiliang}</Text>
                  </View>

                  <View style={styles.viewmodalfoot}>
                    <Text  onPress={this.quedingtijiao.bind(this)} style={styles.viewmodalfoottext}>提 交</Text>
                    <Text  onPress={this.close.bind(this)} style={styles.viewmodalfoottext}>取 消</Text>
                  </View>

                </View>
              </View>  
          </Modal>

          <Modal
                  animationType='slide'
                  transparent={true}
                  visible={this.state.zhuanyizuihouyigee}
                  onRequestClose={()=>{console.log(' ')}}
            >
            <ScrollView style={{backgroundColor:'#fff',flex:1}}>
            <View style={{width:width,flexDirection:'row',justifyContent:"center",alignItems:'center'}}>
              <Text style={{color:'red',fontSize:27}}>进行勾选转移前，请您务必仔细查看发货单号！避免转移错误</Text>
            </View>
           {
                this.state.GetListByUserInfoIDlists==[]?<Text>空</Text>:this.state.GetListByUserInfoIDlists.map((item,index)=>{
                  return(
                  <View style={styles.items} key={index}>
                      <CheckBox
                          label=''
                          checkboxStyle={{width:30,height:30,borderColor:'#4ea3f1'}}
                          onChange={this.checkboxxx.bind(this,index,item)}
                          >
                      </CheckBox>
                          <Text style={styles.font}  numberOfLines={2}>{index+1}.车牌{item.plateNumber}订单{item.no}</Text>
                  </View>
                  )
                })
              }
            
            <View style={styles.adminn}>
                <Text style={styles.adminbtnntext} onPress={this.quxiaozhuanyi.bind(this)}>取消转移</Text>
            </View>

            <View style={styles.adminn}>
                <Text style={styles.adminbtnntext} onPress={this.quedingzhuanyi.bind(this)}>关闭</Text>
            </View>
            
            </ScrollView> 
               
          </Modal>
      </ImageBackground> 
      }
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
      marginTop:15
    },
     items:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      height:0.1*height
    },
     fontwidths:{
      width:0.35*width,
      fontSize:23,
      textAlign:'left',
      color:'#164d8d'
    },
    inputwidth:{
      width:0.55*width,
      fontSize:23,
      color:'#164d8d'
    },
    inputwidthcard:{
      fontSize:23,
      width:0.55*width,
      color:'#164d8d'
    },
    adminnmargin:{
      marginTop:30
    },
    adminn:{
    width:width,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:30,

    },
    adminbtnntext:{
     fontSize:23,
     color:'#fff',
     backgroundColor:'#4ea3f1',
     borderRadius:15,
     paddingTop:25,
     paddingBottom:25,
     paddingLeft:70,
     paddingRight:70

  },
  modal:{
    width:width,
    height:height,
    backgroundColor:'#000',
    opacity:0.9
    },
    viewmodal:{
    width:width,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
    },
    viewmodalheader:{
    alignItems:'center',
    width:width    
    },
    scrollview:{
       width:width,
        height:0.5*height
    },
    viewmodalheadertext:{
    fontSize:23,
    fontWeight: 'bold',
    color:'#fff',
    marginTop:0.05*height
    },
    viewmodalbody:{
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    width:width,
    marginTop:0.02*height
    },
    viewmodalbodytext:{
    fontSize:23,
    color:'#fff',
    marginLeft:5,
    
    },
    viewmodalfoot:{
      width:width,
    display:'flex',
    flexDirection:'row',
    //alignItems:'center',
    //justifyContent:'center',
    // position:'absolute',
    // top:0.75*height,
    marginTop:10,
    justifyContent:"space-between"
    },
    viewmodalfoottext:{
      
      backgroundColor:'#4ea3f1',
      paddingRight:20,
      paddingLeft:20,
      paddingBottom:25,
      paddingTop:25,
      fontSize:23,
      color:'#fff',
    },
    font:{
      width:0.85*width,
      fontSize:27,
      color:'#555'
    }
 
  

}

export default myundata







