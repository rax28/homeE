export const getExpiryStatus = (expiryDate) => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  
  if (daysUntilExpiry < 0) return { status: 'expired', color: 'bg-rose-100/80 text-rose-700', text: 'Expired' };
  if (daysUntilExpiry <= 2) return { status: 'critical', color: 'bg-amber-100/80 text-amber-700', text: `${daysUntilExpiry}d left` };
  if (daysUntilExpiry <= 7) return { status: 'warning', color: 'bg-yellow-100/80 text-yellow-700', text: `${daysUntilExpiry}d left` };
  return { status: 'good', color: 'bg-emerald-100/80 text-emerald-700', text: `${daysUntilExpiry}d left` };
};