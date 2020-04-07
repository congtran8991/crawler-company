import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { Axios } from '../Utils/Axios';
class popupCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCategory: []
        };
    }
    onCancleCloseForm = () => {
        (async () => {
            let dataInfoWeb = await Axios('get', '/Api/listInfoWeb');
            this.props.dataWebInfo(dataInfoWeb);
            this.props.checkDeletePopup(true);
            this.props.onCloseForm();
        })()
        // this.props.onCloseForm();
    }

    componentWillReceiveProps(props) {
        console.log(props.dataWebInfo);
        if (props.nameWebInfoCategory.length > 0) {
            this.setState({
                dataCategory: props.nameWebInfoCategory
            })
        }
    }
    componentDidMount() {
        (async () => {
            try {
                let dataCategory = await Axios('get', '/Api/listInfoWeb');
                console.log(dataCategory.data);
                this.setState({
                    dataCategory: dataCategory.data
                })
            } catch (err) {
                console.log(err);
            }
        })()
    }
    render() {
        const removeFomatterData = (cell, row) => {
            const onDeleteCategory = () => {
                let dataIdCategory = [];
                dataIdCategory.push(row._id)
                confirmAlert({
                    title: 'Message',
                    message: 'Bạn có muốn xóa không ? ',
                    buttons: [
                        {
                            label: 'Yes',
                            onClick: () => {
                                (async () => {
                                    // let i_data = await Axios('get', '/Api/listInfoWeb');
                                    // let tam_I = 0;
                                    // for (let i = 0; i < i_data.data.length; i++) {
                                    //     if (i_data.data[i]._id == row._id) {
                                    //         tam_I = i
                                    //         if (i == i_data.data.length - 1) {
                                    //             tam_I = 0
                                    //         }
                                    //     }
                                    // }
                                    // let data = {
                                    //     deleteNameWeb: dataIdCategory
                                    // }
                                    // await Axios('delete', '/Api/listInfoWeb/', data);
                                    // let categoryWeb = await Axios('get', '/Api/listInfoWeb');
                                    // console.log(categoryWeb.data);
                                    // this.props.deleteDataCategory(categoryWeb, row._id, tam_I)
                                    // this.setState({
                                    //     dataUpdateCategory: categoryWeb.data
                                    // })
                                    // let nullData = await Axios('get', '/Api/listInfoWeb');
                                    // if (nullData.data.length == 0) {
                                    //     this.props.onCloseForm();
                                    // }
                                    let data = {
                                        deleteNameWeb: dataIdCategory
                                    }
                                    await Axios('delete', '/Api/listInfoWeb/', data);
                                    let categoryWeb = await Axios('get', '/Api/listInfoWeb');
                                    this.props.deleteDataCategory(categoryWeb)
                                    this.setState({
                                        dataCategory: categoryWeb.data
                                    })
                                    if (categoryWeb.data.length == 0) {
                                        this.props.onCloseForm();
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
            return (
                <div className='category-UD'>
                    <div className='category-update-delete' key={row._id}>
                        {/* <i className="fas fa-edit i1"></i> */}
                        <i className="fas fa-trash-alt i2" onClick={onDeleteCategory}></i>
                    </div>
                </div>
            )
        }
        console.log(this.state.dataUpdateCategory);
        let { isToggleForm } = this.props;
        let { dataCategory } = this.state;
        let dataCategorys = (dataCategory).map((category, index) => {
            return (
                { stt: index + 1, ...category }
            )
        })
        const columns = [{
            dataField: 'stt',
            text: 'stt',
            headerAlign: 'center',
            align: 'center'
        }, {
            dataField: 'nameWeb',
            text: 'Tên danh mục ',
            headerAlign: 'center',
            align: 'center',
            // editable: (cell, row, rowIndex, colIndex) => {
            //     return false
            // }
            // formatter: updateFomatterData

        }, {
            dataField: "databasePkey",
            text: "",
            headerAlign: 'center',
            align: 'center',
            headerStyle: { width: '50px'},
            formatter: removeFomatterData,
            editable: (cell, row, rowIndex, colIndex) => {
                return false
            }
        }
            //   {
            //     dataField: "databasePkey",
            //     text: "Remove",
            //     headerAlign: 'center',
            //     align: 'center',
            //     headerStyle: { width: '250px' },
            //     formatter : this.removeFomatterData

            //   }
        ];
        const editOptions =
        {
            mode: 'click',
            afterSaveCell: (oldValue, newValue, row, column) => {
                (async () => {
                    console.log(newValue);

                    let data = {
                        _id: row._id,
                        nameWeb: row.nameWeb
                    }
                    await Axios('put', '/Api/listInfoWeb', data);
                    let dataInfoWeb = await Axios('get', '/Api/listInfoWeb');

                    this.setState({
                        updatePopup: true,
                        dataCategory: dataInfoWeb.data
                    })
                    //row.nameWeb = newValue
                    // this.props.dataWebInfo(dataInfoWeb)

                })()
                //console.log(row.nameWeb);   
            },
            onStartEdit: (row, column, rowIndex, columnIndex) => {


                (async () => {
                    let data = {
                        _id: row._id,
                        nameWeb: row.nameWeb
                    }
                    await Axios('put', '/Api/listInfoWeb', data);
                    let dataInfoWeb = await Axios('get', '/Api/listInfoWeb');
                    console.log(dataInfoWeb.data);


                    this.setState({
                        dataCategoryUpdate: dataInfoWeb.data
                    })
                    // row.nameWeb=newValue
                    this.props.dataWebInfo(dataInfoWeb)
                    // row.nameWeb=newValue
                })()

            }
        };
        console.log(this.state.dataCategoryUpdate);

        return (
            <div style={{ display: isToggleForm == false ? ' ' : 'none' }}>
                <BootstrapTable
                    keyField="_id"
                    data={dataCategorys}
                    columns={columns}
                    cellEdit={cellEditFactory(editOptions)}

                />
                <div className='cancelPageCategory' onClick={this.onCancleCloseForm}>
                    <i className="fas fa-sign-out-alt">
                        &nbsp;&nbsp;Trở về
                     </i>
                </div>
            </div>
        )
    }
}
export default popupCategory;