import { Heart } from "lucide-react";

const Footer = () => {
    return (
        <footer className="py-8 mt-12 border-t border-border bg-card">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} DSA Master. Open Source.
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Vibe coded with</span>
                    <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
                    <span>by <a href="https://github.com/Gitanaskhan26" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Anas Khan</a></span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
