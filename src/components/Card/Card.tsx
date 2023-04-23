interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
    bgUrl: string
    title: string
}

export default function Card({ bgUrl, title, ...rest }: ICardProps) {
    const styles: React.CSSProperties = {
        backgroundImage: `url(${bgUrl}), linear-gradient(90deg, #0C0B0B 0%, #060505 9.27%, #0E0D0D 81.79%, #0B0A0A 92.72%)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        borderRadius: '10px',
        display: 'grid',
    }

    const titleStyle: React.CSSProperties = {
        fontSize: 'clamp(1.8rem, 1.54rem + 1.3vw, 3.1rem)',
        justifySelf: 'end',
        alignSelf: 'self-end',
    }

    return (
        <div {...rest} style={styles}>
            <p className="ff-days-one fw-400 text-white uppercase" style={titleStyle}>
                {title}
            </p>
        </div>
    )
}
