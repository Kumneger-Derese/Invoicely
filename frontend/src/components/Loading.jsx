const Loading = () => {
  return (
    <div className="text-center h-screen flex flex-col items-center justify-center">
      <div className="size-16 md:size-32 border-8 border-dashed rounded-full animate-spin border-lime-500 mx-auto"></div>
      <h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
    </div>
  );
};

export default Loading;
