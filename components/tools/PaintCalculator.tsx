'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, 
  Download, 
  Share2, 
  RefreshCw, 
  Info,
  Paintbrush,
  Home,
  DollarSign
} from 'lucide-react';

// Tip tanımları
type PaintType = {
  name: string;
  coverage: number;
  price: number;
};

type SurfaceType = {
  name: string;
  multiplier: number;
};

// Boya türleri ve verimleri (m²/litre)
const paintTypes: Record<string, PaintType> = {
  'acrylic-mat': { name: 'Akrilik Mat', coverage: 12, price: 45 },
  'acrylic-silk': { name: 'Akrilik İpek Mat', coverage: 10, price: 55 },
  'acrylic-semi': { name: 'Akrilik Yarı Mat', coverage: 10, price: 50 },
  'plastic': { name: 'Plastik Boya', coverage: 14, price: 35 },
  'oil': { name: 'Yağlı Boya', coverage: 8, price: 65 }
};

// Yüzey türleri ve katsayıları
const surfaceTypes: Record<string, SurfaceType> = {
  'smooth': { name: 'Düz Sıva', multiplier: 1.0 },
  'textured': { name: 'Dokulu Sıva', multiplier: 1.2 },
  'plaster': { name: 'Alçı', multiplier: 1.1 },
  'wood': { name: 'Ahşap', multiplier: 1.3 },
  'concrete': { name: 'Beton', multiplier: 1.4 }
};

interface CalculationResult {
  wallArea: number;
  totalArea: number;
  paintNeeded: number;
  paintWithWaste: number;
  totalCost: number;
  coatsNeeded: number;
}

