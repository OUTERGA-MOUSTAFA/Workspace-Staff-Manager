const roles = ['Nettoyage', 'Sécurité', 'Receptionest', 'Serveur', 'Manager', 'Autre rôles']
const nom = document.getElementById('Nom')
const Roles = document.getElementById('Role')
const Company = document.getElementById('Company')
const role = document.querySelector('#role')
const formDate = document.getElementById("fromDate")
const toDate = document.getElementById("toDate")
const addExp = document.getElementById('addExp')
const email = document.getElementById('email')
const telephone = document.getElementById('telephone')
const saveWorker = document.querySelector('.saveWorker')
const cancelWorker = document.getElementById('cancel')
const closeModal = document.querySelector('.closeModel')
const url = document.getElementById('photo')
const Modal = document.querySelector('.Register')
let counterWorker = document.querySelector('#counterWorker')
let counteur = 0
/*--------------Open Modal--------------------------*/
document.getElementById('addWorker').addEventListener('click', () => {
    Modal.style.display = 'block'
})
/*---------------close Modal------------------------*/
closeModal.addEventListener('click', () => {
    Modal.style.display = 'none'
})

const item1 = document.querySelector('.item-1')
let classWorker = document.querySelector('.BriefInfos')

const modalProfile = document.querySelector('.model')
const infosWorker = document.querySelector('.infosWorker')

document.querySelector('#closeBriefInfos').addEventListener('click', () => {
    modalProfile.style.display = 'none'
})

/*---------------Remlire list roles workers---------*/
roles.forEach(elem => {
    const option = document.createElement('option')
    option.value = elem
    option.textContent = elem
    option.classList = 'rolesList'
    Roles.appendChild(option)
    console.log(option.value)
})

/* --------------declary arrays empty---------------*/
let salleConference = []
let salleReception = []
let salleServeurs = []
let salleSecurite = []
let sallePersonnel = []
let salleArchives = []
let workers = []
let TableExp = []

//--------------- validation funtions befor add------
function errorValidation() {
    const paracompany = document.querySelector('#paracompany')
    const pararolecompany = document.querySelector('#pararolecompany')
    const parafromdate = document.querySelector('#parafromdate')
    const paratodate = document.querySelector('#paratodate')
    let valid = true
    //---------- Company error -----------------------
    if (Company.value.trim() == '') {
        paracompany.textContent = 'Company non valide';
        valid = false;
    } else paracompany.textContent = ''

    //---------- Role error -----------------------
    if (role.value.trim() == '') {
        pararolecompany.textContent = 'Role Ne pas Valider'
        valid = false
        return valid
    } else pararolecompany.innerHTML = ''

    //---------- From Date error -----------------------





    //---------- To Date error -----------------------
    if (formDate.value === '') {
        parafromdate.textContent = 'From date non valide'
        valid = false
    } else {
        parafromdate.textContent = ''
    }

    //---------- To Date error -----------------------
    if (toDate.value === '') {
        paratodate.textContent = 'To date non valide'
        valid = false
        return valid
    } else {
        paratodate.textContent = ''
    }
    console.log(formDate.value, "     ", toDate.value)
    if (formDate.value !== '' && toDate.value !== '') {

        if (formDate.value > toDate.value) {
            parafromdate.textContent = "Date De pas correct!"
            valid = false
            return valid
        } else {
            parafromdate.textContent = ""
        }

    }

}
function validCompany() {
    //---------- Company validation -----------------------
    // if (!errorValidation()) {
    //     console.log('!errorValidation(): ', !errorValidation())
    //     return;
    // }

    if (errorValidation() != false) {

        let addExp = {
            Company: Company.value,
            Role: role.value,
            From: formDate.value,
            To: toDate.value
        }

        TableExp.push(addExp)

        let experienceCompany = document.createElement('p')
        experienceCompany.className = 'paraExperience'
        experienceCompany.textContent = `${role.value}`
        //map(elem =>elem.Role).join('');
        Company.value = ""
        role.value = ""
        formDate.value = ""
        toDate.value = ""
        document.querySelector('.ExpPro').appendChild(experienceCompany)
    }

}

