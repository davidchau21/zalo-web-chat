import React, { useCallback, useEffect } from "react";
import { Button, Stack, Alert } from "@mui/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import FormProvider from "../../components/hook-form/FormProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFTextField from "../../components/hook-form/RHFTextField";
import axios from "../../utils/axios";

const ProfileForm1 = ({ profile }) => {
  //   console.log("profile", profile);
  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    gender: Yup.string().required("Gender is required"),
    dateOfBirth: Yup.string().required("Date of Birth is required"),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string().required("Email is required"),
    creaateAt: Yup.string().required("Created At is required"),
  });

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues: profile,
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      //submit data backend
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
        <RHFTextField
          name="firstName"
          label="First Name"
          placeholder="Vui lòng nhập chính xác"
        />
        <RHFTextField
          name="lastName"
          label="Last Name"
          placeholder="Vui lòng nhập chính xác"
        />
        <RHFTextField
          name="gender"
          label="Gender"
          placeholder="Vui lòng nhập chính xác"
        />
        <RHFTextField
          name="dateOfBirth"
          label="Date of Birth"
          placeholder="Vui lòng nhập chính xác"
        />
        <RHFTextField
          name="phone"
          label="Phone"
          placeholder="Vui lòng nhập chính xác"
        />
        <RHFTextField
          name="email"
          label="Email"
          placeholder="Vui lòng nhập chính xác"
        />
        <RHFTextField
          name="creaateAt"
          label="Created At"
          placeholder="Vui lòng nhập chính xác"
        />
        <Stack direction={"row"} justifyContent={"end"}>
          <Button color="primary" size="large" type="submit" variant="outlined">
            Save
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default ProfileForm1;
