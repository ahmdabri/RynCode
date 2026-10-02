import React from 'react';
import { useSettings } from '../../hooks/useSettings';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { data: settings } = useSettings();
  const wa = settings?.wa || '+62-8129-2711-935';
  const cleanWa = wa.replace(/[^0-9]/g, '');

  return (
    <div className="fixed bottom-5 right-5 z-40 md:hidden">
      <a
        href={`https://wa.me/${cleanWa}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp"
        className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-2xl hover:bg-emerald-400 transition-all transform hover:scale-105"
      >
        <MessageCircle className="h-4 w-4" />
        <span>Chat WhatsApp</span>
      </a>
    </div>
  );
};
