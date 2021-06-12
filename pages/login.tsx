import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputRightElement,
  Button,
  InputGroup,
  Box,
  Center,
} from "@chakra-ui/react";
import { Form, Field, Formik } from "formik";
import React, { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>();

  const initialValues = { username: "", password: "" };

  function handleShowPasswordClick() {
    setShowPassword((prev) => !prev);
  }

  return (
    <Center h="100vh">
      <Box borderWidth="1px" borderRadius="lg" p="6" width="500px">
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Field name="username">
                {({ field }: { field: any }) => (
                  <FormControl
                    isInvalid={!!errors.username && touched.username}
                    isRequired
                  >
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input {...field} id="username" placeholder="Username" />
                    <FormErrorMessage>{errors.username}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field }: { field: any }) => (
                  <FormControl
                    isInvalid={!!errors.password && touched.password}
                    isRequired
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <InputGroup>
                      <Input
                        {...field}
                        id="password"
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={handleShowPasswordClick}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Center>
  );
}
