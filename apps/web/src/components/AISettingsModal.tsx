import React from 'react';
import { Settings, X } from 'lucide-react';

interface AISettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    provider: string;
    apiKey: string;
    onSave: (provider: string, key: string) => void;
    setProvider: (p: string) => void;
    setApiKey: (k: string) => void;
}

const AISettingsModal: React.FC<AISettingsModalProps> = ({
    isOpen,
    onClose,
    provider,
    apiKey,
    onSave,
    setProvider,
    setApiKey
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-[#1e293b] w-full max-w-md rounded-2xl border border-white/10 p-6 shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-sm font-black tracking-widest uppercase flex items-center gap-3">
                        <Settings size={18} className="text-[var(--primary)]" /> CONFIGURAR IA
                    </h3>
                    <button onClick={onClose} className="text-[var(--text-muted)] hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Proveedor</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['openai', 'claude', 'perplexity'].map(p => (
                                <button
                                    key={p}
                                    onClick={() => setProvider(p)}
                                    className={`py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${provider === p ? 'bg-[var(--primary)]/20 border-[var(--primary)] text-[var(--primary)]' : 'bg-white/5 border-white/5 text-[var(--text-muted)]'}`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Tu API Key (Local)</label>
                        <input
                            type="password"
                            placeholder="sk-..."
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 outline-none focus:border-[var(--primary)]/50 transition-all text-xs font-mono"
                        />
                        <p className="text-[9px] text-[var(--text-dim)] italic mt-1">
                            Nota: Tu clave se guarda solo en tu navegador y se usa solo para tus peticiones.
                        </p>
                    </div>

                    <button
                        onClick={() => onSave(provider, apiKey)}
                        className="w-full btn-primary !py-3 rounded-xl font-black text-[10px] tracking-[0.2em] uppercase mt-2"
                    >
                        GUARDAR CONFIGURACIÓN
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AISettingsModal;
