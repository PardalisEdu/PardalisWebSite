<script>
  const sections = [
    {
      title: "Términos generales",
      content:
        "Al acceder y realizar un pedido con Pardalis, usted confirma que está de acuerdo y sujeto a los términos de servicio contenidos en los Términos y condiciones que se describen a continuación.",
      icon: "📋",
    },
    {
      title: "Licencia",
      content:
        "Pardalis es un software de código abierto bajo la Licencia Pública General de GNU versión 3 (GPL v3). Esta licencia le garantiza la libertad de usar, estudiar, compartir y modificar el software. Cualquier software derivado debe distribuirse bajo los mismos términos de la GPL v3.",
      icon: "📜",
      subsections: [
        {
          title: "Derechos fundamentales bajo GPL v3",
          content: [
            "Libertad para ejecutar el programa con cualquier propósito",
            "Libertad para estudiar y modificar el código fuente",
            "Libertad para redistribuir copias",
            "Libertad para distribuir versiones modificadas",
          ],
        },
        {
          title: "Obligaciones",
          content: [
            "Mantener el aviso de copyright y licencia",
            "Proporcionar acceso al código fuente",
            "Las modificaciones deben distribuirse bajo GPL v3",
            "Documentar los cambios realizados al software",
          ],
        },
      ],
    },
    {
      title: "Privacidad y Cookies",
      content:
        "Pardalis utiliza cookies para mejorar el rendimiento y la funcionalidad de nuestra plataforma. Puede configurar su navegador para rechazar cookies, pero esto puede limitar su acceso a ciertas funcionalidades.",
      icon: "🔒",
    },
  ];

  let lastUpdateDate = "2024-11-08";
  // Para el efecto de scroll suave
  /**
   * @param {string} id
   */
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
</script>

