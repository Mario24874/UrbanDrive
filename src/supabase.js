// src/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Verificar la conexión
async function testConnection() {
  try {
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
      console.error('Error connecting to Supabase:', error.message);
    } else {
      console.log('Connection to Supabase successful:', data);
    }
  } catch (error) {
    console.error('Error connecting to Supabase:', error.message);
  }
}

testConnection();

export { supabase };