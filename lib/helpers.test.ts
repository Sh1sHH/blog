// lib/helpers.test.ts

// Test etmek istediğimiz createSlug fonksiyonunu helpers.ts dosyasından import ediyoruz.
import { createSlug } from './helpers';

// Testlerimizi "createSlug fonksiyonu" başlığı altında grupluyoruz.
describe('createSlug fonksiyonu', () => {

  // "it" bloğu tek bir test senaryosunu tanımlar.
  // Test 1: Basit bir başlığı doğru çeviriyor mu?
  it('boşluk içeren basit bir başlığı doğru formatlamalıdır', () => {
    const baslik = 'Yeni Blog Yazısı';
    const beklenenSonuc = 'yeni-blog-yazisi';
    
    // expect(...).toBe(...) Jest'in beklenti komutudur. 
    // "createSlug('Yeni Blog Yazısı') sonucunun 'yeni-blog-yazisi' olmasını bekle" anlamına gelir.
    expect(createSlug(baslik)).toBe(beklenenSonuc);
  });

  // Test 2: Büyük harfleri doğru şekilde küçük harfe çeviriyor mu?
  it('büyük harfleri küçük harfe çevirmelidir', () => {
    const baslik = 'BÜYÜK HARFLİ BİR BAŞLIK';
    const beklenenSonuc = 'buyuk-harfli-bir-baslik';
    expect(createSlug(baslik)).toBe(beklenenSonuc);
  });

  // Test 3: Gereksiz karakterleri siliyor mu?
  it('özel karakterleri ve emojileri kaldırmalıdır', () => {
    const baslik = 'Bu! bir? başlık... 😃';
    const beklenenSonuc = 'bu-bir-baslik';
    expect(createSlug(baslik)).toBe(beklenenSonuc);
  });

  // Test 4: Fazla boşlukları tek tireye indiriyor mu?
  it('çoklu boşlukları tek bir tireye dönüştürmelidir', () => {
    const baslik = 'Boşluklar    arası    mesafe';
    const beklenenSonuc = 'bosluklar-arasi-mesafe';
    expect(createSlug(baslik)).toBe(beklenenSonuc);
  });

});