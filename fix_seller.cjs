const fs = require('fs');
let code = fs.readFileSync('src/components/SellerDashboard.tsx', 'utf8');

// replace pill colors
code = code.replace(
  /order\.status === 'cancelled' \? 'bg-red-50 text-red-700 border-red-200' :\s*'bg-blue-50 text-blue-700 border-blue-200'/g,
  "order.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' :\\n                             order.status === 'completion_review' ? 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200' :\\n                             'bg-blue-50 text-blue-700 border-blue-200'"
);

// replace pill labels
code = code.replace(
  /order\.status === 'processing' \? 'Processing' :/g,
  "order.status === 'processing' ? 'Processing' :\\n                              order.status === 'completion_review' ? 'In Review' :"
);

fs.writeFileSync('src/components/SellerDashboard.tsx', code);
