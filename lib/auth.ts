import { 
  signInWithEmailAndPassword, 
  signOut, 
  User,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { auth } from './firebase';

// Admin email listesi - sadece bu emailler admin paneline erişebilir
const ADMIN_EMAILS = [
  'yyusufunal997@gmail.com',
  // Buraya yeni admin emailler eklenebilir
];

/**
 * Admin email kontrolü
 */
export const isAdminEmail = (email: string): boolean => {
  return ADMIN_EMAILS.includes(email.toLowerCase());
};

/**
 * Admin girişi - email ve şifre ile
 */
export const signInAdmin = async (email: string, password: string) => {
  try {
    // Persistence ayarla - kullanıcı tarayıcıyı kapatıp açsa bile giriş kalsın
    await setPersistence(auth, browserLocalPersistence);
    
    // Check if email is in admin list
    if (!isAdminEmail(email)) {
      throw new Error('This email address does not have admin panel access.');
    }

    // Sign in with Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error('Admin login error:', error);
    
    // Translate Firebase error codes to English
    switch (error.code) {
      case 'auth/user-not-found':
        throw new Error('No user found with this email address.');
      case 'auth/wrong-password':
        throw new Error('Incorrect password.');
      case 'auth/invalid-email':
        throw new Error('Invalid email format.');
      case 'auth/too-many-requests':
        throw new Error('Too many failed attempts. Please try again later.');
      default:
        throw new Error(error.message || 'An error occurred during login.');
    }
  }
};

/**
 * Admin çıkışı
 */
export const signOutAdmin = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Çıkış yaparken hata:', error);
    throw new Error('Çıkış yaparken bir hata oluştu.');
  }
};

/**
 * Mevcut kullanıcının admin olup olmadığını kontrol et
 */
export const isCurrentUserAdmin = (user: User | null): boolean => {
  if (!user || !user.email) return false;
  return isAdminEmail(user.email);
};

/**
 * Auth state listener - kullanıcı giriş durumunu dinle
 */
export const onAdminAuthStateChanged = (callback: (user: User | null, isAdmin: boolean) => void) => {
  return onAuthStateChanged(auth, (user) => {
    const isAdmin = isCurrentUserAdmin(user);
    callback(user, isAdmin);
  });
};

/**
 * Mevcut kullanıcıyı al
 */
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
}; 