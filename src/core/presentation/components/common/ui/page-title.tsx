export const PageTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-semibold text-gray-800">{title}</h1>
    </div>
  );
};
