function CarteFonction({ icone, titre, description, bouton, couleur }) {
    return (
      <div className="carte-fonction">
        <div className="icone">{icone}</div>
        <h3>{titre}</h3>
        <p>{description}</p>
        <button className={`bouton ${couleur}`}>{bouton}</button>
      </div>
    );
  }
  
  export default CarteFonction;
  