<div class="min-h-screen flex flex-col bg-gray-50">
  <!-- Hero Section -->
  <div class="bg-linear-to-b from-[#f9c710] to-yellow-300 py-20 mt-16">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-4xl md:text-6xl font-bold text-white mb-4">
        Términos y Condiciones
      </h1>
      <p class="text-white">
        Última actualización: {lastUpdateDate}
      </p>
    </div>
  </div>

  <!-- Contenido Principal -->
  <div class="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
    <!-- Sidebar de navegación -->
    <aside class="md:w-1/4">
      <div class="sticky top-24 bg-white rounded-lg shadow-lg p-6">
        <h3 class="font-bold text-lg mb-4 text-gray-900">Contenido</h3>
        <nav class="space-y-2">
          {#each sections as section}
            <button
              class="w-full text-left px-4 py-2 rounded-lg transition-colors hover:bg-yellow-100 text-gray-700 hover:text-gray-900"
              onclick={() =>
                scrollToSection(
                  section.title.toLowerCase().replace(/\s+/g, "-"),
                )}
            >
              <span class="mr-2">{section.icon}</span>
              {section.title}
            </button>
          {/each}
        </nav>
      </div>
    </aside>

    <!-- Contenido principal -->
    <main class="md:w-3/4">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <!-- Introducción -->
        <div class="mb-12">
          <div class="p-4 bg-yellow-50 border-l-4 border-[#f9c710] rounded-sm">
            <p class="text-gray-700">
              Al utilizar Pardalis, aceptas nuestros términos y condiciones. Por
              favor, lee cuidadosamente este documento.
            </p>
          </div>
        </div>

        <!-- Secciones -->
        {#each sections as section}
          <section
            class="mb-12"
            id={section.title.toLowerCase().replace(/\s+/g, "-")}
          >
            <div class="flex items-center mb-6">
              <span class="text-3xl mr-4">{section.icon}</span>
              <h2 class="text-3xl font-bold text-gray-900">{section.title}</h2>
            </div>
            <div class="prose max-w-none">
              <p class="text-gray-700 leading-relaxed mb-6">
                {section.content}
              </p>
              <!-- Subsecciones con estilo -->
              {#if section.title === "Términos generales"}
                <div
                  class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                >
                  <h3 class="text-xl font-semibold mb-4">
                    Definiciones y términos clave
                  </h3>
                  <p class="text-gray-700">
                    Para ayudar a explicar las cosas de la manera más clara
                    posible en estos Términos y Condiciones, cada vez que se
                    hace referencia a cualquiera de estos términos, se definen
                    estrictamente como:
                  </p>
                  <ul>
                    <li>
                      <strong>Cookie:</strong> Pequeña cantidad de datos generados
                      por un sitio web y guardados por su navegador web. Se utiliza
                      para identificar su navegador, proporcionar análisis, recordar
                      información sobre usted, como su preferencia de idioma o información
                      de inicio de sesión.
                    </li>
                    <li>
                      <strong>Compañía:</strong> Cuando estos Terminos mencionan
                      "Compañia", "nosotros", "nos" o "nuestro", se refiere a Pardalis
                      que es responsable de su información en virtud de estos Términos
                      y Condiciones.
                    </li>
                    <li>
                      <strong>Plataforma:</strong> Sitio web de Internet, aplicación
                      web o aplicación digital de cara al público de Pardalis.
                    </li>
                    <li>
                      <strong>País:</strong> Donde se encuentra Pardalis o los propietarios/fundadores
                      de Pardalis en este caso es México.
                    </li>
                    <li>
                      <strong>Dispositivo:</strong> Cualquier dispositivo conectado
                      a Internet, como un teléfono, tablet, computadora o cualquier
                      otro dispositivo que se pueda usar para visitar Pardalis y
                      usar los servicios.
                    </li>
                    <li>
                      <strong>Servicio:</strong> Se refiere al servicio brindado
                      por Pardalis como se describe en los términos relativos (si
                      están disponibles) y en esta plataforma.
                    </li>
                    <li>
                      <strong>Terceros:</strong> Se refiere a anunciantes, patrocinadores
                      de concursos, socios promocionales y de marketing, y otros
                      que brindan nuestro contenido o cuyos productas o servicios
                      que creemos que pueden interesarle.
                    </li>
                    <li>
                      <strong>Sitio web:</strong> El sitio de Pardalis que se puede
                      accerder a través de esta URL:.
                    </li>
                    <li>
                      <strong>Usted:</strong> Una persona o entidad que está registrada
                      con Pardalis para utilizar los Servicios.
                    </li>
                  </ul>
                </div>

                <div
                  class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                >
                  <h3 class="text-xl font-semibold mb-4">Restricciones</h3>
                  <p class="text-gray-700">
                    Usted acepta no hacerlo y no permitirá que otros:
                  </p>
                  <p class="text-gray-700">
                    Usted acepta no hacerlo y no permitirá que otros:
                  </p>
                  <ul>
                    <li>
                      Licenciar, vender, alquilar, arrendar, asignar,
                      distribuir, transmitir, alojar, subcontratar, divulgar o
                      explotar comercialmente la plataforma o poner la
                      plataforma a disposición de terceros.
                    </li>
                    <li>
                      Modificar, realizar trabajos derivados, desensamblar,
                      descifrar, realizar una compilación inversa o realizar
                      ingeniería inversa de cualquier parte de la plataforma.
                    </li>
                    <li>
                      Eliminar, alterar u ocultar cualquier aviso de propiedad
                      (incluido cualquier aviso de derechos de autor o marca
                      registrada) de sus afiliados, socios, proveedores o
                      licenciatarios de la plataforma.
                    </li>
                  </ul>
                </div>
                <div
                  class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                >
                  <h3 class="text-xl font-semibold mb-4">
                    Política de Devolución y Reembolso
                  </h3>
                  <p class="text-gray-700">
                    Gracias por comprar en Pardalis. Apreciamos el hecho de que
                    le guste comprar las cosas que construimos. También queremos
                    asegurarnos de que tenga una experiencia gratificante
                    mientras explora, evalúa y compra nuestros productos. Al
                    igual que con cualquier experiencia de compra, existen
                    términos y condiciones que se aplican a las transacciones en
                    Pardalis. Seremos tan breves como lo permitan nuestros
                    abogados. Lo principal que debe recordar es que al realizar
                    un pedido o realizar una compra en Pardalis, acepta los
                    términos junto con la Política de privacidad de Pardalis. Si
                    por alguna razón no está completamente satisfecho con algún
                    bien o servicio que brindamos, no dude en contactarnos y
                    discutiremos cualquiera de los problemas que esté
                    atravesando con nuestro producto.
                  </p>
                </div>
                <div
                  class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                >
                  <h3 class="text-xl font-semibold mb-4">Tus sugerencia</h3>
                  <p class="text-gray-700">
                    Cualquier, comentario, idea, mejora o sugerencia
                    (colectivamente, "Sugerencias") que usted proporcione a
                    Pardalis con respecto a la plataforma seguirá siendo
                    propiedad única y exclusiva de Pardalis. Pardalis tendrá la
                    libertad de usar, copiar, modificar, publicar o redistribuir
                    las Sugerencias para cualquier propósito y de cualquier
                    manera sin ningún crédito o compensación para usted.
                  </p>
                </div>
                <div
                  class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                >
                  <h3 class="text-xl font-semibold mb-4">Tu consentimiento</h3>
                  <p class="text-gray-700">
                    Hemos actualizado nuestros Términos y condiciones para
                    brindarie total transparencia sobre lo que se establece
                    cuando visita nuestro sitio y como se utiliza. Al utilizar
                    nuestra plataforma, registrar una cuenta o realizar una
                    compra, por la presente acepta nuestros Términos y
                    condiciones.
                  </p>
                </div>
                <div
                  class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                >
                  <h3 class="text-xl font-semibold mb-4">
                    Enlaces a otros Sitios web
                  </h3>
                  <p class="text-gray-700">
                    Estos Términos y Condiciones se aplican solo a los
                    Servicios. Los Servicios pueden contener enlaces a obos
                    sitios web que Pardalis no opera ni controls. No somos
                    responsables por el contenido, la precisión o las opiniones
                    expresadas en dichas sitios web, y dichos. sitios web no son
                    investigados, monitoreados o verificados por nuestra
                    precisión o integridad. Flecuerde que cuando utiliza un
                    enlace para ir de los Servicios a otro sitio web, nuestros
                    Términos y condiciones dejan de estar vigentes. Su
                    navegación e interacción en cualquier otro sitio web,
                    incluidos aquellos que tienen un enlace en nuestra
                    plataforma, están sujetos a las propias reglas y politicas
                    de ese sitio web. Dichos terceros pueden utilizar sus
                    propias cookies u otros métodos para recopilar información
                    sobre usted.
                  </p>
                </div>
                <div
                  class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                >
                  <h3 class="text-xl font-semibold mb-4">Cookies</h3>
                  <p class="text-gray-700">
                    Pardalis utiliza "cookies" para identificar las áreas de
                    nuestro sitio web que ha visitado. Una cookie es una pequeña
                    porción de datos que su navegador web almacena en su
                    computadora o dispositivo móvil. Usamos cookies para mejorar
                    el rendimiento y la funcionalidad de nuestra plataforma,
                    pero no son esenciales para su uso, Sin embargo, sin estas
                    cookies, es posible que ciertas funciones, como los vídeos,
                    no estén disponibles o se le solicitará que ingrese sus
                    datos de inicio de sesión cada vez que visite la plataforma,
                    ya que no podríamos recordar que había iniciado sesión
                    anteriormente. La mayoría de los navegadores web se pueden
                    configurar para desactivar el uso de cookies. Sin embargo,
                    si desactiva las cookies, es posible que no pueda acceder a
                    la funcionalidad de nuestro sitio web correctamente o en
                    absoluto. Nunca colocamos información de identificación
                    personal en cookies.
                  </p>
                </div>
                <div
                  class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                >
                  <h3 class="text-xl font-semibold mb-4">
                    Cambios en nuestros Términos y Condiciones
                  </h3>
                  <p class="text-gray-700">
                    Usted reconoce y acepta que Pardalis puede dejar de
                    brindarle (de forma permanente o temporal) el Servicio (o
                    cualquier función dentro del Servicio) a usted o a los
                    usuarios en general, a discreción exclusiva de Pardalis, sin
                    previo aviso. Puede dejar de utilizar el Servicio en
                    cualquier momento. No es necesario que informe
                    específicamente a Pardalis cuando deje de usar el Servicio.
                    Usted reconoce y acepta que si Pardalis deshabilita el
                    acceso a su cuenta, es posible que no pueda acceder al
                    Servicio, los detalles de su cuenta o cualquier archivo u
                    otro material contenido en su cuenta. Si decidimos cambiar
                    nuestros Términos y condiciones, publicaremos esos cambios
                    en esta página y / o actualizaremos la fecha de modificación
                    de los Términos y condiciones a continuación.
                  </p>
                </div>
                <div
                  class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                >
                  <h3 class="text-xl font-semibold mb-4">
                    Modificaciones a nuestra plataforma
                  </h3>
                  <p class="text-gray-700">
                    Pardalis se reserva el derecho de modificar, suspender o
                    interrumpir, temporal o permanentemente, la plataforma o
                    cualquier servicio al que se conecte, con o sin previo aviso
                    y sin resposabilidad ante usted.
                  </p>
                </div>
                <div
                  class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                >
                  <h3 class="text-xl font-semibold mb-4">
                    Actualizaciones a nuestra plataforma
                  </h3>
                  <p class="text-gray-700">
                    Pardalis puede, de vez en cuando, proporcionar mejoras a las
                    características / funcionalidad de la plataforma, que pueden
                    incluir parches, correción de errores, actualizaciones,
                    mejoras y otras modificaciones ("Actualizaciones"). Las
                    actualizaciones pueden modificar o eliminar características
                    y / o funcionalidades de la plataforma. Usted acepta que
                    Pardalis no tiene la obligación de (i) proporcionar
                    Actualizaciones, o (ii) continuar proporcionándole o
                    habilitando características y / o funcionalidades
                    particualres de la plataforma. Además, acepta que todas las
                    Actualizaciones (i) se considerarán una parte integral de la
                    plataforma y (ii) estarán sujetas a los términos y
                    condiciones de este Acuerdo.
                  </p>
                </div>
                <div
                  class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                >
                  <h3 class="text-xl font-semibold mb-4">
                    Servicios de Terceros
                  </h3>
                  <p class="text-gray-700">
                    Podemos mostrar, incluir o poner a disposición contenido de
                    terceros (incluidos datos, información, aplicaciones y otros
                    servicios productos) o proporcionar enlaces a sitios web o
                    servicios de terceros ("Servicios de terceros."). Usted
                    reconoce y acepta que Pardalis no será responsable de ningún
                    Servicio de terceros, incluida su precisión, integridad,
                    puntualidad, validez, cumplimiento de los derechos de autos,
                    legalidad, decencia, calidad o cualquier otro aspecto de los
                    mismos. Pardalis no asume ni tendrá ninguna obligación o
                    responsabilidad ante usted o cualquier otra persona o
                    entidad por los Servicios de terceros. Los Servicios de
                    terceros y los enlaces a los mismos se brindan únicamente
                    para su conveniencia y usted accede a ellos y los usa
                    completamente bajo su propio riesgo y sujeto a los términos
                    y condiciones de dichos terceros.
                  </p>
                </div>
                <div
                  class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                >
                  <h3 class="text-xl font-semibold mb-4">
                    Duración y Terminación
                  </h3>
                  <p class="text-gray-700">
                    Este Acuerdo permanecerá en vigor hasta que usted o Pardalis
                    lo rescindan. Pardalis puede, a su entera discreción, en
                    cualquier momento y por cualquier motivo o sin él, suspender
                    o rescindir este Acuerdo con o sin previo aviso. Este
                    Acuerdo terminará inmediatamente, sin previo aviso de
                    Pardalis, en caso de que no cumpla con alguna de las
                    disposiciones de este Acuerdo. Tambén puede rescindir este
                    Acuerdo eliminando su cuenta de la plataforma y todas las
                    copias de la misma en su computadora. Tras la rescisión de
                    este Acuerdo no limitará ninguno de los derechos o recursos
                    de Pardalis por ley o equidad en caso de incumplimiento por
                    su parte (durante la vigencia de este Acuerdo) de cualquiera
                    de sus oblicaciones en virtud del presente Acuerdo.
                  </p>
                </div>
                <div
                  class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                >
                  <h3 class="text-xl font-semibold mb-4">
                    Aviso de infracción de Derechos de Autor
                  </h3>
                  <p class="text-gray-700">
                    Si usted es propietario de los derechos de auito o el agente
                    de dicho propietario y cree que cualquier materal de nuestra
                    plataforma constituye una infracción de sus derechos de
                    autor, comuníquese con nostros y proporcione la siguiente
                    información:(a) una firma física o eletrónica del
                    propietario de los derechos de autor o una persona
                    autorizada para actuar en su nombre; (b) identificación del
                    material que se alega infringe; (c) si información de
                    contacto, incluida su dirección, número de teléfono y un
                    correo electrónico; (d) una declaración suya de que cree de
                    buena fe que el uso del material no está atuorizado por los
                    propietarios de los derechos de autor; y (e) la declaración
                    de que la información en la notificación es precisa y, bajo
                    pena de perjurio, usted está autorizado a actuar en nombre
                    del propietario.
                  </p>
                </div>
                <div
                  class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                >
                  <h3 class="text-xl font-semibold mb-4">Indemnización</h3>
                  <p class="text-gray-700">
                    Usted acepta indemnizar y eximir de responsabilidad a
                    Pardalis y a sus empresas matrices, subsidiarias, afiliadas,
                    funcionarios, empleados, agentes, socios y otorgantes de
                    licencias (si corresponde) de cualquier reclamo o demanda,
                    incluidos los honorarios razonables de abogados, debido a
                    que surja de su: (a) uso de la plataforma; (b) violación de
                    este Acuerdo o cualquier ley o reglamento; o (c) violación
                    de cualquier derecho de un tercero.
                  </p>
                </div>
                <div
                  class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                >
                  <h3 class="text-xl font-semibold mb-4">Sin garantías</h3>
                  <p class="text-gray-700">
                    La platadorma se le proporcial "TAL CUAL" y "SEGÚN
                    DISPONIBILIDAD" y con todas las fallas y defectos sin
                    garantía de ningún tipo. En la medida máxima permitida por
                    la ley aplicable, Pardalis, en su propio nombre y en nombre
                    de sus afiliados y sus respectivos licenciantes y
                    proveedores de servicios, renuncia expresamente a todas las
                    garantías, ya sean expresas, implícitas, legales o de otro
                    tipo, con respecto a la plataforma, incluidas todas las
                    garantías implícitas de comerciabilidad, idoneidad para un
                    propósito particular, título y no infracción, y garantías
                    que puedan surgir del curso del trato, el curso del
                    desempeño, el uso o la práctica comercial. Sin limitación a
                    lo anterior, Pardalis no ofrece garantía ni compromiso, y no
                    hace ninguna representación de ningún tipo tipo de que la
                    plataforma cumplirá con sus requisitos, logrará los
                    resultados previstos, será compatible o funcionará con
                    cualquier otro software, sitio web, sistemas o servicios,
                    operen sin interrupciones, cumplan con los estándares de
                    reindimiento o confiabilidad o que no tengan errores o que
                    cualquier error o defecto puede o será corregido.
                  </p>
                  <p class="text-gray-700">
                    Sin limitar o anterior, ni Pardalis ni ningún proveedor de
                    Pardalis hace ninguna representación o garantía de ningún
                    tipo, expresa o implícita: (i) en cuanto al funcionamiento o
                    disponibilidad de la plataforma, o la información, contenido
                    y materiales o productos incluidos en el mismo; (ii) que la
                    plataforma será interrumpida o libre de errores; (iii) en
                    cuanto a la precisión, confiabilidad o vigencia de cualquier
                    información o contenido proporcionado a través de la
                    plataforma; o (iv) que la plataforma, sus servidores, el
                    contenido o los correos electrónicos enviados desde o en
                    nombre de Pardalis están libres de virus, scripts, troyanos,
                    gusanos, malware, bombas de tiempo u otros componentes
                    nocivos. Algunas jurisdicciones no permiten la exclusión o
                    las limitaciones de las garantías implícitas o las
                    limitaciones de los derechos legales aplicables de un
                    consumidor, por lo que algunas o todas las exclusiones y
                    limitaciones anteriores pueden no aplicarse en su caso.
                  </p>
                </div>
                <div
                  class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                >
                  <h3 class="text-xl font-semibold mb-4">
                    Limitación de Responsabilidad
                  </h3>
                  <p class="text-gray-700">
                    Sin perjuicio de los daños en los que pueda incurrir, la
                    responsabilidad total de Pardalis y cualquiera de sus
                    proveedores en virtud de cualquier disposición de este
                    Acuerdo y su recurso exclusivo por todo lo anterior se
                    limitará al monto realmente pagado por usted para la
                    plataforma. En la máxima medida permitida por la ley
                    aplicable, en ningún caso Pardalis o sus proveedores serán
                    responsables de ningún daño especial, incidental, indirecto
                    o consecuente de ningún tipo (incluidos, entre todos, daños
                    por lucro cesante, por pérdida de datos u otra información,
                    por interrupción del negocio, por lesiones personales, por
                    la pérdida de privacidad que surja de alguna manera
                    relacionada con el uso o la imposibilidad de usar la
                    plataforma, software de terceros y / o - hardware de
                    terceros utilizado con la plataforma, o de otro modo en
                    relación con cualquier disposición de este Acuerdo), incluso
                    si Pardalis o cualquier proveedor ha sido informado de la
                    posibilidad de tales daños e incluso si el recurso no cumple
                    con su propósito esencial. Algunos estados /bjurisdicciones
                    no permiten la exclusión o limitación de daños incidentales
                    o consecuentes, por lo que es posible que la limitación o
                    exclusión anterior no se aplique en su caso.
                  </p>
                </div>
                <div
                  class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                >
                  <h3 class="text-xl font-semibold mb-4">Divisibilidad</h3>
                  <p class="text-gray-700">
                    Si alguna disposición de este Acuerdo se considera
                    inaplicable o inválida, dicha disposición se cambiará e
                    interpretará para lograr los objetivos de dicha
                    disposiciónen la mayor medida posible según la ley aplicable
                    y las disposiciones restantes continuarán en preno vigor y
                    efecto. Este Acuerdo, junto con la Política de privacidad y
                    cualquier otro aviso legal publicado por Pardalis en los
                    Servicios, constituirá el acuerdo completo entre usted y
                    Pardalis con respecto a los Servicios. Si alguna disposición
                    de este Acuerdo es considerada inválida por un tribunal de
                    jurisdicción competente, la invalidez de dicha disposición
                    no afectará la validez de las disposiciones restantes de
                    este Acuerdo, que permanecerán en pleno vigor y efecto.
                    Ninguna renuncia a cualquier término de este Acuerdo se
                    considerará una renuncia adioconal o continua de dicho
                    término o cualquier otro término, y el hecho de que no haga
                    valer ningún derecho o disposición en virtud de este Acuerdo
                    no constituirá una renuncia a dicho derecho. O provisión.
                    USTED Y ACEPTAN QUE CUALQUIER CAUSA DE ACCIÓN QUE SURJA O
                    ESTÉ RELACIONADA CON LOS SERVICIOS DEBE COMENZAR DENTRO DE
                    (1) AÑO DESPUÉS DE QUE LA CAUSA DE ACCIÓN SE ACUERDA. DE LO
                    CONTRARIO, DICHA CAUSA DE ACCIÓN ESTÁ PERMANENTEMENTE
                    PROHIBIDA.
                  </p>
                </div>
                <div
                  class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                >
                  <h3 class="text-xl font-semibold mb-4">Renuncia</h3>
                  <p class="text-gray-700">
                    Salvo lo dispuesto en el presente, el hecho de no ejercer un
                    derecho o exigir el cumplimiento de una obligación en virtud
                    de este Acuerdo no afectará la capacidad de una de las
                    partes para ejercer dicho derecho o requerir dicho
                    cumplimiento en cualquier momento posterior, ni constituirá
                    la renuncia a una infracción, cualquier incumplimiento
                    posterior.
                  </p>
                  <p class="text-gray-700">
                    Ninguna falla en el ejercicio, ni demora en el ejercicio,
                    por parte de cualquiera de las partes, de cualquier derecho
                    o poder bajo este Acuerdo operará como una renuncia a ese
                    derecho o poder. El ejercicio único o parcial de cualquier
                    derecho o poder en virtud de este Acuerdo tampoco impedirá
                    el ejercicio posterior de ese o cualquier otro derecho
                    otorgado en este documento. En caso de conflicto entre este
                    Acuerdo y cualquier compra u otros términos aplicables.
                    regirán los términos de este Acuerdo.
                  </p>
                </div>
                <div
                  class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                >
                  <h3 class="text-xl font-semibold mb-4">
                    Enmiendas a este Acuerdo
                  </h3>
                  <p class="text-gray-700">
                    Pardalis se reserva el derecho, a su entera discreción, de
                    modificar o reemplazar este Acuerdo en cualquier momento. Si
                    una revisión es importante, proporcionaremos un aviso de al
                    menos 30 días antes de que entren en vigencia los nuevos
                    términso. Lo que constituye un cambio material se
                    determinará a nuestro exclusivo criterio. Si continúa
                    accediendo o utilizando nuestra plataforma después de que
                    las revisiones entren en vigencia, usted acepta estar sujeto
                    a los términos revisados. Si no está de acuerdo con los
                    nuevos términos, ya no está autorizado para usar Pardalis.
                  </p>
                </div>
                <div
                  class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                >
                  <h3 class="text-xl font-semibold mb-4">Acuerdo completo</h3>
                  <p class="text-gray-700">
                    El Acuerdo constituye el acuerdo completo entre usted y
                    Pardalis con respecto a su uso de la plataforma y reemplaza
                    todos los acuerdos escritos u orales anteriores y
                    contemporáneos entre usted y Pardalis. Es posible que esté
                    sujeto a términos y condiciones adicionales que se aplican
                    cuando usa o compra otros servicios de Pardalis, que
                    Pardalis le proporcionará en el momento de dicho uso o
                    compra.
                  </p>
                </div>
                <div
                  class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                >
                  <h3 class="text-xl font-semibold mb-4">
                    Actualizaciones de nuestros Términos
                  </h3>
                  <p class="text-gray-700">
                    Podemos cambiar nuestro Servicio y nuestras políticas, y es
                    posible que debamos realizar cambios en estos Términos para
                    que reflejen con precisión nuestro Servicio y nuestras
                    políticas. A menos que la ley exija lo contrario, le
                    notificaremos (por ejemplo, a través de nuestro Servicio)
                    antes de realizar cambios en estos Términos y le daremos la
                    oportunidad de revisarlos antes de que entren en vigencia.
                    Luego, si continúa utilizando el Servicio, estará sujeto a
                    los Términos actualizados. Si no desea aceptar estos o
                    alguno de los Términos actualizados. Puede eliminar su
                    cuenta.
                  </p>
                </div>
                <div
                  class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                >
                  <h3 class="text-xl font-semibold mb-4">
                    Propiedad intelectual
                  </h3>
                  <p class="text-gray-700">
                    La plataforma y todo su contenido, características y
                    funcionalidad (que incluyen, entre otros, toda la
                    información, software, texto, pantallas, imágenes, video y
                    audio, y el diseño, selección y disposición de los mismos),
                    son propiedad de Pardalis, sus licenciantes u otros
                    proveedores de dicho material y están protegidos por México
                    y leyes internacionales de derechos de autor, marcas
                    registradas, patentes, secretos comerciales y otras leyes de
                    propiedad intelectual o derechos de propiedad. El material
                    no puede ser copiado, modificado, reproducido, descargado o
                    distribuido de ninguna manera, en su totalidad o en parte,
                    sin el permiso previo expreso por escrito de Pardalis, a
                    menos que y excepto que se indique expresamente en estos
                    Términos y Condiciones. Se prohíbe cualquier uso no
                    autorizado del material.
                  </p>
                </div>
                <div
                  class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                >
                  <h3 class="text-xl font-semibold mb-4">
                    Acuerdo de Arbitraje
                  </h3>
                  <p class="text-gray-700">
                    Esta sección se aplica a cualquier disputa, EXCEPTO QUE NO
                    INCLUYE UNA DISPUTA RELACIONADA CON RECLAMOS POR RECURSOS
                    INJUNTIVOS O EQUITATIVOS CON RESPECTO A LA EJECUCIÓN O
                    VALIDEZ DE SUS DERECHOS DE PROPIEDAD INTELECTUAL O DE
                    Pardalis. El término "disputa" significa cualquier disputa,
                    acción u otra controversia entre usted y Pardalis en
                    relación con los Servicios o este acuerdo, ya sea en
                    contrato, garantía, agravio, estatuto, regulación, ordenanza
                    o cualquier orta base legal o equitativa. "Disputa" tendrá
                    el significado más amplio posible permitido por la ley.
                  </p>
                </div>
                <div
                  class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                >
                  <h3 class="text-xl font-semibold mb-4">Aviso de Disputa</h3>
                  <p class="text-gray-700">
                    En el caso de una disputa, usted o Pardalis deben darle al
                    otro un Aviso de Disputa, que es una declaración escrita que
                    establece el nombre, la dirección y la información de
                    contacto de la parte que la proporcionó los hechos que
                    dieron lugar a la disputa y la reparación solicitada. Debe
                    enviar cualquier Aviso de disputa por correo electrónico a:
                    contacto@pardalis.com. Pardalis le enviará cualquier Aviso
                    de disputa por correo a su dirección si la tenemos, o de
                    otra manera a su dirección de correo electrónico. Usted y
                    Pardalis intentarán resolver cualquier disputa mediante una
                    negociación informal dentro de los sesenta(60) días a partir
                    de la fecha en que se reciba el Aviso de disputa. Después de
                    sesenta (60) días, usted o Pardalis pueden comenzar el
                    arbitraje.
                  </p>
                </div>
                <div
                  class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                >
                  <h3 class="text-xl font-semibold mb-4">
                    Arbitraje Obligatorio
                  </h3>
                  <p class="text-gray-700">
                    Si usted y Pardalis no resuelven ninguna disputa mediante
                    una negociación informal, cualquier otro esfuerzo para
                    resolver la disputa se llevará a cabo exclusivamente
                    mediante arbitraje vinculante como se describe en est a
                    sección. Está renunciando al derecho de litigar (o
                    participar como parte o miembro de la clase) todas las
                    disputas en la corte ante un jue o jurado. La disputa se
                    resolverá mediante arbitraje vinculante de acuerdo con las
                    reglas de arbitraje comercial de la Asociación Americana de
                    Arbitraje. Cualquiera de las partes puede buscar medidas
                    cautelares provisionales o preliminares de cualquier
                    tribunal de jurisdicción competente, según sea necesario
                    para proteger los derechos o la propiedad de las partes en
                    espera de la finalización del arbitraje. Todos y cada uno de
                    los costos, honorarios y gastos legales, contables y de otro
                    tipo en los que incurra la parte ganadora correrán a cargo
                    de la parte no ganadora.
                  </p>
                </div>
                <div
                  class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                >
                  <h3 class="text-xl font-semibold mb-4">
                    Envíos y Privacidad
                  </h3>
                  <p class="text-gray-700">
                    En el caos de que envíe o publique ideas, sugerencias
                    creativas, diseños, fotografías, información, anuncios,
                    datos o propuestas, incluidas ideas para productos,
                    servicios, funciones, tecnologías o promociones nuevos o
                    mejorados, acepta expresamente que dichos envíos se
                    realizarán automáticamente, será tratado como no
                    confidencial y no propietario y se convertirá en propiedad
                    exclusiva de Pardalis sin ningún tipo de compensación o
                    crédito para usted. Pardalis y sus afiliados no tendrán
                    obligaciones con respecto a dichos envíos o publicaciones y
                    pueden usar las ideas contenidas en dichos envíos o
                    publicaciones para cualquier propósito en cualquier medio a
                    perpetuidad, incluyendo, pero no limitado a desarrollo,
                    fabricación, y comercializar productos y servicios
                    utilizando las ideas.
                  </p>
                </div>
                <div
                  class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                >
                  <h3 class="text-xl font-semibold mb-4">Promociones</h3>
                  <p class="text-gray-700">
                    Pardalis puede, de vez en cuando, incluir concursos,
                    promociones, sorteos u otras actividades ("Promociones") que
                    requieren que envíe material o información sobre usted.
                    Tenga en cuenta que todas las promociones pueden regirse por
                    reglas independientes que pueden contener ciertos requisitos
                    de elegibilidad, como restricciones de edad y ubicación
                    geográfica. Usted es responsable de leer todas las reglas de
                    Promociones para determinar si es elegible para participar o
                    no. Si participa en alguna Promoción, acepta cumplir con
                    todas las reglas de promociones. Es posible que se apliquen
                    términos y condiciones adicionales a las compras de bienes o
                    servicios a través de los Servicios, cuyos términos y
                    condiciones forman parte de este Acuerdo mediante esta
                    referencia.
                  </p>
                </div>
                <div
                  class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                >
                  <h3 class="text-xl font-semibold mb-4">
                    Errores Tipográficos
                  </h3>
                  <p class="text-gray-700">
                    En el caso de que un producto y / o servicio se enumere a un
                    precio incorrecto o con información incorrecta debido a un
                    error tipográfico, tendremos el derecho de rechazar o
                    cancelar cualquier pedido, ya sea que se haya confirmado o
                    no y se haya cargado a su tarjeta de crédito. Si su tarjeta
                    de crédito ya ha sido cargada por la compra y su pedido es
                    cancelado, emitiremos inmediatamente un crédito a su cuenta
                    de tarjeta de crédito u otra cuenta de pago por el monto del
                    cargo.
                  </p>
                </div>
                <div
                  class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                >
                  <h3 class="text-xl font-semibold mb-4">Diverso</h3>
                  <p class="text-gray-700">
                    Si por alguna razón un tribunal de jurisdicción competente
                    determina que alguna disposición o parte de estos Términos y
                    condiciones no se puede hacer cumplir, el resto de estos
                    Términos y condiciones continuará en pleno vigor y efecto.
                    Cualquier renuncia a cualquier disposición de estos Términos
                    y condiciones será efectiva solo si está por escrito y
                    firmada por un representante autorizado de Pardalis.
                    Pardalis tendrá derecho a una medida cautelar u otra
                    compensación equitativa (sin la obligación de depositar
                    ninguna fianza o garantía) en caso de incumplimiento
                    anticipado por su parte. Pardalis opera y controla el
                    servicio Pardalis desde sus oficinas en México. El servicio
                    no está destinado a ser distribuido ni utilizado por ninguna
                    persona o entidad de ninguna jurisdicción o país donde dicha
                    distribución o uso sea contrario a la ley o regulación. En
                    consecuencia, las personas que eligen acceder al Servicio
                    Pardalis desde otras ubicaciones lo hacen por iniciativa
                    propia y son únicas responsables del cumplimiento de las
                    leyes locales, en la medida en que las leyes locales sean
                    aplicables. Estos Términos y condiciones (que incluyen e
                    incorporan la Política de privacidad de Pardalis) contienen
                    el entendimiento completo y reemplazan todos los
                    entendimientos previos eter usted y Pardalis con respecto a
                    su tema, y usted no puede cambiarlos ni modificarlos. Los
                    títulos de las secciones que se utilizan en este Acuerdo son
                    solo por la conveniencia y no se les dará ninguna
                    importancia legal.
                  </p>
                </div>

                <div
                  class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                >
                  <h3 class="text-xl font-semibold mb-4">
                    Descargo de Responsabilidad
                  </h3>
                  <p class="text-gray-700">
                    Pardalis no es responsable de ningún contenido, código o
                    cualquier otra imprecisión. Pardalis no ofrece garantías. En
                    ningún caso será responsable de ningún daño especial,
                    directo, indirecto, consecuente o incidental o de cualquier
                    daño, ya sea en una acción contractual, neglicencia u otro
                    agravio, que surja de o en conexión con el uso del Servicio
                    o el contenido del Servicio, se reserva el derecho de
                    realizar adiciones, eliminaciones o modificaciones al
                    contenido del Servicio en cualquier momento sin previo
                    aviso.
                  </p>
                  <p class="text-gray-700">
                    El Servicio y su contenido se proporcionan "tal cual" y
                    "Según esté disponible" sin ninguna garantía o
                    representación de ningún tipo, ya sea expresa o implicíta.
                    Es un distribuidor y no un editor del contenido
                    proporcionado por terceros; como tal, no ejerce ningún
                    control editorial sobre dicho contenido y no ofrece ninguna
                    garantía o representación en cuanto a la precisión,
                    confiabilidad o vigencia de cualquier información,
                    contenido, servicio o mercancía proporcionada o accesible a
                    través del Servicio. Sin limitar lo anterior, renuncia
                    específicamente a todas las garantías y representaciones en
                    cualquier contenido transmitido en conexión con el Servicio
                    o en sitios que pueden aparecer como enlaces en el Servicio,
                    o en los productos como parte o en relación con el Servicio,
                    incluidas, entre otras, las garantías de comerciabilidad,
                    idoneidad para un propósito particular o no infracción de
                    derechos de terceros. Ningún consejo oral o información
                    escrita proporcionada por o cualquiera de sus afiliados,
                    empleados, funcionarios, directores, agentes o similares
                    creará una garantía. La información sobre precios y
                    disponibilidad está sujeta a cambios sin previo aviso. Sin
                    limitar lo anterior, no garantiza que el Servicio sea
                    ininterrumpido, sin corrupción, oportuno o sin errores.
                  </p>
                </div>
                <div
                  class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                >
                  <h3 class="text-xl font-semibold mb-4">Contáctenos</h3>
                  <p class="text-gray-700">
                    No dude en contactarnos si tienen alguna pregunta.
                  </p>
                  <ul>
                    <li>
                      A través de correo electrónico:
                      garcia.garcia.oscar2376@gmail.com
                    </li>
                  </ul>
                </div>
              {/if}
              {#if section.title === "Licencia" && section.subsections}
                {#each section.subsections as subsection}
                  <div
                    class="bg-white rounded-lg border border-gray-200 p-6 mb-6"
                  >
                    <h3 class="text-xl font-semibold mb-4">
                      {subsection.title}
                    </h3>
                    <ul class="list-disc pl-6 space-y-2">
                      {#each subsection.content as item}
                        <li class="text-gray-700">{item}</li>
                      {/each}
                    </ul>
                  </div>
                {/each}
                <div
                  class="bg-yellow-50 rounded-lg p-6 border-l-4 border-[#f9c710]"
                >
                  <p class="text-gray-700">
                    Para más detalles sobre la licencia GPL v3, puedes visitar
                    <a
                      href="https://www.gnu.org/licenses/gpl-3.0.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-[#f9c710] hover:underline font-medium"
                    >
                      la página oficial de GNU
                    </a>.
                  </p>
                </div>
              {/if}
            </div>
          </section>
        {/each}

        <!-- Sección de contacto -->
        <section class="mt-12 bg-gray-50 rounded-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            ¿Necesitas ayuda?
          </h2>
          <p class="text-gray-700 mb-4">
            Si tienes alguna pregunta sobre nuestros términos y condiciones, no
            dudes en contactarnos.
          </p>
          <a
            href="mailto:contacto@pardalis.com"
            class="inline-flex items-center bg-[#f9c710] text-white px-6 py-3 rounded-lg font-bold hover:bg-yellow-600 transition-colors"
          >
            Contáctanos
          </a>
        </section>
      </div>
    </main>
  </div>
</div>

<style>
  .container {
    max-width: 1200px;
  }

  .prose p {
    line-height: 1.8;
  }
</style>
