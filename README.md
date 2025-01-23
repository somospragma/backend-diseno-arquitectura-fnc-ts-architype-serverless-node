| Fecha | Descripción | Realizado por | Validado por | Fecha de Validación |
|:-:|:-:|:-:|:-:|:-:|
| 25/11/2024 | Creación del Documento | Jairo Andrés Duarte Guzmán |**|**|

# Arquetipo

## 1. Arquitectura Hexagonal

La Arquitectura Hexagonal (también conocida como Arquitectura de Puertos y Adaptadores) es un patrón arquitectónico que promueve la separación de preocupaciones al dividir la aplicación en capas o componentes independientes. El núcleo de la aplicación (dominio) está aislado de los detalles de infraestructura y tecnología, permitiendo que los componentes externos interactúen con el núcleo a través de puertos (interfaces) y adaptadores (implementaciones concretas).

* **Aplicación en el Arquetipo:**
    * **Dominio (domain):** contiene la lógica de negocio pura, incluyendo entidades, servicios de dominio y repositorios (interfaces).
    * **Aplicación (application):** orquesta los casos de uso y actúa como intermediario entre el dominio y el mundo exterior.
    * **Infraestructura (infrastructure):** implementa los detalles técnicos y de infraestructura, como controladores, repositorios concretos, adaptadores y configuraciones.

![ArquitecturaHexagonal](./imagenes/ArquitecturaHexagonal.png)

## 2. Estructura del Proyecto

