import { EventForm } from './EventForm'
import { RegistrationForm } from './Form'
import { Summary } from './Summary'
export default function Register() {
    return (
        <div className="formParentWrap centeredContainer flow side-padding light-scheme pt-4-6">
            <RegistrationForm />
            <EventForm />
            <Summary />
        </div>
    )
}

export * from './Layout'
