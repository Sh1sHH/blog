'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInAdmin } from '@/lib/auth';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();

  console.log('Admin Login Page Rendering'); // Debug

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted', { email, password }); // Debug
    setLoading(true);
    setError('');

    try {
      await signInAdmin(email, password);
      router.push('/admin');
    } catch (error: any) {
      console.error('Login error:', error); // Debug
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#f3f4f6',
      padding: '1rem' 
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '28rem', 
        backgroundColor: 'white', 
        borderRadius: '0.5rem', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', 
        padding: '1.5rem' 
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ 
            width: '3rem', 
            height: '3rem', 
            backgroundColor: '#111827', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 0.75rem' 
          }}>
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.125rem' }}>🔒</span>
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', margin: '0 0 0.25rem' }}>
            Admin Girişi
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: '0' }}>
            CleverSpaceSolutions admin paneline erişim için giriş yapın
          </p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Email Field */}
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '0.875rem', 
              fontWeight: '500', 
              color: '#374151', 
              marginBottom: '0.25rem' 
            }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.5rem 0.75rem', 
                border: '1px solid #d1d5db', 
                borderRadius: '0.375rem',
                fontSize: '1rem',
                outline: 'none'
              }}
              required
              disabled={loading}
            />
          </div>

          {/* Password Field */}
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '0.875rem', 
              fontWeight: '500', 
              color: '#374151', 
              marginBottom: '0.25rem' 
            }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.5rem 0.75rem', 
                border: '1px solid #d1d5db', 
                borderRadius: '0.375rem',
                fontSize: '1rem',
                outline: 'none'
              }}
              required
              disabled={loading}
            />
          </div>

          {/* Error Alert */}
          {error && (
            <div style={{ 
              backgroundColor: '#fef2f2', 
              border: '1px solid #fecaca', 
              color: '#dc2626', 
              padding: '0.75rem', 
              borderRadius: '0.375rem',
              fontSize: '0.875rem'
            }}>
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            style={{ 
              width: '100%', 
              backgroundColor: loading || !email || !password ? '#9ca3af' : '#2563eb', 
              color: 'white', 
              padding: '0.5rem 1rem', 
              borderRadius: '0.375rem',
              border: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: loading || !email || !password ? 'not-allowed' : 'pointer'
            }}
            disabled={loading || !email || !password}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Info */}
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0' }}>
            Only authorized admin accounts can sign in
          </p>
        </div>
      </div>
    </div>
  );
} 