type StarterCodeUrlProps = {
  starterCodeUrl: string | undefined;
};

export const ChallengeStarterCodeUrl = ({ starterCodeUrl }: StarterCodeUrlProps) => {
  console.log(starterCodeUrl);
  if (!starterCodeUrl) {
    return null;
  }

  return (
    <div className="rounded border p-4">
      <h3 className="mb-2 font-medium">Repo du challenge</h3>
      <p>{starterCodeUrl}</p>
    </div>
  );
};
