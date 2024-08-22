import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginThunk } from "../(redux)/authSlice";
import { useDispatch } from "react-redux";
import { SUCCESS } from "../(constant)/constants";
import { useRouter } from "expo-router/build/exports";

const login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const schema = yup
    .object({
      email: yup
        .string()
        .required("Email is required")
        .email("Email must be a valid email address"),
      password: yup
        .string()
        .required("Password is required")
        .min(3, "Password must be at least 6 characters"),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = ({ email, password }) => {
    const detail = {
      email: email,
      password: password,
    };
    dispatch(loginThunk(detail)).then((data) => {
      if (data?.payload?.type === SUCCESS) {
        Alert.alert(
          "Registration Success",
          `Welcome, ${data?.payload?.data[0]?.username}!`
        );
        router.push("(tabs)");
      } else {
        setError("password", {
          type: "manual",
          message: data?.payload?.message,
        });
      }
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
          </View>
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("auth/login")}>
        <Text style={styles.loginText}>forgot password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 20,
    height: "100%",
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    fontWeight: "bold",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: "90%",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
    alignSelf: "flex-start",
    marginLeft: 18,
  },
  button: {
    width: "90%",
    padding: 15,
    backgroundColor: "#000000",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 10,
    color: "#007BFF",
    fontSize: 16,
    alignSelf: "flex-end",
  },
});
