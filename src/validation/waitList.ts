import { z } from "zod";

export const waitListSchema = z.object({
  email: z.string().email("Email inválido"),
});
