export namespace EnvUtils {
	export function getEnvString(key: string): string {
		const value = process.env[key];
	
		if (typeof value !== 'string' || value.trim() === '') {
			throw new Error(`Environment variable '${key}' is missing or not a valid string`);
		}
	
		return value;
	}
}
