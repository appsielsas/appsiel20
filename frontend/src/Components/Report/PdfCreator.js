import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import React from 'react';

import { Button, Fab, Grid } from '@mui/material';

const formctrl = {
    flex: "0 1 auto"
}

const PdfCreator = () => {

    const [selectedItem, setSelectedItem] = React.useState({});
    const [selectComponent, setSelectComponent] = React.useState({});
    const [selectContent, setSelectContent] = React.useState('');
    const [selectTag, setSelectTag] = React.useState('');

    const handleChange = e => {
        const { name, value } = e.target;
        setSelectedItem(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(JSON.stringify(selectedItem));
    }

    React.useEffect(() => {
        let iframep = document.getElementById("iframepreview").contentWindow
        let domiframep = iframep.document.querySelector("body")
        domiframep.innerHTML = `<style>
        .floatButton{
            position: absolute;
            bottom: 16px;
            right: 16px;
            font-size:16px;
            height: 31.125px;
            border-radius: 50%
        }
        
        @media print {
            
            @page {
                size: letter;
              }
            
          }
        </style>`
        domiframep.innerHTML += `${columns[selectTag]}`

        console.log(selectComponent)
    }, [selectTag, selectComponent, selectContent])


    const columns = {
        column1: `<div style="text-align: center">${selectComponent.label1}</div>`,
        column2: `<table style="width:100%; border: 1px solid black; border-collapse: collapse; text-align: center">
    <tr>
      <td style="border: 1px solid black">${selectComponent.label1}</td>
      <td style="border: 1px solid black">${selectComponent.label2}</td>
    </tr>
  </table>`,
        column3: `<table style="width:100%; border: 1px solid black; border-collapse: collapse; text-align: center">
    <tr>
      <td style="border: 1px solid black">Columna 1</td>
      <td style="border: 1px solid black">Columna 2</td>
      <td style="border: 1px solid black">Columna 3</td>
      ${selectedItem}
    </tr>
  </table>`
    }

    const fabStyle = {
        position: "absolute",
        bottom: 16,
        right: 16,
    };

    return (
        <div>
            <Paper sx={{ padding: 2, height: "100%" }}>
                <Fab sx={fabStyle} variant="extended" color="secondary" aria-label="like" onClick={() => { let iframep = document.getElementById("iframepreview").contentWindow.print() }}>
                    <i className="fas fa-print" style={{ marginRight: 8 }}></i>
                    Imprimir
                </Fab>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1 }, display: 'flex', flexDirection: 'column', alignItems: 'stretch'
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Usuarios
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                        <Paper sx={{ padding: 1, display: 'flex', gap: '1rem' }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label" >Etiqueta</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectTag}
                                        label="Etiqueta"
                                        onChange={(e) => setSelectTag(e.target.value)}
                                    >
                                        <MenuItem value="column1">Column 1</MenuItem>
                                        <MenuItem value="column2">Column 2</MenuItem>
                                        <MenuItem value="column3">Column 3</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Grid sx={{ flexGrow: 1 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Componente</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectComponent.label1}
                                        label="Componente"
                                        onChange={(e) => setSelectComponent({ ...selectComponent, label1: e.target.value })}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Componente</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectComponent.label2}
                                        label="Componente"
                                        onChange={(e) => setSelectComponent({ ...selectComponent, label2: e.target.value })}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Componente</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectComponent.label3}
                                        label="Componente"
                                        onChange={(e) => setSelectComponent({ ...selectComponent, label3: e.target.value })}
                                        disabled
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Box sx={{ flexGrow: 1 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Contenido</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectContent}
                                        label="Contenido"
                                        onChange={(e) => setSelectContent(e.target.value)}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            <Button type="submit" variant="contained" sx={formctrl}>Enviar</Button>
                        </Paper>
                        <Paper>
                            <Box component="iframe" id="iframepreview" width="100%" height="300px" sx={{ padding: 1 }} srcdoc="">
                            </Box>
                        </Paper>
                    </Box>

                </Box >
            </Paper >
        </div >
    )
}

export default PdfCreator
