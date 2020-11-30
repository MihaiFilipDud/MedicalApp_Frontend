import React from "react";
import Table from "../../commons/tables/table";
import {Button} from "reactstrap";
import * as API_USERS from "../api/doctor-api"
import Radio from "@material-ui/core/Radio/Radio";


const filters = [
    {
        accessor: 'name',
    }
];

class CaregiverTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableDataCaregiver: this.props.tableDataCaregiver
        };

        this.columns = [
            {
                Header: 'Select',
                Cell: row =>(<Radio type="radio" color="primary" onClick={() => this.props.select(row.original)} />),
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
                data={this.state.tableDataCaregiver}
                columns={this.columns}
                search={filters}
                pageSize={5}
            />
        )
    }
}

export default CaregiverTable;