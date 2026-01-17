export default class Chat {
    constructor() {
        this.messages = [
            { sender: 'System', text: 'Bienvenido al chat de ChessDrez', type: 'system' }
        ];
    }

    render() {
        const container = document.createElement('div');
        container.className = 'chat-panel';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.height = '300px'; // Fixed height for now or flex grow
        container.style.background = 'var(--bg-surface)';
        container.style.borderRadius = '8px';
        container.style.overflow = 'hidden';

        // Header
        const header = document.createElement('div');
        header.style.padding = '10px';
        header.style.background = 'rgba(0,0,0,0.2)';
        header.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
        header.innerHTML = '<span style="font-weight:600; font-size:12px;">Chat de Partida</span>';
        container.appendChild(header);

        // Messages Area
        const msgList = document.createElement('div');
        msgList.style.flex = '1';
        msgList.style.overflowY = 'auto';
        msgList.style.padding = '10px';
        msgList.style.display = 'flex';
        msgList.style.flexDirection = 'column';
        msgList.style.gap = '8px';

        this.messages.forEach(msg => {
            const el = document.createElement('div');
            el.style.fontSize = '12px';
            if (msg.type === 'system') {
                el.style.color = 'var(--text-secondary)';
                el.style.textAlign = 'center';
                el.style.fontStyle = 'italic';
            } else {
                el.style.color = 'var(--text-primary)';
            }
            el.innerText = msg.type === 'system' ? msg.text : `${msg.sender}: ${msg.text}`;
            msgList.appendChild(el);
        });
        container.appendChild(msgList);

        // Input Area
        const inputArea = document.createElement('div');
        inputArea.style.padding = '10px';
        inputArea.style.display = 'flex';
        inputArea.style.gap = '5px';
        inputArea.style.borderTop = '1px solid rgba(255,255,255,0.05)';

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Escribe un mensaje...';
        input.style.flex = '1';
        input.style.padding = '8px';
        input.style.borderRadius = '4px';
        input.style.border = '1px solid #444';
        input.style.background = '#222';
        input.style.color = 'white';
        input.style.fontSize = '12px';

        const sendBtn = document.createElement('button');
        sendBtn.innerHTML = '📤';
        sendBtn.className = 'btn btn-primary';
        sendBtn.style.padding = '0 10px';

        inputArea.appendChild(input);
        inputArea.appendChild(sendBtn);
        container.appendChild(inputArea);

        return container;
    }
}
