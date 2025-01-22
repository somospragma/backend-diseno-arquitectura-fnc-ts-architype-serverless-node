import { HttpResponseInit, InvocationContext } from "@azure/functions";
import { ErrorResponse } from "@crosscutting/dto/response/ErrorResponse";

export async function handleFunctionErrors(
  context: InvocationContext,
  handler: () => Promise<HttpResponseInit>
): Promise<HttpResponseInit> {
  try {
    return await handler();
  } 
  catch (error: any) {
      context.error(error)
      return {
      status: error.statusCode,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(new ErrorResponse("Error", error.statusCode, error.message))
    };
  
  }
}
