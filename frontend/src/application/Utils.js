import { useSnackbar } from 'notistack';
import { useContext } from 'react';
import { UserContext } from "./UserProvider";

export default function Validator(data, status) {

    const { enqueueSnackbar } = useSnackbar();
    const { user, signIn, signOut } = useContext(UserContext);

    if (status === 401) {
        signOut()
    }
    for (const property in data) {
        data[property].forEach(element => {
            enqueueSnackbar(element, { variant: 'error' });
        });
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
