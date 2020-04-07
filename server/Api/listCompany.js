// const express = require('express');
// const router = express.Router();
// const axios = require('axios');
// const cheerio = require('cheerio');
// const qs = require('qs');
// var checkToken = require('./checkToken');
// var auth = checkToken.checkToken;
// var listCompany = require('../Model/company-info');
// var webInfo = require('../Model/web-info');
// updatePage = async (webinfoId, lastpage, res) => {
//     let today = new Date();
//     var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
//     try {
//         let resWebInfo = await webInfo.updateOne({ _id: webinfoId }, { lastPage: lastpage, timeCrawler: JSON.stringify(date) });
//         res.send(date);
//     } catch (err) {
//         res.send({ success: false})
//     }
// }
// crawlerDataCompany = (webinfoId, webinfoUrl, res, firstPage) => {
//     (async () => {
//         try {
//             var dem = 0;
//             var stop = 0;
//             const config = {
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                     'Cookie': "AspxAutoDetectCookieSupport=1;",
//                     'timeout': 5000
//                 }
//             }
//             for (let k = firstPage; k <3; k++) {
//                 console.log(k, 'ds');
//                 const requestBody = {
//                     page: k
//                 }
//                 if(dem==1){
//                     console.log("cong tran");  
//                     return res.send({success:false})
//                 }
//                 const result = await axios.post(webinfoUrl, qs.stringify(requestBody), config);
//                 $ = cheerio.load(result.data);
//                 var pathss = await $('table[class="table table-bordered"] > tbody > tr > td > a');
//                 if (pathss.length == 0) {
//                     console.log("cong thik Duyên");
//                     dem = 1;
//                 } else {
//                     (async () => {
//                         for (let i = 0; i < pathss.length; i++) {
//                             // let i=0
//                             // while (i<pathss.length) {
//                             //   if (stop==1) {
//                             //       console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd");
//                             //       return
//                             //   } 
//                         await axios.get('http://online.gov.vn' + $(pathss[i]).attr('href'), { timeout: 5000 }).then((result) => {
//                                 //   if(result.data.length==0){
//                                 //       console.log("dddddddddddddddddddddddddddddddddddddddddd");

//                                 //   }
//                                 // console.log(result.data);
//                                 if(dem==1) {
//                                     console.log("ddd");  
//                                     return res.send({success:false})
//                                 }
//                                 console.log("2");
//                                 $ = cheerio.load(result.data);
//                                 var datalabel = $('div[class="row"] > div > div:last-child > div > div:first-child');
//                                 var valueDatalabel = $('div[class="row"] > div > div:last-child > div > div:last-child');
//                                 const newlistCompany = new listCompany();
//                                 for (let index = 0; index < datalabel.length; index++) {
//                                     if (stop == 1) {
//                                         updatePage(webinfoId, k, res);
//                                         return
//                                     }
//                                     switch ($(datalabel[index]).text().trim()) {
//                                         case 'Tỉnh/Thành phố:':
//                                             newlistCompany.nameCity = $(valueDatalabel[index]).text().trim();
//                                             break;
//                                         case 'Tên ứng dụng:':
//                                             newlistCompany.nameApp = $(valueDatalabel[index]).text().trim();
//                                             break;
//                                         case 'Địa chỉ tên miền:':
//                                             newlistCompany.domainName = $(valueDatalabel[index]).text().trim();
//                                             break;
//                                         case 'Tên miền phụ:':
//                                             newlistCompany.subdomainName = $(valueDatalabel[index]).text().trim();
//                                             break;
//                                         case 'Tên Doanh nghiệp:':
//                                             newlistCompany.nameCompany = $(valueDatalabel[index]).text().trim();
//                                             break
//                                         case 'Cá nhân:':
//                                             newlistCompany.nameCompany = $(valueDatalabel[index]).text().trim();
//                                             break
//                                         case 'MST/ĐKKD/QĐTL:':
//                                             newlistCompany.taxCode = $(valueDatalabel[index]).text().trim();
//                                             break;
//                                         case 'Mã số thuế:':
//                                             newlistCompany.taxCode = $(valueDatalabel[index]).text().trim();
//                                             break;

//                                         case 'Trụ sở Doanh nghiệp:':
//                                             newlistCompany.address = $(valueDatalabel[index]).text().trim();
//                                             break;

//                                         case 'Tỉnh/Thành phố:':
//                                             newlistCompany.city = $(valueDatalabel[index]).text().trim();
//                                             break;

