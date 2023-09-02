let enteredIp=document.querySelector("input")
let btn= document.querySelector(".btn");

let ipContainer=document.querySelector(".ip span")
let ip

let locationContainer=document.querySelector(".loc span")
let loc

let timeContainer=document.querySelector(".time span")
let time

let ispContainer=document.querySelector(".isp span")
let isp

var map = L.map('display-map',{'center':[0,0],
'zoom':0,
'layers':[
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})

]
})
updateMarker=(update_marker=[30.222,30.222])=>{
    map.setView(update_marker,13)
    L.marker(update_marker).addTo(map)
}

getIPDetails =(default_ip)=>{
    if(default_ip==undefined){
        var ip_url="https://geo.ipify.org/api/v2/country,city?apiKey=at_baOUBtJ6MnTXAfo2KCnI42wSrq8b7&"
    }
    else{
            ip_url=`https://geo.ipify.org/api/v2/country,city?apiKey=at_baOUBtJ6MnTXAfo2KCnI42wSrq8b7&ipAddress=${enteredIp.value}`   
    }
    fetch(ip_url)
    .then(res=>res.json())
    .then(res=>{
    ipContainer.innerHTML=""
    locationContainer.innerHTML=""
    timeContainer.innerHTML=""
    ispContainer.innerHTML=""
    ip=document.createTextNode(res.ip)
    ipContainer.appendChild(ip)
    

    loc=document.createTextNode(`${res.location.country}, ${res.location.region}`)
    locationContainer.appendChild(loc)

    time=document.createTextNode(`UTC ${res.location.timezone}`)
    timeContainer.appendChild(time)

    isp=document.createTextNode(res.isp)
    ispContainer.appendChild(isp)
    updateMarker(update_marker =[res.location.lat,res.location.lng])
})
    .catch(error=>alert("Oops! something went wrong."))
}

getIPDetails()

document.addEventListener("load",updateMarker())
btn.addEventListener("click",e=>{
    e.preventDefault()
    if(enteredIp.value!=""&&enteredIp.value!=null){
        getIPDetails(enteredIp.value)
        return;
    }
    alert("please enter valid IP Address")
})
