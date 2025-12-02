import { useCallback } from 'react';

export interface PrintStyle {
  padding?: string;
  maxWidth?: string;
  maxHeight?: string;
  background?: string;
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

interface PrintConfig extends PrintStyle {
  printDelay?: number;
  cleanupDelay?: number;
}

const DEFAULT_STYLE: Required<PrintStyle> = {
  padding: '20px',
  fit: 'contain',
  maxWidth: '100%',
  maxHeight: '100%',
  background: '#fff',
};

const DEFAULT_CONFIG: Required<PrintConfig> = {
  ...DEFAULT_STYLE,
  printDelay: 150,
  cleanupDelay: 10000,
};

export const usePrint = () => {
  const createPrintHTML = (src: string, style: PrintStyle = {}): string => {
    const { padding, fit, maxWidth, maxHeight, background } = { ...DEFAULT_STYLE, ...style };

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            html, body {
              width: 100%;
              height: 100%;
              background: ${background};
              display: flex;
              align-items: center;
              justify-content: center;
              padding: ${padding};
            }
            img {
              max-width: ${maxWidth};
              max-height: ${maxHeight};
              object-fit: ${fit};
            }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>
          <img src="${src}" alt="Print document">
        </body>
      </html>
    `;
  };

  const printInBlank = useCallback((src: string, style: PrintStyle = {}) => {
    const windowRef = window.open('', '_blank', 'width=800,height=600');

    if (!windowRef) {
      return alert('Pəncərə bloklanıb. Çap üçün pop-uplara icazə verin.');
    }

    const html = createPrintHTML(src, style);
    const { printDelay = DEFAULT_CONFIG.printDelay } = style as PrintConfig;

    windowRef.document.write(html);
    windowRef.document.close();

    windowRef.document.querySelector('img')?.addEventListener('load', () => {
      setTimeout(() => {
        windowRef.print();
        windowRef.close();
      }, printDelay);
    });
  }, []);

  const printInCurrent = useCallback((src: string, style: PrintStyle = {}) => {
    const iframe = document.createElement('iframe');

    Object.assign(iframe.style, {
      position: 'fixed',
      right: '0',
      bottom: '0',
      width: '0',
      height: '0',
      border: '0',
      opacity: '0',
      pointerEvents: 'none',
    });

    document.body.appendChild(iframe);

    const html = createPrintHTML(src, style);
    const { printDelay = DEFAULT_CONFIG.printDelay, cleanupDelay = DEFAULT_CONFIG.cleanupDelay } =
      style as PrintConfig;

    const iframeDoc = iframe.contentDocument!;
    iframeDoc.open();
    iframeDoc.write(html);
    iframeDoc.close();

    const cleanup = () => {
      iframe.contentWindow?.removeEventListener('afterprint', cleanup);
      iframe.remove();
    };

    iframe.contentWindow?.addEventListener('afterprint', cleanup);
    iframe.contentWindow?.addEventListener('load', () => {
      setTimeout(() => {
        iframe.contentWindow?.print();
      }, printDelay);
    });

    setTimeout(cleanup, cleanupDelay);
  }, []);

  return { printInBlank, printInCurrent };
};
