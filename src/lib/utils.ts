export function wrapResponse(data: any, message?: string) {
  return {
    data,
    message,
  };
}
