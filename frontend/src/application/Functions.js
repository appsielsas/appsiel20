const Functions = (item, nameFunction, name, handleChange) => {
    console.log('calculando...')
    switch (nameFunction) {
        case "total_row":
            console.log(item)
            handleChange({ target: { name: 'total', value: item.quantity * item.price } })
            break
        default: break
    }

}

export default Functions