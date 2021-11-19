import { writeFileSync } from 'fs';

/* Use a svelte preprocessor to extract calls to gettext() from .svelte files.
 *
 * Strings are collected per file, and written to the (.gitignored) `_svelte_extracted_msgids.js`
 * which is parsable by vanilla django `./manage.py makemessages`.
 */
const GETTEXT_REGEXP = /((n|p)?gettext\(.*?\))/g;
const extracts = {};

export function writeGettextExtracts(extractsFile = '_svelte_django_extracted_messages.js') {
    return {
        writeBundle() {
            let fileContents = `// gettext() calls extracted from .svelte-files: ${new Date().toISOString()}\n\n`;
            for (let filename in extracts) {
                fileContents += `\n// file: ${filename}\n` + extracts[filename].join('\n');
            }

            writeFileSync(extractsFile, fileContents);
        },
    };
}

export async function gettextStringExtractor({ content, attributes, filename }) {
    if (content.indexOf('gettext') === -1) {
        return;
    }
    let fileExtracts = content.match(GETTEXT_REGEXP);
    if (fileExtracts === null) {
        return;
    }
    extracts[filename] = fileExtracts.map((x) => x.replace(', true)', ')') + ';');
    return;
}