//                                         case 'Điện thoại':
//                                             newlistCompany.telePhone = $(valueDatalabel[index]).text().trim();
//                                             break;
//                                         case 'Số điện thoại:':
//                                             newlistCompany.telePhone = $(valueDatalabel[index]).text().trim();
//                                             break;
//                                     }
//                                 }
//                                 newlistCompany.webInfoId = webinfoId;
//                                 console.log(newlistCompany);
//                                 listCompany.find({
//                                      telePhone: newlistCompany.telePhone,
//                                     taxCode: newlistCompany.taxCode,
//                                     address: newlistCompany.address,
//                                     nameCompany:newlistCompany.nameCompany

//                                     //$or: [{ domainName: newlistCompany.domainName }, { nameApp: newlistCompany.nameApp }]
//                                 })
//                                     .then((dataListCompany) => {
//                                         if (dataListCompany.length == 0) {
//                                             newlistCompany.save();
//                                         }
//                                         //updatePage(webinfoId,k,res); 
//                                     }).catch((err) => {
//                                         //updatePage(webinfoId, k, res);
//                                     });
//                             }).catch((err) => {
//                                 //updatePage(webinfoId, k, res);
//                                 console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");  
//                                 dem=1;
//                                 return res.send({successCrawler:false})
//                             });
//                         }
//                     })()                  
//                 }
//                 // if (dem == 1) {
//                 //     updatePage(webinfoId, k, res);
//                 //     console.log("d");
//                 //     return res.send({ success: true })
//                 // }
//                 //} 
//             }
//         } catch (err) {
//             dem=1
//            // return res.send({successCrawlerAwait : false})
//         }
//     })()
// }
// router.post('/', (req, res) => {
//     var { webinfoUrl } = req.body;
//     webInfo.find({}).then((result) => {
//         //console.log(result[result.length-1]._id);
//         crawlerDataCompany(result[result.length - 1]._id, webinfoUrl, res, 1);
//         //  res.send({success:true})

//     }).catch((err) => {
//         res.send(err)
//     });
//     //     var {webinfoUrl,webinfoName}  = req.body ; 
//     //     console.log(req.body);
//     //    crawlerDataCompany(webinfoName,webinfoUrl,res,1);
// })
// router.post('/crawlerContinue', (req, res) => {
//     var { webinforName, lastPage, pathUrl } = req.body;
//     console.log(req.body);
//     try {
//         crawlerDataCompany(webinforName, pathUrl, res, lastPage);
//         res.send({ success: true })
//     } catch (err) {
//         res.send({ success: false, message: err })
//     }
//     // webInfo.find({_id :webinforName}).then((result) => {
//     //     if(result){
//     //          crawlerDataCompany(webinforName,result[0].pathUrl,res,result[0].lastPage)
//     //     }else{
//     //         res.status(404).send("not product")
//     //     }
//     // }).catch((err) => {
//     //     res.send({success:false,message:err})
//     // });
// })
// router.delete('/', auth, (req, res) => {
//     let arrayId = req.body.arrayId;
//     for (let i = 0; i < arrayId.length; i++) {
//         listCompany.deleteOne({ _id: arrayId[i] }).then((result) => {
//             if (result) {
//                 res.send({ success: true })
//             } else {
//                 res.send('not company')
//             }
//         }).catch((err) => {
//             res.send({ success: false, message: err })
//         });
//     }
// })
// router.get('/:_id', auth, (req, res) => {
//     listCompany.find({ webInfoId: req.params._id }).then((result) => {
//         console.log(result.length);
//         res.send(result);
//     }).catch((err) => {
//         res.send({ success: false, message: err })
//     });
// })
// router.get('/abc', auth, (req, res) => {
//     listCompany.find().then((result) => {
//         res.send(result)
//     }).catch((err) => {

//     });
// })
// router.put('/', auth, (req, res) => {
//     listCompany.updateOne({ _id: req.body._id }, req.body).then((data) => {
//         if (data) {
//             res.status(200).send(data)
//         } else {
//             res.status(404).send("not product")
//         }
//     }).catch((err) => {
//         res.send({ success: false, message: err })
//     });
// })
// module.exports = router;