function errosHandling() {
    let valid = true
    let paranom = document.querySelector('#paranom');
    let pararole = document.querySelector('#pararole');
    let paraemail = document.querySelector('#paraemail');
    let paratele = document.querySelector('#paratele');

    let selectedRole = Roles.value;
    if (selectedRole === '') {
        pararole.textContent = 'Role non valide'
        valid = false
        return valid
    } else pararole.textContent = ""

    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    let regexphone = /^(?:\+212|0)(6|7)[0-9]{8}$/ //\d{8}  ==> [0-9]{8}
    let nomRegex = /^[a-zA-ZÀ-ÿ\s]{5,30}$/


    if (nom.value.trim() === '') {
        paranom.textContent = 'Nom non valide'
        valid = false
        return valid
    } else {
        paranom.textContent = ''
        if (!nomRegex.test(nom.value.trim())) {
            paranom.textContent = 'Nom doit etre min 2 carachter'
            valid = false
            return valid
        } else {
            paranom.textContent = ""
        }
    }

    if (email.value.trim() === '') {
        paraemail.textContent = 'Email non valide'
        valid = false
        return valid
    } else {
        paraemail.textContent = ''
        if (!emailRegex.test(email.value)) {
            paraemail.textContent = 'Eamil non valid'
            valid = false
            return valid
        }
    }
    if (telephone.value === '') {
        paratele.textContent = "Telephone pas encour remplaire"
        return false
    } else {
        paratele.textContent = ""
        if (!regexphone.test(telephone.value)) {
            paratele.textContent = 'Téléphone non valide'
            return false
        }
    }
}
function urlValidation() {

    const urlRegex = /^(https?|ftp):\/\/[^\s]+$/i;
    const defaultPhoto = document.querySelector('#defaultphoto');
    let userUrl = url.value.trim();

    if (urlRegex.test(userUrl)) {
        defaultPhoto.style.display = 'none';
        return userUrl;
    } else {
        defaultPhoto.style.display = 'block';
        return defaultPhoto.src;
    }
}

function profiles(classWorkers, img, tableworkers, btnClass) {

    let Worker = document.createElement('div');
    console.log("Worker table profile: ", tableworkers)
    Worker.className = "Worker"
    classWorkers.innerHTML = ""
    Worker.innerHTML = tableworkers.map((elem) =>
        ` 
        <div class="EnAtend">
            <div class="photoworker">                
                <img src="${elem.photo}" alt="profile Worker pic" class="profileWorkerPic">
            </div>
            <div class="nomworker">
                <p>${elem.Nom}</p>
                <p class="roleworker">${elem.Role}</p>
            </div>
            <img src="${img}" alt="out worker" class="${btnClass}" data-id="${elem.id}">
        </div>
            `).join('')
    classWorkers.appendChild(Worker)

    document.querySelectorAll('.btnAjouter').forEach(btn => {
        btn.addEventListener('click', () => {

            let id = parseInt(btn.dataset.id)
            addWorker(id)
        })
    })


    document.querySelectorAll('.btnRemove').forEach(btn => {
        btn.addEventListener('click', () => {

            let id = parseInt(btn.dataset.id)
            removeWorker(id)
        })
    })

}


function EnAtendWorkers(employer) {
    let enAtend = document.querySelector('.enAtend')
    let img = "images/edit.webp"
    let btnClassEdit = img.className = 'btnEdit'
    profiles(enAtend, img, employer, btnClassEdit)
}


function profile(tableWorker) {
    let profille = document.querySelector('.infosWorker')
    profille.innerHTML = ""
    let Worker = document.createElement('div');
    Worker.className = 'infosWorker-plat'
    Worker.innerHTML = tableWorker.map((elem) => `
        <div class="infosWorker-profielTitle">
            <h2>Profile</h2>
            <img src="images/close.webp" alt="close page" onclick="CloseProfile()" id="closeProfile">
        </div>
        <div class="infosWorker-workerNom">
            <img src="${elem.photo}" alt="worker picture" id="profilePicture">
            <div class="infosWorker-workerNom-Titlenom">
                <h2>${elem.Nom}</h2>
                <p class="roleworker">${elem.Role}</p>
            </div>
        </div>
        <div class="contactWorker">
            <p><span class="contactWorker-conact">email: </span>${elem.Email}</p>
            <p><span class="contactWorker-conact">phone: </span>${elem.Telephone}</p>
            <p><span class="contactWorker-conact">Location: </span>${elem.Zone}</p>
        </div>
    `).join('')
    profille.appendChild(Worker)
}