```scss
    📦src
    ┣ 📂functions
    ┃ ┗ 📜ObtainParameterFunction.ts
    ┣ 📂mercantil
    ┃ ┗ 📂arquetipo
    ┃ ┃ ┣ 📂crosscutting
    ┃ ┃ ┃ ┣ 📂configuration
    ┃ ┃ ┃ ┃ ┣ 📂extended
    ┃ ┃ ┃ ┃ ┗ 📜AppConfig.ts
    ┃ ┃ ┃ ┣ 📂dto
    ┃ ┃ ┃ ┃ ┣ 📂request
    ┃ ┃ ┃ ┃ ┃ ┣ 📂extended
    ┃ ┃ ┃ ┃ ┃ ┗ 📜PaginationRequestDto.ts
    ┃ ┃ ┃ ┃ ┗ 📂response
    ┃ ┃ ┃ ┃ ┃ ┣ 📜ApiResponse.ts
    ┃ ┃ ┃ ┃ ┃ ┣ 📜ErrorResponse.ts
    ┃ ┃ ┃ ┃ ┃ ┗ 📜PaginationResponseDto.ts
    ┃ ┃ ┃ ┣ 📂helpers
    ┃ ┃ ┃ ┃ ┗ 📜handleFunctionErrors.ts
    ┃ ┃ ┃ ┣ 📂http
    ┃ ┃ ┃ ┃ ┣ 📜AxiosHttpClient.ts
    ┃ ┃ ┃ ┃ ┣ 📜HttpClient.ts
    ┃ ┃ ┃ ┃ ┗ 📜index.ts
    ┃ ┃ ┃ ┣ 📂logging
    ┃ ┃ ┃ ┃ ┗ 📜Logger.ts
    ┃ ┃ ┃ ┣ 📂middleware
    ┃ ┃ ┃ ┃ ┣ 📜ErrorHandlingMiddleware.ts
    ┃ ┃ ┃ ┃ ┗ 📜validationMiddleware.ts
    ┃ ┃ ┃ ┗ 📂utils
    ┃ ┃ ┃ ┃ ┣ 📜Constants.ts
    ┃ ┃ ┃ ┃ ┗ 📜ResponseUtils.ts
    ┃ ┃ ┣ 📂parameterManagement
    ┃ ┃ ┃ ┣ 📂application
    ┃ ┃ ┃ ┃ ┣ 📂dto
    ┃ ┃ ┃ ┃ ┃ ┗ 📂response
    ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜Parameter.ts
    ┃ ┃ ┃ ┃ ┗ 📂useCases
    ┃ ┃ ┃ ┃ ┃ ┗ 📜GetParameterUseCase.ts
    ┃ ┃ ┃ ┣ 📂domain
    ┃ ┃ ┃ ┃ ┣ 📂ports
    ┃ ┃ ┃ ┃ ┃ ┗ 📜IParameterRepository.ts
    ┃ ┃ ┃ ┃ ┗ 📂services
    ┃ ┃ ┃ ┃ ┃ ┗ 📜ParameterService.ts
    ┃ ┃ ┃ ┗ 📂infrastructure
    ┃ ┃ ┃ ┃ ┣ 📂controllers
    ┃ ┃ ┃ ┃ ┃ ┗ 📜ParameterController.ts
    ┃ ┃ ┃ ┃ ┗ 📂dataProviders
    ┃ ┃ ┃ ┃ ┃ ┗ 📂userData
    ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜RedisParameterRepository.ts
    ┃ ┃ ┗ 📂userManagement
    ┃ ┃ ┃ ┣ 📂application
    ┃ ┃ ┃ ┃ ┣ 📂dto
    ┃ ┃ ┃ ┃ ┃ ┣ 📂request
    ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CreateUserDto.ts
    ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UpdateUserDto.ts
    ┃ ┃ ┃ ┃ ┃ ┗ 📂response
    ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserDtoResponse.ts
    ┃ ┃ ┃ ┃ ┣ 📂mappers
    ┃ ┃ ┃ ┃ ┃ ┗ 📜UserMapper.ts
    ┃ ┃ ┃ ┃ ┗ 📂useCases
    ┃ ┃ ┃ ┃ ┃ ┣ 📜CreateUserUseCase.ts
    ┃ ┃ ┃ ┃ ┃ ┣ 📜DeleteUserUseCase.ts
    ┃ ┃ ┃ ┃ ┃ ┣ 📜GetAllUsersUseCase.ts
    ┃ ┃ ┃ ┃ ┃ ┣ 📜GetUserUseCase.ts
    ┃ ┃ ┃ ┃ ┃ ┗ 📜UpdateUserUseCase.ts
    ┃ ┃ ┃ ┣ 📂domain
    ┃ ┃ ┃ ┃ ┣ 📂models
    ┃ ┃ ┃ ┃ ┃ ┗ 📜User.ts
    ┃ ┃ ┃ ┃ ┣ 📂ports
    ┃ ┃ ┃ ┃ ┃ ┣ 📂in
    ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserRepositoryPort.ts
    ┃ ┃ ┃ ┃ ┃ ┗ 📂out
    ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ParameterRepositoryPort.ts
    ┃ ┃ ┃ ┃ ┗ 📂services
    ┃ ┃ ┃ ┃ ┃ ┗ 📜UserService.ts
    ┃ ┃ ┃ ┗ 📂infrastructure
    ┃ ┃ ┃ ┃ ┣ 📂controllers
    ┃ ┃ ┃ ┃ ┃ ┗ 📜UserController.ts
    ┃ ┃ ┃ ┃ ┗ 📂dataProviders
    ┃ ┃ ┃ ┃ ┃ ┣ 📂restClients
    ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂implementation
    ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ParameterRestClient.ts
    ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂response
    ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ParameterResponseDTO.ts
    ┃ ┃ ┃ ┃ ┃ ┗ 📂userData
    ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜userDataProvider.ts
    ┣ 📂openapi
    ┃ ┣ 📂parameters
    ┃ ┃ ┗ 📜keyParameter.yaml
    ┃ ┣ 📂resources
    ┃ ┃ ┣ 📜parameters.yaml
    ┃ ┃ ┗ 📜users.yaml
    ┃ ┣ 📂responses
    ┃ ┃ ┣ 📜errorResponse.yaml
    ┃ ┃ ┣ 📜parameterSuccessResponse.yaml
    ┃ ┃ ┗ 📜userSuccessResponse.yaml
    ┃ ┣ 📂schemas
    ┃ ┃ ┣ 📜createUser.yaml
    ┃ ┃ ┣ 📜parameterResponse.yaml
    ┃ ┃ ┗ 📜userResponse.yaml
    ┃ ┣ 📜index.bundled.yaml
    ┃ ┗ 📜index.yaml
    ┣ 📜index.ts
    ┗ 📜indexRestApplication.ts
```

