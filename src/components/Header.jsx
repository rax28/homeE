import { Menu, Scan, Search } from 'lucide-react';

export default function Header({
  activeView,
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  setShowScanner,
  setShowFloatingNav,
  showFloatingNav
}) {
  return (
    <header className="bg-slate-800 shadow-sm sticky top-0 z-10">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFloatingNav(!showFloatingNav)}
              className="text-slate-100 p-2 hover:bg-slate-700 rounded-lg transition"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-slate-100">Home Inventory</h1>
          </div>
          <button 
            onClick={() => setShowScanner(true)}
            className="bg-indigo-500 text-white p-3 rounded-full shadow-lg hover:bg-indigo-600 active:scale-95 transition"
          >
            <Scan className="w-6 h-6" />
          </button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 text-slate-100 placeholder-slate-400 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {activeView === 'inventory' && (
        <div className="px-4 pb-3 flex gap-2 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap capitalize transition ${
                selectedCategory === cat
                  ? 'bg-indigo-500 text-white'
                  : 'bg-slate-700 text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}