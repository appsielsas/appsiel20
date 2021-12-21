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

const GenerateFields = ({ item, selectedItem, handleChange, keyDown, validateForm }) => {
  useEffect(() => {
    console.log("re-render");
  }, []);

  const required = item.pivot.required === 1 && true;
  //const disabled = item.pivot.editable === 0 && true;
  const disabled = false;

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

  const handleChangeCalculated = () => {
    Functions(selectedItem, item.options, item.name, handleChange);
  };

  switch (item.type) {
    case "autocomplete":
      return (
        <Asynchronous
          key={item.id + ""}
          item={item}
          handleChange={handleChange}
          keyDown={keyDown}
          path={item.options}
          validateForm={validateForm}
        />
      );

    case "select":
      return (
        <FormControl fullWidth variant="standard" {...(required, disabled)} key={item.id + ""}>
          <InputLabel id={`simple-select-label-${item.name}`}>{item.label}</InputLabel>
          <Select
            labelId={`simple-select-label-${item.name}`}
            id={`simple-select-${item.label}`}
            name={item.name}
            value={selectedItem[item.name] || ""}
            label={item.label}
            onChange={handleChange}
            onKeyDown={keyDown}
          >
            {JSON.parse(item.options).map((el) => {
              const [value, label] = el;
              return <MenuItem value={value}>{label}</MenuItem>;
            })}
          </Select>
          <FormHelperText error>{validateForm[item.name] || ""}</FormHelperText>
        </FormControl>
      );
    case "monetary":
      return (
        <FormControl
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
            value={selectedItem[item.name] || "0"}
            onChange={(e) => {
              handleChange(e);
              handleChangeCalculated();
            }}
            onKeyDown={keyDown}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
          <FormHelperText error>{validateForm[item.name] || ""}</FormHelperText>
        </FormControl>
      );
    case "numeric":
      console.log(selectedItem[item.name]);
      return (
        <FormControl fullWidth>
          <TextField
            key={item.id + ""}
            type={"number"}
            name={item.name}
            onChange={(e) => {
              handleChange(e);
              handleChangeCalculated();
            }}
            onBlur={handleChange}
            label={item.label}
            variant="standard"
            {...(item.pivot.required && { required: true })}
            value={selectedItem[item.name] || "0"}
            onKeyDown={keyDown}
          />
          <FormHelperText error>{validateForm[item.name] || ""}</FormHelperText>
        </FormControl>
      );
    case "date":
      console.log(selectedItem[item.name]);
      return (
        <FormControl fullWidth>
          <TextField
            key={item.id + ""}
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
        <FormControl fullWidth>
          <TextField
            key={item.id + ""}
            type="number"
            name={item.name}
            onChange={handleChangeCalculated}
            onBlur={handleChangeCalculated}
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
            key={item.id + ""}
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
