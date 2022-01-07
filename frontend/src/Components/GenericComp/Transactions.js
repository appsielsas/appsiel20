import { Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GenericListLines from './GenericListLines';
import TransactionsCreate from './TransactionsCreate';
import TransactionsModify from './TransactionsModify';

const Transactions = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [selectedItem, setSelectedItem] = React.useState({});
    const [data, setData] = React.useState([]);
    const { app = 1, model = 1, page = 1, id } = useParams();
    /**
     * URL base del modelo actual
     * @type {baseUrl: string} 
     */
    const baseUrl = `${process.env.REACT_APP_URL}/api/crud?app_id=${app}&model_id=${model}`;

    /**
     * Establece los valores del objeto seleccionado 
     */
    const handleChange = e => {
        const { name, value } = e.target;
        setSelectedItem(prevState => ({
            ...prevState,
            [name]: value
        }))

    }

    const requestGet = async () => {
        //setCargando(true)
        try {
            const response = await fetch(`${baseUrl}?app_id=${app}&model_id=${model}&page=${page}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${window.localStorage.getItem("loggedAppsielApp")}`
                },
            })

            let dataG = await response.json()

            if (response.ok) {
                /*setModelName(dataG.name)
                setHeaders(dataG.model_table_headers);*/
                setData(dataG);
                console.log(dataG)
                /*setFields(dataG.model_fields);
                setActions(dataG.model_actions);
                setNumberPages(dataG.model_table_rows.last_page)*/
                //console.log(JSON.stringify(fields))
            } else {
                Validator(dataG, response.status)
            }

            //setCargando(false)

        } catch (e) {
            console.log(e.message)
            enqueueSnackbar(e.message, { variant: 'error' });
        }
    }

    function Validator(data, status) {

        if (status === 401) {
            //signOut()
        }

        for (const property in data) {
            console.log(data[property])
            data[property].forEach(element => {
                enqueueSnackbar(element, { variant: 'error' });
            });
        }
    }

    useEffect(() => {
        requestGet()
    }, [])

    return (
        <div>
            <Typography variant="h3">Transactions</Typography>
            <TransactionsCreate
                modelName={data.name}
                fields={data.model_fields || []}
                selectedItem={selectedItem}
                handleChange={handleChange}
                Validator={Validator}
            >
                <GenericListLines fields={data.model_fields || []}></GenericListLines>
            </TransactionsCreate>
            <TransactionsModify
                modelName={data.name}
                fields={data.model_fields || []}
                selectedItem={selectedItem}
                handleChange={handleChange}
                Validator={Validator}
            >
                <GenericListLines fields={data.model_fields || []}></GenericListLines>
            </TransactionsModify>

        </div>
    )
}

export default Transactions
