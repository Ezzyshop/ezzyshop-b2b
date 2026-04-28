import Joi from "joi";
import { PERMISSION_MATRIX } from "@/lib/types/permission.types";

const validResources = PERMISSION_MATRIX.map((m) => m.resource);
const validActions = ["read", "create", "update", "delete", "full"];

export const roleFormValidator = Joi.object({
  name: Joi.string().required().max(100).messages({
    "any.required": "Role name is required",
    "string.max": "Role name must be at most 100 characters",
  }),
  permissions: Joi.array()
    .items(
      Joi.object({
        resource: Joi.string()
          .valid(...validResources)
          .required(),
        actions: Joi.array()
          .items(Joi.string().valid(...validActions))
          .min(1)
          .required(),
      }),
    )
    .required(),
});
