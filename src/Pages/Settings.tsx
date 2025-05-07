import React, { useState } from 'react';

function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: 'ShopEasy',
    description: 'Your one-stop online shopping platform',
    logo: null,
    enableRegistration: true,
    passwordPolicy: 'strong',
    maintenanceMode: false,
    theme: 'light',
    language: 'en',
    notificationEmails: true,
    apiToken: '************',
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Admin settings updated successfully!');
    // Usually: fetch('/api/settings', { method: 'POST', body: settings });
  };

  return (
    <div className="p-6 md:p-10 w-full mx-auto">
      <h2 className="text-3xl font-bold text-[#634bc1] mb-8">Admin Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 shadow-xl rounded-2xl">

        {/* General */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">🌐 General Settings</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium">Site Name</label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Site Description</label>
              <input
                type="text"
                name="description"
                value={settings.description}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Upload Logo</label>
              <input
                type="file"
                name="logo"
                accept="image/*"
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
              {settings.logo && (
                <img
                  src={URL.createObjectURL(settings.logo)}
                  alt="Logo Preview"
                  className="mt-2 h-16"
                />
              )}
            </div>
          </div>
        </div>

        {/* User Management */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">👤 User Management</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="enableRegistration"
                checked={settings.enableRegistration}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <span>Enable User Registration</span>
            </label>

            <div>
              <label className="block mb-1 font-medium">Password Policy</label>
              <select
                name="passwordPolicy"
                value={settings.passwordPolicy}
                onChange={handleChange}
                className="w-full border rounded p-2"
              >
                <option value="any">Any</option>
                <option value="medium">Medium</option>
                <option value="strong">Strong</option>
              </select>
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">🛠️ System Settings</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <span>Maintenance Mode</span>
            </label>

            <div>
              <label className="block mb-1 font-medium">Theme</label>
              <select
                name="theme"
                value={settings.theme}
                onChange={handleChange}
                className="w-full border rounded p-2"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Language</label>
              <select
                name="language"
                value={settings.language}
                onChange={handleChange}
                className="w-full border rounded p-2"
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="rw">Kinyarwanda</option>
                <option value="es">Spanish</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">🔔 Notification Settings</h3>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="notificationEmails"
              checked={settings.notificationEmails}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <span>Send system notifications to admin email</span>
          </label>
        </div>

        {/* Security */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">🔑 Security</h3>
          <label className="block mb-1 font-medium">API Token</label>
          <input
            type="password"
            name="apiToken"
            value={settings.apiToken}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-[#634bc1] text-white px-6 py-3 rounded-xl hover:bg-[#4e37a7] transition"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminSettings;
