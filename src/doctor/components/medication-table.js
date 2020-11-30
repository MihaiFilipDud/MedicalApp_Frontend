import React from "react";
import Table from "../../commons/tables/table";
import {Button} from "reactstrap";
import * as API_USERS from "../api/doctor-api"
import Checkbox from "@material-ui/core/Checkbox";


const filters = [
    {
        accessor: 'name',
    }
];

class MedicationTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableDataMedication: this.props.tableDataMedication
        };

        this.columns = [
            {
                Header: 'Select',
                Cell: row =>(<Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} color="primary" onClick={() => this.props.select(row.original)} />),
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Side Effects',
                accessor: 'sideEffects',
            },
            {
                Header: 'Dosage',
                accessor: 'dosage',
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
                data={this.state.tableDataMedication}
                columns={this.columns}
                search={filters}
                pageSize={5}
            />
        )
    }
}

export default MedicationTable;