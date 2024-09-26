import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div className={styles.text}>
          <h2>About WorldWide.</h2>
          <p>
            Worldwise is a single-page React application that helps you keep
            track of the places you have visited by marking them on a map.
            Simply click on the map, and a form will appear for you to enter and
            save the journey details.
          </p>
          <p>
            The app also displays all the cities and countries you have visited.
          </p>
        </div>
      </section>
    </main>
  );
}
