import re

# Read the HTML file
with open('/home/gus/.gemini/antigravity/scratch/chesstricks/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the board-layout div and insert the new structure
# We'll replace everything from "<!-- MODULAR GAME WIDGETS -->" to just before "<div class=\"player-top\">"

new_widgets_structure = """                <!-- LOGS BAR (Top of board) -->
                <div class="mobile-logs-top-bar mobile-only">
                    <div class="logs-bar-content" id="logs-line-top">
                        <span class="logs-placeholder">Historial vacío</span>
                    </div>
                    <button class="btn-info-modal" onclick="openMobileInfo()">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                        </svg>
                        INFO
                    </button>
                </div>

                <!-- SIDE WIDGETS LEFT -->
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
                </div>

"""

# Find and replace the widgets section
start_marker = "<!-- MODULAR GAME WIDGETS -->"
end_marker = "<div class=\"player-top\">"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + new_widgets_structure + "                " + content[end_idx:]
    
    with open('/home/gus/.gemini/antigravity/scratch/chesstricks/index.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("✓ Widgets restructured successfully")
else:
    print("✗ Could not find markers")
