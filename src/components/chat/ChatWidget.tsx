import { useEffect } from 'react';

declare global {
  interface Window {
    difyChatbotConfig: {
      token: string;
      baseUrl: string;
    };
  }
}

export function ChatWidget() {
  useEffect(() => {
    // Configure Dify
    window.difyChatbotConfig = {
      token: 'LGUDHR9RziY4m8r3',
      baseUrl: 'https://lyson-dify.zeabur.app'
    };

    // Load Dify script
    const script = document.createElement('script');
    script.src = 'https://lyson-dify.zeabur.app/embed.min.js';
    script.id = 'LGUDHR9RziY4m8r3';
    script.defer = true;
    document.body.appendChild(script);

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      #dify-chatbot-bubble-button {
        background-color: #1C64F2 !important;
      }
      #dify-chatbot-bubble-window {
        width: 24rem !important;
        height: 40rem !important;
      }
    `;
    document.head.appendChild(style);

    // Cleanup
    return () => {
      document.body.removeChild(script);
      document.head.removeChild(style);
    };
  }, []);

  return null;
}