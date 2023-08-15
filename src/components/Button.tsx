import React, { forwardRef, useRef } from 'react'
import { Link } from 'react-router-dom'

// import { animated, useSpring } from 'react-spring'
import { ReactComponent as IconAdd } from '../assets/svg/icon-add.svg'
import { ReactComponent as IconRemove } from '../assets/svg/icon-remove.svg'
// import { useButtonUtils } from '../hooks'
import { mergeRefs } from '../utils'

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
          type: 'button' | 'submit'
          onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
      } & React.HTMLProps<HTMLButtonElement>)
)

// const Loader = () => <div className="Btn--loader"></div>

const Button = forwardRef<HTMLButtonElement, IButtonProps>(function Btn(
    { children, ...props }: IButtonProps,
    ref,
) {
    const btnRef = useRef<HTMLButtonElement>(null)
    // const { width, height, showLoader } = useButtonUtils({
    //     btnRef,
    //     initialLoadingState: isLoading || false,
    //     children,
    // })

    // const fadeIn = useSpring({
    //     from: { opacity: showLoader ? 1 : 0 },
    //     to: { opacity: 1 },
    // })
    // const fadeOut = useSpring({
    //     from: { opacity: showLoader ? 0 : 1 },
    //     to: { opacity: 1 },
    // })
    //TODO: Rewrite this
    switch (props.type) {
        case 'button':
            return (
                <button
                    {...props}
                    type={props.type}
                    ref={mergeRefs(btnRef, ref)}
                    // style={
                    //     showLoader ? { width: `${width}px`, height: `${height}px` } : {}
                    // }
                >
                    {/* {showLoader ? (
                        <animated.div style={fadeOut}>
                            <Loader />
                        </animated.div>
                    ) : (
                        <animated.div
                            style={({ pointerEvents: 'none' } as CSSProperties, fadeIn)}
                        >
                            {children}
                        </animated.div>
                    )} */}
                    {children}
                </button>
            )
        case 'submit':
            return (
                <button {...props} type={props.type} ref={mergeRefs(btnRef, ref)}>
                    {children}
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
})

interface IToggleProps {
    selected: boolean
    isLoading?: boolean
    toggle: () => void
    actionTrue: () => void
    actionFalse: () => void
    disabled?: boolean
    onClick?: () => void
    submit?: boolean
    showText?: boolean
}

export function ToggleButton({
    selected,
    actionTrue,
    actionFalse,
    toggle,
    disabled,
    onClick,
    submit,
    showText,
    ...props
}: IToggleProps) {
    const handleOnclick = () => {
        toggle()
        onClick && onClick()
        selected ? actionFalse() : actionTrue()
    }

    return (
        <Button
            type={submit ? 'submit' : 'button'}
            className="btn btn--toggle flex"
            onClick={handleOnclick}
            // isLoading={true}
            disabled={disabled}
            isLoading={props.isLoading || false}
        >
            <span className="sr-only">{selected ? 'Remove Item' : 'Add Item'}</span>
            {selected ? (
                <>
                    <IconRemove aria-hidden />
                    {showText && <span>Remove Event</span>}
                </>
            ) : (
                <>
                    <IconAdd aria-hidden />
                    {showText && <span>Add Event</span>}
                </>
            )}
        </Button>
    )
}

export default Button