## 3. Homologación Arquitectura Hexagonal a BIAN

![DiagramaHomologaciónArquitecturaHexagonal-BIAN](./imagenes/DiagramaHomologaciónArquitecturaHexagonal-BIAN.png)

## 4. Patrones de Diseño Implementados

### 4.1. Patrón Repositorio (Repository Pattern)

El Patrón Repositorio abstrae el acceso a los datos, permitiendo a la aplicación interactuar con las fuentes de datos de una manera consistente e independiente de la implementación concreta (base de datos SQL, Redis).

* **Aplicación en el Arquetipo:**
    * **Interfaces de Repositorio en el Dominio:**
        **`IParameterRepository.ts`**
        **`UserRepositoryPort.ts`**

    * **Implementaciones en Infraestructura:**
        **`userDataProvider.ts`** implementación genérica para repositorios.
        **`RedisParameterRepository.ts`**  implementaciones específicas para Redis.

* **Cómo se Aplica:**
    * Los servicios de dominio utilizan las interfaces de repositorio para acceder a los datos, sin conocer los detalles de cómo se almacenan o recuperan.
    * Las implementaciones concretas de los repositorios se ubican en la capa de infraestructura, permitiendo cambiar o agregar nuevas fuentes de datos sin afectar al dominio.

### 4.2. Patrón Servicio (Service Layer Pattern)

El Patrón Servicio define una capa de servicios que encapsula la lógica de negocio y coordina las operaciones de los repositorios y otras entidades del dominio.

* **Aplicación en el Arquetipo:**
    * **Servicios de Dominio:**
        **`ParameterService.ts`** en **`mercantil/arquetipo/parameterManagement/domain/services`**

    * **Casos de Uso en la Capa de Aplicación:**
        **`GetParameterUseCase.ts`**

* **Cómo se Aplica:**
    * Los casos de uso (**`usecases`**) utilizan los servicios de dominio para ejecutar operaciones de negocio específicas.
    * Los servicios de dominio encapsulan la lógica de negocio, manteniendo el dominio coherente y evitando que los controladores o casos de uso tengan lógica de negocio.

### 4.3. Patrón de Fábrica (Factory Pattern)

El Patrón de Fábrica proporciona una forma de crear objetos sin exponer la lógica de creación al cliente, y se utiliza para encapsular la creación de objetos.

* **Aplicación en el Arquetipo:**
    * **Clase **`AppConfig.ts`** en **`crosscutting/configuration`**:**
        * Es responsable de actuar como una fábrica para crear y configurar instancias reutilizables, como clientes HTTP, servicios o repositorios..

* **Cómo se Aplica:**
    * La fábrica decide qué implementación de **`DataProviders`** o **`Repository`** utilizar en tiempo de ejecución, ocultando los detalles de creación al resto de la aplicación.
    * Facilita la inyección de dependencias y el cambio de implementaciones sin modificar el código cliente.

### 4.4. Patrón Adaptador (Adapter Pattern)

El Patrón Adaptador permite que clases con interfaces incompatibles trabajen juntas, convirtiendo la interfaz de una clase en otra que el cliente espera.

* **Aplicación en el Arquetipo:**
    * **Adaptadores en **`infrastructure/dataproviders`** y el `crosscutting/http`:**
        * Proveedores de Datos:
            **`RedisParameterRepository.ts`** implementa **`IParameterRepository`**
            **`userDataProvider.ts`** implementa **`UserRepositoryPort`**
            **`AxiosHttpClient.ts`** implementa **`HttpClient`**
        *

* **Cómo se Aplica:**
    * Los adaptadores implementan las interfaces esperadas por el dominio o la aplicación y traducen las llamadas a las implementaciones concretas.
    * Permiten que el dominio y la aplicación no dependan de detalles específicos de infraestructura o servicios externos.

### 4.5. Patrón Fachada (Facade Pattern)

El Patrón Fachada proporciona una interfaz simplificada a un conjunto de interfaces en un subsistema, haciendo que el subsistema sea más fácil de usar.

