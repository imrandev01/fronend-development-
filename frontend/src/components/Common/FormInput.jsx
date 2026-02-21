import PropTypes from 'prop-types';
import { TextField, MenuItem } from '@mui/material';

const FormInput = ({
  label,
  name,
  value,
  onChange,
  error = '',
  type = 'text',
  placeholder = '',
  required = false,
  disabled = false,
  multiline = false,
  rows = 4,
  select = false,
  options = [],
  helperText = '',
  fullWidth = true,
  ...props
}) => {
  const hasError = Boolean(error);

  return (
    <TextField
      fullWidth={fullWidth}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      multiline={multiline}
      rows={multiline ? rows : undefined}
      select={select}
      error={hasError}
      helperText={error || helperText}
      variant="outlined"
      size="small"
      sx={{
        '& .MuiOutlinedInput-root': {
          '&:hover fieldset': {
            borderColor: '#764ba2',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#667eea',
          },
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#667eea',
        },
      }}
      {...props}
    >
      {select && options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  select: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  helperText: PropTypes.string,
  fullWidth: PropTypes.bool,
};

export default FormInput;