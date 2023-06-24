const faceColor = document.getElementById('face-color');
const borderColor = document.getElementById('border-color');
const lineColor = document.getElementById('line-color');
const largeHandColor = document.getElementById('large-hand-color');
const hrHandColor = document.getElementById('hr-hand-color');
const secHandColor = document.getElementById('sec-hand-color');
const canvas = document.getElementById('canvas');

if (getItemsFromStorage('faceColor')) {
    faceColor.value = getItemsFromStorage('faceColor');
}
if (getItemsFromStorage('borderColor')) {
    borderColor.value = getItemsFromStorage('borderColor');
}
if (getItemsFromStorage('lineColor')) {
    lineColor.value = getItemsFromStorage('lineColor');
}
if (getItemsFromStorage('largeHandCol')) {
    largeHandCol.value = getItemsFromStorage('largeHandCol');
}
if (getItemsFromStorage('secHandColor')) {
    secHandColor.value = getItemsFromStorage('secHandColor');
}

function clock() {
    const now = new Date();   
    const ctx = canvas.getContext('2d');

    // Setup Canvas
    ctx.save(); // Save the default state
    ctx.clearRect(0, 0, 500, 500); //start top corner full width and height
    ctx.translate(250, 250); // puts 0,0 in the middle
    ctx.rotate(-Math.PI / 2); // Rotate cloack -90 deg

    // Set styles
    ctx.strokeStyle = '#000000';
    ctx.fillStyle = '#f4f4f4';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';

    // Draw clock face /border
    ctx.save();
    ctx.beginPath(); // Call this before anything
    ctx.lineWidth = 14;
    ctx.strokeStyle = borderColor.value;
    ctx.fillStyle = faceColor.value;
    ctx.arc(0, 0, 142, 0, Math.PI * 2, true); // Draw circle
    ctx.stroke();
    ctx.fill();
    ctx.restore();

    // Draw hour lines
    ctx.save();
    for (let i = 0;i < 12; i++) {
        ctx.beginPath();
        ctx.rotate(Math.PI / 6);
        ctx.moveTo(100, 0);
        ctx.lineTo(120, 0);
        ctx.strokeStyle = lineColor.value;
        ctx.stroke();
    }
    ctx.restore();

    // Draw minute lines
    ctx.save();
    ctx.lineWidth = 2;
    for (let i = 0;i < 60; i++) {
        if (i % 5 !== 0 ) {
            ctx.beginPath();          
            ctx.moveTo(117, 0);
            ctx.lineTo(120, 0);
            ctx.strokeStyle = lineColor.value;
            ctx.stroke();
        }   
        ctx.rotate(Math.PI / 30);
    }
    ctx.restore();

    // Get Current time
    const hr = now.getHours() % 12;
    const min = now.getMinutes();
    const sec = now.getSeconds();

    // console.log(`thie this is ${hr}:${min}:${sec}`);

    // Draw hour hands
    ctx.save();
    ctx.rotate((Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) *sec);
    ctx.strokeStyle = largeHandColor.value;
    ctx.lineWidth = 14;
    ctx.beginPath()
    ctx.moveTo(-20, 0);
    ctx.lineTo(80, 0);
    ctx.stroke()
    ctx.restore();

    // Draw minute hands
    ctx.save();
    ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
    ctx.strokeStyle = largeHandColor.value;
    ctx.lineWidth = 10;
    ctx.beginPath()
    ctx.moveTo(-28, 0);
    ctx.lineTo(112, 0);
    ctx.stroke()
    ctx.restore();

    // Draw second hand
    ctx.save();
    ctx.rotate(( sec * Math.PI / 30));
    ctx.strokeStyle = secHandColor.value;
    ctx.fillStyle = secHandColor.value;
    ctx.lineWidth = 6;
    ctx.beginPath()
    ctx.moveTo(-30, 0);
    ctx.lineTo(100, 0);
    ctx.stroke()
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();

    ctx.restore(); // restore default state

    requestAnimationFrame(clock);
}

requestAnimationFrame(clock);

document.getElementById('save-btn').addEventListener('click', () => {
    const dataURL = canvas.toDataURL('images/png');
    const link = document.createElement('a');
    link.download = 'clock.png';
    link.href = dataURL;
    link.click();
});

function getItemsFromStorage(item) {
    let itemsFromStorage;

    if (localStorage.getItem(item) === null) {
        itemsFromStorage = '';
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem(item));
    }
    return itemsFromStorage;
}

function setItemsToStorage(item, value) {
    let itemsFromStorage = getItemsFromStorage(item);

    itemsFromStorage = value;

    localStorage.setItem(item, JSON.stringify(itemsFromStorage));
}

document.getElementById('save-btn').addEventListener('click', () => {
    localStorage.clear();
});

faceColor.addEventListener('input', (e) => {
    setItemsToStorage('faceColor', e.target.value);
});
borderColor.addEventListener('input', (e) => {
    setItemsToStorage('borderColor', e.target.value);
});
lineColor.addEventListener('input', (e) => {
    setItemsToStorage('lineColor', e.target.value);
});
largeHandColor.addEventListener('input', (e) => {
    setItemsToStorage('largeHandColor', e.target.value);
});
secHandColor.addEventListener('input', (e) => {
    setItemsToStorage('secHandColor', e.target.value);
});