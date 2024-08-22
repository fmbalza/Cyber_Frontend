import * as React from 'react';
import {
  Box,
  Button,
  FormControl,
  Input,
  FormHelperText,
  Typography,
  FormLabel
} from '@mui/joy';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom"
import { useAuthStore } from '../store/useAuthStore';
import { useGlobalStore } from '../store/useGlobalStore';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

function Register() {
  const navigate = useNavigate();
	const onSignup = useAuthStore((state) => state.onSignup);
	const openSnackbar = useGlobalStore((state) => state.openSnackbar);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const { register, control, handleSubmit } = useForm();



	const submitHandler = async (data) => {
		try {
            console.log("data",data)
			setLoading(true);
			await onSignup(data);
			navigate('/', { replace: true });
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
      <Typography component="h1" variant="h4" level='h1'>
        Crear Cuenta
      </Typography>
      <Box sx={{ width: 300 }}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <FormControl sx={{mt:1}}>
          <FormLabel>Nombre de Usuario</FormLabel>
            <Input
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
              id="password"
              type="password"
              placeholder="Contraseña"
              className='form-control'
              {...register("password")}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
       
          </FormControl>


          <Button type="submit" variant="solid" disabled={loading} loading={loading} sx={{ml:10, mt:5}}>
            Crear Cuenta
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default Register;