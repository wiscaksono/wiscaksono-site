<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	// Type definition for a particle
	interface Circle {
		x: number;
		y: number;
		translateX: number;
		translateY: number;
		size: number;
		alpha: number;
		targetAlpha: number;
		dx: number;
		dy: number;
	}

	// Props definition using $props
	interface Props {
		quantity?: number;
		size?: number;
		vx?: number;
		vy?: number;
	}

	let { quantity = 500, size = 0.4, vx = 0, vy = 0 }: Props = $props();

	let circles = $state<Circle[]>([]);
	let rafID = $state<number | null>(null);
	let canvas = $state<HTMLCanvasElement | null>(null);
	let canvasContainer = $state<HTMLDivElement | null>(null);
	let context = $state<CanvasRenderingContext2D | null>(null);
	let canvasSize = $state<{ w: number; h: number }>({ w: 0, h: 0 });

	const dpr = browser ? window.devicePixelRatio : 1;

	const createCircleParams = (): Circle => {
		const { w, h } = canvasSize;
		return {
			x: Math.floor(Math.random() * w),
			y: Math.floor(Math.random() * h),
			translateX: 0,
			translateY: 0,
			size: Math.max(1, Math.floor(Math.random() * 2) + size),
			alpha: 0,
			targetAlpha: Number((Math.random() * 0.5 + 0.1).toFixed(1)),
			dx: (Math.random() - 0.5) * 0.2,
			dy: (Math.random() - 0.5) * 0.2
		};
	};

	const drawCircle = (circle: Circle, update = false) => {
		const ctx = context;
		if (!ctx) return;

		ctx.save();
		ctx.translate(circle.translateX, circle.translateY);
		ctx.beginPath();
		ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
		ctx.fillStyle = `rgba(255, 255, 255, ${circle.alpha})`;
		ctx.fill();
		ctx.restore();

		if (!update) circles.push(circle);
	};

	const initCanvas = () => {
		if (!canvas || !canvasContainer) return;

		// Reset circles
		circles = [];

		// Set canvas dimensions
		canvasSize = {
			w: canvasContainer.offsetWidth,
			h: canvasContainer.offsetHeight
		};

		canvas.width = canvasSize.w * dpr;
		canvas.height = canvasSize.h * dpr;
		canvas.style.width = `${canvasSize.w}px`;
		canvas.style.height = `${canvasSize.h}px`;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		ctx.scale(dpr, dpr);
		context = ctx;

		// Initial particle generation
		for (let i = 0; i < quantity; i++) {
			const circle = createCircleParams();
			drawCircle(circle);
		}
	};

	const animate = () => {
		const ctx = context;
		if (!ctx) return;

		ctx.clearRect(0, 0, canvasSize.w, canvasSize.h);

		for (let i = circles.length - 1; i >= 0; i--) {
			const circle = circles[i];

			// Calculate edge distances
			const edgeDistances = [
				circle.x + circle.translateX - circle.size,
				canvasSize.w - circle.x - circle.translateX - circle.size,
				circle.y + circle.translateY - circle.size,
				canvasSize.h - circle.y - circle.translateY - circle.size
			];

			const closestEdge = Math.min(...edgeDistances);
			const alphaModifier = Math.max(Math.min(closestEdge / 20, 1), 0);

			// Smooth alpha transition
			circle.alpha += alphaModifier > 0.5 ? (circle.alpha < circle.targetAlpha ? 0.02 : 0) : circle.targetAlpha * alphaModifier;

			// Update position
			circle.x += circle.dx + vx;
			circle.y += circle.dy + vy;

			drawCircle(circle, true);

			// Replace out-of-bounds particles
			if (circle.x < -circle.size || circle.x > canvasSize.w + circle.size || circle.y < -circle.size || circle.y > canvasSize.h + circle.size) {
				circles.splice(i, 1);
				const newCircle = createCircleParams();
				drawCircle(newCircle);
			}
		}

		rafID = window.requestAnimationFrame(animate);
	};

	onMount(() => {
		if (!canvas) return;

		const controller = new AbortController();

		context = canvas.getContext('2d');
		initCanvas();
		animate();

		const handleResize = () => initCanvas();
		window.addEventListener('resize', handleResize, { signal: controller.signal });

		return () => {
			context = null;
			controller.abort();
			if (rafID != null) {
				window.cancelAnimationFrame(rafID);
				rafID = null;
			}
		};
	});
</script>

<div class="pointer-events-none absolute top-0 left-0 h-dvh w-dvw" bind:this={canvasContainer} aria-hidden="true">
	<canvas bind:this={canvas} class="size-full"></canvas>
</div>
