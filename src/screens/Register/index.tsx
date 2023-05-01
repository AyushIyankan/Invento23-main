import { EventForm } from './EventForm'
import { RegistrationForm } from './Form'

export default function Register() {
    return (
        <div style={{ marginTop: '10rem' }}>
            <RegistrationForm />
            <EventForm />
        </div>
    )
}

export * from './Layout'
