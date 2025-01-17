"use client";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { createUserFormAction } from "../../actions/users";

const CreateUserPage = () => {
  const [state, formAction] = useFormState(createUserFormAction, {
    status: "initial",
  });

  const router = useRouter();

  useEffect(() => {
    if (state.status === "success") {
      router.replace("/");
    }
  }, [state.status, router]);

  return (
    <Container
      borderColor={"gray.100"}
      borderWidth={"1px"}
      bgColor="gray.50"
      p={10}
      mt={10}
      borderRadius={"md"}
    >
      <VStack align="flex-start" spacing={4}>
        <Heading size={"lg"}>Novo Usuário</Heading>
        <VStack as="form" w={"100%"} action={formAction}>
          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input name="name" type="text" required placeholder="John Doe" />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              required
              placeholder="johndoe@mail.com"
            />
          </FormControl>
          <HStack w="100%" mt={4}>
            <SubmitButton />
            <Button
              onClick={() => router.push("/")}
              variant={"ghost"}
              colorScheme="red"
            >
              Cancelar
            </Button>
          </HStack>
          {state.status === "error" && (
            <Alert status="error">
              <AlertIcon />
              There was an error processing your request
              <AlertDescription maxWidth="sm">{state.message}</AlertDescription>
            </Alert>
          )}
        </VStack>
      </VStack>
    </Container>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button isLoading={pending} type="submit">
      Criar
    </Button>
  );
};

export default CreateUserPage;
