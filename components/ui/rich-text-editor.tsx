'use client';

import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  height?: number;
  placeholder?: string;
}

export function RichTextEditor({ 
  value, 
  onChange, 
  height = 400, 
  placeholder = "Write your content here..." 
}: RichTextEditorProps) {
  const editorRef = useRef<any>(null);

  const handleEditorChange = (content: string) => {
    onChange(content);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <Editor
        apiKey="t90ea6bdrazpw49fx1vjymd1hex94lzdqvevz17pyvtggd11"
        onInit={(evt, editor) => editorRef.current = editor}
        value={value}
        onEditorChange={handleEditorChange}
        init={{
          height,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
            'emoticons', 'template', 'paste', 'textcolor', 'colorpicker'
          ],
          toolbar: [
            'undo redo | blocks | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify',
            'bullist numlist outdent indent | removeformat | link affiliate_link image media table | code fullscreen preview'
          ].join(' | '),
          content_style: `
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; 
              font-size: 16px; 
              line-height: 1.6;
              color: #374151;
            }
            p { margin: 0 0 1rem 0; }
            h1, h2, h3, h4, h5, h6 { 
              margin: 1.5rem 0 1rem 0; 
              font-weight: 600;
              line-height: 1.3;
            }
            h1 { font-size: 2.25rem; }
            h2 { font-size: 1.875rem; }
            h3 { font-size: 1.5rem; }
            blockquote { 
              border-left: 4px solid #e5e7eb; 
              padding-left: 1rem; 
              margin: 1rem 0; 
              font-style: italic;
              color: #6b7280;
            }
            img { 
              max-width: 100%; 
              height: auto; 
              border-radius: 8px;
              margin: 1rem 0;
            }
            table { 
              border-collapse: collapse; 
              width: 100%; 
              margin: 1rem 0;
            }
            table td, table th { 
              border: 1px solid #e5e7eb; 
              padding: 8px; 
            }
            table th { 
              background-color: #f9fafb; 
              font-weight: 600;
            }
            code { 
              background-color: #f3f4f6; 
              padding: 2px 4px; 
              border-radius: 4px; 
              font-size: 0.875rem;
            }
            pre { 
              background-color: #1f2937; 
              color: #f9fafb; 
              padding: 1rem; 
              border-radius: 8px; 
              overflow-x: auto;
              margin: 1rem 0;
            }
            a { 
              color: #3b82f6; 
              text-decoration: underline;
            }
            a:hover { 
              color: #1d4ed8; 
            }
          `,
          placeholder,
          block_formats: 'Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6; Preformatted=pre',
          fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
          font_formats: 'Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats',
          
          // Paste ayarları
          paste_as_text: false,
          paste_remove_styles: false,
          
          // Diğer ayarlar
          branding: false,
          elementpath: false,
          
          // Affiliate link butonu setup
          setup: (editor: any) => {
            // Özel ikon ekle
            editor.ui.registry.addIcon('affiliate_link', '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path><text x="12" y="18" text-anchor="middle" fill="currentColor" font-size="8">₺</text></svg>');
            
            // Affiliate link butonu ekle
            editor.ui.registry.addButton('affiliate_link', {
              text: 'Affiliate Link',
              icon: 'affiliate_link', // Özel ikonumuzu kullan
              tooltip: 'Affiliate Link Ekle (Satış Ortaklığı)',
              onAction: () => {
                // Seçili metni al
                const selectedText = editor.selection.getContent({ format: 'text' });
                const defaultText = selectedText || 'Link metni';
                
                // Diyalog penceresini aç
                editor.windowManager.open({
                  title: 'Affiliate Link Ekle',
                  body: {
                    type: 'panel',
                    items: [
                      {
                        type: 'input',
                        name: 'url',
                        label: 'URL',
                        placeholder: 'https://amazon.com/product/...'
                      },
                      {
                        type: 'input',
                        name: 'text',
                        label: 'Görüntülenecek Metin',
                        value: defaultText
                      },
                      {
                        type: 'selectbox',
                        name: 'style',
                        label: 'Buton Stili',
                        items: [
                          { text: 'Primary (Yeşil)', value: 'primary' },
                          { text: 'Secondary (Gri)', value: 'secondary' },
                          { text: 'Outline (Çerçeveli)', value: 'outline' }
                        ]
                      },
                      {
                        type: 'htmlpanel',
                        html: '<p style="font-size: 12px; color: #666; margin: 8px 0;">Bu link otomatik olarak yeni sekmede açılacak ve "sponsored" olarak işaretlenecektir.</p>'
                      }
                    ]
                  },
                  buttons: [
                    {
                      type: 'cancel',
                      text: 'İptal'
                    },
                    {
                      type: 'submit',
                      text: 'Ekle',
                      primary: true
                    }
                  ],
                  onSubmit: (api: any) => {
                    const data = api.getData();
                    const { url, text, style } = data;
                    
                    // Validation
                    if (!url || !text) {
                      editor.notificationManager.open({
                        text: 'URL ve metin alanları doldurulmalıdır.',
                        type: 'error'
                      });
                      return;
                    }
                    
                    // Buton stilini belirle
                    let cssClass = '';
                    if (style === 'secondary') {
                      cssClass = ' class="affiliate-secondary"';
                    } else if (style === 'outline') {
                      cssClass = ' class="affiliate-outline"';
                    }
                    
                    // Affiliate link HTML'i oluştur (buton olarak)
                    const affiliateLink = `<a href="${url}" target="_blank" rel="noopener noreferrer sponsored"${cssClass}>${text}</a>`;
                    
                    // Seçili metin varsa değiştir, yoksa cursor pozisyonuna ekle
                    if (selectedText) {
                      editor.selection.setContent(affiliateLink);
                    } else {
                      editor.insertContent(affiliateLink);
                    }
                    
                    // Başarı mesajı
                    editor.notificationManager.open({
                      text: 'Affiliate link başarıyla eklendi.',
                      type: 'success',
                      timeout: 2000
                    });
                    
                    api.close();
                  }
                });
              }
            });
          },
          resize: false,
          statusbar: true,
          
          // Dil desteği (Türkçe karakterler)
          language: 'en',
          directionality: 'ltr',
          
          // Auto-save ayarları
          autosave_ask_before_unload: true,
          autosave_interval: '30s',
          autosave_prefix: 'tinymce-autosave-{path}{query}-{id}-',
          autosave_restore_when_empty: false,
          autosave_retention: '2m',
          
          // Link ayarları
          link_assume_external_targets: true,
          link_context_toolbar: true,
          
          // Tablo ayarları
          table_default_attributes: {
            border: '1'
          },
          table_default_styles: {
            'border-collapse': 'collapse'
          },
          
          // Medya ayarları
          media_live_embeds: true,
          
          // Görsel yükleme - URL tabanlı
          images_upload_handler: (blobInfo: any, progress: (percent: number) => void) => {
            return new Promise((resolve, reject) => {
              // Base64 URL oluştur (geçici çözüm)
              const reader = new FileReader();
              reader.onload = () => {
                resolve(reader.result as string);
              };
              reader.onerror = () => {
                reject('Image could not be uploaded. Please add the image URL manually.');
              };
              reader.readAsDataURL(blobInfo.blob());
            });
          },
          
          // Manuel görsel URL girişi için
          image_advtab: true,
          image_caption: true,
          
          // URL tabanlı çalışma
          automatic_uploads: false,
          
          // Paste ile görsel yükleme
          paste_data_images: true,
          
          // Temizlik ayarları
          verify_html: false,
          cleanup: true,
          convert_urls: false,
        }}
      />
    </div>
  );
} 