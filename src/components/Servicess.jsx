import React, { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import Arrow from '../images/icon/Arrow.png'
import { useNavigate } from "react-router-dom";
const Servicess = () => {
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const largeHeaderRef = useRef(null);
    let width, height, ctx, points, target;
    let animateHeader = true;

    useEffect(() => {
        initHeader();
        initAnimation();
        addListeners();

        return () => {
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("scroll", scrollCheck);
            window.removeEventListener("resize", resize);
        };
    }, []);

    const initHeader = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        target = { x: width / 2, y: height / 2 };

        largeHeaderRef.current.style.height = `${height}px`;

        const canvas = canvasRef.current;
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext("2d");

        points = [];
        for (let x = 0; x < width; x += width / 20) {
            for (let y = 0; y < height; y += height / 20) {
                const px = x + Math.random() * width / 50;
                const py = y + Math.random() * height / 20;
                const p = { x: px, originX: px, y: py, originY: py };
                points.push(p);
            }
        }

        points.forEach((p1) => {
            let closest = [];
            points.forEach((p2) => {
                if (p1 !== p2) {
                    closest.push(p2);
                    closest.sort((a, b) => getDistance(p1, a) - getDistance(p1, b));
                    closest = closest.slice(0, 5);
                }
            });
            p1.closest = closest;
        });

        points.forEach((p) => {
            p.circle = new Circle(p, 2 + Math.random() * 4, "rgba(255,255,255,0.3)");
        });
    };

    const initAnimation = () => {
        animate();
        points.forEach((p) => shiftPoint(p));
    };

    const animate = () => {
        if (animateHeader) {
            ctx.clearRect(0, 0, width, height);
            points.forEach((p) => {
                if (Math.abs(getDistance(target, p)) < 4000) {
                    p.active = 0.3;
                    p.circle.active = 0.6;
                } else if (Math.abs(getDistance(target, p)) < 20000) {
                    p.active = 0.1;
                    p.circle.active = 0.3;
                } else if (Math.abs(getDistance(target, p)) < 40000) {
                    p.active = 0.02;
                    p.circle.active = 0.1;
                } else {
                    p.active = 0;
                    p.circle.active = 0;
                }

                drawLines(p);
                p.circle.draw();
            });
        }
        requestAnimationFrame(animate);
    };

    const shiftPoint = (p) => {
        gsap.to(p, {
            x: p.originX - 50 + Math.random() * 100,
            y: p.originY - 50 + Math.random() * 100,
            duration: 1 + Math.random(),
            ease: "power2.inOut",
            onComplete: () => shiftPoint(p),
        });
    };

    const drawLines = (p) => {
        if (!p.active) return;
        p.closest.forEach((c) => {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(c.x, c.y);
            ctx.strokeStyle = `rgba(156,217,249,${p.active})`;
            ctx.stroke();
        });
    };

    function Circle(pos, rad, color) {
        this.pos = pos;
        this.radius = rad;
        this.color = color;
        this.active = 0;

        this.draw = function () {
            if (!this.active) return;
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = `rgba(156,217,249,${this.active})`;
            ctx.fill();
        };
    }

    const getDistance = (p1, p2) => {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    };

    const mouseMove = useCallback((e) => {
        target.x = e.clientX || e.pageX;
        target.y = e.clientY || e.pageY;
    }, []);

    const scrollCheck = useCallback(() => {
        animateHeader = document.body.scrollTop <= height;
    }, []);

    const resize = useCallback(() => {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeaderRef.current.style.height = `${height}px`;
        canvasRef.current.width = width;
        canvasRef.current.height = height;
    }, []);

    const addListeners = () => {
        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("scroll", scrollCheck);
        window.addEventListener("resize", resize);
    };

    return (
        <section>
            <div className="main-about box">
                <div ref={largeHeaderRef} className="large-header">
                    <canvas ref={canvasRef}></canvas>
                    <h1 className="main-title">Product Development and Ideation Services</h1>
                    <p className="para">
                        Unlock the potential of your business with Intelisync's advanced AI
                        development services. Our custom-built AI solutions streamline workflows,
                        enhance efficiency, and drive significant growth.
                    </p>
                    <button className="connect-button" onClick={() => navigate('/contact')}>
                        <a href="/contact">Connect with Our Experts</a>
                        <img alt="Right Arrow" src={Arrow} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Servicess;
