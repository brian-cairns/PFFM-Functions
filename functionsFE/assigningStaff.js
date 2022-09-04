const acceptNewClients = document.getElementById('acceptNewClients')
const assignNewClients = document.getElementById('assignNewClients')
const mainUrl = 'https://pffm.azurewebsites.net'
let staff = ''
let assignObj = {}


//add Event Listeners for the two functions
acceptNewClients.addEventListener('click', (e) => { 
    const newClient = setInterval(getNewClient(), 1000)
    if (newClient != '') {
        acceptNewClient(newClient)
    }
})

assignNewClients.addEventListener('click', (e) => { 
    const newClient = setInterval(getClientStaff(), 1000)
    if (assignObj.newClient != '' && assignObj.staff != '') {
        clearInterval()
        assignClientStaff(assignObj)
    }
})

function getNewClient() {
    if (sessionStorage.getItem('newClient') != '') {
        clearInterval()
        assignObj = {
            'newClient': sessionStorage.getItem('newClient'),
            'staff': sessionStorage.getItem('staff')
        }
        return assignObj
    }
}

function getClientStaff() {
    if (sessionStorage.getItem('newClient') != '' && sessionStorage.getItem('staff') != '') {
        clearInterval()
        assignObj = {
            'newClient': sessionStorage.getItem('newClient'),
            'staff': sessionStorage.getItem('staff')
        }
        return assignObj
    }

}

async function acceptNewClient(clientName) {
    intakeDate = getToday()
    clientRecord = await fetchRecord(clientName);
    clientRecord.intakeDate = intakeDate;
    updated = await updateClient(clientRecord)
    if (updated) { notify(clientName) } 
}

function getToday() {
    let today = new Date;
    let day = today.getDate()
    let mo = today.getMonth() + 1;
    let yr = today.getFullYear();
    return `${mo}/${day}/${yr}`
}

async function fetchRecord(name) {
    let uri = mainUrl + '/clients/?name=' + name;
    fetch(uri, {
        method: 'GET',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*"
        }
    })
        .then(results => results.json())
        .then((data) => { return data })
        .catch(console.error)
}

async function updateClient(record) {
    const data = JSON.stringify(record)
    const metaData = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: data 
    }
    const uri = mainUrl + '/updateClient'
    fetch(uri, metaData)
        .then(() => { return true })
        .catch((error) => {
            console.log(error)
            return false
        })
}

async function notify(name) {
    const notice = `<p>Please make sure to complete your <a href='https://phoenix-freedom-foundation-backend.webflow.io/completed-forms/new-client-intake-form</p>`
    const data = {
        'name': name,
        'notice': notice,
        'type': 'individual',
        'priority': 'urgent'
    }
    const metaData = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(data) 
    }
    const uri = mainUrl + '/notices'
    fetch(uri, metaData)
        .then(() => { return true })
        .catch(console.error)
}

async function assignClientStaff(object) {
    let clientRecord = await fetchRecord(object.newClient)
    clientRecord.staffName = object.staffName;
    updated = await updateClient(clientRecord)
    staffRecord = fetchStaffRecord(object.staff)
    staffRecord.clients.push(object.newClient)
    updated2 = await updateStaff(staffRecord)


}

async function fetchStaffRecord(staffName) {
    const uri = mainUrl + '/employee?name=' + staffName
    metaData = {
        method: 'GET',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*"
        }
        }
    fetch(uri, metaData)
        .then(results => results.json())
        .then((data) => { return data })
        .catch(console.error)        
}

async function updateStaff(staffRecord) {
     const data = JSON.stringify(record)
    const metaData = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: data 
    }
    const uri = mainUrl + '/employee/update';
    
} 

