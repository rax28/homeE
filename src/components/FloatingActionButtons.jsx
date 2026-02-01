import { Plus, Package, AlertCircle, Bell } from 'lucide-react';

export default function FloatingActionButtons({
  activeView,
  setActiveView,
  showQuickMenu,
  setShowQuickMenu,
  notificationCount
}) {
  return (
    <div className="fixed left-4 bottom-24 z-30 flex flex-col gap-3">
      <button
        onClick={() => setShowQuickMenu(!showQuickMenu)}
        className={`bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 active:scale-95 transition ${
          showQuickMenu ? 'rotate-45' : ''
        }`}
      >
        <Plus className="w-6 h-6" />
      </button>

      {showQuickMenu && (
        <div className="flex flex-col gap-3 animate-fadeIn">
          <button
            onClick={() => {
              setActiveView('inventory');
              setShowQuickMenu(false);
            }}
            className={`p-4 rounded-full shadow-lg transition flex items-center justify-center ${
              activeView === 'inventory'
                ? 'bg-indigo-600 text-white'
                : 'bg-white/80 backdrop-blur text-slate-700 hover:bg-white'
            }`}
          >
            <Package className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => {
              setActiveView('restock');
              setShowQuickMenu(false);
            }}
            className={`p-4 rounded-full shadow-lg transition flex items-center justify-center ${
              activeView === 'restock'
                ? 'bg-indigo-600 text-white'
                : 'bg-white/80 backdrop-blur text-slate-700 hover:bg-white'
            }`}
          >
            <AlertCircle className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => {
              setActiveView('notifications');
              setShowQuickMenu(false);
            }}
            className={`p-4 rounded-full shadow-lg transition flex items-center justify-center relative ${
              activeView === 'notifications'
                ? 'bg-indigo-600 text-white'
                : 'bg-white/80 backdrop-blur text-slate-700 hover:bg-white'
            }`}
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}