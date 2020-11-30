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


                dailyIntakes: {
                    value: '',
                    placeholder: 'Intructiuni de administrare...',
                    valid: false,
                    touched: false,
                },

                treatmentPeriod: {
                    value: '',
                    placeholder: 'Perioada tratamentului...',
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

            dailyInatkes: this.state.formControls.dailyIntakes.value,
            treatmentPeriod: this.state.formControls.treatmentPeriod.value,
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

                <FormGroup id='dailyIntakes'>
                    <Label for='dailyIntakesField'> Daily Intakes: </Label>
                    <Input name='dailyIntakes' id='dailyIntakesField' placeholder={this.state.formControls.dailyIntakes.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.dailyIntakes.value}
                           touched={this.state.formControls.dailyIntakes.touched? 1 : 0}
                           valid={this.state.formControls.dailyIntakes.valid}
                           required
                    />
                    {this.state.formControls.dailyIntakes.touched && !this.state.formControls.dailyIntakes.valid &&
                    <div className={"error-message"}> * Email must have a valid format</div>}
                </FormGroup>

                <FormGroup id='treatmentPeriod'>
                    <Label for='treatmentPeriodField'> Treatment Period: </Label>
                    <Input name='treatmentPeriod' id='treatmentPeriodField' placeholder={this.state.formControls.treatmentPeriod.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.treatmentPeriod.value}
                           touched={this.state.formControls.treatmentPeriod.touched? 1 : 0}
                           valid={this.state.formControls.treatmentPeriod.valid}
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
