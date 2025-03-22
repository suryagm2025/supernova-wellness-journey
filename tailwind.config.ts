
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
                supernova: {
                    blue: '#4FEAFF', 
                    purple: '#D946EF',
                    pink: '#FF54B0',
                    dark: '#080A14',
                    light: '#FFFFFF',
                }
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Rajdhani', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' }
                },
                'pulse-glow': {
                    '0%, 100%': { 
                        opacity: '1',
                        filter: 'brightness(1)'
                    },
                    '50%': { 
                        opacity: '0.8',
                        filter: 'brightness(1.2)'
                    }
                },
                'shimmer': {
                    '0%': { backgroundPosition: '-500px 0' },
                    '100%': { backgroundPosition: '500px 0' }
                },
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                'fade-in-left': {
                    '0%': { opacity: '0', transform: 'translateX(-20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' }
                },
                'fade-in-right': {
                    '0%': { opacity: '0', transform: 'translateX(20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' }
                },
                'slide-up': {
                    '0%': { transform: 'translateY(100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                },
                'scale-in': {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' }
                },
                'orbit': {
                    '0%': { transform: 'rotate(0deg) translateX(10px) rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg) translateX(10px) rotate(-360deg)' }
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
                'float': 'float 3s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'fade-in': 'fade-in 0.6s ease-out',
                'fade-in-left': 'fade-in-left 0.5s ease-out',
                'fade-in-right': 'fade-in-right 0.5s ease-out',
                'slide-up': 'slide-up 0.5s ease-out',
                'scale-in': 'scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                'orbit': 'orbit 8s linear infinite'
			},
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'cosmic-grid': "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M0 0h100v100H0z\" fill=\"none\"/%3E%3Cpath d=\"M0 0h1v100H0z\" fill=\"%232286e5\" opacity=\"0.05\"/%3E%3Cpath d=\"M99 0h1v100h-1z\" fill=\"%232286e5\" opacity=\"0.05\"/%3E%3Cpath d=\"M0 0h100v1H0z\" fill=\"%232286e5\" opacity=\"0.05\"/%3E%3Cpath d=\"M0 99h100v1H0z\" fill=\"%232286e5\" opacity=\"0.05\"/%3E%3Cpath d=\"M10 0h1v100h-1z\" fill=\"%232286e5\" opacity=\"0.05\"/%3E%3Cpath d=\"M20 0h1v100h-1z\" fill=\"%232286e5\" opacity=\"0.05\"/%3E%3Cpath d=\"M30 0h1v100h-1z\" fill=\"%232286e5\" opacity=\"0.05\"/%3E%3Cpath d=\"M40 0h1v100h-1z\" fill=\"%232286e5\" opacity=\"0.05\"/%3E%3Cpath d=\"M50 0h1v100h-1z\" fill=\"%232286e5\" opacity=\"0.05\"/%3E%3Cpath d=\"M60 0h1v100h-1z\" fill=\"%232286e5\" opacity=\"0.05\"/%3E%3Cpath d=\"M70 0h1v100h-1z\" fill=\"%232286e5\" opacity=\"0.05\"/%3E%3Cpath d=\"M80 0h1v100h-1z\" fill=\"%232286e5\" opacity=\"0.05\"/%3E%3Cpath d=\"M90 0h1v100h-1z\" fill=\"%232286e5\" opacity=\"0.05\"/%3E%3Cpath d=\"M0 10h100v1H0z\" fill=\"%232286e5\" opacity=\"0.05\"/%3E%3Cpath d=\"M0 20h100v1H0z\" fill=\"%232286e5\" opacity=\"0.05\"/%3E%3Cpath d=\"M0 30h100v1H0z\" fill=\"%232286e5\" opacity=\"0.05\"/%3E%3Cpath d=\"M0 40h100v1H0z\" fill=\"%232286e5\" opacity=\"0.05\"/%3E%3Cpath d=\"M0 50h100v1H0z\" fill=\"%232286e5\" opacity=\"0.05\"/%3E%3Cpath d=\"M0 60h100v1H0z\" fill=\"%232286e5\" opacity=\"0.05\"/%3E%3Cpath d=\"M0 70h100v1H0z\" fill=\"%232286e5\" opacity=\"0.05\"/%3E%3Cpath d=\"M0 80h100v1H0z\" fill=\"%232286e5\" opacity=\"0.05\"/%3E%3Cpath d=\"M0 90h100v1H0z\" fill=\"%232286e5\" opacity=\"0.05\"/%3E%3C/svg%3E')",
                'supernova-gradient': 'linear-gradient(135deg, rgba(79, 234, 255, 0.5) 0%, rgba(217, 70, 239, 0.5) 50%, rgba(255, 84, 176, 0.5) 100%)',
            },
            boxShadow: {
                'glow-blue': '0 0 20px rgba(79, 234, 255, 0.5)',
                'glow-purple': '0 0 20px rgba(217, 70, 239, 0.5)',
                'glow-pink': '0 0 20px rgba(255, 84, 176, 0.5)',
            }
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
