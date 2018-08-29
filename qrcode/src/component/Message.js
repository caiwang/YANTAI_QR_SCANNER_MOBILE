import React,{component,PropTypes} from 'react'
import { View,Text,TextInput,Image,ImageBackground,Dimensions,Button,ScrollView,AsyncStorage,Modal} from 'react-native';
import { Actions,Alert } from 'react-native-router-flux';
import axios from 'axios';
import {url} from '../config';
import Loading from './Loading';
class Message extends React.Component{
    constructor(props) {
      super(props);
      this.state={
        arrlist:[],
        wuliaobianhao:'',
        wuliaomiaoshu:'',
        saomiaogeshu:'',
        modalVisible:false,
        CodeListst:[],
        loading:true,
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
        ShippingDescribe:''
       
      };
    }
    componentDidMount(){
      this.setState({
              no:this.props.listindex.no,
              InvoiceTime :this.props.listindex.invoiceTime,
              orderNo:this.props.listindex.orderNo,
              OrderTime:this.props.listindex.orderTime,
              CustomerNo:this.props.listindex.customerNo,
              DealerName:this.props.listindex.dealerName,
              DealerPostcord :this.props.listindex.dealerPostcord,
              DealerPlace:this.props.listindex.dealerPlace,
              ShipmentMode:this.props.listindex.shipmentMode,
              DeliveryMode:this.props.listindex.deliveryMode,
              PlateNumber:this.props.listindex.plateNumber,
              DriverName:this.props.listindex.driverName,
              DriverPhoneNo:this.props.listindex.driverPhoneNo,


              // ShippingProject:this.props.listindex.invoiceShipmentList[0].project,
              // ShippingMaterials:this.props.listindex.invoiceShipmentList[0].materialNo,
              // ShippingNumber:this.props.listindex.invoiceShipmentList[0].quantity,
              // ShippingDescribe:this.props.listindex.invoiceShipmentList[0].describe,
              CodeListst:this.props.arrcodelist,
          })
            alert(this.props.listindex.invoiceShipmentList)
    }
    finish(){
      let data={
       CodeList:this.state.CodeListst,
      }
      
      axios.post(`${url}/Invoice/GetCategoryByCode`,data)
      .then(res=>this.finishok(res))
      .catch(err=>console.log(err))
    }
    finishok(res){
      let arr=res.data;
      // console.log(res.data);
      // let arr=[
      // {materialNo: "101904", describe: "BB 34-0-16 40 普 N-K1", manufacturer: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgA…P2bF3ntik+c9xjjQw/wdOG7YacQiXbAAAAABJRU5ErkJggg==", manufacturerNo: 4, yieldly: null,id:904},
      // {materialNo: "101902", describe: "BB 34-0-16 40 普 N-K2", manufacturer: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgA…P2bF3ntik+c9xjjQw/wdOG7YacQiXbAAAAABJRU5ErkJggg==", manufacturerNo: 2, yieldly: null,id:902},
      // {materialNo: "101901", describe: "BB 34-0-16 40 普 N-K1", manufacturer: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgA…P2bF3ntik+c9xjjQw/wdOG7YacQiXbAAAAABJRU5ErkJggg==", manufacturerNo: 1, yieldly: null,id:901},
      // {materialNo: "101903", describe: "BB 34-0-16 40 普 N-K3", manufacturer: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgA…P2bF3ntik+c9xjjQw/wdOG7YacQiXbAAAAABJRU5ErkJggg==", manufacturerNo: 3, yieldly: null,id:903},
      // {materialNo: "101902", describe: "BB 34-0-16 40 普 N-K1", manufacturer: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgA…P2bF3ntik+c9xjjQw/wdOG7YacQiXbAAAAABJRU5ErkJggg==", manufacturerNo: 1, yieldly: null,id:902}
      // ];
      let newarr=[];
      function sortId(a,b){  
        return a.id-b.id  
      }
      arr.sort(sortId);
      console.log(res.data);
      
      for (let i = 0; i < arr.length;) {
        let count = 0;
        for (let j = i; j < arr.length; j++) {
          if (arr[i].id === arr[j].id) {
            count++;
          }
        }
        newarr.push({
          date: arr[i],
          count: count
        })
        i+=count;
      }
      console.log(newarr);
      this.setState({
        count:arr.length,
        modalVisible:true,
        arrlist:newarr
      })
      // console.log(this.state.arrlist)
    

    }
    close(){
      this.setState({
        modalVisible:false
      })
      // this.props.arrcodelist
      // this.props.ididid
      let data={
       CodeList:this.props.arrcodelist,
       id:this.props.ididid
      }
      axios.post(`${url}/Invoice/UpdateQRCode`,data)
      .then(res=>alert('关联成功'))
      .catch(err=>console.log(err))
    }

