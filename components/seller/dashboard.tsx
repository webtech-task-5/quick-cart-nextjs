import {
  createStyles,
  Group,
  Paper,
  Text,
  ThemeIcon,
  SimpleGrid,
  useMantineTheme,
  Stack,
  Container,
  px,
  Center,
  Card,
  Progress,
  Divider,
} from "@mantine/core";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react";
import React from "react";
import UserCard from "../user-card";
const useStyles = createStyles((theme) => ({
  root: {
    padding: `calc(${theme.spacing.xl} * 0.5)`,
    backgroundColor: theme.colors.gray[1],
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export default function Dashboard({
  data,
}: {
  data: { data: any; seller: any };
}) {
  console.log({ data });
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const BASE_HEIGHT = 360;
  const getSubHeight = (children: number, spacing: number) =>
    BASE_HEIGHT / children - spacing * ((children - 1) / children);
  console.log({data})

  return (
    <div
      className={classes.root}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "100px",
        paddingLeft: "50px",
      }}
    >
      <UserCard data={data.seller} />
      <Container style={{ width: "100vw" }}>
        <Center>
          <SimpleGrid
            cols={2}
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
            style={{ width: "100vw" }}
          >
            <Stack>
              {data.data.map(
                (stat: { title: string; value: string; diff: number }) => {
                  
                  if (stat.title !== "REVENUE")
                    return (
                      <GetChild
                        height={getSubHeight(3, px(theme.spacing.md))}
                        stat={stat}
                        key={stat.title}
                      />
                    );
                }
              )}
            </Stack>
            <Stack>
              {data.seller.type!=="customer" && <GetChild height={BASE_HEIGHT} stat={data.data[0]} />}
              {data.seller.type!=="customer" && <Card
                withBorder
                radius="md"
                // paddingx="lg"
                sx={(theme) => ({
                  backgroundColor: theme.white,
                })}
              >
                <Text fz="xs" tt="uppercase" fw={800} c="dimmed">
                  Monthly goal
                </Text>
                <Text fz="lg" fw={500}>
                ৳{data.data[0].value}  /  ৳100,000,00
                </Text>
                <Progress value={54.31} mt="md" size="lg" radius="xl" />
              </Card>}
            </Stack>
          </SimpleGrid>
        </Center>
      </Container>
    </div>
  );
}

const GetChild = ({
  height,
  stat,
}: {
  height: number;
  stat: { title: string; value: string; diff: number };
}) => {
  const { classes } = useStyles();
  const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;
  return (
    <Paper
      withBorder
      p="sm"
      radius="md"
      key={stat.title}
      style={{ height: `${height}` }}
    >
      <Group position="apart">
        <div>
          <Text
            c="dimmed"
            tt="uppercase"
            fw={700}
            fz="xs"
            className={classes.label}
          >
            {stat.title}
          </Text>
          <Text fw={700} fz="xl">
            {stat.value}
          </Text>
        </div>
        <ThemeIcon
          color="gray"
          variant="light"
          sx={(theme) => ({
            color: stat.diff > 0 ? theme.colors.teal[6] : theme.colors.red[6],
          })}
          size={38}
          radius="md"
        >
          <DiffIcon size="1.8rem" stroke={1.5} />
        </ThemeIcon>
      </Group>
      {/* <Text c="dimmed" fz="sm" mt="md">
        <Text component="span" c={stat.diff > 0 ? "teal" : "red"} fw={700}>
          {stat.diff}%
        </Text>{" "}
        {stat.diff > 0 ? "increase" : "decrease"} compared to last month
      </Text> */}
    </Paper>
  );
};
