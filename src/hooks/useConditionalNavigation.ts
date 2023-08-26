import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function useConditionalNavigation(url: string, condition: boolean) {
    const [wait, setWait] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if (condition) {
            navigate(url)
        }
        setWait(false)
    }, [])

    return wait
}
