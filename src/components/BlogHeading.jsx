import React, { useEffect, useRef } from "react";
import light from "../images/blog/ligth.png";
import { useNavigate } from "react-router-dom";

const BlogHeading = () => {
    const canvasRef = useRef(null);
    const navigate = useNavigate();


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const width = window.innerWidth;
        const height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        class Vector {
            constructor(x, y) {
                this.x = x;
                this.y = y;
            }
            add(v) {
                this.x += v.x;
                this.y += v.y;
            }
            sub(v) {
                this.x -= v.x;
                this.y -= v.y;
            }
            mult(scalar) {
                this.x *= scalar;
                this.y *= scalar;
            }
            set(x, y) {
                this.x = x;
                this.y = y;
            }
            dist(v) {
                return Math.hypot(this.x - v.x, this.y - v.y);
            }
        }

        class Mouse {
            constructor() {
                this.pos = new Vector(-1000, -1000);
                this.radius = 60;

                window.addEventListener("mousemove", (e) => {
                    this.pos.set(e.clientX, e.clientY);
                });

                window.addEventListener("mouseleave", () => {
                    this.pos.set(-1000, -1000);
                });
            }
        }

        class Dot {
            constructor(x, y) {
                this.pos = new Vector(x, y);
                this.oldPos = new Vector(x, y);
                this.pinned = false;
                this.gravity = new Vector(0, 0.5);
                this.friction = 0.98;
                this.radius = 2;
            }

            update(mouse) {
                if (this.pinned) return;

                let vel = new Vector(
                    this.pos.x - this.oldPos.x,
                    this.pos.y - this.oldPos.y
                );
                this.oldPos.set(this.pos.x, this.pos.y);

                vel.mult(this.friction);
                vel.add(this.gravity);
                this.pos.add(vel);

                let dist = this.pos.dist(mouse.pos);
                if (dist < mouse.radius) {
                    let direction = new Vector(
                        this.pos.x - mouse.pos.x,
                        this.pos.y - mouse.pos.y
                    );
                    direction.mult(1 / dist);
                    direction.mult((mouse.radius - dist) * 0.2);
                    this.pos.add(direction);
                }
            }

            draw(ctx) {
                ctx.beginPath();
                ctx.fillStyle = "#ffffff";
                ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        class Stick {
            constructor(p1, p2, length) {
                this.p1 = p1;
                this.p2 = p2;
                this.length = length;
            }

            update() {
                let dx = this.p2.pos.x - this.p1.pos.x;
                let dy = this.p2.pos.y - this.p1.pos.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let diff = (this.length - distance) / distance;
                let offsetX = diff * dx * 0.5;
                let offsetY = diff * dy * 0.5;

                if (!this.p1.pinned) {
                    this.p1.pos.x -= offsetX;
                    this.p1.pos.y -= offsetY;
                }
                if (!this.p2.pinned) {
                    this.p2.pos.x += offsetX;
                    this.p2.pos.y += offsetY;
                }
            }

            draw(ctx) {
                ctx.beginPath();
                ctx.strokeStyle = "#ffffff";
                ctx.moveTo(this.p1.pos.x, this.p1.pos.y);
                ctx.lineTo(this.p2.pos.x, this.p2.pos.y);
                ctx.stroke();
            }
        }

        class Rope {
            constructor(x, y, segments, spacing) {
                this.dots = [];
                this.sticks = [];

                for (let i = 0; i < segments; i++) {
                    this.dots.push(new Dot(x, y + i * spacing));
                }

                this.dots[0].pinned = true;

                for (let i = 0; i < this.dots.length - 1; i++) {
                    this.sticks.push(new Stick(this.dots[i], this.dots[i + 1], spacing));
                }
            }

            update(mouse) {
                for (let dot of this.dots) {
                    dot.update(mouse);
                }
                for (let i = 0; i < 5; i++) {
                    for (let stick of this.sticks) {
                        stick.update();
                    }
                }
            }

            draw(ctx) {
                for (let stick of this.sticks) {
                    stick.draw(ctx);
                }
                for (let dot of this.dots) {
                    dot.draw(ctx);
                }
            }

            getLastDot() {
                return this.dots[this.dots.length - 1];
            }

            getLastStick() {
                return this.sticks[this.sticks.length - 1];
            }
        }

        class App {
            constructor() {
                this.mouse = new Mouse();
                this.ropes = [];
                this.init();
                this.lightImage = new Image();
                this.lightImage.src = light;
                this.animate();
            }

            init() {
                const totalRopes = Math.floor(width / 15);
                const pattern = [4, 6, 8, 12, 10, 14, 10, 12, 8, 6, 4, 2, 8, 6]; // Small1 → Small2 → Small3 → Big → Small3 → Small2 → Small1

                for (let i = 0; i < totalRopes; i++) {
                    let x = (i / totalRopes) * width;
                    let segments = pattern[i % pattern.length]; // Cycle through the pattern
                    let rope = new Rope(x, 0, segments, 35);
                    this.ropes.push(rope);
                }
            }

            animate() {
                ctx.clearRect(0, 0, width, height);
                for (let rope of this.ropes) {
                    rope.update(this.mouse);
                    rope.draw(ctx);
                }

                this.drawLights();

                requestAnimationFrame(() => this.animate());
            }

            drawLights() {
                for (let rope of this.ropes) {
                    const lastDot = rope.getLastDot();
                    const lastStick = rope.getLastStick();

                    let dx = lastStick.p2.pos.x - lastStick.p1.pos.x;
                    let dy = lastStick.p2.pos.y - lastStick.p1.pos.y;
                    let angle = Math.atan2(dy, dx);

                    ctx.save();
                    ctx.translate(lastDot.pos.x, lastDot.pos.y);
                    ctx.rotate(angle);
                    ctx.drawImage(this.lightImage, -10, -10, 20, 20); // Light image with 20x20 size
                    ctx.restore();
                }
            }
        }

        new App();
    }, []);

    return (
        <div style={{ position: "relative", overflow: "hidden", width: "100%", height: "100vh" }}>
            <canvas ref={canvasRef} ></canvas>


            <div className="container">

                <h1 className="main-titlee">Product Development and Ideation Services</h1>
            </div>
            {/* <button className="connect-buttonn" onClick={() => navigate('/contact')}>
                <a href="/contact">Connect with Our Experts</a>
            </button> */}
        </div>
    );
};

export default BlogHeading;
