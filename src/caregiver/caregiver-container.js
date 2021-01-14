import React from 'react';
import $ from 'jquery';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {
    Button,
    Card,
    CardHeader,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    Row
} from 'reactstrap';
import PersonForm from "./components/patient-form";

import * as API_USERS from "./api/caregiver-api"
import { Redirect } from "react-router-dom"
import MedicationPlanTable from "./components/medicationPlan-table";
import PatientMedicationsTable from "./components/medications-table";
import Cookies from 'js-cookie'
import TextField from '@material-ui/core/TextField';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { makeStyles } from '@material-ui/core/styles';
import PatientTableCaregiver from "./components/patient-table";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import SockJS from "sockjs-client"
import {Stomp} from "@stomp/stompjs"
import { Alert, AlertTitle } from '@material-ui/lab';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

//const client = new W3CWebSocket('ws://localhost:8080/caregiverNotifications');

class CaregiverContainer extends React.Component {

    constructor(props) {
        super(props);
        this.reload = this.reload.bind(this);
        this.reloadAfterMeds = this.reloadAfterMeds.bind(this);
        this.medications = this.medications.bind(this);
        this.fetchMedicationPlans = this.fetchMedicationPlans.bind(this);
        this.fetchCaregiver = this.fetchCaregiver.bind(this);
        this.fetchPatients = this.fetchPatients.bind(this);

        this.state = {
            selected: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null,
            caregiverData: null,
            medicationPlansData: [],
            medicationsData: [],
            patientsData: [],
            isLoadedCaregiver: false,
            isLoadedPatients: false,
            isLoadedMedicationPlans: false,
            isLoadedMedications: false

        };
    }

    componentDidMount() {
        this.fetchCaregiver();
        this.fetchPatients();
        this.webSocket();

        // client.onopen = () => {
        //     console.log('WebSocket Client Connected');
        // };
        // client.onmessage = (message) => {
        //     console.log(message);
        // };
        //this.fetchMedicationPlans();
    }


    webSocket(){

        let sock = new SockJS('https://mihaifilipdud-backend-sd.herokuapp.com/caregiverNotifications', [], {
            sessionId: 8
        });
        //let sock = new SockJS('http://localhost:8080/caregiverNotifications')
        let stompClient = Stomp.over(sock);
        stompClient.connect({}, function (frame) {
            console.log("Connected to websocket");
            stompClient.subscribe('/topic/notifications', function (response) {

                let data = JSON.parse(response.body);
                let user = JSON.parse(Cookies.get('userInfo'));
                console.log(data.caregiver.id +"    "+ user.personId);
                if(data.caregiver.id === user.personId){
                    alert("Suspicious activity for: "+ data.patient.name+" during " +data.activity);
                }
                console.log(data);

                //alert(response.body)
            });
        });
    }

    fetchCaregiver(){
        let user = JSON.parse(Cookies.get('userInfo'));
        console.log(user.personId);
        return API_USERS.getCaregiverById(user.personId,(result, status, err) => {
            console.log(result);
            if (result !== null && status === 200) {
                this.setState({
                    caregiverData: result,
                    isLoadedCaregiver: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

     fetchPatients(){
        let user = JSON.parse(Cookies.get('userInfo'));
        console.log(user.personId);
         return API_USERS.caregiverGetPatients(user.personId, (result, status, err) => {
            console.log(result);
            if (result !== null && status === 200) {
                 this.setState({
                    tableData: result,
                    isLoadedPatients: true
                });
                console.log(this.state.patientData);
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }



    async fetchMedicationPlans(user) {

        await this.setState({
            tableData: null,
            isLoadedMedicationPlans: false
        })

        return API_USERS.getMedicationPlanById(user,(result, status, err) => {
            console.log(result);
            if (result !== null && status === 200) {
                this.setState({
                    tableData: result,
                    isLoadedMedicationPlans: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }





    reload() {
        this.setState({
            isLoaded: false
        });
        this.toggleForm();
        this.fetchPersons();
    }

    reloadAfterMeds() {
        this.setState({
            isLoadedMedications: false
        });
    }

    async medications(meds){
        const newStateNull = {...this.state.medicationsData, medicationsData : null};
        await this.setState({
            medicationsData: newStateNull,
            isLoadedMedications: false
        });
        console.log(this.state.isLoadedMedications);
        let medList = [...meds.medications];
        console.log(medList[0]);
        const newState = {...this.state.medicationsData, medicationsData : meds.medications};
        console.log(newState.medicationsData);
        const newLoaded = {...this.state.isLoadedMedications, isLoadedMedications: true}
        //this.setState({isLoadedMedications: true});

        await this.setState({
            //medicationsData: medList[0],
            medicationsData: newState.medicationsData,
            isLoadedMedications: true
        });

        //console.log(this.state.isLoadedMedications);
        console.log(this.state.medicationsData);
    }





    render() {
        if (JSON.parse(Cookies.get('userInfo')).role !== 'Caregiver'){
            return <Redirect to='/'/>
        }else
        return (



            <div>
                

                <CardHeader>
                    <strong> Caregiver profile </strong>
                </CardHeader>
                <MuiThemeProvider>
                <Card>

                    <br/>


                    <Row>
                        <Col sm={{size:'2', offset:3}}>
                            <strong>Name:</strong>
                        </Col>
                        <Col sm={{size:'5', offset:1}}>
                            {this.state.isLoadedCaregiver&& <TextField

                                defaultValue={this.state.caregiverData.name}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="outlined"
                            />}
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={{size:'2', offset:3}}>
                            <strong>Address:</strong>
                        </Col>
                        <Col sm={{size:'5', offset:1}}>
                            {this.state.isLoadedCaregiver&& <TextField

                                defaultValue={this.state.caregiverData.address}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="outlined"
                            />}
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={{size:'2', offset:3}}>
                            <strong>Age:</strong>
                        </Col>
                        <Col sm={{size:'5', offset:1}}>
                            {this.state.isLoadedCaregiver&& <TextField

                                defaultValue={this.state.caregiverData.age}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="outlined"
                            />}
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={{size:'2', offset:3}}>
                            <strong>Gender:</strong>
                        </Col>
                        <Col sm={{size:'5', offset:1}}>
                            {this.state.isLoadedCaregiver&& <TextField

                                defaultValue={this.state.caregiverData.gender}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="outlined"
                            />}
                        </Col>
                    </Row>

                    <CardHeader>
                        <strong> Patients</strong>
                    </CardHeader>
                    <br/>


                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoadedPatients && <PatientTableCaregiver tableData = {this.state.tableData} medPlans = {this.fetchMedicationPlans}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatus}
                                error={this.state.error}
                            />   }
                        </Col>
                    </Row>

                    <CardHeader>
                        <strong> Medication Plans</strong>
                    </CardHeader>
                    <br/>

                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoadedMedicationPlans && <MedicationPlanTable tableData = {this.state.tableData} medications={this.medications}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                                            errorStatus={this.state.errorStatus}
                                                            error={this.state.error}
                                                        />   }
                        </Col>
                    </Row>

                </Card>
                </MuiThemeProvider>
                <CardHeader>
                    <strong> Medications</strong>
                </CardHeader>
                <br/>


                <Row>
                    <Col sm={{size: '8', offset: 1}}>
                        {this.state.isLoadedMedications && <PatientMedicationsTable tableDataMedication = {this.state.medicationsData}/>}
                        {this.state.errorStatus > 0 && <APIResponseErrorMessage
                            errorStatus={this.state.errorStatus}
                            error={this.state.error}
                        />   }
                    </Col>
                </Row>

            </div>


        )

    }
}




export default CaregiverContainer;
