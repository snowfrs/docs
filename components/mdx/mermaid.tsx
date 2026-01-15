'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { RefreshCcw } from 'lucide-react';

// Initialize mermaid with improved font sizes
mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    suppressErrorRendering: true,
    fontSize: 16,
    flowchart: {
        htmlLabels: true,
        curve: 'basis',
        nodeSpacing: 50,
        rankSpacing: 50,
    },
    themeVariables: {
        fontSize: '16px',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    },
});

export function Mermaid({ code }: { code: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (ref.current) {
            mermaid
                .render('mermaid-' + Math.random().toString(36).substr(2, 9), code)
                .then(({ svg }) => {
                    setSvg(svg);
                    setError(false);
                })
                .catch((e) => {
                    console.error(e);
                    setError(true);
                });
        }
    }, [code]);

    if (error) {
        return (
            <div className="p-4 border border-red-500 rounded-lg bg-red-50 dark:bg-red-950/20 text-red-600">
                <p className="flex items-center gap-2 font-medium">
                    <RefreshCcw className="w-4 h-4" /> Failed to render diagram
                </p>
                <pre className="mt-2 text-xs overflow-auto">{code}</pre>
            </div>
        );
    }

    return (
        <div
            ref={ref}
            className="mermaid flex justify-center p-4 my-4 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800"
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}
