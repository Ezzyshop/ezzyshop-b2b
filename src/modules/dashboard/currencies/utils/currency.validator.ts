import Joi from "joi";
import { CurrencyStatus } from "./currency.enum";
import { ICurrency } from "./currency.interface";

export const currencyFields: Record<
  keyof Omit<ICurrency, "createdAt" | "updatedAt" | "__v" | "_id">,
  Joi.Schema
> = {
  name: Joi.string().min(3).max(255).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be less than 255 characters long",
  }),
  symbol: Joi.string().min(1).max(10).required().messages({
    "string.empty": "Symbol is required",
    "string.min": "Symbol must be at least 1 character long",
    "string.max": "Symbol must be less than 10 characters long",
  }),
  status: Joi.string()
    .required()
    .valid(CurrencyStatus.Active, CurrencyStatus.Inactive)
    .messages({
      "string.empty": "Status is required",
      "any.only": "Status must be either Active or Inactive",
    }),
};

export const createCurrencyValidator = Joi.object(currencyFields);
export const updateCurrencyValidator = Joi.object(currencyFields);
export const changeCurrencyStatusValidator = Joi.object({
  status: currencyFields.status,
});
