import React from "react";
import Table from "../../commons/tables/table";
import {Button} from "reactstrap";
import * as API_USERS from "../api/doctor-api"
import Input from "@material-ui/core/Input";

import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import RadioGroup from "@material-ui/core/RadioGroup";


const filters = [
    {
        accessor: 'name',
    }
];

class PatientTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData
        };

        this.columns = [
            {
              Header: 'Select',
                Cell: row =>(<Radio inputProps={{ 'aria-label': 'uncontrolled-radio' }}type="radio" color="primary" onClick={() => this.props.select(row.original)} />),
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Address',
                accessor: 'address',
            },
            {
                Header: 'Age',
                accessor: 'age',
            },
            {
                Header: 'Gender',
                accessor: 'gender',
            },

            {
                Header: 'Medical Record',
                accessor: 'medicalRecord',
            },
            {
                Header: 'Delete',
                Cell: row =>(<Button color="primary" onClick={() => this.props.delete(row.original)}>Delete </Button>),

            },
            {
                Header: 'Update',

                Cell: row =>(<Button color="primary" onClick={() => this.props.update(row.original)}>Update </Button>)
            }


        ];
    }



    render() {
        return (

            <Table
                data={this.state.tableData}
                columns={this.columns}
                search={filters}
                pageSize={6}
            />

        )
    }
}

export default PatientTable;