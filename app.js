firebase.initializeApp({
    apiKey: "AIzaSyA0L_4Qdjium1RiLdtr-ZlsP3tCWK1Btvc",
    authDomain: "proyecto-crud-18e35.firebaseapp.com",
    projectId: "proyecto-crud-18e35"
});

// Inicialisando el firestore
var bada = firebase.firestore();

//Save Users
function guardarmelo() {
    var name = document.getElementById('name').value;
    var last = document.getElementById('last').value;
    var born = document.getElementById('born').value;
    var country = document.getElementById('country').value;

    bada.collection("users").add({
    first: name,
    last: last,
    born: born,
    country: country
})
.then(function (docRef) {
        swal('User saved with ID: ', docRef.id, "success");
        document.getElementById('name').value = "";
        document.getElementById('last').value = "";
        document.getElementById('born').value = ""; 
        document.getElementById('country').value = "";

})
.catch(function (error) {
        console.error("Error save users: ", error);
});

}

//Read Users
    var tablita = document.getElementById('tablita');
    bada.collection("users").onSnapshot((querySnapshot) => {
    tablita.innerHTML = "";
    querySnapshot.forEach((doc) => {

        
        console.log(`${doc.id} => ${doc.data().first}`);
        tablita.innerHTML += `
        <tr>
            <th scope="row">${doc.id}</th>
            <td>${doc.data().first}</td>
            <td>${doc.data().last}</td>
            <td>${doc.data().born}</td>
            <td>${doc.data().country}</td>
            <td><i class="far fa-trash-alt fa-parent fa-trash animated" onclick="borramelo('${doc.id}')"></i></td>
            <td><i class="far fa-edit" onclick="editamelo('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}','${doc.data().country}')"></i></td>

        </tr>

        `
            
        

    });
});

//Delete Users

function borramelo(id) {

    bada.collection("users").doc(id).delete().then(function () {

       swal('User delete correctly with ID: ', id, 'warning');

    }).catch(function (error) {
        console.error("Error removing users: ", error);
    });

}

//Edit users

function editamelo(id,name,last,born,country) {

    document.getElementById('name').value = name;
    document.getElementById('last').value = last;
    document.getElementById('born').value = born;
    document.getElementById('country').value = country;
    var botonaso = document.getElementById('botonaso');
    botonaso.innerHTML = "Edit";

    botonaso.onclick = function() {

    var loco = bada.collection("users").doc(id);

    var name = document.getElementById('name').value;
    var last = document.getElementById('last').value;
    var born = document.getElementById('born').value;
    var country = document.getElementById('country').value;


    return loco.update({

        first: name,
        last: last,
        born: born,
        country: country 

        })
        .then(function () {
            swal("User edited correctly with ID!",id,'success');
            botonaso.innerHTML = 'Save';
            document.getElementById('name').value = "";
            document.getElementById('last').value = "";
            document.getElementById('born').value = "";
            document.getElementById('country').value = "";

        })
        .catch(function (error) {

            console.error("Error updating users: ", error);

        });

        }

    }
    







