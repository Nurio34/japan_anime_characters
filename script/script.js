
const gifBtn = document.querySelector(".gifBtn")
const fotoBtn = document.querySelector(".fotoBtn")
const gifContainer = document.querySelector(".gif-container")
const fotoContainer = document.querySelector(".foto-container")
const goBtn = document.querySelector(".goBtn")
const gifArr = []
const fotoArr = []
let gifInterval,fotoInterval;

const options = {
        method: "GET",
        contentType: "application/json",
}

async function getGifs() {

        const url = `https://api.catboys.com/baka`
        const response = await fetch(url,options)
        const data = await response.json()

        if(!gifArr.includes(data.url)) {
                gifArr.push(data.url)

        }
        gifContainer.innerHTML = ""

        gifArr.map(item=> {
                gifContainer.innerHTML += `
                        <a href="${item}" target="_blank">
                                <img src="${item}">
                        </a>
                `
        })

        if(gifArr.length === 12) {
                clearInterval(gifInterval)
        }
}

gifInterval = setInterval(() => {
        getGifs()
}, 400);



async function getFotos() {

        const url = `https://api.catboys.com/img`
        const response = await fetch(url,options)
        const data = await response.json()

        if(!fotoArr.includes(data.url)) {
                fotoArr.push(data.url)

        }
        fotoContainer.innerHTML = ""

        fotoArr.map(item=> {
                fotoContainer.innerHTML += `
                <a href="${item}" target="_blank">
                        <img src="${item}">
                </a>
        `
        })

        if(fotoArr.length % 12 === 0) {
                clearInterval(fotoInterval)
                goBtn.disabled = false
                goBtn.classList.remove("hidden")
        }
}

fotoInterval = setInterval(() => {
        getFotos()
}, 400);

goBtn.addEventListener("click", ()=> {
        goBtn.classList.add("hidden")
        goBtn.disabled = true
        fotoInterval = setInterval(() => {
                getFotos()
        }, 400);
})

window.addEventListener("scroll", (e)=> {
        const fotoHeight = fotoContainer.getBoundingClientRect().height
        const bodyY = document.body.getBoundingClientRect().y
        const absDif = 1000

        if(fotoHeight + bodyY > absDif) {
                goBtn.classList.add("hidden")
        } else {
                goBtn.classList.remove("hidden")
        }

        console.log(fotoHeight);
        console.log(bodyY);
        console.log(absDif);
})





fotoBtn.addEventListener("click",()=>{
        fotoContainer.classList.remove("hidden")
        gifContainer.classList.add("hidden")
})

gifBtn.addEventListener("click",()=>{
        fotoContainer.classList.add("hidden")
        gifContainer.classList.remove("hidden")
})