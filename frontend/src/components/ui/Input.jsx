import PropTypes from 'prop-types';
import '../../styles/components/Input.css';

/**
 * Input component with theme support
 * 
 * @param {Object} props - Component props
 * @param {string} [props.type='text'] - Input type (text, email, password, etc.)
 * @param {string} [props.id] - Input ID attribute
 * @param {string} [props.name] - Input name attribute
 * @param {string} [props.value] - Input value
 * @param {Function} [props.onChange] - Input change handler
 * @param {string} [props.placeholder] - Input placeholder text
 * @param {string} [props.size='md'] - Input size (sm, md, lg)
 * @param {boolean} [props.disabled=false] - Whether the input is disabled
 * @param {boolean} [props.required=false] - Whether the input is required
 * @param {boolean} [props.error=false] - Whether there's an error state
 * @param {string} [props.errorMessage] - Error message to display
 * @param {React.ReactNode} [props.label] - Input label content
 * @param {React.ReactNode} [props.leftIcon] - Icon to display on the left
 * @param {React.ReactNode} [props.rightIcon] - Icon to display on the right
 * @param {string} [props.className] - Additional CSS classes
 */
const Input = ({
  type = 'text',
  id,
  name,
  value,
  onChange,
  placeholder,
  size = 'md',
  disabled = false,
  required = false,
  error = false,
  errorMessage,
  label,
  leftIcon,
  rightIcon,
  className = '',
  ...rest
}) => {
  // Generate an ID if not provided
  const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="input-wrapper">
      {label && (
        <label htmlFor={inputId} className={`input-label ${required ? 'required' : ''}`}>
          {label}
        </label>
      )}
      
      <div className={`input-group ${leftIcon ? 'input-icon-left' : ''} ${rightIcon ? 'input-icon-right' : ''}`}>
        {leftIcon && (
          <div className="input-icon">
            {leftIcon}
          </div>
        )}
        
        <input
          type={type}
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`input input-${size} ${error ? 'input-error' : ''} ${className}`}
          {...rest}
        />
        
        {rightIcon && (
          <div className="input-icon">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && errorMessage && (
        <div className="input-error-message">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  label: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  className: PropTypes.string,
};

export default Input;