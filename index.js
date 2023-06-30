import data from './data.json' assert { type: 'json'}

const none = document.querySelector('.none')

let noneLeft = document.querySelector('.none-left')

const card = document.querySelector('.cards')

const clear = document.querySelector('.clear')

let events = []



const displayJob = (jobArr) => {

card.innerHTML = ''

for (let index = 0; index < jobArr.length; index++) {

    const { id, company, logo, neW, featured, position, role, level, postedAt, contract, location, languages, tools } = jobArr[index]

    const container = document.createElement('div')
    container.classList.add('container')
    card.append(container)
    
    const containerTop = document.createElement('div')
    containerTop.classList.add('container-top')

    const line = document.createElement('div')
    line.classList.add('line')

    const containerBottom = document.createElement('div')
    containerBottom.classList.add('container-bottom')

    container.append(containerTop, line, containerBottom)

    const divIcon = document.createElement('div')
    divIcon.classList.add('div-icon')

    const iconElement = document.createElement('img')
    iconElement.classList.add('logo-img')
    iconElement.src = logo

    divIcon.append(iconElement)

    const divMain = document.createElement('div')
    divMain.classList.add('div-main')

    const containerTopHeader = document.createElement('div')
    containerTopHeader.classList.add('container-top-header')

    const companyName = document.createElement('span')
    companyName.classList.add('company')
    companyName.textContent = company
    containerTopHeader.append(companyName)

    if(neW) {
        const neWName = document.createElement('button')
        neWName.classList.add('new-name-btn')
        neWName.textContent = "NEW"
        containerTopHeader.append(neWName)
    }

    if(featured) {
        const featuredName = document.createElement('button')
        featuredName.classList.add('featured-name-btn')
        featuredName.textContent = "FEATURED"
        containerTopHeader.append(featuredName)
    }

    const positionName = document.createElement('p')
    positionName.classList.add('position-name-p')
    positionName.textContent = position

    const containerTopBottom = document.createElement('div')
    containerTopBottom.classList.add('container-top-bottom')

    const postedAtName = document.createElement('span')
    postedAtName.classList.add('posted-at-span')
    postedAtName.textContent = postedAt
    containerTopBottom.append(postedAtName)

    const pointOne = document.createElement('span')
    pointOne.classList.add('point-one')
    containerTopBottom.append(pointOne)

    const contractName = document.createElement('span')
    contractName.classList.add('contract-span')
    contractName.textContent = contract
    containerTopBottom.append(contractName)

    const pointTwo = document.createElement('span')
    pointTwo.classList.add('point-two')
    containerTopBottom.append(pointTwo)

    const locationName = document.createElement('span')
    locationName.classList.add('location-span')
    locationName.textContent = location
    containerTopBottom.append(locationName)

    divMain.append(containerTopHeader, positionName, containerTopBottom)

    containerTop.append(divIcon, divMain)

    const roleName = document.createElement('button')
    roleName.classList.add('btn')
    roleName.textContent = role
    containerBottom.append(roleName)

    roleName.addEventListener('click', () => {
        if(!events.includes(role)){
            events.push(role)
            addElemetsInAr()
            const filteredArray = filterAll()
            displayJob(filteredArray)
        }
    })

    const levelName = document.createElement('button')
    levelName.classList.add('btn')
    levelName.textContent = level
    containerBottom.append(levelName)

    levelName.addEventListener('click', () => {
        if(!events.includes(level)){
            events.push(level)
            addElemetsInAr()
            const filteredArray = filterAll()
            displayJob(filteredArray)
        }
    })

    let languagesName
    for(let i = 0; i < jobArr[index].languages.length; i++) {
        languagesName = document.createElement('button')
        languagesName.classList.add('languages-name-btn')
        languagesName.textContent = languages[i]
        containerBottom.append(languagesName)
        languagesName.addEventListener('click', () => {
            if(!events.includes(languages[i])) {
                events.push(languages[i])
                addElemetsInAr()
                const filteredArray = filterAll()
                displayJob(filteredArray)
            }
        })
    }
    
    let toolsName
    for(let i = 0; i < jobArr[index].tools.length; i++) {
        toolsName = document.createElement('button')
        toolsName.classList.add('tools-name-btn')
        toolsName.textContent = tools[i]
        containerBottom.append(toolsName)
        toolsName.addEventListener('click', () => {
            if(!events.includes(tools[i])) {
                events.push(tools[i])
                addElemetsInAr()
                const filteredArray = filterAll()
                displayJob(filteredArray)
            }
        })
    }
}
}
displayJob(data)

const filterAll = () => {
    return events.length === 0
    ? data
    : data.filter((job) => {
        return events.every((button) => {
            return (
                job.role === button || 
                job.level === button || 
                job.languages.includes(button) ||
                job.tools.includes(button)
            )
        })
    })
}

const addElemetsInAr = () => {
    if(events.length <= 0){
        none.style.display = 'none'
    } else {
        none.style.display = 'flex'
        const divBtnImg = document.createElement('div')
        divBtnImg.classList.add('div-btn-img')
        noneLeft.append(divBtnImg)
        const btn = document.createElement('button')
        const img = document.createElement('img')
        img.src = './images/icon-remove.svg'
        divBtnImg.append(btn, img)
        btn.textContent = events[events.length - 1]
        img.addEventListener ('click', (e) => {
            const btnTextContent = e.target.previousElementSibling.textContent
            const index = events.indexOf(btnTextContent);
            if (index > -1) {
            events.splice(index, 1);
            }
            e.target.parentElement.remove()
            if(events.length <= 0) {
                none.style.display = 'none'
            }
            const filteredArray = filterAll()
            displayJob(filteredArray)
        }) 
        clear.addEventListener('click', () => {
            if(events.length > 0) {
                events = []
                const divBtnImg = document.querySelectorAll('.div-btn-img')
                console.log(divBtnImg)
                for(let i = 0; i < divBtnImg.length; i++) {
                    divBtnImg[i].remove()
               }
                none.style.display = 'none'
            }
            displayJob(data)
        })
    }
}