* **Aplicación en el Arquetipo:**
    * **Servicios de Dominio como Fachadas:**
        * **`ParameterService.ts`** actúa como una fachada que encapsula las operaciones relacionadas con préstamos, proporcionando métodos sencillos al resto de la aplicación.

* **Cómo se Aplica:**
    * Los servicios de dominio ofrecen una interfaz clara y simplificada para operaciones complejas que pueden involucrar múltiples repositorios, entidades y lógica de negocio.
    * Facilitan la interacción con el dominio desde los casos de uso y controladores.

### 4.6. Patrón Estrategia (Strategy Pattern)

El Patrón Estrategia permite definir una familia de algoritmos, encapsular cada uno y hacerlos intercambiables. Permite que el algoritmo varíe independientemente de los clientes que lo utilizan.

* **Aplicación en el Arquetipo:**
    * **Múltiples Implementaciones de Proveedores de Datos:**
        * Interfaces como **`IDataProvider`**, **`INoSqlDataProvider`**, **`ISqlDataProvider`** y sus implementaciones correspondientes (**`NoSqlDataProvider.java`**, **`SqlDataProvider.java`**).

* **Cómo se Aplica:**
    * La aplicación puede elegir dinámicamente qué estrategia (proveedor de datos) utilizar en tiempo de ejecución, permitiendo cambiar entre diferentes formas de acceso a datos sin modificar el código cliente.
    * Facilita la extensión de nuevas estrategias de almacenamiento o acceso a datos en el futuro.

### 4.7. Patrón Observador (Observer Pattern)

El Patrón Observador define una dependencia uno a muchos entre objetos, de manera que cuando un objeto cambia de estado, todos sus dependientes son notificados y actualizados automáticamente.

* **Aplicación en el Arquetipo:**
    * **Manejo de Eventos:**
        * Eventos y Manejadores en **`domain/events`** y **`infrastructure/eventhandlers`**:
            * Actualmente no se han creado las clases, los directorios **`events`** y **`eventhandlers`** lo ideal es el uso eventos y suscriptores.

* **Cómo se Aplica:**
    * Cuando ocurre un evento en el dominio (por ejemplo, la creación de un préstamo), se puede notificar a múltiples manejadores que realizan acciones adicionales (enviar correos electrónicos, actualizar estadísticas, entre otros.).
    * Desacopla el origen del evento de los efectos secundarios, mejorando la modularidad y extensibilidad.

### 4.8. Patrón Singleton

El Patrón Singleton asegura que una clase tenga solo una instancia y proporciona un punto de acceso global a ella.

* **Aplicación en el Arquetipo:**
    * **Servicios de Configuración y Manejo de Secretos:**
        * **`SecretService.java`** esta implementado como un singleton para asegurar un único punto de acceso a los secretos de la aplicación.

* **Cómo se Aplica:**
    * Garantiza que componentes críticos como la configuración de secretos o ciertos servicios compartidos tengan una única instancia en toda la aplicación.
    * Controla el acceso y gestión de recursos compartidos.

### 4.9. Patrón Inyección de Dependencias (Dependency Injection)

La Inyección de Dependencias es un patrón donde las dependencias (servicios, repositorios, etc.) son proporcionadas a una clase en lugar de ser creadas por ella misma. Promueve la modularidad y facilita las pruebas.

* **Aplicación en el Arquetipo:**
    * **Uso de Anotaciones como **`@Autowired:`****
        * Inyección de servicios y repositorios en controladores y casos de uso.
    * **Configuraciones en **`infrastructure/configuration`**:**
        * Clases como **`RepositoryConfig.java`** y **`DataSourceConfig.java`** definen cómo se configuran e inyectan las dependencias.

* **Cómo se Aplica:**
    * Las clases no crean sus propias dependencias, sino que las reciben a través del constructor o propiedades, facilitando la inversión de control.
    * Mejora la testeabilidad al permitir inyectar implementaciones simuladas o mock durante las pruebas.

### 4.10. Patrón Aspecto (Aspect-Oriented Programming - AOP)

La Programación Orientada a Aspectos permite separar las preocupaciones transversales (como logging, manejo de excepciones, seguridad, entre otros) del código de negocio principal mediante la definición de aspectos.

