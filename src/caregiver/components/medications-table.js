import React from "react";
import Table from "../../commons/tables/table";
import {Button} from "reactstrap";


const filters = [
    {
        accessor: 'name',
    }
];

class PatientMedicationsTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableDataMedication: this.props.tableDataMedication
        };

        this.columns = [
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

export default PatientMedicationsTable;