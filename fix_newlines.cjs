const fs = require('fs');
let code = fs.readFileSync('src/components/AdminDashboard.tsx', 'utf8');

// replace raw \n with actual newlines
code = code.replaceAll("\\n", "\n");

fs.writeFileSync('src/components/AdminDashboard.tsx', code);
