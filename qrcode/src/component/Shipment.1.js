import React,{component,PropTypes}from 'react'
import {AppState,View,Text,TextInput,Image,ImageBackground,Dimensions,Button,ScrollView,Modal,Alert} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import {url} from '../config';
import Loading from './Loading';
import SideMenu from 'react-native-side-menu';
import CheckBox from 'react-native-checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';

class Shipment extends React.Component{
    constructor(props) {
      super(props);
      this.state={
        all:0,
        wait:0,
        unfinish:0,
        finish:0,
        nodanzi:0,
        my:0,
        myun:0,
        loading:true,
        text:'',
        datalist:[],
        searchlist:[],
        mydatalistshow:false,
        myundatalistshow:false,
        searchlistshow:false,
        alldatalistshow:false,
        waitdatalistshow:true,
        unfinishdatalistshow:false,
        finishdatalistshow:false,
        finishcolor:'#444',
        selectionColor:true,
        nulldatalistshow:false,
        nheight:12,
        isOpen:false,
        sidewidth:50,
        checked:false,
        chuyunyuanlistdata:[],
        danjuzhuangtai:'daifayun',
        chuyunyuandaifayunshuliang:0,
        chuyunyuanweiwanchengshuliang:0,
        chuyunyuanyiwanchengshuliang:0,
        chuyunyuanquanbushuliang:0
      };
    }

    
   componentDidMount(){
    //alert(this.props.jiankong)
       this.setState({
        datalist:[],
        nheight:12,
        loading:true,
        isOpen:false
      })

      let ID=this.props.ID;
      let userInfoID=this.props.renyuandengluid;
      let timestamp = Date.parse(new Date());
      if(this.props.jiankong=='true'){
        //储运员获取发运单数量
          axios.get(`${url}/invoice/GetSum?id=${ID}&userInfoID=${userInfoID}`)
          .then(res=>{this.setState({
              chuyunyuandaifayunshuliang:res.data[1],
              chuyunyuanweiwanchengshuliang:res.data[2],
              chuyunyuanyiwanchengshuliang:res.data[3],
              chuyunyuanquanbushuliang:res.data[0]
            });
          })
          .catch(err=>console.log(err));


          //储运员获取待发运列表
          // let ID=this.props.ID;
          // let timestamp = Date.parse(new Date());
          axios.get(`${url}/invoice/GetListNoGroupSum?id=${ID}&&timestamp=${timestamp}`)
          .then(res=>{
            this.setState({
              loading:false,
              searchlistshow:false,
              waitdatalistshow:true,
              mydatalistshow:false,
              myundatalistshow:false,
              alldatalistshow:false,
              unfinishdatalistshow:false,
              finishdatalistshow:false,
              nulldatalistshow:false,
              //datalist:res.data,
              chuyunyuanlistdata:res.data
            });
            if (res.data.length>10) {this.setState({nheight:res.data.length})}else{this.setState({nheight:12})};})
          .catch(err=>console.log(err));
      }else{
          //理货员获取发运单数量 
          axios.get(`${url}/invoice/GetSumList?id=${ID}&&userInfoID=${userInfoID}`)
          .then(res=>{this.setState({
            all:res.data[0],
            wait:res.data[1],
            unfinish:res.data[2],
            finish:res.data[3],
            nodanzi:res.data[4],
            my:res.data[5],
            myun:res.data[6]
          });})
          .catch(err=>console.log(err));

          //理货员获取待发运列表
          // let ID=this.props.ID;
          // let timestamp = Date.parse(new Date());
          axios.get(`${url}/invoice/GetListNoGroup?id=${ID}&&timestamp=${timestamp}`)
          .then(res=>{
            this.setState({
              loading:false,
              searchlistshow:false,
              waitdatalistshow:true,
              mydatalistshow:false,
              myundatalistshow:false,
              alldatalistshow:false,
              unfinishdatalistshow:false,
              finishdatalistshow:false,
              nulldatalistshow:false,
              datalist:res.data,
              //chuyunyuanlistdata:res.data
            });
            if (res.data.length>10) {this.setState({nheight:res.data.length})}else{this.setState({nheight:12})};})
          .catch(err=>console.log(err));
      }
      

      
       
      
      
    }

    sx(){
      let renyuandengluid=this.props.renyuandengluid;
      let data={
          userInfoID:renyuandengluid
          }
        axios.post(`${url}/invoice/GetListNoGroupByUserInfoId`,data)
        .then(res=>{this.setState({loading:false,mydatalistshow:true,myundatalistshow:false,searchlistshow:false,alldatalistshow:false,waitdatalistshow:false,unfinishdatalistshow:false,finishdatalistshow:false,nulldatalistshow:false,datalist:res.data});if (res.data.length>10) {this.setState({nheight:res.data.length})}else{this.setState({nheight:12})};})
        .catch(err=>console.log(err))
    }

