import { useState, useEffect } from "react";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import FloatingActionButtons from "./components/FloatingActionButtons";
import FloatingSideNav from "./components/FloatingSideNav";
import BarcodeScannerModal from "./components/BarcodeScannerModal";
import ConfirmationModal from "./components/ConfirmationModal";
import { fetchItems, deleteItem } from "./lib/api/items";
import { fetchReminders, confirmPacketFinished } from "./lib/api/reminder";
import { addFromBarcode } from "./lib/api/barcode";
import { fetchRestock, deleteRestockItem } from "./lib/api/restock";
import CameraCaptureModal from "./components/CameraCaptureModule.jsx";
import { Toaster } from "sonner";
import { toast } from "sonner";

const styles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.2s ease-out;
  }
`;

export default function App() {
  const [activeView, setActiveView] = useState("inventory");
  const [items, setItems] = useState([]);
  const [restockItems, setRestockItems] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [imageBase64, setImageBase64] = useState(null);
  const [reminderCount, setReminderCount] = useState(0);
  const [scannedItem, setScannedItem] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showFloatingNav, setShowFloatingNav] = useState(false);
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ["all", "fruit", "packet", "staple", "others"];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await Promise.all([loadItems(), loadReminders(), loadRestockItems()]);
  };

  const loadItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchItems();
      const itemsData = Array.isArray(response.data) ? response.data : [];
      setItems(itemsData);
    } catch (err) {
      console.error("Error fetching items:", err);
      if (err.code === "ERR_NETWORK") {
        setError("Cannot connect to backend. Is it running 🏃 👀 ?");
      } else {
        setError("Failed to load items. Please try again.");
      }
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const loadReminders = async () => {
    try {
      const response = await fetchReminders();
      const reminderData = Array.isArray(response.data) ? response.data : [];
      setReminders(reminderData);
      setReminderCount(reminderData.length);
    } catch (err) {
      console.error("Error fetching reminders:", err);
      setReminders([]);
      setReminderCount(0);
    }
  };

  const loadRestockItems = async () => {
    try {
      const response = await fetchRestock();
      const restockData = Array.isArray(response.data) ? response.data : [];
      setRestockItems(restockData);
    } catch (err) {
      console.error("Error fetching restock items:", err);
      setRestockItems([]);
    }
  };

  const handleDeleteRestockItem = (restockItemId) => {
    toast.warning("Delete this restock item?", {
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await deleteRestockItem(restockItemId);
            toast.success("Restock item deleted");
            loadRestockItems();
          } catch (err) {
            toast.error("Failed to delete restock item");
          }
        },
      },
      cancel: {
        label: "Cancel",
      },
    });
  };

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const groupedItems = filteredItems.reduce((acc, item) => {
    const cat = item.category || "others";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  const handleReminderAction = async (reminderId, action) => {
    try {
      if (action === "confirm") {
        await confirmPacketFinished(reminderId);
      }

      setReminders((prev) => prev.filter((r) => r._id !== reminderId));
      setReminderCount((prev) => prev - 1);

      loadItems();
      loadRestockItems();
    } catch (err) {
      console.error("Error handling reminder:", err);
      alert("Failed to update reminder. Please try again.");
    }
  };

  const handleDeleteItem = (itemId) => {
    toast.warning("Delete this item?", {
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await deleteItem(itemId);

            setItems((prev) => prev.filter((item) => item._id !== itemId));

            toast.success("Item deleted");
          } catch (err) {
            console.error("Error deleting item:", err);
            toast.error("Failed to delete item");
          }
        },
      },
      cancel: {
        label: "Cancel",
      },
    });
  };

  // ✅ THIS is handleImageCapture
  const handleImageCapture = async (base64) => {
    console.log("Captured image:", base64);
      setImageBase64(base64);

      // Optional: send to AI immediately
      const res = await fetch("https://backendhi.onrender.com/api/ai/detectFruits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });
      
      const data = await res.json();
      if (data.category == "fruit")
      {        toast.success(`Detected fruit: ${data.name}. Weight added: ${data.weight}g`);
      }
      else {
        toast.error(`Detected item: ${data.name} (${data.category})`);
      }
    
  };

  const handleBarcodeScan = async (barcode) => {
    try {
      setLoading(true);
      const response = await addFromBarcode(barcode);

      const item = response.data.item;

      setScannedItem({
        _id: item._id,
        name: item.name,
        category: item.category,
        qty: item.qty,
      });

      toast.success(`Found item: ${item.name}`);

      setShowScanner(false);
      setShowConfirmation(true);

      loadData();
    } catch (err) {
     toast.error("Failed to add item from barcode");
      setShowScanner(false);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmAdd = () => {
    setShowConfirmation(false);
    setScannedItem(null);
    loadData();
  };

  const handleCancelAdd = () => {
    setShowConfirmation(false);
    setScannedItem(null);
  };

  if (loading && items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading inventory...</p>
        </div>
      </div>
    );
  }

  if (error && items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            Connection Error
          </h2>
          <p className="text-slate-600 mb-4">{error}</p>
          <button
            onClick={loadData}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Retry Connection
          </button>
          <p className="text-xs text-slate-500 mt-2">
            Oppssiess!! Retry for Inventory to Load !.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-6">
      <Toaster richColors position="bottom-right" />
      <style>{styles}</style>

      <Header
        activeView={activeView}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setShowScanner={setShowScanner}
        setShowCamera={setShowCamera}
        setShowFloatingNav={setShowFloatingNav}
        showFloatingNav={showFloatingNav}
        setActiveView={setActiveView}
      />

      <MainContent
        activeView={activeView}
        groupedItems={groupedItems}
        filteredItems={filteredItems}
        handleDeleteItem={handleDeleteItem}
        reminders={reminders}
        handleReminderAction={handleReminderAction}
        restockItems={restockItems}
        handleDeleteRestockItem={handleDeleteRestockItem}
      />

      <FloatingActionButtons
        activeView={activeView}
        setActiveView={setActiveView}
        showQuickMenu={showQuickMenu}
        setShowQuickMenu={setShowQuickMenu}
        reminderCount={reminderCount}
      />

      <FloatingSideNav
        showFloatingNav={showFloatingNav}
        setShowFloatingNav={setShowFloatingNav}
        reminders={reminders}
        reminderCount={reminderCount}
        restockItems={restockItems}
        handleDeleteRestockItem={handleDeleteRestockItem}
        items={items}
      />

      <CameraCaptureModal
        showCamera={showCamera}
        setShowCamera={setShowCamera}
        handleImageCapture={handleImageCapture}
      />

      <BarcodeScannerModal
        showScanner={showScanner}
        setShowScanner={setShowScanner}
        handleBarcodeScan={handleBarcodeScan}
        loading={loading}
      />

      <ConfirmationModal
        showConfirmation={showConfirmation}
        scannedItem={scannedItem}
        setScannedItem={setScannedItem}
        handleCancelAdd={handleCancelAdd}
        handleConfirmAdd={handleConfirmAdd}
      />
    </div>
  );
}
