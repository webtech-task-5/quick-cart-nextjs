import { useState } from 'react';
import { Stepper, Button, Group, Card, Center, Checkbox, TextInput, Radio, Text, Container } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function Demo() {
  const [active, setActive] = useState(1);
  const [submit, setSubmit] = useState(false);
  const nextStep = () => {
    if(active===2)setSubmit(true);
    else setSubmit(false)
    setActive((current) => (current < 4 ? current + 1 : current));
  }
  const prevStep = () => {
    setSubmit(false)
    setActive((current) => (current > 0 ? current - 1 : current));
  }

  const form = useForm({
    initialValues: {
      number: '',
      comname: "",
      bankacc: "",
      key: "",
      code: ""
    },

    validate: {
      number: (value) => (/[0-9]/.test(value) ? null : 'Invalid number'),
      code: (value) => (/[0-9]/.test(value) ? null : 'Invalid code'),
    },
  });
  const onSubmit = (values: { number: string; comname: string; bankacc: string; key: string; code: string; }) => {
    console.log(values);}
  return (
    <div style={{display:"flex", justifyContent: "center", alignContent: "center", height:"100vh", width:"100vw"}}>
      <Center>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <Card style={{width:"800px", height:"500px"}} withBorder>
          <Stepper active={active} onStepClick={setActive} breakpoint="sm" allowNextStepsSelect={false}>
            <Stepper.Step label="First step" description="Verify your email" >
              <Container style={{display:"flex", justifyContent: "center", alignContent: "center", flexDirection:"column", width:"700px", height:"300px"}}>
              <Text size={"xl"}>Please check your email to move forward</Text>
              <TextInput
              mt={"lg"}
                withAsterisk
                label="Verification Code"
                placeholder="123456"
                {...form.getInputProps('code')}
              />
              </Container>
            </Stepper.Step>
            <Stepper.Step label="Second step" description="Personal information">
            <Container style={{display:"flex", justifyContent: "center", alignContent: "center", flexDirection:"column", width:"700px", height:"300px"}}>
            <TextInput
                  withAsterisk
                  style={{width: "100%"}}
                  p={"sm"}
                  label="Phone Number"
                  placeholder="+880 11111111111"
                  {...form.getInputProps('number')}
                />
                <TextInput
                  withAsterisk
                  style={{width: "100%"}}
                  p={"sm"}
                  label="Your shop/company name"
                  placeholder="ABC store"
                  {...form.getInputProps('comname')}
                />
              </Container>
              </Stepper.Step>
              <Stepper.Step label="Third step" description="Bank account verification">
              <Container style={{display:"flex", justifyContent: "center", alignContent: "center", flexDirection:"column", width:"700px", height:"300px"}}>
                <TextInput
                  withAsterisk
                  style={{width: "100%"}}
                  p={"sm"}
                  label="Bank Account Number"
                  placeholder="0000 0000 0000 0000"
                  {...form.getInputProps('bankacc')}
                  />
                  <TextInput
                    withAsterisk
                    style={{width: "100%"}}
                    p={"sm"}
                    label="API key"
                    placeholder="0000 0000 0000 0000"
                    {...form.getInputProps('key')}
                  />
              </Container>
              </Stepper.Step>
              <Stepper.Completed>
              <Container style={{display:"flex", justifyContent: "center", alignContent: "center", flexDirection:"column", width:"700px", height:"300px"}}>
              Make sure to fillup all the necessary informations.
                </Container>

              </Stepper.Completed>
          </Stepper>
          <Group style={{ position: 'absolute', bottom: 0, right: 0, margin: '8px' }} >
            <Button variant="default" onClick={prevStep}>Back</Button>
            {submit && <Button variant="outline" type='submit'>Submit</Button>}
            {!submit &&<Button onClick={nextStep}>Next step</Button>}
          </Group>
        </Card>
      </form>
    </Center>
  </div>
  );
}
