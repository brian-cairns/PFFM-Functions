//The purpose of this module is to enable selecting members from two lists and
//creating a link between them - e.g provider/client

//Creating the provider list.
const mainUrl = 'https://pffm.azurewebsites.net'
sessionStorage.clear()

sessionStorage.clear()
//The purpose of this module is to enable selecting members from two lists and
//creating a link between them - e.g provider/client

//Creating the provider list.

console.log('--------getting Providers and Clients----------')
getProviders()
getClients()


async function getProviders() {
    const uri = mainUrl + '/employee/all'
    fetch(uri, {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*"
        }
    })
        .then(results => results.json())
        .then((data) => populateProviders(data))
        .catch(console.error)
}

function populateProviders(data) {
	const myElement = document.getElementById('staffCard');
	for (const child of myElement.children) {
  console.log(child.tagName, child.id);
		}

    console.log('staff data ======> ', data)
    const providerContainer = document.getElementById('staffContainer')
    sessionStorage.setItem('providerNum', data.length)
    data.forEach((staff) => {
        const style = document.getElementById('staffCard')
        const card = style.cloneNode(true)
        card.setAttribute('id', '')
        card.style.display = 'inline-flex'
        card.childNodes[0].src = 'https://assets.website-files.com/628cf17b968444eb2b7323c5/631202f753d33f7bd8dd2536_person-1824147.svg'
        card.childNodes[1].innerText = staff.name
        let count = 0
        card.addEventListener('click', (e) => {
    if (sessionStorage.getItem('staffBlocked') == 'true') { return }
    count == 0 ? count = 1 : count = 0
    if (count == 1) {
        sessionStorage.setItem('staff', staff.name)
        card.style.backgroundColor = 'red'
        sessionStorage.setItem('Staffblocked', true)
    }
    if (count == 0) {
        sessionStorage.setItem('staff', '')
        card.style.backgroundColor = "#DDDDDD"
        sessionStorage.setItem('staffBlocked', false)
    }
})
        providerContainer.appendChild(card)
    })
}

//Creating the client lists.
async function getClients(query) {
    const uri = mainUrl + '/client/all'
   fetch(uri, {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*"
        }
    })
        .then(results => results.json())
        .then((data) => {
        	console.log(data)
        	let existingClients = []
          let newClients = []
          data.forEach((item) => {
          	item.intakeDate == '' ? newClients.push(item.name) : existingClients.push(item.name)
          })
          populateClientList(existingClients)
          populateNewClientList(newClients)
        })
        .catch(console.error)
}

function populateClientList(data) {
    console.log('client data ======> ', data)
    const clientContainer = document.getElementById('clientContainer')
    console.log(data.length)
    sessionStorage.setItem('clientNum', data.length)
    for (let i=0; i<data.length; i++) {
    		console.log('i =======>', i)
        const style = document.getElementById('clientCard')
        const card = style.cloneNode('true')
        card.setAttribute('id', '')
        card.style.display = 'inline-flex'
        card.childNodes[0].src = 'https://assets.website-files.com/628cf17b968444eb2b7323c5/63120935ece46250386226e3_silhouettes-28769.svg'
        card.childNodes[1].innerText = data[i]
        let count = 0
        card.addEventListener('click', (e) => {
    if (sessionStorage.getItem('clientBlocked') == 'true') { return }
    count == 0 ? count = 1 : count = 0
    if (count == 1) {
        sessionStorage.setItem('newClient', data[i])
        card.style.backgroundColor = 'red'
        sessionStorage.setItem('clientBlocked', true)
    }
    if (count == 0) {
        sessionStorage.setItem('newClient', '')
        card.style.backgroundColor = "#DDDDDD"
        sessionStorage.setItem('clientBlocked', false)
    }
})
        clientContainer.appendChild(card)
	}
 }

function populateNewClientList(data) {
    console.log('newClient data ======> ', data)
    console.log(data.length)
    const newClientContainer = document.getElementById('newClientContainer')
    sessionStorage.setItem('newClientNum', data.length)
     for (let i=0; i<data.length; i++) {
     console.log('i =======>', i)
        const style = document.getElementById('newClientCard')
        const card = style.cloneNode('true')
        card.setAttribute('id', '')
        card.style.display = 'inline-flex'
        card.childNodes[0].src = 'https://assets.website-files.com/628cf17b968444eb2b7323c5/63120935ece46250386226e3_silhouettes-28769.svg'
        card.childNodes[1].innerText = data[i]
        let count = 0
        card.addEventListener('click', (e) => {
    if (sessionStorage.getItem('newClientBlocked') == 'true') { return }
    count == 0 ? count = 1 : count = 0
    if (count == 1) {
        sessionStorage.setItem('newClient', data[i])
        card.style.backgroundColor = 'red'
        sessionStorage.setItem('newClientBlocked', true)
    }
    if (count == 0) {
        sessionStorage.setItem('newClient', '')
        card.style.backgroundColor = "#DDDDDD"
        sessionStorage.setItem('newClientBlocked', false)
    }
})
        newClientContainer.appendChild(card)
        console.log(i)
    }
    
}