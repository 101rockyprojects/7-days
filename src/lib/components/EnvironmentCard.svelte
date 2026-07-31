<script>
	/**
	 * EnvironmentCard Component
	 * Card with parallax environment background
	 * Uses ParallaxScene for depth effects
	 */

	import { getEnvironment } from '$lib/config/parallax.js';
	import ParallaxScene from './ParallaxScene.svelte';
	import ParallaxLayer from './ParallaxLayer.svelte';
	import { useDeviceMotion } from '$lib/composables/useDeviceMotion.svelte.js';

	let {
		environmentId = 'field',
		title = '',
		subtitle = '',
		icon = '',
		description = '',
		onclick = () => {},
		active = true
	} = $props();

	const motion = useDeviceMotion({ disableMouse: true });
	const env = $derived(getEnvironment(environmentId));

	// Compute background styles
	let backgroundStyle = $derived(
		`background: ${env.background.gradient};`
	);
</script>

<button
	class="environment-card {active ? '' : 'inactive'}"
	onclick={onclick}
	aria-label="{title} - {subtitle}"
>
	<!-- Parallax Environment -->
	<ParallaxScene environment={environmentId} enableScroll={false}>
		<!-- Background Image -->
		<div class="env-background" style={backgroundStyle}>
			<img
				src={env.background.image}
				alt=""
				class="env-image"
				loading="lazy"
			/>
		</div>

		<!-- Mid Layer Elements -->
		<div class="env-mid-layer">
			{#each env.layers.mid.elements as element}
				{#if element.type === 'circle'}
					<div
						class="env-element circle"
						style="left: {element.cx}; top: {element.cy}; width: {element.r * 2}; height: {element.r * 2}; background: {element.fill}; opacity: {element.opacity || 1};"
					></div>
				{:else if element.type === 'ellipse'}
					<div
						class="env-element ellipse"
						style="left: {element.cx}; top: {element.cy}; width: {element.rx * 2}; height: {element.ry * 2}; background: {element.fill}; opacity: {element.opacity || 1};"
					></div>
				{:else if element.type === 'rect'}
					<div
						class="env-element rect"
						style="left: {element.x}; top: {element.y}; width: {element.width}; height: {element.height}; background: {element.fill}; opacity: {element.opacity || 1};"
					></div>
				{:else if element.type === 'polygon'}
					<div
						class="env-element polygon"
						style="clip-path: polygon({element.points}); background: {element.fill}; opacity: {element.opacity || 1};"
					></div>
				{/if}
			{/each}
		</div>

		<!-- Near Layer Elements -->
		<div class="env-near-layer">
			{#each env.layers.near.elements as element}
				{#if element.type === 'butterfly'}
					<div
						class="env-element butterfly"
						style="left: {element.x}; top: {element.y}; font-size: {element.size};"
					>
						🦋
					</div>
				{:else if element.type === 'dandelion'}
					<div
						class="env-element dandelion"
						style="left: {element.x}; top: {element.y}; font-size: {element.size};"
					>
						🌾
					</div>
				{:else if element.type === 'snowflake'}
					<div
						class="env-element snowflake"
						style="left: {element.x}; top: {element.y}; font-size: {element.size};"
					>
						❄️
					</div>
				{:else if element.type === 'firefly'}
					<div
						class="env-element firefly"
						style="left: {element.x}; top: {element.y}; width: {element.size}; height: {element.size};"
					></div>
				{:else if element.type === 'petal'}
					<div
						class="env-element petal"
						style="left: {element.x}; top: {element.y}; font-size: {element.size}; color: {element.color};"
					>
						🌸
					</div>
				{:else if element.type === 'seagull'}
					<div
						class="env-element seagull"
						style="left: {element.x}; top: {element.y}; font-size: {element.size};"
					>
						🕊️
					</div>
				{:else if element.type === 'shell'}
					<div
						class="env-element shell"
						style="left: {element.x}; top: {element.y}; font-size: {element.size};"
					>
						🐚
					</div>
				{:else if element.type === 'star'}
					<div
						class="env-element star"
						style="left: {element.x}; top: {element.y}; width: {element.size}; height: {element.size};"
					></div>
				{:else if element.type === 'lantern'}
					<div
						class="env-element lantern"
						style="left: {element.x}; top: {element.y}; font-size: {element.size};"
					>
						🏮
					</div>
				{/if}
			{/each}
		</div>
	</ParallaxScene>

	<!-- Card Content -->
	<div class="card-content">
		<!-- Icon -->
		<div class="card-icon">
			{icon}
		</div>

		<!-- Title -->
		<h3 class="card-title">{title}</h3>

		<!-- Subtitle -->
		<p class="card-subtitle">{subtitle}</p>

		<!-- Description -->
		{#if description}
			<p class="card-description">{description}</p>
		{/if}
	</div>

	<!-- Hover Effect (desktop only) -->
	<div class="card-hover"></div>
</button>

<style>
	.environment-card {
		position: relative;
		width: 100%;
		aspect-ratio: 3 / 4;
		border-radius: var(--radius-cards);
		overflow: hidden;
		cursor: pointer;
		border: none;
		padding: 0;
		text-align: left;
		background: transparent;
		transition: transform 0.3s ease;
	}

	.environment-card:active {
		transform: scale(0.98);
	}

	.environment-card.inactive {
		opacity: 0.6;
	}

	/* Hover effect only on devices that support hover */
	@media (hover: hover) {
		.environment-card:hover {
			transform: translateY(-4px);
		}

		.environment-card:hover .card-hover {
			opacity: 1;
		}
	}

	.env-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}

	.env-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.env-mid-layer,
	.env-near-layer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
		pointer-events: none;
	}

	.env-near-layer {
		z-index: 3;
	}

	.env-element {
		position: absolute;
		pointer-events: none;
	}

	.env-element.circle {
		border-radius: 50%;
	}

	.env-element.ellipse {
		border-radius: 50%;
	}

	.env-element.rect {
		border-radius: 2px;
	}

	.env-element.polygon {
		width: 100%;
		height: 100%;
	}

	.env-element.firefly {
		border-radius: 50%;
		background: #FFEB3B;
		box-shadow: 0 0 10px #FFEB3B;
		animation: pulse 2s ease-in-out infinite;
	}

	.env-element.star {
		border-radius: 50%;
		background: white;
	}

	@keyframes pulse {
		0%, 100% { opacity: 0.7; }
		50% { opacity: 1; }
	}

	.card-content {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 24px;
		background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
		z-index: 10;
		color: white;
	}

	.card-icon {
		font-size: 48px;
		margin-bottom: 12px;
	}

	.card-title {
		font-family: var(--font-davinci);
		font-size: 24px;
		font-weight: 500;
		margin: 0 0 4px 0;
		letter-spacing: -0.13px;
	}

	.card-subtitle {
		font-family: var(--font-helvetica-now);
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin: 0;
		opacity: 0.8;
	}

	.card-description {
		font-family: var(--font-helvetica-now);
		font-size: 14px;
		margin: 12px 0 0 0;
		opacity: 0.7;
		line-height: 1.5;
	}

	.card-hover {
		position: absolute;
		inset: 0;
		background: rgba(255, 255, 255, 0.1);
		opacity: 0;
		transition: opacity 0.3s ease;
		pointer-events: none;
		z-index: 5;
	}
</style>
