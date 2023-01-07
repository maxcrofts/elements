function assert(cond: boolean): asserts cond is true {}

export default class DetailsAccordionElement extends HTMLElement {
	/**
	 * @internal
	 */
	private _animationDuration: number = 0;

	/**
	 * @internal
	 */
	private _elements: HTMLDetailsElement[] = [];

	/**
	 * @internal
	 */
	private _animations: Animation[] = [];

	/**
	 * @internal
	 */
	private _animationFinished: Promise<Animation | void> = Promise.resolve();

	/**
	 * @internal
	 */
	private _currentElement?: HTMLDetailsElement;

	static get observedAttributes(): string[] {
		return ["animation-duration"];
	}

	get animationDuration(): number {
		return this._animationDuration;
	}

	set animationDuration(value: number) {
		if (!Number.isNaN(value) || value !== 0) {
			this.setAttribute("animation-duration", value.toString());
		} else {
			this.removeAttribute("animation-duration");
		}
	}

	get animationFinished(): Promise<Animation | void> {
		return this._animationFinished;
	}

	constructor() {
		super();

		// Create shadow root
		const shadowRoot = this.attachShadow({ mode: "open" });
		shadowRoot.innerHTML = `<style>::slotted(details){overflow-y:hidden}</style><slot></slot>`;
		shadowRoot.addEventListener(
			"slotchange",
			this._handleSlotChange.bind(this)
		);

		// Observe click events
		this.addEventListener("click", this._handleClick.bind(this));
	}

	attributeChangedCallback(
		name: string,
		_oldValue: string | undefined,
		newValue: string | undefined
	): void {
		if (name === "animation-duration") {
			this._animationDuration = newValue != null ? parseInt(newValue) : 0;
		}
	}

	/**
	 * @internal
	 */
	private _handleSlotChange(e: Event): void {
		const target = e.target as HTMLSlotElement;

		// Clear elements
		this._elements = [];

		const assignedElements = target.assignedElements();
		const assignedElementsLength = assignedElements.length;
		for (let i = 0; i < assignedElementsLength; i++) {
			const assignedElement = assignedElements[i];

			if (assignedElement instanceof HTMLDetailsElement) {
				// Close details if it's not meant to be open
				assignedElement.open = assignedElement === this._currentElement;

				// Clear data attributes
				delete assignedElement.dataset.detailsAccordionAnimating;
				delete assignedElement.dataset.detailsAccordionOpen;

				// Add to array
				this._elements.push(assignedElement);
			}
		}

		// Cancel animations
		const animationsLength = this._animations.length;
		for (let i = 0; i < animationsLength; i++) {
			const animation = this._animations[i];

			if (animation !== undefined) {
				animation.cancel();
			}
		}

		// Clear animations
		this._animations = new Array(this._elements.length);
	}

	/**
	 * @internal
	 */
	private _handleClick(e: MouseEvent): boolean {
		const target = e.target as HTMLElement;

		if (target === null || target.tagName !== "SUMMARY") {
			// We don't care about other click events
			return true;
		}

		const details = target.parentElement! as HTMLDetailsElement;

		if (details.parentElement !== this) {
			// We only care about top-level details
			return true;
		}

		e.preventDefault();

		if (details !== this._currentElement) {
			if (this._currentElement !== undefined) {
				this._closeElement(this._currentElement);
				delete this._currentElement.dataset.detailsAccordionOpen;
			}

			this._openElement(details);
			this._currentElement = details;
			this._currentElement.dataset.detailsAccordionOpen = "";
		} else if (this._currentElement !== undefined) {
			this._closeElement(this._currentElement);
			delete this._currentElement.dataset.detailsAccordionOpen;

			this._currentElement = undefined;
		}

		return false;
	}

	/**
	 * @internal
	 */
	private _animate(element: HTMLDetailsElement, callback: () => void): void {
		const index = this._elements?.findIndex((e) => e === element);
		assert(index !== -1);

		const startHeight = element.offsetHeight;
		element.open = true;
		element.dataset.detailsAccordionAnimating = "";

		// If there is already an animation running
		if (this._animations[index] !== undefined) {
			// Cancel the current animation
			this._animations[index].cancel();
		}

		let endHeight;

		if (element.dataset.detailsAccordionOpen === undefined) {
			// Opening
			const rect = element.getBoundingClientRect();
			endHeight = rect.height;
		} else {
			// Closing
			endHeight = element.querySelector("summary")!.offsetHeight;
		}

		// Animate `details` height
		this._animations[index] = element.animate(
			{
				height: [`${startHeight}px`, `${endHeight}px`],
			},
			{
				duration: this._animationDuration,
				easing: "ease-out",
			}
		);

		// Construct promise
		let animationResolve: (value: Animation) => void = () => {};
		this._animationFinished = new Promise((resolve) => {
			animationResolve = resolve;
		});

		this._animations[index].onfinish = () => {
			callback();
			animationResolve(this._animations[index]);
		};
	}

	/**
	 * @internal
	 */
	private _openElement(element: HTMLDetailsElement): void {
		this._animate(element, () => {
			delete element.dataset.detailsAccordionAnimating;
		});
	}

	/**
	 * @internal
	 */
	private _closeElement(element: HTMLDetailsElement): void {
		this._animate(element, () => {
			element.open = false;
			delete element.dataset.detailsAccordionAnimating;
		});
	}
}
