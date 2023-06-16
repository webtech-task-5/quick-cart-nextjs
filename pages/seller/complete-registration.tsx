import { useState } from 'react';
import { Stepper, Button, Group, Card, Center, Text, Container } from '@mantine/core';
import DefaultButton from '../../components/button';
import { useForm } from '@mantine/form';
import DefaultTextInput from '../../components/input';
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
        <Card style={{width:"850px", height:"550px"}} withBorder>
          <Stepper active={active} onStepClick={setActive} breakpoint="sm" allowNextStepsSelect={false} mt="lg" mx="lg">
            <Stepper.Step label="First step" description="Verify your email" >
              <Container style={{display:"flex", justifyContent: "center", alignContent: "center", flexDirection:"column", width:"700px", height:"300px"}}>
              <Text size={"xl"}>Please check your email to move forward</Text>
              <DefaultTextInput label="Verification Code" placeholder="123456"  props={{mt:"lg", ...form.getInputProps('code')}}/>
              </Container>
            </Stepper.Step>
            <Stepper.Step label="Second step" description="Personal information">
            <Container style={{display:"flex", justifyContent: "center", alignContent: "center", flexDirection:"column", width:"700px", height:"300px"}}>
            <DefaultTextInput label="Phone Number" placeholder="+880 11111111111"  props={{...form.getInputProps('number')}}/>
            <DefaultTextInput label="Your shop/company name" placeholder="ABC store"  props={{...form.getInputProps('comname')}}/>
              </Container>
              </Stepper.Step>
              <Stepper.Step label="Third step" description="Bank account verification">
              <Container style={{display:"flex", justifyContent: "center", alignContent: "center", flexDirection:"column", width:"700px", height:"300px"}}>
              <DefaultTextInput label="Bank Account Number" placeholder="0000 0000 0000 0000"  props={{...form.getInputProps('bankacc')}}/>
              <DefaultTextInput label="API key" placeholder="0000 0000 0000 0000"  props={{...form.getInputProps('key')}}/>
              </Container>
              </Stepper.Step>
              <Stepper.Completed>
              <Container style={{display:"flex", justifyContent: "center", alignContent: "center", flexDirection:"column", width:"700px", height:"300px"}}>
              Make sure to fillup all the necessary informations.
                </Container>

              </Stepper.Completed>
          </Stepper>
          <Group style={{ position: 'absolute', bottom: 0, right: 0, margin: '8px' }} >
            <DefaultButton text="Back" onClick={prevStep} />
            {submit && <DefaultButton text="Submit" props={{type:"submit"}} />}
            {!submit && <DefaultButton text="Next Step" onClick={nextStep} />}
          </Group>
        </Card>
      </form>
    </Center>
  </div>
  );
}
