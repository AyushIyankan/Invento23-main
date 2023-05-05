import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { animated, useSpring } from 'react-spring'

import { ReactComponent as IconAdd } from '../assets/svg/icon-add.svg'
import { ReactComponent as IconRemove } from '../assets/svg/icon-remove.svg'
import { useButtonUtils, useToggle } from '../hooks'

type IButtonProps = {
    children: React.ReactNode
    isLoading?: boolean
} & (
    | {
          type: 'internalUrl'
          to: string
          classNames?: string
      }
    | ({
          type: 'externalUrl'
      } & React.HTMLProps<HTMLAnchorElement>)
    | ({
          type: 'button'
          onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
      } & React.HTMLProps<HTMLButtonElement>)
)

const Loader = () => <div className="Btn--loader"></div>

export default function Button({ children, isLoading, ...props }: IButtonProps) {
    const btnRef = useRef<HTMLButtonElement>(null)
    const { width, height, showLoader } = useButtonUtils({
        btnRef,
        initialLoadingState: isLoading || false,
        children,
    })

    const fadeIn = useSpring({
        from: { opacity: showLoader ? 1 : 0 },
        to: { opacity: 1 },
    })
    const fadeOut = useSpring({
        from: { opacity: showLoader ? 0 : 1 },
        to: { opacity: 1 },
    })

    switch (props.type) {
        case 'button':
            return (
                <button
                    {...props}
                    ref={btnRef}
                    style={
                        showLoader ? { width: `${width}px`, height: `${height}px` } : {}
                    }
                >
                    {showLoader ? (
                        <animated.div style={fadeOut}>
                            <Loader />
                        </animated.div>
                    ) : (
                        <animated.div style={fadeIn}>{children}</animated.div>
                    )}
                </button>
            )
        case 'externalUrl':
            return (
                <a {...props} target="_blank" rel="noopener noreferrer">
                    {children}
                </a>
            )
        case 'internalUrl': {
            const { classNames, ...others } = props
            return (
                <Link {...others} className={classNames}>
                    {children}
                </Link>
            )
        }
    }
}

interface IToggleProps {
    initState: boolean
    nonTogglable?: boolean
    isLoading?: boolean
    actionTrue: () => void
    actionFalse: () => void
}

export function ToggleButton({
    initState,
    actionTrue,
    actionFalse,
    ...props
}: IToggleProps) {
    const [state, toggle] = useToggle(initState)
    console.log('initial Toggle btn state', state)
    const handleOnclick = () => {
        if (!props.nonTogglable) {
            toggle()
        }
        state ? actionTrue() : actionFalse()
    }

    return (
        <Button
            type="button"
            className="btn btn--toggle flex"
            onClick={handleOnclick}
            // isLoading={true}
            isLoading={props.isLoading || false}
        >
            <span className="sr-only">{state ? 'Add item' : 'Remove Item'}</span>
            {state ? <IconAdd aria-hidden /> : <IconRemove aria-hidden />}
        </Button>
    )
}
