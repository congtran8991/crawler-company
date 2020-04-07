import React , {Component} from 'react' ;
import {Axios} from '../Utils/Axios';
import { CircleLoading } from 'react-loadingg';
class InputCrawler extends Component{
  constructor(props){
    super(props);
    this.state={
      loading : false
    }
  }
  handleChangeAdd=(event)=>{
    var name=event.target.name;
    var value=event.target.value;
    this.setState({
      crawNameWebCategory : value
    })
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
  onCrawlerDataWeb = () =>{
    let dem = 0;
      (async()=>{
        this.setState({
          loading : true
        })
        let data = {
          webinfoUrl:this.state.crawNameWebCategory
        }
        let nameWebdata = await Axios('get','/Api/listInfoWeb');
        console.log(nameWebdata.data);
        
        for(let i = 0 ; i< nameWebdata.data.length ; i++){ 
          if(nameWebdata.data[i].pathUrl==this.state.crawCategory){
            dem=1
          }
        }
        console.log(dem);
        
        let nameCategory = await Axios('post','/Api/listInfoWeb/crawlerWeb',data);
        if(nameCategory.data.success==false){
          this.setState({
            loading : false
          })
          alert('Đường dẫn bạn nhập sai !')
        }else if(dem==1){
          this.setState({
            loading : false
        })
          alert('URL bạn nhập đã tồn tại !')
        }else{
          let today = new Date();
          let  date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
          let  time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          let dateTime = date+' '+time;
            let dataInfoweb ={
              nameWeb : nameCategory.data,
              pathUrl : this.state.crawCategory,
              timeCrawler : dateTime
            }
            let dataCrawCompany= {
              webinfoUrl : this.state.crawCategory
            }
            await Axios('post','/Api/listInfoWeb',dataInfoweb); 
            setTimeout(()=>{
              this.setState({
                  loading : false
              })
              alert("Bạn đã thêm thành công,Dữ liệu đang được tải về");
              this.props.dataWebInfo(dataInfoWeb)
            },3000)
            localStorage.checkCrawDelete = false;
            let checkFalse = localStorage.getItem('checkCrawDelete');
            console.log(checkFalse==false);
            
            this.props.messageDelete(checkFalse)
            let dataInfoWeb =  await Axios('get','/Api/listInfoWeb'); 
            let dataCrawler = await Axios('post','/Api/listCompany',dataCrawCompany);

            if(dataCrawler.data.success==true){
              localStorage.checkCrawDelete = true;
              let checkTrue = localStorage.getItem('checkCrawDelete');
              console.log(checkTrue);   
              this.props.messageDelete(checkTrue);
              alert('Bạn đã cào xong')
            }
        }
      })() 
  }
  onKeyPressData=(event)=>{
    if(event.key === 'Enter'){
      event.preventDefault();
      this.onCrawlerDataWeb();
    }
  }
  onSubmitCrawlerData=()=>{
    this.onCrawlerDataWeb();
  }
  render(){
    let {loading}=this.state;
     if(loading) return <CircleLoading/>
      return(
        //   <div>
        //        <form onSubmit={this.crawlerDataInforWeb}>
        // <div className="form-group inputCraw">
        //     <label className='mrr-5'>
        //     <input className="form-control" id="exampleInputPassword1" placeholder="URL" />
        //     </label>
        // </div>
        // </form>
        //   </div>
        
        <div  className='text-center' style={{marginLeft:170+"px"}}>
                <form >
                    <label className='input-mr-5'>
                    <input 
                        className="form-control" 
                        id="exampleInputPassword1" 
                        placeholder="http://online.gov.vn/" 
                        name = "crawCategory"
                        onChange={this.handleChangeAdd}
                        onKeyPress={this.onKeyPressData}
                        />
                        <div className='btn btn-primary' style={{marginLeft:10+"px"}} onClick={this.onSubmitCrawlerData}>
                          Craw
                        </div>
                    </label>
                </form>  
            

        </div>
      )
  }
}

export default InputCrawler ;
