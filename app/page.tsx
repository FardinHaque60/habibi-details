import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.brand}>Habibi Details</p>
        <nav aria-label="Main navigation">
          <ul className={styles.navLinks}>
            <li>
              <a href="#packages">Detailing Packages</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div>
            <h1>Premium Car Detailing That Makes Your Ride Shine</h1>
            <p>
              Exterior polish, interior deep clean, and protection packages for daily drivers and
              show cars.
            </p>
          </div>
          <Image
            src="/car-detailing-hero.svg"
            alt="Stylized car detailing illustration"
            width={520}
            height={300}
            priority
            sizes="(max-width: 768px) 100vw, 520px"
          />
        </section>

        <section id="packages" className={styles.section}>
          <h2>Detailing Packages</h2>
          <p>Basic Wash, Interior Revival, and Full Signature Detail.</p>
        </section>
        <section id="about" className={styles.section}>
          <h2>About Us</h2>
          <p>Trusted local detailers focused on paint-safe and eco-conscious care.</p>
        </section>
        <section id="contact" className={styles.section}>
          <h2>Contact Us</h2>
          <p>Call (555) 123-4567 or email hello@habibidetails.com to book your service.</p>
        </section>
      </main>
    </div>
  );
}
