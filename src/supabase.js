// src/supabase.js
import { createClient } from '@supabase/supabase-js';
import { auth } from './firebase'; // Importa el objeto de autenticación de Firebase

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

// Cliente de Supabase sin token de acceso
const supabaseClient = createClient(supabaseUrl, supabaseKey);

// Función para obtener el token de acceso de Firebase
const getAccessToken = async () => {
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken();
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
  return supabaseClient; // Retorna el cliente sin token si no hay usuario autenticado
};

export { createSupabaseClient, supabaseClient };