import {
  AlertCircle,
  Scale,
  Package,
  Clock,
  AlertTriangle,
} from "lucide-react";
export default function RestockView({
  restockItems = [],
  handleDeleteRestockItem,
}) {
  // Helper function to get reason label and icon
  const getReasonInfo = (reason) => {
    switch (reason) {
      case "low_weight":
        return {
          label: "Low weight detected",
          icon: <Scale className="w-4 h-4" />,
          color: "text-amber-600",
        };
      case "low_qty":
        return {
          label: "Low quantity",
          icon: <Package className="w-4 h-4" />,
          color: "text-orange-600",
        };
      case "near_expiry":
        return {
          label: "Expiring soon",
          icon: <Clock className="w-4 h-4" />,
          color: "text-yellow-600",
        };
      case "expired":
        return {
          label: "Expired",
          icon: <AlertTriangle className="w-4 h-4" />,
          color: "text-red-600",
        };
      default:
        return {
          label: "Needs restocking",
          icon: <AlertCircle className="w-4 h-4" />,
          color: "text-slate-600",
        };
    }
  };

  // Ensure restockItems is an array
  const items = Array.isArray(restockItems) ? restockItems : [];

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-slate-700 mb-4">
        Restock Needed
      </h2>
      {items.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-slate-700 font-medium">All items well stocked!</p>
          <p className="text-slate-500 text-sm mt-1">
            You'll be notified when items run low
          </p>
        </div>
      ) : (
        items.map((item) => {
          const reasonInfo = getReasonInfo(item.reason);

          return (
            <div
              key={item._id || item.id}
              className="bg-white/60 backdrop-blur rounded-lg p-4 shadow-sm border-l-4 border-rose-400"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800">{item.name}</h3>

                  {/* Reason Badge */}
                  <div
                    className={`flex items-center gap-1 mt-2 ${reasonInfo.color}`}
                  >
                    {reasonInfo.icon}
                    <span className="text-sm font-medium">
                      {reasonInfo.label}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-slate-500 capitalize">
                      Category: {item.category}
                    </p>

                    {item.currentQty !== undefined &&
                      item.currentQty !== null && (
                        <p className="text-xs text-slate-600">
                          Current Quantity:{" "}
                          <span className="font-semibold">
                            {item.currentQty}
                          </span>
                        </p>
                      )}

                    {item.currentWeight !== undefined &&
                      item.currentWeight !== null && (
                        <p className="text-xs text-slate-600">
                          Current Weight:{" "}
                          <span className="font-semibold">
                            {item.currentWeight}g
                          </span>
                        </p>
                      )}

                    {item.predictedExpiry && (
                      <p className="text-xs text-slate-600">
                        Expiry:{" "}
                        <span className="font-semibold">
                          {new Date(item.predictedExpiry).toLocaleDateString()}
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteRestockItem(item._id)}
                  className="px-4 py-2 cursor-pointer bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 whitespace-nowrap ml-4"
                >
                  Ignore
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
