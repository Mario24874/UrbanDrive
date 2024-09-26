import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or Key is missing. Please check your environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Verificar la conexión
async function testConnection() {
  try {
    const { data, error } = await supabase.from('users').select('*').limit(1);
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