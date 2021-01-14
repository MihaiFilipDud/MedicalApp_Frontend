import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";
import Cookies from "js-cookie";


const endpoint = {
    person: '/person',
    patient: '/patient',
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

function getMedicationPlans(callback) {
    let request = new Request(HOST.backend_api + '/' + endpoint.medicationPlan, {
        method: 'GET',
        headers:{
            "Authorization": "Bearer " + JSON.parse(Cookies.get('userInfo')).jwt
        }
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getPatientById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.patient + '/' + params, {
        method: 'GET',
        headers:{
            "Authorization": "Bearer " + JSON.parse(Cookies.get('userInfo')).jwt
        }
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getMedicationPlanById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.patient+ '/getMedicationPlans', {
        method: 'POST',
        headers : {
            "Authorization": "Bearer " + JSON.parse(Cookies.get('userInfo')).jwt,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    getPersons,
    getPersonById,
    postPerson,
    deletePerson,
    getMedicationPlans,
    getPatientById,
    getMedicationPlanById
};
