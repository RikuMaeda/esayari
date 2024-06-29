export class Goldfish {
    constructor(x, y, size, speed, maxSpeed, minSpeed, angle, angleChange, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.maxSpeed = maxSpeed;
        this.minSpeed = minSpeed;
        this.angle = angle;
        this.angleChange = angleChange;
        this.color = color;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
    
        this.drawBody(ctx);
        this.drawTail(ctx);
        this.drawFins(ctx);
        this.drawScales(ctx);
        this.drawEye(ctx);
    
        ctx.restore();
    }
    
    drawBody(ctx) {
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
        gradient.addColorStop(0, this.color === 'black' ? '#000' : '#FFA500');
        gradient.addColorStop(0.6, this.color === 'black' ? '#333' : '#FF4500');
        gradient.addColorStop(1, this.color === 'black' ? '#666' : '#8B0000');
    
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(this.size, 0);
        ctx.bezierCurveTo(
            this.size, -this.size * 0.5,
            -this.size * 0.5, -this.size * 0.7,
            -this.size * 0.8, 0
        );
        ctx.bezierCurveTo(
            -this.size * 0.5, this.size * 0.7,
            this.size, this.size * 0.5,
            this.size, 0
        );
        ctx.fill();
    }
    
    drawTail(ctx) {
        const gradient = ctx.createLinearGradient(-this.size, 0, -this.size * 2, 0);
        gradient.addColorStop(0, this.color === 'black' ? '#333' : '#FF6347');
        gradient.addColorStop(1, this.color === 'black' ? '#666' : '#FF8C00');
    
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(-this.size * 0.8, 0);
    
        // 上部の尾びれ
        for (let i = 0; i < 10; i++) {
            const t = i / 10;
            const x = -this.size * (0.8 + t * 1.2);
            const y = -this.size * (0.6 * Math.sin(t * Math.PI) + 0.1 * Math.sin(t * Math.PI * 10));
            ctx.lineTo(x, y);
        }
    
        // くびれ
        ctx.lineTo(-this.size * 2, -this.size * 0.1);
        ctx.lineTo(-this.size * 1.8, 0);
        ctx.lineTo(-this.size * 2, this.size * 0.1);
    
        // 下部の尾びれ
        for (let i = 10; i >= 0; i--) {
            const t = i / 10;
            const x = -this.size * (0.8 + t * 1.2);
            const y = this.size * (0.6 * Math.sin(t * Math.PI) + 0.1 * Math.sin(t * Math.PI * 10));
            ctx.lineTo(x, y);
        }
    
        ctx.closePath();
        ctx.fill();
    
        // 尾びれの筋を描く
        ctx.strokeStyle = this.color === 'black' ? 'rgba(51, 51, 51, 0.5)' : 'rgba(255, 99, 71, 0.5)';
        ctx.lineWidth = this.size * 0.02;
        for (let i = 1; i <= 5; i++) {
            ctx.beginPath();
            ctx.moveTo(-this.size * 0.8, 0);
            ctx.quadraticCurveTo(
                -this.size * (1.2 + i * 0.1),
                this.size * (0.3 - i * 0.1),
                -this.size * (1.8 + i * 0.04),
                0
            );
            ctx.quadraticCurveTo(
                -this.size * (1.2 + i * 0.1),
                -this.size * (0.3 - i * 0.1),
                -this.size * 0.8,
                0
            );
            ctx.stroke();
        }
    }
    
    drawFins(ctx) {
        ctx.fillStyle = this.color === 'black' ? '#333' : '#FF6347';
        
        // Top fin
        ctx.beginPath();
        ctx.moveTo(0, -this.size * 0.6);
        for (let i = 0; i < 10; i++) {
            const x = i * this.size * 0.1;
            const y = -this.size * 0.6 - Math.sin(i * 0.6) * this.size * 0.3;
            ctx.lineTo(x, y);
        }
        ctx.lineTo(this.size * 0.8, -this.size * 0.5);
        ctx.fill();
    
        // Side fin
        ctx.beginPath();
        ctx.moveTo(this.size * 0.3, this.size * 0.2);
        for (let i = 0; i < 5; i++) {
            const angle = Math.PI / 4 + (i / 5) * Math.PI / 2;
            ctx.lineTo(
                this.size * 0.3 + Math.cos(angle) * this.size * 0.4,
                this.size * 0.2 + Math.sin(angle) * this.size * 0.4
            );
        }
        ctx.fill();
    }
    
    drawScales(ctx) {
        ctx.fillStyle = this.color === 'black' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)';
        for (let i = -3; i < 4; i++) {
            for (let j = -2; j < 3; j++) {
                const x = i * this.size * 0.2;
                const y = j * this.size * 0.15;
                const size = this.size * 0.1 * (1 - Math.abs(i / 4));
    
                ctx.beginPath();
                ctx.moveTo(x - size, y);
                ctx.bezierCurveTo(
                    x - size, y - size * 2,
                    x + size, y - size * 2,
                    x + size, y
                );
                ctx.fill();
            }
        }
    }
    
    drawEye(ctx) {
        // Eye white
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.ellipse(this.size * 0.7, -this.size * 0.1, this.size * 0.1, this.size * 0.08, 0, 0, Math.PI * 2);
        ctx.fill();
    
        // Iris
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.ellipse(this.size * 0.73, -this.size * 0.1, this.size * 0.06, this.size * 0.05, 0, 0, Math.PI * 2);
        ctx.fill();
    
        // Eye highlight
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.ellipse(this.size * 0.75, -this.size * 0.12, this.size * 0.02, this.size * 0.01, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
    }

    update(bait, canvas) {
        if (bait.x !== null && bait.y !== null) {
            // 餌の位置に向かって移動する
            const dx = bait.x - this.x;
            const dy = bait.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // 餌に近づく
            if (distance > 1) {
                this.angle = Math.atan2(dy, dx);
                this.dx = this.speed * Math.cos(this.angle);
                this.dy = this.speed * Math.sin(this.angle);

                this.x += this.dx;
                this.y += this.dy;
            }

            // 餌を食べたかどうかの判定
            if (distance < this.size) {
                bait.x = null;
                bait.y = null;
            }
        } else {
            // ランダムな動き
            this.angle += (Math.random() - 0.5) * this.angleChange;
            this.dx = this.speed * Math.cos(this.angle);
            this.dy = this.speed * Math.sin(this.angle);

            this.x += this.dx;
            this.y += this.dy;

        // 壁にぶつかったら方向を変える
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.angle = Math.PI - this.angle;
            this.x = Math.max(this.size, Math.min(canvas.width - this.size, this.x));
        }
        if (this.y + this.size / 2 > canvas.height || this.y - this.size / 2 < 0) {
            this.angle = -this.angle;
            this.y = Math.max(this.size / 2, Math.min(canvas.height - this.size / 2, this.y));
        }

        // 速度をランダムに変更
        this.speed += (Math.random() - 0.5) * 0.1 - 1;
        if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;
        if (this.speed < this.minSpeed) this.speed = this.minSpeed;
    }
    }
}