import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

import debounce from "lodash.debounce";
import { useMemo } from "react";

export default function Asynchronous({ item, handleChange, keyDown, path = "model_company" }) {
  const [value, setValue] = React.useState({ id: "" });
  const [options, setOptions] = React.useState([]);
  const [inputSearch, setInputSearch] = React.useState("");
  //const loading = open && options.length === 0;

  async function fetchData(input) {
    const response = await fetch(
      //`http://localhost:8000/api/get_suggestions_autocomplete/?options=${path}&search=${input}`
      `http://localhost:8000/api/${path}?search=${input}`
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

  return (
    <Autocomplete
      fullWidth
      disablePortal
      filterOptions={(x) => x}
      options={options}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        console.log(value);
      }}
      onBlur={throttledEventHandler}
      onInputChange={throttledEventHandler}
      renderInput={(params) => (
        <TextField
          onKeyDown={keyDown}
          name={item.name}
          onChange={handleChange}
          onBlur={handleChange}
          {...(item.pivot.required === 1 && { required: true })}
          variant="standard"
          {...params}
          label={item.label || item.error}
        />
      )}
    />
  );
}
