import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticleBackground = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesOptions = {
        background: {
            color: {
                value: "transparent",
            },
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: { enable: true, mode: "push" },
                onHover: { enable: true, mode: "repulse" },
            },
            modes: {
                push: { quantity: 4 },
                repulse: { distance: 100, duration: 0.4 },
            },
        },
        particles: {
            color: { value: "#ffffff" }, // Partículas ahora son blancas
            links: {
                color: "#ffffff", // Líneas blancas
                distance: 150,
                enable: true,
                opacity: 0.3, // Ligeramente más opacas para resaltar
                width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: { default: "out" },
                random: true,
                speed: 1,
                straight: false,
            },
            number: {
                density: { enable: true, width: 800, height: 800 },
                value: 60, // Aumentamos un poco la cantidad para más impacto
            },
            opacity: { value: 0.6 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
    };

    return (
        // Cambiamos el gradiente a tonos de negro y gris muy oscuro
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-neutral-950 via-black to-neutral-900 animate-gradient-bg bg-[length:200%_200%]">
            {init && (
                <Particles
                    id="tsparticles"
                    className="w-full h-full"
                    options={particlesOptions}
                />
            )}
        </div>
    );
};

export default ParticleBackground;