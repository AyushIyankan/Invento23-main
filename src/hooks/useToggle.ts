import { useCallback, useState } from 'react'

export function useToggle(initial = false): [boolean, () => void] {
    const [state, setState] = useState<boolean>(initial)

    const toggler = useCallback(() => {
        setState((state) => !state)
    }, [])

    return [state, toggler]
}
