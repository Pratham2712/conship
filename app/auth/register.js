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
import { useRouter } from "expo-router/build/hooks";
import { checkEmailThunk, checkUsernameThunk, registerThunk } from "../(redux)/authSlice";
import { useDispatch } from "react-redux";
import { SUCCESS } from "../(constant)/constants";

const reg = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const schema = yup
    .object({
      username: yup
        .string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters"),
      password: yup
        .string()
        .required("Password is required")
        .min(3, "Password must be at least 3 characters"),
      email: yup
        .string()
        .required("Email is required")
        .email("Email must be a valid email address"),
    })
    .required();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  const onSubmit = ({ username,email, password }) => {
    const detail = {
      username: username,
      password: password,
      email:email
    };

    dispatch(checkEmailThunk({data:email.trim()})).then((data) => {
      if(data?.payload?.data === false){
        dispatch(checkUsernameThunk({ data: username.trim() })).then((data) => {
          if (data?.payload?.data === false) {
            dispatch(registerThunk(detail)).then((data) => {
              if (data.payload.type === SUCCESS) {
                router.push("/auth/login");
              }
            });
          } else {
            setError("username", {
              type: "manual",
              message: "Username is already taken",
            });
          }      
        });

      } else {
        setError("email", {
          type: "manual",
          message: "Email is already registered",
        });
      }
      
    })

  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
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
        name="username"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            {errors.username && (
              <Text style={styles.errorText}>{errors.username.message}</Text>
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
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("auth/login")}>
        <Text style={styles.loginText}>Already registered? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default reg;

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
    marginBottom: 20,
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
    marginTop: 3,
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
