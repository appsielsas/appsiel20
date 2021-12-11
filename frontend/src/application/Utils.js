import { useSnackbar, SnackbarProvider } from 'notistack';
import { useContext } from 'react';
import { UserContext } from "./UserProvider";


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
