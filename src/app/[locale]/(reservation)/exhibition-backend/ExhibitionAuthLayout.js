import Header from "../exhibitionauth/_components/ExhibitionHeader";

const ExhibitionAuthLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default ExhibitionAuthLayout;
