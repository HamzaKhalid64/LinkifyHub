const fs = require('fs');
let code = fs.readFileSync('src/components/AdminDashboard.tsx', 'utf8');

// replace first pill
code = code.replace(
  /order\.status === 'pending_payment' \? 'bg-amber-50 text-amber-700 border-amber-200' :\s*'bg-blue-50 text-blue-700 border-blue-200'/g,
  "order.status === 'pending_payment' ? 'bg-amber-50 text-amber-700 border-amber-200' :\\n                           order.status === 'completion_review' ? 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200' :\\n                           'bg-blue-50 text-blue-700 border-blue-200'"
);

// replace text in first pill
code = code.replace(
  /order\.status === 'processing' \? 'Processing' :\s*order\.status/g,
  "order.status === 'processing' ? 'Processing' :\\n                            order.status === 'completion_review' ? 'Pending Completion' :\\n                            order.status"
);

fs.writeFileSync('src/components/AdminDashboard.tsx', code);
