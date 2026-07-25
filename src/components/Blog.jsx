import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import { FadeIn } from "./FadeIn";
import { loadBlogEntryFromPath, defaultBlogEntries } from "./BlogDataLoader";

function Blog() {
  const [entries, setEntries] = useState([]);

  // Cargar entradas predeterminadas
  useEffect(() => {
    const loadEntries = async () => {
      const loadedEntries = [];

      // Cargar entradas predeterminadas
      for (const defaultEntry of defaultBlogEntries) {
        const entry = await loadBlogEntryFromPath(
          defaultEntry.path,
          defaultEntry.title
        );
        if (entry) {
          entry.slug = defaultEntry.slug;
          loadedEntries.push(entry);
        }
      }

      setEntries(loadedEntries);
    };

    loadEntries();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-8">
    <Container id="blog">
      <FadeIn>
        <div className="w-full">
          {/* Header Retro */}
          <div className="mb-12 text-center">
            <div className="inline-block border border-green-400/50 bg-black/80 px-8 py-4 mb-6">
              <h1 className="text-5xl font-bold tracking-tight mb-4 max-md:text-4xl text-green-400 font-mono animate-pulse">
                [BLOG TERMINAL]
              </h1>
              <div className="text-green-300 font-mono text-sm">
                <span className="animate-blink">_</span> ALL MY ARTICLES & TUTORIALS
              </div>
            </div>

            {/* ASCII Art Border */}
            <div className="text-green-400 font-mono text-xs mb-6 opacity-70">
              ╔══════════════════════════════════════════════════════════════════════════════╗<br/>
              ║                                                                              ║<br/>
              ╚══════════════════════════════════════════════════════════════════════════════╝
            </div>
          </div>

          {/* Articles Grid - Retro Terminal Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.length === 0 ? (
              <div className="col-span-full bg-black/90 border border-yellow-400/50 p-12 text-center shadow-lg shadow-yellow-400/20">
                <div className="text-yellow-400 font-mono text-lg mb-4">
                  [NO ARTICLES FOUND]
                </div>
                <p className="text-green-400 font-mono text-sm">
                  NO TUTORIALS AVAILABLE AT THIS TIME
                </p>
                <div className="text-green-300 font-mono text-xs mt-4 animate-pulse">
                  root@markh4ck:~/blog$ ls -la<br/>
                  total 0<br/>
                  drwxr-xr-x 2 root root 4096 Apr 16 09:16 .<br/>
                  drwxr-xr-x 3 root root 4096 Apr 16 09:16 ..<br/>
                  <span className="animate-blink">_</span>
                </div>
              </div>
            ) : (
              entries.map((entry) => (
                <div
                  key={entry.slug}
                  className="group bg-black/90 border border-green-400/50 rounded overflow-hidden hover:border-green-400 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/20"
                >
                  {/* Terminal Header */}
                  <div className="bg-green-900/30 px-4 py-2 border-b border-green-400/30">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-green-400 font-mono text-xs ml-2">
                        {entry.title}.html
                      </span>
                    </div>
                  </div>

                  <div className="p-6 pb-4">
                    <h3 className="text-xl font-bold mb-2 text-green-400 font-mono group-hover:text-green-300 transition-colors">
                      {entry.title}
                    </h3>
                    <p className="text-green-300 font-mono text-sm">
                      {entry.uploadDate}
                    </p>

                    {/* File Info */}
                    <div className="mt-4 text-green-400 font-mono text-xs opacity-70">
                      <div>Size: {entry.content.length} bytes</div>
                      <div>Type: HTML Document</div>
                      <div>Access: Public</div>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <Link
                      to={`/blog/${entry.slug}`}
                      className="w-full py-2 bg-green-900/30 hover:bg-green-800/50 text-green-400 font-mono text-sm rounded border border-green-400/50 transition-colors hover:shadow-lg hover:shadow-green-400/10 text-center block"
                    >
                      [READ ARTICLE]
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer ASCII */}
          <div className="mt-12 text-center">
            <div className="text-green-400 font-mono text-xs opacity-50">
              ╔══════════════════════════════════════════════════════════════════════════════╗<br/>
              ║                           MARKH4CK BLOG TERMINAL                           ║<br/>
              ║                          ALL RIGHTS RESERVED 2024                          ║<br/>
              ╚══════════════════════════════════════════════════════════════════════════════╝
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
    </div>
  );
}

export default Blog;
