import React , {Component} from 'react' ;
import BootstrapTable from 'react-bootstrap-table-next';
import { Redirect, Link } from "react-router-dom"
import {Axios} from '../Utils/Axios';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { confirmAlert } from 'react-confirm-alert';
import { CircleLoading } from 'react-loadingg';
let  storeDataDelete =[];
class DeleteForm extends Component{
    constructor(props){
        super(props);
        this.state={
            nameWeb:[]
        }
    }
    componentDidMount(){
        (async()=>{
            try{
                let nameWeb = await Axios('get','/Api/listInfoWeb');
                this.setState({
                    nameWeb : nameWeb.data
                })
                
            }catch(err){
                console.log(err);
            }
        })()
    }
    componentWillReceiveProps(props){
        console.log(props.nameWebDelete);
        if(props.nameWebDelete){
            this.setState({
                nameWeb : props.nameWebDelete
            })
        }
    }
    handleChange = (event)=>{
        console.log(event.target.checked);
        console.log(event.target.value);
        if(event.target.checked==true){
            storeDataDelete.push(event.target.value)
            console.log(storeDataDelete);   
        }else{
            let deleteElement = event.target.value;
            let i = storeDataDelete.indexOf(deleteElement);
            if(i!=-1){
                storeDataDelete.splice(i,1)
            } 
        }
        this.setState({
            deleteNameWeb : storeDataDelete
        })
    }
    removeFomatterData = (cell,row)=>{
        return (
               <input
                   id = {row._id}
                   type="checkbox"
                   name = "check"
                   value = {row._id}
                   // id={listCompany._id}
                   checked={this.state.check}
                   onChange={this.handleChange}
               />
        )
   }
   onDeleteInfoWeb=()=>{
    confirmAlert({
        title: 'Message',
        message: 'Bạn có muốn xóa không ? ',
        buttons: [
          {
            label: 'Yes',
            onClick : ()=>{
                (async()=>{
                    console.log(this.state.deleteNameWeb);
                    if(this.state.deleteNameWeb){
                        let data = {
                            deleteNameWeb :this.state.deleteNameWeb
                        }
                        let infoDelete = await Axios('delete','/Api/listInfoWeb/',data);
                        if(infoDelete.data.success){
                            this.props.onCancelDelete(false)
                        }
                        
                    }else{
                        alert('Bạn chưa chọn sản phẩm để xóa')
                    }
                })()
            }
          },
          {
            label: 'Cancel',
          }
        ]
    })
   }
   onCancelDeleteInfoWeb=()=>{
       this.props.onCancelDelete(false)
   }
    render(){ 
        console.log(this.props.clDelete);
        const columns = [{
            dataField: 'nameWeb',
            text: 'Product Name',
            headerAlign: 'center',
          },{
            dataField: "databasePkey",
            text: "Remove",
            headerAlign: 'center',
            align: 'center',
            headerStyle: { width: '250px' },
            formatter : this.removeFomatterData
          
          }];
          const products =[{
              id : 1,
              name : "fhhdhd",
              price: '3635365'
          }]
          let listNameWeb = this.state.nameWeb ;
          console.log(this.props.nameWebDelete);
          
        return (
            <div className='container formDelete'>
                <br/>
                <br/>
                     <BootstrapTable keyField='_id' data={ listNameWeb } columns={ columns } />
                <div>
                     <button 
                         onClick={this.onDeleteInfoWeb}
                         type="button" 
                         className="btn btn-danger">Delete</button>  
                    <button 
                        onClick={this.onCancelDeleteInfoWeb}
                        type="button" 
                        className="btn btn-warning mrbtn">Cancel</button>  
                </div>
            </div>   
        );
    }
    }
export default DeleteForm ;
