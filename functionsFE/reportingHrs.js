const hrsWorked = document.getElementById('hrsWorked')
const hrsUsed = document.getElementById('hrsUsed')

//add Event Listeners for the two functions
hrsUsed.addEventListener('click', (e) => { 
				console.log('click', sessionStorage.getItem('newClient'))
        if (sessionStorage.getItem('newClient') != '') {
            sessionStorage.setItem('newClient', sessionStorage.getItem('newClient'))
            console.log(sessionStorage.getItem('newClient'))
            retrieveHrsUsed(sessionStorage.getItem('newClient'))    
        }        
        
})

hrsWorked.addEventListener('click', (e) => { 
        if (sessionStorage.getItem('staff') != '') {
            sessionStorage.setItem('staff', sessionStorage.getItem('staff'))
            retrieveHrsWorked(sessionStorage.getItem('staff'))
            console.log(sessionStorage.getItem('staff'))
        }
})
let close = document.getElementById('close')
close.addEventListener('click', (e) => {
    document.getElementById('showHours').style.display = 'none';
    resetPage()
})

//Retrieve Hours

//Retrieve Hours Worked

async function retrieveHrsWorked(staff) {
    let uri = 'https://pffm.azurewebsites.net/employee/time?name=' + staff
    metaData = {
        method: 'GET',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*"
        }
    }
    console.log(uri)
    fetch(uri, metaData) 
        .then((res) => res.json())
        .then((data) => showHours(data))
        .catch((err) => console.log(err))
}

async function retrieveHrsUsed(client) {
    let uri = 'https://pffm.azurewebsites.net/client/usage?name=' + client
    metaData = {
        method: 'GET',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*"
        }
    }
    console.log(uri)
    fetch(uri, metaData) 
        .then((res) => res.json())
        .then((data) => showHours(data))
        .catch((err) => console.log(err))
}

function showHours(data) {
    document.getElementById('name').innerHTML = data.name;
    document.getElementById('ttlHrs').innerHTML = data.ttlHrs;
    document.getElementById('start').innerHTML = data.start;
    document.getElementById('end').innerHTML = data.end;
    document.getElementById('showHours').style.display = 'block'
}

