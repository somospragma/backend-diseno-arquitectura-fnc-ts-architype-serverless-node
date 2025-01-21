// @ts-ignore
import { ParameterService } from '@parameterManagement/domain/services/ParameterService';
// @ts-ignore
import { GetParameterUseCase } from '@parameterManagement/application/useCases/GetParameterUseCase';

describe('GetParameterUseCase', () => {
  let parameterServiceMock: jest.Mocked<ParameterService>;
  let getParameterUseCase: GetParameterUseCase;

  beforeEach(() => {
    parameterServiceMock = {
      getParameter: jest.fn(),
    } as unknown as jest.Mocked<ParameterService>;

    getParameterUseCase = new GetParameterUseCase(parameterServiceMock);
  });

  it('debería retornar el valor del parámetro cuando existe', async () => {
    const mockKey = 'testKey';
    const mockValue = 'testValue';
    parameterServiceMock.getParameter.mockResolvedValueOnce(mockValue);

    const result = await getParameterUseCase.execute(mockKey);

    expect(result).toBe(mockValue);
    expect(parameterServiceMock.getParameter).toHaveBeenCalledWith(mockKey);
    expect(parameterServiceMock.getParameter).toHaveBeenCalledTimes(1);
  });

  it('debería retornar null cuando el parámetro no existe', async () => {
    const mockKey = 'nonExistentKey';
    parameterServiceMock.getParameter.mockResolvedValueOnce(null);

    const result = await getParameterUseCase.execute(mockKey);

    expect(result).toBeNull();
    expect(parameterServiceMock.getParameter).toHaveBeenCalledWith(mockKey);
    expect(parameterServiceMock.getParameter).toHaveBeenCalledTimes(1);
  });

  it('debería manejar errores lanzados por el servicio', async () => {
    const mockKey = 'errorKey';
    const mockError = new Error('Test error');
    parameterServiceMock.getParameter.mockRejectedValueOnce(mockError);

    await expect(getParameterUseCase.execute(mockKey)).rejects.toThrow(mockError);
    expect(parameterServiceMock.getParameter).toHaveBeenCalledWith(mockKey);
    expect(parameterServiceMock.getParameter).toHaveBeenCalledTimes(1);
  });
});
