import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.EXPO_PUBLIC_SUPABASE_URL ||
  'https://figxbuivkstmfgdzxwkz.supabase.co';

const supabaseAnonKey =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  'sb_publishable_mcecyIsAde5O5JfGqo3s-Q_wTbQ9-gE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);