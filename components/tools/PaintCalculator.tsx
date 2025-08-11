'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Calculator, 
  Download, 
  Share2, 
  RefreshCw, 
  Info,
  Paintbrush,
  Home,
  DollarSign,
  Award
} from 'lucide-react';

// Updated data types for paint quality system
type PaintQuality = {
  name: string;
  price: number;
};

type PaintTypeData = {
  name: string;
  coverage: number;
  qualities: Record<string, PaintQuality>;
};

type SurfaceType = {
  name: string;
  multiplier: number;
};

// Paint types with quality-based pricing
const paintTypes: Record<string, PaintTypeData> = {
  'flat': { 
    name: 'Flat/Matte', 
    coverage: 400, 
    qualities: {
      'basic': { name: 'Basic', price: 25 },
      'mid': { name: 'Mid-Grade', price: 40 },
      'premium': { name: 'Premium', price: 60 }
    }
  },
  'eggshell': { 
    name: 'Eggshell', 
    coverage: 350, 
    qualities: {
      'basic': { name: 'Basic', price: 30 },
      'mid': { name: 'Mid-Grade', price: 45 },
      'premium': { name: 'Premium', price: 65 }
    }
  },
  'satin': { 
    name: 'Satin', 
    coverage: 350, 
    qualities: {
      'basic': { name: 'Basic', price: 32 },
      'mid': { name: 'Mid-Grade', price: 48 },
      'premium': { name: 'Premium', price: 70 }
    }
  },
  'semi-gloss': { 
    name: 'Semi-Gloss', 
    coverage: 300, 
    qualities: {
      'basic': { name: 'Basic', price: 35 },
      'mid': { name: 'Mid-Grade', price: 50 },
      'premium': { name: 'Premium', price: 75 }
    }
  },
  'gloss': { 
    name: 'High Gloss', 
    coverage: 300, 
    qualities: {
      'basic': { name: 'Basic', price: 38 },
      'mid': { name: 'Mid-Grade', price: 55 },
      'premium': { name: 'Premium', price: 80 }
    }
  }
};

