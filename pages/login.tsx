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
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { Form, Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import axios from "axios";
import { hashPassword } from "../lib/auth/bcrypt";
import useLogin from "../hooks/useLogin";
import { ILogin } from "../types";

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>();
  const [session, loading] = useSession();
  const router = useRouter();
  const { error, setError } = useLogin();

  const initialValues = { username: "", password: "" };

  function handleShowPasswordClick() {
    setShowPassword((prev) => !prev);
  }

  useEffect(() => {
    console.log(router.query);
    if (router.query.error === "CredentialsSignin") {
      setError("Invalid username or password.");
    }
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  } else if (session) {
    router.push("/");
    return <p>Redirecting...</p>;
  }

  return (
    <Center h="100vh">
      <Box borderWidth="1px" borderRadius="lg" p="6" width="500px">
        {error && (
          <Alert status="error" marginBottom="1rem">
            <AlertIcon />
            {error}
          </Alert>
        )}
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, actions) => {
            await signIn("credentials", {
              username: values.username,
              password: values.password,
              callbackUrl: `${window.location.origin}/admin`,
            });
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
