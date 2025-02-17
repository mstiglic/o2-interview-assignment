export function getBemClassName(
    baseName: string,
    element?: string | null,
    modifier?: string,
): string {
    let className = baseName;

    if (element) {
        className = `${className}__${element}`;
    }

    if (modifier) {
        className = `${className}--${modifier}`;
    }

    return className;
}
