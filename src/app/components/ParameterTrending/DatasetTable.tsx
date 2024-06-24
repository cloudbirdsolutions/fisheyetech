import React from 'react';
import TableSection from "@/app/components/Common/TableSection";

interface Props {
    Dataset : any[],
    Series: any[]
}

const DatasetTable = (props:Props) => {

    const headers = ['Date', ...props.Series.map((item:any) => (item.label))];
    const headerKeys = ['date', ...props.Series.map((item:any) => (item.dataKey))];
    const tableRows = props.Dataset.map((rec,idx)=>(
        <tr key={idx}>
            <td>{idx+1}</td>
            {
                headerKeys.map((column:any) => <td key={column}>{rec[column]}</td>)
            }
        </tr>
    ))

    return (
        <TableSection tableHeaders={headers} tableRows={tableRows} action={false} />
    );
};

export default DatasetTable;