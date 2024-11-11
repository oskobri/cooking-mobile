import { customRef } from 'vue'

export function useDebouncedRef(value: any, delay: number = 200) {
    let timeout: number;

    return customRef((track, trigger) => {
        return {
            get() {
                track();
                return value;
            },
            set(newValue) {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    value = newValue
                    trigger()
                }, delay);
            }
        }
    });
};