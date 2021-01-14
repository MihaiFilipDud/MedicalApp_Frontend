import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";
import Cookies from "js-cookie";


const endpoint = {
    patient: '/patient',
    person: '/person',
    caregiver: '/caregiver',
    medication: '/medication',
    medicationPlan: '/medicationPlan'
};

function getPersons(callback) {
    let request = new Request(HOST.backend_api + endpoint.person, {
        method: 'GET',
        headers:{
            "Authorization": "Bearer " + JSON.parse(Cookies.get('userInfo')).jwt
        }
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getPersonById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.person + params.id, {
       method: 'GET',
        headers:{
            "Authorization": "Bearer " + JSON.parse(Cookies.get('userInfo')).jwt
        }
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postPerson(user, callback){
    let request = new Request(HOST.backend_api + endpoint.person , {
        method: 'POST',
        headers : {

                "Authorization": "Bearer " + JSON.parse(Cookies.get('userInfo')).jwt,

            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function deletePerson(params, callback) {
    let request = new Request(HOST.backend_api + endpoint.person + "/delete/" + params.id, {
        method: 'POST',
        headers:{
            "Authorization": "Bearer " + JSON.parse(Cookies.get('userInfo')).jwt
        }
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function getPatients(callback) {
    let request = new Request(HOST.backend_api + endpoint.patient, {
        method: 'GET',
        headers:{
            "Authorization": "Bearer " + JSON.parse(Cookies.get('userInfo')).jwt
        }
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getPatientById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.patient + params.id, {
        method: 'GET',
        headers:{
            "Authorization": "Bearer " + JSON.parse(Cookies.get('userInfo')).jwt
        }
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postPatient(user, callback){
    console.log(user);
    let request = new Request(HOST.backend_api + endpoint.patient , {
        method: 'POST',
        headers : {

                "Authorization": "Bearer " + JSON.parse(Cookies.get('userInfo')).jwt,

            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

function deletePatient(params, callback) {
    let request = new Request(HOST.backend_api + endpoint.patient + "/delete/" + params.id, {
        method: 'POST',
        headers:{
            "Authorization": "Bearer " + JSON.parse(Cookies.get('userInfo')).jwt
        }
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function updatePatient(user, callback){
    let request = new Request(HOST.backend_api + endpoint.patient  + "/update/" + user.id, {
        method: 'POST',
        headers : {

                "Authorization": "Bearer " + JSON.parse(Cookies.get('userInfo')).jwt,

            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function registerPatient(user, callback){
    let request = new Request(HOST.backend_api + endpoint.patient + "/register" , {
        method: 'POST',
        headers : {

                "Authorization": "Bearer " + JSON.parse(Cookies.get('userInfo')).jwt,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function doctorAddCaregiver(c, p, callback){
    let request = new Request(HOST.backend_api + endpoint.patient  + "/addCaregiver?c_id=" + c.id +"&p_id=" + p.id, {
        method: 'POST',
        headers : {

                "Authorization": "Bearer " + JSON.parse(Cookies.get('userInfo')).jwt,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}


function getMedicalPlans(params, callback){
    let request = new Request(HOST.backend_api + endpoint.patient  + "/getMedicationPlans", {
        method: 'POST',
        headers : {

                "Authorization": "Bearer " + JSON.parse(Cookies.get('userInfo')).jwt,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function getCaregivers(callback) {
    let request = new Request(HOST.backend_api + endpoint.caregiver, {
        method: 'GET',
        headers:{
            "Authorization": "Bearer " + JSON.parse(Cookies.get('userInfo')).jwt
        }
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getCaregiverById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.caregiver + params.id, {
        method: 'GET',
        headers:{
            "Authorization": "Bearer " + JSON.parse(Cookies.get('userInfo')).jwt
        }
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postCaregiver(user, callback){
    let request = new Request(HOST.backend_api + endpoint.caregiver , {
        method: 'POST',
        headers : {

                "Authorization": "Bearer " + JSON.parse(Cookies.get('userInfo')).jwt,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function deleteCaregiver(params, callback) {
    let request = new Request(HOST.backend_api + endpoint.caregiver + "/delete/" + params.id, {
        method: 'POST',
        headers:{
            "Authorization": "Bearer " + JSON.parse(Cookies.get('userInfo')).jwt
        }
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function updateCaregiver(user, callback){
    let request = new Request(HOST.backend_api + endpoint.caregiver  + "/update/" + user.id, {
        method: 'POST',
        headers : {

                "Authorization": "Bearer " + JSON.parse(Cookies.get('userInfo')).jwt,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function registerCaregiver(user, callback){
    let request = new Request(HOST.backend_api + endpoint.caregiver + "/register", {
        method: 'POST',
        headers : {

                "Authorization": "Bearer " + JSON.parse(Cookies.get('userInfo')).jwt,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function caregiverGetPatients(user, callback){
    let request = new Request(HOST.backend_api + endpoint.caregiver + "/getPatients", {
        method: 'POST',
        headers : {

                "Authorization": "Bearer " + JSON.parse(Cookies.get('userInfo')).jwt,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function getMedications(callback) {
    let request = new Request(HOST.backend_api + endpoint.medication, {
        method: 'GET',
        headers:{
            "Authorization": "Bearer " + JSON.parse(Cookies.get('userInfo')).jwt
        }
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getMedicationById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.medication + params.id, {
        method: 'GET',
        headers:{
            "Authorization": "Bearer " + JSON.parse(Cookies.get('userInfo')).jwt
        }
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postMedication(user, callback){
    let request = new Request(HOST.backend_api + endpoint.medication , {
        method: 'POST',
        headers : {

                "Authorization": "Bearer " + JSON.parse(Cookies.get('userInfo')).jwt,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function deleteMedication(params, callback) {
    let request = new Request(HOST.backend_api + endpoint.medication + "/delete/" + params.id, {
        method: 'POST',
        headers:{
            "Authorization": "Bearer " + JSON.parse(Cookies.get('userInfo')).jwt
        }
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function updateMedication(user, callback){
    let request = new Request(HOST.backend_api + endpoint.medication  + "/update/" + user.id, {
        method: 'POST',
        headers : {

                "Authorization": "Bearer " + JSON.parse(Cookies.get('userInfo')).jwt,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function getMedicationPlans(callback) {
    let request = new Request(HOST.backend_api + endpoint.medicationPlan, {
        method: 'GET',
        headers:{
            "Authorization": "Bearer " + JSON.parse(Cookies.get('userInfo')).jwt
        }
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getMedicationPlanById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.medicationPlan + params.id, {
        method: 'GET',headers:{
            "Authorization": "Bearer " + JSON.parse(Cookies.get('userInfo')).jwt
        }
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postMedicationPlan(user, callback){
    let request = new Request(HOST.backend_api + endpoint.medicationPlan , {
        method: 'POST',
        headers : {
            "Authorization": "Bearer " + JSON.parse(Cookies.get('userInfo')).jwt,
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function deleteMedicationPlan(params, callback) {
    let request = new Request(HOST.backend_api + endpoint.medicationPlan + "/delete/" + params.id, {
        method: 'POST'
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function updateMedicationPlan(user, callback){
    let request = new Request(HOST.backend_api + endpoint.medicationPlan  + "/update/" + user.id, {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

export {
    getPersons,
    getPersonById,
    postPerson,
    deletePerson,
    getPatients,
    getPatientById,
    postPatient,
    deletePatient,
    updatePatient,
    doctorAddCaregiver,
    getMedicalPlans,
    getCaregivers,
    getCaregiverById,
    updateCaregiver,
    postCaregiver,
    caregiverGetPatients,
    deleteCaregiver,
    registerCaregiver,
    registerPatient,
    postMedication,
    getMedications,
    getMedicationById,
    updateMedication,
    deleteMedication,
    postMedicationPlan

};
