import { z } from "zod";

/**
 * Schema para validação do período de filtro do dashboard
 */
export const periodFilterSchema = z.object({
  period: z.enum(['today', 'yesterday', 'last_week', 'last_month', 'last_year']),
});

/**
 * Tipos derivados dos schemas
 */
export type PeriodFilterData = z.infer<typeof periodFilterSchema>;