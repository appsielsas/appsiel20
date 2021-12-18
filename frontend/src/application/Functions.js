const Functions = (item, nameFunction, name, handleChange) => {
    console.log(item)
    switch (nameFunction) {
        case "total_row":
            handleChange({ target: { name: name, value: item.quantity * item.price } })
            break
        default: break
    }

}

export default Functions