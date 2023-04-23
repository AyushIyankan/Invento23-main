export default function Card({ bgUrl, title }: { bgUrl: string; title: string }) {
    const styles: React.CSSProperties = {
        backgroundImage: `url(${bgUrl}), linear-gradient(90deg, #0C0B0B 0%, #060505 9.27%, #0E0D0D 81.79%, #0B0A0A 92.72%)`,
    }

    return (
        <div className="card grid" style={styles}>
            <p className="card__title ff-days-one fw-400 text-white uppercase">{title}</p>
        </div>
    )
}
