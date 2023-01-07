import glob from "glob";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import typescript from "@rollup/plugin-typescript";
import esbuild from "rollup-plugin-esbuild";
import replace from "@rollup/plugin-replace";
import { string } from "rollup-plugin-string";
import minify from "rollup-plugin-tdewolf-minify";
import lightningcss from "rollup-plugin-lightningcss";
import dev from "rollup-plugin-dev";

export function defineConfig() {
	return {
		input: Object.fromEntries(
			glob.sync(path.join(process.cwd(), "src/**/@(index|*.spec).ts")).map((file) => [
				// This remove `src/` as well as the file extension from each file, so e.g.
				// src/nested/foo.js becomes nested/foo
				path.relative("src", file.slice(0, file.length - path.extname(file).length)),
				// This expands the relative paths to absolute paths, so e.g.
				// src/nested/foo becomes /project/src/nested/foo.js
				fileURLToPath(new URL(file, import.meta.url)),
			])
		),
		output: {
			dir: "dist",
			format: "es",
			sourcemap: true,
		},
		plugins: [
			process.env.ROLLUP_WATCH !== "true" && typescript({
				noForceEmit: true,
				emitDeclarationOnly: true,
				stripInternal: true,
				outDir: "dist",
			}),
			esbuild({
				keepNames: true,
				minify: true,
				mangleProps: /^_/,
			}),
			lightningcss(),
			minify({
				include: "**/*.html",
			}),
			replace({
				include: "**/*.html",
				delimiters: ["", ""],
				preventAssignment: false,
				values: {
					">\n ": ">",
					"\n": "",
				},
			}),
			string({
				include: "**/*.{css,html,svg}",
			}),
			dev({
				dirs: [
					path.join(process.cwd(), "dist"),
					path.join(process.cwd(), "examples"),
				],
				port: 3000,
				dirname: process.cwd(),
			}),
		],
	};
}