  render(){
    return(       
      <ScrollView style={styles.flexbox}>
      
            {/*<View style={styles.itemss}>
                <Text style={styles.fontwidth}>已读取二维码个数</Text>
                <Text style={styles.fontwidth}> 

                </Text>
            </View>
            */} 
            <View>
              <View style={styles.items}><Text style={styles.fontwidths}>交货单号</Text><Text style={styles.inputwidth}>
                  {this.state.no}
              </Text></View>
              <View style={styles.items}><Text style={styles.fontwidths}>发货时间</Text><Text style={styles.inputwidth}>
                  {this.state.InvoiceTime}
              </Text></View>
              <View style={styles.items}><Text style={styles.fontwidths}>订单号</Text><Text style={styles.inputwidth}>
                  {this.state.orderNo}
              </Text></View>
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
              <View style={styles.items}><Text style={styles.fontwidths}>车牌号</Text><Text style={styles.inputwidth}>
                  {this.state.PlateNumber}
              </Text></View>
              <View style={styles.items}><Text style={styles.fontwidths}>司机名</Text><Text style={styles.inputwidth}>
                  {this.state.DriverName }
              </Text></View>
               <View style={styles.items}><Text style={styles.fontwidths}>司机电话</Text><Text style={styles.inputwidth}>
                  {this.state.DriverPhoneNo }
              </Text></View>
            {/*
              <View style={styles.items}><Text style={styles.fontwidths}>装运项目</Text><Text style={styles.inputwidth}>
                  {this.state.ShippingProject}
              </Text></View>
              <View style={styles.items}><Text style={styles.fontwidths}>装运物料</Text><Text style={styles.inputwidth}>
                  {this.state.ShippingMaterials}
              </Text></View>
              <View style={styles.items}><Text style={styles.fontwidths}>装运数量</Text><Text style={styles.inputwidth}>
                  {this.state.ShippingNumber}
              </Text></View>
              <View style={styles.items}><Text style={styles.fontwidths}>装运物料描述</Text><Text style={styles.inputwidth}>
                  {this.state.ShippingDescribe}
              </Text></View>
              */}
            </View>

            {/*<View style={styles.adminn}>
              <View style={styles.adminbtnn}>
                <Button title="取消关联" color="#4ea3f1" onPress={()=>alert('好喜欢你')}>取消关联</Button>
              </View>
            </View>
            */}

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
                  {
                    this.state.arrlist.map((item,index)=>{
                    return (
                    <View style={styles.viewmodalbody} key={index}>
                      <Text style={styles.viewmodalbodytext} numberOfLines={2}>编号{item.date.materialNo}</Text>
                      <Text style={styles.viewmodalbodytext} numberOfLines={2}>描述{item.date.describe}</Text>
                      <Text style={styles.viewmodalbodytext} numberOfLines={2}>已扫{item.count}</Text>
                    </View>
                    )
                  })

                  }
                  

                  <View style={styles.viewmodalfoot}>
                    <Text  onPress={this.close.bind(this)} style={styles.viewmodalfoottext}>确定关联</Text>
                  </View>

                </View>
              </View>  
          </Modal>


            <View style={styles.adminn}>
              <View style={styles.adminbtnn}>
                <Text  style={{color:'#fff',fontSize:18}} onPress={this.finish.bind(this)}>确定完成</Text>
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
      marginTop:15
    },
     items:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      height:0.1*height
    },
     fontwidth:{
      width:0.4*width,
      fontSize:16,
      textAlign:'left'
    },
     fontwidths:{
      width:0.3*width,
      fontSize:16,
      textAlign:'left'
    },
    inputwidth:{
      width:0.55*width,
      borderBottomWidth:1,
      borderBottomColor:'#aaa'
    },
    adminn:{
    width:width,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:30
    },
    adminbtnn:{
      justifyContent:'center',
      alignItems:'center',
      width:0.4*width,
      height:0.1*height,
      borderRadius:8,
      backgroundColor:'#4ea3f1'
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
    viewmodalheadertext:{
    fontSize:16,
    fontWeight: 'bold',
    color:'#fff'
    },
    viewmodalbody:{
    flexDirection:'row',
    alignItems:'center',
    width:width,
    marginTop:0.05*height
    },
    viewmodalbodytext:{
    fontSize:15,
    color:'#fff',
    marginLeft:5
    },
    viewmodalfoot:{
    alignItems:'center',
    justifyContent:'center',
    height:0.1*height,
    width:0.4*width,
    backgroundColor:'#4ea3f1',
    position:'absolute',
    top:0.85*height,
    borderRadius:15
    },
    viewmodalfoottext:{
      fontSize:18,
      color:'#fff',
      fontWeight:'bold'
    }
 
  
}

export default Message







