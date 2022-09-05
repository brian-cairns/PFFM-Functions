//adding eventListeners and Control functions
sessionStorage.setItem('newClient',"")
sessionStorage.setItem('staff', '')
const acceptNewClients = document.getElementById('acceptNewClients')
const assignNewClients = document.getElementById('assignNewClients')
let staff = ''
let assignObj = {}
let interval = 'on'


//add Event Listeners for the two functions
acceptNewClients.addEventListener('click', (e) => { 
        if (sessionStorage.getItem('newClient') != '') {
            sessionStorage.setItem('newClient', sessionStorage.getItem('newClient'))
            clearInterval()
            interval = 'off'
            console.log(sessionStorage.getItem('newClient'))
            acceptNewClient(sessionStorage.getItem('newClient'))    
        }        
        
})

assignNewClients.addEventListener('click', (e) => { 
        if (sessionStorage.getItem('newClient') != '' && sessionStorage.getItem('staff') != '') {
            clearInterval()
            interval = 'off'
            assignObj = {
            'newClient': sessionStorage.getItem('newClient', sessionStorage.getItem('newClient')),
            'staff': sessionStorage.getItem('staff', sessionStorage.getItem('staff'))
                }
            assignClientStaff(assignObj)
            console.log(assignObj)
        }
})


async function acceptNewClient(clientName) {
	clearInterval();
  interval = 'off'
	let today = new Date
    let date = today.getDate()
    let mo = today.getMonth() + 1
    let yr = today.getFullYear()
    today = mo+'/'+date+'/'+yr
    let uri = mainUrl + '/updateClient/accept?name=' + clientName + '&date=' + today
    const metaData = {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*"
        }
    }
    console.log('sending =========> ', uri, '&', metaData)
    fetch(uri, metaData)
        .then(() => resetInputs())
        .catch(console.error)
} 

async function assignClientStaff(obj) {
    interval = 'off'
    clearInterval();
    const staffName = obj.staff;
    const clientName = obj.newClient;
    assignedClient = await assignClient(staffName, clientName)
    assignedStaff = await assignStaff(clientName, staffName)
    if (assignedClient == true && assignedStaff == true) {
       resetInputs()
    } 
}

async function assignClient(name, client) {
    let uri = mainUrl + '/updateClient/assign'
    console.log(uri)
    sendBody = {
    	'clientName' : client,
      'provider' : name
    }
    const metaData = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body : JSON.stringify(sendBody)
    }
    fetch(uri, metaData)
        .then(() => { return true })
        .catch((err) => {
            console.log(err)
            return false
        })
}

async function assignStaff(clientName, staffName) {
    let uri = mainUrl + '/employee/assign'
    mainBody = {
        'staffName': staffName,
        'clientName': clientName
    }
    const metaData = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(mainBody) 
    }
    fetch(uri, metaData)
        .then(() => { return true })
        .catch((err) => {
            console.log(err)
            return false
        })
}

function resetInputs() {
		sessionStorage.clear()
    getProviders()
		getClients()
    interval = 'off'
 }