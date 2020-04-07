import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom"
import { Axios } from '../Utils/Axios';
import { CircleLoading } from 'react-loadingg';
//import $ from 'jquery';
// window.jQuery = window.$ = $;
const $ = window.$
// import moduleName from 'module';
// // require('popper');
// require('bootstrap');\
//require('bootstrap-select');

class BigItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameWebs: []
        }
    }
    handleChange = (event) => {
        console.log(event.target.selectedIndex);

        const eTarget = event.target.options[event.target.selectedIndex]
        let name = eTarget.text;
        let infoWebId = eTarget.id;
        console.log(infoWebId);

        let url = eTarget.value;
        $('select[name=selValue]').val(url);
        console.log(infoWebId);
        this.setState({
            webInfoNameWeb: name,
            webInfoID: infoWebId,
            webInfoNameURL: url,
            checkDelete: false,
            checkSelect : true
        })
        this.props.changeNameWeb(name, infoWebId, false);
    }
    crawlerDataInforWeb = (event) => {
        event.preventDefault();
        (async () => {
            let nameWeb = await Axios('get', '/Api/listInfoWeb');
            if (nameWeb.data.length == 0) {
                alert('Không có dữ liệu')
            } else {
                let urlListCompanyId = this.state.webInfoNameWeb;
                console.log(urlListCompanyId);
                (async () => {
                    this.setState({
                        isLoading: true
                    })
                    setTimeout(() => {
                        this.setState({
                            redirect: true,
                            isLoading: false
                        })
                    }, 2000)
                })()
            }

        })()
    }
    componentWillReceiveProps(){
        let {nameWebData}=this.props ;
          (async()=>{
            try {
                if(nameWebData && (nameWebData.length>0)&& this.state.checkSelect){
                    let nameWeb = await Axios('get', '/Api/listInfoWeb');
                    $('select[name=selValue]').val(nameWebData[0].pathUrl);
                    this.setState({
                        checkSelect:false
                    })
                }
            } catch (err) {
                console.log(err);
            }
        })()
    }
    componentDidUpdate() {
        $(".selectpicker").selectpicker("refresh");
    }
    componentDidMount() {
        (async () => {
            try {
                let nameWeb = await Axios('get', '/Api/listInfoWeb');
                console.log(this.props.deleteData);
                this.setState({
                    nameWebs: nameWeb.data,
                    webInfoID: nameWeb.data[0]._id,
                })
            } catch (err) {
                console.log(err);
            }
        })()
    }
    refreshData=()=>{
        console.log(this.props.nameWebData);
        (async()=>{
            try {
                let nameWeb = await Axios('get', '/Api/listInfoWeb');
                $('select[name=selValue]').val(nameWeb.data[0].pathUrl);
                $(".selectpicker").selectpicker("refresh");
            } catch (err) {
                console.log(err);
            }
        })()
    }
    render() {
        console.log(this.props.nameWebData);
        
        let { isToggleForm, deleteDataWeb } = this.props;
        let { nameWebs, webInfoNameWeb, webInfoID, webInfoNameURL, redirect = false, isLoading } = this.state;
        if (isLoading) return <CircleLoading />
        let dataLength = (this.props.check == true ? (deleteDataWeb ? deleteDataWeb : this.props.nameWebData ? this.props.nameWebData : nameWebs) : (this.props.nameWebData ? this.props.nameWebData : deleteDataWeb ? deleteDataWeb : nameWebs));
        console.log(dataLength);
        let nameWebInfo = (dataLength).map((nameWeb, index) => {
            return (
                <option value={nameWeb.pathUrl} key={index} id={nameWeb._id} data-subtext={nameWeb.timeCrawler} >
                    {nameWeb.nameWeb}
                </option>
            );
        })
        console.log(nameWebs);

        return (
            <div>
                <form onSubmit={this.crawlerDataInforWeb}>
                    <label className='mrr-5'>
                        {/* <select className='form-control'
                            onChange={this.handleChange}
                        >
                            {nameWebInfo}
                        </select> */}
                        <select className="form-control selectpicker" data-live-search="true" onChange={this.handleChange} name="selValue">
                            {/* <option data-tokens="ketchup mustard" >Hot Dog, Fries and a Soda</option>
                            <option data-tokens="mustard" value='abc'>Burger, Shake and a Smile</option>
                            <option data-tokens="frosting">Sugar, Spice and all things nice</option> */}
                            {/* {dataLength.map((nameWeb, index) => {
                                return ( */}
                            {/* <option >
                                        dddddddddd
                                    </option> */}
                            {nameWebInfo}
                            {/* );
                            })} */}
                        </select>
                    </label>
                </form>


            </div>

        );
    }
}
export default BigItem;
