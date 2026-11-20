const DOTS_ICON = `
<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="12" cy="5" r="1.75" />
    <circle cx="12" cy="12" r="1.75" />
    <circle cx="12" cy="19" r="1.75" />
</svg>`;

const CHECK_ICON = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
</svg>`;

async function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
    }

    const input = document.createElement('textarea');
    input.value = text;
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
}

// Share page button
const shareBtn = document.getElementById('sharePageBtn');
const shareLabel = document.getElementById('sharePageLabel');
let shareTimer = null;

if (shareBtn && shareLabel) {
    shareBtn.addEventListener('click', async () => {
        try {
            await copyToClipboard(window.location.href);
            shareLabel.textContent = 'Tersalin!';
            clearTimeout(shareTimer);
            shareTimer = setTimeout(() => {
                shareLabel.textContent = 'Bagikan';
            }, 1800);
        } catch {
            // Ignore clipboard errors
        }
    });
}

// Copy individual link buttons
document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.innerHTML = DOTS_ICON;
    let timer = null;

    btn.addEventListener('click', async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const url = btn.getAttribute('data-copy-url');
        if (!url) return;

        try {
            await copyToClipboard(url);
            btn.innerHTML = CHECK_ICON;
            btn.classList.add('copied');
            clearTimeout(timer);
            timer = setTimeout(() => {
                btn.innerHTML = DOTS_ICON;
                btn.classList.remove('copied');
            }, 1800);
        } catch {
            // Ignore clipboard errors
        }
    });
});
