import { X, Package, Check } from 'lucide-react';

export default function ConfirmationModal({
  showConfirmation,
  scannedItem,
  setScannedItem,
  handleCancelAdd,
  handleConfirmAdd
}) {
  if (!showConfirmation || !scannedItem) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-lg w-full max-w-md p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-slate-100">Confirm Item</h3>
          <button onClick={handleCancelAdd} className="text-slate-400 hover:text-slate-200">
          <X className="w-6 h-6" />
      </button>
    </div>
    
    <div className="bg-slate-700 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-center mb-4">
        <Package className="w-16 h-16 text-indigo-400" />
      </div>
      <div className="space-y-3">
        <div>
          <label className="text-sm text-slate-400">Product Name</label>
          <input
            type="text"
            value={scannedItem.name}
            onChange={(e) => setScannedItem({...scannedItem, name: e.target.value})}
            className="w-full mt-1 px-3 py-2 bg-slate-600 border border-slate-500 text-slate-100 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="text-sm text-slate-400">Category</label>
          <select
            value={scannedItem.category}
            onChange={(e) => setScannedItem({...scannedItem, category: e.target.value})}
            className="w-full mt-1 px-3 py-2 bg-slate-600 border border-slate-500 text-slate-100 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="fruits">Fruits</option>
            <option value="packets">Packets</option>
            <option value="staple">Staple</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-slate-400">Quantity</label>
          <input
            type="number"
            value={scannedItem.quantity}
            onChange={(e) => setScannedItem({...scannedItem, quantity: parseInt(e.target.value)})}
            className="w-full mt-1 px-3 py-2 bg-slate-600 border border-slate-500 text-slate-100 rounded-lg focus:ring-2 focus:ring-indigo-500"
            min="1"
          />
        </div>
        <div>
          <label className="text-sm text-slate-400">Expiry Date</label>
          <input
            type="date"
            value={scannedItem.expiryDate}
            onChange={(e) => setScannedItem({...scannedItem, expiryDate: e.target.value})}
            className="w-full mt-1 px-3 py-2 bg-slate-600 border border-slate-500 text-slate-100 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>

    <div className="flex gap-3">
      <button
        onClick={handleCancelAdd}
        className="flex-1 px-4 py-3 bg-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-600"
      >
        Cancel
      </button>
      <button
        onClick={handleConfirmAdd}
        className="flex-1 px-4 py-3 bg-indigo-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-indigo-600"
      >
        <Check className="w-5 h-5" />
        Add Item
      </button>
    </div>
  </div>
</div>  );
}