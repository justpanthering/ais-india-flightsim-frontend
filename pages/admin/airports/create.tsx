import {
  Box,
  Button,
  Grid,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { FieldArray, FieldInputProps, Form, Formik } from "formik";
import Head from "next/head";
import React from "react";
import * as Yup from "yup";
import GroupWithHeader from "../../../components/GroupWithHeader";
import CoordinatesInput from "../../../components/customInputs/coordinates";
import FormikField from "../../../components/formik/formikFields";
import { createAirport } from "../../../api-client/airport";
import { Airport } from "../../../types";
import { useSession } from "next-auth/client";
import router from "next/router";
import { pathAdminAirport } from "../../../utils/routes";

export default function create(): JSX.Element | null {
  const [session, loading] = useSession();
  const toast = useToast();

  if (loading) {
    return null;
  }
  if (!loading && !session) {
    router.push("/");
  }
  const initialValues: Airport = {
    icao: "",
    localeName: "",
    aerodomeName: "",
    coordinates: {
      latitude: {
        measurement: 0,
        hemisphere: "N",
      },
      longitude: {
        measurement: 0,
        hemisphere: "E",
      },
    },
    elevation: 0,
    address: "",
    runways: [],
    charts: [],
    radarTrafficCommunicationFrequency: [],
    approachTrafficCommunicationFrequency: [],
    controlTrafficCommunicationFrequency: [],
    groundTrafficCommunicationFrequency: [],
    informationTrafficCommunicationFrequency: [],
    towerTrafficCommunicationFrequency: [],
  };
  const airportCreateSchema = Yup.object().shape({
    icao: Yup.string()
      .uppercase("ICAO code must be in uppercase")
      .strict()
      .length(4, "ICAO must be 4 characters")
      .required("ICAO code is required"),
    localeName: Yup.string().required("Location Name is required"),
    aerodomeName: Yup.string().required("Aerodome Name"),
    coordinates: Yup.object().shape({
      latitude: Yup.object().shape({
        measurement: Yup.number().required(
          "Latitudinal measurement (in degrees) is required"
        ),
        hemisphere: Yup.string().required(
          "Latiduninal hemisphere (N/S) is required"
        ),
      }),
      longitude: Yup.object().shape({
        measurement: Yup.number().required(
          "Longitudinal measurement (in degrees) is required"
        ),
        hemisphere: Yup.string().required(
          "Longitudinal hemisphere (E/W) is required"
        ),
      }),
    }),
    elevation: Yup.number().required("Elevation in feet is required"),
    address: Yup.string(),
    runways: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Runway name is required"),
        dimension: Yup.number().required("Runway dimension is required"),
        surface: Yup.string().required("Runway surface is required"),
        coordinates: Yup.object().shape({
          latitude: Yup.object().shape({
            measurement: Yup.number().required(
              "Latitudinal measurement (in degrees) is required"
            ),
            hemisphere: Yup.string().required(
              "Latiduninal hemisphere (N/S) is required"
            ),
          }),
          longitude: Yup.object().shape({
            measurement: Yup.number().required(
              "Longitudinal measurement (in degrees) is required"
            ),
            hemisphere: Yup.string().required(
              "Longitudinal hemisphere (E/W) is required"
            ),
          }),
        }),
        elevation: Yup.number().required("Runway elevation is required"),
        visualSlopeIndicationSystem: Yup.string(),
      })
    ),
    charts: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Chart name is required"),
        url: Yup.string().required("Chart url is required"),
      })
    ),
    radarTrafficCommunicationFrequency: Yup.array().of(Yup.number()),
    approachTrafficCommunicationFrequency: Yup.array().of(Yup.number()),
    controlTrafficCommunicationFrequency: Yup.array().of(Yup.number()),
    groundTrafficCommunicationFrequency: Yup.array().of(Yup.number()),
    informationTrafficCommunicationFrequency: Yup.array().of(Yup.number()),
    towerTrafficCommunicationFrequency: Yup.array().of(Yup.number()),
  });
  return (
    <>
      <Head>
        <title>Dashboard - Create | AIS - India</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box p="1rem 2rem" maxW="1080px">
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            console.log(values);
            try {
              const res = await createAirport(values);
              console.log("response: ", res);
              toast({
                title: `Success!`,
                description: "Airport created successfully",
                status: "success",
                isClosable: true,
              });
              router.push(pathAdminAirport);
            } catch (e) {
              console.error(e);
              toast({
                title: `Error!`,
                description: e.message,
                status: "error",
                isClosable: true,
              });
            }
          }}
          validationSchema={airportCreateSchema}
        >
          {({ errors, touched, isSubmitting, setFieldValue, values }) => (
            <Form>
              <GroupWithHeader title="General Information">
                <FormikField
                  name="icao"
                  label="ICAO Code"
                  helperText="Unique ICAO Identifier"
                  errorNameArr={["icao"]}
                  touched={touched}
                  errors={errors}
                  isRequired
                  render={(props: FieldInputProps<any>) => (
                    <Input {...props} placeholder="Eg. VERC" id="icao" />
                  )}
                />
                <FormikField
                  name="localeName"
                  label="Location Name"
                  helperText="City/Town/Village/Municipality name where the airport is
                        located"
                  errorNameArr={["localeName"]}
                  touched={touched}
                  errors={errors}
                  isRequired
                  render={(props: FieldInputProps<any>) => (
                    <Input
                      {...props}
                      placeholder="Eg. Ranchi"
                      id="localeName"
                    />
                  )}
                />
                <FormikField
                  name="aerodomeName"
                  label="Aerodome Name"
                  helperText="Name of the airport"
                  errorNameArr={["aerodomeName"]}
                  touched={touched}
                  errors={errors}
                  isRequired
                  render={(props: FieldInputProps<any>) => (
                    <Input
                      {...props}
                      placeholder="Eg. Birsa Munda Airport"
                      id="aerodomeName"
                    />
                  )}
                />
                <FormikField
                  name={`coordinates`}
                  label="Coordinates"
                  helperText="Airport Coordinates"
                  errorNameArr={[
                    `coordinates.latitude.measurement`,
                    `coordinates.latitude.hemisphere`,
                    `coordinates.longitude.measurement`,
                    `coordinates.longitude.hemisphere`,
                  ]}
                  touched={touched}
                  errors={errors}
                  isRequired
                  render={(props: FieldInputProps<any>) => (
                    <CoordinatesInput
                      {...props}
                      onChange={(val) => setFieldValue(props.name, val)}
                      id={`coordinates`}
                    />
                  )}
                />
                <FormikField
                  name="elevation"
                  label="Elevation"
                  helperText="Average Elevation of airport in feet"
                  errorNameArr={["elevation"]}
                  touched={touched}
                  errors={errors}
                  isRequired
                  render={(props: FieldInputProps<any>) => (
                    <InputGroup size="sm">
                      <NumberInput
                        {...props}
                        onChange={(val) =>
                          setFieldValue(props.name, Number(val))
                        }
                        step={0.5}
                        id="elevation"
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <InputRightAddon>feet</InputRightAddon>
                    </InputGroup>
                  )}
                />
                <FormikField
                  name="address"
                  label="Address"
                  helperText="Address of the airport"
                  errorNameArr={["address"]}
                  touched={touched}
                  errors={errors}
                  render={(props: FieldInputProps<any>) => (
                    <Textarea {...props} id="address" />
                  )}
                />
              </GroupWithHeader>
              <GroupWithHeader title="Runways">
                <FieldArray
                  name="runways"
                  render={(arrayHelpers) => (
                    <>
                      {!!values.runways &&
                        !!values.runways.length &&
                        values.runways.map((runway, i) => (
                          <GroupWithHeader
                            title={runway.name || "New Runway"}
                            actions={[
                              <Button
                                onClick={() => arrayHelpers.remove(i)}
                                key={`action_runways_${i}_remove`}
                              >
                                -
                              </Button>,
                            ]}
                            key={`runways_${i}_groupWithHeader`}
                          >
                            <React.Fragment key={`runways_${i}`}>
                              <FormikField
                                name={`runways[${i}].name`}
                                label="Name"
                                helperText="Runway Name"
                                errorNameArr={[`runways[${i}].name`]}
                                touched={touched}
                                errors={errors}
                                isRequired
                                render={(props: FieldInputProps<any>) => (
                                  <Input
                                    {...props}
                                    placeholder="Eg. 27L"
                                    id={`runways_${i}_name`}
                                  />
                                )}
                              />
                              <FormikField
                                name={`runways[${i}].dimension`}
                                label="Dimension"
                                helperText="Runway dimension in feet"
                                errorNameArr={[`runways[${i}].dimension`]}
                                touched={touched}
                                errors={errors}
                                isRequired
                                render={(props: FieldInputProps<any>) => (
                                  <InputGroup size="sm">
                                    <NumberInput
                                      {...props}
                                      onChange={(val) =>
                                        setFieldValue(props.name, Number(val))
                                      }
                                      step={0.5}
                                      id={`runways_${i}_dimension`}
                                    >
                                      <NumberInputField />
                                      <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                      </NumberInputStepper>
                                    </NumberInput>
                                    <InputRightAddon>feet</InputRightAddon>
                                  </InputGroup>
                                )}
                              />
                              <FormikField
                                name={`runways[${i}].surface`}
                                label="Surface"
                                helperText="Runway Surface Texture"
                                errorNameArr={[`runways[${i}].surface`]}
                                touched={touched}
                                errors={errors}
                                isRequired
                                render={(props: FieldInputProps<any>) => (
                                  <Input
                                    {...props}
                                    placeholder="Eg. Concrete"
                                    id={`runways_${i}_surface`}
                                  />
                                )}
                              />
                              <FormikField
                                name={`runways[${i}].coordinates`}
                                label="Coordinates"
                                helperText="Runway Coordinates"
                                errorNameArr={[
                                  `runways[${i}].coordinates.latitude.measurement`,
                                  `runways[${i}].coordinates.latitude.hemisphere`,
                                  `runways[${i}].coordinates.longitude.measurement`,
                                  `runways[${i}].coordinates.longitude.hemisphere`,
                                ]}
                                touched={touched}
                                errors={errors}
                                isRequired
                                render={(props: FieldInputProps<any>) => (
                                  <CoordinatesInput
                                    {...props}
                                    onChange={(val) =>
                                      setFieldValue(props.name, val)
                                    }
                                    id={`runways[${i}].coordinates`}
                                  />
                                )}
                              />
                              <FormikField
                                name={`runways[${i}].elevation`}
                                label="Elevation"
                                helperText="Runway elevation in feet"
                                touched={touched}
                                errors={errors}
                                isRequired
                                errorNameArr={[`runways[${i}].elevation`]}
                                render={(props: FieldInputProps<any>) => (
                                  <InputGroup size="sm">
                                    <NumberInput
                                      {...props}
                                      id={`runways.${i}.elevation`}
                                      onChange={(val) =>
                                        setFieldValue(props.name, Number(val))
                                      }
                                      step={0.5}
                                    >
                                      <NumberInputField />
                                      <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                      </NumberInputStepper>
                                    </NumberInput>
                                    <InputRightAddon>feet</InputRightAddon>
                                  </InputGroup>
                                )}
                              />
                              <FormikField
                                name={`runways[${i}].visualSlopeIndicationSystem`}
                                label="Visual Slope Indication System"
                                helperText="Runway Visual Slope Indication System"
                                touched={touched}
                                errors={errors}
                                errorNameArr={[
                                  `runways[${i}].visualSlopeIndicationSystem`,
                                ]}
                                render={(props: FieldInputProps<any>) => (
                                  <Textarea
                                    {...props}
                                    id={`runways_${i}_visualSlopeIndicationSystem`}
                                  />
                                )}
                              />
                            </React.Fragment>
                          </GroupWithHeader>
                        ))}
                      <Button
                        onClick={() =>
                          arrayHelpers.push({
                            name: "",
                            dimension: 0,
                            surface: "",
                            coordinates: {
                              latitude: {
                                measurement: 0,
                                hemisphere: "N",
                              },
                              longitude: {
                                measurement: 0,
                                hemisphere: "E",
                              },
                            },
                            elevation: 0,
                            visualSlopeIndicationSystem: "",
                          })
                        }
                      >
                        Add Runway
                      </Button>
                    </>
                  )}
                />
              </GroupWithHeader>
              <GroupWithHeader title="Charts">
                <FieldArray
                  name="charts"
                  render={(arrayHelpers) => (
                    <>
                      {!!values.charts &&
                        !!values.charts.length &&
                        values.charts.map((chart, i) => (
                          <GroupWithHeader
                            title={chart.name || "New Chart"}
                            actions={[
                              <Button
                                onClick={() => arrayHelpers.remove(i)}
                                key={`action_chart_${i}_remove`}
                              >
                                -
                              </Button>,
                            ]}
                            key={`charts_${i}_groupWithHeader`}
                          >
                            <React.Fragment key={`charts_${i}`}>
                              <FormikField
                                name={`charts[${i}].name`}
                                label="Name"
                                helperText="Chart Name"
                                errorNameArr={[`charts[${i}].name`]}
                                touched={touched}
                                errors={errors}
                                isRequired
                                render={(props: FieldInputProps<any>) => (
                                  <Input
                                    {...props}
                                    placeholder="Eg. 27L"
                                    id={`charts_${i}_name`}
                                  />
                                )}
                              />
                              <FormikField
                                name={`charts[${i}].url`}
                                label="Url"
                                helperText="Chart Url"
                                errorNameArr={[`charts[${i}].url`]}
                                touched={touched}
                                errors={errors}
                                isRequired
                                render={(props: FieldInputProps<any>) => (
                                  <Input
                                    {...props}
                                    placeholder="Eg. 27L"
                                    id={`charts_${i}_url`}
                                  />
                                )}
                              />
                            </React.Fragment>
                          </GroupWithHeader>
                        ))}
                      <Button
                        onClick={() =>
                          arrayHelpers.push({
                            name: "",
                            url: "",
                          })
                        }
                      >
                        Add Chart
                      </Button>
                    </>
                  )}
                />
              </GroupWithHeader>
              <GroupWithHeader title="Traffic Radio Communication">
                <GroupWithHeader title="Radar Traffic Radio Communication">
                  <FieldArray
                    name="radarTrafficCommunicationFrequency"
                    render={(arrayHelpers) => (
                      <Grid templateRows="auto" gap={6}>
                        {!!values.radarTrafficCommunicationFrequency &&
                          !!values.radarTrafficCommunicationFrequency.length &&
                          values.radarTrafficCommunicationFrequency.map(
                            (radarTrafficCommunicationFrequency, i) => (
                              <HStack
                                key={`radarTrafficCommunicationFrequency_${i}`}
                              >
                                <FormikField
                                  name={`radarTrafficCommunicationFrequency[${i}]`}
                                  label="Frequency"
                                  helperText="Radio Frequency"
                                  errorNameArr={[
                                    `radarTrafficCommunicationFrequency[${i}]`,
                                  ]}
                                  touched={touched}
                                  errors={errors}
                                  isRequired
                                  render={(props: FieldInputProps<any>) => (
                                    <InputGroup size="sm">
                                      <NumberInput
                                        {...props}
                                        onChange={(val) =>
                                          setFieldValue(props.name, Number(val))
                                        }
                                        step={0.5}
                                        id={`radarTrafficCommunicationFrequency_${i}`}
                                      >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                          <NumberIncrementStepper />
                                          <NumberDecrementStepper />
                                        </NumberInputStepper>
                                      </NumberInput>
                                      <InputRightAddon>FM</InputRightAddon>
                                    </InputGroup>
                                  )}
                                />
                                <Button
                                  onClick={() => arrayHelpers.remove(i)}
                                  key={`action_radarTrafficCommunicationFrequency_${i}_remove`}
                                >
                                  -
                                </Button>
                              </HStack>
                            )
                          )}
                        <Box>
                          <Button onClick={() => arrayHelpers.push(100.0)}>
                            Add Frequency
                          </Button>
                        </Box>
                      </Grid>
                    )}
                  />
                </GroupWithHeader>
                <GroupWithHeader title="Tower Traffic Radio Communication">
                  <FieldArray
                    name="towerTrafficCommunicationFrequency"
                    render={(arrayHelpers) => (
                      <Grid templateRows="auto" gap={6}>
                        {!!values.towerTrafficCommunicationFrequency &&
                          !!values.towerTrafficCommunicationFrequency.length &&
                          values.towerTrafficCommunicationFrequency.map(
                            (towerTrafficCommunicationFrequency, i) => (
                              <HStack
                                key={`towerTrafficCommunicationFrequency_${i}`}
                              >
                                <FormikField
                                  name={`towerTrafficCommunicationFrequency[${i}]`}
                                  label="Frequency"
                                  helperText="Radio Frequency"
                                  errorNameArr={[
                                    `towerTrafficCommunicationFrequency[${i}]`,
                                  ]}
                                  touched={touched}
                                  errors={errors}
                                  isRequired
                                  render={(props: FieldInputProps<any>) => (
                                    <InputGroup size="sm">
                                      <NumberInput
                                        {...props}
                                        onChange={(val) =>
                                          setFieldValue(props.name, Number(val))
                                        }
                                        step={0.5}
                                        id={`towerTrafficCommunicationFrequency_${i}`}
                                      >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                          <NumberIncrementStepper />
                                          <NumberDecrementStepper />
                                        </NumberInputStepper>
                                      </NumberInput>
                                      <InputRightAddon>FM</InputRightAddon>
                                    </InputGroup>
                                  )}
                                />
                                <Button
                                  onClick={() => arrayHelpers.remove(i)}
                                  key={`action_towerTrafficCommunicationFrequency_${i}_remove`}
                                >
                                  -
                                </Button>
                              </HStack>
                            )
                          )}
                        <Box>
                          <Button onClick={() => arrayHelpers.push(100.0)}>
                            Add Frequency
                          </Button>
                        </Box>
                      </Grid>
                    )}
                  />
                </GroupWithHeader>
                <GroupWithHeader title="Control Traffic Radio Communication">
                  <FieldArray
                    name="controlTrafficCommunicationFrequency"
                    render={(arrayHelpers) => (
                      <Grid templateRows="auto" gap={6}>
                        {!!values.controlTrafficCommunicationFrequency &&
                          !!values.controlTrafficCommunicationFrequency
                            .length &&
                          values.controlTrafficCommunicationFrequency.map(
                            (controlTrafficCommunicationFrequency, i) => (
                              <HStack
                                key={`controlTrafficCommunicationFrequency_${i}`}
                              >
                                <FormikField
                                  name={`controlTrafficCommunicationFrequency[${i}]`}
                                  label="Frequency"
                                  helperText="Radio Frequency"
                                  errorNameArr={[
                                    `controlTrafficCommunicationFrequency[${i}]`,
                                  ]}
                                  touched={touched}
                                  errors={errors}
                                  isRequired
                                  render={(props: FieldInputProps<any>) => (
                                    <InputGroup size="sm">
                                      <NumberInput
                                        {...props}
                                        onChange={(val) =>
                                          setFieldValue(props.name, Number(val))
                                        }
                                        step={0.5}
                                        id={`controlTrafficCommunicationFrequency_${i}`}
                                      >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                          <NumberIncrementStepper />
                                          <NumberDecrementStepper />
                                        </NumberInputStepper>
                                      </NumberInput>
                                      <InputRightAddon>FM</InputRightAddon>
                                    </InputGroup>
                                  )}
                                />
                                <Button
                                  onClick={() => arrayHelpers.remove(i)}
                                  key={`action_controlTrafficCommunicationFrequency_${i}_remove`}
                                >
                                  -
                                </Button>
                              </HStack>
                            )
                          )}
                        <Box>
                          <Button onClick={() => arrayHelpers.push(100.0)}>
                            Add Frequency
                          </Button>
                        </Box>
                      </Grid>
                    )}
                  />
                </GroupWithHeader>
                <GroupWithHeader title="Approach Traffic Radio Communication">
                  <FieldArray
                    name="approachTrafficCommunicationFrequency"
                    render={(arrayHelpers) => (
                      <Grid templateRows="auto" gap={6}>
                        {!!values.approachTrafficCommunicationFrequency &&
                          !!values.approachTrafficCommunicationFrequency
                            .length &&
                          values.approachTrafficCommunicationFrequency.map(
                            (approachTrafficCommunicationFrequency, i) => (
                              <HStack
                                key={`approachTrafficCommunicationFrequency_${i}`}
                              >
                                <FormikField
                                  name={`approachTrafficCommunicationFrequency[${i}]`}
                                  label="Frequency"
                                  helperText="Radio Frequency"
                                  errorNameArr={[
                                    `approachTrafficCommunicationFrequency[${i}]`,
                                  ]}
                                  touched={touched}
                                  errors={errors}
                                  isRequired
                                  render={(props: FieldInputProps<any>) => (
                                    <InputGroup size="sm">
                                      <NumberInput
                                        {...props}
                                        onChange={(val) =>
                                          setFieldValue(props.name, Number(val))
                                        }
                                        step={0.5}
                                        id={`approachTrafficCommunicationFrequency_${i}`}
                                      >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                          <NumberIncrementStepper />
                                          <NumberDecrementStepper />
                                        </NumberInputStepper>
                                      </NumberInput>
                                      <InputRightAddon>FM</InputRightAddon>
                                    </InputGroup>
                                  )}
                                />
                                <Button
                                  onClick={() => arrayHelpers.remove(i)}
                                  key={`action_approachTrafficCommunicationFrequency_${i}_remove`}
                                >
                                  -
                                </Button>
                              </HStack>
                            )
                          )}
                        <Box>
                          <Button onClick={() => arrayHelpers.push(100.0)}>
                            Add Frequency
                          </Button>
                        </Box>
                      </Grid>
                    )}
                  />
                </GroupWithHeader>
                <GroupWithHeader title="Ground Traffic Radio Communication">
                  <FieldArray
                    name="groundTrafficCommunicationFrequency"
                    render={(arrayHelpers) => (
                      <Grid templateRows="auto" gap={6}>
                        {!!values.groundTrafficCommunicationFrequency &&
                          !!values.groundTrafficCommunicationFrequency.length &&
                          values.groundTrafficCommunicationFrequency.map(
                            (groundTrafficCommunicationFrequency, i) => (
                              <HStack
                                key={`groundTrafficCommunicationFrequency_${i}`}
                              >
                                <FormikField
                                  name={`groundTrafficCommunicationFrequency[${i}]`}
                                  label="Frequency"
                                  helperText="Radio Frequency"
                                  errorNameArr={[
                                    `groundTrafficCommunicationFrequency[${i}]`,
                                  ]}
                                  touched={touched}
                                  errors={errors}
                                  isRequired
                                  render={(props: FieldInputProps<any>) => (
                                    <Input
                                      {...props}
                                      placeholder="Eg. 27L"
                                      id={`groundTrafficCommunicationFrequency_${i}`}
                                    />
                                  )}
                                />
                                <Button
                                  onClick={() => arrayHelpers.remove(i)}
                                  key={`action_groundTrafficCommunicationFrequency_${i}_remove`}
                                >
                                  -
                                </Button>
                              </HStack>
                            )
                          )}
                        <Box>
                          <Button onClick={() => arrayHelpers.push(100.0)}>
                            Add Frequency
                          </Button>
                        </Box>
                      </Grid>
                    )}
                  />
                </GroupWithHeader>
                <GroupWithHeader title="Information Traffic Radio Communication">
                  <FieldArray
                    name="informationTrafficCommunicationFrequency"
                    render={(arrayHelpers) => (
                      <Grid templateRows="auto" gap={6}>
                        {!!values.informationTrafficCommunicationFrequency &&
                          !!values.informationTrafficCommunicationFrequency
                            .length &&
                          values.informationTrafficCommunicationFrequency.map(
                            (informationTrafficCommunicationFrequency, i) => (
                              <HStack
                                key={`informationTrafficCommunicationFrequency_${i}`}
                              >
                                <FormikField
                                  name={`informationTrafficCommunicationFrequency[${i}]`}
                                  label="Frequency"
                                  helperText="Radio Frequency"
                                  errorNameArr={[
                                    `informationTrafficCommunicationFrequency[${i}]`,
                                  ]}
                                  touched={touched}
                                  errors={errors}
                                  isRequired
                                  render={(props: FieldInputProps<any>) => (
                                    <Input
                                      {...props}
                                      placeholder="Eg. 27L"
                                      id={`informationTrafficCommunicationFrequency_${i}`}
                                    />
                                  )}
                                />
                                <Button
                                  onClick={() => arrayHelpers.remove(i)}
                                  key={`action_informationTrafficCommunicationFrequency_${i}_remove`}
                                >
                                  -
                                </Button>
                              </HStack>
                            )
                          )}
                        <Box>
                          <Button onClick={() => arrayHelpers.push(100.0)}>
                            Add Frequency
                          </Button>
                        </Box>
                      </Grid>
                    )}
                  />
                </GroupWithHeader>
              </GroupWithHeader>
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
    </>
  );
}
