import { Plugin } from "vite";

function transformIndexHtml(code: string, map: { [key: string]: string }) {
    let _code = code;
    const keyList = Object.keys(map);
    if (keyList.length > 0) {
        keyList.forEach((key) => {
            const value = map[key];
            const regexp = new RegExp(key.replace(/\$/g, "\\$"));
            _code = _code.replace(regexp, value);
        });
    }
    return _code;
}

export function viteHtmlVariables(map: { [key: string]: string }): Plugin {
    return {
        name: "vite-html-variables",
        transformIndexHtml: {
            enforce: "pre",
            transform(html: string) {
                return transformIndexHtml(html, map);
            }
        }
    };
}