const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const qs = require('qs');
var checkToken = require('./checkToken');
var auth = checkToken.checkToken;
var listCompany = require('../Model/company-info');
var webInfo = require('../Model/web-info');
updatePage = async (webinfoId, lastpage, res) => {
    let today = new Date();
    let  date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    let  time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
   let dateTime = date+' '+time;
    webInfo.updateOne(
        { _id: webinfoId },
        { lastPage: lastpage, timeCrawler: dateTime }).then((result) => {
            console.log(result);

        }).catch((err) => {
            console.log(err);
        });
    // try {
    //     let resWebInfo = await webInfo.updateOne({ _id: webinfoId }, { lastPage: lastpage, timeCrawler: JSON.stringify(date) });
    //     res.send(date);
    // } catch (err) {
    // return res.status(400).json({
    //     status: 'error',
    //     error: 'req body cannot be empty',
    //   });
    //}
}
// listFindCompany = async (idCompany)=>{
//     try{
//         let finCompany = await listCompany.find({webInfoId:idCompany});
//         console.log(finCompany.data.length,"sdddsccac");  
//     }catch(err){
//         console.log("errrrr");

//     }
// }
crawlerDataCompany = (webinfoId, webinfoUrl, res, firstPage) => {
    (async () => {
        var dem = 0;
        var stop = 0;
        let k = firstPage
        while (k < k + 1) {
            // for(let k=firstPage ; k<5 ;k++){
            console.log(k, 'ds');
            const requestBody = {
                page: k
            }
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': "AspxAutoDetectCookieSupport=1;",
                    'timeout': 3000
                }
            }
            if (dem == 2) {
                return res.send({ success: "stop" })
            } {

                await axios.post(webinfoUrl, qs.stringify(requestBody), config)
                    .then((result) => {
                        $ = cheerio.load(result.data);
                        var pathss = $('table[class="table table-bordered"] > tbody > tr > td > a');
                        if (pathss.length == 0) {
                            console.log("cong dep trai nhất nhà");
                            dem = 1;
                        } else {
                            (async () => {
                                //  for(let  i=0 ; i < pathss.length ; i++ ){ 
                                let i = 0
                                while (i < pathss.length) {
                                    //   if (stop==1) {
                                    //       console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd");
                                    //       return
                                    //   } 
                                    axios.get('http://online.gov.vn' + $(pathss[i]).attr('href'), { timeout: 3000 }).then((result) => {
                                        $ = cheerio.load(result.data);
                                        var datalabel = $('div[class="row"] > div > div:last-child > div > div:first-child');
                                        var valueDatalabel = $('div[class="row"] > div > div:last-child > div > div:last-child');
                                        const newlistCompany = new listCompany();
                                        for (let index = 0; index < datalabel.length; index++) {
                                            if (stop == 1) {
                                                updatePage(webinfoId, k, res);
                                                return
                                            }
                                            switch ($(datalabel[index]).text().trim()) {
                                                case 'Tỉnh/Thành phố:':
                                                    newlistCompany.nameCity = $(valueDatalabel[index]).text().trim();
                                                    break;
                                                case 'Tên ứng dụng:':
                                                    newlistCompany.nameApp = $(valueDatalabel[index]).text().trim();
                                                    break;
                                                case 'Địa chỉ tên miền:':
                                                    newlistCompany.domainName = $(valueDatalabel[index]).text().trim();
                                                    break;
                                                case 'Tên miền phụ:':
                                                    newlistCompany.subdomainName = $(valueDatalabel[index]).text().trim();
                                                    break;
                                                case 'Tên Doanh nghiệp:':
                                                    newlistCompany.nameCompany = $(valueDatalabel[index]).text().trim();
                                                    break
                                                case 'Cá nhân:':
                                                    newlistCompany.nameCompany = $(valueDatalabel[index]).text().trim();
                                                    break
                                                case 'MST/ĐKKD/QĐTL:':
                                                    newlistCompany.taxCode = $(valueDatalabel[index]).text().trim();
                                                    break;
                                                case 'Mã số thuế:':
                                                    newlistCompany.taxCode = $(valueDatalabel[index]).text().trim();
                                                    break;

                                                case 'Trụ sở Doanh nghiệp:':
                                                    newlistCompany.address = $(valueDatalabel[index]).text().trim();
                                                    break;

                                                case 'Tỉnh/Thành phố:':
                                                    newlistCompany.city = $(valueDatalabel[index]).text().trim();
                                                    break;

                                                case 'Điện thoại':
                                                    newlistCompany.telePhone = $(valueDatalabel[index]).text().trim();
                                                    break;
                                                case 'Số điện thoại:':
                                                    newlistCompany.telePhone = $(valueDatalabel[index]).text().trim();
                                                    break;
                                            }
                                        }
                                        webInfo.findOne({ _id: webinfoId }).count().then((result) => {
                                            if (result == 0) {
                                                dem = 2
                                                return res.send({ seccess: true })
                                            }else{
                                                newlistCompany.webInfoId = webinfoId;
                                            }
                                        }).catch((err) => {
                                            console.log(err);
                                        });
                                        // newlistCompany.webInfoId = webinfoId;
                                        //console.log(newlistCompany);
                                        if (dem == 2) {
                                            return res.send({ success: "stop" })
                                        } else {
                                            listCompany.find({
                                                telePhone: newlistCompany.telePhone,
                                                taxCode: newlistCompany.taxCode,
                                                address: newlistCompany.address,
                                                $or: [{ domainName: { $lt: newlistCompany.domainName } }, { nameApp: newlistCompany.nameApp }]
                                            })
                                                .then((dataListCompany) => {
                                                    console.log(dataListCompany.length == 0);
                                                    if (dataListCompany.length == 0) {
                                                        if(dem==2){
                                                            return res.send({success:"stop"})
                                                        }else{
                                                            newlistCompany.save();
                                                        }
                                                    }
                                                    //console.log(webinfoId);
                                                    //    (async()=>{
                                                    listCompany.find({ webInfoId: webinfoId }).count().then((result) => {
                                                        let count = Math.ceil(result / 10)
                                                        updatePage(webinfoId, count - 1, res);
                                                    }).catch((err) => {
                                                        console.log(err);    
                                                    });
                                                }).catch((err) => {
                                                    dem = 1
                                                });
                                        }
                                    }).catch((err) => {
                                        dem = 1
                                    });
                                    i++;
                                    if (dem == 2) {
                                        console.log("đ");
                                        return res.send({ success: true })
                                    }
                                }
                            })()
                        }
                    }).catch((err) => {
                        console.log(k, "delay");
                        dem = 1;
                    })
            }
            if (dem == 1) {
                listCompany.find({ webInfoId: webinfoId }).count().then((result) => {
                    let count = Math.ceil(result / 10)
                    //return res.send({ success: true ,count:count})
                    updatePage(webinfoId, count - 1, res);
                }).catch((err) => {
                    console.log(err);
                });
                console.log("d");
                return res.send({ success: true })
            }
            //} 
            k++;
        }
    })()
}
router.post('/',auth, (req, res) => {
    var { webinfoUrl } = req.body;
    webInfo.find({}).then((result) => {
        crawlerDataCompany(result[result.length - 1]._id, webinfoUrl, res, 1);
        //  res.send({success:true})

    }).catch((err) => {
        res.send(err)
    });
    //     var {webinfoUrl,webinfoName}  = req.body ; 
    //     console.log(req.body);
    //    crawlerDataCompany(webinfoName,webinfoUrl,res,1);
})
router.post('/crawlerContinue',auth, (req, res) => {
    var { webinforName, lastPage, pathUrl } = req.body;
    console.log(req.body);
    try {
        crawlerDataCompany(webinforName, pathUrl, res, lastPage);
    } catch (err) {
        res.send({ success: false, message: err })
    }
    // webInfo.find({_id :webinforName}).then((result) => {
    //     if(result){
    //          crawlerDataCompany(webinforName,result[0].pathUrl,res,result[0].lastPage)
    //     }else{
    //         res.status(404).send("not product")
    //     }
    // }).catch((err) => {
    //     res.send({success:false,message:err})
    // });
})
router.delete('/', auth, (req, res) => {
    let arrayId = req.body.arrayId;
    for (let i = 0; i < arrayId.length; i++) {
        listCompany.deleteOne({ _id: arrayId[i] }).then((result) => {
            if (result) {
                res.send({ success: true })
            } else {
                res.send('not company')
            }
        }).catch((err) => {
            res.send({ success: false, message: err })
        });
    }
})
router.get('/:_id', auth, (req, res) => {
    listCompany.find({ webInfoId: req.params._id }).then((result) => {
        console.log(result.length);
        res.send(result);
    }).catch((err) => {
        res.send({ success: false, message: err })
    });
})
router.get('/abc', auth, (req, res) => {
    listCompany.find().then((result) => {
        res.send(result)
    }).catch((err) => {

    });
})
router.put('/', auth, (req, res) => {
    listCompany.updateOne({ _id: req.body._id }, req.body).then((data) => {
        if (data) {
            res.status(200).send(data)
        } else {
            res.status(404).send("not product")
        }
    }).catch((err) => {
        res.send({ success: false, message: err })
    });
})
module.exports = router;


