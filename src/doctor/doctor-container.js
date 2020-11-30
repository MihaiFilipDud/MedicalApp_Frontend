import React from "react";
import * as API_USERS from "../doctor/api/doctor-api";
import {Button, Card, CardHeader, Col, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import PatientTable from "../doctor/components/patient-table";
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import PatientForm_insert from "../doctor/components/patient-form_insert";
import PatientForm_update from "../doctor/components/patient-form_update";
import CaregiverTable from "./components/caregiver-table";
import CaregiverFormInsert from "./components/caregiver-form";
import CaregiverFormUpdate from "./components/caregiver-form-update";
import MedicationTable from "./components/medication-table";
import MedicationFormInsert from "./components/medication-form_insert";
import MedicationFormUpdate from "./components/medication-form_update";
import MedicationPlanForm from "./components/medicationPlan-form";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom"

class DoctorContainer extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.toggleFormUpdate = this.toggleFormUpdate.bind(this);
        this.reload = this.reload.bind(this);
        this.reloadAfterDelete = this.reloadAfterDelete.bind(this);
        this.reloadAfterUpdate = this.reloadAfterUpdate.bind(this);
        this.deletePatient = this.deletePatient.bind(this);
        this.updatePatient = this.updatePatient.bind(this);
        this.selectPatient = this.selectPatient.bind(this);
        this.addCaregiverToPatient = this.addCaregiverToPatient.bind(this);


        this.toggleFormCaregiver = this.toggleFormCaregiver.bind(this);
        this.toggleFormUpdateCaregiver = this.toggleFormUpdateCaregiver.bind(this);
        this.reloadCaregiver = this.reloadCaregiver.bind(this);
        this.reloadAfterDeleteCaregiver = this.reloadAfterDeleteCaregiver.bind(this);
        this.reloadAfterUpdateCaregiver = this.reloadAfterUpdateCaregiver.bind(this);
        this.deleteCaregiver = this.deleteCaregiver.bind(this);
        this.updateCaregiver = this.updateCaregiver.bind(this);
        this.selectCaregiver = this.selectCaregiver.bind(this);

        this.toggleFormMedication = this.toggleFormMedication.bind(this);
        this.toggleFormUpdateMedication = this.toggleFormUpdateMedication.bind(this);
        this.reloadMedication = this.reloadMedication.bind(this);
        this.reloadAfterDeleteMedication = this.reloadAfterDeleteMedication.bind(this);
        this.reloadAfterUpdateMedication = this.reloadAfterUpdateMedication.bind(this);
        this.deleteMedication = this.deleteMedication.bind(this);
        this.updateMedication = this.updateMedication.bind(this);
        this.selectMedication = this.selectMedication.bind(this);
        this.toggleFormMedicationPlan = this.toggleFormMedicationPlan.bind(this);
        this.reloadAfterAddMedicationPlan = this.reloadAfterAddMedicationPlan.bind(this);

        this.state = {
            selected: false,
            selectedUpdate: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null,
            curPatient: null,
            selPatient: null,

            selectedCaregiver: false,
            selectedUpdateCaregiver: false,
            collapseFormCaregiver: false,
            tableDataCaregiver: [],
            isLoadedCaregiver: false,
            errorStatusCaregiver: 0,
            errorCaregiver: null,
            curCaregiver: null,
            selCaregiver: null,

            selectedMedication: false,
            selectedUpdateMedication: false,
            collapseFormMedication: false,
            tableDataMedication: [],
            isLoadedMedication: false,
            errorStatusMedication: 0,
            errorMedication: null,
            curMedication: null,
            selMedications: [],
            selectedMedicationPlan: false,
            
        };
    }

    componentDidMount() {
        this.fetchPatients();
        this.fetchCaregiver();
        this.fetchMedication();
    }

    deletePatient(patient) {
        API_USERS.deletePatient(patient, (result, status, err) => this.reloadAfterDelete());
    }

    fetchPatients() {
        return API_USERS.getPatients((result, status, err) => {

            if (result !== null && status === 200) {

                console.log(result);
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

    async selectPatient(patient){
        await this.setState({
            selPatient: patient
        });
        console.log(this.state.selPatient);
    }

    addCaregiverToPatient(){
        return API_USERS.doctorAddCaregiver(this.state.selCaregiver, this.state.selPatient, (result, status, err) => {

            if (result !== null && (status === 200 || status ===201)) {

                console.log(result);
                alert("The caregiver "+ this.state.selCaregiver.name+" has been assigned to the patient "+ this.state.selPatient.name);
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    toggleForm() {
        this.setState({selected: !this.state.selected});
    }

    toggleFormUpdate() {
        this.setState({selectedUpdate: !this.state.selectedUpdate});
    }

    updatePatient(patient) {
        this.state.curPatient = patient;
        this.toggleFormUpdate();

    }

    reload() {
        this.setState({
            isLoaded: false
        });
        this.toggleForm();
        this.fetchPatients();
    }

    reloadAfterDelete() {
        this.setState({
            isLoaded: false
        });
        this.fetchPatients();
    }

    reloadAfterUpdate() {
        this.setState({
            isLoaded: false
        });
        this.toggleFormUpdate();
        this.fetchPatients();
    }

    //Caregiver stuff

    deleteCaregiver(patient) {
        API_USERS.deleteCaregiver(patient, (result, status, err) => this.reloadAfterDeleteCaregiver());
    }

    fetchCaregiver() {
        return API_USERS.getCaregivers((result, status, err) => {

            if (result !== null && status === 200) {

                console.log(result);
                this.setState({
                    tableDataCaregiver: result,
                    isLoadedCaregiver: true
                });
            } else {
                this.setState(({
                    errorStatusCaregiver: status,
                    errorCaregiver: err
                }));
            }
        });
    }

    async selectCaregiver(caregiver){
        await this.setState({
            selCaregiver: caregiver
        });
        console.log(this.state.selCaregiver);
    }

    toggleFormCaregiver() {
        this.setState({selectedCaregiver: !this.state.selectedCaregiver});
    }

    toggleFormUpdateCaregiver() {
        this.setState({selectedUpdateCaregiver: !this.state.selectedUpdateCaregiver});
    }

    updateCaregiver(patient) {
        this.state.curCaregiver = patient;
        this.toggleFormUpdateCaregiver();

    }

    reloadCaregiver() {
        this.setState({
            isLoadedCaregiver: false
        });
        this.toggleFormCaregiver();
        this.fetchCaregiver();
    }

    reloadAfterDeleteCaregiver() {
        this.setState({
            isLoadedCaregiver: false
        });
        this.fetchCaregiver();
    }

    reloadAfterUpdateCaregiver() {
        this.setState({
            isLoadedCaregiver: false
        });
        this.toggleFormUpdateCaregiver();
        this.fetchCaregiver();
    }


    //Medication stuff

    deleteMedication(patient) {
        API_USERS.deleteMedication(patient, (result, status, err) => this.reloadAfterDeleteMedication());
    }

    async selectMedication(medication) {

        let meds = this.state.selMedications;

        console.log("Index:" + meds.indexOf(medication));

        if(meds.indexOf(medication) > -1) {
            meds.splice(meds.indexOf(medication), 1);
        } else{
            meds.push(medication);
        }

        await this.setState({
            selMedications: meds
        });
        console.log(this.state.selMedications);

    }



    fetchMedication() {
        return API_USERS.getMedications((result, status, err) => {

            if (result !== null && status === 200) {

                console.log(result);

                this.setState({
                    tableDataMedication: result,
                    isLoadedMedication: true
                });
            } else {
                this.setState(({
                    errorStatusMedication: status,
                    errorMedication: err
                }));
            }
        });
    }

    toggleFormMedicationPlan(){
        this.setState({selectedMedicationPlan: !this.state.selectedMedicationPlan});
    }

    toggleFormMedication() {
        this.setState({selectedMedication: !this.state.selectedMedication});
    }

    toggleFormUpdateMedication() {
        this.setState({selectedUpdateMedication: !this.state.selectedUpdateMedication});
    }

    updateMedication(patient) {
        this.state.curMedication = patient;
        this.toggleFormUpdateMedication();

    }

    reloadMedication() {
        this.setState({
            isLoadedMedication: false
        });
        this.toggleFormMedication();
        this.fetchMedication();
    }

    reloadAfterDeleteMedication() {
        this.setState({
            isLoadedMedication: false
        });
        this.fetchMedication();
    }

    reloadAfterUpdateMedication() {
        this.setState({
            isLoadedMedication: false
        });
        this.toggleFormUpdateMedication();
        this.fetchMedication();
    }

    reloadAfterAddMedicationPlan() {
        this.toggleFormMedicationPlan();
    }

    render() {
        if (JSON.parse(Cookies.get('userInfo')).role !== 'Doctor'){
            return <Redirect to='/'/>
        } else
        return (
            <div>
                <CardHeader>
                    <strong> Patient Management </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '1', offset: 1}}>
                            <Button color="primary" onClick={this.toggleForm}>Add Patient </Button>

                        </Col>
                        <Col sm={{size: '2', offset: 1}}>
                            <Button color="primary" onClick={this.addCaregiverToPatient}>Assign caregiver</Button>
                        </Col>

                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <PatientTable tableData = {this.state.tableData} delete={this.deletePatient} update={this.updatePatient} select = {this.selectPatient}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatus}
                                error={this.state.error}
                            />   }
                        </Col>
                    </Row>
                </Card>

                <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}> Add Patient: </ModalHeader>
                    <ModalBody>
                        <PatientForm_insert reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.selectedUpdate} toggle={this.toggleFormUpdate}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormUpdate}> Update Patient: </ModalHeader>
                    <ModalBody>
                        <PatientForm_update reloadHandler={this.reloadAfterUpdate} getPatient={this.state.curPatient}/>
                    </ModalBody>
                </Modal>

                <CardHeader>
                    <strong> Caregiver Management </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleFormCaregiver}>Add Caregiver </Button>

                        </Col>


                    </Row>
                    <br/>

                    <Row>

                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoadedCaregiver && <CaregiverTable tableDataCaregiver = {this.state.tableDataCaregiver} delete={this.deleteCaregiver} update={this.updateCaregiver} select={this.selectCaregiver}/>}
                            {this.state.errorStatusCaregiver > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatusCaregiver}
                                error={this.state.errorCaregiver}
                            />   }
                        </Col>
                    </Row>
                </Card>

                <Modal isOpen={this.state.selectedCaregiver} toggle={this.toggleFormCaregiver}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormCaregiver}> Add Caregiver: </ModalHeader>
                    <ModalBody>
                        <CaregiverFormInsert reloadHandler={this.reloadCaregiver}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.selectedUpdateCaregiver} toggle={this.toggleFormUpdateCaregiver}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormUpdateCaregiver}> Update Caregiver: </ModalHeader>
                    <ModalBody>
                        <CaregiverFormUpdate reloadHandler={this.reloadAfterUpdateCaregiver} getCaregiver={this.state.curCaregiver}/>
                    </ModalBody>
                </Modal>


                <CardHeader>
                    <strong> Medication Management </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '1', offset: 1}}>
                            <Button color="primary" onClick={this.toggleFormMedication}>Add Medication </Button>


                        </Col>
                        <Col sm={{size: '2', offset: 1}}>
                            <Button color="primary" onClick={this.toggleFormMedicationPlan}>Create medication plan </Button>


                        </Col>
                    </Row>
                    <br/>

                    <Row>

                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoadedMedication && <MedicationTable tableDataMedication = {this.state.tableDataMedication} delete={this.deleteMedication} update={this.updateMedication} select={this.selectMedication}/>}
                            {this.state.errorStatusMedication > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatusMedication}
                                error={this.state.errorMedication}
                            />   }
                        </Col>
                    </Row>
                </Card>

                <Modal isOpen={this.state.selectedMedication} toggle={this.toggleFormMedication}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormMedication}> Add Medication: </ModalHeader>
                    <ModalBody>
                        <MedicationFormInsert reloadHandler={this.reloadMedication}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.selectedUpdateMedication} toggle={this.toggleFormUpdateMedication}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormUpdateMedication}> Update Medication: </ModalHeader>
                    <ModalBody>
                        <MedicationFormUpdate reloadHandler={this.reloadAfterUpdateMedication} getMedication={this.state.curMedication}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.selectedMedicationPlan} toggle={this.toggleFormMedicationPlan}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormMedicationPlan}> Update Medication: </ModalHeader>
                    <ModalBody>
                        <MedicationPlanForm reloadHandler={this.reloadAfterAddMedicationPlan} selMedications={this.state.selMedications} selPatient={this.state.selPatient}/>
                    </ModalBody>
                </Modal>

            </div>
        )

    }
}


export default DoctorContainer;