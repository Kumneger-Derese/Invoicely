import { useState } from "react"
import { useCreateClient } from '../hooks/useClientApi'
import { useNavigate } from 'react-router-dom'

const CreateClient = () => {
    const [clientData, setClientData] = useState({
        name: '',
        email: '',
        phone: '',
    })

    const [clientAddress, setClientAddress] = useState({
        country: '',
        city: '',
        street: '',
        post: ''
    })

    const navigate = useNavigate()
    const createClientMutation = useCreateClient()

    const handleChange = (e) => {
        const { name, value } = e.target

        setClientData((prev) => ({
            ...prev, [name]: value
        }))
    }


    const handleAddressChange = (e) => {
        const { name, value } = e.target

        setClientAddress((prev) => ({
            ...prev, [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = { ...clientData, address: clientAddress }
        createClientMutation.mutate(data, {
            onSuccess: () => {
                navigate('/clients', { replace: true })
            }
        })
    }



    return (
        <div className="px-8 py-4 flex flex-col gap-8">
            <div>
                <h1 className="text-lime-400 text-2xl mt-8 font-bold text-center">Create Client</h1>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8 px-12 w-full">
                {/*Left Section */}
                <div className="flex flex-col gap-4 w-full md:w-1/2">
                    {/* Name Field */}
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="name" className="text-neutral-300 font-semibold">Client Name</label>
                        <input
                            type="text"
                            name="name"
                            value={clientData.name}
                            onChange={handleChange}
                            className="w-full rounded-md border p-2 border-neutral-500 focus:border-lime-600"
                            placeholder="Bob Marley...."
                        />
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="email" className="text-neutral-300 font-semibold">Client Email</label>
                        <input
                            type="email"
                            name="email"
                            value={clientData.email}
                            onChange={handleChange}
                            className="w-full rounded-md border p-2 border-neutral-500 focus:border-lime-600"
                            placeholder="bob@gmail.com."
                        />
                    </div>

                    {/* Phone Field */}
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="email" className="text-neutral-300 font-semibold">Client Email</label>
                        <input
                            type="phone"
                            name="phone"
                            value={clientData.phone}
                            onChange={handleChange}
                            className="w-full rounded-md border p-2 border-neutral-500 focus:border-lime-600"
                            placeholder="+2591675..."
                        />
                    </div>

                    <button className="font-semibold text-neutral-900 bg-lime-500 rounded-md w-full p-3 mt-5">Create</button>
                </div>

                {/*Right Section */}
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="country" className="text-neutral-300 font-semibold">Country</label>
                        <input
                            type="text"
                            name="country"
                            value={clientAddress.country}
                            onChange={handleAddressChange}
                            className="w-full rounded-md border p-2 border-neutral-500 focus:border-lime-600"
                            placeholder="Eth"
                        />
                    </div>
                    <div className="flex flex-col w-full gap-1 ">
                        <label htmlFor="city" className="text-neutral-300 font-semibold">City</label>
                        <input
                            type="text"
                            name="city"
                            value={clientAddress.city}
                            onChange={handleAddressChange}
                            className="w-full rounded-md border p-2 border-neutral-500 focus:border-lime-600"
                            placeholder="Adama"
                        />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="street" className="text-neutral-300 font-semibold">Street</label>
                        <input
                            type="text"
                            name="street"
                            value={clientAddress.street}
                            onChange={handleAddressChange}
                            className="w-full rounded-md border p-2 border-neutral-500 focus:border-lime-600"
                            placeholder="Ali-Bira St"
                        />
                    </div>

                    {/* postalCode */}
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="post" className="text-neutral-300 font-semibold">
                            Postal Code
                        </label>
                        <input
                            type="number"
                            name="post"
                            value={clientAddress.post}
                            onChange={handleAddressChange}
                            className="w-full rounded-md border p-2 border-neutral-500 focus:border-lime-600"
                            placeholder="1000"
                        />
                    </div>
                </div>


            </form>
        </div>
    )
}

export default CreateClient