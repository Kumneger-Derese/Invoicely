import {useRouteError} from "react-router-dom"
import {TbFaceIdError} from "react-icons/tb";

const ErrorPage = () => {
    const error = useRouteError()

    return (
        <div className="h-screen p-32 md:px-32 flex flex-col gap-y-4 items-center justify-center">
            <h1 className={'text-5xl font-bold text-center'}>Invoicely</h1>
            <div className={'font-bold text-2xl gap-x-2 flex items-center justify-center'}>
                <TbFaceIdError className={'text-red-400'} size={48} strokeWidth={2}/>
                <h1>Oops, <span className={'text-red-400'}>Error</span> occurred:</h1>
            </div>
            <p className={'text-neutral-400'}>{error.message}</p>
        </div>
    )
}

export default ErrorPage