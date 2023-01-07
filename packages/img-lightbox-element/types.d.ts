declare module "*.css" {
	const s: string;
	export default s;
}

declare module "*.html" {
	const s: string;
	export default s;
}

declare module "*.svg" {
	const s: string;
	export default s;
}

/// https://github.com/Microsoft/TypeScript/issues/13086#issuecomment-269695308
interface HTMLElement {
	hasAttribute<KnownAttributes extends string, CheckedString extends string>(
		this: HTMLElementWith<KnownAttributes>,
		name: CheckedString
	): this is HTMLElementWith<CheckedString | KnownAttributes>;
	hasAttribute<CheckedString extends string>(
		this: HTMLElement,
		name: CheckedString
	): this is HTMLElementWith<CheckedString>;
}

/// https://github.com/Microsoft/TypeScript/issues/13086#issuecomment-269695308
interface HTMLElementWith<DefiniteAttribute extends string>
	extends HTMLElement {
	getAttribute(k: DefiniteAttribute): string;
	getAttribute(k: string): string | undefined;
}
