import React from 'react';
import validate from "./validators/doctor-validators";
import Button from "react-bootstrap/Button";
import * as API_USERS from "../api/doctor-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';



class MedicationPlanForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;
        this.selMedications = this.props.selMedications;
        this.selPatient = this.props.selPatient

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                name: {
                    value: this.selPatient.name,
                    placeholder: '',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },

                intakeIntervalStart: {
                    value: '',
                    valid: false,
                    touched: false,
                },

                intakeIntervalEnd: {
                    value: '',
                    valid: false,
                    touched: false,
                },
                treatmentStart: {
                    value: '',
                    valid: false,
                    touched: false,
                },
                treatmentEnd: {
                    value: '',
                    valid: false,
                    touched: false,
                },
                medications: {
                    value: this.selMedications,
                    placeholder: 'Perioada tratamentului...',
                    valid: true,
                    touched: true,
                },
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }


    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

    };

    addMedicationPlan(medPlan) {
        return API_USERS.postMedicationPlan(medPlan, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Medication plan added with id: " + result);
                alert("Medication plan added");
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    handleSubmit() {
        let medPlan = {

            intakeIntervalStart: this.state.formControls.intakeIntervalStart.value,
            intakeIntervalEnd: this.state.formControls.intakeIntervalEnd.value,
            treatmentStart: this.state.formControls.treatmentStart.value,
            treatmentEnd: this.state.formControls.treatmentEnd.value,
            patient:{
                id: this.selPatient.id
            },
            medications: this.selMedications
        };

        console.log(medPlan);
        this.addMedicationPlan(medPlan);
    }


    render() {
        return (
            <div>

                <FormGroup id='name'>
                    <Label for='nameField'>Patient Name: </Label>
                    <Input name='name' id='nameField'
                           onChange={this.handleChange}
                           disabled
                           defaultValue={this.state.formControls.name.value}
                           touched={this.state.formControls.name.touched? 1 : 0}
                           valid={true}
                           required
                    />
                    {this.state.formControls.name.touched && !this.state.formControls.name.valid &&
                    <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='intakeIntervalStart'>
                    <Label for='intakeIntervalStart'> Daily Intake Interval Start: </Label>
                    <Input name='intakeIntervalStart' id='intakeIntervalStartField'
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.intakeIntervalStart.value}
                           touched={this.state.formControls.intakeIntervalStart.touched? 1 : 0}
                           valid={this.state.formControls.intakeIntervalStart.valid}
                           required
                    />
                    {this.state.formControls.intakeIntervalStart.touched && !this.state.formControls.intakeIntervalStart.valid &&
                    <div className={"error-message"}> * Email must have a valid format</div>}
                </FormGroup>

                <FormGroup id='intakeIntervalEnd'>
                    <Label for='intakeIntervalEnd'> Daily Intake Interval End: </Label>
                    <Input name='intakeIntervalEnd' id='intakeIntervalEndField'
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.intakeIntervalEnd.value}
                           touched={this.state.formControls.intakeIntervalEnd.touched? 1 : 0}
                           valid={this.state.formControls.intakeIntervalEnd.valid}
                           required
                    />
                    {this.state.formControls.intakeIntervalEnd.touched && !this.state.formControls.intakeIntervalEnd.valid &&
                    <div className={"error-message"}> * Email must have a valid format</div>}
                </FormGroup>

                <FormGroup id='treatmentStart'>
                    <Label for='treatmentStartField'> Treatment Start: </Label>
                    <Input name='treatmentStart' id='treatmentStartField' type="date"
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.treatmentStart.value}
                           touched={this.state.formControls.treatmentStart.touched? 1 : 0}
                           valid={this.state.formControls.treatmentStart.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id='treatmentEnd'>
                    <Label for='treatmentEndField'> Treatment End: </Label>
                    <Input name='treatmentEnd' id='treatmentEndField' type="date"
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.treatmentEnd.value}
                           touched={this.state.formControls.treatmentEnd.touched? 1 : 0}
                           valid={this.state.formControls.treatmentEnd.valid}
                           required
                    />
                </FormGroup>


                <Row>
                    <Col sm={{size: '4', offset: 8}}>
                        <Button type={"submit"}  onClick={this.handleSubmit}>  Submit </Button>
                    </Col>
                </Row>

                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }
            </div>
        ) ;
    }
}

export default MedicationPlanForm;
