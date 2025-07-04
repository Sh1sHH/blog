'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from './button';
import Image from 'next/image';

interface ImageUploadProps {
  onImageUpload: (url: string) => void;
  currentImage?: string;
  folder?: string;
  className?: string;
  accept?: string;
  maxSize?: number; // MB cinsinden
  placeholder?: string;
}

export default function ImageUpload({
  onImageUpload,
  currentImage,
  folder = 'blog',
  className = '',
  accept = 'image/*',
  maxSize = 5,
  placeholder = 'Görsel yüklemek için tıklayın veya sürükleyin'
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dosya yükleme fonksiyonu
  const uploadFile = useCallback(async (file: File) => {
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const response = await fetch('/api/admin/upload/image', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setPreviewUrl(result.url);
        onImageUpload(result.url);
      } else {
        setError(result.error || 'Dosya yükleme başarısız');
      }
    } catch (err) {
      setError('Dosya yükleme sırasında hata oluştu');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  }, [folder, onImageUpload]);

  // Dosya seçimi
  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];

    // Dosya türü kontrolü
    if (!file.type.startsWith('image/')) {
      setError('Lütfen bir görsel dosyası seçin');
      return;
    }

    // Dosya boyutu kontrolü
    if (file.size > maxSize * 1024 * 1024) {
      setError(`Dosya boyutu ${maxSize}MB'dan küçük olmalı`);
      return;
    }

    uploadFile(file);
  }, [maxSize, uploadFile]);

  // Input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  // Drag & Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  // Görsel silme
  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageUpload('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Input'a tıklama
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer ${
          isDragOver
            ? 'border-blue-400 bg-blue-50'
            : previewUrl
            ? 'border-gray-300 bg-gray-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${isUploading ? 'pointer-events-none opacity-50' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
          disabled={isUploading}
        />

        {/* Preview Image */}
        {previewUrl && (
          <div className="relative">
            <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Upload Placeholder */}
        {!previewUrl && (
          <div className="text-center">
            <div className="flex flex-col items-center space-y-4">
              {isUploading ? (
                <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <Upload className="h-12 w-12 text-gray-400" />
                  <ImageIcon className="h-8 w-8 text-gray-300" />
                </div>
              )}
              
              <div className="space-y-2">
                <p className="text-sm text-gray-600 font-medium">
                  {isUploading ? 'Yükleniyor...' : placeholder}
                </p>
                <p className="text-xs text-gray-500">
                  JPG, PNG, WebP veya GIF (maks. {maxSize}MB)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Replace Button (when image exists) */}
      {previewUrl && !isUploading && (
        <Button
          type="button"
          variant="outline"
          onClick={handleClick}
          className="w-full"
        >
          <Upload className="h-4 w-4 mr-2" />
          Görseli Değiştir
        </Button>
      )}
    </div>
  );
} 