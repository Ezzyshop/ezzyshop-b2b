interface IProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
  initialValues?: any;
}

export const ProductForm = ({ onSubmit, isLoading }: IProps) => {
  return <div>ProductForm</div>;
};
