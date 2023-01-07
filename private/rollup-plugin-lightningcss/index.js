import { createFilter } from "@rollup/pluginutils";
import { transform } from "lightningcss";

export default function lightningcss(options = {
	include: "**/*.css",
}) {
	const filter = createFilter(options.include, options.exclude);

	return {
		name: "lightningcss",
		transform(code, id) {
			if (!filter(id)) {
				return;
			}

			const {
				code: codeBuffer,
				map: mapBuffer,
			} = transform({
				filename: id,
				code: Buffer.from(code),
				minify: true,
				sourceMap: true,
				targets: {
					// Semver versions are represented using a single 24-bit number, with one component per byte.
					// e.g. to represent 13.2.0, the following could be used.
					safari: (13 << 16) | (2 << 8),
				},
				drafts: {
					nesting: true,
				},
			});

			return {
				code: codeBuffer.toString(),
				map: mapBuffer.toString(),
			};
		},
	};
}
