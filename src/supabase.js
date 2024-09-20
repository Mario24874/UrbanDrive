import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jdsojfcdcxumgwbgvsxt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impkc29qZmNkY3h1bWd3Ymd2c3h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5MjE1NDIsImV4cCI6MjA0MTQ5NzU0Mn0.1rI0OUsm4Xi4NqXdMHXF6dUyC4UA7XPyfOjMN7tJPvs';
const supabaseClient = createClient(supabaseUrl, supabaseKey);

export { supabaseClient };