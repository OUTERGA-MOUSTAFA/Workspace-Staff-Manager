   document.getElementById("photo").addEventListener("change", (event) => {
            const url = document.getElementById('photo').value.trim()
            const defaultPhoto = document.getElementById('defaultphoto')
                        if (url ==='') {
                preview.src = defaultPhoto;
                return;
            } else {
               
               defaultPhoto.style.display = 'none'
            }
        });
        document.querySelector(".Cancel").onclick = () => {
            document.querySelector(".Register").style.display = "none";
        };
        const roles = ['Sécurité', 'Nettoyage', 'Receptionest', 'Serveur', 'Autre rôles']
        let SalleConférence = []
        let SalleRéception = []
        let SalleServeurs = []
        let SalleSécurité = []
        let SallePersonnel = []
        let SalleArchives = []