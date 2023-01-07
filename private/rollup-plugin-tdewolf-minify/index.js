import { createFilter } from "@rollup/pluginutils";
import { config, string } from "@tdewolff/minify";
import { lookup } from "mime-types";

export default function minify({ include, exclude, ...options }) {
	const filter = createFilter(include, exclude);

	return {
		name: "tdewolff-minify",
		transform(source, id) {
			if (!filter(id)) {
				return;
			}

			const mediatype = lookup(id);

			config(options);

			return {
				code: string(mediatype, source),
				map: null,
			};
		},
	};
}
