import { replaceTokensWithIcons } from "./utils/iconMapper";

function decorateTextWithIcons(textElement: HTMLElement): void {
    const originalText = textElement.textContent || "";
    textElement.innerHTML = replaceTokensWithIcons(originalText);
}

// Exemple : Appliquer le remplacement sur un conteneur HTML
const container = document.querySelector("#text-container");
if (container) {
    decorateTextWithIcons(container as HTMLElement);
}