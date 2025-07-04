import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export class FirebaseStorageService {
  
  // Görsel yükle
  async uploadImage(file: File, folder: string = 'blog'): Promise<UploadResult> {
    try {
      // Dosya validasyonu
      if (!file) {
        return { success: false, error: 'Dosya seçilmedi' };
      }

      // Dosya türü kontrolü
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        return { success: false, error: 'Desteklenmeyen dosya türü. JPG, PNG, WebP veya GIF kullanın.' };
      }

      // Dosya boyutu kontrolü (5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        return { success: false, error: 'Dosya boyutu çok büyük. Maksimum 5MB olmalı.' };
      }

      // Benzersiz dosya adı oluştur
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 8);
      const fileExtension = file.name.split('.').pop();
      const fileName = `${timestamp}_${randomString}.${fileExtension}`;
      
      // Storage referansı oluştur
      const storageRef = ref(storage, `${folder}/${fileName}`);
      
      console.log('Uploading file:', fileName, 'to folder:', folder);
      
      // Dosyayı yükle
      const snapshot = await uploadBytes(storageRef, file);
      console.log('Upload successful:', snapshot.ref.fullPath);
      
      // Download URL'i al
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('Download URL:', downloadURL);
      
      return {
        success: true,
        url: downloadURL
      };

    } catch (error) {
      console.error('Image upload error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Dosya yükleme hatası'
      };
    }
  }

  // Görsel sil
  async deleteImage(url: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Firebase Storage URL'sinden referans oluştur
      const imageRef = ref(storage, url);
      await deleteObject(imageRef);
      
      return { success: true };
    } catch (error) {
      console.error('Image delete error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Dosya silme hatası'
      };
    }
  }

  // Base64'ü Firebase Storage'a yükle (TinyMCE için)
  async uploadBase64Image(base64Data: string, folder: string = 'blog/content'): Promise<UploadResult> {
    try {
      // Base64'ü Blob'a çevir
      const base64Response = await fetch(base64Data);
      const blob = await base64Response.blob();
      
      // File objesi oluştur
      const file = new File([blob], `image_${Date.now()}.png`, { type: 'image/png' });
      
      // Normal upload fonksiyonunu kullan
      return await this.uploadImage(file, folder);
    } catch (error) {
      console.error('Base64 upload error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Base64 yükleme hatası'
      };
    }
  }
}

// Singleton instance
export const storageService = new FirebaseStorageService(); 