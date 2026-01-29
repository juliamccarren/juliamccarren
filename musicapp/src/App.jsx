import { useState, useMemo, useEffect } from 'react';
import { SONGS } from './data/songs';

// --- ICONS ---
const IconSearch = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);
const IconMusic = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
);
const IconInfo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
);
const IconChevronRight = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
);
const IconDisc = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
);
const IconLanguages = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>
);

// --- SUB-KOMPONENTEN ---
const SongCard = ({ song, onClick }) => (
    <div 
        onClick={onClick}
        className="group relative bg-slate-900/40 backdrop-blur-md border border-slate-700/50 p-6 rounded-2xl cursor-pointer hover:bg-slate-800/60 transition-all duration-300 hover:scale-[1.02] flex flex-col h-full shadow-lg"
    >
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-cyan-500/10 rounded-xl group-hover:bg-cyan-500/20 transition-colors">
                <IconDisc className="w-6 h-6 text-cyan-400 animate-pulse" />
            </div>
            <div className="flex gap-2">
                {song.tags.slice(0, 1).map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider font-bold bg-slate-800 text-slate-400 px-2 py-1 rounded">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{song.title}</h3>
        <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed">{song.background}</p>
    </div>
);

const DetailView = ({ song, onBack }) => {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            <button onClick={onBack} className="flex items-center text-slate-400 hover:text-white mb-8 transition-colors group">
                <IconChevronRight className="w-5 h-5 rotate-180 mr-2" />
                Back to Archive
            </button>
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl">
                <div className="h-48 bg-gradient-to-r from-cyan-600/20 via-purple-600/20 to-blue-600/20 flex items-center justify-center border-b border-slate-700/50">
                    <IconDisc className="w-24 h-24 text-cyan-400/30 animate-spin-slow" />
                </div>
                <div className="p-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {song.tags.map(tag => (
                            <span key={tag} className="text-xs font-bold px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full">{tag}</span>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6">{song.title}</h1>
                    <div className="space-y-8">
                        <section>
                            <h2 className="flex items-center text-xl font-semibold text-slate-200 mb-4">
                                <IconInfo />
                                <span className="ml-2">Background</span>
                            </h2>
                            <div className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700/50 text-slate-300 italic">"{song.background}"</div>
                        </section>
                        <div className="pt-6 border-t border-slate-700/50">
                            <a 
                                href={song.driveUrl || "#"} 
                                target={song.driveUrl ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                className={`flex items-center justify-center w-full px-8 py-4 font-bold rounded-2xl shadow-lg transition-all transform hover:scale-[1.01] ${song.driveUrl ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-900' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
                                onClick={(e) => { if(!song.driveUrl) e.preventDefault(); }}
                            >
                                <IconMusic />
                                <span className="ml-2">{song.driveUrl ? 'Listen on Google Drive' : 'Link not yet available'}</span>
                            </a>
                        </div>                                
                        <section>
                            <h2 className="flex items-center text-xl font-semibold text-slate-200 mb-4">
                                <IconLanguages />
                                <span className="ml-2">Lyrics</span>
                            </h2>
                            <div className="p-6 md:p-8 bg-slate-950/50 rounded-2xl border border-slate-800/50 text-slate-400 leading-relaxed font-mono whitespace-pre-wrap max-h-[400px] overflow-y-auto lyrics-scroll">
                                {song.lyrics || "Loading lyrics..."}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN APP ---
export default function App() {
    const [view, setView] = useState('archive');
    const [selectedSong, setSelectedSong] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredSongs = useMemo(() => {
        return SONGS.filter(song => {
            const matchesSearch = song.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                 song.background.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = activeFilter === 'All' || song.tags.includes(activeFilter);
            return matchesSearch && matchesFilter;
        });
    }, [searchTerm, activeFilter]);

    const filters = ['All', 'Good Enough', 'Cold', 'Personal', 'Energy', 'Relationship'];

    return (
        <div className="min-h-screen text-slate-100 selection:bg-cyan-500/30">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-cyan-500/10 blur-[120px] rounded-full opacity-50" />
                <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 blur-[120px] rounded-full opacity-30" />
            </div>

            {view === 'archive' ? (
                <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-20">
                    <header className="mb-16 text-center max-w-3xl mx-auto">
                        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-widest uppercase">
                            Julia McCarren Research Project
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-500">
                            Neural Fusion Archive
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Exploring the sophisticated boundaries of human-AI collaboration in music production 2026.
                        </p>
                    </header>

                    <div className="mb-12 space-y-6">
                        <div className="relative max-w-2xl mx-auto">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                                <IconSearch />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Search archive..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all backdrop-blur-sm"
                            />
                        </div>
                        <div className="flex flex-wrap justify-center gap-2">
                            {filters.map(f => (
                                <button 
                                    key={f} 
                                    onClick={() => setActiveFilter(f)} 
                                    className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${activeFilter === f ? 'bg-white text-slate-900 shadow-lg' : 'bg-slate-900/40 text-slate-400 border border-slate-700/50 hover:bg-slate-800'}`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSongs.map(s => <SongCard key={s.id} song={s} onClick={() => { setSelectedSong(s); setView('detail'); }} />)}
                    </div>
                    
                    <footer className="mt-20 pt-10 border-t border-slate-800/50 text-center text-slate-500 text-sm">
                        &copy; 2026 Julia McCarren &bull; Neural Fusion Music Collective
                    </footer>
                </div>
            ) : (
                <DetailView song={selectedSong} onBack={() => setView('archive')} />
            )}
        </div>
    );
}