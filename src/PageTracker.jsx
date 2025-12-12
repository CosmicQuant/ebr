import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * PageTracker component - Tracks page views with Google Analytics
 * Works with react-router-dom HashRouter
 */
export const PageTracker = () => {
    const location = useLocation();

    useEffect(() => {
        // Check if gtag is available (loaded from index.html script)
        if (typeof window.gtag !== 'undefined') {
            // Send page_view event to Google Analytics
            window.gtag('event', 'page_view', {
                page_path: location.pathname + location.hash,
                page_location: window.location.href,
                page_title: document.title
            });

            console.log('📊 Google Analytics: Page view tracked', {
                path: location.pathname,
                hash: location.hash,
                url: window.location.href
            });
        } else {
            console.info('ℹ️ Google Analytics not active (gtag not found)');
        }
    }, [location]); // Track whenever location changes

    return null; // This component doesn't render anything
};
