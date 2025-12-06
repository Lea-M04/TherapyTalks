import { useEffect, useState } from "react";
import {
  getNotificationSettings,
  createNotificationSettings,
  updateNotificationSettings
} from "@/lib/notificationSettings";

export default function NotificationSettings({ user , onSave}) {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const res = await getNotificationSettings(user.userID);
      setSettings(res.data);
    } catch (err) {
      setSettings({
        settingsID: null,
        emailNotifications: false,
        pushNotifications: false,
        userID: user.userID
      });
    }
  }

  async function save() {
    if (settings.settingsID) {
      await updateNotificationSettings(settings.settingsID, settings);
    } else {
      await createNotificationSettings(settings); 
    }
      if (onSave) onSave();
  }

  if (!settings) return <div>Loading...</div>;

  return (
    <div>
      <label className="text-primary-dark">
        <input 
          type="checkbox"
          checked={settings.emailNotifications}
          onChange={(e) =>
            setSettings({ ...settings, emailNotifications: e.target.checked })
          }
        />
        Email Notifications
      </label>
<br></br>
      <label className="text-primary-dark">
        <input
          type="checkbox"
          checked={settings.pushNotifications}
          onChange={(e) =>
            setSettings({ ...settings, pushNotifications: e.target.checked })
          }
        />
        Push Notifications
      </label>
      <br></br>
      <button 
        onClick={save} 
        className="mt-4 bg-primary-purple text-white px-4 py-2 rounded">
        Save
      </button>
    </div>
  );
}
