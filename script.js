const card = document.getElementById('valentineCard');
const lid = document.getElementById('cardLid');
const categories = document.getElementById('categorySection');

if (card && lid && categories) {
    lid.addEventListener('click', () => {
        card.classList.add('open');
        setTimeout(() => categories.classList.add('show'), 500);
    }, { once: true });
}

const flowerCanvas = document.getElementById('flowerCanvas');
if (flowerCanvas) {
    const ctx = flowerCanvas.getContext('2d');
    let drawing = false;

    const fixPosition = (event) => {
        const rect = flowerCanvas.getBoundingClientRect();
        const source = event.touches ? event.touches[0] : event;
        return {
            x: source.clientX - rect.left,
            y: source.clientY - rect.top
        };
    };

    const start = (event) => {
        drawing = true;
        const { x, y } = fixPosition(event);
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const draw = (event) => {
        if (!drawing) return;
        event.preventDefault();
        const { x, y } = fixPosition(event);
        ctx.strokeStyle = '#c62672';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stop = () => {
        drawing = false;
    };

    ['mousedown', 'touchstart'].forEach((type) => flowerCanvas.addEventListener(type, start));
    ['mousemove', 'touchmove'].forEach((type) => flowerCanvas.addEventListener(type, draw, { passive: false }));
    ['mouseup', 'mouseleave', 'touchend'].forEach((type) => flowerCanvas.addEventListener(type, stop));
}
