import { Link } from "react-router-dom"
import { useDeleteClient, useGetClients } from "../hooks/useClientApi"

const ClientList = () => {
    const { data: clientData } = useGetClients()
    const deleteClientMutation = useDeleteClient()

    const handleClientDelete = (id) => {
        deleteClientMutation.mutate(id)
    }
    return (
        <div className="p-8">
            <div className="flex justify-between px-4 mb-4">
                <h1 className="text-2xl font-bold text-lime-500">Client List</h1>
                <button>+</button>
            </div>            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {
                    clientData?.map((client) => (
                        <div key={client.id} className="p-4 bg-neutral-700 rounded-md flex flex-col gap-y-1">
                            <h1>{client.name}</h1>
                            <p>{client.email}</p>
                            <p>{client.phone}</p>

                            <p>{client.address.country}</p>

                            {/* Action Button */}
                            <div className="flex gap-x-4 items-center">
                                <Link to={`/edit-client/${client?.id}`} className="px-6 py-2 mt-4 rounded-md bg-lime-400 text-center font-semibold text-neutral-900">Edit</Link>

                                <button
                                    onClick={() => handleClientDelete(client.id)}
                                    className="px-6 py-2 mt-4 rounded-md bg-red-900 text-center font-semibold text-neutral-100">Delete</button>
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ClientList