import { useState } from 'react';
import { Stepper, Button, Group, Card, Center, Checkbox, TextInput, Radio, Text } from '@mantine/core';
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
              <Center sx={{flexDirection:"column", gap: "12px"}}>
              <Text size={"xl"}>Please check your email to move forward</Text>
              <TextInput
                withAsterisk
                label="Verification Code"
                placeholder="123456"
                w={400}
                {...form.getInputProps('code')}
              />
              </Center>

            </Stepper.Step>
            <Stepper.Step label="Second step" description="Personal information">
            <Center sx={{flexDirection:"column"}}>
            <TextInput
            p="xl" m="xl"
                  withAsterisk
                  label="Phone Number"
                  placeholder="+880 11111111111"
                  {...form.getInputProps('number')}
                />
                <TextInput
                 p="xl" m="xl"
                  withAsterisk
                  label="Your shop/company name"
                  placeholder="ABC store"
                  {...form.getInputProps('comname')}
                />
              </Center>

              </Stepper.Step>
              <Stepper.Step label="Third step" description="Bank account verification">
                <TextInput
                withAsterisk
                label="Bank Account Number"
                placeholder="0000 0000 0000 0000"
                {...form.getInputProps('bankacc')}
                />
                <TextInput
                  withAsterisk
                  label="API key"
                  placeholder="0000 0000 0000 0000"
                  {...form.getInputProps('key')}
                />
              </Stepper.Step>
              <Stepper.Completed>
                Completed, click back button to get to previous step
              </Stepper.Completed>
          </Stepper>
          <Group position="center" mt="xl">
            <Button variant="default" onClick={prevStep}>Back</Button>
            {submit && <Button variant="outline" color="blue" type='submit'>Submit</Button>}
            {!submit &&<Button onClick={nextStep}>Next step</Button>}
          </Group>
        </Card>
      </form>
    </Center>
  </div>
  );
}
