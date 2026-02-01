import { Bell, AlertCircle, Plus, Package } from "lucide-react";

export default function NotificationsView({
  reminders,
  handleReminderAction,
}) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-slate-700 mb-4">
        Notifications
      </h2>

      {reminders.length === 0 ? (
        <div className="text-center py-12">
          <Bell className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-700 font-medium">No notifications</p>
          <p className="text-slate-500 text-sm mt-1">You're all caught up!</p>
        </div>
      ) : (
        reminders.map((reminder) => (
          <div
            key={reminder._id}
            className="bg-white/60 backdrop-blur rounded-lg p-4 shadow-sm border border-slate-200"
          >
            <div className="flex items-start gap-3">
              <div className="shrink-0">
                <Package className="w-6 h-6 text-rose-500" />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-slate-800">
                  {reminder.itemName}
                </h3>
                <p className="text-sm text-slate-600">{reminder.message}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleReminderAction(reminder._id, "dismiss")}
                className="flex-1 px-3 py-2 bg-slate-200/80 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-300"
              >
                Dismiss
              </button>

              <button
                onClick={() => handleReminderAction(reminder._id, "confirm")}
                className="flex-1 px-3 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600"
              >
                Confirm
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
