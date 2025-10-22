interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  return (
    <div
      className="h-fit min-h-[75vh] bg-white w-full min-w-[350px] lg:max-w-5xl xl:max-w-7xl 
			rounded-2xl px-4 py-8 shadow-xl flex flex-col mx-auto
			items-center justify-start gap-2"
    >
      {children}
    </div>
  );
}
