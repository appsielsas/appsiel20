import { Button, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { optionsPOST, ValidatorForm } from '../../application/Utils'
import GenerateFields from '../Inputs/GenerateFields'
import TableLines from '../TableLines'
import GenericListLines from './GenericListLines'
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom'

const TransactionsModify = ({ fields, selectedItem, modelName, handleChange, Validator, children }) => {

    const baseUrl = `${process.env.REACT_APP_URL}/api/crud`

    const { enqueueSnackbar } = useSnackbar();
    const [validateForm, setValidateForm] = React.useState({})
    const { app, model, page = 1 } = useParams();

    const requestPost = async () => {

        if (ValidatorForm(fields, selectedItem, setValidateForm)) {
            return
        }

        try {
            const response = await fetch(`${baseUrl}?app_id=${app}&model_id=${model}&page=${page}`, optionsPOST(selectedItem))

            let dataG = await response.json()

            console.log(dataG)
            if (response.ok) {
                enqueueSnackbar(`${modelName} ${dataG.id} agregado correctamente`, { variant: 'success' })
                //setData(data.concat(dataG))
                //handleCloseModal({ type: "create" })
            } else {
                Validator(dataG, response.status)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Paper sx={{ padding: 2 }}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Formulario Modificar
                </Typography>
                <Grid container spacing={2} sx={{ p: 2 }}>
                    {fields.map((item, i, arr) => {
                        return <Grid item xs={12} sm={arr.length > 4 ? 6 : 12} key={i}>
                            <GenerateFields item={item} selectedItem={selectedItem} handleChange={handleChange} validateForm={validateForm} modify={true} />
                            {console.log(arr[i])}
                        </Grid>
                    })}
                </Grid>
            </Paper>
            {children}
            <Button onClick={requestPost} variant="contained">Modificar Registro</Button>
        </div>
    )
}

export default TransactionsModify
