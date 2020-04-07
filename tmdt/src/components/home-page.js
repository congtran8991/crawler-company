import React , {Component} from 'react' ;
import BigItem from './bigItem';
import { Redirect, Link } from "react-router-dom";
import { CircleLoading } from 'react-loadingg';
import {Axios} from '../Utils/Axios';
import DeleteForm from './deleteForm';
import InputCrawler from './inputCrawlerData';
import PopupCategory from './popupCategory';
import App from '../../src/App';
import './../App.css';
let checkTrue = localStorage.getItem('checkCrawDelete');
class homePage extends Component{
  constructor(props) {
    super(props);
    this.state = { 
      value: "coconut",
      isToggleForm : true ,
      nameWebInfo : '',
      crawlerNumber : true,
      deleteData : undefined,
      check :true,
      upNameWeb:'',
      nameWebInfoCategory:[],
      loadingCrawler : checkTrue =="true" ? checkTrue : 'true'
    };
  }
  handleSubmit=(event) =>{
    alert("Your favorite flavor is: " + this.state.value);
    event.preventDefault();
  }
  handleChange = event => {
    this.setState({ value: event.target.value });
  };
  onAddForm=()=>{
    this.setState({
      isToggleForm: false,
      isAdd       : true,
      nameAdd     : '',
      nameURL : ''
    }) 
  }
  onUpdate=(event)=>{
    (async()=>{
      let dataInfoWeb =  await Axios('get','/Api/listInfoWeb');
      console.log(dataInfoWeb.data);
      
      console.log(dataInfoWeb.data.length);
      if(dataInfoWeb.data.length > 0){
        this.setState({
          isToggleForm: false,
          isAdd       : false,
          upNameWeb   : dataInfoWeb.data[0].nameWeb
        })
      }else{
        alert('Không có dữ liệu để update')
      }
    })()
  }
  onDeleteForm = ()=>{
    (async()=>{
      let nameWeb = await Axios('get','/Api/listInfoWeb');
      if(nameWeb.data.length==0){
        alert('Không có dữ liệu để xóa')
      }else{
        this.setState({
          clDelete : true
        })
      }
       
    })()
  }
  onCloseForm=()=>{
    this.setState({
      isToggleForm:!this.state.isToggleForm
    })
  }
  dataWebInfo = (data)=>{
    this.setState({
      nameDataWeb : data.data,
      check : false,
      idListCompany : data.data[0]._id,
      checkUpdate : true
    })
  }
  deleteDataCategory=(data,dataIdCategory,tam_I)=>{
    this.setState({
      nameDataWeb : data.data,
      dataIdCategory : dataIdCategory,
      tam_I : tam_I ,
      checkDelete : true
    })
  }
  changeNameWeb=(nameWebInfo,webInfoId,checkDelete )=>{
    this.setState({
      nameWebInfo,
      webInfoId,
      checkDelete : false,
      deletePopup:false
    })
  }
  tamCrawler=(data)=>{
    console.log(data);
    this.setState({
      crawlerNumber : data
    }) 
  }
  onSignOut=()=>{
    console.log(document.cookie.length);
    var d=new Date();
    d.setTime(d.getTime())
    var expires = "expires="+ d.toUTCString();
    for(let i=0;i<=document.cookie.split(';').length;i++){
      let cname =document.cookie.split(';')[0].split('=')[0];
      let cvalue = document.cookie.split(';')[0].split('=')[1];
       document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    this.setState({
      redirect:true
    })
  }
  onCancelDelete=(hide)=>{
    console.log(hide);
    (async()=>{
      let name = await Axios('get','/Api/listInfoWeb');
      console.log(name.data);
      this.setState({
        clDelete:hide,
        deleteData : name.data ,
        check :true
      })
    })()
  }
  onHidenDelete=()=>{
    alert('Bạn đang cào')
  }
  onHideUpdate=()=>{
    alert('Ko có sản phẩm')
  }
  onListCategory=()=>{
    (async()=>{
      let name = await Axios('get','/Api/listInfoWeb');
      if(name.data.length>0){
        this.setState({
          isToggleForm: false,
          isAdd       : true,
          nameAdd     : '',
          nameURL : '',
          nameWebInfoCategory : name.data,
          deletePopup : true
        }) 
      }else{
        alert('Danh mục của bạn đang trống')
      }
      // console.log(name.data);    
      // this.setState({
      //   isToggleForm: false,
      //   isAdd       : true,
      //   nameAdd     : '',
      //   nameURL : '',
      //   nameWebInfoCategory : name.data
      // }) 
    })()
  }
  popupDataWeb=(data)=>{
    this.setState({
      checkUpdate : true,
      updateDataWeb : data.data
    })
  }
  loadingCrawlerDelete=(dataBoolean)=>{
    console.log(dataBoolean);
    this.setState({
      loadingCrawler:dataBoolean,
      deletePopup : true

    }) 
  }
  checkDeletePopup = (boolean)=>{
    this.setState({
      deletePopup: true
    })
  }
  render(){
    console.log(this.state.loadingCrawler);
    
    console.log(this.state.checkDelete);
    let {isToggleForm,isAdd,nameWebInfo,webInfoId,redirect=false,isLoading=false,clDelete=false} = this.state;
    if(redirect) return <Redirect to={'/'}/>
     if(clDelete) return <DeleteForm onCancelDelete={this.onCancelDelete}/>
    return (
      <div className='full'>
        <div className='abc'>
        <div className={isToggleForm ? "row" : "row taskForm"}>
            <div className='col-lg-3'>
            </div>
            <div className='col-lg-6'>   
             {/* <DeleteForm 
                  onCancelDelete={this.onCancelDelete}
                  clDelete = {this.state.clDelete}
              /> */}
               {/* <TaskForm 
                    isToggleForm={isToggleForm}
                    onCloseForm = {this.onCloseForm}
                    isAdd       = {isAdd}
                    inputNameWeb = {nameWebInfo}
                    webInfoId    = {webInfoId}
                    upNameWeb    = {this.state.upNameWeb}
                    dataWebInfo  =  {this.dataWebInfo}
                    tamCrawler   = {this.tamCrawler}
                    nameAdd     = {this.state.nameAdd}
                    nameURL    = {this.state.nameURL}
                /> */}
                <PopupCategory
                    isToggleForm={isToggleForm}
                    onCloseForm = {this.onCloseForm}
                    isAdd       = {isAdd}
                    // inputNameWeb = {nameWebInfo}
                    // webInfoId    = {webInfoId}
                    // upNameWeb    = {this.state.upNameWeb}
                  //  tamCrawler   = {this.tamCrawler}
                    nameWebInfoCategory = {this.state.nameWebInfoCategory}
                    deleteDataCategory = {this.deleteDataCategory}
                    dataWebInfo  =  {this.dataWebInfo}
                    popupDataWeb = {this.popupDataWeb}
                    checkDeletePopup = {this.checkDeletePopup}

                />
            </div>
            <div className='col-lg-3'></div>
        </div>
        </div>
        <div className='selectionAction'>
          <div className='left_vt' onClick={this.onSignOut}>
             <i className="fas fa-sign-out-alt">&nbsp;&nbsp;Đăng xuất</i>
          </div>
        </div>
              <div>{this.state.loadingCrawler == 'false' ? <CircleLoading/> : ''}</div>
        {/* <div className='NavBar_handling'>
        <div className='eventIcon'>
             <i className="far fa-plus-square i1" onClick={this.onAddForm}></i>
             <i className="far fa-edit i2"onClick={this.onUpdate}></i>
             <i className="far fa-trash-alt i3"onClick = {this.state.crawlerNumber ? this.onDeleteForm : this.onHidenDelete}></i>
        </div>
        </div> */}
        <div>
          <div className='input_flex'>
                <BigItem 
                    isToggleForm={isToggleForm}
                    changeNameWeb = {this.changeNameWeb}
                    nameWebData  = {this.state.nameDataWeb}
                    deleteDataWeb  = {this.state.deleteData}
                    check = {this.state.check}
                    updateDataWeb = {this.state.updateDataWeb}
                    deletePopup  = {this.state.deletePopup}
                /> 
                <InputCrawler
                    dataWebInfo  =  {this.dataWebInfo}
                    messageDelete = {this.loadingCrawlerDelete}
                />
          </div>
          <div className='category-Company'>
            <i className="fas fa-eye" onClick={this.state.loadingCrawler =='true' ? this.onListCategory : this.onHidenDelete}>
               &nbsp;&nbsp;
               <u>
                  Xem danh mục
               </u>
            </i>
          </div>
          <div>
              <App 
                idListCompany ={this.state.idListCompany}
                 fillWebInfoId = {this.state.webInfoId}
                 dataIdCategory   = {this.state.dataIdCategory}
                 tam_I        = {this.state.tam_I}
                 checkDelete  = {this.state.checkDelete}
                 tamCrawler   = {this.tamCrawler}
                 messageDelete = {this.loadingCrawlerDelete}
                 deletePopup  = {this.state.deletePopup}
              />
          </div>
        </div>
      </div>
    );
  }
}

export default homePage ;
