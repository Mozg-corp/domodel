import axios from 'axios';

function putData(url, body) {
    return axios({
        method: 'put',
        url: url,
        data: body,
        headers: {'Content-Type': 'application/json'}
    });
}


function getData(url){
    return axios({
        method: 'get',
        url: url,
        headers: {'Content-Type': 'application/json'}
    });
}
function postData(url, body) {
    return axios({
        method: 'post',
        url: url,
        data: body,
        headers: {'Content-Type': 'application/json'}
    });
}


export {getData, postData, putData};