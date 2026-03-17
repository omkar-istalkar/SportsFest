import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -2 },

        background: {
          color: { value: "transparent" }
        },

        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse"
            },
            onClick: {
              enable: true,
              mode: "push"
            }
          },

          modes: {
            repulse: {
              distance: 120,
              duration: 0.4
            },

            push: {
              quantity: 4
            }
          }
        },

        particles: {
          number: {
            value: 70
          },

          color: {
            value: "#ffffff"
          },

          opacity: {
            value: 0.35
          },

          size: {
            value: { min: 1, max: 3 }
          },

          move: {
            enable: true,
            speed: 0.6
          },

          links: {
            enable: true,
            distance: 150,
            color: "#999",
            opacity: 0.25
          }
        }
      }}
    />
  );
}