// src/supabase.js
import { createClient } from '@supabase/supabase-js';
import { auth } from './firebase'; // Importa el objeto de autenticación de Firebase

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

// Función para obtener el token de acceso de Firebase
const getAccessToken = async () => {
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken(true); // Obtener un token actualizado
  }
  return null;
};

// Función para crear el cliente de Supabase con el token de acceso
const createSupabaseClient = async () => {
  const accessToken = await getAccessToken();
  if (accessToken) {
    return createClient(supabaseUrl, supabaseKey, {
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });
  }
  return createClient(supabaseUrl, supabaseKey);
};

export { createSupabaseClient };