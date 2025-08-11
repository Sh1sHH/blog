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

// Paint types and coverage (sq ft/gallon)
const paintTypes: Record<string, PaintType> = {
  'flat': { name: 'Flat/Matte', coverage: 400, price: 35 },
  'eggshell': { name: 'Eggshell', coverage: 350, price: 40 },
  'satin': { name: 'Satin', coverage: 350, price: 42 },
  'semi-gloss': { name: 'Semi-Gloss', coverage: 300, price: 45 },
  'gloss': { name: 'High Gloss', coverage: 300, price: 50 }
};

// Surface types and multipliers
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
  // Form state
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
  const [surfaceType, setSurfaceType] = useState<string>('drywall');
  const [coats, setCoats] = useState<string>('2');
  const [includeWaste, setIncludeWaste] = useState<boolean>(true);

  // Calculation result
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // Calculation function
  const calculatePaint = () => {
    if (!roomLength || !roomWidth || !roomHeight) {
      alert('Please enter room dimensions!');
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

    // Area calculations
    const wallArea = 2 * (length * height) + 2 * (width * height);
    const windowArea = winCount * winW * winH;
    const doorArea = doorC * doorW * doorH;
    const netArea = wallArea - windowArea - doorArea;

    // Apply surface multiplier - safe access
    const surfaceData = surfaceTypes[surfaceType];
    if (!surfaceData) {
      alert('Invalid surface type selected!');
      setIsCalculating(false);
      return;
    }
    const surfaceMultiplier = surfaceData.multiplier;
    const adjustedArea = netArea * surfaceMultiplier;

    // Paint calculation - safe access
    const paintData = paintTypes[paintType];
    if (!paintData) {
      alert('Invalid paint type selected!');
      setIsCalculating(false);
      return;
    }
    const paintNeeded = (adjustedArea * coatCount) / paintData.coverage;
    const paintWithWaste = includeWaste ? paintNeeded * 1.15 : paintNeeded;

    // Cost calculation (per gallon)
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

  // Form reset
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
    setSurfaceType('drywall');
    setCoats('2');
    setResult(null);
  };

  // PDF download function (simple version)
  const downloadPDF = () => {
    if (!result) return;
    
    const content = `
PAINT CALCULATION REPORT
========================

Room Dimensions:
- Length: ${roomLength} ft
- Width: ${roomWidth} ft  
- Height: ${roomHeight} ft

Window/Door Information:
- Windows: ${windowCount} units (${windowWidth}×${windowHeight} ft)
- Doors: ${doorCount} units (${doorWidth}×${doorHeight} ft)

Paint Details:
- Paint Type: ${paintTypes[paintType]?.name || 'Unknown'}
- Surface Type: ${surfaceTypes[surfaceType]?.name || 'Unknown'}
- Number of Coats: ${coats}

RESULTS:
========
Total Wall Area: ${result.wallArea} sq ft
Net Paintable Area: ${result.totalArea} sq ft
Paint Needed: ${result.paintNeeded} gallons
With Waste Allowance: ${result.paintWithWaste} gallons
Estimated Cost: $${result.totalCost}

This report was generated by CleverSpaceSolutions.com paint calculator.
    `;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'paint-calculation-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Share function
  const shareResults = async () => {
    if (!result) return;

    const shareText = `🎨 My Paint Calculation Results:
📐 Room: ${roomLength}×${roomWidth}×${roomHeight}ft
🎯 Paint Needed: ${result.paintWithWaste} gallons
💰 Estimated Cost: $${result.totalCost}

Calculated with CleverSpaceSolutions.com/tools/paint-calculator!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Paint Calculation Results',
          text: shareText,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareText);
        alert('Results copied to clipboard!');
      } catch (error) {
        console.error('Copy failed:', error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Panel - Form */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Room Dimensions */}
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
                <Input
                  id="length"
                  type="number"
                  step="0.5"
                  placeholder="12"
                  value={roomLength}
                  onChange={(e) => setRoomLength(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="width">Width (ft)</Label>
                <Input
                  id="width"
                  type="number"
                  step="0.5"
                  placeholder="10"
                  value={roomWidth}
                  onChange={(e) => setRoomWidth(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="height">Height (ft)</Label>
                <Input
                  id="height"
                  type="number"
                  step="0.5"
                  placeholder="9"
                  value={roomHeight}
                  onChange={(e) => setRoomHeight(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            </CardContent>
          </Card>

          {/* Windows and Doors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-green-600" />
                Window and Door Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Windows */}
              <div>
                <h4 className="font-semibold mb-3">Windows</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="windowCount">Count</Label>
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
                    <Label htmlFor="windowWidth">Width (ft)</Label>
                    <Input
                      id="windowWidth"
                      type="number"
                      step="0.5"
                      value={windowWidth}
                      onChange={(e) => setWindowWidth(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="windowHeight">Height (ft)</Label>
                    <Input
                      id="windowHeight"
                      type="number"
                      step="0.5"
                      value={windowHeight}
                      onChange={(e) => setWindowHeight(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Doors */}
              <div>
                <h4 className="font-semibold mb-3">Doors</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="doorCount">Count</Label>
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
                    <Label htmlFor="doorWidth">Width (ft)</Label>
                    <Input
                      id="doorWidth"
                      type="number"
                      step="0.5"
                      value={doorWidth}
                      onChange={(e) => setDoorWidth(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="doorHeight">Height (ft)</Label>
                    <Input
                      id="doorHeight"
                      type="number"
                      step="0.5"
                      value={doorHeight}
                      onChange={(e) => setDoorHeight(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Paint Properties */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Paintbrush className="h-5 w-5 text-purple-600" />
                Paint Properties
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="paintType">Paint Type</Label>
                  <Select value={paintType} onValueChange={setPaintType}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(paintTypes).map(([key, paint]) => (
                        <SelectItem key={key} value={key}>
                          {paint.name} ({paint.coverage} sq ft/gal)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="surfaceType">Surface Type</Label>
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
                  <Label htmlFor="coats">Number of Coats</Label>
                  <Select value={coats} onValueChange={setCoats}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Coat</SelectItem>
                      <SelectItem value="2">2 Coats (Recommended)</SelectItem>
                      <SelectItem value="3">3 Coats</SelectItem>
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
                    Add 15% Waste Allowance
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Buttons */}
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
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={resetForm}
              size="lg"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Clear
            </Button>
          </div>
        </div>

        {/* Right Panel - Results */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Calculation Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Wall Area:</span>
                      <span className="font-semibold">{result.wallArea} sq ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Net Area:</span>
                      <span className="font-semibold">{result.totalArea} sq ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Number of Coats:</span>
                      <span className="font-semibold">{result.coatsNeeded} coats</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Paint Amount */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Basic Need:</span>
                      <span className="font-semibold">{result.paintNeeded} gal</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold text-blue-600">With Waste:</span>
                      <span className="font-bold text-blue-600">{result.paintWithWaste} gal</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Cost */}
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Estimated Cost</div>
                    <div className="text-2xl font-bold text-green-600">
                      ${result.totalCost.toLocaleString('en-US')}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      ({paintTypes[paintType]?.name || 'Unknown Paint'})
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">💡 Recommendations:</h4>
                    <div className="space-y-1 text-xs text-gray-600">
                      <p>• Buy {Math.ceil(result.paintWithWaste)} gallons to be safe</p>
                      <p>• Use primer for the first coat</p>
                      <p>• Choose quality brushes/rollers</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button 
                      onClick={downloadPDF}
                      variant="outline" 
                      className="w-full"
                      size="sm"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                    <Button 
                      onClick={shareResults}
                      variant="outline" 
                      className="w-full"
                      size="sm"
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Fill out the form and<br />click "Calculate" to<br />get your paint estimate.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
