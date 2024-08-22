import * as React from 'react';
import {
  Box,
  Button,
  FormControl,
  Input,
  FormHelperText,
  Typography,
  FormLabel,
  Stack
} from '@mui/joy';
import {Link} from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useGlobalStore } from '../store/useGlobalStore';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

function Login() {

    const navigate = useNavigate();
	const onLogin = useAuthStore((state) => state.onLogin);
	const openSnackbar = useGlobalStore((state) => state.openSnackbar);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const { register, control, handleSubmit } = useForm();

	const submitHandler = async (data) => {
		try {
            console.log("data",data)
			setLoading(true);
			await onLogin(data);
			navigate('/main', { replace: true });
		} catch (error) {
			console.error(error.message);
			
		} finally {
			setLoading(false);
		}
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        minHeight: '100vh',
        mt:'10%'
      }}
    >
        <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>

       
        
      <Typography component="h1" variant="h4" level='h1'>
        Iniciar Sesión
      </Typography>
      <Box sx={{ width: 300, alignItems: 'center', }}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <FormControl sx={{mt:3}}>
          <FormLabel>Nombre de Usuario</FormLabel>
            <Input
             
              control={control}
              id="username"
              placeholder="Nombre de Usuario"
              className='form-control'
              {...register("username")}
              onChange={(e) => setUsername(e.target.value)}
              required
              fullWidth
            />
          </FormControl>
          <FormControl sx={{mt:3}}>
          <FormLabel>Contraseña</FormLabel>
            <Input
            control={control}
              id="password"
              type="password"
              placeholder="Contraseña"
              className='form-control'
              {...register("password")}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
            {/* <FormHelperText>
              ¿Olvidaste tu contraseña?
            </FormHelperText> */}

            <Stack sx={{ml:9, mt:2}}>
              
                        <Link to={"/register"} style={{color:'#222222', mt:3}}> 
                                <Typography sx={{fontSize:13, fontWeight:600}} >
                                ¿No esta Registrado?
                                </Typography>
                        </Link>
                        
            </Stack>

          </FormControl>
          <Button type="submit" variant="solid" disabled={loading} loading={loading} sx={{ml:10, mt:2}}>
            Iniciar Sesión
          </Button>
        </form>
      </Box>

      </Box>
    </Box>
  );
}

export default Login;