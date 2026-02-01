import InventoryView from './InventoryView';
import NotificationsView from './NotificationsView';
import RestockView from './RestockView';

export default function MainContent({
  activeView,
  groupedItems,
  filteredItems,
  handleDeleteItem,
  reminders,
  handleReminderAction,
  restockItems = [] // Add default value here too
}) {
  return (
    <main className="px-4 py-4 pb-6">
      {activeView === 'inventory' && (
        <InventoryView
          groupedItems={groupedItems}
          filteredItems={filteredItems}
          handleDeleteItem={handleDeleteItem}
        />
      )}

      {activeView === 'notifications' && (
        <NotificationsView
          reminders={reminders}
          handleReminderAction={handleReminderAction}
        />
      )}

      {activeView === 'restock' && (
        <RestockView restockItems={restockItems} />
      )}
    </main>
  );
}