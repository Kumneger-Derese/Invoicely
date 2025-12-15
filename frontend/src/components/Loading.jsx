
const Loading = () => {

    return (
        <div className="text-center h-screen flex flex-col items-center justify-center">
            <div
                className="size-16 md:size-32 border-8 border-dashed rounded-full animate-spin border-green-500 mx-auto"
            ></div>
            <h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
                Your response is about to come
            </p>
        </div>

    )
}

export default Loading