// src/hooks/useAuth.js
// src/hooks/useAuth.js
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
    // confirmPassword: '',
    displayName: '',
    phone: '',
    // acceptTerms: false,
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
    // if (values.password !== values.confirmPassword) {
    //   errors.confirmPassword = 'Passwords do not match';
    // }
    return errors;
  };

  const handleSubmit = async (e) => {
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
      return user;
    } catch (error) {
      console.error('Error registering:', error.message);
      setError({ general: error.message });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    const user = await handleSubmit(null); // Simulate form submission
    if (user) {
      const isRegistered = await checkUserExistence(user.id);
      if (!isRegistered) {
        alert('User not registered. Please register first.');
      } else {
        try {
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
        } catch (insertError) {
          console.error('Error inserting user data:', insertError.message);
          setError({ general: insertError.message });
        }
      }
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

const checkUserExistence = async (userId) => {
  try {
    const { data: existingUser, error: selectError } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single();

    if (selectError) throw new Error(selectError.message);
    return existingUser !== null;
  } catch (error) {
    console.error('Error checking user existence:', error.message);
    alert('Error checking user existence.');
    return false;
  }
};

export { useForm, useAuth };