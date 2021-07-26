let data

let select = document.querySelector('select')
let town = document.querySelector('.town')
let city = document.querySelector('.divider .city')
let mainCityDetail = document.querySelector('.main')

fetch('https://data.epa.gov.tw/api/v1/aqx_p_432?offset=0&limit=10000&api_key=177a1065-4686-4086-a45e-08389e85ed17', {})
    .then((response) => {
        // 這裡會得到一個 ReadableStream 的物件
        // console.log(response);
        // 可以透過 blob(), json(), text() 轉成可用的資訊
        return response.json();
    }).then((jsonData) => {
        data = jsonData.records

        renderOption(data)
        console.log(data);
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
        color(item.textContent,item)
    })

    mainTown.forEach(function (item, index) {
        textSize(item)
    })
}

function renderMainCity(item) {
    mainCityDetail.innerHTML = `
        <p class="mainTown">${item.SiteName}</p>
        <p class="townNum">${item.AQI}</p>
    `
    let num = document.querySelector('.townNum')
    let mainText = document.querySelector('.mainTown')

    color(item.AQI,num)
    textSize(mainText)
}


function color(num,item) {
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

function textSize(item){
    let text = item.textContent
    if (text.length > 3) {
        item.style.fontSize = '32px'
    }
}