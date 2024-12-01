import { useState } from 'react';
import { LogOut, Settings, User, X, CreditCard } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: SupabaseUser;
}

function SettingsModal({ isOpen, onClose, user }: SettingsModalProps) {
  const [avatarUrl, setAvatarUrl] = useState(user.user_metadata?.avatar_url as string || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdatePassword = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    
    const { error } = await supabase.auth.resetPasswordForEmail(user.email!, {
      redirectTo: `${window.location.origin}/auth/confirm?type=recovery`
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Password reset email sent! Please check your inbox.');
    }
    setLoading(false);
  };

  const handleUpdateAvatar = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    
    const { error } = await supabase.auth.updateUser({
      data: { avatar_url: avatarUrl }
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Avatar updated successfully!');
      setTimeout(() => {
        onClose();
      }, 1500);
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99999]" 
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-xl p-6 w-[400px] relative shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm">
            {message}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reset Password
            </label>
            <p className="text-sm text-gray-500 mb-3">
              Click below to receive a password reset email.
            </p>
            <button
              onClick={handleUpdatePassword}
              disabled={loading}
              className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
            >
              {loading ? 'Sending...' : 'Send Reset Email'}
            </button>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Avatar URL
            </label>
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              placeholder="Enter avatar URL"
            />
            <button
              onClick={handleUpdateAvatar}
              disabled={loading || !avatarUrl}
              className="mt-3 w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
            >
              {loading ? 'Updating...' : 'Update Avatar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function UserProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  if (!user) return null;

  const avatarUrl = user.user_metadata?.avatar_url as string;

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors w-full"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="User avatar"
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-4 h-4 text-gray-500" />
          </div>
        )}
        <div className="flex-1 text-left">
          <div className="text-sm font-medium text-gray-900 truncate">
            {user.email}
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 w-full mb-2 bg-white rounded-lg shadow-lg border">
          <button
            onClick={() => navigate('/billing')}
            className="flex items-center gap-2 w-full p-2 hover:bg-gray-50 transition-colors"
          >
            <CreditCard className="w-4 h-4" />
            <span className="text-sm">Billing</span>
          </button>
          <button
            onClick={() => {
              setShowSettings(true);
              setIsOpen(false);
            }}
            className="flex items-center gap-2 w-full p-2 hover:bg-gray-50 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm">Settings</span>
          </button>
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 w-full p-2 hover:bg-gray-50 transition-colors text-red-600"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Log Out</span>
          </button>
        </div>
      )}

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        user={user}
      />
    </div>
  );
}
