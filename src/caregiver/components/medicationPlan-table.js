import React from "react";
import Table from "../../commons/tables/table";
import {Button} from "reactstrap";





const filters = [
    {
        accessor: 'name',
    }
];




class MedicationPlanTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData
        };


        this.columns = [
            {
                Header: 'Daily Intakes',
                accessor: 'dailyInatkes',
            },
            {
                Header: 'Treatment period',
                accessor: 'treatmentPeriod',
            },
            {
                Header: 'Medications',
                Cell: row =>(<Button color="primary" onClick={() => this.props.medications(row.original)}>Show</Button>)
            }

        ];
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

export default MedicationPlanTable;