<script lang="ts">
	import { m } from '#lib/paraglide/messages.js';
	import { sampleContact } from '#lib/data/portfolio.js';
	import SectionHeading from '../ui/SectionHeading.svelte';
	import { scrollFade } from '#lib/actions/scrollFade.js';
</script>

<section id="contact" aria-labelledby="contact-heading" class="border-y border-border bg-surface/40">
	<div class="mx-auto grid max-w-content gap-10 px-gutter py-section md:grid-cols-2">
		<SectionHeading id="contact-heading" title={m.contact_title()} accent={m.contact_accent()} description={m.contact_copy()} />
		<div use:scrollFade class="rounded-xl border border-border bg-surface p-6 sm:p-8">
			<dl class="space-y-6">
				<div><dt class="text-sm text-muted">{m.contact_email()}</dt><dd class="mt-2 break-all text-xl text-secondary">{sampleContact.email}</dd></div>
				<div><dt class="text-sm text-muted">{m.contact_profile()}</dt><dd class="mt-2 text-xl text-secondary">{sampleContact.profile}</dd></div>
			</dl>
			<p class="mt-8 border-t border-border pt-5 text-sm text-primary">{m.contact_note()}</p>
		</div>
	</div>
</section>
