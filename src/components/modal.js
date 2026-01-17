export default class Modal {
    constructor(title, content) {
        this.title = title;
        this.content = content;
        this.overlay = null;
    }

    render() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'modal-overlay';

        const modal = document.createElement('div');
        modal.className = 'modal-content';

        const header = document.createElement('div');
        header.className = 'card-header';
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'center';
        header.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
        header.innerHTML = `<h3 style="margin:0">${this.title}</h3>`;

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.background = 'none';
        closeBtn.style.color = 'var(--text-secondary)';
        closeBtn.style.fontSize = '24px';
        closeBtn.style.padding = '0';
        closeBtn.style.lineHeight = '1';
        closeBtn.onclick = () => this.close();
        header.appendChild(closeBtn);

        const body = document.createElement('div');
        body.className = 'card-body';
        if (typeof this.content === 'string') {
            body.innerHTML = this.content;
        } else {
            body.appendChild(this.content);
        }

        modal.appendChild(header);
        modal.appendChild(body);
        this.overlay.appendChild(modal);

        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });

        document.body.appendChild(this.overlay);

        // Animframe to allow transition
        requestAnimationFrame(() => {
            this.overlay.classList.add('open');
        });
    }

    close() {
        if (this.overlay) {
            this.overlay.classList.remove('open');
            setTimeout(() => {
                if (this.overlay && this.overlay.parentNode) {
                    this.overlay.parentNode.removeChild(this.overlay);
                }
                this.overlay = null;
            }, 300); // match css transition
        }
    }
}
