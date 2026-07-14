import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { user, logout } = useAuth();
  const [tfaEnabled, setTfaEnabled] = useState(true);
  const [emailSummaries, setEmailSummaries] = useState(false);
  const [largeAlerts, setLargeAlerts] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error('Logout error', e);
    }
  };

  const handleSimulateUpdate = () => {
    setIsUpdating(true);
    setMessage(null);
    setTimeout(() => {
      setIsUpdating(false);
      setMessage('Profile settings updated successfully (simulated).');
    }, 800);
  };

  const formatMemberSince = (dateStr?: string) => {
    if (!dateStr) return 'Jan 2023';
    try {
      return new Date(dateStr).toLocaleDateString([], { month: 'short', year: 'numeric' });
    } catch (e) {
      return 'Jan 2023';
    }
  };

  return (
    <main className="flex-grow p-margin-mobile md:p-xl w-full max-w-container-max mx-auto pb-3xl md:pb-xl">
      {/* Header */}
      <div className="mb-xl">
        <h2 className="font-sans text-headline-lg-mobile md:text-headline-lg font-bold text-on-background">Profile & Preferences</h2>
        <p className="font-sans text-body-sm text-on-surface-variant mt-xs">Manage your personal information and application preferences.</p>
      </div>

      {message && (
        <div className="mb-lg p-md bg-secondary-container/20 border border-secondary/20 text-secondary font-sans text-body-sm rounded-lg flex items-center gap-xs">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{message}</span>
        </div>
      )}

      {/* Bento Layout Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
        {/* Left Column (User Info) */}
        <div className="lg:col-span-4 flex flex-col gap-lg">
          {/* Profile Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-xl flex flex-col items-center text-center shadow-sm">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface shadow-sm mb-lg relative group cursor-pointer">
              <img
                alt="Large User Avatar"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqOcEg2_coVmFAjdu0dX-qx1lVIFEatMxk7nuy2Yceb3IvD_iaeMKGmMqje145wELIpfdEnrQIzGmUca8lklf37VsWLyoXbyrXyWwCcs-xnwfiCk7VvldFjmKZmlWheiPoqmqXYQeOU8yqTHDeBlEhSjt68gOY33DaABN0n7ELKc82GE9w_RPoyksNVJ1BvAYnSIITHtyEMluZ0bGtEzpUfx6G2itdB9wUQ1touE-UjNOGEX5XrwbluicpwOrszLgEEehGL0OtsE4"
              />
              <div className="absolute inset-0 bg-on-surface/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                <span className="material-symbols-outlined text-on-primary font-bold">photo_camera</span>
              </div>
            </div>
            <h3 className="font-sans text-headline-md font-bold text-on-surface mb-xs">{user?.fullName || 'Alex Reynolds'}</h3>
            <p className="font-sans text-body-md text-on-surface-variant mb-lg">{user?.email || 'alex.reynolds@example.com'}</p>
            <div className="flex gap-sm w-full">
              <button
                onClick={handleSimulateUpdate}
                disabled={isUpdating}
                className="flex-grow bg-primary text-on-primary font-sans text-label-md py-2 px-md rounded-lg hover:bg-on-primary-fixed-variant transition-colors shadow-sm flex items-center justify-center gap-sm font-bold"
              >
                <span className="material-symbols-outlined text-[18px]">edit</span>
                {isUpdating ? 'Saving...' : 'Edit Profile'}
              </button>
            </div>
            <div className="w-full mt-lg pt-lg border-t border-outline-variant text-left">
              <div className="flex justify-between items-center mb-sm">
                <span className="font-sans text-label-sm text-outline font-semibold">MEMBER SINCE</span>
                <span className="font-sans text-body-sm text-on-surface font-semibold">{formatMemberSince(user?.createdAt)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-sans text-label-sm text-outline font-semibold">TIER</span>
                <span className="font-sans text-body-sm text-primary font-bold flex items-center gap-xs">
                  <span className="material-symbols-outlined text-[16px]">stars</span>
                  Premium
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Settings Stack) */}
        <div className="lg:col-span-8 flex flex-col gap-md">
          {/* Security Section */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.05)] transition-shadow duration-300">
            <div className="p-lg border-b border-outline-variant bg-surface-bright/50 flex items-center gap-md">
              <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">security</span>
              </div>
              <div>
                <h4 className="font-sans text-headline-sm font-bold text-on-surface">Security</h4>
                <p className="font-sans text-body-sm text-on-surface-variant">Manage passwords and authentication</p>
              </div>
            </div>
            <div>
              <div
                onClick={handleSimulateUpdate}
                className="flex items-center justify-between p-lg border-b border-outline-variant/50 hover:bg-surface-container-low/50 transition-colors cursor-pointer"
              >
                <div>
                  <p className="font-sans text-body-md text-on-surface font-bold">Change Password</p>
                  <p className="font-sans text-body-sm text-on-surface-variant mt-xs">Last changed 3 months ago</p>
                </div>
                <span className="material-symbols-outlined text-outline">chevron_right</span>
              </div>
              <div className="flex items-center justify-between p-lg hover:bg-surface-container-low/50 transition-colors">
                <div>
                  <p className="font-sans text-body-md text-on-surface font-bold">Two-Factor Authentication</p>
                  <p className="font-sans text-body-sm text-on-surface-variant mt-xs">Currently enabled via SMS</p>
                </div>
                <button
                  onClick={() => setTfaEnabled(!tfaEnabled)}
                  className={`w-11 h-6 rounded-full relative shadow-inner transition-colors duration-200 focus:outline-none ${
                    tfaEnabled ? 'bg-primary' : 'bg-surface-variant'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full shadow transition-all duration-200 ${
                      tfaEnabled ? 'right-1 bg-on-primary' : 'left-1 bg-surface-container-lowest'
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Notifications Section */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.05)] transition-shadow duration-300">
            <div className="p-lg border-b border-outline-variant bg-surface-bright/50 flex items-center gap-md">
              <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">notifications_active</span>
              </div>
              <div>
                <h4 className="font-sans text-headline-sm font-bold text-on-surface">Notifications</h4>
                <p className="font-sans text-body-sm text-on-surface-variant">Control alert preferences</p>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between p-lg border-b border-outline-variant/50 hover:bg-surface-container-low/50 transition-colors">
                <div>
                  <p className="font-sans text-body-md text-on-surface font-bold">Email Summaries</p>
                  <p className="font-sans text-body-sm text-on-surface-variant mt-xs">Weekly digest of your spending</p>
                </div>
                <button
                  onClick={() => setEmailSummaries(!emailSummaries)}
                  className={`w-11 h-6 rounded-full relative shadow-inner transition-colors duration-200 focus:outline-none ${
                    emailSummaries ? 'bg-primary' : 'bg-surface-variant'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full shadow transition-all duration-200 ${
                      emailSummaries ? 'right-1 bg-on-primary' : 'left-1 bg-surface-container-lowest'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between p-lg hover:bg-surface-container-low/50 transition-colors">
                <div>
                  <p className="font-sans text-body-md text-on-surface font-bold">Large Transaction Alerts</p>
                  <p className="font-sans text-body-sm text-on-surface-variant mt-xs">Notify when spend exceeds $500</p>
                </div>
                <button
                  onClick={() => setLargeAlerts(!largeAlerts)}
                  className={`w-11 h-6 rounded-full relative shadow-inner transition-colors duration-200 focus:outline-none ${
                    largeAlerts ? 'bg-primary' : 'bg-surface-variant'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full shadow transition-all duration-200 ${
                      largeAlerts ? 'right-1 bg-on-primary' : 'left-1 bg-surface-container-lowest'
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Linked Accounts Section */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.05)] transition-shadow duration-300">
            <div className="p-lg border-b border-outline-variant bg-surface-bright/50 flex items-center gap-md">
              <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">account_balance</span>
              </div>
              <div>
                <h4 className="font-sans text-headline-sm font-bold text-on-surface">Linked Accounts</h4>
                <p className="font-sans text-body-sm text-on-surface-variant">Manage connected financial institutions</p>
              </div>
            </div>
            <div className="p-lg flex flex-col gap-sm">
              <div className="flex items-center justify-between p-md border border-outline-variant rounded-lg bg-surface">
                <div className="flex items-center gap-md">
                  <div className="w-10 h-10 rounded bg-on-surface flex items-center justify-center text-on-primary font-bold font-sans">CH</div>
                  <div>
                    <p className="font-sans text-body-md text-on-surface font-bold">Chase Sapphire</p>
                    <p className="font-sans text-body-sm text-on-surface-variant">•••• 4589</p>
                  </div>
                </div>
                <button
                  onClick={handleSimulateUpdate}
                  className="text-error hover:bg-error-container/50 p-sm rounded transition-colors font-sans text-label-md font-bold"
                >
                  Unlink
                </button>
              </div>
              <div className="flex items-center justify-between p-md border border-outline-variant rounded-lg bg-surface">
                <div className="flex items-center gap-md">
                  <div className="w-10 h-10 rounded bg-on-surface flex items-center justify-center text-on-primary font-bold font-sans">WF</div>
                  <div>
                    <p className="font-sans text-body-md text-on-surface font-bold">Wells Fargo Checking</p>
                    <p className="font-sans text-body-sm text-on-surface-variant">•••• 1122</p>
                  </div>
                </div>
                <button
                  onClick={handleSimulateUpdate}
                  className="text-error hover:bg-error-container/50 p-sm rounded transition-colors font-sans text-label-md font-bold"
                >
                  Unlink
                </button>
              </div>
              <button
                onClick={handleSimulateUpdate}
                className="mt-sm w-full py-3 border-2 border-dashed border-outline-variant rounded-lg text-primary hover:bg-surface-container-low hover:border-primary transition-all flex items-center justify-center gap-sm font-sans text-label-md font-bold"
              >
                <span className="material-symbols-outlined">add</span>
                Add New Account
              </button>
            </div>
          </section>

          {/* Danger Zone / Logout */}
          <div className="mt-xl pt-lg border-t border-outline-variant flex justify-end">
            <button
              onClick={handleLogout}
              className="flex items-center gap-sm px-lg py-3 rounded-lg text-error border border-error hover:bg-error/5 transition-colors font-sans text-label-md font-bold shadow-sm active:scale-[0.99]"
            >
              <span className="material-symbols-outlined">logout</span>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
