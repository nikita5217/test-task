const ranges = document.querySelectorAll('.ranges .range')
const backblazeNum = document.querySelector('.backblaze-num')
const bunnyNum = document.querySelector('.bunny-num')
const scalewayNum = document.querySelector('.scaleway-num')
const vultrNum = document.querySelector('.vultr-num')
const bunnyBtns = document.querySelectorAll('.bunny-btns .btn')
const scalewayBtns = document.querySelectorAll('.scaleway-btns .btn')
const columns = document.querySelectorAll('.providers-columns .column')

let backblazeValue = {index: 0, value: ''}
let bunnyValue = {index: 1, value: ''}
let scalewayValue = {index: 2, value: ''}
let vultrValue = {index: 3, value: ''}
let storageValue
let transferValue
let bunnyBool = true
let scalewayBool = true

ranges.forEach(range => {
    const input = range.querySelector('.inp-cont input')
    const diapason = range.querySelector('.diapason')
    const titleValue = range.querySelector('h2 .value')
    const valueLine = range.querySelector('.inp-cont .value-line')

    changeStorageInputValue()

    for (let i = 0; i < 2; i++) diapason.appendChild(document.createElement('p'))

    diapason.querySelectorAll('p')[0].innerText = input.min
    diapason.querySelectorAll('p')[1].innerText = input.max

    input.addEventListener('input', changeStorageInputValue)

    function changeStorageInputValue(){
        titleValue.innerText = `${input.value} GB`
        valueLine.style.width = `${(input.value-input.min)/((input.max-input.min)/100)}%`
        range.classList.contains('range-storage') ? storageValue = input.value : transferValue = input.value
        caluculate()
    }
})

bunnyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        bunnyBool ? bunnyBool = false : bunnyBool = true
        switchBtn(btn, bunnyBtns)
    })
})
scalewayBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        scalewayBool ? scalewayBool = false : scalewayBool = true
        switchBtn(btn, scalewayBtns)
    })
})

function switchBtn (btn, btnsArr){
    for (let i = 0; i < btnsArr.length; i++) btnsArr[i].classList.remove('active')
    btn.classList.add('active')
    caluculate()
}

function caluculate(){

    
    backblazeValue.value = (storageValue*0.005+transferValue*0.01 > 7 ? storageValue*0.005+transferValue*0.01 : 7).toFixed(2)
    bunnyValue.value = ((bunnyBool ? storageValue*0.01 : storageValue*0.02)+transferValue*0.01 < 10 ? (bunnyBool ? storageValue*0.01 : storageValue*0.02)+transferValue*0.01: 10).toFixed(2)
    scalewayValue.value = ((storageValue-75 > 0 ? storageValue-75 : 0)* (scalewayBool ? 0.06 : 0.03) + (transferValue-75 > 0 ? transferValue-75: 0)*0.02).toFixed(2)
    vultrValue.value = (storageValue*0.01+transferValue*0.01 > 5 ? storageValue*0.01+transferValue*0.01 : 5).toFixed(2)

    let providersArray = [backblazeValue, bunnyValue, scalewayValue, vultrValue]
    providersArray.sort((a, b) => a.value - b.value)

    for (let i = 0; i < columns.length; i++) columns[i].classList.remove('lowest')

    columns[providersArray[0].index].classList.add('lowest')

    providersArray[0].value == providersArray[1].value ? columns[providersArray[1].index].classList.add('lowest') : ''
    providersArray[0].value == providersArray[2].value ? columns[providersArray[2].index].classList.add('lowest') : ''
    
    backblazeNum.innerText = `${backblazeValue.value}$`
    bunnyNum.innerText = `${bunnyValue.value}$`
    scalewayNum.innerText = `${scalewayValue.value}$`
    vultrNum.innerText = `${vultrValue.value}$`

    if(window.innerWidth > 500){
        columns[0].style.width = `${backblazeValue.value}%`
        columns[1].style.width = `${bunnyValue.value}%`
        columns[2].style.width = `${scalewayValue.value}%`
        columns[3].style.width = `${vultrValue.value}%`
    }else{
        columns[0].style.height = `${backblazeValue.value*1.15}%`
        columns[1].style.height = `${bunnyValue.value*1.15}%`
        columns[2].style.height = `${scalewayValue.value*1.15}%`
        columns[3].style.height = `${vultrValue.value*1.15}%`
    }
}