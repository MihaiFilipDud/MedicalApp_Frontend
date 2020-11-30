import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavigationBar from './navigation-bar-doctor'
import Home from './home/home';
import DoctorContainer from './doctor/doctor-container'

import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';
import PatientContainer from "./patient/patient-container";
import Login from "./login/login";
import CaregiverContainer from "./caregiver/caregiver-container";

class App extends React.Component {


    render() {

        return (
            <div className={styles.back}>
            <Router>
                <div>
                    <NavigationBar />
                    <Switch>

                        <Route
                            exact
                            path='/'
                            render={() => <Login/>}
                        />

                        <Route
                            exact
                            path='/doctor'
                            render={() => <DoctorContainer/>}
                        />

                        <Route
                            exact
                            path='/patient'
                            render={() => <PatientContainer/>}
                        />

                        <Route
                            exact
                            path='/caregiver'
                            render={() => <CaregiverContainer/>}
                        />

                        {/*Error*/}
                        <Route
                            exact
                            path='/error'
                            render={() => <ErrorPage/>}
                        />

                        <Route render={() =><ErrorPage/>} />
                    </Switch>
                </div>
            </Router>
            </div>
        )
    };
}

export default App
