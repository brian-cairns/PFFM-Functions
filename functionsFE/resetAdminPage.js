const providerNum = sessionStorage.getItem('providerNum')
const clientNum = sessionStorage.getItem('clientNum')
const newClientNum = sessionStorage.getItem('newClientNum')

const clientContainer = document.getElementById('clientContainer')
const staffContainer = document.getElementById('staffContainer')
const newClientContainer = document.getElementById('newClientContainer')

const containers = [{ container: clientContainer }, { number: clientNum }, { container: staffContainer }, { number: staffNum }, { container: newClientContainer }, {number: newClientNum}]

function resetPage() {
    for (const container in containers) {
        for (let i = 1; i < container.number; i++) {
            container.childNodes[i].remove()
        }
    }
    sessionStorage.clear()
    getProviders()
	getClients()
}

