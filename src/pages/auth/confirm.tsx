import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export function ConfirmPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handlePasswordRecovery = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error || !user) {
          throw error || new Error('No user found');
        }

        // If we get here, it means the recovery token was valid
        setStatus('success');
      } catch (error) {
        console.error('Error recovering password:', error);
        setStatus('error');
      }
    };

    handlePasswordRecovery();
  }, []);

  const handlePasswordReset = async () => {
    try {
      const { error } = await supabase.auth.updateUser({ 
        password: password 
      });

      if (error) throw error;

      // Password reset successful
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error('Error resetting password:', error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {status === 'loading' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Verifying your request...
            </h2>
            <p className="text-gray-600">
              Please wait while we verify your request.
            </p>
          </div>
        )}

        {status === 'success' && !password && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Set New Password
            </h2>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                placeholder="Enter new password"
                minLength={6}
              />
              <button
                onClick={handlePasswordReset}
                disabled={!password || password.length < 6}
                className="mt-4 w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
              >
                Reset Password
              </button>
            </div>
          </div>
        )}

        {status === 'success' && password && (
          <div>
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Password Reset Successfully!
            </h2>
            <p className="text-gray-600">
              Your password has been reset. You will be redirected to the login page shortly.
            </p>
          </div>
        )}

        {status === 'error' && (
          <div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Verification Failed
            </h2>
            <p className="text-gray-600">
              We couldn't verify your request. The link might be expired or invalid.
              Please try again or contact support if the problem persists.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Return to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
