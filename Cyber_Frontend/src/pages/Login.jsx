import {
  Box,
  Button,
  FormControl,
  Input,
  Typography,
  FormLabel,
  Stack,
} from "@mui/joy";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useGlobalToast } from "../store/useGlobalStore";

function Login() {
  // eslint-disable-next-line no-unused-vars
  const [username, setUsername] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const onLogin = useAuthStore((state) => state.onLogin);
  const { openSnackbar } = useGlobalToast();
  const { register, control, handleSubmit } = useForm();

  const submitHandler = async (data) => {
    try {
      console.log("data", data);
      setLoading(true);
      await onLogin(data);
      navigate("/main", { replace: true });
      openSnackbar(
        "Has iniciado sesión correctamente",
        "success",
        "bottom",
        "right"
      );
    } catch (error) {
      openSnackbar(`${error.message}`, "error", "top", "center");
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box    
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
      minHeight: "100vh",
      
    

    }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          minHeight: "60vh",
          width: 500,
          mt: "10%",
          
          borderRadius: 25
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4" level="h1">
            Iniciar Sesión
          </Typography>
          <Box sx={{ width: 300, alignItems: "center" }}>
            <form onSubmit={handleSubmit(submitHandler)}>
              <FormControl sx={{ mt: 3 }}>
                <FormLabel>Nombre de Usuario</FormLabel>
                <Input
                  control={control}
                  id="username"
                  placeholder="Nombre de Usuario"
                  className="form-control"
                  {...register("username")}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  fullWidth
                />
              </FormControl>
              <FormControl sx={{ mt: 3 }}>
                <FormLabel>Contraseña</FormLabel>
                <Input
                  control={control}
                  id="password"
                  type="password"
                  placeholder="Contraseña"
                  className="form-control"
                  {...register("password")}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                />
                {/* <FormHelperText>
                ¿Olvidaste tu contraseña?
              </FormHelperText> */}

                <Stack sx={{ ml: 9, mt: 2 }}>
                  <Link to={"/register"} style={{ color: "#222222", mt: 3 }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                      ¿No esta Registrado?
                    </Typography>
                  </Link>
                </Stack>
              </FormControl>
              <Button
                type="submit"
                variant="solid"
                disabled={loading}
                loading={loading}
                sx={{ ml: 10, mt: 2 }}
              >
                Iniciar Sesión
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
