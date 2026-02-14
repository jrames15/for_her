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
    const undoButton = document.getElementById('undoDrawing');
    const redoButton = document.getElementById('redoDrawing');
    const clearButton = document.getElementById('clearDrawing');
    let drawing = false;
    const undoStack = [];
    const redoStack = [];

    const fixPosition = (event) => {
        const rect = flowerCanvas.getBoundingClientRect();
        const source = event.touches ? event.touches[0] : event;
        return {
            x: source.clientX - rect.left,
            y: source.clientY - rect.top
        };
    };

    const snapshot = () => ctx.getImageData(0, 0, flowerCanvas.width, flowerCanvas.height);

    const restoreSnapshot = (imageData) => {
        ctx.clearRect(0, 0, flowerCanvas.width, flowerCanvas.height);
        ctx.putImageData(imageData, 0, 0);
    };

    const updateButtons = () => {
        if (undoButton) undoButton.disabled = undoStack.length === 0;
        if (redoButton) redoButton.disabled = redoStack.length === 0;
    };

    const start = (event) => {
        if (event.cancelable) {
            event.preventDefault();
        }
        undoStack.push(snapshot());
        redoStack.length = 0;
        updateButtons();
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

    const undo = () => {
        if (undoStack.length === 0) return;
        redoStack.push(snapshot());
        const previous = undoStack.pop();
        restoreSnapshot(previous);
        updateButtons();
    };

    const redo = () => {
        if (redoStack.length === 0) return;
        undoStack.push(snapshot());
        const next = redoStack.pop();
        restoreSnapshot(next);
        updateButtons();
    };

    const clear = () => {
        undoStack.push(snapshot());
        redoStack.length = 0;
        ctx.clearRect(0, 0, flowerCanvas.width, flowerCanvas.height);
        updateButtons();
    };

    ['mousedown', 'touchstart'].forEach((type) => flowerCanvas.addEventListener(type, start));
    ['mousemove', 'touchmove'].forEach((type) => flowerCanvas.addEventListener(type, draw, { passive: false }));
    ['mouseup', 'mouseleave', 'touchend', 'touchcancel'].forEach((type) => flowerCanvas.addEventListener(type, stop));

    if (undoButton) undoButton.addEventListener('click', undo);
    if (redoButton) redoButton.addEventListener('click', redo);
    if (clearButton) clearButton.addEventListener('click', clear);
    updateButtons();
}
