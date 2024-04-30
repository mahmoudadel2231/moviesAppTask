export function mapValidationErrors(errors: any) {
  const mappedErrors: { key: string; message: any }[] = [];

  Object.keys(errors).forEach(key => {
    let message = errors[key][0];
    mappedErrors.push({
      key,
      message,
    });
  });

  return mappedErrors;
}
