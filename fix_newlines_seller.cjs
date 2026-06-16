const fs = require('fs');
let code = fs.readFileSync('src/components/SellerDashboard.tsx', 'utf8');

// replace raw \n with actual newlines
code = code.replaceAll("\\n", "\n");

fs.writeFileSync('src/components/SellerDashboard.tsx', code);
