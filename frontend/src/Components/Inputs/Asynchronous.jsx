import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

import debounce from "lodash.debounce";
import { useMemo } from "react";
import { FormControl, FormHelperText } from "@mui/material";

export default function Asynchronous({
  item,
  handleChange,
  keyDown,
  path = "model_company",
  validateForm,
  disabled,
}) {
  const [value, setValue] = React.useState({ label: "" });
  const [options, setOptions] = React.useState([]);
  const [inputSearch, setInputSearch] = React.useState("");

  async function fetchData(input) {
    const response = await fetch(
      `http://localhost:8000/api/get_suggestions_autocomplete/?options=${path}&search=${input}`
      //`http://localhost:8000/api/${path}?search=${input}`
    );
    const data = await response.json();
    return data;
  }

  const changeHandler = (event) => {
    setInputSearch(event.target.value);
  };

  const throttledEventHandler = useMemo(() => debounce(changeHandler, 300), []);

  React.useEffect(() => {
    (async () => {
      const data = await fetchData(inputSearch);
      setOptions(data);
    })();
  }, [inputSearch]);

  React.useEffect(() => {
    value && value.label && handleChange({ target: { name: item.name, value: value.id } });
  }, [value]);

  return (
    <FormControl fullWidth>
      <Autocomplete
        disabled={disabled}
        disablePortal
        filterOptions={(x) => x}
        options={options}
        onChange={(event, newValue) => {
          setValue(newValue);
          console.log(newValue);
        }}
        onInputChange={throttledEventHandler}
        renderInput={(params) => (
          <TextField
            onKeyDown={keyDown}
            name={item.name}
            value={value}
            {...(validateForm && item.pivot.required === 1 && { required: true })}
            variant="standard"
            {...params}
            //onClick={handleChange}
            label={item.label || item.error}
          />
        )}
      />
      <FormHelperText error>{(validateForm && validateForm[item.name]) || ""}</FormHelperText>
    </FormControl>
  );
}
