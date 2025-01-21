import { HttpResponseInit, InvocationContext } from "@azure/functions";
import { ErrorResponse } from "@crosscutting/dto/response/ErrorResponse";

export async function handleFunctionErrors(
  context: InvocationContext,
  handler: () => Promise<HttpResponseInit>
): Promise<HttpResponseInit> {
  try {
    // Ejecuta el handler y retorna la respuesta
    return await handler();
  } catch (error: any) {
    context.error('Error in function execution:', error);

    context.log("aaaa")

    // Crea una respuesta de error estandarizada
    const errorResponse = new ErrorResponse(
      error.message || 'An unexpected error occurred',
      error.statusCode || 500,
      error.details || null
    );

    // Retorna un objeto HttpResponseInit con el cuerpo serializado
    return {
      status: errorResponse.statusCode,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorResponse), // Serializa el error en JSON
    };
  }
}
