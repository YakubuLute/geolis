import React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function MultiselectComponent({label, value =[], valueState, setvalueState, handleChange }) {
  return (
    <div style={{marginBottom:"1rem"}}>
    <FormControl sx={{ m: 1, width: 300,  }}>
      <InputLabel id="demo-multiple-checkbox-label" sx={{color:"#c9c9c9"}}>
        {label}
      </InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={valueState}
        onChange={handleChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {value.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox
              checked={valueState.indexOf(name) > -1}
            />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </div>
  )
}

export default MultiselectComponent