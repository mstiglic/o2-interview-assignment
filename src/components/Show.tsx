import type { ReactNode } from 'react';

interface Props<T> {
    when: T | undefined | null | boolean;
    fallback?: ReactNode;
    children: ReactNode;
}

function Show<T>(props: Props<T>): ReactNode {
    return props.when ? props.children : (props.fallback || null);
}

export default Show;