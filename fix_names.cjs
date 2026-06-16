const fs = require('fs');

// BuyerMarketplace
let buyerCode = fs.readFileSync('src/components/BuyerMarketplace.tsx', 'utf8');
buyerCode = buyerCode.replace(
  /Seller: \{users\?\.find\(u => u\.id === order\.sellerId\)\?\.name \|\| 'Unknown Seller'\}/g,
  "Buyer: {users?.find(u => u.id === order.buyerId)?.name || 'Unknown Buyer'} • Seller: {users?.find(u => u.id === order.sellerId)?.name || 'Unknown Seller'}"
);
fs.writeFileSync('src/components/BuyerMarketplace.tsx', buyerCode);

// SellerDashboard
let sellerCode = fs.readFileSync('src/components/SellerDashboard.tsx', 'utf8');
sellerCode = sellerCode.replace(
  /Buyer: \{users\?\.find\(u => u\.id === order\.buyerId\)\?\.name \|\| 'Unknown Buyer'\}/g,
  "Buyer: {users?.find(u => u.id === order.buyerId)?.name || 'Unknown Buyer'} • Seller: {users?.find(u => u.id === order.sellerId)?.name || 'Unknown Seller'}"
);
fs.writeFileSync('src/components/SellerDashboard.tsx', sellerCode);