    wwcsx(){
      let renyuandengluid=this.props.renyuandengluid;
      let data={
          userInfoID:renyuandengluid
          }
        axios.post(`${url}/invoice/GetListGroupByUserInfoId`,data)
        .then(res=>{this.setState({loading:false,mydatalistshow:false,myundatalistshow:true,searchlistshow:false,alldatalistshow:false,waitdatalistshow:false,unfinishdatalistshow:false,finishdatalistshow:false,nulldatalistshow:false,datalist:res.data});if (res.data.length>10) {this.setState({nheight:res.data.length})}else{this.setState({nheight:12})};})
        .catch(err=>console.log(err))
    }


    
    onpress(){
      this.setState({
          isOpen: !this.state.isOpen
          })
      let ID=this.props.ID;
      let userInfoID=this.props.renyuandengluid;
      let timestamp = Date.parse(new Date());
      

      if(this.props.jiankong=='false'){
        axios.get(`${url}/invoice/GetSumList?id=${ID}&&userInfoID=${userInfoID}`)
            .then(res=>
              {this.setState({
                all:res.data[0],
                wait:res.data[1],
                unfinish:res.data[2],
                finish:res.data[3],
                nodanzi:res.data[4],
                my:res.data[5],
                myun:res.data[6],
              });
            })
            .catch(err=>console.log(err));
      }else{
        //储运员获取发运单数量
        axios.get(`${url}/invoice/GetSum?id=${ID}&userInfoID=${userInfoID}`)
        .then(res=>{this.setState({
            chuyunyuandaifayunshuliang:res.data[1],
            chuyunyuanweiwanchengshuliang:res.data[2],
            chuyunyuanyiwanchengshuliang:res.data[3],
            chuyunyuanquanbushuliang:res.data[0]
          });
        })
        .catch(err=>console.log(err));
      }
      
        
        //获取待发运
        axios.get(`${url}/invoice/GetListNoGroup?id=${ID}&&timestamp=${timestamp}`)
          .then(res=>{this.setState({
                          loading:false,
                          searchlistshow:false,
                          waitdatalistshow:true,
                          alldatalistshow:false,
                          mydatalistshow:false,
                          myundatalistshow:false,
                          unfinishdatalistshow:false,
                          finishdatalistshow:false,
                          nulldatalistshow:false,
                          datalist:res.data});
                          if (res.data.length>10) 
                            {this.setState({nheight:res.data.length})
                          }else{
                            this.setState({nheight:12})
                          };
                      })
          .catch(err=>console.log(err));
  
    }
    
