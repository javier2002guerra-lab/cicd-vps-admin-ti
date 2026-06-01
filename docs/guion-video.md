# Guion para el video

Hola, mi nombre es Javier Alejandro Guerra Zepeda. En este video presento la implementacion de un flujo CI/CD desplegado en una VPS.

Primero muestro la instancia creada en Google Cloud Compute Engine. Esta VPS se llama `cicd-vps-admin-ti`, se encuentra activa y tiene una IP publica externa. En esta maquina se instalo Docker y Docker Compose para ejecutar la aplicacion como contenedor.

Ahora se observa la aplicacion funcionando desde el servidor en la direccion `http://34.30.111.245`. La pagina muestra el estado online, el ambiente de produccion, el commit desplegado y las etapas principales del pipeline.

Tambien se muestra el endpoint `/health`, que responde en formato JSON con estado `ok`. Este endpoint se utiliza como verificacion automatica del servicio despues del despliegue.

Luego muestro el repositorio publico en GitHub. Aqui se encuentra el codigo fuente del proyecto, los archivos de configuracion, el Dockerfile, el archivo `compose.yml`, la documentacion y el workflow.

En el archivo `.github/workflows/deploy.yml` esta definido el flujo de CI/CD. El pipeline instala dependencias, ejecuta pruebas automaticas, compila el proyecto, construye la imagen Docker, la publica en GitHub Container Registry y finalmente despliega en la VPS por SSH.

Finalmente se muestra una ejecucion exitosa de GitHub Actions. Se puede ver que las etapas de validacion, construccion, publicacion y despliegue terminaron correctamente. El pipeline tambien ejecuta una prueba de humo contra `/health` para confirmar que el resultado final quedo funcionando en el servidor.

Con esto queda demostrado un flujo basico pero funcional de integracion continua y despliegue continuo hacia una VPS.
