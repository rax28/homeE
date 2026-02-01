import { X, Bell, AlertCircle, Plus, Package, Scale, Clock, AlertTriangle } from 'lucide-react';

export default function FloatingSideNav({
  showFloatingNav,
  setShowFloatingNav,
  reminders = [],
  reminderCount,
  restockItems = [],
  items = []
}) {
  if (!showFloatingNav) return null;

  // Helper function to get reason icon
  const getReasonIcon = (reason) => {
    switch (reason) {
      case "low_weight":
        return <Scale className="w-4 h-4 text-amber-400" />;
      case "low_qty":
        return <Package className="w-4 h-4 text-orange-400" />;
      case "near_expiry":
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case "expired":
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-rose-400" />;
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
        onClick={() => setShowFloatingNav(false)}
      />
      
      <div className="fixed top-0 left-0 bottom-0 w-80 bg-slate-800 shadow-2xl z-50 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-100">Quick View</h2>
            <button
              onClick={() => setShowFloatingNav(false)}
              className="text-slate-400 hover:text-slate-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Reminders Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Bell className="w-5 h-5 text-indigo-400" />
              <h3 className="text-lg font-semibold text-slate-200">Reminders</h3>
              {reminderCount > 0 && (
                <span className="bg-rose-500 text-white text-xs px-2 py-1 rounded-full">
                  {reminderCount}
                </span>
              )}
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {reminders.length === 0 ? (
                <p className="text-slate-400 text-sm">No reminders</p>
              ) : (
                reminders.slice(0, 3).map(reminder => (
                  <div key={reminder._id || reminder.id} className="bg-slate-700/50 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <Package className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-slate-200 text-sm truncate">
                          {reminder.itemName || reminder.name}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">
                          {reminder.message || 'Check packet status'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
              {reminders.length > 3 && (
                <button className="text-indigo-400 text-sm hover:text-indigo-300 w-full text-center py-2">
                  View all {reminders.length} reminders
                </button>
              )}
            </div>
          </div>

          {/* Restock Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-rose-400" />
              <h3 className="text-lg font-semibold text-slate-200">Restock Needed</h3>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {restockItems.length === 0 ? (
                <p className="text-slate-400 text-sm">All items in stock</p>
              ) : (
                restockItems.slice(0, 5).map(item => (
                  <div key={item._id || item.id} className="bg-slate-700/50 rounded-lg p-3 border-l-2 border-rose-400">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-1 mb-1">
                          {getReasonIcon(item.reason)}
                          <h4 className="font-medium text-slate-200 text-sm">{item.name}</h4>
                        </div>
                        <p className="text-xs text-rose-400">
                          {item.currentQty !== undefined && item.currentQty !== null
                            ? `Only ${item.currentQty} left`
                            : item.currentWeight !== undefined && item.currentWeight !== null
                            ? `${item.currentWeight}g remaining`
                            : 'Needs restocking'}
                        </p>
                      </div>
                      <button className="px-3 py-1 bg-indigo-500 text-white rounded text-xs font-medium hover:bg-indigo-600">
                        Order
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Inventory Summary */}
          <div className="mt-6 pt-6 border-t border-slate-700">
            <h3 className="text-lg font-semibold text-slate-200 mb-3">Summary</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-700/50 rounded-lg p-3">
                <p className="text-slate-400 text-xs">Total Items</p>
                <p className="text-slate-100 text-2xl font-bold">{items.length}</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3">
                <p className="text-slate-400 text-xs">Need Restock</p>
                <p className="text-rose-400 text-2xl font-bold">{restockItems.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}