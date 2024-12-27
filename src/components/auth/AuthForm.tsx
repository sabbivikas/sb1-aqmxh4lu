import React, { useState } from 'react';
import { LogIn, UserPlus, Loader2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { supabase } from '../../lib/supabase';

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="snow-bg">
        <div className="glass-morphism p-6 rounded-lg">
          <div className="text-center mb-6">
            <h2 className="font-serif text-3xl text-red-600 mb-2">
              {isLogin ? 'Welcome Back!' : 'Join Santa\'s List'}
            </h2>
            <p className="text-gray-600 italic">
              {isLogin ? 'Sign in to your journal' : 'Create your good deeds journal'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-red-100 rounded-lg bg-white/50 focus:outline-none focus:border-red-500 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-red-100 rounded-lg bg-white/50 focus:outline-none focus:border-red-500 transition-colors"
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm bg-red-50 p-2 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg
                font-serif hover:from-red-600 hover:to-red-700 transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50
                flex items-center justify-center space-x-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isLogin ? (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>Sign Up</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="w-full text-gray-600 text-sm hover:text-red-600 transition-colors"
            >
              {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
}