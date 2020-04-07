import React , {Component} from 'react' ;
import { Redirect, Link } from "react-router-dom"
import {Axios} from '../Utils/Axios';
import { CircleLoading } from 'react-loadingg';
class SelectNameWeb extends Component{
    constructor(props){
        super(props);
        this.state={
            nameWebs : []
        }
    }
    handleChange=(event)=>{
        const eTarget = event.target.options[event.target.selectedIndex]
        let name = eTarget.text ;
        let infoWebId = eTarget.id;
        let url = eTarget.value;
        console.log(url);
        this.setState({
            url : url
        })
    }
    DataCompanyInforWeb=(event)=>{
        event.preventDefault();
        this.props.dataLink(this.state.url);
    }
    componentDidMount(){
        (async ()=>{
           try{
             let nameWeb = await Axios('get','/Api/listInfoWeb');
             this.setState({
                 nameWebs : nameWeb.data,
                 url : nameWeb.data[0].nameWeb
             })
           }catch(err){
             console.log(err); 
           } 
        })()
     }
    render(){ 
        let {nameWebs} = this.state
        console.log(this.state.url);   
        let nameWebInfo = nameWebs.map((nameWeb,index)=>{
            return (
                <option name="WEBSITE thương mại điện tử bán hàng" key={index} id={nameWeb._id} >
                    {nameWeb.nameWeb}   
                </option>
            );
        })
        return (
                <form onSubmit={this.DataCompanyInforWeb} className='hpFormSm'>
                    <div>
                        <input type="submit" value="Search" className='btn btn-primary'/>
                    </div>
                    <label className='mrr-5'>
                        <select className='form-control' onChange={this.handleChange}>
                           {nameWebInfo}
                        </select>
                    </label>
                </form>  
        );
    }
    }
export default SelectNameWeb ;
