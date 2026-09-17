<script lang="ts">
	import type { IProfileResp } from '../types';
	import Hideable from './Hideable.svelte';
	import Intro from './Intro.svelte';
	import Kofi from './Kofi.svelte';
	import Work from './Work.svelte';

	let { profile }: { profile: IProfileResp } = $props();

	const {
		intro = {} as IProfileResp['intro'],
		summary = '',
		projects = [],
		contributions = [],
		experiences = [],
		educations = [],
		achievements = [],
		resumeUrl: { sourceLink = '' } = {}
	} = $derived(profile || {});

	const dataLink = $derived(sourceLink ? `${sourceLink}/blob/main/static/data/profile.json` : '');
</script>

{#if intro.github === 'narze'}
	<Kofi name={intro.github} />
{/if}

<header class="web-only text-center px-4 py-3 sm:p-6 bg-green-400 text-white w-full">
	<h1 class="text-2xl sm:text-4xl">Resumette</h1>
	<div class="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 mt-1">
		<button onclick={() => window.print()} class="underline text-base sm:text-lg py-1">[Print]</button>
		<a href={sourceLink} target="_blank" rel="noopener" class="py-1">[Source]</a>
		<a href={dataLink} target="_blank" rel="noopener" class="py-1">[Data]</a>
	</div>
	<p class="text-xs sm:text-base mt-1 sm:mt-2">
		Printer-friendly standard résumé, any HTML tags with <code>web-only</code> CSS class will be hidden on print.
	</p>
	<p class="text-xs sm:text-base">You can click at any sections or lines hide some information before printing.</p>
</header>

<main class="text-center px-3 py-4 m-0 sm:p-4 md:m-8 xl:mx-auto max-w-7xl">
	<Intro {...intro} />

	{#if summary}
		<section>
			<Hideable>
				<h2 class="text-xl sm:text-2xl uppercase text-left">Summary</h2>
				<hr />
				<p class="text-left">{summary}</p>
			</Hideable>
		</section>
	{/if}

	<section>
		<Hideable>
			<h2 class="text-xl sm:text-2xl uppercase text-left">Education</h2>
			<hr />
			<div class="text-left break-words">
				{#each educations as edu (edu.degree)}
					<Hideable>
						<div>
							<div class="flex justify-between gap-4"><strong>{edu.school}</strong>{#if edu.years}<strong class="whitespace-nowrap">{edu.years}</strong>{/if}</div>
							<div>{edu.degree}{#if edu.gpa}&nbsp;({edu.gpa}){/if}</div>
						</div>
					</Hideable>
				{/each}
			</div>
		</Hideable>
	</section>

	<section>
		<Hideable>
			<h2 class="text-xl sm:text-2xl uppercase text-left">Work Experience</h2>
			<hr />
			{#each experiences as exp (exp.position + exp.company)}
				<Work {...exp} />
			{/each}
		</Hideable>
	</section>

	<section>
		<Hideable>
			<h2 class="text-xl sm:text-2xl uppercase text-left">Projects</h2>
			<hr />
			<ul class="text-left list-disc pl-5 sm:pl-8 print:pl-6 break-words">
				{#each projects as project (project.name)}
					<Hideable hide={project.hide}>
						<li class="mb-2 last:mb-0"><strong>{project.name}</strong> - {project.details.join(' ')} <a href={`https://${project.url}`} target="_blank" rel="noreferrer">{project.url}</a></li>
					</Hideable>
				{/each}
			</ul>
		</Hideable>
	</section>

	<section>
		<Hideable>
			<h2 class="text-xl sm:text-2xl uppercase text-left">Contributions</h2>
			<hr />
			<ul class="text-left list-disc pl-5 sm:pl-8 print:pl-6 break-words">
				{#each contributions as contribution (contribution.name)}
					<Hideable hide={contribution.hide}>
						<li class="mb-2 last:mb-0"><strong>{contribution.name}</strong> - {contribution.details.join(' ')} <a href={`https://${contribution.url}`} target="_blank" rel="noreferrer">{contribution.url}</a></li>
					</Hideable>
				{/each}
			</ul>
		</Hideable>
	</section>

	<section>
		<Hideable>
			<h2 class="text-xl sm:text-2xl uppercase text-left">Achievements & Certificates</h2>
			<hr />
			<ul class="text-left list-disc pl-5 sm:pl-8 print:pl-6 break-words">
				{#each achievements as achievement (achievement.title)}
					<Hideable><li>{achievement.title}</li></Hideable>
				{/each}
			</ul>
		</Hideable>
	</section>

</main>

<style lang="postcss">
	main { overflow-x: hidden; }
	a { text-decoration: underline; }
	section { @apply my-4; }
	section h2 { @apply font-semibold; }
	section hr { @apply mt-0 mb-2; border-color: darkgrey; }
	:global(.print-only) { display: none; }

	@media print {
		* { font-size: 0.75rem; }
		:global(.print-only) { display: inherit; }
		:global(.web-only) { display: none; }
		ul { @apply pl-6; }
		li { break-inside: avoid; }
		section { @apply my-2; }
		section h2 { @apply text-sm; break-after: avoid; }
		section hr { @apply mt-0 mb-1; break-after: avoid; }
		main { margin: 0; padding: 0; }
	}
</style>
