const fs = require('fs');
let code = fs.readFileSync('src/supabaseService.ts', 'utf8');

code = code.replace(
  'transactionId: o.transaction_id,',
  'transactionId: o.transaction_id,\n    transactionDetails: o.transaction_details,'
);

code = code.replace(
  'transaction_id: o.transactionId,',
  'transaction_id: o.transactionId,\n    transaction_details: o.transactionDetails,'
);

fs.writeFileSync('src/supabaseService.ts', code);
