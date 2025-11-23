// document.querySelector(".Cancel").onclick = () => {
//     document.querySelector(".Register").style.display = "none";
// };
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
const addWorker = document.getElementById('addWorker')
const cancelWorker = document.getElementById('cancel')
const closeModal = document.querySelector('.closeModel')
const url = document.getElementById('photo')
const Modal = document.querySelector('.Register')
let counterWorker = document.querySelector('#counterWorker')
let counteur = 0


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
        }else{
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

function profiles(classWorker, img, tableworkers) {

    classWorker.innerHTML = ""
    let Worker = document.createElement('div');
    console.log("Worker table profile: ", tableworkers)
    Worker.className = "Worker"
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
            <img src="${img}" alt="out worker" class="btnEdit" onclick="addworker(${elem.id})">
        </div>
            `).join('')
    classWorker.appendChild(Worker)
}

function profile(tableWorker) {
    let profille = document.querySelector('.infosWorker')
    profille.innerHTML = ""
    let Worker = document.createElement('div');
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
            <p><span class="contactWorker-conact">phone: </span>${elem.telephone}</p>
            <p><span class="contactWorker-conact">Location: </span>${elem.Zone}</p>
        </div>
    `).join('')
    profille.appendChild(Worker)
}
/*---------------close Modal------------------------*/
closeModal.addEventListener('click', () => {
    Modal.style.display = 'none'
})
/*--------------Open Modal--------------------------*/
addWorker.addEventListener('click', () => {
    Modal.style.display = 'flex'
})
/**-------- CloseProfile this function used becaus on click on icone close profile that is exist in js part */
function CloseProfile() {
    infosWorker.style.display = 'none'
    modalProfile.style.display = 'none'
}
function EnAtendWorkers() {
    let enAtend = document.querySelector('.enAtend')
    let img = "images/edit.webp"
    profiles(enAtend, img, workers)
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
        console.log(workers)
        document.querySelector("form").reset();
        TableExp = []
        EnAtendWorkers()
        counterWorker.textContent = workers.length == 0 ? 0 : workers.length
    } else errosHandling()
}

/*************************** Function add worker to Zone *****************************/
function addworker(idWorkerSelected) {
    /*--------------Open Modal--------------------------*/
    addWorker.addEventListener('click', () => {
        Modal.style.display = 'block'
    })
    //let index = workers.findIndex(w => w.id === idWorkerSelected); easy way 

    for (let i = 0; i < workers.length; i++) {
        if (workers[i].id === idWorkerSelected) {
            salleConference.push(workers[i])
            workers.splice(i, 1)
            return
        }

    }

    // refresh enAtende Table
    EnAtendWorkers()
    // envoyer workers of salle conference salleConference

    let classConference = document.querySelector('.elem-1')
    img = "images/close.webp"
    let classRemove = img.className = 'btnAjouter'
    profile(salleConference)
    profiles(classConference, img, classRemove, salleConference)

}

/******** Salle function get worker table filtred and full *************************************************** */

function Salle(emp) {
    let img = "images/ajouter.webp"
    let classWorker = document.querySelector('.BriefInfos')
    let classAjouter = img.className = 'btnAjouter'
    profiles(classWorker, img, emp)
}

//----***********company btn in form
addExp.addEventListener('click', (event) => {
    event.preventDefault()
    validCompany()
})

//----***********add worker btn
saveWorker.addEventListener('click', (e) => {
    e.preventDefault()
    formValidation()
})


// ['Nettoyage', 'Sécurité', 'Receptionest', 'Serveur', 'Manager', 'Autre rôles']
document.querySelector('#SalleConference').addEventListener('click', () => {
    let maxSalleConference = 8

    if (maxSalleConference == salleConference.length) {
        alert('La salle de conférence est plain! merçi')
        return
    }
    let employeur = []
    workers.map(elem =>
        elem.Zone == 'Unassigned Staff' ? employeur.push(elem) : 0
    )
    modalProfile.style.display = 'block'
    Salle(employeur)
})
document.querySelector('#SalleReception').addEventListener('click', () => {
    let maxSalleResption = 3

    if (maxSalleResption == salleReception.length) {
        alert('La salle de reception est plain! merçi')
        return
    }
    let employeur = []
    workers.map(elem =>
        elem.Zone == 'Unassigned Staff' && (elem.Role === "Receptionest" || elem.Role === "Manager" || elem.Role === "Nettoyage") ? employeur.push(elem) : 0
    )
    modalProfile.style.display = 'block'
    Salle(employeur)
})
document.querySelector('#SalleServer').addEventListener('click', () => {
    let maxSalleDev = 2

    if (maxSalleDev == salleServeurs.length) {
        alert('La salle de reception est plain! merçi')
        return
    }
    let employeur = []
    workers.map(elem =>
        elem.Zone == 'Unassigned Staff' && (elem.Role === "Serveur" || elem.Role === "Manager" || elem.Role === "Nettoyage") ? employeur.push(elem) : 0
    )
    modalProfile.style.display = 'block'
    Salle(employeur)
})


document.querySelector('#SalleSecurie').addEventListener('click', () => {
    let maxSalleSecurite = 2

    if (maxSalleSecurite == salleSecurite.length) {
        alert('La salle de sécurité est plain! merçi')
        return
    }
    let employeur = []
    workers.map(elem =>
        elem.Zone == 'Unassigned Staff' && (elem.Role === "Sécurité" || elem.Role === "Manager" || elem.Role === "Nettoyage") ? employeur.push(elem) : 0
    )
    modalProfile.style.display = 'block'
    Salle(employeur)
})
document.querySelector('#SallePersonnel').addEventListener('click', () => {
    let maxSallePersonnel = 2

    if (maxSallePersonnel == sallePersonnel.length) {
        alert('La salle de personnel est plain! merçi')
        return
    }
    let employeur = []
    workers.map(elem =>
        elem.Zone == 'Unassigned Staff' ? employeur.push(elem) : 0
    )
    modalProfile.style.display = 'block'
    Salle(employeur)
})


document.querySelector('#SalleArchive').addEventListener('click', () => {
    let maxSalleArchive = 2

    if (maxSalleArchive == salleArchives.length) {
        alert('La salle de personnel est plain! merçi')
        return
    }
    let employeur = []
    workers.map(elem =>
        elem.Zone == 'Unassigned Staff' && elem.Role != "Nettoyage" ? employeur.push(elem) : 0
    )
    modalProfile.style.display = 'block'
    Salle(employeur)
})