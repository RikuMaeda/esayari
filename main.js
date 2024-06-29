import { Goldfish } from './goldfish.js';

const canvas = document.getElementById('goldfishCanvas');
const ctx = canvas.getContext('2d');

const numGoldfish = 15; // 金魚の数
const goldfishes = [];
let bait = { x: null, y: null }; // 餌の位置
let baitSpeed = 0.35; // 餌の沈む速度

// 背景を描画する
function drawBackground() {
    ctx.fillStyle = '#458299'; // 水色の背景
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 砂を追加
    ctx.fillStyle = '#CDBA96'; // 砂色の砂
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 50);
    ctx.lineTo(canvas.width, canvas.height - 50);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.fill();
}

// 金魚の初期化
for (let i = 0; i < numGoldfish; i++) {
    const size = 30;
    const x = Math.random() * (canvas.width - size * 2) + size;
    const y = Math.random() * (canvas.height - size) + size / 2;
    const speed = 0.5;
    const maxSpeed = 2;
    const minSpeed = 0.5;
    const angle = Math.random() * Math.PI * 2;
    const angleChange = 0.02;
    const color = Math.random() < 0.5 ? 'black' : 'orange'; // 色をランダムに決定
    goldfishes.push(new Goldfish(x, y, size, speed, maxSpeed, minSpeed, angle, angleChange, color));
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // キャンバスをクリア
    drawBackground(); // 背景を描画

    // 餌を描画し、沈む動きを追加
    if (bait.x !== null && bait.y !== null) {
        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.arc(bait.x, bait.y, 5, 0, Math.PI * 2);
        ctx.fill();

        // 餌を沈ませる
        bait.y += baitSpeed;

        // 餌が底に到達したら止める
        if (bait.y > canvas.height - 50) {
            bait.y = canvas.height - 50;
        }
    }

    // 各金魚を描画し、更新
    for (const goldfish of goldfishes) {
        goldfish.draw(ctx);
        goldfish.update(bait, canvas);
    }

    requestAnimationFrame(update);
}

// 餌を置くイベントリスナー
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    bait.x = event.clientX - rect.left;
    bait.y = event.clientY - rect.top;
});

update();
