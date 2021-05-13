import MaterialTable from 'material-table'
import React from 'react'

export default function Table() {

    const dataTest=[
        {name: 'ahihi', age: 12},
        {name: 'huhuh', age: 16},
        {name: 'leuleu', age: 15},
        {name: 'loa', age: 14},
        {name: 'babab', age: 13},
    ]

    const columns=[
        {title: 'Name', field: 'name'},
        {title: 'Age', field: 'age'}
    ]
    return(
        <>
        <MaterialTable
        title="Employee List"
        data={dataTest}
        columns={columns}
        />
            
        </>
    )
}