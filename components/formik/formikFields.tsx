import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import {
  Field,
  FieldInputProps,
  FormikErrors,
  FormikTouched,
  getIn,
} from "formik";
import React from "react";

interface Props {
  name: string;
  touched: FormikTouched<any>;
  errors: FormikErrors<any>;
  errorNameArr: string[];
  label: string;
  helperText: string;
  isRequired?: boolean;
  render: (props: any) => JSX.Element;
}

export default function FormikFields({
  name,
  errors,
  errorNameArr,
  touched,
  label,
  helperText,
  isRequired,
  render,
}: // InputComponent,
Props): JSX.Element {
  const ErrorMessage = ({
    name,
    touched,
    errors,
  }: {
    name: string;
    touched: FormikTouched<any>;
    errors: FormikErrors<any>;
  }) => {
    const error = getIn(errors, name);
    const touch = getIn(touched, name);
    return touch && error ? error : null;
  };
  return (
    <Field name={name}>
      {({ field }: { field: FieldInputProps<string> }) => (
        <FormControl
          isInvalid={
            !!ErrorMessage({
              name,
              touched,
              errors,
            })
          }
          isRequired={isRequired}
        >
          <FormLabel htmlFor={name}>{label}</FormLabel>
          {render(field)}
          <FormHelperText>{helperText}</FormHelperText>
          <FormErrorMessage>
            {errorNameArr.map((errName) => (
              <ErrorMessage
                key={`ErrorMessage_${errName}`}
                name={errName}
                errors={errors}
                touched={touched}
              />
            ))}
          </FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
