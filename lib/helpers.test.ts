// lib/helpers.test.ts

// Test etmek istediğimiz createSlug fonksiyonunu helpers.ts dosyasından import ediyoruz.
import { createSlug } from './helpers';

// Testlerimizi "createSlug fonksiyonu" başlığı altında grupluyoruz.
describe('createSlug fonksiyonu', () => {

  // "it" bloğu tek bir test senaryosunu tanımlar.
  // Test 1: Basit bir başlığı doğru çeviriyor mu?
  it('boşluk içeren basit bir başlığı doğru formatlamalıdır', () => {
    const baslik = 'New Blog Post';
    const beklenenSonuc = 'new-blog-post';
    
    // expect(...).toBe(...) Jest'in beklenti komutudur. 
    // "createSlug('Yeni Blog Yazısı') sonucunun 'yeni-blog-yazisi' olmasını bekle" anlamına gelir.
    expect(createSlug(baslik)).toBe(beklenenSonuc);
  });

  // Test 2: Büyük harfleri doğru şekilde küçük harfe çeviriyor mu?
  it('büyük harfleri küçük harfe çevirmelidir', () => {
    const baslik = 'BIG TITLE';
    const beklenenSonuc = 'big-title';
    expect(createSlug(baslik)).toBe(beklenenSonuc);
  });

  // Test 3: Gereksiz karakterleri siliyor mu?
  it('özel karakterleri ve emojileri kaldırmalıdır', () => {
    const baslik = 'This is a test title! 😃';
    const beklenenSonuc = 'this-is-a-test-title';
    expect(createSlug(baslik)).toBe(beklenenSonuc);
  });

  // Test 4: Fazla boşlukları tek tireye indiriyor mu?
  it('çoklu boşlukları tek bir tireye dönüştürmelidir', () => {
    const baslik = 'This is a test title with multiple spaces';
    const beklenenSonuc = 'this-is-a-test-title-with-multiple-spaces';
    expect(createSlug(baslik)).toBe(beklenenSonuc);
  });

});