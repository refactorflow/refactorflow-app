import { Button } from './button';

export interface ButtonSubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isPending: boolean;
  children: React.ReactNode;
}

export const ButtonSubmit = ({ isPending, children, ...props }: ButtonSubmitProps) => {
  return (
    <Button type="submit" {...props}>
      {isPending ? 'Submitting...' : children}
    </Button>
  );
};
