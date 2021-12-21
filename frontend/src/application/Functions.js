const Functions = (item, nameFunction, name, handleChange) => {
    console.log('calculando...')
    switch (nameFunction) {
        case "total_row":
            handleChange({ target: { name: 'total', value: item.quantity * item.price } })
            console.log(item)
            break
        default: break
    }

}

export default Functions