import {
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import Functions from "../../application/Functions";
import Asynchronous from "./Asynchronous";

const GenerateFields = ({
  item,
  selectedItem,
  handleChange,
  keyDown,
  validateForm,
  modify = false,
}) => {
  const required = item.pivot.required === 1 && !modify ? true : false;
  const disabled = item.pivot.editable === 0 && modify ? true : false;
  //const disabled = false;

  const hoy = () => {
    let formatted_date =
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate() +
      " " +
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds();
    console.log(formatted_date);
    return formatted_date;
  };

  const handleChangeCalculated = (e) => {
    Functions(selectedItem, "total_row", item.name, handleChange);
    handleChange(e);
  };

  switch (item.type) {
    case "autocomplete":
      return (
        <Asynchronous
          item={item}
          handleChange={handleChange}
          keyDown={keyDown}
          path={item.options}
          validateForm={validateForm}
          disabled={disabled}
        />
      );

    case "select":
      return (
        <FormControl
          error={validateForm[item.name] ? true : false}
          fullWidth
          variant="standard"
          disabled={disabled}
          required={required}
        >
          <InputLabel id={`simple-select-label-${item.name}`}>{item.label}</InputLabel>
          <Select
            labelId={`simple-select-label-${item.name}`}
            id={`simple-select-${item.label}`}
            name={item.name}
            value={selectedItem[item.name] || ""}
            label={item.label}
            onChange={handleChange}
            onBlur={handleChange}
            onKeyDown={keyDown}
          >
            {JSON.parse(item.options).map((el, i) => {
              const [value, label] = el;
              return (
                <MenuItem key={i} value={value}>
                  {label}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText error>{validateForm[item.name] || ""}</FormHelperText>
        </FormControl>
      );
    case "monetary":
      return (
        <FormControl
          error={validateForm[item.name] ? true : false}
          fullWidth
          sx={{ m: 1 }}
          required={required}
          disabled={disabled}
          variant="standard"
        >
          <InputLabel htmlFor={`standard-adornment-amount-${item.name}`}>{item.label}</InputLabel>
          <Input
            id={`standard-adornment-amount-${item.name}`}
            name={item.name}
            type="number"
            value={selectedItem[item.name] || 0}
            onChange={handleChangeCalculated}
            onBlur={handleChangeCalculated}
            onKeyDown={keyDown}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
          <FormHelperText error>{validateForm[item.name] || ""}</FormHelperText>
        </FormControl>
      );
    case "numeric":
      return (
        <FormControl error={validateForm[item.name] ? true : false} fullWidth>
          <TextField
            type={"number"}
            name={item.name}
            onChange={handleChangeCalculated}
            onBlur={handleChangeCalculated}
            label={item.label}
            variant="standard"
            {...(item.pivot.required && { required: true })}
            value={selectedItem[item.name] || 0}
            onKeyDown={keyDown}
          />
          <FormHelperText error>{validateForm[item.name] || ""}</FormHelperText>
        </FormControl>
      );
    case "date":
      return (
        <FormControl error={validateForm[item.name] ? true : false} fullWidth>
          <TextField
            type={item.type}
            name={item.name}
            onChange={handleChange}
            onBlur={handleChange}
            label={item.label}
            variant="standard"
            {...(item.pivot.required && { required: true })}
            value={selectedItem[item.name] === "" ? hoy : selectedItem[item.name]}
            onKeyDown={keyDown}
          />
          <FormHelperText error>{validateForm[item.name] || ""}</FormHelperText>
        </FormControl>
      );
    case "calculated":
      return (
        <FormControl error={validateForm[item.name] ? true : false} fullWidth>
          <TextField
            type="number"
            name={item.name}
            onChange={handleChangeCalculated}
            onBlur={handleChangeCalculated}
            label={item.label}
            variant="standard"
            required={required}
            disabled={disabled}
            value={selectedItem[item.name] || 0}
            onKeyDown={keyDown}
          />
          <FormHelperText error>{validateForm[item.name] || ""}</FormHelperText>
        </FormControl>
      );
    case "text":
      return (
        <FormControl fullWidth>
          <TextField
            error={validateForm[item.name] ? true : false}
            type={item.type}
            name={item.name}
            onChange={handleChange}
            onBlur={handleChange}
            label={item.label}
            variant="standard"
            required={required}
            disabled={disabled}
            value={selectedItem[item.name] || ""}
            onKeyDown={keyDown}
          />
          <FormHelperText error>{validateForm[item.name] || ""}</FormHelperText>
        </FormControl>
      );
    default:
      return (
        <FormControl fullWidth>
          <TextField
            error={validateForm[item.name] ? true : false}
            type={item.type}
            name={item.name}
            onChange={handleChange}
            onBlur={handleChange}
            label={item.label}
            variant="standard"
            required={required}
            disabled={disabled}
            value={selectedItem[item.name] || ""}
            onKeyDown={keyDown}
          />
          <FormHelperText error>{validateForm[item.name] || ""}</FormHelperText>
        </FormControl>
      );
  }
};

export default GenerateFields;
