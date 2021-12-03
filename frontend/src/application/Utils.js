import { useSnackbar } from 'notistack';

export default function Validator(response) {

    const { enqueueSnackbar } = useSnackbar();

    for (const property in response) {
        if (property !== '0') {
            response[property].forEach(element => {
                enqueueSnackbar(element, { variant: 'error' });
            });
        }
    }
}

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

export const optionsDELETE = {
    method: "DELETE",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${window.localStorage.getItem("loggedAppsielApp")}`
    }
}
