import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    person: '/person',
    patient: '/patient',
    caregiver: '/caregiver',
    medicationPlan: '/medicationPlan'
};

function getPersons(callback) {
    let request = new Request(HOST.backend_api + endpoint.person, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getPersonById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.person + params.id, {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postPerson(user, callback){
    let request = new Request(HOST.backend_api + endpoint.person , {
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

function deletePerson(params, callback) {
    let request = new Request(HOST.backend_api + endpoint.person + "/delete/" + params.id, {
        method: 'POST'
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function getMedicationPlans(callback) {
    let request = new Request(HOST.backend_api + '/' + endpoint.medicationPlan, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getPatientById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.patient + '/' + params, {
        method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getMedicationPlanById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.patient+ '/getMedicationPlans', {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params.id)
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getCaregiverById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.caregiver + '/' + params, {
        method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}


function caregiverGetPatients(user, callback){
    let request = new Request(HOST.backend_api + endpoint.caregiver + "/getPatients", {
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
    getMedicationPlans,
    getPatientById,
    getMedicationPlanById,
    getCaregiverById,
    caregiverGetPatients
};
