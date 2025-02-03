import Image from 'next/image'
import styles from './Sobre.module.css' // Asegúrate de crear este archivo CSS para los estilos

const Sobre = () => {
  return (
    <section id='sobre' className={styles.sobre}>
      <div className={styles.container}>
        <div className={styles.imagenContainer}>
          <Image
            src='/images/creador.jpg' // Ruta de la imagen del creador
            alt='Foto del creador'
            width={300}
            height={300}
            className={styles.imagen}
          />
        </div>
        <div className={styles.informacion}>
          <h2 className={styles.titulo}>Sobre Mí</h2>
          <p className={styles.descripcion}>
            Hola, soy [Nombre del Creador], un apasionado desarrollador web con
            experiencia en la creación de aplicaciones modernas y escalables. Mi
            enfoque principal es utilizar tecnologías como Next.js, React,
            Node.js y otras herramientas del ecosistema JavaScript para
            construir soluciones eficientes y de alto rendimiento.
          </p>
          <p className={styles.descripcion}>
            Con más de [X años] de experiencia en el desarrollo de software, he
            tenido la oportunidad de trabajar en diversos proyectos, desde
            pequeñas startups hasta grandes empresas. Mi objetivo es siempre
            aprender y mejorar, manteniéndome al día con las últimas tendencias
            y mejores prácticas en el desarrollo web.
          </p>
          <p className={styles.descripcion}>
            En mi tiempo libre, disfruto contribuir a proyectos de código
            abierto, escribir artículos técnicos y explorar nuevas tecnologías.
            Creo firmemente en el poder de la comunidad y en compartir
            conocimientos para ayudar a otros a crecer en este campo.
          </p>
          <div className={styles.botones}>
            <a
              href='[Enlace a LinkedIn]'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.boton}
            >
              LinkedIn
            </a>
            <a
              href='[Enlace a GitHub]'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.boton}
            >
              GitHub
            </a>
            <a
              href='[Enlace a Portafolio]'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.boton}
            >
              Portafolio
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Sobre
