<script lang="ts">
	import { page } from '$app/state';
</script>

<main class="flex flex-grow flex-col items-center justify-center space-y-2.5 md:space-y-5">
	{#if page.status === 404}
		<code class="block text-[2dvw] leading-[0.9] tracking-[-0.1em] whitespace-pre-wrap lg:text-[1.4dvh]">
			{`
    ___    _______     ___   
   /   )  (  __   )   /   )  
  / /) |  | (  )  |  / /) |  
 / (_) (_ | | /   | / (_) (_ 
(____   _)| (/ /) |(____   _)
     ) (  |   / | |     ) (  
     | |  |  (__) |     | |  
     (_)  (_______)     (_) 
`}
		</code>

		<h1 class="sr-only">Internal Server Error</h1>

		<div class="text-center">
			<p>Page not found</p>
			<p>Sorry, the page you are looking for could not be found.</p>
		</div>
	{:else}
		<code class="block text-[2dvw] leading-[0.9] tracking-[-0.1em] whitespace-pre-wrap lg:text-[1.4dvh]">
			{` _______  _______  _______ 
|       ||  _    ||  _    |
|   ____|| | |   || | |   |
|  |____ | | |   || | |   |
|_____  || |_|   || |_|   |
 _____| ||       ||       |
|_______||_______||_______| `}
		</code>

		<h1 class="sr-only">Internal Server Error</h1>

		<div class="text-center">
			<p>Something went wrong</p>
			<p>Sorry, an error occurred while processing your request.</p>
		</div>
	{/if}
</main>
