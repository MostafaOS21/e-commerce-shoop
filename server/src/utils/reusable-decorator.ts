// reusable decorator

import { applyDecorators, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ReusableDecorator({
  httpCode,
  responses,
}: {
  httpCode: number;
  responses: {
    status: number;
    description: string;
  }[];
}) {
  const apiResponses = responses.map(({ status, description }) =>
    ApiResponse({
      status,
      description,
    }),
  );

  return applyDecorators(...apiResponses, HttpCode(httpCode));
}
