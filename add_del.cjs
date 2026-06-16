const fs = require('fs');
let code = fs.readFileSync('src/components/SellerDashboard.tsx', 'utf8');

const deliveryDetailsDiv = `                      {order.deliveryDetails && (
                        <div className="col-span-2 mt-2">
                          <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Delivery Details</p>
                          <p className="font-semibold text-slate-900 truncate max-w-[150px] md:max-w-xs cursor-pointer hover:text-blue-600 hover:underline" onClick={() => {
                            try { new URL(order.deliveryDetails || ''); window.open(order.deliveryDetails, '_blank'); } catch {} 
                          }}>{order.deliveryDetails}</p>
                        </div>
                      )}`;

code = code.replace(
  /order\.anchorText\}"<\/p>\n\s*<\/div>\n\s*<\/div>/g,
  "order.anchorText}\"</p>\n                      </div>\n" + deliveryDetailsDiv + "\n                    </div>"
);

fs.writeFileSync('src/components/SellerDashboard.tsx', code);
