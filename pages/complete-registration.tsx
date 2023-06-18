import React, { useState, useEffect } from "react";
import { Stepper, Group, Card, Center, Text, Container } from "@mantine/core";
import DefaultButton from "../components/button";
import { useForm } from "@mantine/form";
import DefaultTextInput from "../components/input";
import dynamic from "next/dynamic";

const DynamicStepper = dynamic(
  () => import("@mantine/core").then((module) => module.Stepper),
  {
    ssr: false, // Ensure the component is not rendered on the server
  }
);
import jwt from "jsonwebtoken";
import axios from "axios";
import { useRouter } from "next/router";

export default function Demo() {
  const [active, setActive] = useState(0);
  const [submit, setSubmit] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const nextStep = () => {
    if (active === 2) setSubmit(true);
    else setSubmit(false);
    setActive((current) => (current < 4 ? current + 1 : current));
  };
  const prevStep = () => {
    setSubmit(false);
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  const form = useForm({
    initialValues: {
      number: "",
      comname: "",
      bankacc: "",
      key: "",
      code: "",
    },

    validate: {
      number: (value) => (/[0-9]/.test(value) ? null : "Invalid number"),
      code: (value) => (/[0-9]/.test(value) ? null : "Invalid code"),
    },
  });
  const onSubmit = async (values: {
    number: string;
    comname: string;
    bankacc: string;
    key: string;
    code: string;
  }) => {
    const data = {
      phoneNo: values.number,
      companyName: values.comname,
      apiKey: values.key,
      verificationCode: values.code,
      bankAccount: values.bankacc,
      email,
    };
    try {
      const res = await axios.put("api/register", data);
      console.log(res);
      if (res.status == 200) {
        if (type == "seller") router.push("/seller");
        else router.push("/products");
      }
    } catch (err: any) {
      console.log(err);
      alert("Your information doesn't match");
    }
  };
  const [type, setType] = useState("seller");
  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      window.location.href = "/";
    }
    const token = localStorage.getItem("token") as string;
    const user = jwt.decode(token) as any;
    setType(user._doc.type);
    setEmail(user._doc.email);
  }, []);
  return (
    <DynamicStepper>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Center>
          <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <Card style={{ width: "850px", height: "550px" }} withBorder>
              <Stepper
                active={active}
                onStepClick={setActive}
                breakpoint="sm"
                allowNextStepsSelect={false}
                mt="lg"
                mx="lg"
              >
                <Stepper.Step
                  label="First step"
                  description="Verify your email"
                >
                  <Container
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                      flexDirection: "column",
                      width: "700px",
                      height: "300px",
                    }}
                  >
                    <Text size={"xl"}>
                      Please check your email to move forward
                    </Text>
                    <DefaultTextInput
                      label="Verification Code"
                      placeholder="123456"
                      props={{ mt: "lg", ...form.getInputProps("code") }}
                    />
                  </Container>
                </Stepper.Step>
                <Stepper.Step
                  label="Second step"
                  description="Personal information"
                >
                  <Container
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                      flexDirection: "column",
                      width: "700px",
                      height: "300px",
                    }}
                  >
                    <DefaultTextInput
                      label="Phone Number"
                      placeholder="+880 11111111111"
                      props={{ ...form.getInputProps("number") }}
                    />
                    {type === "seller" && (
                      <DefaultTextInput
                        label="Your shop/company name"
                        placeholder="ABC store"
                        props={{ ...form.getInputProps("comname") }}
                      />
                    )}
                  </Container>
                </Stepper.Step>
                <Stepper.Step
                  label="Third step"
                  description="Bank account verification"
                >
                  <Container
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                      flexDirection: "column",
                      width: "700px",
                      height: "300px",
                    }}
                  >
                    <DefaultTextInput
                      label="Bank Account Number"
                      placeholder="0000 0000 0000 0000"
                      props={{ ...form.getInputProps("bankacc") }}
                    />
                    <DefaultTextInput
                      label="API key"
                      placeholder="0000 0000 0000 0000"
                      props={{ ...form.getInputProps("key") }}
                    />
                  </Container>
                </Stepper.Step>
                <Stepper.Completed>
                  <Container
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                      flexDirection: "column",
                      width: "700px",
                      height: "300px",
                    }}
                  >
                    Make sure to fillup all the necessary informations.
                  </Container>
                </Stepper.Completed>
              </Stepper>
              <Group
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  margin: "8px",
                }}
              >
                <DefaultButton text="Back" onClick={prevStep} />
                {submit && (
                  <DefaultButton text="Submit" props={{ type: "submit" }} />
                )}
                {!submit && (
                  <DefaultButton text="Next Step" onClick={nextStep} />
                )}
              </Group>
            </Card>
          </form>
        </Center>
      </div>
    </DynamicStepper>
  );
}
