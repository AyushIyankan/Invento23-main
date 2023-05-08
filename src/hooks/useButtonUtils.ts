import { PropsWithChildren, useEffect, useState } from 'react'

interface ButtonUtils {
    width: number
    height: number
    showLoader: boolean
}

interface HookProps {
    btnRef: React.RefObject<HTMLButtonElement>
    initialLoadingState: boolean
}

export function useButtonUtils({
    btnRef,
    initialLoadingState,
    children,
}: PropsWithChildren<HookProps>) {
    const initialUtils: ButtonUtils = {
        width: 0,
        height: 0,
        showLoader: initialLoadingState,
    }

    const [btnUtils, setBtnUtils] = useState<ButtonUtils>(initialUtils)

    //get initial dimensions to prevent jump

    useEffect(() => {
        if (btnRef.current) {
            const btnBoundingDimensions = btnRef.current.getBoundingClientRect()
            if (btnBoundingDimensions.width && btnBoundingDimensions.height) {
                setBtnUtils({
                    ...btnUtils,
                    width: btnBoundingDimensions.width,
                    height: btnBoundingDimensions.height,
                })
            }
        }
    }, [children])

    useEffect(() => {
        if (initialLoadingState) {
            setBtnUtils({ ...btnUtils, showLoader: true })
        }

        if (!initialLoadingState && btnUtils.showLoader) {
            const timeout = window.setTimeout(() => {
                setBtnUtils({ ...btnUtils, showLoader: false })
            }, 500)

            return () => {
                clearTimeout(timeout)
            }
        }
    }, [initialLoadingState, btnUtils.showLoader])

    return btnUtils
}
