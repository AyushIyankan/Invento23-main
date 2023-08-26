import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Footer from '../../components/Footer/Footer'
import Nav from '../../components/Navigation'
import { useConditionalNavigation } from '../../hooks'
import { useDetailStore, useStore } from '../../store'
import { formSchema } from '../Register/schema'
import FinalGlance from './FinalGlance'

export function FinalGlanceLayout() {
    const events = useStore((state) => state.items)
    const personalDetails = useDetailStore((state) => state.personalDetails)
    const parsedDetails = formSchema.safeParse(personalDetails)
    const wait = useConditionalNavigation(
        '/register',
        !parsedDetails.success || events.length <= 0,
    )

    if (wait) {
        return null
    }

    return (
        <div>
            <Nav background="hsl(266, 12%, 12%)" progressLineColor="" />
            <FinalGlance />
            <Footer background={''} />
        </div>
    )
}
