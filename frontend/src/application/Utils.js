

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
    const regexMonetary = /[0-9]+/;
    let result = false;

    fields.forEach((item) => {
        setValidateForm(prev => ({ ...prev, [item.name]: `` }))
        console.log(selectedItem[item.name])
        if (item.pivot.required && selectedItem[item.name]) {
            switch (item.type) {
                case 'text':
                    if (!selectedItem[item.name].match(regexText)) {
                        setValidateForm(prev => ({ ...prev, [item.name]: `El campo ${item.label} no puede contener simbolos ni carateres especiales` }))
                        result = true
                    }
                    break
                case 'email':
                    if (!selectedItem[item.name].match(regexEmail)) {
                        setValidateForm(prev => ({ ...prev, [item.name]: "Escriba un email valido" }))
                        result = true
                    }
                    break
                case 'monetary':
                    if (!selectedItem[item.name].match(regexMonetary)) {
                        setValidateForm(prev => ({ ...prev, [item.name]: "Escriba una valor numerico" }))
                        result = true
                    }
                    break
                case 'numeric':
                    if (!selectedItem[item.name].match(regexMonetary)) {
                        setValidateForm(prev => ({ ...prev, [item.name]: "Escriba una valor numerico" }))
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
