let data

let select = document.querySelector('select')
let town = document.querySelector('.town')
let city = document.querySelector('.divider .city')
let mainCityDetail = document.querySelector('.main')
let mainTownDeatil = document.querySelector('.mainTownDeatil')
let upDate = document.querySelector('.divider p')

fetch('https://data.epa.gov.tw/api/v1/aqx_p_432?offset=0&limit=10000&api_key=177a1065-4686-4086-a45e-08389e85ed17', {})
    .then((response) => {
        // 這裡會得到一個 ReadableStream 的物件
        // console.log(response);
        // 可以透過 blob(), json(), text() 轉成可用的資訊
        return response.json();
    }).then((jsonData) => {
        data = jsonData.records

        renderOption(data)
        renderDetail(data[0])
        renderMainCity(data[0])
        date(data)
    }).catch((err) => {
        // console.log('錯誤:', err);
    });

select.addEventListener('click', function (e) {
    town.innerHTML = ``
    let value = e.target.value
    data.forEach(function (item, index) {
        if (value == item.County) {
            city.textContent = value

            town.innerHTML += `
                <div class="townDetail">
                    <p class="mainTown">${item.SiteName}</p>
                    <p class="townNum">${item.AQI}</p>
                    
                </div>
            `
            let mainTown = document.querySelectorAll('.mainTown')
            let townNum = document.querySelectorAll('.townNum')
            let townDetail = document.querySelectorAll('.townDetail')

            //調整版面
            if (townDetail.length > 9) {
                townDetail.forEach(function (item) {
                    item.style.width = '24%'
                })
            }

            //點選縣市跳出細節
            townDetail.forEach(function (item, index) {
                item.addEventListener('click', function () {
                    let content = item.textContent
                    content = content.replaceAll(' ', '').replace('\n', '').split('\n')
                    data.forEach(function (d, i) {
                        if (d.SiteName == content[0]) {
                            renderDetail(d)
                            renderMainCity(d)
                        }
                    })
                })
            })

            renderDetail(item)
            renderAqi(townNum, mainTown)
            renderMainCity(item)
        }
    })
})

// 產生選項
function renderOption(data) {
    let d = []
    data.forEach(function (item) {
        d.push(item.County)
    })

    let result = d.filter((item, index, arr) => {
        return arr.indexOf(item) === index;
    })

    result.forEach(function (item) {
        select.innerHTML += `<option>${item}</option>`
    });
}

// 判斷顏色,字體大小
function renderAqi(data, mainTown) {
    data.forEach(function (item) {
        color(item.textContent, item)
    })

    mainTown.forEach(function (item, index) {
        textSize(item)
    })
}

//顯示左方細節
function renderMainCity(item) {
    mainCityDetail.innerHTML = `
        <p class="mainTown">${item.SiteName}</p>
        <p class="townNum">${item.AQI}</p>
    `
    let num = document.querySelector('.townNum')
    let mainText = document.querySelector('.mainTown')

    color(item.AQI, num)
    textSize(mainText)
}

//判斷顏色
function color(num, item) {
    if (num < 50) {
        item.style.backgroundColor = '#95F084'
    } else if (num < 100) {
        item.style.backgroundColor = '#FFE695'
    } else if (num < 150) {
        item.style.backgroundColor = '#FFAF6A'
    } else if (num < 200) {
        item.style.backgroundColor = '#FF5757'
    } else if (num < 300) {
        item.style.backgroundColor = '#9777FF'
    } else {
        item.style.backgroundColor = '#AD1774'
    }
}

//判斷字體大小
function textSize(item) {
    let text = item.textContent
    if (text.length > 3) {
        item.style.fontSize = '32px'
    }
}

//顯示細節
function renderDetail(item) {
    mainTownDeatil.innerHTML = `
    <div class="detail1"><p>臭氧　<span> O3 (ppb)</span></p><p class="detailNum">${item.O3}</p></div>                
    <div class="detail2"><p>懸浮微粒　<span> PM10 (μg/m³)</span></p><p class="detailNum">${item.PM10}</p></div>
    <div class="detail3"><p>細懸浮微粒　<span> PM2.5 (μg/m³)</span></p><p class="detailNum">${item.PM10}</p></div>
    <div class="detail4"><p>一氧化碳　<span> CO (ppm)</span></p><p class="detailNum">${item.CO}</p></div>
    <div class="detail5"><p>二氧化硫　<span> SO2 (ppb)</span></p><p class="detailNum">${item.SO2}</p></div>
    <div class="detail6"><p>二氧化氮　<span> NO2 (ppb)</span></p><p class="detailNum">${item.NO2}</p></div>          
    `
}

//更新日期
function date(data) {
    let date = data[0].ImportDate
    date = date.split('.')
    date = date[0].slice('0', '16')
    upDate.innerHTML = `${date} 更新`
}