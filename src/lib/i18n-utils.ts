import { Locale } from '@/lib/translations';

/**
 * Returns localized content for a given item based on the locale.
 * Assumes the item has fields like `name`, `nameUz`, `nameRu`, etc.
 */
export function getLocalizedContent(
    item: any,
    locale: Locale,
    field: 'name' | 'description' = 'name'
): string {
    if (!item) return '';

    if (locale === 'en') {
        return item[field] || '';
    }

    // capitalize first letter of locale for camelCase field access
    const suffix = locale.charAt(0).toUpperCase() + locale.slice(1);
    const localizedKey = `${field}${suffix}`;

    return item[localizedKey] || item[field] || '';
}
