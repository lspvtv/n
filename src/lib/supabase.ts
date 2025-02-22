import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uxzjqctedogsueqptsxz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4empxY3RlZG9nc3VlcXB0c3h6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MDA1ODM2NCwiZXhwIjoyMDU1NjM0MzY0fQ.SE63VuMOQ6l7waR--jUKoKux2GWIAJ7ASBGaLZ7hyAs';

export const supabase = createClient(supabaseUrl, supabaseKey);