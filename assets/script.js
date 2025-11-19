// document.querySelector(".Cancel").onclick = () => {
//     document.querySelector(".Register").style.display = "none";
// };
const roles = ['Sécurité', 'Nettoyage', 'Receptionest', 'Serveur', 'Autre rôles']
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

const EnAtend = document.querySelector('.EnAtend')

/*---------------close Modal------------------------*/
closeModal.addEventListener('click', () => {
    Modal.style.display = 'none'
})
/*--------------Open Modal--------------------------*/
addWorker.addEventListener('click', () => {
    Modal.style.display = 'block'
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
let SalleConférence = []
let SalleRéception = []
let SalleServeurs = []
let SalleSécurité = []
let SallePersonnel = []
let SalleArchives = []
let workers = []
let TableExp = []
console.log(TableExp, workers)
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
    let regexphone = /^\+212[6-7][0-9]{8}$/
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
function formValidation() {

    let photoUrl = urlValidation()
    let selectedRole = Roles.value
    errosHandling()

    if (nom.value && selectedRole !== "" && email.value && telephone.value) {

        let addWorker = {
            Nom: nom.value,
            Role: selectedRole,
            photo: photoUrl,
            Experiences: [...TableExp],
            Email: email.value,
            Telephone: telephone.value,
            Zone: null

        }
        document.querySelector('.ExpPro').innerHTML = ""
        workers.push(addWorker)
        console.log( workers)
        document.querySelector("form").reset();
        TableExp = []
        EnAtendWorkers()
        counterWorker.textContent = workers.length == 0 ? 0: workers.length
    }
}

function EnAtendWorkers() {
    // Show worker in En Atend section

    let enAtend = document.createElement('div');
    enAtend.className = "Workers"
     EnAtend.innerHTML = "";
    enAtend.innerHTML = workers.map(item => `
        <div id="photoworker" ><img src="${item.photo}" alt="profile Worker pic" id="profileWorkerPic"></div>
        <div id="nomworker" ><p>${item.Nom}</p> <p id="role">${item.Role}</p></div>
        <button id="btnEdit">Edit</button>
   
    `).join('');
    EnAtend.appendChild(enAtend);
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