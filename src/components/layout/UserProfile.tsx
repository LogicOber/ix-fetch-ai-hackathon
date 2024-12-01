import { useState } from "react";
import { Settings, LogOut, CreditCard } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from '@/lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { useSubscription } from "@/hooks/useSubscription";
import { isPro } from '@/types/subscription';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: SupabaseUser;
}

function SettingsModal({ isOpen, onClose, user }: SettingsModalProps) {
  const [avatarUrl, setAvatarUrl] = useState(user.user_metadata?.avatar_url as string || '');
  const [firstName, setFirstName] = useState(user.user_metadata?.first_name as string || user.email?.split('@')[0] || '');
  const [lastName, setLastName] = useState(user.user_metadata?.last_name as string || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdateProfile = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    
    const { error } = await supabase.auth.updateUser({
      data: { 
        avatar_url: avatarUrl,
        first_name: firstName,
        last_name: lastName
      }
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Profile updated successfully!');
      setTimeout(() => {
        onClose();
      }, 2000);
    }
    setLoading(false);
  };

  const handleUpdatePassword = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    
    const { error } = await supabase.auth.resetPasswordForEmail(user.email!, {
      redirectTo: `${window.location.origin}/auth/confirm`
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Password reset email sent! Please check your inbox.');
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999]" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <LogOut className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            {message}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your first name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your last name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Avatar URL
            </label>
            <input
              type="text"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter avatar URL"
            />
          </div>

          <button
            onClick={handleUpdateProfile}
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>

          <div className="border-t border-gray-200 my-4"></div>

          <button
            onClick={handleUpdatePassword}
            disabled={loading}
            className="w-full py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
          >
            Send Password Reset Email
          </button>
        </div>
      </div>
    </div>
  );
}

export function UserProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { user, signOut } = useAuth();
  const { subscription } = useSubscription();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
  };

  if (!user) return null;

  const firstName = user.user_metadata?.first_name || user.email?.split('@')[0] || 'User';
  const avatarUrl = user.user_metadata?.avatar_url as string;

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors w-full"
      >
        <div className="relative">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="User avatar"
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
              {firstName[0]?.toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex-1 text-left flex items-center gap-2">
          <div>
            <div className="text-sm font-medium text-gray-900 truncate flex items-center gap-2">
              {firstName}
              {isPro(subscription) && (
                <span className="bg-blue-600 text-white text-[10px] font-semibold px-1.5 rounded">
                  PRO
                </span>
              )}
            </div>
            <div className="text-xs text-gray-500">{user.email}</div>
          </div>
        </div>
        <Settings className="w-4 h-4 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 w-full p-1 mb-1 bg-white rounded-lg shadow-lg border">
          <button
            onClick={() => navigate('/billing')}
            className="w-full p-2 text-left text-sm hover:bg-gray-100 rounded flex items-center"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Billing
          </button>
          <button
            onClick={() => {
              setShowSettings(true);
              setIsOpen(false);
            }}
            className="w-full p-2 text-left text-sm hover:bg-gray-100 rounded flex items-center"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </button>
          <button
            onClick={handleSignOut}
            className="w-full p-2 text-left text-sm text-red-600 hover:bg-red-50 rounded flex items-center"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </button>
        </div>
      )}

      {showSettings && (
        <SettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          user={user}
        />
      )}
    </div>
  );
}