* **Aplicación en el Arquetipo:**
    * **Aspects en **`crosscutting/aspects`**:**
        * **`LoggingAspect.java`**
        * **`ExceptionHandlingAspect.java`**

* **Cómo se Aplica:**
    * Los aspectos interceptan llamadas a métodos y añaden funcionalidad adicional sin modificar el código original.
    * Facilitan la implementación de funcionalidades transversales de manera centralizada y reutilizable.

### 4.11. Patrón Builder (Constructor)

El Patrón Builder separa la construcción de un objeto complejo de su representación, permitiendo que el mismo proceso de construcción pueda crear diferentes representaciones.

* **Aplicación en el Arquetipo:**
    * **Construcción de Objetos DTO o Entidades:**
        * Se esta utilizando builders para crear instancias de **`LoanDTO`** o **`LoanSQLEntity`** con un enfoque más legible y mantenible.

* **Cómo se Aplica:**
    * Facilita la creación de objetos con múltiples propiedades, especialmente cuando algunas son opcionales o requieren validación.
    * Mejora la legibilidad y evita constructores con muchos parámetros.

### 4.12. Patrón Decorador (Decorator Pattern)

El Patrón Decorador permite agregar dinámicamente responsabilidades adicionales a un objeto.

* **Aplicación en el Arquetipo:**
    * **Servicios de Mensajes y Logging:**
        * Se esta decorando servicios para añadir funcionalidades adicionales como **`logging`** o **`manejo de errores`**.

* **Cómo se Aplica:**
    * Extiende la funcionalidad de los servicios sin modificar su código original.
    * Permite agregar características de manera flexible y modular.

### 4.13. Patrón Puente (Bridge Pattern)

El Patrón Puente desacopla una abstracción de su implementación para que ambas puedan variar independientemente.

* **Aplicación en el Arquetipo:**
    * **Interfaces y Implementaciones Separadas:**
        * Separación de interfaces como **`ILoggerService`** y sus implementaciones en **`LoggerService.java`**.
        * Esto permite cambiar la implementación del logger sin afectar al código que lo utiliza.

* **Cómo se Aplica:**
    * Permite que la abstracción y la implementación evolucionen de manera independiente.
    * Facilita la extensión y modificación de implementaciones sin cambiar las abstracciones.

### 4.14. Aplicación de los Principios SOLID

Además de los patrones de diseño, se esta aplicando los principios **`SOLID`**:

* **Single Responsibility Principle (SRP):**
    * Cada clase tiene una única responsabilidad, como **`LoanService`** que maneja la lógica de préstamos.

* **Open/Closed Principle (OCP):**
    * Las clases están abiertas para extensión pero cerradas para modificación, permitiendo agregar nuevas funcionalidades sin cambiar el código existente.

* **Liskov Substitution Principle (LSP):**
    * Las clases derivadas pueden sustituir a sus clases base sin alterar el correcto funcionamiento de la aplicación.

* **Interface Segregation Principle (ISP):**
    * Se crean interfaces específicas y pequeñas, evitando depender de métodos que no se utilizan.

* **Dependency Inversion Principle (DIP):**
    * Se depende de abstracciones (**`interfaces`**) en lugar de implementaciones concretas, facilitando el cambio de implementaciones sin afectar al código que las utiliza.

## 5. Guía de Arquitectura Hexagonal para Desarrolladores

Esta guía proporciona una descripción detallada de la Arquitectura Hexagonal implementada en el arquetipo. Su objetivo es ayudar a los desarrolladores a familiarizarse con las diferentes capas y componentes, explicando su función y cómo interactúan entre sí. Se incluyen referencias a clases y archivos específicos para facilitar la comprensión y navegación del código.

![ArquitecturaHexagonalDesarrolladores](./imagenes/ArquitecturaHexagonalDesarrolladores.png)

# Generate Migration
To generate migration need generate build first
npm run migration:generate -- ./src/infrastructure/migrations/CreateUsersTable

# Build and Test
npm run build --Generate Application To Production
npm start Run Application in Production mode
npm run dev -- Run Application in dev mode


# Contribute
TODO: Explain how other users and developers can contribute to make your code better. 

