import { Package, Trash2 } from "lucide-react";
import { getExpiryStatus } from "../utils/helpers";

export default function InventoryView({
  groupedItems = {},
  filteredItems = [],
  handleDeleteItem,
}) {
  if (filteredItems.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <p className="text-slate-500">No items found</p>
        <p className="text-slate-400 text-sm mt-2">
          Start by scanning a barcode to add items
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedItems).map(([category, categoryItems]) => (
        <div key={category}>
          <h2 className="text-lg font-semibold text-slate-700 mb-3 capitalize flex items-center">
            <Package className="w-5 h-5 mr-2 text-slate-500" />
            {category}
          </h2>
          <div className="space-y-3">
            {categoryItems.map((item) => {
              const expiryInfo = getExpiryStatus(item.predictedExpiry);
              return (
                <div
                  key={item._id || item.id}
                  className="bg-white/60 backdrop-blur rounded-lg p-4 shadow-sm border border-slate-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800">
                        {item.name}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {item.category === "fruit" || item.category === "staple"
                          ? `Weight: ${item.weight ?? 0}`
                          : `Qty: ${item.quantity ?? 0}`}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteItem(item._id || item.id)}
                      className="text-rose-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    {item.category === "fruit" ? (
                      <span
                        className={`px-2 py-1 rounded-full ${expiryInfo.color}`}
                      >
                        {expiryInfo.text}
                      </span>
                    ) : (
                      <span
                        className={`px-2 py-1 rounded-full bg-indigo-500 text-white`}
                      >
                        item finished?
                      </span>
                    )}

                    <span className="text-slate-500">
                      Added via {item.source || "unknown"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
