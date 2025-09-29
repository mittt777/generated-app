import { Zap, Twitter, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container max-w-7xl py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col items-start space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Zenith</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              The modern subscription platform for growing businesses.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground"><Github className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-3 md:grid-cols-4">
            <div>
              <h3 className="font-semibold">Product</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link to="/pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
                <li><Link to="/#features" className="text-muted-foreground hover:text-foreground">Features</Link></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Company</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Resources</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">API Reference</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Status</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Legal</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Zenith Inc. All rights reserved. Built with ❤️ at Cloudflare.</p>
        </div>
      </div>
    </footer>
  );
}