    // 搜索模块
    sousuo(){
      if (this.state.text!='') {
        axios.get(`${url}/invoice/Query?query=${this.state.text}`)
        .then(res=>{this.setState({loading:false,searchlistshow:true,mydatalistshow:false,myundatalistshow:false,alldatalistshow:false,waitdatalistshow:false,unfinishdatalistshow:false,finishdatalistshow:false,nulldatalistshow:false,datalist:res.data});if (res.data.length>10) {this.setState({nheight:res.data.length})}else{this.setState({nheight:12})};})
        .catch(err=>console.log(err))
      }else{
        
        Alert.alert(
          '提示',
          '请你输入搜索内容',
          [
            // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: '确定', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      }
      
    }

    // 获取全部发货单data
    alldatalist(){
      this.setState({
        datalist:[],
        nheight:12,
        loading:true,
        isOpen:false
      })
      let ID=this.props.ID;
      let timestamp = Date.parse(new Date());
      axios.get(`${url}/invoice/GetListByCompanyID?id=${ID}&&timestamp=${timestamp}`)
      .then(res=>{this.setState({loading:false,mydatalistshow:false,myundatalistshow:false,searchlistshow:false,alldatalistshow:true,waitdatalistshow:false,unfinishdatalistshow:false,finishdatalistshow:false,nulldatalistshow:false,datalist:res.data});if (res.data.length>10) {this.setState({nheight:res.data.length})}else{this.setState({nheight:12})};})
      .catch(err=>console.log(err))
    }
    // 获取待发货单data
    waitdatalist(){
      this.setState({
        datalist:[],
        nheight:12,
        loading:true,
        isOpen:false
      })
      let ID=this.props.ID;
      let timestamp = Date.parse(new Date());
      axios.get(`${url}/invoice/GetListNoGroup?id=${ID}&&timestamp=${timestamp}`)
      .then(res=>{this.setState({loading:false,mydatalistshow:false,myundatalistshow:false,searchlistshow:false,waitdatalistshow:true,alldatalistshow:false,unfinishdatalistshow:false,finishdatalistshow:false,nulldatalistshow:false,datalist:res.data});if (res.data.length>10) {this.setState({nheight:res.data.length})}else{this.setState({nheight:12})};})
      .catch(err=>console.log(err))
    }
    // 获取未完成发货单data
    unfinishdatalist(){
      //alert(111111)
      this.setState({
        datalist:[],
        nheight:12,
        loading:true,
        isOpen:false
      })
      let ID=this.props.ID;
      let timestamp = Date.parse(new Date());
     // alert(ID)
      // axios.get(`${url}/invoice/GetListGroup?id=${ID}&&timestamp=${timestamp}`)
      // .then(res=>{this.setState({loading:false,mydatalistshow:false,myundatalistshow:false,searchlistshow:false,unfinishdatalistshow:true,waitdatalistshow:false,alldatalistshow:false,finishdatalistshow:false,nulldatalistshow:false,datalist:res.data});if (res.data.length>10) {this.setState({nheight:res.data.length})}else{this.setState({nheight:12})};})
      // .catch(err=>console.log(err))

      axios.get(`${url}/invoice/GetListGroupNoUser?id=${ID}&&timestamp=${timestamp}`)
      .then(res=>{
        console.log(res)
          this.setState({loading:false,mydatalistshow:false,myundatalistshow:false,searchlistshow:false,unfinishdatalistshow:true,waitdatalistshow:false,alldatalistshow:false,finishdatalistshow:false,nulldatalistshow:false,datalist:res.data});if (res.data.length>10) {this.setState({nheight:res.data.length})}else{this.setState({nheight:12})};})
      .catch(err=>alert(err))
    }
    // 获取完成发货单data
    finishdatalist(){
      this.setState({
        datalist:[],
        nheight:12,
        loading:true,
        isOpen:false
      })
      let ID=this.props.ID;
      let timestamp = Date.parse(new Date());
      //alert(ID)
      axios.get(`${url}/invoice/QueryFlagTrueByToday?companyID=${ID}&&timestamp=${timestamp}`)
      .then(res=>{this.setState({loading:false,mydatalistshow:false,myundatalistshow:false,searchlistshow:false,finishdatalistshow:true,unfinishdatalistshow:false,waitdatalistshow:false,alldatalistshow:false,nulldatalistshow:false,datalist:res.data});if (res.data.length>10) {this.setState({nheight:res.data.length})}else{this.setState({nheight:12})};})
      .catch(err=>console.log(err))
    }
    // 跳转空单发运data
    nulldatalist(){
      this.setState({
        datalist:[],
        nheight:12,
        nulldatalistshow:true,
        loading:false,
        isOpen:false
      })
      let ID=this.props.ID;
      let timestamp = Date.parse(new Date());
      axios.get(`${url}/RFIDGroup/GetListBycompanyID?id=${ID}&&timestamp=${timestamp}`)
      .then(res=>{this.setState({loading:false,mydatalistshow:false,myundatalistshow:false,searchlistshow:false,finishdatalistshow:false,unfinishdatalistshow:false,waitdatalistshow:false,alldatalistshow:false,nulldatalistshow:true,datalist:res.data});if (res.data.length>10) {this.setState({nheight:res.data.length})}else{this.setState({nheight:12})};})
      .catch(err=>console.log(err))

    }
// 我的待发运
    mydatalist(zhuangtai){
      this.setState({
        datalist:[],
        nheight:12,
        loading:true,
        isOpen:false
      })
      let renyuandengluid=this.props.renyuandengluid;
      let data={
          userInfoID:renyuandengluid
          }
        axios.post(`${url}/invoice/GetListNoGroupByUserInfoId`,data)
        .then(res=>{this.setState({loading:false,mydatalistshow:true,myundatalistshow:false,searchlistshow:false,alldatalistshow:false,waitdatalistshow:false,unfinishdatalistshow:false,finishdatalistshow:false,nulldatalistshow:false,datalist:res.data});if (res.data.length>10) {this.setState({nheight:res.data.length})}else{this.setState({nheight:12})};})
        .catch(err=>console.log(err))
    }
 // 我的未完成
    myundatalist(zhuangtai){
      this.setState({
        datalist:[],
        nheight:12,
        loading:true,
        isOpen:false
      })
      let renyuandengluid=this.props.renyuandengluid;
      let data={
          userInfoID:renyuandengluid
          }
        axios.post(`${url}/invoice/GetListGroupByUserInfoId`,data)
        .then(res=>{this.setState({loading:false,mydatalistshow:false,myundatalistshow:true,searchlistshow:false,alldatalistshow:false,waitdatalistshow:false,unfinishdatalistshow:false,finishdatalistshow:false,nulldatalistshow:false,datalist:res.data});if (res.data.length>10) {this.setState({nheight:res.data.length})}else{this.setState({nheight:12})};})
        .catch(err=>console.log(err))
    }  

    // 详细跳转搜索发货单
    SearchMessage(index){
      let listindex=this.state.datalist[index];
      Actions.SearchMessage({listindex});
    }
    // 详细跳转全部发货单
    AllQRcode(index,item){
      let listindex=this.state.datalist[index];
      let fahuodanid=item.id
      
      //alert(IDquanbu)
      Actions.AllMessage({listindex,fahuodanid});
    }
    // 详细跳转待发货单
    QRcode(index,item){
      let listindex=this.state.datalist[index];
      let fahuodanid=item.id
       //alert(item.id)
       //alert(listindex.id)
      Actions.Message({listindex,fahuodanid});
    }
    // 详细跳转未完成发货单
    UnFinishQRcode(index,item){
      let listindex=this.state.datalist[index];
      let fahuodanid=item.id
      //alert(item.id)
      Actions.UnFinishMessage({listindex,fahuodanid});
    }
    // 详细跳转已完成发货单
    FinishQRcode(index,item){
      let listindex=this.state.datalist[index];
      let fahuodanid=item.id
      //alert(item.id)
      Actions.FinishMessage({listindex,fahuodanid});
    }
    // 详细跳转空单发运
    NullQRcode(){
      let ID=this.props.ID
      Actions.No({ID});
    }
    NullQRcodexx(index){
      let listindex=this.state.datalist[index];
      let ID=this.props.ID
      let fahuodanid=item.id
      Actions.NoUnFinishMessage({ID,listindex,fahuodanid});
    }
  
    // myQRcode(index,item){
    //   
    //   let listindex=this.state.datalist[index];
    //   let fahuodanid=item.id
    //   let userInfoIDD=this.props.renyuandengluid;
    //   let ID=this.props.ID
    //   //alert(listindex)
    //   Actions.mydata({listindex,userInfoIDD,ID,fahuodanid});

    // }
    // myunQRcode(index,item){
    //   
    //   let listindex=this.state.datalist[index];
    //   let fahuodanid=item.id
    //   let ID=this.props.ID
    //  // alert(listindex)
    //   let userInfoIDD=this.props.renyuandengluid;
      
    //   //alert(fahuodanid)
    //   Actions.myundata({listindex,userInfoIDD,ID,fahuodanid});
    // }

    myQRcode(index,item,zhuangtai){
     
      this.setState({
        danjuzhuangtai:zhuangtai
      })
      let listindex=this.state.datalist[index];
      let fahuodanid=item.id
      let userInfoIDD=this.props.renyuandengluid;
      let ID=this.props.ID
      //alert(listindex)
      Actions.mydata({listindex,userInfoIDD,ID,fahuodanid});

    }
    myunQRcode(index,item,zhuangtai){
      
      this.setState({
        danjuzhuangtai:zhuangtai
      })
      let listindex=this.state.datalist[index];
      let fahuodanid=item.id
      let ID=this.props.ID
     // alert(listindex)
      let userInfoIDD=this.props.renyuandengluid;
      
      //alert(fahuodanid)
      Actions.myundata({listindex,userInfoIDD,ID,fahuodanid});
    }


    //点击待发运
    checkbox(index,item){
    let dingdanid=this.state.datalist[index].id;
    let renyuanid=this.props.renyuandengluid;
    let data={
          userInfoID:renyuanid,
          id:dingdanid
        }
        axios.post(`${url}/invoice/adduserinfo`,data)
        .then(res=>{this.addmy(res)})
        .catch(err=>{console.log(err);})
    }

    addmy(res){

      if(res.data==true){
          
          Alert.alert(
            '提示',
            '已添加到我的待发货单',
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: '确定', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )



          let ID=this.props.ID;
          let timestamp = Date.parse(new Date());
          axios.get(`${url}/invoice/GetListNoGroup?id=${ID}&&timestamp=${timestamp}`)
          .then(res=>{this.setState({loading:false,searchlistshow:false,waitdatalistshow:true,mydatalistshow:false,myundatalistshow:false,alldatalistshow:false,unfinishdatalistshow:false,finishdatalistshow:false,nulldatalistshow:false,datalist:res.data});if (res.data.length>10) {this.setState({nheight:res.data.length})}else{this.setState({nheight:12})};})
          .catch(err=>console.log(err));

      }else{
        
        Alert.alert(
          '提示',
          '添加失败',
          [
            // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: '确定', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      }
    }


    //点击未完成
    checkboxweiwancheng(index,item){
      let dingdanid=this.state.datalist[index].id;
      let renyuanid=this.props.renyuandengluid;
      let data={
            userInfoID:renyuanid,
            id:dingdanid
          }
          axios.post(`${url}/invoice/adduserinfo`,data)
          .then(res=>{this.checkboxweiwanchengok(res)})
          .catch(err=>{console.log(err);})
      }

      checkboxweiwanchengok(res){

        if(res.data==true){
            
            Alert.alert(
              '提示',
              '已添加到我的我的未完成',
              [
                // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: '确定', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: false }
            )
            let ID=this.props.ID;
          let timestamp = Date.parse(new Date());
          axios.get(`${url}/invoice/GetListGroup?id=${ID}&&timestamp=${timestamp}`)
          .then(res=>{this.setState({loading:false,searchlistshow:false,waitdatalistshow:true,mydatalistshow:false,myundatalistshow:false,alldatalistshow:false,unfinishdatalistshow:false,finishdatalistshow:false,nulldatalistshow:false,datalist:res.data});if (res.data.length>10) {this.setState({nheight:res.data.length})}else{this.setState({nheight:12})};})
          .catch(err=>console.log(err));
        }else{
          Alert.alert(
            '提示',
            '添加失败',
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: '确定', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
        }
     }

      

    //点击我的待发运
    checkboxcancel(index,item){
    let dingdanid=this.state.datalist[index].id;
    let data={
          id:dingdanid
        }
        axios.post(`${url}/invoice/removeuserinfo`,data)
        .then(res=>{this.cancelmy(res)})
        .catch(err=>{console.log(err);})
    }
    cancelmy(res){
      if(res.data==true){
          
          Alert.alert(
            '提示',
            '已添加到待发货单',
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: '确定', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
          let renyuandengluid=this.props.renyuandengluid;
          let data={
              userInfoID:renyuandengluid
              }
            axios.post(`${url}/invoice/GetListNoGroupByUserInfoId`,data)
            .then(res=>{this.setState({loading:false,mydatalistshow:true,myundatalistshow:false,searchlistshow:false,alldatalistshow:false,waitdatalistshow:false,unfinishdatalistshow:false,finishdatalistshow:false,nulldatalistshow:false,datalist:res.data});if (res.data.length>10) {this.setState({nheight:res.data.length})}else{this.setState({nheight:12})};})
            .catch(err=>console.log(err))
        }else{
          
          Alert.alert(
            '提示',
            '添加失败',
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: '确定', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
        }
    }


    //点击我的未完成
    checkboxwodeweiwancheng(index,item){
      let dingdanid=this.state.datalist[index].id;
    let data={
          id:dingdanid
        }
        axios.post(`${url}/invoice/removeuserinfo`,data)
        .then(res=>{this.checkboxwodeweiwanchengok(res)})
        .catch(err=>{console.log(err);})
    }

    checkboxwodeweiwanchengok(res){
      if(res.data==true){
        
        Alert.alert(
          '提示',
          '已添加到未完成发货单',
          [
            // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: '确定', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
        let renyuandengluid=this.props.renyuandengluid;
        let data={
            userInfoID:renyuandengluid
            }
          axios.post(`${url}/invoice/GetListGroupByUserInfoId`,data)
          .then(res=>{this.setState({loading:false,mydatalistshow:true,myundatalistshow:false,searchlistshow:false,alldatalistshow:false,waitdatalistshow:false,unfinishdatalistshow:false,finishdatalistshow:false,nulldatalistshow:false,datalist:res.data});if (res.data.length>10) {this.setState({nheight:res.data.length})}else{this.setState({nheight:12})};})
          .catch(err=>console.log(err))
      }else{
        Alert.alert(
          '提示',
          '添加失败',
          [
            // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: '确定', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      }
      
    }

    //到储运员操作模块
    //daifayun
    //weiwancheng
    //yiwancheng
    //quanbu
    tochuyunyuan(zhuangtai){
      //alert(zhuangtai)
      this.setState({
        isOpen:false
      })
      let ID=this.props.ID;
      let timestamp = Date.parse(new Date());
      if(zhuangtai=='daifayun'){
        axios.get(`${url}/invoice/GetListNoGroupSum?id=${ID}&&timestamp=${timestamp}`)
          .then(res=>this.getchuyunyuanlistok(res,zhuangtai)
          )
          .catch(err=>console.log(err))
      }else if(zhuangtai=='weiwancheng'){
        axios.get(`${url}/invoice/GetListGroup?id=${ID}&&timestamp=${timestamp}`)
        .then(res=>this.getchuyunyuanlistok(res,zhuangtai)
        )
        .catch(err=>console.log(err))
      }else if(zhuangtai=='yiwancheng'){
        axios.get(`${url}/invoice/QueryFlagTrueByToday?companyID=${ID}&&timestamp=${timestamp}`)
        .then(res=>this.getchuyunyuanlistok(res,zhuangtai)
        )
        .catch(err=>console.log(err))
      }else{
        axios.get(`${url}/invoice/GetListByCompanyID?id=${ID}&&timestamp=${timestamp}`)
          .then(res=>this.getchuyunyuanlistok(res,zhuangtai)
          )
          .catch(err=>console.log(err))
      }
    }

    //获取储运员各种列表成功
    getchuyunyuanlistok(res,zhuangtai){
      //alert(zhuangtai)

      this.setState({
        loading:false,
        // mydatalistshow:false,
        // myundatalistshow:false,
        // searchlistshow:false,
        // alldatalistshow:true,
        // waitdatalistshow:false,
        // unfinishdatalistshow:false,
        // finishdatalistshow:false,
        // nulldatalistshow:false,
        danjuzhuangtai:zhuangtai,
        chuyunyuanlistdata:res.data
      });
      if (res.data.length>10) {
        this.setState({nheight:res.data.length})
      }else{
        this.setState({nheight:12})
      };
    }

    //详细信息
    chuyunyuanxiangxixinxi(index,item){
      let zhuangtai=this.state.danjuzhuangtai
      let fayundanID=item.id
      let renyuandengluid=this.props.renyuandengluid
      let companyID=this.props.ID
      Actions.chuyunyuan({companyID,renyuandengluid,zhuangtai,fayundanID})

    }
  render(){
    //alert(this.props.jiankong)
  let menu =<View></View>
  if(this.props.jiankong=='true'){
       

        menu=  <View style={{position:'relative',width:300,height:height,flexDirection:'column',alignItems:'center'}}>
                            
        <View style={{position:'absolute',top:10}}>
        <Text style={{color:'#164d8d',fontSize:30,height:50,lineHeight:50,textAlign:'center'}}>储运员</Text>
        <View style={{borderBottomWidth:1,borderBottomColor:'#164d8d',width:250,flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10}}>
              <Text style={{color:'#164d8d',fontSize:30,height:50,lineHeight:50,textAlign:'center'}} onPress={this.tochuyunyuan.bind(this,'daifayun')}>待发货单
              </Text>
              <View style={{width:50,height:50,borderWidth:3,borderRadius:25,borderColor:'#f00',backgroundColor:'#f00'}}>
              <Text style={{color:'#fff',fontSize:28,textAlign:'center',lineHeight:35,fontWeight:'bold'}}>{this.state.chuyunyuandaifayunshuliang}</Text>
              </View>
            </View>
            
            <View style={{borderBottomWidth:1,borderBottomColor:'#164d8d',width:250,flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10}}>
              <Text style={{color:'#164d8d',fontSize:30,height:50,lineHeight:50,textAlign:'center'}} onPress={this.tochuyunyuan.bind(this,'weiwancheng')}>未完成发货单
              </Text>
              <View style={{width:50,height:50,borderWidth:3,borderRadius:25,borderColor:'#f00',backgroundColor:'#f00'}}>
              <Text style={{color:'#fff',fontSize:28,textAlign:'center',lineHeight:35,fontWeight:'bold'}}>{this.state.chuyunyuanweiwanchengshuliang}</Text>
              </View>
            </View>
           
            <View style={{borderBottomWidth:1,borderBottomColor:'#164d8d',width:250,flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10}}>
              <Text style={{color:'#164d8d',fontSize:30,height:50,lineHeight:50,textAlign:'center'}} onPress={this.tochuyunyuan.bind(this,'yiwancheng')}>已完成发货单
              </Text>
              <View style={{width:50,height:50,borderWidth:3,borderRadius:25,borderColor:'#f00',backgroundColor:'#f00'}}>
              <Text style={{color:'#fff',fontSize:28,textAlign:'center',lineHeight:35,fontWeight:'bold'}}>{this.state.chuyunyuanyiwanchengshuliang}</Text>
              </View>
            </View>


            <View style={{borderBottomWidth:1,borderBottomColor:'#164d8d',width:250,flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10}}>
              <Text style={{color:'#164d8d',fontSize:30,height:50,lineHeight:50,textAlign:'center'}} onPress={this.tochuyunyuan.bind(this,'quanbu')}>全部发货单</Text>
              <View style={{width:50,height:50,borderWidth:3,borderRadius:25,borderColor:'#f00',backgroundColor:'#f00'}}>
              <Text style={{color:'#fff',fontSize:28,textAlign:'center',lineHeight:35,fontWeight:'bold'}}>{this.state.chuyunyuanquanbushuliang}</Text>
              </View>
            </View>
  
          
        </View>
        </View>
  }else if(this.props.jiankong=='false'){
    menu= <View style={{position:'relative',width:300,height:height,flexDirection:'column',alignItems:'center'}}>
                    
        <View style={{position:'absolute',top:10}}>
        <Text style={{color:'#164d8d',fontSize:30,height:50,lineHeight:50,textAlign:'center'}}>理货员</Text>
          <View style={{borderBottomWidth:1,borderBottomColor:'#164d8d',width:250,flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10}}>
            <Text style={{color:'#164d8d',fontSize:30,height:50,lineHeight:50,textAlign:'center'}} onPress={this.waitdatalist.bind(this)}>待发货单
            </Text>
            <View style={{width:50,height:50,borderWidth:3,borderRadius:25,borderColor:'#f00',backgroundColor:'#f00'}}>
            <Text style={{color:'#fff',fontSize:28,textAlign:'center',lineHeight:35,fontWeight:'bold'}}>{this.state.wait}</Text>
            </View>
          </View>

          <View style={{borderBottomWidth:1,borderBottomColor:'#164d8d',width:250,flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10}}>
            <Text style={{color:'#164d8d',fontSize:30,height:50,lineHeight:50,textAlign:'center'}} onPress={this.unfinishdatalist.bind(this)}>未完成发货单
            </Text>
            <View style={{width:50,height:50,borderWidth:3,borderRadius:25,borderColor:'#f00',backgroundColor:'#f00'}}>
            <Text style={{color:'#fff',fontSize:28,textAlign:'center',lineHeight:35,fontWeight:'bold'}}>{this.state.unfinish}</Text>
            </View>
          </View>
          
          <View style={{borderBottomWidth:1,borderBottomColor:'#164d8d',width:250,flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10}}>
            <Text style={{color:'#164d8d',fontSize:30,height:50,lineHeight:50,textAlign:'center'}} onPress={this.finishdatalist.bind(this)}>已完成发货单
            </Text>
            <View style={{width:50,height:50,borderWidth:3,borderRadius:25,borderColor:'#f00',backgroundColor:'#f00'}}>
            <Text style={{color:'#fff',fontSize:28,textAlign:'center',lineHeight:35,fontWeight:'bold'}}>{this.state.finish}</Text>
            </View>
          </View>


          <View style={{borderBottomWidth:1,borderBottomColor:'#164d8d',width:250,flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10}}>
            <Text style={{color:'#164d8d',fontSize:30,height:50,lineHeight:50,textAlign:'center'}} onPress={this.alldatalist.bind(this)}>全部发货单</Text>
            <View style={{width:50,height:50,borderWidth:3,borderRadius:25,borderColor:'#f00',backgroundColor:'#f00'}}>
            <Text style={{color:'#fff',fontSize:28,textAlign:'center',lineHeight:35,fontWeight:'bold'}}>{this.state.all}</Text>
            </View>
          </View>

          <View style={{borderBottomWidth:1,borderBottomColor:'#164d8d',width:250,flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10}}>
            <Text style={{color:'#164d8d',fontSize:30,height:50,lineHeight:50,textAlign:'center'}} onPress={this.mydatalist.bind(this)}>我的待发运</Text>
            <View style={{width:50,height:50,borderWidth:3,borderRadius:25,borderColor:'#f00',backgroundColor:'#f00'}}>
            <Text style={{color:'#fff',fontSize:28,textAlign:'center',lineHeight:35,fontWeight:'bold'}}>{this.state.my}</Text>
            </View>
          </View>


          <View style={{borderBottomWidth:1,borderBottomColor:'#164d8d',width:250,flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10}}>
            <Text style={{color:'#164d8d',fontSize:30,height:50,lineHeight:50,textAlign:'center'}} onPress={this.myundatalist.bind(this)}>我的未完成</Text>
            <View style={{width:50,height:50,borderWidth:3,borderRadius:25,borderColor:'#f00',backgroundColor:'#f00'}}>
            <Text style={{color:'#fff',fontSize:28,textAlign:'center',lineHeight:35,fontWeight:'bold'}}>{this.state.myun}</Text>
            </View>
          </View>

          

        </View>
      </View>
      }

      let list=<View></View>
      if(this.props.jiankong=='true'){
          list=<View>
            {this.state.chuyunyuanlistdata.length>0 ? 
              this.state.chuyunyuanlistdata.map((item,index)=>
              <View style={styles.itemss} key={index}>
                <Text style={styles.font}  numberOfLines={2}>{index+1}.车牌{item.plateNumber}订单{item.no}</Text>
                <Text style={styles.fontxiangxi} onPress={this.chuyunyuanxiangxixinxi.bind(this,index,item)} numberOfLines={1}>详细信息</Text>
            </View> 
              )
              : null}
          </View>
      }else if(this.props.jiankong=='false'){
        list= <View>
              {/*这里开始发货单*/}
                      

                        
                        
                        {/*这里待发货单*/}
                        {
                          this.state.waitdatalistshow?
                          this.state.datalist.map((item,index)=>{
                            return (
                              <View style={styles.itemss} key={index}>
                                <CheckBox
                                  label=""
                                  checked={item.checked}
                                  checkboxStyle={{
                                    width: 50,
                                    height: 50,
                                    borderColor: "#4ea3f1",
                                  }}
                                  onChange={this.checkbox.bind(
                                    this,
                                    index,
                                    item
                                  )}
                                ></CheckBox>
                                <Text style={styles.font} numberOfLines={2}>
                                  {index + 1}.车牌{item.plateNumber}订单
                                  {item.no}
                                </Text>
                                <Text
                                  style={styles.fontxiangxi}
                                  onPress={this.QRcode.bind(this, index, item)}
                                  numberOfLines={1}
                                >
                                  详情
                                </Text>
                              </View>
                            );
                          }):null
                        }
                        {/*这里未完成发货单*/}
                        {
                          this.state.unfinishdatalistshow?
                          this.state.datalist.map((item,index)=>{
                            return (
                              <View style={styles.itemss} key={index}>
                                <CheckBox
                                  label=""
                                  checked={item.checked}
                                  checkboxStyle={{
                                    width: 50,
                                    height: 50,
                                    borderColor: "#4ea3f1",
                                  }}
                                  onChange={this.checkboxweiwancheng.bind(
                                    this,
                                    index,
                                    item
                                  )}
                                ></CheckBox>
                                <Text style={styles.font} numberOfLines={2}>
                                  {index + 1}.车牌{item.plateNumber}订单
                                  {item.no}
                                </Text>
                                <Text
                                  style={styles.fontxiangxi}
                                  onPress={this.UnFinishQRcode.bind(
                                    this,
                                    index,
                                    item
                                  )}
                                  numberOfLines={1}
                                >
                                  详情
                                </Text>
                              </View>
                            );
                          }):null
                        }
                        {/*这里完成发货单*/}
                        {
                          this.state.finishdatalistshow?
                          this.state.datalist.map((item,index)=>{
                            return(
                            <View style={styles.itemss} key={index}>
                                <Text style={styles.font} numberOfLines={2}>{index+1}.车牌{item.plateNumber}订单{item.no}</Text>
                                <Text style={styles.fontxiangxi} onPress={this.FinishQRcode.bind(this,index,item)} numberOfLines={1}>详细信息</Text>
                            </View>
                            )
                          }):null
                        }
                        {/*这里空单发货*/}
                        {
                          this.state.nulldatalistshow?
                          <View>
                            <View style={{justifyContent:'center',alignItems:'center',flexDirection:'column',borderWidth:1,borderColor:'#eee',backgroundColor:'#4ea3f1',borderRadius:15}}>
                              <Text style={{color:'#fff',fontSize:22,paddingTop:25,paddingLeft:50,paddingRight:50,paddingBottom:25}} onPress={
                                this.NullQRcode.bind(this)}>空单发运</Text>
                            </View>
                          </View>
                          :null
                        }
                        {
                          this.state.nulldatalistshow?
                          this.state.datalist.map((item,index)=>{
                            return(
                            <View style={styles.itemss} key={index}>
                                <Text style={styles.font} numberOfLines={2}>{index+1}.{index+1}</Text>
                                <Text style={styles.fontxiangxi} onPress={this.NullQRcodexx.bind(this,index,ite)} numberOfLines={1}>详细信息</Text>
                            </View>
                            )
                          }):null
                        }


                        {/*这里全部发货单*/}
                        {
                          this.state.alldatalistshow?
                          this.state.datalist.map((item,index)=>{
                            return(
                            <View style={styles.itemss} key={index}>
                                <Text style={styles.font}  numberOfLines={2}>{index+1}.车牌{item.plateNumber}订单{item.no}</Text>
                                <Text style={styles.fontxiangxi} onPress={this.AllQRcode.bind(this,index,item)} numberOfLines={1}>详细信息</Text>
                            </View>
                            )
                          }):null
                        }

                        {/*这里wode待发货单*/}
                        {

                          this.state.mydatalistshow?
                          this.state.datalist.map((item,index)=>{
                            return (
                              <View style={styles.itemss} key={index}>
                                <CheckBox
                                  label=""
                                  checked={item.checked}
                                  checkboxStyle={{
                                    width: 50,
                                    height: 50,
                                    borderColor: "#4ea3f1",
                                  }}
                                  onChange={this.checkboxcancel.bind(
                                    this,
                                    index,
                                    item
                                  )}
                                ></CheckBox>
                                <Text style={styles.font} numberOfLines={2}>
                                  {index + 1}.车牌{item.plateNumber}订单
                                  {item.no}
                                </Text>
                                <Text
                                  style={styles.fontxiangxi}
                                  onPress={this.myQRcode.bind(
                                    this,
                                    index,
                                    item,
                                    "wodedaifayun"
                                  )}
                                  numberOfLines={1}
                                >
                                  详情
                                </Text>
                              </View>
                            );
                          }):null
                        }

                        {/*这里wode未完成发货单*/}
                        {
                          this.state.myundatalistshow?
                          this.state.datalist.map((item,index)=>{
                            return (
                              <View style={styles.itemss} key={index}>
                                <CheckBox
                                  label=""
                                  checked={item.checked}
                                  checkboxStyle={{
                                    width: 50,
                                    height: 50,
                                    borderColor: "#4ea3f1",
                                  }}
                                  onChange={this.checkboxwodeweiwancheng.bind(
                                    this,
                                    index,
                                    item
                                  )}
                                ></CheckBox>

                                <Text style={styles.font} numberOfLines={2}>
                                  {index + 1}.车牌{item.plateNumber}订单
                                  {item.no}
                                </Text>
                                <Text
                                  style={styles.fontxiangxi}
                                  onPress={this.myunQRcode.bind(
                                    this,
                                    index,
                                    item,
                                    "wodeweiwancheng"
                                  )}
                                  numberOfLines={1}
                                >
                                  详情
                                </Text>
                              </View>
                            );
                          }):null
                        }
                      
              </View>
      }
  

    return(
      
      <ScrollView style={styles.flexbox}>
      {
        this.state.loading? <Loading/>:
      <View style={{position:'relative',width:width,height:this.state.nheight*0.12*height}}>
                
          <SideMenu
            menu={menu}
            isOpen={this.state.isOpen}
            openMenuOffset={299}
            hiddenMenuOffset={0}
            onChange={                   
            (isOpen) => {
                isOpen ? this.setState({sidewidth:80,isOpen:true}):this.setState({sidewidth:0,isOpen:false})
                        }
                      }
          >
          <View style={{position:'absolute',width:width,height:this.state.nheight*0.12*height}}>
            <ImageBackground style={{height:this.state.nheight*0.12*height,width:width}} source={require('../img/back.jpg')} resizeMode='cover' opacity={1}>
                      <View>
                        {/*这里slidemenu*/}
                        <Text onPress={this.onpress.bind(this)}  
                        style={{position:'absolute',width:100,height:100,paddingLeft:25,paddingTop:25}}>
                        <Icon name="align-justify" size={70} color="#444"/>

                        </Text>
                        {/*这里搜索*/}
                        <View style={{position:'absolute',left:110,width:0.75*width,height:100}}>
                          <View style={styles.items}>
                            <TextInput placeholder=' 填写发运单号' style={styles.contentfont}  onChangeText={(text)=>{this.setState({text:text})}} 
                            // {}onBlur={this.onblur.bind(this)}
                            ></TextInput>
                            <Text onPress={this.sousuo.bind(this)}><Icon name="search" size={60} color="#444"/></Text>
                          </View>
                        </View>
                      </View>

                      <View style={{position:'absolute',top:110,alignItems:'center',justifyContent:'center',flexDirection:'column',width:width}}>
                      {
                        this.state.mydatalistshow?<View style={{width:width,flexDirection:'row',justifyContent:"center",alignItems:'center'}}><Image source={require('../img/sx.png')} style={{width:30,height:30}}/><Text style={{fontSize:32,color:'red',fontWeight:'600'}} onPress={this.sx.bind(this)}>刷新我的待发货</Text></View>:null
                      }

                      {
                        this.state.myundatalistshow?<View style={{width:width,flexDirection:'row',justifyContent:"center",alignItems:'center'}}><Image source={require('../img/sx.png')} style={{width:30,height:30}}/><Text style={{fontSize:32,color:'red',fontWeight:'600'}} onPress={this.wwcsx.bind(this)}>刷新我的未完成发货</Text></View>:null
                      }
                      
                      {/*这里搜索发货单*/}
                      {
                          this.state.searchlistshow?
                          this.state.datalist.map((item,index)=>{
                            return(
                            <View style={styles.itemss} key={index}>
                                <Text style={styles.font}  numberOfLines={2}>{index+1}.车牌{item.plateNumber}订单{item.no}</Text>
                                <Text style={styles.fontxiangxi} onPress={this.SearchMessage.bind(this,index)} numberOfLines={1}>详细信息</Text>
                            </View>
                            )
                          }):null
                        }
                        {list}
                      </View>
                     
         
          </ImageBackground>                     
          </View>
          </SideMenu>
      </View>
      }
      </ScrollView>
       
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
      alignItems:'center',
      height:0.08*height,
      marginTop:20
    },
    contentfont:{
    width:0.6*width,
    borderBottomColor:'red',
    fontSize:30
    },
    itemss:{
      flexDirection:'row',
      alignItems:'center',
      width:0.95*width,
      height:0.08*height     
    },
    font:{
      width:0.7*width,
      fontSize:27,
      color:'#444'
    },
    fontxiangxi:{
      fontSize:27,
      color:'#164d8d'
    }
}
export default Shipment







