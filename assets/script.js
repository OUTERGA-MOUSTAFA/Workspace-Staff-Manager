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

/*---------------close Modal------------------------*/
closeModal.addEventListener('click', () => {
    Modal.style.display = 'none'
})
/*--------------Open Modal--------------------------*/
addWorker.addEventListener('click', () => {
    Modal.style.display = 'block'
})

const modalProfile = document.querySelector('.model')
const infosWorker = document.querySelector('.infosWorker')
document.querySelector('#closeProfile').addEventListener('click', () => {
    infosWorker.style.display = 'none'
    modalProfile.style.display = 'none'
})
document.querySelector('#closeBriefInfos').addEventListener('click',()=>{
    infosWorker.style.display = 'none'
})
document.querySelector('.BriefInfos').addEventListener('click', () => {
    infosWorker.style.display = 'block'
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
    //---------- Company error -----------------------
    if (Company.value.trim() == '') {
        paracompany.textContent = 'company Ne pas Valider'
    } else paracompany.innerHTML = ''

    //---------- Role error -----------------------
    if (role.value.trim() == '') {
        pararolecompany.textContent = 'Role Ne pas Valider'
    } else pararolecompany.innerHTML = ''

    //---------- From Date error -----------------------
    if (formDate.value == '') {
        parafromdate.textContent = 'from date Ne pas Valider'
    } else parafromdate.innerHTML = ""

    //---------- To Date error -----------------------
    if (toDate.value == '') {
        paratodate.textContent = 'To date Ne pas Valider'
    } else paratodate.innerHTML = ""
}
function validCompany() {
    //---------- Company validation -----------------------
    errorValidation()
    if (Company.value.trim() !== "" && role.value.trim() !== "" && formDate.value !== "" && toDate.value !== "") {

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

    let paranom = document.querySelector('#paranom');
    let pararole = document.querySelector('#pararole');
    let paraemail = document.querySelector('#paraemail');
    let paratele = document.querySelector('#paratele');

    let selectedRole = Roles.value;
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    let regexphone = /^\+212|0[6-7][0-9]{8}$/
    let nomRegex = /^[a-zA-ZÀ-ÿ\s]{5,30}$/

    paranom.textContent = !nomRegex.test(nom.value.trim()) ? 'Nom non valide' : ""
    pararole.textContent = selectedRole === "" ? 'Role non valide' : ""
    paraemail.textContent = !emailRegex.test(email.value) ? 'Email non valide' : ""
    paratele.textContent = !regexphone.test(telephone.value) ? 'Téléphone non valide' : ""
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

    let Worker = document.createElement('div');
    console.log("Worker table profile: ", tableworkers)
    Worker.className = "Worker"
    classWorker.innerHTML = ""
    Worker.innerHTML = tableworkers.map((elem) =>
        `  
         <div class="EnAtend" onclick="addWorker(${elem.id})">
                <div class="photoworker">                
                    <img src="${elem.photo}" alt="profile Worker pic" class="profileWorkerPic"></div>
                <div class="nomworker">
                    <p>${elem.Nom}</p>
                    <p class="roleworker">${elem.Role}</p>
                </div>
                <img src="${img}" alt="out worker" class="btnEdit">
            </div>
            `).join('')
    classWorker.appendChild(Worker)
}
function EnAtendWorkers() {
    let enAtend = document.querySelector('.enAtend')
    let img = "images/check.png"
    profiles(enAtend, img, workers)
}

function formValidation() {

    let photoUrl = urlValidation()
    let selectedRole = Roles.value
    errosHandling()

    if (nom.value && selectedRole !== "" && email.value && telephone.value) {
        counteur++
        let addWorker = {
            id: counteur,
            Nom: nom.value,
            Role: selectedRole,
            photo: photoUrl,
            Experiences: [...TableExp],
            Email: email.value,
            Telephone: telephone.value,
            Zone: null
        }
        document.querySelector('.ExpPro').innerHTML = ""
        workers.unshift(addWorker)
        console.log(workers)
        document.querySelector("form").reset();
        TableExp = []
        EnAtendWorkers()
        counterWorker.textContent = workers.length == 0 ? 0 : workers.length
    }
}

/*********************************************************** */
function AddWorker(id) {

    for (let i = 0; i < workers.length; i++) {
        if (roles.includes(i.Role)) {
            salleConference.push(workers[i])
            workers.splice(i, 1)
        }

    }
}
/*********************************************************** */
let classWorker = document.querySelector('.BriefInfos')
function SalleConference() {
    let employeur = []
    workers.map(elem =>
        elem.Zone == null ? employeur.push(elem) : 0
    )
    let img = "images/plus.png"
    profiles(classWorker, img, employeur)
}
/********************************************************************************* */
function SalleReception() {
    let employeur = []
    workers.map(elem =>
        elem.Zone == null && (elem.Role === "Receptionest" || elem.Role === "Manager" || elem.Role === "Nettoyage") ? employeur.push(elem) : 0
    )
    let img = "images/plus.png"
    profiles(classWorker, img, employeur)
}
/**************************************************************************************** */
function SalleServer() {
    let employeur = []
    workers.map(elem =>
        elem.Zone == null && (elem.Role === "Serveur" || elem.Role === "Manager" || elem.Role === "Nettoyage") ? employeur.push(elem) : 0
    )
    let img = "images/plus.png"
    profiles(classWorker, img, employeur)
}
/******************************************************************************************* */


function SalleSecurie() {
    let employeur = []
    workers.map(elem =>
        elem.Zone == null && (elem.Role === "Sécurité" || elem.Role === "Manager" || elem.Role === "Nettoyage") ? employeur.push(elem) : 0
    )
    let img = "images/plus.png"
    profiles(classWorker, img, employeur)
}
/******************************************************************************************* */

function SallePersonnel() {
    let employeur = []
    workers.map(elem =>
        elem.Zone == null ? employeur.push(elem) : 0
    )
    let img = "images/plus.png"
    profiles(classWorker, img, employeur)
}
/******************************************************************************************* */

['Nettoyage', 'Sécurité', 'Receptionest', 'Serveur', 'Manager', 'Autre rôles']

function SalleArchive() {
    let employeur = []
    workers.map(elem =>
        elem.Zone == null && elem.Role !="Nettoyage" ? employeur.push(elem) : 0
    )
    let img = "images/plus.png"
    profiles(classWorker, img, employeur)
}

//-----***********company btn in form
addExp.addEventListener('click', (event) => {
    event.preventDefault()
    validCompany()
})

//----***********add worker btn
saveWorker.addEventListener('click', (e) => {
    e.preventDefault()
    formValidation()
})
document.querySelector('#SalleConference').addEventListener('click', () => {
    let maxSalleConference = 8

    if (maxSalleConference == salleConference.length) {
        alert('La salle de conférence est plain! merçi')
        return
    }
    modalProfile.style.display = 'block'
    SalleConference()
})
document.querySelector('#SalleReception').addEventListener('click', () => {
    let maxSalleResption = 3

    if (maxSalleResption == salleReception.length) {
        alert('La salle de reception est plain! merçi')
        return
    }
    modalProfile.style.display = 'block'
    SalleReception()
})
document.querySelector('#SalleServer').addEventListener('click', () => {
    let maxSalleDev = 2

    if (maxSalleDev == salleServeurs.length) {
        alert('La salle de reception est plain! merçi')
        return
    }
    modalProfile.style.display = 'block'
    SalleServer()
})


document.querySelector('#SalleSecurie').addEventListener('click', () => {
    let maxSalleSecurite = 2

    if (maxSalleSecurite == salleSecurite.length) {
        alert('La salle de sécurité est plain! merçi')
        return
    }
    modalProfile.style.display = 'block'
    SalleSecurie()
})
document.querySelector('#SallePersonnel').addEventListener('click', () => {
    let maxSallePersonnel = 2

    if (maxSallePersonnel == sallePersonnel.length) {
        alert('La salle de personnel est plain! merçi')
        return
    }
    modalProfile.style.display = 'block'
    SalleConference()
})
document.querySelector('#SalleArchive').addEventListener('click', () => {
    let maxSalleArchive = 2

    if (maxSalleArchive == sallePersonnel.length) {
        alert('La salle de personnel est plain! merçi')
        return
    }
    modalProfile.style.display = 'block'
    SalleArchive()
})