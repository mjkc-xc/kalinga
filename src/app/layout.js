// Import DOMMatrix polyfill first, before any other imports
if (typeof window === 'undefined' && typeof global !== 'undefined') {
  try {
    require('../../polyfills/dommatrix.js');
  } catch (e) {
    // Polyfill file not found, define inline
    if (typeof global.DOMMatrix === 'undefined') {
      global.DOMMatrix = class DOMMatrix {
        constructor(init) {
          if (typeof init === 'string') {
            this.a = 1; this.b = 0; this.c = 0; this.d = 1; this.e = 0; this.f = 0;
          } else if (init) {
            this.a = init.a ?? 1; this.b = init.b ?? 0; this.c = init.c ?? 0;
            this.d = init.d ?? 1; this.e = init.e ?? 0; this.f = init.f ?? 0;
          } else {
            this.a = 1; this.b = 0; this.c = 0; this.d = 1; this.e = 0; this.f = 0;
          }
        }
        multiply(other) {
          return new global.DOMMatrix({
            a: this.a * other.a + this.c * other.b,
            b: this.b * other.a + this.d * other.b,
            c: this.a * other.c + this.c * other.d,
            d: this.b * other.c + this.d * other.d,
            e: this.a * other.e + this.c * other.f + this.e,
            f: this.b * other.e + this.d * other.f + this.f,
          });
        }
        translate(x, y) {
          return this.multiply(new global.DOMMatrix({ a: 1, b: 0, c: 0, d: 1, e: x, f: y }));
        }
        scale(x, y) {
          return this.multiply(new global.DOMMatrix({ a: x, b: 0, c: 0, d: y || x, e: 0, f: 0 }));
        }
        rotate(angle) {
          const rad = (angle * Math.PI) / 180;
          const cos = Math.cos(rad);
          const sin = Math.sin(rad);
          return this.multiply(new global.DOMMatrix({ a: cos, b: sin, c: -sin, d: cos, e: 0, f: 0 }));
        }
        toString() {
          return `matrix(${this.a}, ${this.b}, ${this.c}, ${this.d}, ${this.e}, ${this.f})`;
        }
      };
    }
  }
}

import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "./components/layout/Header";
import Breadcrumb from "./components/layout/Breadcrumb";
import Footer from "./components/layout/Footer";
import ClickSparkWrapper from "./components/layout/ClickSparkWrapper";
import { FlipbookProvider } from "./components/general/FlipbookContext";
import { ChatbotProvider } from "./components/layout/ChatbotContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://kalingauniversity.ac.in"),
  title: "Kalinga University - Transforming Futures with Knowledge & Innovation",
  description: "Kalinga University is a leading institution offering world-class education in engineering, management, science, arts, and more.",
  icons: {
    icon: "https://cdn.kalingauniversity.ac.in/favicon.png",
    shortcut: "https://cdn.kalingauniversity.ac.in/favicon.png",
    apple: "https://cdn.kalingauniversity.ac.in/favicon.png",
  },
  other: {
    "google-fonts-inter": "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap",
    "google-fonts-stix": "https://fonts.googleapis.com/css2?family=STIX+Two+Math&display=swap",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=STIX+Two+Math&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
        suppressHydrationWarning
      >
        <ChatbotProvider>
          <FlipbookProvider>
            <ClickSparkWrapper>
              <Header />
              <Script
                id="scroll-restoration"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
                    if (typeof history !== 'undefined') history.scrollRestoration = 'manual';
                    
                    const originalError = console.error;
                    console.error = function (...args) {
                      if (typeof args[0] === 'string' && (
                        args[0].includes('A tree hydrated but some attributes of the server rendered HTML') ||
                        args[0].includes('Hydration failed because the initial UI does not match') ||
                        args[0].includes('Warning: Expected server HTML to contain a matching') ||
                        args[0].includes('Warning: Text content did not match') ||
                        args[0].includes('Warning: Prop ')
                      )) {
                        return;
                      }
                      originalError.apply(console, args);
                    };
                  `
                }}
              />
              <main className="min-h-screen">
                <Breadcrumb />
                {children}
              </main>
              <Footer />
            </ClickSparkWrapper>
          </FlipbookProvider>
        </ChatbotProvider>
        
        {/* NPF Chatbot Integration */}
        <div className="npf_chatbots" data-w="83d92d42d8cc4c839d761d929fc3211c" style={{ display: 'none' }}></div>
        <Script 
          id="npf-chatbot"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var s=document.createElement("script"); 
              s.type="text/javascript"; 
              s.async=true; 
              s.src="https://chatbot.in1.nopaperforms.com/en-gb/backend/bots/niaachtbtscpt.js/6426019081578b6b/83d92d42d8cc4c839d761d929fc3211c"; 
              document.body.appendChild(s);
            `
          }}
        />
      </body>
    </html>
  );
}