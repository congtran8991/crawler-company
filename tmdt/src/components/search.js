import React , {Component} from 'react' ;
import {Axios} from '../Utils/Axios';
class Search extends Component{
    constructor(props){
        super(props);
        this.state={
            searchData:''
        }
    }
    onChangeData=(event)=>{
        console.log(event);
        console.log("tran van cong");
        
        let name =event.target.name; 
        let value =event.target.value;
        this.setState({
            [name] :value
        })
    }
    onKeyPressData = (event)=>{
        // event.preventDefault()
        if(event.key === 'Enter'){
            event.preventDefault()
            this.props.onDataSearch(this.state.searchData) 
        }
    }
    dataSearchCompany=()=>{
        this.props.onDataSearch(this.state.searchData)   
    }
  render(){
    return (
            <form>
                <div className="form-group flexForm">
                    <input 
                        type="text" 
                        className="form-control sizeInput" 
                        placeholder="Search" 
                        value = {this.state.searchData}
                        name = "searchData"
                        onChange={this.onChangeData}
                        onKeyPress={this.onKeyPressData}
                        />
                        <div className='btn btn-primary mr-input ' onClick={this.dataSearchCompany}>
                          Search
                        </div>
                </div>
            </form>     
           );
       }
}

export default Search ;