export default function PaintCalculator() {
  // Form state
  const [roomLength, setRoomLength] = useState<string>('');
  const [roomWidth, setRoomWidth] = useState<string>('');
  const [roomHeight, setRoomHeight] = useState<string>('');
  const [windowCount, setWindowCount] = useState<string>('2');
  const [windowWidth, setWindowWidth] = useState<string>('1.2');
  const [windowHeight, setWindowHeight] = useState<string>('1.5');
  const [doorCount, setDoorCount] = useState<string>('1');
  const [doorWidth, setDoorWidth] = useState<string>('0.8');
  const [doorHeight, setDoorHeight] = useState<string>('2.1');
  const [paintType, setPaintType] = useState<string>('acrylic-mat');
  const [surfaceType, setSurfaceType] = useState<string>('smooth');
  const [coats, setCoats] = useState<string>('2');
  const [includeWaste, setIncludeWaste] = useState<boolean>(true);

  // Calculation result
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // Hesaplama fonksiyonu
  const calculatePaint = () => {
    if (!roomLength || !roomWidth || !roomHeight) {
      alert('Lütfen oda boyutlarını girin!');
      return;
    }

    setIsCalculating(true);

    // Sayılara dönüştür
    const length = parseFloat(roomLength);
    const width = parseFloat(roomWidth);
    const height = parseFloat(roomHeight);
    const winCount = parseInt(windowCount);
    const winW = parseFloat(windowWidth);
    const winH = parseFloat(windowHeight);
    const doorC = parseInt(doorCount);
    const doorW = parseFloat(doorWidth);
    const doorH = parseFloat(doorHeight);
    const coatCount = parseInt(coats);

    // Alan hesaplamaları
    const wallArea = 2 * (length * height) + 2 * (width * height);
    const windowArea = winCount * winW * winH;
    const doorArea = doorC * doorW * doorH;
    const netArea = wallArea - windowArea - doorArea;

    // Yüzey çarpanı uygula - güvenli erişim
    const surfaceData = surfaceTypes[surfaceType];
    if (!surfaceData) {
      alert('Geçersiz yüzey türü seçildi!');
      setIsCalculating(false);
      return;
    }
    const surfaceMultiplier = surfaceData.multiplier;
    const adjustedArea = netArea * surfaceMultiplier;

    // Boya hesaplama - güvenli erişim
    const paintData = paintTypes[paintType];
    if (!paintData) {
      alert('Geçersiz boya türü seçildi!');
      setIsCalculating(false);
      return;
    }
    const paintNeeded = (adjustedArea * coatCount) / paintData.coverage;
    const paintWithWaste = includeWaste ? paintNeeded * 1.15 : paintNeeded;

    // Maliyet hesaplama (litre başına)
    const totalCost = Math.ceil(paintWithWaste) * paintData.price;

    const calculationResult: CalculationResult = {
      wallArea: Math.round(wallArea * 100) / 100,
      totalArea: Math.round(adjustedArea * 100) / 100,
      paintNeeded: Math.round(paintNeeded * 100) / 100,
      paintWithWaste: Math.round(paintWithWaste * 100) / 100,
      totalCost: totalCost,
      coatsNeeded: coatCount
    };

    setTimeout(() => {
      setResult(calculationResult);
      setIsCalculating(false);
    }, 1000);
  };

  // Form sıfırlama
  const resetForm = () => {
    setRoomLength('');
    setRoomWidth('');
    setRoomHeight('');
    setWindowCount('2');
    setWindowWidth('1.2');
    setWindowHeight('1.5');
    setDoorCount('1');
    setDoorWidth('0.8');
    setDoorHeight('2.1');
    setPaintType('acrylic-mat');
    setSurfaceType('smooth');
    setCoats('2');
    setResult(null);
  };

  // PDF indirme fonksiyonu (basit versiyon)
  const downloadPDF = () => {
    if (!result) return;
    
    const content = `
BOYA MİKTARI HESAPLAMA RAPORU
==============================

Oda Boyutları:
- En: ${roomLength} m
- Boy: ${roomWidth} m  
- Yükseklik: ${roomHeight} m

Pencere/Kapı Bilgileri:
- Pencere: ${windowCount} adet (${windowWidth}×${windowHeight} m)
- Kapı: ${doorCount} adet (${doorWidth}×${doorHeight} m)

Boya Detayları:
- Boya Türü: ${paintTypes[paintType]?.name || 'Bilinmeyen'}
- Yüzey Türü: ${surfaceTypes[surfaceType]?.name || 'Bilinmeyen'}
- Kat Sayısı: ${coats}

SONUÇLAR:
=========
Toplam Duvar Alanı: ${result.wallArea} m²
Boyanacak Net Alan: ${result.totalArea} m²
Gerekli Boya: ${result.paintNeeded} litre
Fire Dahil: ${result.paintWithWaste} litre
Tahmini Maliyet: ${result.totalCost} ₺

Bu rapor CleverSpaceSolutions.com boya hesaplayıcısı ile oluşturulmuştur.
    `;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'boya-hesaplama-raporu.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Paylaşma fonksiyonu
  const shareResults = async () => {
    if (!result) return;

    const shareText = `🎨 Boya Hesaplama Sonuçlarım:
📐 Oda: ${roomLength}×${roomWidth}×${roomHeight}m
🎯 Gerekli Boya: ${result.paintWithWaste} litre
💰 Tahmini Maliyet: ${result.totalCost}₺

CleverSpaceSolutions.com/tools/paint-calculator ile hesapladım!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Boya Hesaplama Sonuçlarım',
          text: shareText,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Paylaşım iptal edildi');
      }
    } else {
      // Fallback: clipboard'a kopyala
      try {
        await navigator.clipboard.writeText(shareText);
        alert('Sonuçlar panoya kopyalandı!');
      } catch (error) {
        console.error('Kopyalama başarısız:', error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Sol Panel - Form */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Oda Boyutları */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5 text-blue-600" />
                Oda Boyutları
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="length">En (m)</Label>
                  <Input
                    id="length"
                    type="number"
                    step="0.1"
                    placeholder="4.0"
                    value={roomLength}
                    onChange={(e) => setRoomLength(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="width">Boy (m)</Label>
                  <Input
                    id="width"
                    type="number"
                    step="0.1"
                    placeholder="3.5"
                    value={roomWidth}
                    onChange={(e) => setRoomWidth(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="height">Yükseklik (m)</Label>
                  <Input
                    id="height"
                    type="number"
                    step="0.1"
                    placeholder="2.7"
                    value={roomHeight}
                    onChange={(e) => setRoomHeight(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pencere ve Kapı */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-green-600" />
                Pencere ve Kapı Detayları
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Pencereler */}
              <div>
                <h4 className="font-semibold mb-3">Pencereler</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="windowCount">Adet</Label>
                    <Input
                      id="windowCount"
                      type="number"
                      min="0"
                      value={windowCount}
                      onChange={(e) => setWindowCount(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="windowWidth">En (m)</Label>
                    <Input
                      id="windowWidth"
                      type="number"
                      step="0.1"
                      value={windowWidth}
                      onChange={(e) => setWindowWidth(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="windowHeight">Boy (m)</Label>
                    <Input
                      id="windowHeight"
                      type="number"
                      step="0.1"
                      value={windowHeight}
                      onChange={(e) => setWindowHeight(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Kapılar */}
              <div>
                <h4 className="font-semibold mb-3">Kapılar</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="doorCount">Adet</Label>
                    <Input
                      id="doorCount"
                      type="number"
                      min="0"
                      value={doorCount}
                      onChange={(e) => setDoorCount(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="doorWidth">En (m)</Label>
                    <Input
                      id="doorWidth"
                      type="number"
                      step="0.1"
                      value={doorWidth}
                      onChange={(e) => setDoorWidth(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="doorHeight">Boy (m)</Label>
                    <Input
                      id="doorHeight"
                      type="number"
                      step="0.1"
                      value={doorHeight}
                      onChange={(e) => setDoorHeight(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Boya Özellikleri */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Paintbrush className="h-5 w-5 text-purple-600" />
                Boya Özellikleri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="paintType">Boya Türü</Label>
                  <Select value={paintType} onValueChange={setPaintType}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(paintTypes).map(([key, paint]) => (
                        <SelectItem key={key} value={key}>
                          {paint.name} ({paint.coverage} m²/L)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="surfaceType">Yüzey Türü</Label>
                  <Select value={surfaceType} onValueChange={setSurfaceType}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(surfaceTypes).map(([key, surface]) => (
                        <SelectItem key={key} value={key}>
                          {surface.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="coats">Kat Sayısı</Label>
                  <Select value={coats} onValueChange={setCoats}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Kat</SelectItem>
                      <SelectItem value="2">2 Kat (Önerilen)</SelectItem>
                      <SelectItem value="3">3 Kat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 mt-6">
                  <input
                    type="checkbox"
                    id="includeWaste"
                    checked={includeWaste}
                    onChange={(e) => setIncludeWaste(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="includeWaste" className="text-sm">
                    %15 Fire Payı Ekle
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Butonlar */}
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={calculatePaint}
              disabled={isCalculating}
              className="flex-1 min-w-[200px]"
              size="lg"
            >
              {isCalculating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Hesaplanıyor...
                </>
              ) : (
                <>
                  <Calculator className="mr-2 h-4 w-4" />
                  Hesapla
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={resetForm}
              size="lg"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Temizle
            </Button>
          </div>
        </div>

        {/* Sağ Panel - Sonuçlar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Hesaplama Sonuçları
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  {/* Temel Bilgiler */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duvar Alanı:</span>
                      <span className="font-semibold">{result.wallArea} m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Net Alan:</span>
                      <span className="font-semibold">{result.totalArea} m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Kat Sayısı:</span>
                      <span className="font-semibold">{result.coatsNeeded} kat</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Boya Miktarı */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Temel İhtiyaç:</span>
                      <span className="font-semibold">{result.paintNeeded} L</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold text-blue-600">Fire Dahil:</span>
                      <span className="font-bold text-blue-600">{result.paintWithWaste} L</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Maliyet */}
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Tahmini Maliyet</div>
                    <div className="text-2xl font-bold text-green-600">
                      {result.totalCost.toLocaleString('tr-TR')} ₺
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      ({paintTypes[paintType]?.name || 'Bilinmeyen Boya'})
                    </div>
                  </div>

                  {/* Öneriler */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">💡 Öneriler:</h4>
                    <div className="space-y-1 text-xs text-gray-600">
                      <p>• {Math.ceil(result.paintWithWaste)} litre almanız yeterli</p>
                      <p>• İlk kat için astar kullanın</p>
                      <p>• Kaliteli fırça/rulo tercih edin</p>
                    </div>
                  </div>

                  {/* Aksiyon Butonları */}
                  <div className="space-y-2">
                    <Button 
                      onClick={downloadPDF}
                      variant="outline" 
                      className="w-full"
                      size="sm"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      PDF İndir
                    </Button>
                    <Button 
                      onClick={shareResults}
                      variant="outline" 
                      className="w-full"
                      size="sm"
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Paylaş
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Hesaplama yapmak için<br />formu doldurun ve<br />"Hesapla" butonuna basın.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
