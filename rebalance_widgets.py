import os

path = '/home/gus/.gemini/antigravity/scratch/chesstricks/index.html'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# I will find the whole side-widgets area and replace it
import re

pattern = r'<!-- SIDE WIDGETS LEFT -->.*?<!-- SIDE WIDGETS RIGHT -->.*?</div>\s+</div>'
# This might be tricky. Let's use a more specific search.

# I'll just rewrite the whole section from line 1068 down to the end of the second column.

new_widgets_html = """                <!-- SIDE WIDGETS LEFT -->
                <div class="side-widgets-column left mobile-only">
                    <!-- COACH -->
                    <div class="widget-group" id="widget-group-coach">
                        <button class="widget-btn" onclick="toggleWidget('coach')">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                            COACH
                        </button>
                        <div class="widget-expandable-content" id="content-coach">
                            <div id="mobile-coach-logs" class="coach-stable-container"></div>
                        </div>
                    </div>

                    <!-- MAESTRO -->
                    <div class="widget-group" id="widget-group-maestro">
                        <button class="widget-btn" onclick="toggleWidget('maestro')">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z"/></svg>
                            MAESTRO
                        </button>
                        <div class="widget-expandable-content" id="content-maestro">
                            <div id="mobile-maestro-opening" class="maestro-mini-val">--</div>
                        </div>
                    </div>

                    <!-- EVAL -->
                    <div class="widget-group" id="widget-group-eval">
                        <button class="widget-btn" onclick="toggleWidget('eval')">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                            EVAL
                        </button>
                        <div class="widget-expandable-content" id="content-eval">
                            <div class="eval-mini-row">
                                <span id="mobile-eval-text">0.0</span>
                                <span id="mobile-accuracy" class="acc-mini">--%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- SIDE WIDGETS RIGHT -->
                <div class="side-widgets-column right mobile-only">
                    <!-- JUGADAS -->
                    <div class="widget-group" id="widget-group-moves">
                        <button class="widget-btn" onclick="toggleWidget('moves')">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                            JUGADAS
                        </button>
                        <div class="widget-expandable-content" id="content-moves">
                            <div id="mobile-best-moves" class="moves-list-mini"></div>
                        </div>
                    </div>

                    <!-- VISTA -->
                    <div class="widget-group" id="widget-group-vista">
                        <button class="widget-btn" id="mobile-pill-best-move" onclick="toggleBestMovesGlobal()">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                            VISTA
                        </button>
                    </div>

                    <!-- LOGS -->
                    <div class="widget-group logs-group" id="widget-group-logs">
                        <div class="widget-expandable-content logs-content" id="logs-line">
                            <span class="logs-placeholder">Historial vacio</span>
                        </div>
                        <button class="widget-btn" onclick="toggleLogsWidget()">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
                            LOGS
                        </button>
                    </div>

                    <!-- AMENAZAS (Alert Widget) -->
                    <div class="widget-group threats-widget" id="widget-group-threats" style="display:none;">
                         <button class="widget-btn btn-threats" id="btn-threats-alert" onclick="toggleWidget('threats')">
                             <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                 <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                             </svg>
                             AMENAZA
                         </button>
                         <div class="widget-expandable-content threats-content" id="content-threats">
                             <div id="mobile-threats-list-modular">Ninguna</div>
                         </div>
                    </div>
                </div>"""

# Find the start point
start_tag = '<!-- MODULAR GAME WIDGETS -->'
end_tag = '<div class="player-top">'

start_idx = content.find(start_tag) + len(start_tag)
end_idx = content.find(end_tag)

if start_idx > len(start_tag)-1 and end_idx > -1:
    new_content = content[:start_idx] + "\\n" + new_widgets_html + "\\n\\n                " + content[end_idx:]
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Success balance")
else:
    print(f"Tags not found: {start_idx}, {end_idx}")
