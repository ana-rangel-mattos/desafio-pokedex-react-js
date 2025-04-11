import styles from "./PokemonImage.module.css";

function PokemonImage({ src, alt }) {
  return <img src={src} alt={alt} className={styles.img} />;
}

export default PokemonImage;
