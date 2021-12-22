const Functions = (item, nameFunction, name, handleChange) => {

    switch (nameFunction) {
        case "total_row":
            handleChange({ target: { name: 'total', value: item.quantity * item.price } })
            break
        default: break
    }

}

export default Functions