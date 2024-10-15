import { type APIRoute } from "astro";
import { createCanvas, loadImage, type CanvasRenderingContext2D } from "canvas";

export const GET: APIRoute = async ({ url }) => {
	const params = new URL(url).searchParams;
	const text = params.get("text") || "Default Text";

	const response = await fetch(import.meta.env.APP_URL + "/og-bg.png");
	const imageBuffer = await response.arrayBuffer();

	const originalImage = await loadImage(Buffer.from(imageBuffer));

	const canvas = createCanvas(originalImage.width, originalImage.height);
	const ctx = canvas.getContext("2d");

	ctx.drawImage(originalImage, 0, 0);

	const fontSize = 48;
	ctx.font = `${fontSize}px "Geist Mono", monospace`;
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";

	function wrapText(
		context: CanvasRenderingContext2D,
		text: string,
		maxWidth: number,
	) {
		const words = text.split(" ");
		let line = "";
		let lines = [];

		for (let i = 0; i < words.length; i++) {
			const testLine = line + words[i] + " ";
			const testWidth = context.measureText(testLine).width;

			if (testWidth > maxWidth && i > 0) {
				lines.push(line);
				line = words[i] + " ";
			} else {
				line = testLine;
			}
		}
		lines.push(line);
		return lines;
	}

	const maxWidth = canvas.width * 0.8;
	const lineHeight = fontSize * 1.2;

	const lines = wrapText(ctx, text, maxWidth);

	const textHeight = lines.length * lineHeight;

	const textX = canvas.width / 2;
	const textY = (canvas.height - textHeight) / 2;

	lines.forEach((line, index) => {
		ctx.fillText(line.trim(), textX, textY + index * lineHeight);
	});

	// Send the modified image back to the client
	const modifiedImageBuffer = canvas.toBuffer("image/png");
	return new Response(modifiedImageBuffer, {
		headers: {
			"Content-Type": "image/png",
		},
	});
};
