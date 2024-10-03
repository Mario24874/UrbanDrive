import { useState } from 'react';
import { supabase } from '../supabase';

const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setValues(initialState);
  };

  return { values, handleChange, resetForm };
};

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { values: authValues, handleChange: handleAuthChange, resetForm: resetAuthForm } = useForm({
    email: '',
    password: '',
    displayName: '',
    phone: '',
    userType: 'user',
  });

  const { email, password, displayName, phone, userType } = authValues;

  const validateForm = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    return errors;
  };

  const handleRegister = async (e) => {
    if (e) e.preventDefault();
    const errors = validateForm(authValues);
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { user, error } = await supabase.auth.signUp({ email, password });
      if (error) throw new Error(error.message);
      await supabase.from('users').insert([
        {
          id: user.id,
          email: user.email,
          display_name: displayName,
          phone: phone,
          user_type: userType,
          created: new Date().toISOString(),
          last_sign_in: new Date().toISOString(),
        },
      ]);
      alert('Registration successful! Please check your email for verification.');
      resetAuthForm();
    } catch (error) {
      console.error('Error registering:', error.message);
      setError({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  return {
    authValues,
    handleAuthChange,
    handleRegister,
    loading,
    error,
  };
};

export { useForm, useAuth };