/**-------- CloseProfile this function used becaus on click on icone close profile that is exist in js part */
function CloseProfile() {
    infosWorker.style.display = 'none'
    modalProfile.style.display = 'none'
}


function formValidation() {

    let photoUrl = urlValidation()
    // console.log(errosHandling)
    if (errosHandling() != false) {
        counteur++
        let addWorker = {
            id: counteur,
            Nom: nom.value,
            Role: Roles.value,
            photo: photoUrl,
            Experiences: [...TableExp],
            Email: email.value,
            Telephone: telephone.value,
            Zone: 'Unassigned Staff'
        }
        document.querySelector('.ExpPro').innerHTML = ""
        workers.unshift(addWorker)
        document.querySelector("form").reset();
        TableExp = []
        EnAtendWorkers(workers)
        counterWorker.textContent = workers.length
    } else errosHandling()
}



//----***********company btn in form--------------
addExp.addEventListener('click', (event) => {
    event.preventDefault()
    validCompany()
})

//----***********add worker btn-------------------
saveWorker.addEventListener('click', (e) => {
    e.preventDefault()
    formValidation()
})




/******** Salle function get worker table filtred and full *************************************************** */

function Salle(emp) {
    let img = "images/ajouter.webp"
    let btnClassAjouter = img.className = 'btnAjouter'
    //let classAjouter = img.className = 'btnAjouter'
    profiles(classWorker, img, emp, btnClassAjouter)
}
//-----------------------------------------------------------
function filtreZoneConference(newWorkers) {
    let employeur = []
    newWorkers.map(elem =>
        elem.Zone == 'Unassigned Staff' ? employeur.push(elem) : 0
    )
    EnAtendWorkers(newWorkers)

    Salle(employeur, classWorker)
}
function filtreZoneReception(newWorkers) {
    let employeur = []
    newWorkers.map(elem =>
        elem.Zone == 'Unassigned Staff' && (elem.Role === "Receptionest" || elem.Role === "Manager" || elem.Role === "Nettoyage") ? employeur.push(elem) : 0
    )
    modalProfile.style.display = 'block'
    Salle(employeur,classWorker)
    EnAtendWorkers(newWorkers)
}

function filtreZoneServeur(newWorkers){
    let employeur = []
    newWorkers.map(elem =>
       elem.Zone == 'Unassigned Staff' && (elem.Role === "Serveur" || elem.Role === "Manager" || elem.Role === "Nettoyage") ? employeur.push(elem) : 0
    )
    modalProfile.style.display = 'block'
    Salle(employeur,classWorker)
    EnAtendWorkers(newWorkers)

}
function filtreZoneSecurity(newWorkers){
    let employeur = []
    newWorkers.map(elem =>
       elem.Zone == 'Unassigned Staff' && (elem.Role === "Sécurité" || elem.Role === "Manager" || elem.Role === "Nettoyage") ? employeur.push(elem) : 0
    )
    modalProfile.style.display = 'block'
    Salle(employeur,classWorker)
    EnAtendWorkers(newWorkers)

}
function filtreZoneArchive(newWorkers){
    let employeur = []
    newWorkers.map(elem =>
       elem.Zone == 'Unassigned Staff' && (elem.Role != "Nettoyage") ? employeur.push(elem) : 0
    )
    modalProfile.style.display = 'block'
    Salle(employeur,classWorker)
    EnAtendWorkers(newWorkers)

}
let salleChecked = ""
// ['Nettoyage', 'Sécurité', 'Receptionest', 'Serveur', 'Manager', 'Autre rôles']
document.querySelector('#Conference').addEventListener('click', () => {
    let maxSalleConference = 8
    salleChecked = "SalleConference"
    /*--------------Open Modal--------------------------*/

    classWorker.style.display = 'block'

    if (maxSalleConference == salleConference.length) {
        alert('Pardent La salle Conférence est plain! merçi')
        return
    }
    filtreZoneConference(workers)
})
document.querySelector('#Reception').addEventListener('click', () => {
    let maxSalleResption = 3
    salleChecked = "SalleReception"
    /*--------------Open Modal--------------------------*/

    classWorker.style.display = 'block'

    if (maxSalleResption == salleReception.length) {
        alert('Pardent La salle Reception est plain! merçi')
        return
    }
    filtreZoneReception(workers)
})
document.querySelector('#Server').addEventListener('click', () => {
    let maxSalleDev = 2
    salleChecked = "SalleServer"
    /*--------------Open Modal--------------------------*/
    classWorker.style.display = 'block'

    if (maxSalleDev == salleServeurs.length) {
        alert('La salle de reception est plain! merçi')
        return
    }
    filtreZoneServeur(workers)
})


