// ** React Imports
import React, { Fragment } from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
// import 'react-phone-number-input/style.css';
// import 'react-phone-number-input/style.css';

import './index.scss';

const index = (props) => {
  const { Controller, control, errors, myStyles, phoneInputSize } = props;

  const handleValidate = (value) => {
    const stringValue = String(value); // Convert value to a string
    const isValid = isValidPhoneNumber(stringValue);
    console.log({ isValid });
    return isValid;
  };
  console.log(phoneInputSize);

  return (
    <>
      <Controller
        name="PhoneNumber"
        control={control}
        defaultValue=""
        rules={{
          validate: (value) => handleValidate(value),
        }}
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            id="phone-number"
            className={`form-control input-phone-number phone-input ${phoneInputSize} `}
            international
            // defaultCountry="US"
            plcaeholder="aa"
            style={{ fontSize: myStyles }}
            value={value}
            onChange={onChange}
          />
        )}
      />
      {errors.PhoneNumber && <span style={{ color: 'red', fontSize: 12 }}>Invalid Phone</span>}
    </>
  );
};

export default index;