const surfaceTypes: Record<string, SurfaceType> = {
  'drywall': { name: 'Drywall', multiplier: 1.0 },
  'textured': { name: 'Textured Wall', multiplier: 1.2 },
  'plaster': { name: 'Plaster', multiplier: 1.1 },
  'wood': { name: 'Wood', multiplier: 1.3 },
  'brick': { name: 'Brick/Concrete', multiplier: 1.4 }
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
  const [roomLength, setRoomLength] = useState<string>('');
  const [roomWidth, setRoomWidth] = useState<string>('');
  const [roomHeight, setRoomHeight] = useState<string>('');
  const [windowCount, setWindowCount] = useState<string>('2');
  const [windowWidth, setWindowWidth] = useState<string>('4');
  const [windowHeight, setWindowHeight] = useState<string>('5');
  const [doorCount, setDoorCount] = useState<string>('1');
  const [doorWidth, setDoorWidth] = useState<string>('3');
  const [doorHeight, setDoorHeight] = useState<string>('7');
  const [paintType, setPaintType] = useState<string>('eggshell');
  const [paintQuality, setPaintQuality] = useState<string>('mid');
  const [surfaceType, setSurfaceType] = useState<string>('drywall');
  const [coats, setCoats] = useState<string>('2');
  const [includeWaste, setIncludeWaste] = useState<boolean>(true);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const calculatePaint = () => {
    if (!roomLength || !roomWidth || !roomHeight) {
      alert('Please enter room dimensions!');
      return;
    }
    setIsCalculating(true);

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

    const wallArea = 2 * (length * height) + 2 * (width * height);
    const windowArea = winCount * winW * winH;
    const doorArea = doorC * doorW * doorH;
    const netArea = wallArea - windowArea - doorArea;

    const surfaceData = surfaceTypes[surfaceType];
    const surfaceMultiplier = surfaceData ? surfaceData.multiplier : 1.0;
    const adjustedArea = netArea * surfaceMultiplier;

    const paintData = paintTypes[paintType];
    if (!paintData) {
      alert('Invalid paint type selected!');
      setIsCalculating(false);
      return;
    }
    
    // Calculate cost based on selected paint quality
    const qualityData = paintData.qualities[paintQuality];
    if (!qualityData) {
        alert('Invalid paint quality selected!');
        setIsCalculating(false);
        return;
    }

    const paintNeeded = (adjustedArea * coatCount) / paintData.coverage;
    const paintWithWaste = includeWaste ? paintNeeded * 1.15 : paintNeeded;
    const totalCost = Math.ceil(paintWithWaste) * qualityData.price;

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
  
  const resetForm = () => {
    setRoomLength('');
    setRoomWidth('');
    setRoomHeight('');
    setWindowCount('2');
    setWindowWidth('4');
    setWindowHeight('5');
    setDoorCount('1');
    setDoorWidth('3');
    setDoorHeight('7');
    setPaintType('eggshell');
    setPaintQuality('mid');
    setSurfaceType('drywall');
    setCoats('2');
    setResult(null);
  };

  const downloadReport = () => {
      if (!result) return;
      
      const paintData = paintTypes[paintType];
      const qualityData = paintData.qualities[paintQuality];
      
      const content = `
PAINT ESTIMATE REPORT
==============================

ROOM DIMENSIONS:
- Length: ${roomLength} ft
- Width: ${roomWidth} ft  
- Height: ${roomHeight} ft

WINDOWS & DOORS:
- Windows: ${windowCount} count (${windowWidth} ft × ${windowHeight} ft)
- Doors: ${doorCount} count (${doorWidth} ft × ${doorHeight} ft)

PAINT DETAILS:
- Paint Type: ${paintData.name}
- Paint Quality: ${qualityData.name}
- Surface Type: ${surfaceTypes[surfaceType]?.name || 'Unknown'}
- Coats: ${coats}

RESULTS:
=========
Total Wall Area: ${result.wallArea} sq ft
Net Area to Paint: ${result.totalArea} sq ft
Paint Required (gallons): ${result.paintNeeded.toFixed(2)}
With 15% Waste: ${result.paintWithWaste.toFixed(2)} gallons
Estimated Cost: $${result.totalCost.toFixed(2)}

This report was generated by the CleverSpaceSolutions.com paint calculator.
      `;

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'paint-estimate-report.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
  };

  const shareResults = async () => {
    if (!result) return;

    const shareText = `🎨 My Paint Job Estimate:
📐 Room: ${roomLength}×${roomWidth}×${roomHeight} ft
🎯 Paint Needed: ${result.paintWithWaste.toFixed(2)} gallons
💰 Estimated Cost: $${result.totalCost.toFixed(2)}

Calculated with CleverSpaceSolutions.com/tools/paint-calculator!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Paint Calculation Results',
          text: shareText,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Sharing was cancelled');
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        alert('Results copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    }
  };


  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5 text-blue-600" />
                Room Dimensions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="length">Length (ft)</Label>
                  <Input id="length" type="number" step="0.5" placeholder="12" value={roomLength} onChange={(e) => setRoomLength(e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="width">Width (ft)</Label>
                  <Input id="width" type="number" step="0.5" placeholder="10" value={roomWidth} onChange={(e) => setRoomWidth(e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="height">Height (ft)</Label>
                  <Input id="height" type="number" step="0.5" placeholder="9" value={roomHeight} onChange={(e) => setRoomHeight(e.target.value)} className="mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-green-600" />
                Windows & Doors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Windows</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div><Label htmlFor="windowCount">Count</Label><Input id="windowCount" type="number" min="0" value={windowCount} onChange={(e) => setWindowCount(e.target.value)} className="mt-1" /></div>
                  <div><Label htmlFor="windowWidth">Width (ft)</Label><Input id="windowWidth" type="number" step="0.5" value={windowWidth} onChange={(e) => setWindowWidth(e.target.value)} className="mt-1" /></div>
                  <div><Label htmlFor="windowHeight">Height (ft)</Label><Input id="windowHeight" type="number" step="0.5" value={windowHeight} onChange={(e) => setWindowHeight(e.target.value)} className="mt-1" /></div>
                </div>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-3">Doors</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div><Label htmlFor="doorCount">Count</Label><Input id="doorCount" type="number" min="0" value={doorCount} onChange={(e) => setDoorCount(e.target.value)} className="mt-1" /></div>
                  <div><Label htmlFor="doorWidth">Width (ft)</Label><Input id="doorWidth" type="number" step="0.5" value={doorWidth} onChange={(e) => setDoorWidth(e.target.value)} className="mt-1" /></div>
                  <div><Label htmlFor="doorHeight">Height (ft)</Label><Input id="doorHeight" type="number" step="0.5" value={doorHeight} onChange={(e) => setDoorHeight(e.target.value)} className="mt-1" /></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Paintbrush className="h-5 w-5 text-purple-600" />
                Paint & Surface
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                  {/* Paint Quality Selection */}
                  <div>
                    <Label htmlFor="paintQuality">Paint Quality</Label>
                    <Select value={paintQuality} onValueChange={setPaintQuality}>
                      <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic / Economy</SelectItem>
                        <SelectItem value="mid">Mid-Grade (Recommended)</SelectItem>
                        <SelectItem value="premium">Premium / High-End</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                      <Label htmlFor="paintType">Paint Finish</Label>
                      <Select value={paintType} onValueChange={setPaintType}>
                          <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                          <SelectContent>
                              {Object.entries(paintTypes).map(([key, paint]) => (
                                  <SelectItem key={key} value={key}>{paint.name}</SelectItem>
                              ))}
                          </SelectContent>
                      </Select>
                  </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div>
                      <Label htmlFor="surfaceType">Surface Type</Label>
                      <Select value={surfaceType} onValueChange={setSurfaceType}>
                          <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                          <SelectContent>
                              {Object.entries(surfaceTypes).map(([key, surface]) => (
                                  <SelectItem key={key} value={key}>{surface.name}</SelectItem>
                              ))}
                          </SelectContent>
                      </Select>
                  </div>
                  <div>
                      <Label htmlFor="coats">Number of Coats</Label>
                      <Select value={coats} onValueChange={setCoats}>
                          <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                          <SelectContent>
                              <SelectItem value="1">1 Coat</SelectItem>
                              <SelectItem value="2">2 Coats (Recommended)</SelectItem>
                              <SelectItem value="3">3 Coats</SelectItem>
                          </SelectContent>
                      </Select>
                  </div>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <input type="checkbox" id="includeWaste" checked={includeWaste} onChange={(e) => setIncludeWaste(e.target.checked)} className="rounded border-gray-300" />
                <Label htmlFor="includeWaste" className="text-sm">Include 15% for waste</Label>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-wrap gap-3">
            <Button onClick={calculatePaint} disabled={isCalculating} className="flex-1 min-w-[200px]" size="lg">
              {isCalculating ? (<><RefreshCw className="mr-2 h-4 w-4 animate-spin" />Calculating...</>) : (<><Calculator className="mr-2 h-4 w-4" />Calculate</>)}
            </Button>
            <Button variant="outline" onClick={resetForm} size="lg"><RefreshCw className="mr-2 h-4 w-4" />Reset</Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Calculation Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between"><span className="text-gray-600">Wall Area:</span><span className="font-semibold">{result.wallArea} sq ft</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Net Paintable Area:</span><span className="font-semibold">{result.totalArea.toFixed(2)} sq ft</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Coats:</span><span className="font-semibold">{result.coatsNeeded}</span></div>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex justify-between"><span className="text-gray-600">Paint Needed:</span><span className="font-semibold">{result.paintNeeded.toFixed(2)} gal</span></div>
                    <div className="flex justify-between text-lg"><span className="font-semibold text-blue-600">Including Waste:</span><span className="font-bold text-blue-600">{result.paintWithWaste.toFixed(2)} gal</span></div>
                  </div>
                  <Separator />
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Estimated Cost</div>
                    <div className="text-3xl font-bold text-green-600">${result.totalCost.toFixed(2)}</div>
                    <div className="text-xs text-gray-500 mt-1">({paintTypes[paintType]?.qualities[paintQuality].name} {paintTypes[paintType]?.name})</div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">💡 Recommendations:</h4>
                    <div className="space-y-1 text-xs text-gray-600">
                      <p>• You should purchase {Math.ceil(result.paintWithWaste)} gallons of paint.</p>
                      <p>• Use a primer for the first coat, especially on new drywall.</p>
                      <p>• Quality brushes and rollers make a big difference.</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button onClick={downloadReport} variant="outline" className="w-full" size="sm"><Download className="mr-2 h-4 w-4" />Download Report</Button>
                    <Button onClick={shareResults} variant="outline" className="w-full" size="sm"><Share2 className="mr-2 h-4 w-4" />Share Results</Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Fill out the form and<br />click "Calculate" to see<br />your paint estimate.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}