import React , {Component} from 'react' ;
import { CircleLoading } from 'react-loadingg';
import {Axios} from '../Utils/Axios';
import './../App.css';
var tam=0;
var tamCrawler = false ;
class AddForm extends Component{
    constructor(props){
        super(props);  
        this.state={
            taskNameWebAdd:'',
            taskNameWebUpdate:'',
            taskNameURL:'',
            loading : false,
        } 
    }
  handleChangeAdd=(event)=>{
        var name=event.target.name;
        var value=event.target.value;
        console.log(value);
        switch (value) {
            case 'http://online.gov.vn/WebDetails/WebDetailsTMDT':
              value = 'http://online.gov.vn/WebDetails/InfoSearchWebCCDV' ;
              break;
            case 'http://online.gov.vn/WebDetails':
              value = 'http://online.gov.vn/WebDetails/InfoSearchWeb' ;  
              break;
            case 'http://online.gov.vn/AppDetails':
              value = 'http://online.gov.vn/AppDetails/InfoSearchApp' ;
              break;
            case 'http://online.gov.vn/AppDetails/AppDetailsTMDT':
              value = 'http://online.gov.vn/AppDetails/InfoSearchAppTMDT' ; 
              break
        }
        console.log(value);
        this.setState({
            [name]:value
        })
  }
  handleChangeUpdate = (event) =>{
        var name=event.target.name;
        console.log(name);
        
        var value=event.target.value;
        console.log(value);
        this.setState({
           [name]:value,
        })
  }
  removeForm=()=>{
      this.setState({
        taskNameWebAdd : '',
        taskNameURL : ''
      })
      this.props.onCloseForm();
  }
  onSubmitAdd=(event)=>{
    event.preventDefault();
    let dem=0;
    console.log(this.state.taskNameURL);
      (async () =>{
        event.persist()
         event.preventDefault();
        let nameWebInfo = await Axios('get','/Api/listInfoWeb'); 
          let splitStr = this.state.taskNameURL.split('/');
          let taskNameWebAdd = splitStr[splitStr.length-1]; 
          console.log(taskNameWebAdd);
          

          try{
            let data={
                nameWeb : taskNameWebAdd.trim(),
                pathUrl : this.state.taskNameURL
            }
            console.log(data);
            
            let dataWeb={
                webinfoName : taskNameWebAdd.trim(),
                webinfoUrl : this.state.taskNameURL
            }
              for(let i = 0;i<nameWebInfo.data.length ; i++){
                if(nameWebInfo.data[i].pathUrl==data.pathUrl || nameWebInfo.data[i].nameWeb==data.nameWeb){
                    dem=1  
                }
              }
              if((data.nameWeb) === '' || (data.pathUrl) === ''){
                  alert("Bạn chưa nhập đầy đủ thông tin")
                  event.preventDefault();
              }else if(dem==1){
                  alert("URL và Tên web của bạn đã tồn tại")
                  event.preventDefault();
              }else{
                  await Axios('post','/Api/listInfoWeb',data); 
                  setTimeout(()=>{
                    this.setState({
                        loading : false
                    })
                    this.removeForm();
                    alert("Bạn đã thêm thành công");
                  },3000)
                  let dataInfoWeb =  await Axios('get','/Api/listInfoWeb'); 
                  this.props.dataWebInfo(dataInfoWeb)  
                  this.props.tamCrawler(tamCrawler)
                  this.setState({
                      loading : true,
                      taskNameWebAdd : '',
                      taskNameURL : ''
                  })
                  await Axios('post','/Api/listCompany',dataWeb);
                  tamCrawler = true
                  this.props.tamCrawler(tamCrawler) 
              }   
          }catch(err){
              console.log(err); 
          }
      })()

    // let str = 'http://online.gov.vn/WebDetails/InfoSearchWebCCDV';
    // let str1 = str.split('/')
    // console.log(str1[str1.length-1]);
  }
  onSubmitUpdate=(event)=>{
    let dem=0;
    (async () =>{
        try{
            event.persist()
            event.preventDefault();
           // let nameWebInfo = await Axios('get','/Api/listInfoWeb'); 
            let nameWebdata = await Axios('get','/Api/listInfoWeb');
            let data={
                _id : this.props.webInfoId ? this.props.webInfoId : nameWebdata.data[0]._id,
                nameWeb : this.state.taskNameWebUpdate
            } 
            console.log(data.nameWeb);
            this.setState({
                abc : data.nameWeb
            })
            for(let i = 0;i<nameWebdata.data.length ; i++){
                if(nameWebdata.data[i].nameWeb==data.nameWeb){
                    dem=1  
                }
            }
            if(data.nameWeb ===''){
                alert("Bạn chưa Update thông tin mới")
                event.preventDefault();
            }else if(dem==1){
                alert("Tên web của bạn đã tồn tại.Bạn cần nhập 1 tên mới")
                event.preventDefault();
            }else {
               await Axios('put','/Api/listInfoWeb',data); 
               let dataInfoWeb =  await Axios('get','/Api/listInfoWeb'); 
               console.log(dataInfoWeb.data);
               
               this.props.dataWebInfo(dataInfoWeb)
                alert("Bạn đã Update thành công");
                this.removeForm(); 
            }   
        }catch(err){
            console.log(err); 
        }
    })() 
  }
  componentWillReceiveProps(props){
      let a = 0;
      (async()=>{
        console.log(props.inputNameWeb);
        let data = await Axios('get','/Api/listInfoWeb');
        // for(let i=0;i<data.data.length;i++){
        //     if(data.data[i].nameWeb==props.inputNameWeb){
        //         console.log("tran van cong lớp cntt k57");
        //         a=1;  
        //     }else{
        //         a++;
                
        //     }
            
        // }
        if(props.isAdd == false){
            this.setState({
              taskNameWebUpdate : props.inputNameWeb ? props.inputNameWeb : props.upNameWeb 
            })
        }
        if(props.nameAdd){
            this.setState({
              taskNameWebAdd : props.nameAdd
            })
        }
        if(props.nameURL){
            this.setState({
              taskNameURL : props.nameURL
            })
        }
      })()
      
  }
  render(){
      console.log(this.state.abc);
      
      if(this.state.loading) return <CircleLoading/>
    let {isToggleForm,isAdd,inputNameWeb,webInfoId} = this.props;
    return (
            <div className="card cardWidth positionAbs" style={{display: isToggleForm == false ? ' ' : 'none'}}>
                <h5 className="card-header ds-flex">
                    <div className='f-left'>
                         <i className="far fa-plus-square">{isAdd ? 'Add' : 'Update'}</i>
                    </div>
                    <div className='f-right'>
                    <i 
                        className="far fa-times-circle"
                        onClick={this.removeForm}
                    ></i>
                    </div>
                </h5>
                <div className="card-body">
                    <form onSubmit={isAdd ? this.onSubmitAdd : this.onSubmitUpdate}>
                    <div className="form-group" style={{display: isAdd  ? 'none' :''}}>
                        <input  
                               className="form-control"  
                               placeholder="Tên Niên mục" 
                               name = "taskNameWebUpdate"
                               value = {this.state.taskNameWebUpdate} 
                               onChange  =  {this.handleChangeUpdate}
                        />
                    </div>
                    <div className="form-group" style={{display: isAdd  ? ' ' : 'none'}}>
                        <input  
                               className="form-control" 
                               placeholder="URL " 
                               name = "taskNameURL"
                               value = {isAdd ? this.state.taskNameURL : ''}
                               onChange  =  {isAdd ? this.handleChangeAdd : this.handleChangeUpdate}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" >{isAdd ? 'Thêm' : 'Sửa'}</button>
                    </form>
                </div>
            </div>  
           );
       }
}

export default AddForm ;
