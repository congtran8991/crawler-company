import React, { Component } from 'react';
import SearchData from './components/search'
import BootstrapTable from 'react-bootstrap-table-next';
import { confirmAlert } from 'react-confirm-alert';
import { Redirect, Link } from "react-router-dom";
import { CircleLoading } from 'react-loadingg';

import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import './App.css';
import SelectNameWeb from './components/selectNameWeb';
import { CSVLink } from 'react-csv';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { Axios } from './Utils/Axios';
import 'react-confirm-alert/src/react-confirm-alert.css'
let tam = 0;
let storeDataDelete = [];
let arr = [undefined];
let pageIndex = 0;
let tamCrawler = false;
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCompany: [],
            showPage: 1,
            searchData: '',
            isExportCsv: false,
            dataCsvOnepage: [],
            selected: []

        };
    }
    componentWillReceiveProps(props) {
        console.log(props);
        (async () => {
            console.log(props);
            console.log(props.deletePopup);
            console.log(props.fillWebInfoId);
            let nameWeb = await Axios('get', '/Api/listInfoWeb');
            if(props.deletePopup==true){
                if (nameWeb.data.length>0) {
                    console.log(props.deletePopup);
                    let findListCompany = await Axios('get', '/Api/listCompany/' + nameWeb.data[0]._id);
                    this.setState({
                        listCompany: findListCompany.data
                    })
                }
            }else if (props.fillWebInfoId) {
                let findListCompany = await Axios('get', '/Api/listCompany/' + props.fillWebInfoId);
                this.setState({
                    listCompany: findListCompany.data
                })
            }
            if(nameWeb.data.length==0){
                let findListCompany = await Axios('get', '/Api/listCompany/' + undefined);
                this.setState({
                    listCompany: findListCompany.data
                })
            }
            //     console.log(this.props.checkDelete);
            //     let nameWeb1 = await Axios('get','/Api/listInfoWeb');
            //    console.log(props.tam_I);
            //     if(nameWeb1.data[0]!=undefined){
            //         if(props.dataIdCategory==(nameWeb1.data[0]._id)&&(nameWeb1.data[0]!=undefined)){
            //             let nameWeb = await Axios('get','/Api/listInfoWeb');
            //             let findListCompany =await Axios('get','/Api/listCompany/'+nameWeb.data[0]._id);
            //                 this.setState({
            //                     listCompany : findListCompany.data 
            //                 })
            //         }else if(props.fillWebInfoId && this.props.checkDelete ==true ){
            //                     console.log(props.fillWebInfoId ,'filllllllllllllllllllllllllllllvnrnvjrnvvvvvvvv');
            //                     if(nameWeb1.data[this.props.tam_I]){
            //                         let findListCompany =await Axios('get','/Api/listCompany/'+nameWeb1.data[this.props.tam_I]._id); 
            //                         this.setState({
            //                             listCompany : findListCompany.data ,
            //                             showPage    : 1
            //                         })
            //                     }
            //         }else if(props.fillWebInfoId && this.props.checkDelete ==false){
            //                     console.log(props.fillWebInfoId ,'filllllllllllllllllllllllllllll');
            //                     let findListCompany =await Axios('get','/Api/listCompany/'+props.fillWebInfoId); 
            //                     this.setState({
            //                         listCompany : findListCompany.data ,
            //                         showPage    : 1
            //                     })
            //         }else if(nameWeb1.data[0]!=undefined){
            //             console.log(props.idListCompany,'fiidddddddddddddddddddddddd'); 
            //             let  findListCompany =await Axios('get','/Api/listCompany/'+nameWeb1.data[0]._id); 
            //              this.setState({
            //                 listCompany : findListCompany.data ,
            //                 showPage    : 1
            //             })
            //         }
            //     }else{
            //         let  findListCompany =await Axios('get','/Api/listCompany/'+undefined); 
            //         this.setState({
            //            listCompany : findListCompany.data ,
            //            showPage    : 1
            //        })
            //     }

        })()
    }
    componentDidMount() {
        this.setState({
            isLoading: true
        })
        setTimeout(() => {
            (async () => {
                let data = await Axios('get', '/Api/listInfoWeb/')
                let dataWebId = data.data.length > 0 ? data.data[0]._id : undefined
                console.log(dataWebId);
                let idCompany = this.props.idListCompany ? this.props.idListCompany : this.state.idDataWeb
                console.log(idCompany);
                let findListCompany = await Axios('get', '/Api/listCompany/' + dataWebId);
                this.setState({
                    listCompany: findListCompany.data,
                    isLoading: false,
                    //idDataWeb : data.data[0]._id
                })
            })()
        }, 1000)
    }
    pageNumber = (event) => {
        let button = event.target;
        let page = 1;
        if (button.closest('li.page-item') == null) {
            page = pageIndex;
        } else {
            page = button.closest('li.page-item').querySelector('a.page-link').text;
            pageIndex = page;
        }
        (async () => {
            let data = await Axios('get', '/Api/listInfoWeb');
            let dataIdWebInfo = this.props.fillWebInfoId ? this.props.fillWebInfoId : data.data[0]._id
            // if(arr[0] != this.props.fillWebInfoId){
            //     arr[0]=this.props.fillWebInfoId
            //     this.state.showPage=1
            // }
            console.log(arr[0]);
            console.log(this.state.showPage);
            if (page == '>') {
                this.state.showPage++;
                let findListCompany = await Axios('get', '/Api/listCompany/' + dataIdWebInfo);
                console.log(findListCompany.data);
                this.setState({
                    listCompany: findListCompany.data,
                    showPage: this.state.showPage++
                })
            } else if (page == '<') {
                console.log(this.state.showPage--);
                let findListCompany = await Axios('get', '/Api/listCompany/' + dataIdWebInfo);
                console.log(findListCompany.data);
                this.setState({
                    listCompany: findListCompany.data,
                    showPage: this.state.showPage--
                })
            } else if (page == '>>') {
                let findListCompany = await Axios('get', '/Api/listCompany/' + dataIdWebInfo);
                // console.log(Math.ceil(findListCompany.data.length/20));  
                // Math.ceil(findListCompany.data.length/20);
                this.setState({
                    listCompany: findListCompany.data,
                    showPage: Math.ceil(findListCompany.data.length / 20)
                })
            } else if (page == '<<') {
                let findListCompany = await Axios('get', '/Api/listCompany/' + dataIdWebInfo);
                console.log(findListCompany.data);
                this.setState({
                    listCompany: findListCompany.data,
                    showPage: 1
                })
            } else if (page == null) {
                console.log("cong tran");
            } else {
                let findListCompany = await Axios('get', '/Api/listCompany/' + dataIdWebInfo);
                console.log(findListCompany.data);
                this.setState({
                    listCompany: findListCompany.data,
                    showPage: Number(page)
                })
            }
        })()
    }
    onSearchData = (filter) => {
        (async () => {
            this.setState({
                isLoading: true
            })
            let data = await Axios('get', '/Api/listInfoWeb/')
            console.log(data);

            let dataWebId = data.data.length > 0 ? data.data[0]._id : undefined
            let idCompany = this.props.fillWebInfoId ? this.props.fillWebInfoId : dataWebId
            console.log(this.props.idListCompany);

            let findListCompany = await Axios('get', '/Api/listCompany/' + idCompany);
            console.log(findListCompany.data);
            let listCompanyName = findListCompany.data.filter((listcompany) => {
                return (listcompany.nameCompany) ? (listcompany.nameCompany).toLowerCase().indexOf(filter.toLowerCase()) != -1 : '';
            })
            let listCompanyTaxCode = findListCompany.data.filter((listcompany) => {
                return (listcompany.taxCode) ? (listcompany.taxCode).toLowerCase().indexOf(filter.toLowerCase()) != -1 : '';
            })
            let listCompanyAddress = findListCompany.data.filter((listcompany) => {
                return (listcompany.address) ? (listcompany.address).toLowerCase().indexOf(filter.toLowerCase()) != -1 : '';
            })
            let listCompanyTelePhone = findListCompany.data.filter((listcompany) => {
                return (listcompany.telePhone) ? (listcompany.telePhone).toLowerCase().indexOf(filter.toLowerCase()) != -1 : '';
            })
            let nameApp = findListCompany.data.filter((listcompany) => {
                return (listcompany.nameApp) ? (listcompany.nameApp).toLowerCase().indexOf(filter.toLowerCase()) != -1 : '';
            })
            let lengthMax = [listCompanyName, listCompanyTaxCode, listCompanyTelePhone, listCompanyAddress];
            //listCompanyName.length !=0 ? listCompanyName : (listCompanyTaxCode != 0 ? listCompanyTaxCode : (listCompanyAddress !=0 ? listCompanyAddress : listCompanyTelePhone))
            let listCompany = listCompanyName.length != 0 ? listCompanyName : nameApp != 0 ? nameApp : (listCompanyTaxCode != 0 ? listCompanyTaxCode : (listCompanyAddress != 0 ? listCompanyAddress : listCompanyTelePhone))
            this.setState({
                listCompany: listCompany,
                isLoading: false
            })
        })()
    }
    // dataLink=(dataListUrl)=>{
    //     (async ()=>{
    //         let findListCompany =await Axios('get','/Api/listCompany/'+dataListUrl); 
    //         this.setState({
    //             listCompany:findListCompany.data,
    //             redirect : true,
    //             dataListUrl
    //         })   
    //     })()
    //     this.setState({
    //         isLoading : true
    //     })
    // }
    // handleChange = (event)=>{   
    //     if(event.target.checked==true){
    //         storeDataDelete.push(event.target.value)
    //         console.log(storeDataDelete);   
    //     }else{
    //         let deleteElement = event.target.value;
    //         let i = storeDataDelete.indexOf(deleteElement);
    //         if(i!=-1){
    //             storeDataDelete.splice(i,1)
    //         } 
    //     }
    //     this.setState({
    //         deleteCompany : storeDataDelete
    //     })
    // }
    //   removeFomatterData = (cell,row)=>{
    //          return (
    //                 <input
    //                     //id = {row._id}
    //                     type="checkbox"
    //                     name = "check"
    //                     value = {row._id}
    //                     checked={this.state.check}
    //                     onChange={this.handleChange}
    //                 />
    //          )
    //     }
    backHomePage = () => {
        this.setState({
            backHomePage: true
        })
    }
    render() {

        function priceFormatter(cell, row) {
            return (
                <a href={`https://${cell}`} target={`_blank`}>{cell}</a>
            );
        }
        //http://localhost:3000/listCompany/
        const { SearchBar } = Search;
        const headerSortingStyle = { backgroundColor: '#e3edf8' };
        const { listCompany, redirect = false, searchData, isLoading = false, dataListUrl = '', backHomePage = false } = this.state;
        console.log(listCompany);

        // if(listCompany.length == 0)

        //if(isLoading) return <CircleLoading color="#fcc169" />
        let dataListCompany = listCompany.map((listCompanys, index) => {
            return (
                { stt: index + 1, ...listCompanys }
            )
        })
        let dataCsvOnepage = dataListCompany.slice((this.state.showPage - 1) * 20, this.state.showPage * 20);
        let datafield = dataListCompany[0] ? dataListCompany[0].nameApp ? 'nameApp' : 'domainName' : '';

        let columns = [
            {
                dataField: 'stt',
                text: 'STT',
                sort: true,
                headerSortingStyle,
                headerAlign: 'center',
                headerStyle: { width: '50px' },
                align: 'center'
            },
            {
                dataField: datafield,
                text: datafield == 'nameApp' ? 'Tên Ứng Dụng' : 'Tên miền chính',
                sort: true,
                headerSortingStyle,
                headerAlign: 'center',
                headerStyle: { width: '150px' },
                formatter: datafield == 'nameApp' ? undefined : priceFormatter,
                align: 'center'
            },
            // dataListCompany[0] ? dataListCompany[0].nameApp ?  {
            //     dataField: 'nameCity',
            //     text: 'Tên thành phố',
            //     sort: true,
            //     headerSortingStyle,
            //     headerStyle: { minWidth: '150px' },
            //     headerAlign: 'center',
            //     align: 'center',
            // } : {
            //     dataField: 'subdomainName',
            //     text: 'Tên Miền Phụ',
            //     sort: true,
            //     headerSortingStyle,
            //     headerAlign: 'center',
            //     headerStyle: { maxWidth: '150px'},
            //     align: 'center'
            // } : {
            //     dataField: 'subdomainName',
            //     text: 'Tên Miền Phụ',
            //     sort: true,
            //     headerSortingStyle,
            //     headerAlign: 'center',
            //     headerStyle: { width: '150px'},
            //     align: 'center'
            // }
            // , 
            {
                dataField: 'nameCompany',
                text: 'Tên công ty',
                sort: true,
                headerSortingStyle,
                headerStyle: { minWidth: '150px' },
                headerAlign: 'center',
                align: 'center',
            }, {
                dataField: 'taxCode',
                text: 'Mã số thuế',
                sort: true,
                headerSortingStyle,
                headerAlign: 'center',
                headerStyle: { minWidth: '150px' },
                align: 'center'
            }, {
                dataField: 'address',
                text: 'Địa chỉ',
                sort: true,
                headerSortingStyle,
                headerAlign: 'center',
                headerStyle: { minWidth: '250px' },
                align: 'center'
            }, {
                dataField: 'telePhone',
                text: 'Số điện thoại',
                sort: true,
                headerSortingStyle,
                headerAlign: 'center',
                align: 'center',
            }
        ];
        const defaultSorted = [{
            dataField: '_id',
            order: 'asc'
        }];

        const MyExportCSV = () => {
            return (
                <div className="btn-group">
                    <i
                        className="btn btn-primary dropdown-toggle fas fa-file-csv"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false">
                    </i>
                    <div className="dropdown-menu">
                        {
                            <CSVLink data={dataListCompany} >
                                <p className="dropdown-item">Export CSV All</p>
                            </CSVLink>
                        }
                        {
                            <CSVLink data={dataCsvOnepage} >
                                <p className="dropdown-item">Export CSV One Page</p>
                            </CSVLink>
                        }
                    </div>
                </div>
            );
        };
        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            selected: this.state.selected,
            onSelect: (row, isSelect, rowIndex, e) => {
                if (isSelect == true) {
                    storeDataDelete.push(row._id)
                } else {
                    let i = storeDataDelete.indexOf(row._id);
                    if (i != -1) {
                        storeDataDelete.splice(i, 1)
                    }
                }
            },
            onSelectAll: (isSelect, rows, e) => {
                if (isSelect == true) {
                    storeDataDelete = []
                    let abc = rows.map((a, index) => {
                        return a._id
                    })
                    storeDataDelete = abc
                } else {
                    storeDataDelete = [];
                }
            }
        };
        const CrawlerData = () => {
            const crawlerUpdateData = () => {
                (async () => {
                    let data = await Axios('get', '/Api/listInfoWeb/')
                    if (data.data.length > 0) {
                        let dataWebId = data.data[0]._id;
                        let idWeb = {
                            id: this.props.fillWebInfoId ? this.props.fillWebInfoId : dataWebId
                        }
                        console.log(idWeb.id);
                        let lastPage = await Axios('post', '/Api/listInfoWeb/findId', idWeb);
                        console.log(lastPage.data);

                        if (lastPage.data.length > 0) {
                            if (lastPage.data[0].lastPage >= 0 || lastPage.data[0].lastPage != undefined) {
                                let data = {
                                    webinforName: idWeb.id,
                                    lastPage: lastPage.data[0].lastPage,
                                    pathUrl: lastPage.data[0].pathUrl
                                }
                                console.log(data);
                                alert('Bạn đang cào lại')
                                localStorage.checkCrawDelete = false;
                                let checkFalse = localStorage.getItem('checkCrawDelete');
                                this.props.messageDelete(checkFalse)
                                let reloadCrawler = await Axios('post', '/Api/listCompany/crawlerContinue', data);
                                console.log(reloadCrawler.data);
                                if (reloadCrawler.data.success == true) {
                                    localStorage.checkCrawDelete = true;
                                    let checkTrue = localStorage.getItem('checkCrawDelete');
                                    this.props.messageDelete(checkTrue);
                                    alert('Bạn đã cào xong')
                                }
                            } else {
                                alert('Dữ liệu đang được cào ')
                            }
                        }
                    } else {
                        alert('Không có dữ liệu cào')
                    }
                })()
            }
            return (
                <i
                    className="btn btn-warning crawler-button fas fa-sync"
                    onClick={crawlerUpdateData}
                ></i>
            )
        }
        const DeleteData = () => {
            const deleteDataCompany = () => {
                console.log(storeDataDelete);
                console.log(this.props.fillWebInfoId);
                if (storeDataDelete.length > 0) {
                    confirmAlert({
                        title: 'Message',
                        message: 'Bạn có muốn xóa không ? ',
                        buttons: [
                            {
                                label: 'Yes',
                                onClick: () => {
                                    console.log(this.props.fillWebInfoId);
                                    (async () => {
                                        try {
                                            let data = {
                                                arrayId: storeDataDelete
                                            }
                                            await Axios('delete', '/Api/listCompany', data);
                                            let deleteIDwebInfo = await Axios('get', '/Api/listInfoWeb');
                                            let dataIdDelete = this.props.fillWebInfoId ? this.props.fillWebInfoId : deleteIDwebInfo.data[0]._id
                                            let findListCompany = await Axios('get', '/Api/listCompany/' + dataIdDelete);
                                            this.setState({
                                                listCompany: findListCompany.data
                                            })
                                            storeDataDelete = []
                                            setTimeout(() => {
                                                alert('Bạn đã xóa thành công')
                                            }, 1000)
                                        } catch (err) {
                                            console.log(err);
                                        }
                                    })()
                                }
                            },
                            {
                                label: 'Cancel',
                            }
                        ]
                    })
                } else {
                    alert('Bạn Chưa chọn mục cần xóa ')
                }
            }
            return (
                <i
                    className="btn btn-danger crawler-button fas fa-trash-alt"
                    onClick={deleteDataCompany}
                ></i>
            )
        }
        // if(redirect) return  <Redirect to={'/listCompany/'+ (dataListUrl ? dataListUrl : params.webId)}/> 
        return (
            <div className='container-fluid'>
                {isLoading ? <CircleLoading color="#fcc169" /> : undefined}
                <PaginationProvider
                    pagination={paginationFactory({
                        custom: true,
                        totalSize: dataListCompany.length,
                        page: this.state.showPage,
                        sizePerPage: 20,
                        sizePerPageList: [{
                            text: '10', value: 10
                        }, {
                            text: '30', value: 30
                        }, {
                            text: '50', value: 50
                        }, {
                            text: 'All', value: dataListCompany.length
                        }],
                        hideSizePerPage: dataListCompany.length === 0
                    })}
                    keyField='_id'
                    columns={columns}
                    data={dataListCompany}
                >
                    {
                        ({ paginationProps, paginationTableProps }) => (
                            <ToolkitProvider
                                keyField='_id'
                                columns={columns}
                                data={dataListCompany}
                                search
                                exportCSV={{
                                    fileName: 'productList.csv',
                                    onlyExportSelection: true,
                                    exportAll: true,
                                    ignoreHeader: true,
                                    noAutoBOM: false
                                }}
                            >
                                {
                                    toolkitprops => (
                                        <div>
                                            <br />
                                            <br />
                                            <div className="right-floating-section">
                                                <div className='row'>
                                                    <div className='col-lg-1.5 spaceMr'>
                                                        <div className="right-floating-subsection">
                                                            <MyExportCSV />
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-1.5 spaceMr'>
                                                        <div className="right-floating-subsection">
                                                            <CrawlerData />
                                                        </div>
                                                    </div>
                                                    {/* {isLoading ? <CircleLoading color="#fcc169" /> : ''} */}
                                                    <div className='col-lg-1.5 spaceMr'>
                                                        <div className="right-floating-subsection">
                                                            <DeleteData />
                                                        </div>
                                                    </div>
                                                    <div className=''>
                                                        <div className="right-floating-subsection sizeWidth">
                                                            {/* <SearchBar { ...toolkitprops.searchProps } onChange={this.onChangeData}/>   */}
                                                            <SearchData onDataSearch={this.onSearchData} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <BootstrapTable
                                                    {...toolkitprops.baseProps}
                                                    {...paginationTableProps}
                                                    keyField='stt'
                                                    selectRow={selectRow}
                                                    columns={columns}
                                                    defaultSorted={defaultSorted}
                                                    defaultSortDirection="asc"
                                                    hover
                                                    condensed
                                                    noDataIndication="No Data Is Available"
                                                />
                                                <div className='row'>
                                                    <div className='col-lg-6'>
                                                        <SizePerPageDropdownStandalone
                                                            {...paginationProps}
                                                        />
                                                    </div>
                                                    <div className='col-lg-3 pagi' onClick={this.pageNumber}>
                                                        <PaginationListStandalone
                                                            {...paginationProps}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </ToolkitProvider>
                        )
                    }
                </PaginationProvider>
            </div>
        )
    }




    // constructor(props) {
    //     super(props);
    //     this.state = {
    //          selected: [0, 1] 
    //         };
    //   }

    //   handleBtnClick = () => {
    //     if (!this.state.selected.includes(2)) {
    //       this.setState(() => ({
    //         selected: [...this.state.selected, 2]
    //       }));
    //     } else {
    //       this.setState(() => ({
    //         selected: this.state.selected.filter(x => x !== 2)
    //       }));
    //     }
    //   }

    //   handleOnSelect = (row, isSelect) => {
    //     if (isSelect) {
    //       this.setState(() => ({
    //         selected: [...this.state.selected, row.id]
    //       }));
    //     } else {
    //       this.setState(() => ({
    //         selected: this.state.selected.filter(x => x !== row.id)
    //       }));
    //     }
    //   }

    //   handleOnSelectAll = (isSelect, rows) => {
    //     const ids = rows.map(r => r.id);
    //     if (isSelect) {
    //       this.setState(() => ({
    //         selected: ids
    //       }));
    //     } else {
    //       this.setState(() => ({
    //         selected: []
    //       }));
    //     }
    //   }

    //   render() {
    //     const columns = [{
    //         dataField: 'id',
    //         text: 'Product ID'
    //       }, {
    //         dataField: 'name',
    //         text: 'Product Name'
    //       }, {
    //         dataField: 'price',
    //         text: 'Product Price'
    //       }];
    //     const products =[{
    //         id : 1,
    //         name :"Trân Văn công",
    //         price : "50000k"
    //     }] 
    //     const selectRow = {
    //       mode: 'checkbox',
    //       clickToSelect: true,
    //       selected: this.state.selected,
    //       onSelect: this.handleOnSelect,
    //       onSelectAll: this.handleOnSelectAll
    //     };
    //     return (
    //       <div>
    //         <button className="btn btn-success" onClick={ this.handleBtnClick }>Select/UnSelect 3rd row</button>
    //         <BootstrapTable keyField="id" data={ products } columns={ columns } selectRow={ selectRow } />

    //       </div>
    //     );
    //   }
}
export default App;

