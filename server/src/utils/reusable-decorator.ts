// reusable decorator

import { applyDecorators, HttpCode } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

const default_api_responses = [
  {
    status: 400,
    description: 'Bad request',
  },
  {
    status: 409,
    description: 'Conflict',
  },
];

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
  const apiResponses = [...responses, ...default_api_responses].map(
    ({ status, description }) =>
      ApiResponse({
        status,
        description,
      }),
  );

  return applyDecorators(...apiResponses, HttpCode(httpCode));
}
