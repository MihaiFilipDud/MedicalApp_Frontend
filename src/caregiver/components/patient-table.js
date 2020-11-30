import React from "react";
import Table from "../../commons/tables/table";
import {Button} from "reactstrap";


const filters = [
    {
        accessor: 'name',
    }
];

class PatientTableCaregiver extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData
        }



        this.columns = [
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
                Header: 'Username',
                accessor: 'account.username',
            },
            {
                Header: 'Medical Record',
                accessor: 'medicalRecord',
            },
            {
                Header: 'Medication Plans',
                Cell: row =>(<Button color="primary" onClick={() => this.props.medPlans(row.original)}>Show </Button>),

            }


        ];
    }

    componentDidMount() {
        console.log(this.state.tableData);
    }

    render() {
        return (
            <Table
                data={this.state.tableData}
                columns={this.columns}
                search={filters}
                pageSize={5}
            />
        )
    }
}

export default PatientTableCaregiver;