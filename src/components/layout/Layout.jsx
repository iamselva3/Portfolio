import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen pt-16">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 w-full">
        {children}
      </main>
      <footer className="py-8 text-center text-sm text-gray-500 dark:text-zinc-500 border-t border-gray-100 dark:border-zinc-900 mt-20">
        <p>&copy; {new Date().getFullYear()} Selvaganesh. All rights reserved.</p>
      </footer>
    </div>
  );
}
