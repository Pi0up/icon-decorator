// Map tokens to Google Icons Material Symbols classes
export const tokenToIconMap: Record<string, string> = {
    "smile": "sentiment_satisfied", // Example
    "heart": "favorite",            // Example
    "party": "celebration",         // Example
    "fire": "whatshot"              // Example
    // Add more tokens and corresponding mappings as needed
};

/**
 * Replace tokens in a string with Material Symbols span elements.
 * @param text The text with placeholder tokens for icons.
 * @returns The string with tokens replaced by span elements.
 */
export function replaceTokensWithIcons(text: string): string {
    return text.replace(/\{(.*?)\}/g, (match, token) => {
        const iconName = tokenToIconMap[token.trim()];
        return iconName ? `<span class="material-symbols-outlined">${iconName}</span>` : match;
    });
}
