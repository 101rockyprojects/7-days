/**
 * Date utility functions for the 7 Days of August project
 */

const ARGENTINA_TZ = 'America/Argentina/Buenos_Aires';

/**
 * Get the current date in Argentina timezone
 * @returns {{ year: number, month: number, day: number }}
 */
function getArgentinaDate() {
	const now = new Date();
	const parts = new Intl.DateTimeFormat('en-US', {
		timeZone: ARGENTINA_TZ,
		year: 'numeric',
		month: 'numeric',
		day: 'numeric'
	}).formatToParts(now);

	const get = (type) => parseInt(parts.find((p) => p.type === type).value);
	return { year: get('year'), month: get('month'), day: get('day') };
}

/**
 * Get the current day in August (1-7) using Argentina timezone
 * @returns {number} Current day (1-7) or 0 if not in August
 */
export function getCurrentAugustDay() {
	const { month, day } = getArgentinaDate();

	if (month === 8 && day >= 1 && day <= 7) {
		return day;
	}
	return 0;
}

/**
 * Get unlocked days based on current date or dev mode
 * @param {boolean} isDevMode - Whether dev mode is enabled
 * @param {number|null} simulatedDay - Simulated day for dev mode
 * @returns {number[]} Array of unlocked day numbers
 */
export function getUnlockedDays(isDevMode = false, simulatedDay = null) {
	if (isDevMode && simulatedDay !== null) {
		return Array.from({ length: Math.min(simulatedDay, 7) }, (_, i) => i + 1);
	}

	const currentDay = getCurrentAugustDay();
	if (currentDay === 0) {
		// Not in August, unlock nothing (or all for testing)
		return [];
	}

	return Array.from({ length: Math.min(currentDay, 7) }, (_, i) => i + 1);
}

/**
 * Parse URL parameters for dev mode
 * @returns {{ isDevMode: boolean, simulatedDay: number|null }}
 */
export function parseUrlParams() {
	if (typeof window === 'undefined') {
		return { isDevMode: false, simulatedDay: null };
	}

	const params = new URLSearchParams(window.location.search);

	return {
		isDevMode: params.get('dev') === 'true',
		simulatedDay: params.has('day') ? parseInt(params.get('day')) : null
	};
}

/**
 * Check if a date is in range
 * @param {Date|string} date - Date to check
 * @param {Date|string} start - Start date
 * @param {Date|string} end - End date
 * @returns {boolean}
 */
export function isDateInRange(date, start, end) {
	const d = new Date(date);
	const s = new Date(start);
	const e = new Date(end);

	return d >= s && d <= e;
}

/**
 * Format date for display
 * @param {Date} date
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
	return new Intl.DateTimeFormat('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}).format(date);
}
