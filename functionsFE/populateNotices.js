async function populateNotices() {
getNotifications('admin');


}


async function getNotifications(name) {
    const url = 'https://pffm.azurewebsites.net/notices'
    let uri = url + '/?name=' + name
    fetch(uri, {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*"
        }
    })
        .then((result) => result.json())
        .then((data) => fillNotices(data))   
        .catch(console.error)
}

async function fillNotices(data) {
    console.log(data)
    let urgent = [];
    let general = [];
        data.forEach((notice) => {
            notice.priority == 'urgent' ? urgent.push(notice) : general.push(notice)
            })
            console.log('urgent =====> ', urgent)
            console.log('general =====> ', general)
            let notifications = {
                'urgent': urgent,
                'general': general
            }
    await populateNoticesUrgent(urgent)
    await populateNoticesGeneral(general)    
         
}


async function populateNoticesUrgent(notices) {
    let noticeContainer = document.getElementById('urgentNoticeContainer')
    notices.forEach((notice) => {
        const style = document.getElementById('notice')
        const newNotice = style.cloneNode(true)
        newNotice.setAttribute('id', '')
        const pStyle = document.getElementById('noticeText')
        let newMessage = pStyle.cloneNode(true)
        newMessage.innerHTML = notice.message
        newNotice.style.display = 'inline-flex'
        newMessage.style.display = 'inline'
        newNotice.appendChild(newMessage)
        noticeContainer.appendChild(newNotice)
    })
}

async function populateNoticesGeneral(notices) {
    let noticeContainer = document.getElementById('generalNoticeContainer')
    notices.forEach((notice) => {
        const style = document.getElementById('notice')
        const newNotice = style.cloneNode(true)
        newNotice.setAttribute('id', '')
        const pStyle = document.getElementById('noticeText')
        let newMessage = pStyle.cloneNode(true)
        newMessage.innerHTML = notice.message
        newNotice.style.display = 'inline-flex'
        newMessage.style.display = 'inline'
        newNotice.appendChild(newMessage)
        noticeContainer.appendChild(newNotice)
    })
}
populateNotices()