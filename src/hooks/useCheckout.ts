import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { FormSchema, formSchema } from '../screens/Register/schema' // Import your formSchema here
import { Item } from '../store'

function useCheckout() {
    const navigate = useNavigate()

    const checkout = (personalDetails: FormSchema, bucket: Item[]) => {
        const data = formSchema.safeParse(personalDetails)

        if (!bucket.length) {
            toast.error('Please select some events', {
                progressStyle: {
                    backgroundColor: 'tomato',
                },
            })
            return
        } else if (!data.success) {
            toast.error('Please enter your personal details correctly', {
                progressStyle: {
                    backgroundColor: 'tomato',
                },
            })
            return
        }
        navigate('/final')
    }

    return checkout
}

export default useCheckout
