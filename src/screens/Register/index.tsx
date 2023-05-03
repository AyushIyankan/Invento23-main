import { EventForm } from './EventForm'
import { RegistrationForm } from './Form'

export default function Register() {
    return (
        <div className="formParentWrap centeredContainer flow side-padding">
            <RegistrationForm />
            <EventForm />
        </div>
    )
}

export * from './Layout'
