import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React from "react";
import axios from 'axios';
import Cookies from 'js-cookie'
import {HOST} from '../commons/hosts';

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
    }

    handleClick(event){

        let apiBaseUrl = HOST.backend_api;
        let self = this;
        let payload={

                "username": this.state.username,
                "password": this.state.password

        }

        console.log(payload);

        axios.post(apiBaseUrl+'/login', payload)
            .then(function (response) {
                console.log(response);
                if(response.status === 202){
                    console.log("Login successfull");
                    Cookies.set('userInfo', response.data);
                    let user = JSON.parse(Cookies.get('userInfo'));
                    console.log(user.role);
                    window.location="/" + user.role;
                }
                else if(response.data.code == 204){
                    console.log("Username password do not match");
                    //alert("username password do not match")
                }
                else{
                    console.log("Username does not exists");
                    //alert("Username does not exist");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {
        return (
            <div style={style}>
                <MuiThemeProvider>
                    <div >
                        <TextField
                            style={style}
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            onChange = {(event,newValue) => this.setState({username:newValue})}
                        />
                        <br/>
                        <TextField
                            style={style}
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange = {(event,newValue) => this.setState({password:newValue})}
                        />
                        <br/>
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}
const style = {
    marginLeft: 'auto',
    marginRight: 'auto',
    justify: 'center'

};


export default Login;