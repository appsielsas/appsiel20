

export const optionsPOST = (selectedItem) => {
    return {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem("loggedAppsielApp")}`
        },
        body: JSON.stringify(selectedItem),
    }
}

export const optionsPUT = (selectedItem) => {
    return {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem("loggedAppsielApp")}`
        },
        body: JSON.stringify(selectedItem),
    }
}

export const optionsDELETE = () => {
    return {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem("loggedAppsielApp")}`
        }
    }
}


export const ValidatorForm = (fields, selectedItem, setValidateForm) => {

    const regexText = /[0-9a-zA-Z]+/gim;
    const regexEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    const regexNumeric = /^(-?)[0-9]*(\.?)[0-9]+$/;
    let result = false;

    fields.forEach((item) => {
        setValidateForm(prev => ({ ...prev, [item.name]: `` }))
        console.log(selectedItem[item.name])
        if (item.pivot.required && selectedItem[item.name]) {
            switch (item.type) {
                case 'text':
                    if (!regexText.test(selectedItem[item.name])) {
                        setValidateForm(prev => ({ ...prev, [item.name]: `El campo no puede contener simbolos ni carateres especiales` }))
                        result = true
                    }
                    break
                case 'email':
                    if (!regexEmail.test(selectedItem[item.name])) {
                        setValidateForm(prev => ({ ...prev, [item.name]: "Escriba un email valido" }))
                        result = true
                    }
                    break
                case 'monetary':
                    if (!regexNumeric.test(selectedItem[item.name])) {
                        setValidateForm(prev => ({ ...prev, [item.name]: "Escriba un valor numerico" }))
                        result = true
                    }
                    break
                case 'numeric':
                    if (!regexNumeric.test(selectedItem[item.name])) {
                        setValidateForm(prev => ({ ...prev, [item.name]: "Escriba un valor numerico" }))
                        result = true
                    }
                    break
                default:
                    //setValidateForm(prev => ({ ...prev, [item.name]: `El campo ${item.label} es invalido` }))
                    break
            }
        }


        if (item.pivot.required) {
            if (!selectedItem[item.name]) {
                setValidateForm(prev => ({ ...prev, [item.name]: `El campo no puede estar vacio` }))
                result = true
            } else if (!(selectedItem[item.name] + '').trim()) {
                setValidateForm(prev => ({ ...prev, [item.name]: `El campo no puede estar vacio` }))
                result = true
            }
        }
    })
    return result
}

export const imprimirTabla = (headers, data) => {
    const ventana = window.open('', '_blank');

    ventana.document.write(`<link rel="stylesheet" href="/css/print.css" />`)
    ventana.document.write('<table>')
    ventana.document.write('<thead>')
    ventana.document.write('<tr>')
    headers.forEach((el) => {
        ventana.document.write('<td>')
        ventana.document.write(el.Header)
        ventana.document.write('</td>')
    })
    ventana.document.write('</tr>')
    ventana.document.write('</thead>')
    ventana.document.write('<tbody>')
    data.forEach((el) => {
        ventana.document.write('<tr>')
        headers.forEach((item) => {
            ventana.document.write('<td>')
            ventana.document.write(el[item.accessor])
            ventana.document.write('</td>')
        })
        ventana.document.write('</tr>')
    })
    ventana.document.write('</tbody>')
    ventana.document.write('</table>')
}