document.querySelector('#Securie').addEventListener('click', () => {
    let maxSalleSecurite = 2
    salleChecked = "SalleSecurie"
    /*--------------Open Modal--------------------------*/
    classWorker.style.display = 'block'

    if (maxSalleSecurite == salleSecurite.length) {
        alert('La salle de sécurité est plain! merçi')
        return
    }
    filtreZoneSecurity(workers)
})
document.querySelector('#Personnel').addEventListener('click', () => {
    let maxSallePersonnel = 2
    salleChecked = "SallePersonnel"
    /*--------------Open Modal--------------------------*/
    classWorker.style.display = 'block'

    if (maxSallePersonnel == sallePersonnel.length) {
        alert('La salle de personnel est plain! merçi')
        return
    }
    filtreZoneConference(workers)
})


document.querySelector('#Archive').addEventListener('click', () => {
    let maxSalleArchive = 2
    salleChecked = "SalleArchive"
    /*--------------Open Modal--------------------------*/
    classWorker.style.display = 'black'
    if (maxSalleArchive == salleArchives.length) {
        alert('La salle de personnel est plain! merçi')
        return
    }
    filtreZoneArchive(workers)
})


/*************************** name place Zone workers *****************************/
let laSalle1 = document.querySelector('#elem1')
let laSalle2 = document.querySelector('#elem2')
let laSalle3 = document.querySelector('#elem3')
let laSalle4 = document.querySelector('#elem4')
let laSalle5 = document.querySelector('#elem5')
let laSalle6 = document.querySelector('#elem6')

