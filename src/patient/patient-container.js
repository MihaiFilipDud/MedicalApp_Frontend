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

import * as API_USERS from "./api/patient-api"
import { Redirect } from "react-router-dom"
import MedicationPlanTable from "./components/medicationPlan-table";
import PatientMedicationsTable from "./components/medications-table";
import Cookies from 'js-cookie'
import TextField from '@material-ui/core/TextField';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

class PatientContainer extends React.Component {

    constructor(props) {
        super(props);
        this.reload = this.reload.bind(this);
        this.reloadAfterMeds = this.reloadAfterMeds.bind(this);
        this.medications = this.medications.bind(this);
        this.fetchMedicationPlans = this.fetchMedicationPlans.bind(this);
        this.fetchPatient = this.fetchPatient.bind(this);

        this.state = {
            selected: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null,
            patientData: null,
            medicationsData: null,
            isLoadedpatient: false,
            isLoadedMedications: false

        };
    }

    componentDidMount() {
        this.fetchPatient();
        this.fetchMedicationPlans();
    }



    fetchPatient(){
        let user = JSON.parse(Cookies.get('userInfo'));
        console.log(user.personId);
        return API_USERS.getPatientById(user.personId,(result, status, err) => {
            console.log(result);
            if (result !== null && status === 200) {
                this.setState({
                    patientData: result,
                    isLoadedPatient: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    fetchMedicationPlans() {
        let user = JSON.parse(Cookies.get('userInfo'));
        console.log('fetch');


        return API_USERS.getMedicationPlanById(user.personId,(result, status, err) => {
            console.log(result);
            if (result !== null && status === 200) {
                this.setState({
                    tableData: result,
                    isLoaded: true
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
        // if (JSON.parse(Cookies.get('userInfo')).role !== 'Patient'){
        //     return <Redirect to='/'/>
        // }else
        return (

            <div>

                <CardHeader>
                    <strong> Patient profile </strong>
                </CardHeader>
                <MuiThemeProvider>
                <Card>

                    <br/>


                    <Row>
                        <Col sm={{size:'2', offset:3}}>
                            <strong>Name:</strong>
                        </Col>
                        <Col sm={{size:'5', offset:1}}>
                            {this.state.isLoadedPatient&& <TextField

                                defaultValue={this.state.patientData.name}
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
                            {this.state.isLoadedPatient&& <TextField

                                defaultValue={this.state.patientData.address}
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
                            {this.state.isLoadedPatient&& <TextField

                                defaultValue={this.state.patientData.age}
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
                            {this.state.isLoadedPatient&& <TextField

                                defaultValue={this.state.patientData.gender}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="outlined"
                            />}
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={{size:'2', offset:3}}>
                            <strong>Medical record:</strong>
                        </Col>
                        <Col sm={{size:'5', offset:1}}>
                            {this.state.isLoadedPatient&& <TextField
                                multiline={true}
                                defaultValue={this.state.patientData.medicalRecord}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="outlined"
                            />}
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <MedicationPlanTable tableData = {this.state.tableData} medications={this.medications}/>}
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




export default PatientContainer;
