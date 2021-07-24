let data

// axios.get('https://data.epa.gov.tw/api/v1/aqx_p_432?offset=0&limit=10000&api_key=177a1065-4686-4086-a45e-08389e85ed17')
//     .then(function (response) {
//         console.log(response.data);
//         // console.log(response.status);
//         // console.log(response.statusText);
//         // console.log(response.headers);
//         // console.log(response.config);
//         data = response.data.records
//         console.log(data);


//     });

fetch('https://data.epa.gov.tw/api/v1/aqx_p_432?offset=0&limit=10000&api_key=177a1065-4686-4086-a45e-08389e85ed17', {})
    .then((response) => {
        // 這裡會得到一個 ReadableStream 的物件
        // console.log(response);
        // 可以透過 blob(), json(), text() 轉成可用的資訊
        return response.json();
    }).then((jsonData) => {
        data = jsonData
        console.log(data);
    }).catch((err) => {
        // console.log('錯誤:', err);
    });