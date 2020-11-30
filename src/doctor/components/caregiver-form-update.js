import React from 'react';
import validate from "./validators/doctor-validators";
import Button from "react-bootstrap/Button";
import * as API_USERS from "../api/doctor-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';



class CaregiverFormUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;
        this.getCaregiver = this.props.getCaregiver;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                id: {
                    value: this.getCaregiver.id,
                    placeholder: 'Medical record',
                    valid: true,
                    touched: false,

                },
                name: {
                    value: this.getCaregiver.name,
                    placeholder: 'What is your name?...',
                    valid: true,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                medicalRecord: {
                    value: this.getCaregiver.medicalRecord,
                    placeholder: 'Medical record',
                    valid: true,
                    touched: false,

                },
                age: {
                    value: this.getCaregiver.age,
                    placeholder: 'Age...',
                    valid: true,
                    touched: false,
                },
                address: {
                    value: this.getCaregiver.address,
                    placeholder: 'Cluj, Zorilor, Str. Lalelelor 21...',
                    valid: true,
                    touched: false,
                },
                gender: {
                    value: this.getCaregiver.gender,
                    valid: true,
                    touched: false,
                },
                username: {
                    value: this.getCaregiver.account.username,
                    placeholder: 'username',
                    valid: true,
                    touched: false,
                },
                password: {
                    value: this.getCaregiver.account.password,
                    placeholder: 'password',
                    valid: true,
                    touched: false,
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
        // for (let updatedFormElementName in updatedControls) {
        //     formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        // }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

    };

    registerCaregiver(person) {
        return API_USERS.updateCaregiver(person, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201 || status === 418) ) {
                console.log("Successfully updated caregiver with id: " + result);
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
        let person = {
            id:this.state.formControls.id.value,
            name: this.state.formControls.name.value,
            age: this.state.formControls.age.value,
            address: this.state.formControls.address.value,
            gender: this.state.formControls.gender.value,
            account: {
                username: this.state.formControls.username.value,
                password: this.state.formControls.password.value
            }
        };

        console.log(person);
        this.registerCaregiver(person);
    }

    render() {
        return (
            <div>

                <FormGroup id='name'>
                    <Label for='nameField'> Name: </Label>
                    <Input name='name' id='nameField' placeholder={this.state.formControls.name.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.name.value}
                           touched={this.state.formControls.name.touched? 1 : 0}
                           valid={this.state.formControls.name.valid}
                           required
                    />
                    {this.state.formControls.name.touched && !this.state.formControls.name.valid &&
                    <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                </FormGroup>



                <FormGroup id='address'>
                    <Label for='addressField'> Address: </Label>
                    <Input name='address' id='addressField' placeholder={this.state.formControls.address.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.address.value}
                           touched={this.state.formControls.address.touched? 1 : 0}
                           valid={this.state.formControls.address.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id='age'>
                    <Label for='ageField'> Age: </Label>
                    <Input name='age' id='ageField' placeholder={this.state.formControls.age.placeholder}
                           min={0} max={100} type="number"
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.age.value}
                           touched={this.state.formControls.age.touched? 1 : 0}
                           valid={this.state.formControls.age.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id='gender'>
                    <Label for='genderField'> Gender: </Label>
                    <select name='gender' id='genderField'
                            onChange={this.handleChange}
                            touched={this.state.formControls.gender.touched? 1 : 0}
                            valid={this.state.formControls.gender.valid}
                            required
                            defaultValue={this.getCaregiver.gender}>
                        {/*<option selected hidden disabled></option>*/}
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </FormGroup>

                <FormGroup id='username'>
                    <Label for='userField'> Username: </Label>
                    <Input name='username' id='userField' placeholder={this.state.formControls.username.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.username.value}
                           touched={this.state.formControls.username.touched? 1 : 0}
                           valid={this.state.formControls.username.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id='password'>
                    <Label for='passField'> Password: </Label>
                    <Input name='password' id='passField' placeholder={this.state.formControls.password.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.password.value}
                           touched={this.state.formControls.password.touched? 1 : 0}
                           valid={this.state.formControls.password.valid}
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

export default CaregiverFormUpdate;
