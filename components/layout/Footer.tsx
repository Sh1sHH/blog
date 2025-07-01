import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo ve Telif */}
          <div className="text-slate-600 text-sm">
            © {new Date().getFullYear()} NishBlog
          </div>

          {/* Linkler */}
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
              Ana Sayfa
            </Link>
            <Link href="/blog" className="text-slate-600 hover:text-slate-900 transition-colors">
              Blog
            </Link>
            <Link href="/about" className="text-slate-600 hover:text-slate-900 transition-colors">
              Hakkımızda
            </Link>
            <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition-colors">
              İletişim
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}