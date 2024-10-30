import ExhibitionBackendHeader from "./_components/Header/ExhibitionBackendHeader";
const ExhibitionBackendLayout = ({ children }) => {
  return (
    <div>
      <ExhibitionBackendHeader />
      {children}
    </div>
  );
};

export default ExhibitionBackendLayout;
