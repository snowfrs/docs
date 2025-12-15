
"use client";
import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Comments() {
    const { theme, resolvedTheme } = useTheme();
    // Ensure we have a theme value to avoid hydration mismatch
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="mt-16">
            <Giscus
                id="comments"
                repo="snowfrs/docs"
                repoId="R_kgDOQnPUdw"
                category="General"
                categoryId="DIC_kwDOQnPUd84CzzS6"
                mapping="title"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="bottom"
                theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
                lang="en"
                loading="lazy"
            />
        </div>
    );
}
