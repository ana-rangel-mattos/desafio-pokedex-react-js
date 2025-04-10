import DetailsSubtitle from "./DetailsSubtitle";

function Error({ error }) {
  return (
    <>
      <DetailsSubtitle>Ocorreu um erro:</DetailsSubtitle> Não foi possível
      buscar os dados.
      <p>{error}</p>
    </>
  );
}

export default Error;