/********************************* Function add worker to Zone ******************************** */
function addWorker(idWorkerSelected) {

    //let index = workers.findIndex(w => w.id === idWorkerSelected); easy way 
    console.log('idWorker:', idWorkerSelected)
    if (salleChecked == 'SalleConference') {


        //let index = workers.findIndex(w => w.id === idWorkerSelected); easy way 
        console.log('idWorker: ', idWorkerSelected)
        for (let i = 0; i < workers.length; i++) {
            if (workers[i].id === idWorkerSelected) {
                workers[i].Zone = 'salle Conférence'
                salleConference.push(workers[i])
                workers.splice(i, 1)
                break
            }
        }
        filtreZoneConference(workers)
        counterWorker.textContent = workers.length
        // envoyer workers of salle conference salleConference
        let placeColor = document.querySelector('.elem-1')
        salleConference.length >= 1 ? placeColor.style.background = '#25e004a4' : 0
        img = "images/close.webp"
        let btnClassRemove = 'btnRemove'
        profile(salleConference)
        profiles(laSalle1, img, salleConference, btnClassRemove)
        infosWorker.style.display = 'block'

        /****************************************** */

    }

    if (salleChecked == 'SalleReception') {


        //let index = workers.findIndex(w => w.id === idWorkerSelected); easy way 
        console.log('idWorker: ', idWorkerSelected)
        for (let i = 0; i < workers.length; i++) {
            if (workers[i].id === idWorkerSelected) {
                workers[i].Zone = 'Salle Réception'
                salleReception.push(workers[i])
                workers.splice(i, 1)
                break
            }
        }
        filtreZoneReception(workers)
        counterWorker.textContent = workers.length
        // envoyer workers of salle conference salleReception
        let placeColor = document.querySelector('.elem-2')
        salleReception.length >= 1 ? placeColor.style.background = '#25e004a4' : 0
        img = "images/close.webp"
        let btnClassRemove = 'btnRemove'
        profile(salleReception)
        profiles(laSalle2, img, salleReception, btnClassRemove)
        infosWorker.style.display = 'block'

        /****************************************** */

    }
    if (salleChecked == 'SalleServer') {


        //let index = workers.findIndex(w => w.id === idWorkerSelected); easy way 
        console.log('idWorker: ', idWorkerSelected)
        for (let i = 0; i < workers.length; i++) {
            if (workers[i].id === idWorkerSelected) {
                workers[i].Zone = 'Salle Serveurs'
                salleServeurs.push(workers[i])
                workers.splice(i, 1)
                break
            }
        }
        filtreZoneServeur(workers)
        counterWorker.textContent = workers.length
        // envoyer workers of salle conference salleServeurs
        let placeColor = document.querySelector('.elem-3')
        salleServeurs.length >= 1 ? placeColor.style.background = '#25e004a4' : 0
        img = "images/close.webp"
        let btnClassRemove = 'btnRemove'
        profile(salleServeurs)
        profiles(laSalle3, img, salleServeurs, btnClassRemove)
        infosWorker.style.display = 'block'

        /****************************************** */

    }
    if (salleChecked == 'SalleSecurie') {


        //let index = workers.findIndex(w => w.id === idWorkerSelected); easy way 
        console.log('idWorker: ', idWorkerSelected)
        for (let i = 0; i < workers.length; i++) {
            if (workers[i].id === idWorkerSelected) {
                workers[i].Zone = 'Salle sécurité'
                salleSecurite.push(workers[i])
                workers.splice(i, 1)
                break
            }
        }
        filtreZoneSecurity(workers)
        counterWorker.textContent = workers.length
        // envoyer workers of salle conference salleSecurite
        let placeColor = document.querySelector('.elem-5')
        salleSecurite.length >= 1 ? placeColor.style.background = '#25e004a4' : 0
        img = "images/close.webp"
        let btnClassRemove = 'btnRemove'
        profile(salleSecurite)
        profiles(laSalle4, img, salleSecurite, btnClassRemove)
        infosWorker.style.display = 'block'

        /****************************************** */

    }
    if (salleChecked == 'SallePersonnel') {


        //let index = workers.findIndex(w => w.id === idWorkerSelected); easy way 
        console.log('idWorker: ', idWorkerSelected)
        for (let i = 0; i < workers.length; i++) {
            if (workers[i].id === idWorkerSelected) {
                workers[i].Zone = 'Salle personnel'
                sallePersonnel.push(workers[i])
                workers.splice(i, 1)
                break
            }
        }
        filtreZoneConference(workers)
        counterWorker.textContent = workers.length
        // envoyer workers of salle conference sallePersonnel
        let placeColor = document.querySelector('.elem-6')
        sallePersonnel.length >= 1 ? placeColor.style.background = '#25e004a4' : 0
        img = "images/close.webp"
        let btnClassRemove = 'btnRemove'
        profile(sallePersonnel)
        profiles(laSalle5, img, sallePersonnel, btnClassRemove)
        infosWorker.style.display = 'block'

        /****************************************** */

    }
    if (salleChecked == 'SalleArchive') {


        //let index = workers.findIndex(w => w.id === idWorkerSelected); easy way 
        console.log('idWorker: ', idWorkerSelected)
        for (let i = 0; i < workers.length; i++) {
            if (workers[i].id === idWorkerSelected) {
                workers[i].Zone = 'Salle personnel'
                salleArchives.push(workers[i])
                workers.splice(i, 1)
                break
            }
        }
        filtreZoneArchive(workers)
        counterWorker.textContent = workers.length
        // envoyer workers of salle conference salleArchives
        let placeColor = document.querySelector('.elem-4')
        salleArchives.length >= 1 ? placeColor.style.background = '#25e004a4' : 0
        img = "images/close.webp"
        let btnClassRemove = 'btnRemove'
        profile(salleArchives)
        profiles(laSalle6, img, salleArchives, btnClassRemove)
        infosWorker.style.display = 'block'

        /****************************************** */

    }
}


/********************************* Function remove worker from Zone to En attende ******************************** */


function addRemove(idWorkerSelected) {

    for (let i = 0; i < workers.length; i++) {
        if (workers[i].id === idWorkerSelected) {
            workers[i].Zone = 'Unassigned Staff'
            salleConference.push(workers[i])
            workers.splice(i, 1)
            break
        }
    }
    Salle(workers, classWorker)
    counterWorker.textContent = workers.length
    // envoyer workers of salle conference salleConference

    EnAtendWorkers(workers)
    let placeColor = document.querySelector('.elem-1')
    salleConference.length >= 1 ? placeColor.style.background = '#25e004a4' : 0
    img = "images/close.webp"
    let btnClassRemove = 'btnRemove'
    profile(salleConference)
    profiles(laSalle1, img, salleConference, btnClassRemove)
    infosWorker.style.display = 'block'
    /****************************************** */
}