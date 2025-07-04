import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { ErrorResponse } from "@crosscutting/dto/response/ErrorResponse";
import apm from '../../../../apm';
import { Constants } from "@crosscutting/utils/Constants";


export async function handleFunctionErrors(
  context: InvocationContext,
  req: HttpRequest,
  handler: () => Promise<HttpResponseInit>
): Promise<HttpResponseInit> {
  // Crecación de la transacción del elastic en el manejador general de HTTP-REQUEST de un azure function
  const transaction = apm.startTransaction(context.functionName || 'azure-function', 'request');
  // ID único de la transacción que permite su seguimiento en Elastic APM u otros sistemas de observabilidad
  const transactionId = req.headers.get(Constants.TRANSACTION_ID) || "N/A"; 

  try {

    const response  = await handler();
    if (transaction){
        transaction.result = 'success';
        transaction.setLabel("transaction_id", transactionId);
        transaction.end();
    } 
    return response;
  } 
  catch (error: any) {
      context.error(error)
      apm.captureError(error);
      if (transaction){
        transaction.result = 'error';
        transaction.setLabel("transaction_id", transactionId);
        transaction.end();
      } 
      return {
      status: error.statusCode,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(new ErrorResponse("Error", error.statusCode, error.message))
    };
  
  }
}
