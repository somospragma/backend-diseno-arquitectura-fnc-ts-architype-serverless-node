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

# Generate Migration
To generate migration need generate build first
npm run migration:generate -- ./src/infrastructure/migrations/CreateUsersTable

# Build and Test
npm run build --Generate Application To Production
npm start Run Application in Production mode
npm run dev -- Run Application in dev mode


# Contribute
TODO: Explain how other users and developers can contribute to make your code better. 

