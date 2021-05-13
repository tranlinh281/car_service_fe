import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Button, Paper, IconButton } from "@material-ui/core";
import MaterialTable from "material-table";
import XLSX from 'xlsx'
import PublishIcon from '@material-ui/icons/Publish';
import { ArrowUpwardOutlined, CloudUpload } from "@material-ui/icons";

const EXTENTIOS = ['xlsx', 'xls', 'csv']

export default function Table() {
  const [colDefs, setColDefs] = useState();
  const [data, setData] = useState();

  const getExention = (file) => {
    const parts = file.name.split('.');
    const extention = parts[parts.length - 1];
    return EXTENTIOS.includes(extention) //return boolean
  }

  const convertToJSON = (headers, data) => {
    const rows = [];
    data.forEach(row => {
      let rowData = {}
      row.forEach((element, index) => {
        rowData[headers[index]] = element
      });
      rows.push(rowData)
    });
    return rows;
  }

  const importExcel = (e) => {
    const file = e.target.files[0]

    const reader = new FileReader()
    reader.onload = (event) => {
      //parse data

      const bstr = event.target.result
      const workBook = XLSX.read(bstr, { type: "binary" })

      //get first sheet
      const workSheetName = workBook.SheetNames[0]
      const workSheet = workBook.Sheets[workSheetName]

      //convert to array
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })

      const headers = fileData[0]
      const heads = headers.map(head => ({ title: head, field: head }))
      setColDefs(heads)

      //removing header
      fileData.splice(0, 1)

      setData(convertToJSON(headers, fileData))
    }

    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file)
      }
      else {
        alert("Invalid file input")
      }
    } else {
      setData([])
      setColDefs([])
    }
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    button: {
      margin: theme.spacing(1),
      zIndex: 1,
      float: "right",
      marginLeft: 0
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    }
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <label>
              <IconButton className={classes.button} size="medium" component="span">
                <CloudUpload fontSize="inherit" />
              </IconButton>
              <input
                type="file"
                onChange={importExcel}
                title="Upload"
                style={{ display: 'none' }}
                id="upload-file"
                name="upload-file"
              />
            </label>
            <MaterialTable
              title="Employee List"
              data={data}
              columns={colDefs}
              options={{
                pageSizeOptions: [5, 10],
                exportButton: true,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
