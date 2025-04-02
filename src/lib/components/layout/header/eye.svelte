<script lang="ts">
	import { onMount } from 'svelte';
	import { MediaQuery } from 'svelte/reactivity';

	let pupilPos = $state({ x: 50, y: 50 });
	let targetPos = $state({ x: 50, y: 50 });

	let canvasEl = $state<HTMLCanvasElement | null>(null);
	let ctx = $state<CanvasRenderingContext2D | null>(null);

	let isMobile = $derived(new MediaQuery('(max-width: 1024px)').current);

	let rafId: number | null = null;

	const width = 40;
	const height = 40;
	const borderWidth = 2;
	const pupilRadius = Math.min(width, height) * 0.15;
	const eyeRadius = Math.min(width, height) / 2 - borderWidth;

	onMount(() => {
		if (!canvasEl || isMobile) return;

		const controller = new AbortController();
		const context = canvasEl.getContext('2d');
		if (!context) return;
		ctx = context;

		canvasEl.width = width;
		canvasEl.height = height;

		const drawEye = () => {
			if (!ctx) return;
			ctx.clearRect(0, 0, width, height);

			// Eye border
			ctx.strokeStyle = '#898989'; // Use Tailwind color or CSS variable if preferred
			ctx.lineWidth = 3;
			ctx.beginPath();
			ctx.ellipse(width / 2, height / 2, eyeRadius, eyeRadius, 0, 0, Math.PI * 2);
			ctx.stroke();

			// Pupil
			ctx.fillStyle = '#898989'; // Use Tailwind color or CSS variable if preferred

			// Use the reactive state directly
			const pupilX = (pupilPos.x / 100) * width;
			const pupilY = (pupilPos.y / 100) * height;

			ctx.beginPath();
			ctx.ellipse(pupilX, pupilY, pupilRadius, pupilRadius, 0, 0, Math.PI * 2);
			ctx.fill();
		};

		const animate = () => {
			pupilPos.x += (targetPos.x - pupilPos.x) * 0.1;
			pupilPos.y += (targetPos.y - pupilPos.y) * 0.1;

			drawEye();
			rafId = requestAnimationFrame(animate);
		};

		// Start animation
		rafId = requestAnimationFrame(animate);

		const handleMouseMove = (event: MouseEvent) => {
			if (!canvasEl) return;

			const rect = canvasEl.getBoundingClientRect();
			const eyeCenterX = rect.left + rect.width / 2;
			const eyeCenterY = rect.top + rect.height / 2;

			const angle = Math.atan2(event.clientY - eyeCenterY, event.clientX - eyeCenterX);

			// Limit how far the pupil moves from the center
			const maxMovementRadius = rect.width / 4; // Example limit
			const distanceFromCenter = Math.hypot(event.clientX - eyeCenterX, event.clientY - eyeCenterY);
			const clampedDistance = Math.min(distanceFromCenter, maxMovementRadius);

			// Calculate target position (percentage)
			// Adjust the multiplier (45) to control sensitivity/max range
			const targetX = 50 + ((Math.cos(angle) * clampedDistance) / (rect.width / 2)) * 45;
			const targetY = 50 + ((Math.sin(angle) * clampedDistance) / (rect.height / 2)) * 45;

			// Update target state, clamping values between ~25% and ~75%
			targetPos = { x: Math.max(25, Math.min(75, targetX)), y: Math.max(25, Math.min(75, targetY)) };
		};

		const handleMouseLeave = () => (targetPos = { x: 50, y: 50 });

		window.addEventListener('mousemove', handleMouseMove, { signal: controller.signal, passive: true });
		document.addEventListener('mouseleave', handleMouseLeave, { signal: controller.signal });

		return () => {
			if (rafId) cancelAnimationFrame(rafId);
			controller.abort();
		};
	});
</script>

<canvas bind:this={canvasEl} class="size-3.5"></canvas>
